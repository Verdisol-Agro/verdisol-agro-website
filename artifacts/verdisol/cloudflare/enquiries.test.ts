import { test } from "node:test";
import assert from "node:assert/strict";
import { ACCEPTED_MESSAGE, composeEmail, MAILBOX, sendWithGmail } from "./gmail";
import { handleEnquiry, type EnquiryEnv, type GuardClient } from "./handler";
import { onRequest } from "../functions/api/contact-enquiries";
import { sendEnquiry } from "../src/lib/enquiries";
import type { ContactEnquiryInput } from "@workspace/api-client-react";

const sample: ContactEnquiryInput = {
  fullName: "Test Farmer",
  phone: "00000",
  email: "visitor@example.com",
  location: "Test only",
  service: "Crop Advisory",
  message: "Automated test: no live email.",
};
const origin = "https://verdisol-agro-website.pages.dev";
const id = "00000000-0000-4000-8000-000000000001";
function fixture(): { env: EnquiryEnv; guard: GuardClient } {
  const guard: GuardClient = {
    reserve: async () => "reserved",
    finish: async () => {},
  };
  return { guard, env: {
    // Deliberately fake fixtures, never actual credentials.
    GOOGLE_CLIENT_ID: "test-client",
    GOOGLE_CLIENT_SECRET: "test-secret",
    GOOGLE_REFRESH_TOKEN: "test-refresh",
    ALLOWED_ORIGIN: origin,
    ENQUIRY_GUARD: { getByName: () => guard },
  } };
}
function request(body: unknown = sample, headers: Record<string, string> = {}): Request {
  return new Request(`${origin}/api/contact-enquiries`, {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json", "Idempotency-Key": id, ...headers },
    body: JSON.stringify(body),
  });
}
const acceptedFetch = (async (url: RequestInfo | URL) => Response.json(
  String(url).includes("oauth2") ? { access_token: "fake-access-token" } : { id: "fake-message-id" },
)) as typeof fetch;
const noNetwork = (async () => { throw new Error("Unexpected network access"); }) as typeof fetch;

