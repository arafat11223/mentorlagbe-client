"use client";

import Link from "next/link";
import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react";

import { Button } from "../components/ui/Button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-20">
      <section
        role="alert"
        className="w-full max-w-xl rounded-3xl border border-border bg-surface p-8 text-center shadow-[var(--shadow-card)] sm:p-12"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-danger/10 text-danger">
          <AlertTriangle size={32} aria-hidden="true" />
        </div>

        <p className="mt-7 text-sm font-bold uppercase tracking-widest text-danger">
          Something went wrong
        </p>

        <h1 className="mt-3 font-heading text-3xl font-extrabold text-foreground">
          We couldn&apos;t load this page
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted">
          An unexpected error occurred while displaying this page.
          Please try again. If the problem continues, return to the
          homepage and try later.
        </p>

        {error.digest && (
          <p className="mt-4 text-xs text-muted-foreground">
            Error reference: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={reset}>
            <RefreshCw size={17} aria-hidden="true" />
            Try Again
          </Button>

          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-5 text-sm font-semibold text-foreground transition hover:bg-surface-secondary"
          >
            <Home size={17} aria-hidden="true" />
            Go Home
          </Link>
        </div>
      </section>
    </main>
  );
}