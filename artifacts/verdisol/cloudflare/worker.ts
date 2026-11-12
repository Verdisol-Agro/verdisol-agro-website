import { DurableObject } from "cloudflare:workers";
import { MailboxGuard } from "./guard";
import { handleEnquiry, apiJson, type EnquiryEnv } from "./handler";

export class EnquiryGuard extends DurableObject {
  private guard = new MailboxGuard(this.ctx.storage);

  reserve(id: string, digest: string) { return this.guard.reserve(id, digest); }
  finish(id: string, state: "pending" | "sent" | "retryable" | "uncertain") {
    return this.guard.finish(id, state);
  }
  alarm() { return this.guard.cleanup(); }
}

export default {
  async fetch(request: Request, env: EnquiryEnv): Promise<Response> {
    if (new URL(request.url).pathname === "/api/healthz" && request.method === "GET") {
      const configured = Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET &&
        env.GOOGLE_REFRESH_TOKEN && env.ALLOWED_ORIGIN && env.ENQUIRY_GUARD);
      return apiJson({ status: configured ? "configured" : "not_configured" }, configured ? 200 : 503);
    }
    return handleEnquiry(request, env);
  },
};