test("valid enquiry refreshes OAuth then uses the Gmail API and confirms acceptance", async () => {
  const { env, guard } = fixture();
  const calls: string[] = [];
  const states: string[] = [];
  guard.finish = async (_id, state) => { states.push(state); };
  const fetcher = (async (url: RequestInfo | URL, init?: RequestInit) => {
    calls.push(String(url));
    if (String(url).includes("oauth2")) {
      assert.equal(new URLSearchParams(String(init?.body)).get("grant_type"), "refresh_token");
      return Response.json({ access_token: "fake-access-token" });
    }
    assert.equal(new Headers(init?.headers).get("Authorization"), "Bearer fake-access-token");
    return Response.json({ id: "fake-message-id" });
  }) as typeof fetch;
  const response = await handleEnquiry(request(), env, fetcher);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { message: ACCEPTED_MESSAGE });
  assert.equal(calls.length, 2);
  assert.deepEqual(states, ["sent"]);
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("MIME is UTF-8 safe, keeps every detail and cannot redirect the recipient", () => {
  const mime = Buffer.from(composeEmail({ ...sample, fullName: "Chipo 🌱" }), "base64url").toString();
  const [headers, encodedBody] = mime.split("\r\n\r\n");
  assert.ok(headers?.includes(`To: ${MAILBOX}`));
  assert.ok(headers?.includes("Reply-To: visitor@example.com"));
  const body = Buffer.from(encodedBody!, "base64").toString();
  for (const value of ["Chipo 🌱", sample.phone, sample.email!, sample.location, sample.service, sample.message]) {
    assert.ok(body.includes(value));
  }
  const { email: _email, ...optional } = sample;
  assert.ok(!Buffer.from(composeEmail(optional), "base64url").toString().includes("Reply-To:"));
});

test("missing configuration and Pages bindings fail closed without sending", async () => {
  const { env } = fixture();
  assert.equal((await handleEnquiry(request(), { ...env, GOOGLE_REFRESH_TOKEN: "" }, noNetwork)).status, 503);
  const response = await onRequest({ request: request(), env: {} });
  assert.equal(response.status, 503);
  assert.match(response.headers.get("content-type")!, /json/);
  assert.equal((await onRequest({ request: request(), env: {
    ENQUIRY_API: { fetch: async () => { throw new Error("Unavailable"); } },
  } })).status, 503);
});

test("Pages forwards the unmodified request to the private Worker service", async () => {
  const incoming = request();
  let forwarded: Request | undefined;
  const response = await onRequest({ request: incoming, env: {
    ENQUIRY_API: { fetch: async (value) => {
      forwarded = value;
      return Response.json({ message: ACCEPTED_MESSAGE });
    } },
  } });
  assert.equal(forwarded, incoming);
  assert.equal(response.status, 200);
});

test("unsupported methods, origins, malformed input and header injection never send", async () => {
  const { env } = fixture();
  assert.equal((await handleEnquiry(new Request(`${origin}/api/contact-enquiries`), env, noNetwork)).status, 405);
  assert.equal((await handleEnquiry(request(sample, { Origin: "https://attacker.invalid" }), env, noNetwork)).status, 403);
  assert.equal((await handleEnquiry(request(sample, { "Content-Type": "text/plain" }), env, noNetwork)).status, 415);
  assert.equal((await handleEnquiry(request(sample, { "Content-Encoding": "gzip" }), env, noNetwork)).status, 415);
  for (const body of [{}, { ...sample, message: " " }, { ...sample, service: "invalid" },
    { ...sample, email: "visitor@example.com\r\nBcc: other@example.com" }]) {
    assert.equal((await handleEnquiry(request(body), env, noNetwork)).status, 400);
  }
  assert.equal((await handleEnquiry(request(sample, { "Idempotency-Key": "invalid" }), env, noNetwork)).status, 400);
  const malformed = new Request(`${origin}/api/contact-enquiries`, {
    method: "POST", headers: { Origin: origin, "Content-Type": "application/json" }, body: "{",
  });
  assert.equal((await handleEnquiry(malformed, env, noNetwork)).status, 400);
});

test("actual body size is limited even without a Content-Length header", async () => {
  const { env } = fixture();
  assert.equal((await handleEnquiry(request({ ...sample, message: "x".repeat(33_000) }), env, noNetwork)).status, 413);
});

test("duplicate, uncertain and rate-limited requests do not send again", async () => {
  const { env, guard } = fixture();
  for (const [result, status] of [
    ["sent", 200], ["pending", 409], ["uncertain", 409], ["conflict", 409], ["limited", 429],
  ] as const) {
    guard.reserve = async () => result;
    const response = await handleEnquiry(request(), env, noNetwork);
    assert.equal(response.status, status);
  }
});

test("OAuth failures are retryable but ambiguous Gmail results are not resent", async () => {
  for (const kind of ["oauth", "gmail", "missing-id"] as const) {
    const { env, guard } = fixture();
    const states: string[] = [];
    guard.finish = async (_id, state) => { states.push(state); };
    const fetcher = (async (url: RequestInfo | URL) => {
      if (String(url).includes("oauth2")) return kind === "oauth"
        ? Response.json({ error: "invalid_grant" }, { status: 400 })
        : Response.json({ access_token: "fake-token" });
      if (kind === "gmail") throw new Error("Simulated timeout");
      return Response.json({});
    }) as typeof fetch;
    const response = await handleEnquiry(request(), env, fetcher);
    assert.equal(response.status, 502);
    assert.deepEqual(states, [kind === "oauth" ? "retryable" : "uncertain"]);
    assert.ok(!JSON.stringify(await response.json()).includes("invalid_grant"));
  }
});

test("distributed limiter failures never fall back to unprotected email sending", async () => {
  const { env, guard } = fixture();
  guard.reserve = async () => { throw new Error("Guard unavailable"); };
  assert.equal((await handleEnquiry(request(), env, noNetwork)).status, 503);
});

test("Gmail rejected responses do not count as accepted email", async () => {
  const { env } = fixture();
  const fetcher = (async (url: RequestInfo | URL) => String(url).includes("oauth2")
    ? Response.json({ access_token: "fake-token" })
    : Response.json({ error: "rejected" }, { status: 403 })) as typeof fetch;
  await assert.rejects(() => sendWithGmail(sample, env, fetcher));
  await assert.doesNotReject(() => sendWithGmail(sample, env, acceptedFetch));
});

test("the form rejects HTML, empty responses and unrelated JSON as false success", async () => {
  const original = globalThis.fetch;
  try {
    for (const response of [
      new Response("<html>static fallback</html>", { headers: { "Content-Type": "text/html" } }),
      new Response("", { status: 200 }),
      Response.json({ message: "Something else" }),
      Response.json({}),
    ]) {
      globalThis.fetch = async () => response;
      await assert.rejects(() => sendEnquiry(sample, id));
    }
    globalThis.fetch = async (_url, init) => {
      assert.equal(new Headers(init?.headers).get("Idempotency-Key"), id);
      return Response.json({ message: ACCEPTED_MESSAGE });
    };
    await assert.doesNotReject(() => sendEnquiry(sample, id));
  } finally {
    globalThis.fetch = original;
  }
});
