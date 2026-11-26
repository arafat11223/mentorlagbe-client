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
    <Card className="group h-full p-5 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[var(--shadow-card-hover)]">
      <div className="flex h-full items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted">
            {title}
          </p>

          <p className="mt-3 break-words text-3xl font-extrabold tracking-tight text-foreground">
            {value}
          </p>

          <p className="mt-2 text-xs leading-5 text-muted">
            {description}
          </p>
        </div>

        <div
          aria-hidden="true"
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${iconClassName}`}
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
      <div className="min-w-0">
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

      {children ? (
        <div className="shrink-0">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export function DashboardLoading({
  label,
}: {
  label: string;
}) {
  return (
    <section
      aria-label={label}
      aria-busy="true"
      role="status"
    >
      <div
        aria-hidden="true"
        className="mb-7 space-y-3"
      >
        <div className="h-3 w-28 animate-pulse rounded bg-surface-secondary motion-reduce:animate-none" />

        <div className="h-8 w-64 max-w-full animate-pulse rounded bg-surface-secondary motion-reduce:animate-none" />

        <div className="h-4 w-80 max-w-full animate-pulse rounded bg-surface-secondary motion-reduce:animate-none" />
      </div>

      <div
        aria-hidden="true"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-xl border border-border bg-surface motion-reduce:animate-none"
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
      <Card
        role="alert"
        className="w-full max-w-md p-7 text-center"
      >
        <AlertCircle
          aria-hidden="true"
          className="mx-auto text-danger"
          size={36}
        />

        <h2 className="mt-4 text-lg font-bold text-foreground">
          Unable to load dashboard
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted">
          {message}
        </p>

        <Button
          className="mt-5"
          onClick={onRetry}
        >
          <RefreshCw size={16} />
          Try again
        </Button>
      </Card>
    </div>
  );
}

export function PlanBadge({
  plan,
}: {
  plan: string;
}) {
  const isPro = plan.toLowerCase() === "pro";

  return (
    <span
      aria-label={`Current membership: ${plan} plan`}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${
        isPro
          ? "bg-primary/10 text-primary"
          : "bg-surface-secondary text-muted"
      }`}
    >
      {isPro ? (
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-current"
        />
      ) : null}

      {plan} Plan
    </span>
  );
}