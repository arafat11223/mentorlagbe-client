
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Users,
  Search,
  UserPlus,
  ShieldCheck,
  Monitor,
  MapPin,
  Calculator,
  Atom,
  Languages,
  FlaskConical,
  BookText,
  Laptop,
  Check,
  Sparkles,
} from "lucide-react";

const subjects = [
  {
    name: "Mathematics",
    description: "Build strong problem-solving skills.",
    icon: Calculator,
  },
  {
    name: "Physics",
    description: "Understand concepts and applications.",
    icon: Atom,
  },
  {
    name: "English",
    description: "Improve language and communication.",
    icon: Languages,
  },
  {
    name: "Chemistry",
    description: "Learn chemistry with clarity.",
    icon: FlaskConical,
  },
  {
    name: "Biology",
    description: "Explore life sciences in depth.",
    icon: BookOpen,
  },
  {
    name: "ICT",
    description: "Develop essential technology skills.",
    icon: Laptop,
  },
];

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description:
      "Sign up as a student or tutor and set up your profile.",
    icon: UserPlus,
  },
  {
    number: "02",
    title: "Find the Right Match",
    description:
      "Explore tuition opportunities or connect with suitable students.",
    icon: Search,
  },
  {
    number: "03",
    title: "Start Learning",
    description:
      "Connect, communicate, and begin your learning journey.",
    icon: GraduationCap,
  },
];

const studentFeatures = [
  "Browse available tuition opportunities",
  "Apply to suitable tuition posts",
  "Manage your applications",
  "Access Student Pro benefits",
];

const tutorFeatures = [
  "Create and manage tuition posts",
  "Connect with interested students",
  "Manage tuition applications",
  "Access unlimited posts with Tutor Pro",
];

