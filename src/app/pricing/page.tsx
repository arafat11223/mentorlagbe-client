import type { Metadata } from "next";
import Link from "next/link";
import { PricingCheckoutButton, PaymentStatusNotice } from "../../components/payment/PricingCheckoutActions";
import {
  ArrowRight,
  BookOpen,
  Check,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Membership Plans",
  description:
    "Explore MentorLagbe Student Pro and Tutor Pro membership plans and choose the right option for your learning journey.",
};

const plans = [
  {
    name: "Student Pro",
    role: "student" as const,
    subtitle: "For students",
    price: "$10",
    description:
      "Get access to the Student Pro membership and manage your learning opportunities.",
    icon: BookOpen,
    features: [
      "Browse available tuition opportunities",
      "Apply to suitable tuition posts",
      "Manage your applications",
      "Access Student Pro benefits",
    ],
    highlighted: false,
    buttonText: "Get Student Pro",
  },
  {
    name: "Tutor Pro",
    role: "tutor" as const,
    subtitle: "For tutors",
    price: "$15",
    description:
      "Unlock unlimited tuition posting and manage your teaching opportunities.",
    icon: GraduationCap,
    features: [
      "Create and manage tuition posts",
      "Connect with interested students",
      "Manage tuition applications",
      "Access unlimited posts with Tutor Pro",
    ],
    highlighted: true,
    buttonText: "Get Tutor Pro",
  },
];

const membershipHighlights = [
  {
    icon: Users,
    title: "For Students and Tutors",
    description:
      "Membership options designed for both sides of the tuition community.",
  },
  {
    icon: ShieldCheck,
    title: "Structured Platform",
    description:
      "Organized accounts, tuition listings, and application management.",
  },
  {
    icon: Sparkles,
    title: "One-Time Payment",
    description:
      "Both membership plans have a one-time listed membership price.",
  },
];

export default function PricingPage() {
  return (
    <main className="flex-1 overflow-hidden">
      <PaymentStatusNotice />
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 md:py-24 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
            <Sparkles size={16} />
            Membership Plans
          </span>

          <h1 className="mx-auto mt-7 max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Simple Plans.
            <span className="mt-2 block text-primary">
              Meaningful Connections.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Choose the membership that matches your role.
            Explore opportunities as a student or unlock
            unlimited tuition posting as a tutor.
          </p>

          <Link
            href="#membership-plans"
            className="mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:opacity-90"
          >
            Explore Plans
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Membership Highlights */}
      <section className="py-14">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {membershipHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl border border-border bg-surface p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={23} />
                </div>

                <div>
                  <h2 className="font-heading text-base font-bold text-foreground">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing Cards */}
      <section
        id="membership-plans"
        className="scroll-mt-24 bg-surface-secondary/40 py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Choose Your Membership
            </span>

            <h2 className="mt-3 font-heading text-3xl font-extrabold text-foreground sm:text-4xl">
              Find the Right Plan
            </h2>

            <p className="mt-4 leading-7 text-muted">
              Select a plan based on how you want to use MentorLagbe.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-7 md:grid-cols-2">
            {plans.map((plan) => {
              const Icon = plan.icon;

              return (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-2xl bg-surface p-7 transition hover:-translate-y-1 hover:shadow-xl sm:p-9 ${
                    plan.highlighted
                      ? "border-2 border-primary shadow-lg shadow-primary/10"
                      : "border border-border shadow-sm"
                  }`}
                >
                  {plan.highlighted && (
                    <span className="absolute -top-3 right-7 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground">
                      Recommended
                    </span>
                  )}

                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                        plan.highlighted
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <Icon size={27} />
                    </div>

                    <div>
                      <h3 className="font-heading text-xl font-extrabold text-foreground">
                        {plan.name}
                      </h3>

                      <p className="mt-1 text-sm text-muted">
                        {plan.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="mt-9">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="font-heading text-5xl font-extrabold tracking-tight text-foreground">
                        {plan.price}
                      </span>

                      <span className="text-sm text-muted">
                        one-time
                      </span>
                    </div>

                    <p className="mt-4 min-h-14 text-sm leading-7 text-muted">
                      {plan.description}
                    </p>
                  </div>

                  <div className="my-7 border-t border-border" />

                  <h4 className="text-sm font-bold text-foreground">
                    Whats included
                  </h4>

                  <ul className="mt-5 flex-1 space-y-4">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm leading-6 text-foreground"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Check size={13} strokeWidth={3} />
                        </span>

                        {feature}
                      </li>
                    ))}
                  </ul>

                  <PricingCheckoutButton
                    role={plan.role}
                    label={plan.buttonText}
                    highlighted={plan.highlighted}
                  />
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-center text-xs leading-6 text-muted">
            Membership prices are one-time payments. Your
            membership selection depends on your account role.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center sm:px-12 sm:py-16">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

            <div className="relative mx-auto max-w-2xl">
              <GraduationCap
                size={42}
                className="mx-auto text-white"
              />

              <h2 className="mt-6 font-heading text-3xl font-extrabold text-white sm:text-4xl">
                Ready to Get Started?
              </h2>

              <p className="mt-4 leading-7 text-white/80">
                Join MentorLagbe and take the next step in
                your learning or teaching journey.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-bold text-primary transition hover:bg-white/90"
                >
                  Create Account
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/about"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/40 px-7 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Learn About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
