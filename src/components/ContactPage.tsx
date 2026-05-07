import { useState, type FormEvent, type ReactNode } from "react";
import contactBg from "../assets/contact/contact-bg.png";
import emailCat from "../assets/contact/email-cat.png";
import Button from "./ui/Button";
import { Input, TextArea } from "./ui/Input";

type FormFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormFields, string>>;

type SubmitStatus =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

const INITIAL_FORM: FormFields = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields: FormFields): FieldErrors {
  const errors: FieldErrors = {};

  if (!fields.name.trim()) {
    errors.name = "Please tell us your name.";
  }

  if (!fields.email.trim()) {
    errors.email = "We need an email to write back.";
  } else if (!EMAIL_PATTERN.test(fields.email.trim())) {
    errors.email = "That email looks a little off.";
  }

  if (!fields.subject.trim()) {
    errors.subject = "A subject helps us sort the scrolls.";
  }

  if (!fields.message.trim()) {
    errors.message = "Tell us a little about your message.";
  } else if (fields.message.trim().length < 10) {
    errors.message = "Just a few more words, please.";
  }

  return errors;
}

type IconCircleProps = { children: ReactNode; ariaLabel?: string };

function IconCircle({ children, ariaLabel }: IconCircleProps) {
  return (
    <span
      aria-label={ariaLabel}
      className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[#9d6d67] bg-[#07091e88] text-[#d8b4fe] shadow-[inset_0_0_18px_rgba(192,132,252,0.16),0_0_18px_rgba(157,109,103,0.12)]"
    >
      {children}
    </span>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-11 w-11">
      <path
        d="M8 14h32v22H8z"
        fill="#7b3fc8"
        stroke="#e5bc8a"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="m9 15 15 13 15-13M9 36l11-12M39 36 28 24"
        fill="none"
        stroke="#f8dfb2"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-11 w-11">
      <path
        d="M10 13h28c3 0 5 2.2 5 5v10c0 2.8-2 5-5 5H25l-9 7v-7h-6c-3 0-5-2.2-5-5V18c0-2.8 2-5 5-5Z"
        fill="#8a4fd8"
        stroke="#e5bc8a"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M17 23h.1M24 23h.1M31 23h.1"
        fill="none"
        stroke="#160b1d"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-12 w-12">
      <path
        d="M24 43s14-13.2 14-25A14 14 0 1 0 10 18c0 11.8 14 25 14 25Z"
        fill="#f8dfb2"
        stroke="#e5bc8a"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="18" r="5" fill="#3d2657" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-12 w-12">
      <circle
        cx="24"
        cy="24"
        r="15"
        fill="none"
        stroke="#f8dfb2"
        strokeWidth="3"
      />
      <path
        d="M24 14v11l8 5"
        fill="none"
        stroke="#f8dfb2"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type SocialBadgeProps = { label: string; symbol: string };

function SocialBadge({ label, symbol }: SocialBadgeProps) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#7b3fc8] font-display text-2xl text-cream shadow-[0_8px_18px_rgba(0,0,0,0.28)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#8a4fd8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c084fc]"
    >
      {symbol}
    </a>
  );
}

function ContactPage() {
  const [fields, setFields] = useState<FormFields>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<SubmitStatus>({ kind: "idle" });

  const updateField = <K extends keyof FormFields>(key: K, value: FormFields[K]) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
    if (status.kind === "success" || status.kind === "error") {
      setStatus({ kind: "idle" });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status.kind === "loading") return;

    const nextErrors = validate(fields);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus({
        kind: "error",
        message: "A few fields need attention before we can send this.",
      });
      return;
    }

    setErrors({});
    setStatus({ kind: "loading" });

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setFields(INITIAL_FORM);
      setStatus({
        kind: "success",
        message: "Message sent! We'll write back as soon as the cauldron cools.",
      });
    } catch {
      setStatus({
        kind: "error",
        message: "Something fizzled. Please try again in a moment.",
      });
    }
  };

  const isLoading = status.kind === "loading";

  return (
    <div className="relative min-h-screen bg-[#0b0717] text-cream">

      <div
        className="relative min-h-screen overflow-hidden px-4 pb-8 pt-24 sm:px-8"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(11,7,23,0.32), rgba(11,7,23,0.78)), url(${contactBg})`,
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundColor: "#0b0717",
        }}
      >
        <section className="relative mx-auto grid min-h-[24rem] max-w-[120rem] grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-stretch gap-4 sm:min-h-[28rem] lg:min-h-[33rem]">
          <div className="relative z-10 flex h-full items-center justify-center text-center">
            <div>
              <div className="flex items-end justify-center gap-4">
                <h1 className="font-display text-6xl leading-none text-[#f8dfb2] [text-shadow:0_0_18px_rgba(248,223,178,0.18),0_10px_34px_rgba(0,0,0,0.6)] sm:text-8xl">
                  Contact Us
                </h1>
                <span className="font-display text-5xl text-[#ffd67e] sm:text-6xl">
                  ☾
                </span>
              </div>
              <p className="mx-auto mt-3 max-w-[36rem] font-display text-2xl text-[#d986e8] sm:text-3xl">
                We'd love to hear from you, curious one!
              </p>
              <div className="mx-auto mt-3 h-px w-44 bg-gradient-to-r from-transparent via-[#c084fc88] to-transparent" />
              <p className="mx-auto mt-6 max-w-[34rem] font-display text-xl leading-8 text-[#dfd5d0] sm:text-2xl">
                Have a question, a suggestion, or just want to say hi?
                <br />
                Send us a message and we'll get back to you
                <br />
                as soon as our little cauldron isn't bubbling over!{" "}
                <span aria-hidden="true" className="text-[#c084fc]">
                  ♥
                </span>
              </p>
            </div>
          </div>

          <div className="relative flex h-full items-center justify-start">
            <img
              src={emailCat}
              alt="Wizard cat typing on a laptop"
              className="pointer-events-none h-full max-h-[33rem] w-full scale-110 object-contain object-left drop-shadow-[0_22px_44px_rgba(0,0,0,0.55)] sm:scale-115 lg:scale-125"
              draggable="false"
            />
          </div>
        </section>

        <section className="relative z-10 mx-auto mt-5 grid max-w-[120rem] gap-6 lg:grid-cols-2">
          <article className="rounded-[1.25rem] border border-[#9d6d67] bg-[#07091ee8] px-8 py-9 shadow-[0_24px_60px_rgba(0,0,0,0.48)]">
            <h2 className="text-center font-display text-5xl text-[#f8dfb2]">
              <span className="mr-2 text-[#ffd67e]">✦</span>
              Say Hello
              <span className="ml-2 text-[#ffd67e]">✦</span>
            </h2>

            <ul className="mx-auto mt-9 grid max-w-[34rem] gap-7">
              <li className="flex items-center gap-7">
                <IconCircle ariaLabel="Email">
                  <MailIcon />
                </IconCircle>
                <div>
                  <p className="font-display text-3xl text-[#d986e8]">Email</p>
                  <p className="mt-1 font-display text-2xl leading-8 text-[#f8dfb2]">
                    hello@bobasbrews.com
                  </p>
                </div>
              </li>

              <li className="flex items-center gap-7">
                <IconCircle ariaLabel="Socials">
                  <ChatIcon />
                </IconCircle>
                <div>
                  <p className="font-display text-3xl text-[#d986e8]">Socials</p>
                  <p className="mt-1 font-display text-2xl leading-8 text-[#f8dfb2]">
                    @bobasbrews
                  </p>
                  <div className="mt-3 flex gap-3">
                    <SocialBadge label="Instagram" symbol="◎" />
                    <SocialBadge label="TikTok" symbol="♪" />
                    <SocialBadge label="Facebook" symbol="f" />
                    <SocialBadge label="YouTube" symbol="▶" />
                  </div>
                </div>
              </li>

              <li className="flex items-center gap-7">
                <IconCircle ariaLabel="Location">
                  <PinIcon />
                </IconCircle>
                <div>
                  <p className="font-display text-3xl text-[#d986e8]">Location</p>
                  <p className="mt-1 font-display text-2xl leading-8 text-[#f8dfb2]">
                    123 Moonlight Lane
                    <br />
                    Starry Town, CA 90210
                  </p>
                </div>
              </li>

              <li className="flex items-center gap-7">
                <IconCircle ariaLabel="Hours">
                  <ClockIcon />
                </IconCircle>
                <div>
                  <p className="font-display text-3xl text-[#d986e8]">Hours</p>
                  <p className="mt-1 font-display text-2xl leading-8 text-[#f8dfb2]">
                    Mon – Fri: 11AM – 9PM
                    <br />
                    Sat – Sun: 10AM – 10PM
                  </p>
                </div>
              </li>
            </ul>
          </article>

          <article className="rounded-[1.25rem] border border-[#9d6d67] bg-[#07091ee8] p-7 shadow-[0_24px_60px_rgba(0,0,0,0.48)]">
            <h2 className="text-center font-display text-4xl text-[#f8dfb2]">
              Send Us a Message
            </h2>
            <p className="mt-2 text-center font-display text-xl leading-7 text-[#dfd5d0]">
              Fill out the form below and we'll get back to you
              <br />
              as soon as we can!
            </p>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-5 grid gap-4"
              aria-busy={isLoading || undefined}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Name"
                  required
                  autoComplete="name"
                  value={fields.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  disabled={isLoading}
                  error={errors.name}
                />
                <Input
                  label="Email"
                  type="email"
                  required
                  autoComplete="email"
                  value={fields.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  disabled={isLoading}
                  error={errors.email}
                />
              </div>

              <Input
                label="Subject"
                required
                value={fields.subject}
                onChange={(e) => updateField("subject", e.target.value)}
                disabled={isLoading}
                error={errors.subject}
              />

              <TextArea
                label="Message"
                required
                rows={5}
                value={fields.message}
                onChange={(e) => updateField("message", e.target.value)}
                disabled={isLoading}
                error={errors.message}
              />

              <Button
                type="submit"
                variant="primary"
                loading={isLoading}
                className="mt-1 w-full"
              >
                {isLoading ? "Sending…" : (
                  <>
                    Send Message <span aria-hidden="true">✦</span>
                  </>
                )}
              </Button>

              <div className="min-h-[1.75rem]" aria-live="polite">
                {status.kind === "success" && (
                  <p className="text-center font-display text-xl text-[#a7f3c5]">
                    {status.message}
                  </p>
                )}
                {status.kind === "error" && (
                  <p className="text-center font-display text-xl text-[#f4a4b3]">
                    {status.message}
                  </p>
                )}
              </div>
            </form>
          </article>
        </section>

      </div>
    </div>
  );
}

export default ContactPage;
