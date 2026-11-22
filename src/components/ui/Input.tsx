import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id || props.name;

  return (
    <div className="w-full space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-foreground"
        >
          {label}
          {props.required && (
            <span className="ml-1 text-danger">*</span>
          )}
        </label>
      )}

      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error
            ? `${inputId}-error`
            : helperText
              ? `${inputId}-helper`
              : undefined
        }
        className={`
          h-11 w-full rounded-lg border
          bg-surface px-4 text-sm text-foreground
          placeholder:text-muted-foreground
          outline-none transition-all
          focus:border-primary focus:ring-2
          focus:ring-primary/15
          disabled:cursor-not-allowed
          disabled:opacity-60
          ${error ? "border-danger" : "border-border"}
          ${className}
        `}
        {...props}
      />

      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="text-xs text-danger"
        >
          {error}
        </p>
      )}

      {!error && helperText && (
        <p
          id={`${inputId}-helper`}
          className="text-xs text-muted"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}