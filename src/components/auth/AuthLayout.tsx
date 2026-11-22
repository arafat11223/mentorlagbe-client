import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
  eyebrow: string;
}

export function AuthLayout({
  title,
  description,
  children,
  footer,
  eyebrow,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left promotional section */}
        <section className="relative hidden overflow-hidden bg-[#14213D] px-12 py-12 text-white lg:flex lg:flex-col lg:justify-between xl:px-20">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#0F766E]/30 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#F4B942]/10 blur-3xl" />

          <div className="relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-2xl font-bold tracking-tight"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F766E]">
                <GraduationCap size={25} />
              </span>
              MentorLagbe
            </Link>
          </div>

          <div className="relative z-10 max-w-xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80">
              <Sparkles size={16} className="text-[#F4B942]" />
              Your learning journey starts here
            </div>

            <h2 className="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
              Great learning begins with the{" "}
              <span className="text-[#5EEAD4]">right connection.</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-8 text-white/65">
              Connect with dedicated tutors, discover learning opportunities,
              and make every step of your educational journey count.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F766E]/30 text-[#5EEAD4]">
                  <BookOpen size={21} />
                </div>

                <h3 className="font-semibold">For Students</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Find the right tutor for your learning goals.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4B942]/20 text-[#F4B942]">
                  <GraduationCap size={21} />
                </div>

                <h3 className="font-semibold">For Tutors</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Share your expertise and connect with students.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-sm text-white/50">
            <ShieldCheck size={17} />
            A platform built for meaningful learning connections.
          </div>
        </section>

        {/* Right form section */}
        <section className="flex min-h-screen flex-col items-center justify-center px-5 py-10 sm:px-8">
          <div className="mb-8 flex w-full max-w-md items-center justify-between lg:hidden">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <GraduationCap size={23} />
              </span>
              MentorLagbe
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-primary"
            >
              Home <ArrowRight size={15} />
            </Link>
          </div>

          <div className="w-full max-w-md">
            <div className="mb-8">
              <Link
                href="/"
                className="hidden text-sm font-medium text-muted transition hover:text-primary lg:inline-flex lg:items-center lg:gap-2"
              >
                <ArrowRight size={15} className="rotate-180" />
                Back to home
              </Link>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {eyebrow}
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {title}
              </h1>

              <p className="mt-3 text-sm leading-7 text-muted">
                {description}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              {children}
            </div>

            <div className="mt-7 text-center text-sm text-muted">
              {footer}
            </div>

            <p className="mt-10 text-center text-xs text-muted">
              © 2026 MentorLagbe. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}