import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";
import {
  SubmitContactEnquiryBody,
  SubmitContactEnquiryResponse,
  type ErrorResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();
const errorResponse = (error: string): ErrorResponse => ({ error });

router.post("/contact-enquiries", async (req, res): Promise<void> => {
  const parsed = SubmitContactEnquiryBody.safeParse(req.body);
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

  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpPort = Number(process.env.SMTP_PORT);
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPassword = process.env.SMTP_PASSWORD;
  const fromEmail = process.env.SMTP_FROM_EMAIL?.trim();
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim();

  if (
    !smtpHost ||
    !Number.isInteger(smtpPort) ||
    smtpPort < 1 ||
    smtpPort > 65535 ||
    !smtpUser ||
    !smtpPassword ||
    !fromEmail ||
    !toEmail
  ) {
    req.log.warn("Contact email delivery is not configured");
    res.status(503).json(
      errorResponse(
        "Email delivery is not configured yet. Please contact us by phone or WhatsApp.",
      ),
    );
    return;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    requireTLS: smtpPort !== 465,
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  const { fullName, phone, email, location, service, message } = parsed.data;

  try {
    const result = await transporter.sendMail({
      from: {
        name: "VerdiSol Agro Website",
        address: fromEmail,
      },
      to: toEmail,
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

    if (result.rejected.length > 0) {
      req.log.error(
        { rejectedCount: result.rejected.length },
        "SMTP server rejected the contact enquiry recipient",
      );
      res.status(502).json(
        errorResponse(
          "Email could not be delivered. Please contact us by phone or WhatsApp.",
        ),
      );
      return;
    }

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
    req.log.error({ smtpErrorCode: code }, "Contact enquiry email delivery failed");
    res.status(502).json(
      errorResponse(
        "Email could not be sent. Please try again or contact us by phone or WhatsApp.",
      ),
    );
  }
});

export default router;
