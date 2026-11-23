"use client";

import "./globals.css";

import { AlertTriangle, RefreshCw } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({
  error,
  reset,
}: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-foreground antialiased">
        <main className="w-full max-w-xl">
          <section
            role="alert"
            className="rounded-3xl border border-border bg-surface p-8 text-center shadow-[var(--shadow-card)] sm:p-12"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-danger/10 text-danger">
              <AlertTriangle size={32} aria-hidden="true" />
            </div>

            <p className="mt-7 text-sm font-bold uppercase tracking-widest text-danger">
              Application error
            </p>

            <h1 className="mt-3 font-heading text-3xl font-extrabold">
              Something went wrong
            </h1>

            <p className="mt-4 text-sm leading-7 text-muted">
              MentorLagbe could not load this page correctly.
              Please try reloading the application.
            </p>

            {error.digest && (
              <p className="mt-4 text-xs text-muted">
                Error reference: {error.digest}
              </p>
            )}

            <button
              type="button"
              onClick={reset}
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-bold text-primary-foreground transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <RefreshCw size={18} aria-hidden="true" />
              Try Again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}