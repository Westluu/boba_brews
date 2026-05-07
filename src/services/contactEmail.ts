export type ContactEmailPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const CONTACT_EMAIL_RECIPIENT = "af12d6d198c27a86981e8bd279026f17";

const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(
  CONTACT_EMAIL_RECIPIENT,
)}`;

export async function sendContactEmail(payload: ContactEmailPayload) {
  const response = await fetch(FORMSUBMIT_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      _replyto: payload.email,
      _subject: `Boba Brews: ${payload.subject}`,
      message: payload.message,
      _captcha: "false",
      _template: "table",
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to send contact email.");
  }
}
