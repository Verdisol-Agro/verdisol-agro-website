import { submitContactEnquiry, type ContactEnquiryInput } from "@workspace/api-client-react";
import { SubmitContactEnquiryResponse } from "@workspace/api-zod";

/** Reject static HTML, empty responses and unrelated JSON instead of displaying false success. */
export async function sendEnquiry(input: ContactEnquiryInput, submissionId: string): Promise<void> {
  const response = await submitContactEnquiry(input, {
    responseType: "json",
    headers: { "Idempotency-Key": submissionId },
  });
  const parsed = SubmitContactEnquiryResponse.safeParse(response);
  if (!parsed.success || parsed.data.message !== "Your enquiry was accepted for email delivery.") {
    throw new Error("The enquiry service did not confirm email acceptance");
  }
}
