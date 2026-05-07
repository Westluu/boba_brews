import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  loading?: boolean;
  children: ReactNode;
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "border-[#c084fc66] bg-[#7b3fc8] text-cream shadow-[0_18px_42px_rgba(123,63,200,0.42)] hover:bg-[#8a4fd8] focus-visible:ring-2 focus-visible:ring-[#c084fc]",
  secondary:
    "border-[#e5bc8a66] bg-[#160b1ddd] text-cream hover:bg-[#1f1429] focus-visible:ring-2 focus-visible:ring-[#e5bc8a]",
};

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-cream/40 border-t-cream"
    />
  );
}

export function Button({
  variant = "primary",
  loading = false,
  disabled,
  className = "",
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...rest}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={[
        "inline-flex items-center justify-center gap-3 rounded-[1rem] border px-6 py-3 font-display text-3xl transition-colors duration-200 focus:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-60",
        VARIANT_CLASSES[variant],
        className,
      ].join(" ")}
    >
      {loading && <Spinner />}
      <span className="inline-flex items-center gap-2">{children}</span>
    </button>
  );
}

export default Button;
