import Link from "next/link";
import { ArrowLeft, BookOpen, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-20">
      <section className="w-full max-w-xl text-center">
        <div className="relative mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-primary/10">
          <BookOpen
            size={54}
            strokeWidth={1.5}
            className="text-primary"
            aria-hidden="true"
          />
          <span className="absolute -right-2 -top-2 rounded-xl bg-primary px-3 py-2 text-sm font-extrabold text-primary-foreground shadow-lg">
            404
          </span>
        </div>

        <p className="mt-9 text-sm font-bold uppercase tracking-widest text-primary">
          Page not found
        </p>

        <h1 className="mt-3 font-heading text-3xl font-extrabold text-foreground sm:text-4xl">
          Looks like you took a wrong turn!
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted">
          The page you are looking for does not exist, may have been
          moved, or is temporarily unavailable.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-bold text-primary-foreground transition hover:opacity-90"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Back to Homepage
          </Link>

          <Link
            href="/tuitions"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-7 text-sm font-bold text-foreground transition hover:border-primary hover:text-primary"
          >
            <Search size={18} aria-hidden="true" />
            Explore Tuitions
          </Link>
        </div>
      </section>
    </main>
  );
}