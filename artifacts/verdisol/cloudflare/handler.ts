import { SubmitContactEnquiryBody } from "@workspace/api-zod";
import { ACCEPTED_MESSAGE, DeliveryError, sendWithGmail, type GmailEnv } from "./gmail";
import type { Attempt, Reservation } from "./guard";

export interface GuardClient {
  reserve(id: string, digest: string): Promise<Reservation>;
  finish(id: string, state: Attempt["state"]): Promise<void>;
}

export interface EnquiryEnv extends GmailEnv {
  ENQUIRY_GUARD: { getByName(name: string): GuardClient };
}

export const apiJson = (data: object, status = 200, extra: Record<string, string> = {}) =>
  Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...extra },
  });

async function readLimitedJson(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("invalid");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 32 * 1024) {
        await reader.cancel();
        throw new Error("large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export async function handleEnquiry(
  request: Request,
  env: EnquiryEnv,
  fetcher: typeof fetch = fetch,
): Promise<Response> {
  if (new URL(request.url).pathname !== "/api/contact-enquiries") {
    return apiJson({ error: "Not found." }, 404);
  }
  if (request.method !== "POST") {
    return apiJson({ error: "Please submit the enquiry form using POST." }, 405, { Allow: "POST" });
  }
  if (![env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET, env.GOOGLE_REFRESH_TOKEN,
    env.ALLOWED_ORIGIN, env.ENQUIRY_GUARD].every(Boolean)) {
    return apiJson({ error: "Email delivery is not configured. Please email verdisolagro@gmail.com directly." }, 503);
  }
  // Same-origin browser form only; this is a secondary control, not bot authentication.
  if (request.headers.get("Origin") !== env.ALLOWED_ORIGIN) {
    return apiJson({ error: "This website is not allowed to submit enquiries." }, 403);
  }
  if (request.headers.get("Content-Encoding") &&
    request.headers.get("Content-Encoding") !== "identity") {
    return apiJson({ error: "Compressed requests are not supported." }, 415);
  }
  if (request.headers.get("Content-Type")?.split(";")[0]?.trim().toLowerCase() !== "application/json") {
    return apiJson({ error: "Please send a JSON request." }, 415);
  }
  let input: unknown;
  try {
    input = await readLimitedJson(request);
  } catch (error) {
    return apiJson({ error: error instanceof Error && error.message === "large"
      ? "The request is too large." : "Please send valid enquiry details." },
    error instanceof Error && error.message === "large" ? 413 : 400);
  }
  const trimmed = input && typeof input === "object" && !Array.isArray(input)
    ? Object.fromEntries(Object.entries(input).map(([key, value]) =>
      [key, typeof value === "string" ? value.trim() : value])) : input;
  const parsed = SubmitContactEnquiryBody.safeParse(trimmed);
  if (!parsed.success || (parsed.success && parsed.data.email && /[\r\n]/.test(parsed.data.email))) {
    return apiJson({ error: "Please check the enquiry details and try again." }, 400);
  }
  const id = request.headers.get("Idempotency-Key");
  if (!id || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    return apiJson({ error: "Please refresh this page before sending your enquiry." }, 400);
  }
  try {
    const digestBytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify(parsed.data)));
    const digest = Array.from(new Uint8Array(digestBytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
    const guard = env.ENQUIRY_GUARD.getByName("verdisol-mailbox");
    const reservation = await guard.reserve(id, digest);
    if (reservation === "sent") return apiJson({ message: ACCEPTED_MESSAGE });
    if (reservation === "limited") return apiJson({ error: "Too many enquiries. Please try again later." }, 429, { "Retry-After": "900" });
    if (reservation !== "reserved") {
      return apiJson({ error: reservation === "conflict"
        ? "This submission identifier was already used. Please refresh the page."
        : "We cannot safely retry this enquiry yet. Please contact verdisolagro@gmail.com to avoid a duplicate." }, 409);
    }
    try {
      await sendWithGmail(parsed.data, env, fetcher);
    } catch (error) {
      await guard.finish(id, error instanceof DeliveryError && !error.uncertain ? "retryable" : "uncertain");
      return apiJson({ error: "Gmail could not confirm delivery. Please try again or email verdisolagro@gmail.com directly." }, 502);
    }
    await guard.finish(id, "sent");
    return apiJson({ message: ACCEPTED_MESSAGE });
  } catch {
    // Never send if distributed protection fails; never leak OAuth responses.
    return apiJson({ error: "Enquiry delivery is temporarily unavailable. Please try again later." }, 503);
  }
}
