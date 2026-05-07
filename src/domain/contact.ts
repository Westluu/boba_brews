export type ContactFormFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactEmailPayload = ContactFormFields;

export type ContactFieldErrors = Partial<Record<keyof ContactFormFields, string>>;

export const INITIAL_CONTACT_FORM: ContactFormFields = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;

export function validateContactForm(
  fields: ContactFormFields,
): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  const name = fields.name.trim();
  const email = fields.email.trim();
  const subject = fields.subject.trim();
  const message = fields.message.trim();

  if (!name) {
    errors.name = "Please tell us your name.";
  }

  if (!email) {
    errors.email = "We need an email to write back.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "That email looks a little off.";
  }

  if (!subject) {
    errors.subject = "A subject helps us sort the scrolls.";
  }

  if (!message) {
    errors.message = "Tell us a little about your message.";
  } else if (message.length < MIN_MESSAGE_LENGTH) {
    errors.message = "Just a few more words, please.";
  }

  return errors;
}

export const hasContactErrors = (errors: ContactFieldErrors) =>
  Object.keys(errors).length > 0;

export function toContactEmailPayload(
  fields: ContactFormFields,
): ContactEmailPayload {
  return {
    name: fields.name.trim(),
    email: fields.email.trim(),
    subject: fields.subject.trim(),
    message: fields.message.trim(),
  };
}