export default function Home() {
  return (
    <main className="flex-1 overflow-hidden">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28 lg:px-8">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Sparkles size={16} />
              Your learning journey starts here
            </div>

            <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Find the Right Tutor.
              <span className="mt-2 block text-primary">
                Learn with Confidence.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">
              MentorLagbe brings students and tutors together.
              Discover tuition opportunities, connect with the right
              people, and make learning more accessible.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tuitions"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:opacity-90"
              >
                Explore Tuitions
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/signup"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-7 py-3 text-sm font-bold text-foreground transition hover:border-primary hover:text-primary"
              >
                Become a Tutor
                <GraduationCap size={18} />
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
              <span className="flex items-center gap-2">
                <ShieldCheck size={17} className="text-primary" />
                Role-based accounts
              </span>

              <span className="flex items-center gap-2">
                <Users size={17} className="text-primary" />
                Student and tutor platform
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -left-5 top-10 h-32 w-32 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute -right-5 bottom-5 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />

            <div className="relative rounded-3xl border border-border bg-surface p-5 shadow-2xl shadow-primary/10 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-muted">
                    Learning made connected
                  </p>
                  <h2 className="mt-1 font-heading text-xl font-extrabold text-foreground">
                    MentorLagbe
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                  <GraduationCap size={28} />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-primary/10 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                    <BookOpen size={23} />
                  </div>
                  <h3 className="mt-4 font-bold text-foreground">
                    Students
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    Discover learning opportunities.
                  </p>
                </div>

                <div className="rounded-2xl bg-secondary/15 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                    <GraduationCap size={23} />
                  </div>
                  <h3 className="mt-4 font-bold text-foreground">
                    Tutors
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    Share knowledge and teach.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-border bg-background p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ShieldCheck size={21} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      A structured platform
                    </h3>
                    <p className="mt-1 text-xs text-muted">
                      Organized tuition management
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-primary">
                <Sparkles size={16} />
                Connect. Learn. Grow.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Subjects */}
      <section className="bg-surface-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Explore Subjects
            </span>

            <h2 className="mt-3 font-heading text-3xl font-extrabold text-foreground sm:text-4xl">
              Learn What Matters to You
            </h2>

            <p className="mt-4 leading-7 text-muted">
              Explore different learning areas and find opportunities
              that match your academic goals.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => {
              const Icon = subject.icon;

              return (
                <div
                  key={subject.name}
                  className="group rounded-2xl border border-border bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 font-heading text-lg font-bold text-foreground">
                    {subject.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted">
                    {subject.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Simple Process
            </span>

            <h2 className="mt-3 font-heading text-3xl font-extrabold text-foreground sm:text-4xl">
              How MentorLagbe Works
            </h2>

            <p className="mt-4 leading-7 text-muted">
              Getting started is simple. Follow these steps to begin
              connecting with the learning community.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative rounded-2xl border border-border bg-surface p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-4xl font-extrabold text-primary/25">
                      {step.number}
                    </span>

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon size={24} />
                    </div>
                  </div>

                  <h3 className="mt-7 font-heading text-xl font-bold text-foreground">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-surface-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Membership Plans
            </span>

            <h2 className="mt-3 font-heading text-3xl font-extrabold text-foreground sm:text-4xl">
              Choose Your Plan
            </h2>

            <p className="mt-4 leading-7 text-muted">
              Choose the membership that matches your role and
              learning goals.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {/* Student Pro */}
            <div className="rounded-2xl border border-border bg-surface p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BookOpen size={23} />
                </div>

                <div>
                  <h3 className="font-heading text-xl font-extrabold text-foreground">
                    Student Pro
                  </h3>
                  <p className="text-sm text-muted">
                    For students
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <span className="font-heading text-4xl font-extrabold text-foreground">
                  ৳1,000
                </span>
                <span className="ml-2 text-sm text-muted">
                  one-time
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-muted">
                Get access to the Student Pro membership.
              </p>

              <ul className="mt-7 space-y-4">
                {studentFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-foreground"
                  >
                    <Check
                      size={18}
                      className="mt-0.5 shrink-0 text-primary"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className="mt-8 flex min-h-12 items-center justify-center rounded-xl border border-border px-5 py-3 text-sm font-bold text-foreground transition hover:border-primary hover:text-primary"
              >
                Get Student Pro
              </Link>
            </div>

            {/* Tutor Pro */}
            <div className="relative rounded-2xl border-2 border-primary bg-surface p-7 shadow-lg shadow-primary/10">
              <span className="absolute -top-3 right-6 rounded-full bg-primary px-4 py-1 text-xs font-bold text-white">
                Tutor Plan
              </span>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <GraduationCap size={23} />
                </div>

                <div>
                  <h3 className="font-heading text-xl font-extrabold text-foreground">
                    Tutor Pro
                  </h3>
                  <p className="text-sm text-muted">
                    For tutors
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <span className="font-heading text-4xl font-extrabold text-foreground">
                  ৳1,500
                </span>
                <span className="ml-2 text-sm text-muted">
                  one-time
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-muted">
                Unlock unlimited tuition posting with Tutor Pro.
              </p>

              <ul className="mt-7 space-y-4">
                {tutorFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-foreground"
                  >
                    <Check
                      size={18}
                      className="mt-0.5 shrink-0 text-primary"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className="mt-8 flex min-h-12 items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90"
              >
                Get Tutor Pro
                <ArrowRight size={17} className="ml-2" />
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted">
            Membership prices are one-time payments. Payment and
            membership activation are handled through the platform.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center sm:px-12 sm:py-16">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

            <div className="relative mx-auto max-w-2xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
                <GraduationCap size={30} />
              </div>

              <h2 className="mt-6 font-heading text-3xl font-extrabold text-white sm:text-4xl">
                Ready to Start Your Journey?
              </h2>

              <p className="mt-4 leading-7 text-white/80">
                Join MentorLagbe and take the next step in your
                teaching or learning journey.
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
                  href="/signin"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/40 px-7 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
