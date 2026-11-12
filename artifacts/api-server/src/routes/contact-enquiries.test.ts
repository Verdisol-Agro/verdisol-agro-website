import { test } from "node:test";
import assert from "node:assert/strict";
import express from "express";
import pino from "pino";
import pinoHttp from "pino-http";
import request from "supertest";
import { createContactEnquiriesRouter } from "./contact-enquiries";

const sample = {
  fullName: "Website test",
  phone: "00000",
  email: "test@example.com",
  location: "Test only",
  service: "Land Use Planning",
  message: "Automated test only. No live email should be sent.",
};

function fixture(deliver: (raw: string) => Promise<{ id?: string }>, limit = 30) {
  const app = express();
  app.use(pinoHttp({ logger: pino({ enabled: false }) }));
  app.use(express.json());
  app.use("/api", createContactEnquiriesRouter(deliver, limit));
  return app;
}

test("valid enquiries preserve every field and use a fixed recipient", async () => {
  let mime = "";
  const app = fixture(async (raw) => {
    mime = Buffer.from(raw, "base64url").toString("utf8");
    return { id: "test-message" };
  });
  const response = await request(app).post("/api/contact-enquiries").send({
    ...sample, fullName: "  Website test  ", to: "ignored@example.com",
  });
  assert.equal(response.status, 200);
  assert.match(mime, /To: verdisolagro@gmail\.com/);
  assert.match(mime, /Reply-To: test@example\.com/);
  assert.match(mime, /Subject: Website enquiry: Land Use Planning/);
  for (const text of ["Name: Website test", "Phone: 00000", "Test only", sample.message]) {
    assert.ok(mime.includes(text), `Missing field: ${text}`);
  }
  assert.ok(!mime.includes("ignored@example.com"));
});

test("email is optional without adding an invalid Reply-To header", async () => {
  let mime = "";
  const app = fixture(async (raw) => {
    mime = Buffer.from(raw, "base64url").toString("utf8");
    return { id: "test-message" };
  });
  const { email: _email, ...withoutEmail } = sample;
  assert.equal((await request(app).post("/api/contact-enquiries").send(withoutEmail)).status, 200);
  assert.ok(!mime.includes("Reply-To:"));
  assert.ok(mime.includes("Email: Not provided"));
});

test("invalid and blank fields never reach the email provider", async () => {
  let calls = 0;
  const app = fixture(async () => { calls++; return { id: "test-message" }; });
  for (const invalid of [
    {}, { ...sample, fullName: "  " }, { ...sample, location: "" },
    { ...sample, message: " " }, { ...sample, phone: "123" },
    { ...sample, email: "invalid" }, { ...sample, service: "Invalid service" },
    { ...sample, message: "x".repeat(5001) }, { ...sample, fullName: "x".repeat(121) },
  ]) {
    const response = await request(app).post("/api/contact-enquiries").send(invalid);
    assert.equal(response.status, 400);
    assert.equal(typeof response.body.error, "string");
  }
  assert.equal(calls, 0);
});

test("provider failure and missing confirmation cannot produce false success", async () => {
  for (const deliver of [
    async () => { throw new Error("Simulated provider failure"); },
    async () => ({}),
  ]) {
    const response = await request(fixture(deliver)).post("/api/contact-enquiries").send(sample);
    assert.equal(response.status, 502);
    assert.equal(typeof response.body.error, "string");
    assert.equal(response.body.message, undefined);
  }
});

test("the mailbox sending limit rejects excess requests", async () => {
  let calls = 0;
  const app = fixture(async () => { calls++; return { id: "test-message" }; }, 1);
  assert.equal((await request(app).post("/api/contact-enquiries").send(sample)).status, 200);
  const limited = await request(app).post("/api/contact-enquiries").send(sample);
  assert.equal(limited.status, 429);
  assert.ok(limited.headers["retry-after"]);
  assert.equal(calls, 1);
});
