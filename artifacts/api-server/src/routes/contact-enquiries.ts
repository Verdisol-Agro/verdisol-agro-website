import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";
import { ReplitConnectors } from "@replit/connectors-sdk";
import { rateLimit } from "express-rate-limit";
import {
  SubmitContactEnquiryBody,
  SubmitContactEnquiryResponse,
  type ErrorResponse,
} from "@workspace/api-zod";

const errorResponse = (error: string): ErrorResponse => ({ error });
const recipient = "verdisolagro@gmail.com";
const connectors = new ReplitConnectors();
type EmailDelivery = (raw: string) => Promise<{ id?: string }>;

const deliverWithGmail: EmailDelivery = async (raw) => {
  const response = await connectors.proxy(
    "google-mail", "/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ raw }),
    },
  );
  if (!response.ok) throw new Error(`Email provider rejected delivery (${response.status})`);
  return await response.json() as { id?: string };
};

export function createContactEnquiriesRouter(
  deliver: EmailDelivery = deliverWithGmail,
  limit = 30,
): IRouter {
const router: IRouter = Router();
// A mailbox-wide cap also protects the account behind shared preview proxies.
const enquiryLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit,
  keyGenerator: () => "contact-mailbox",
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: errorResponse(
    "We are receiving too many enquiries right now. Please try again later or email verdisolagro@gmail.com directly.",
  ),
});

router.post("/contact-enquiries", enquiryLimit, async (req, res): Promise<void> => {
  const input = req.body && typeof req.body === "object"
    ? Object.fromEntries(Object.entries(req.body).map(([key, value]) => [
        key, typeof value === "string" ? value.trim() : value,
      ]))
    : req.body;
  const parsed = SubmitContactEnquiryBody.safeParse(input);
  if (!parsed.success) {
    req.log.warn(
      { issueCount: parsed.error.issues.length },
      "Rejected invalid contact enquiry",
    );
    res
      .status(400)
      .json(errorResponse("Please check the enquiry details and try again."));
    return;
  }

  const { fullName, phone, email, location, service, message } = parsed.data;

  try {
    // Assemble MIME safely; credentials and actual delivery stay in the connector.
    const transporter = nodemailer.createTransport({
      streamTransport: true,
      buffer: true,
      newline: "windows",
    });
    const result = await transporter.sendMail({
      from: {
        name: "VerdiSol Agro Website",
        address: recipient,
      },
      to: recipient,
      replyTo: email || undefined,
      subject: `Website enquiry: ${service}`,
      text: [
        "New enquiry from the VerdiSol Agro website",
        "",
        `Name: ${fullName}`,
        `Phone: ${phone}`,
        `Email: ${email || "Not provided"}`,
        `Farm / project location: ${location}`,
        `Service required: ${service}`,
        "",
        "Project details:",
        message,
      ].join("\n"),
    });

    const sent = await deliver(result.message.toString("base64url"));
    if (!sent.id) throw new Error("Email provider did not confirm delivery");
    req.log.info({ messageId: sent.id }, "Gmail accepted the website enquiry");

    res.status(200).json(
      SubmitContactEnquiryResponse.parse({
        message: "Your enquiry was accepted for email delivery.",
      }),
    );
  } catch (error) {
    const code =
      error && typeof error === "object" && "code" in error
        ? String(error.code)
        : "unknown";
    req.log.error({ deliveryErrorCode: code }, "Contact enquiry email delivery failed");
    res.status(502).json(
      errorResponse(
        "Email could not be sent. Please try again or contact us by phone or WhatsApp.",
      ),
    );
  }
});

return router;
}

export default createContactEnquiriesRouter();
