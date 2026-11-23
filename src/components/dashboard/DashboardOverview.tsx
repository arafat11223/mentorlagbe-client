"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  iconClassName?: string;
}

export function DashboardStatCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName = "bg-secondary text-primary",
}: DashboardStatCardProps) {
  return (
    <Card className="p-5 transition-shadow hover:shadow-[var(--shadow-card-hover)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted">{title}</p>
          <p className="mt-3 text-3xl font-extrabold tracking-tight text-foreground">
            {value}
          </p>
          <p className="mt-2 text-xs leading-5 text-muted">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
        >
          <Icon size={21} />
        </div>
      </div>
    </Card>
  );
}

export function DashboardPageHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          {description}
        </p>
      </div>

      {children}
    </div>
  );
}

export function DashboardLoading({ label }: { label: string }) {
  return (
    <section aria-label={label} aria-busy="true">
      <div className="mb-7 space-y-3">
        <div className="h-3 w-28 animate-pulse rounded bg-surface-secondary" />
        <div className="h-8 w-64 max-w-full animate-pulse rounded bg-surface-secondary" />
        <div className="h-4 w-80 max-w-full animate-pulse rounded bg-surface-secondary" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-xl border border-border bg-surface"
          />
        ))}
      </div>

      <p className="mt-5 text-sm text-muted">
        Loading {label.toLowerCase()}...
      </p>
    </section>
  );
}

export function DashboardError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <Card className="w-full max-w-md p-7 text-center">
        <AlertCircle className="mx-auto text-danger" size={36} />

        <h2 className="mt-4 text-lg font-bold text-foreground">
          Unable to load dashboard
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted">
          {message}
        </p>

        <Button className="mt-5" onClick={onRetry}>
          <RefreshCw size={16} />
          Try again
        </Button>
      </Card>
    </div>
  );
}

export function PlanBadge({ plan }: { plan: string }) {
  const isPro = plan.toLowerCase() === "pro";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
        isPro
          ? "bg-primary/10 text-primary"
          : "bg-surface-secondary text-muted"
      }`}
    >
      {plan} Plan
    </span>
  );
}
