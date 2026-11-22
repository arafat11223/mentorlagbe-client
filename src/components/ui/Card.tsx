import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`
        rounded-xl border border-border
        bg-surface shadow-[var(--shadow-card)]
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`space-y-1.5 p-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <h3
      className={`text-lg font-bold text-foreground ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <p
      className={`text-sm text-muted ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div className={`px-5 pb-5 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`
        flex items-center gap-3
        border-t border-border p-5
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}