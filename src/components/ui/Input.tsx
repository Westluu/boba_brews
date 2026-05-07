import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

type SharedFieldProps = {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  labelClassName?: string;
};

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> &
  SharedFieldProps & {
    type?:
      | "text"
      | "number"
      | "email"
      | "password"
      | "tel"
      | "url"
      | "date";
  };

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  SharedFieldProps;

const FIELD_BASE =
  "w-full rounded-[1rem] border border-[#9d6d67] bg-[#0b0717cc] px-5 py-4 font-display text-2xl text-cream placeholder:text-[#7d6c8d] shadow-[inset_0_0_18px_rgba(110,63,176,0.18)] focus:outline-none focus:border-[#c084fc] focus:ring-2 focus:ring-[#c084fc66] transition-colors";

const ERROR_FIELD = "border-[#e07a8f] focus:border-[#e07a8f] focus:ring-[#e07a8f55]";

function FieldLabel({
  htmlFor,
  label,
  required,
  className,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={[
        "pointer-events-none absolute left-5 top-2 font-display text-base text-[#d986e8]",
        className ?? "",
      ].join(" ")}
    >
      {label}
      {required && <span className="ml-1 text-[#e07a8f]">*</span>}
    </label>
  );
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    required,
    error,
    className = "",
    labelClassName,
    type = "text",
    id,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className={`relative ${className}`}>
      <FieldLabel
        htmlFor={inputId}
        label={label}
        required={required}
        className={labelClassName}
      />
      <input
        {...rest}
        ref={ref}
        id={inputId}
        type={type}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={[FIELD_BASE, "pt-7", error ? ERROR_FIELD : ""].join(" ")}
      />
      {error && (
        <p
          id={errorId}
          className="mt-2 font-display text-lg text-[#f4a4b3]"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    { label, required, error, className = "", labelClassName, id, rows = 5, ...rest },
    ref,
  ) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const errorId = error ? `${fieldId}-error` : undefined;

    return (
      <div className={`relative ${className}`}>
        <FieldLabel
          htmlFor={fieldId}
          label={label}
          required={required}
          className={labelClassName}
        />
        <textarea
          {...rest}
          ref={ref}
          id={fieldId}
          rows={rows}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={[FIELD_BASE, "pt-8 resize-none", error ? ERROR_FIELD : ""].join(" ")}
        />
        {error && (
          <p
            id={errorId}
            className="mt-2 font-display text-lg text-[#f4a4b3]"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

export default Input;
