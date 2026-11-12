import type { ContactEnquiryInput } from "@workspace/api-zod";

export const MAILBOX = "verdisolagro@gmail.com";
export const ACCEPTED_MESSAGE = "Your enquiry was accepted for email delivery.";

export interface GmailEnv {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REFRESH_TOKEN: string;
  ALLOWED_ORIGIN: string;
}

export class DeliveryError extends Error {
  constructor(public readonly uncertain: boolean) {
    super("Gmail did not confirm email acceptance");
  }
}

function base64(value: string): string {
  const bytes = new TextEncoder().encode(value);
  return btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(""));
}

export function composeEmail(input: ContactEnquiryInput): string {
  const text = [
    "New enquiry from the VerdiSol Agro website",
    "",
    `Name: ${input.fullName}`,
    `Phone: ${input.phone}`,
    `Email: ${input.email || "Not provided"}`,
    `Farm / project location: ${input.location}`,
    `Service required: ${input.service}`,
    "",
    "Project details:",
    input.message,
  ].join("\r\n");
  const headers = [
    `From: VerdiSol Agro Website <${MAILBOX}>`,
    `To: ${MAILBOX}`,
    // Subject is encoded and all visitor details except validated Reply-To stay in the body.
    `Subject: =?UTF-8?B?${base64(`Website enquiry: ${input.service}`)}?=`,
    ...(input.email ? [`Reply-To: ${input.email}`] : []),
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
  ];
  const encodedBody = base64(text).match(/.{1,76}/g)?.join("\r\n") ?? "";
  return base64(`${headers.join("\r\n")}\r\n\r\n${encodedBody}`)
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function sendWithGmail(
  input: ContactEnquiryInput,
  env: GmailEnv,
  fetcher: typeof fetch = fetch,
): Promise<void> {
  let accessToken: string;
  try {
    const response = await fetcher("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_CLIENT_SECRET,
        refresh_token: env.GOOGLE_REFRESH_TOKEN,
        grant_type: "refresh_token",
      }),
      signal: AbortSignal.timeout(10_000),
      redirect: "error",
    });
    const data = await response.json() as { access_token?: unknown };
    if (!response.ok || typeof data.access_token !== "string" || !data.access_token) {
      throw new Error("OAuth failed");
    }
    accessToken = data.access_token;
  } catch {
    // No send was attempted, so retrying this submission is safe.
    throw new DeliveryError(false);
  }

  try {
    const response = await fetcher("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw: composeEmail(input) }),
      signal: AbortSignal.timeout(15_000),
      redirect: "error",
    });
    const data = await response.json() as { id?: unknown };
    if (!response.ok) throw new DeliveryError(response.status >= 500);
    if (typeof data.id !== "string" || !data.id) throw new DeliveryError(true);
  } catch (error) {
    if (error instanceof DeliveryError) throw error;
    // A lost response might follow a successful send. Do not automatically send twice.
    throw new DeliveryError(true);
  }
}
