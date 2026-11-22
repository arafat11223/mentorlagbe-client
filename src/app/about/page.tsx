
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Search,
  ShieldCheck,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";

const studentSteps = [
  {
    number: "01",
    title: "Create Your Account",
    description:
      "Register as a student and set up your account to explore available tuition opportunities.",
    icon: UserPlus,
  },
  {
    number: "02",
    title: "Explore Tuitions",
    description:
      "Browse available tuition posts and find opportunities based on subject, class, and learning mode.",
    icon: Search,
  },
  {
    number: "03",
    title: "Apply for Tuition",
    description:
      "Choose a suitable tuition opportunity and submit your application.",
    icon: ClipboardList,
  },
  {
    number: "04",
    title: "Manage Applications",
    description:
      "Keep track of your applications and manage your learning opportunities.",
    icon: LayoutDashboard,
  },
];

const tutorSteps = [
  {
    number: "01",
    title: "Join as a Tutor",
    description:
      "Create your tutor account and prepare your profile to start sharing your teaching opportunities.",
    icon: UserPlus,
  },
  {
    number: "02",
    title: "Create Tuition Posts",
    description:
      "Add tuition details including subject, class, teaching mode, location, and monthly fee.",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "Admin Review",
    description:
      "Your submitted tuition post goes through the platform's admin approval process.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Manage Your Posts",
    description:
      "Manage your tuition listings and review applications from interested students.",
    icon: LayoutDashboard,
  },
];

const platformFeatures = [
  {
    title: "Role-Based Accounts",
    description:
      "Separate experiences and permissions for students, tutors, and administrators.",
    icon: Users,
  },
  {
    title: "Organized Tuition Listings",
    description:
      "Explore tuition opportunities with structured details and useful filters.",
    icon: BookOpen,
  },
  {
    title: "Application Management",
    description:
      "Keep tuition applications organized through a dedicated platform workflow.",
    icon: ClipboardList,
  },
  {
    title: "Membership Plans",
    description:
      "Choose from Student Pro and Tutor Pro membership options.",
    icon: Wallet,
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1 overflow-hidden">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
            <GraduationCap size={17} />
            About MentorLagbe
          </span>

          <h1 className="mx-auto mt-7 max-w-4xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Connecting Students and Tutors.
            <span className="mt-2 block text-primary">
              Making Learning Accessible.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            MentorLagbe is a tuition management platform designed
            to bring students and tutors together through organized
            tuition opportunities and application management.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/tuitions"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:opacity-90"
            >
              Explore Tuitions
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/signup"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-surface px-7 py-3 text-sm font-bold text-foreground transition hover:border-primary hover:text-primary"
            >
              Join MentorLagbe
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Introduction */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Our Platform
            </span>

            <h2 className="mt-3 font-heading text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
              One Platform.
              <span className="block text-primary">
                Two Learning Roles.
              </span>
            </h2>

            <p className="mt-6 leading-8 text-muted">
              MentorLagbe provides a structured environment where
              students can discover tuition opportunities and
              tutors can publish and manage their tuition posts.
            </p>

            <p className="mt-4 leading-8 text-muted">
              With role-based accounts and an admin approval
              process, the platform keeps tuition management
              organized from listing creation to student
              applications.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BookOpen size={25} />
              </div>

              <h3 className="mt-5 font-heading text-xl font-bold text-foreground">
                For Students
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted">
                Discover tuition opportunities, apply to suitable
                listings, and manage your applications.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                <GraduationCap size={25} />
              </div>

              <h3 className="mt-5 font-heading text-xl font-bold text-foreground">
                For Tutors
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted">
                Publish tuition posts, manage listings, and review
                applications from interested students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Workflow */}
      <section className="bg-surface-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Student Journey
            </span>

            <h2 className="mt-3 font-heading text-3xl font-extrabold text-foreground sm:text-4xl">
              How Students Get Started
            </h2>

            <p className="mt-4 leading-7 text-muted">
              Find suitable tuition opportunities and manage
              your applications through a simple workflow.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {studentSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="rounded-2xl border border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-3xl font-extrabold text-primary/30">
                      {step.number}
                    </span>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon size={22} />
                    </div>
                  </div>

                  <h3 className="mt-6 font-heading text-lg font-bold text-foreground">
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

      {/* Tutor Workflow */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Tutor Journey
            </span>

            <h2 className="mt-3 font-heading text-3xl font-extrabold text-foreground sm:text-4xl">
              How Tutors Get Started
            </h2>

            <p className="mt-4 leading-7 text-muted">
              Create tuition opportunities and manage your
              listings through the platform.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tutorSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="rounded-2xl border border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-3xl font-extrabold text-primary/30">
                      {step.number}
                    </span>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                      <Icon size={22} />
                    </div>
                  </div>

                  <h3 className="mt-6 font-heading text-lg font-bold text-foreground">
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

      {/* Platform Features */}
      <section className="bg-surface-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Platform Features
            </span>

            <h2 className="mt-3 font-heading text-3xl font-extrabold text-foreground sm:text-4xl">
              Everything in One Organized Place
            </h2>

            <p className="mt-4 leading-7 text-muted">
              Tools and workflows designed to make tuition
              management easier for everyone.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {platformFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="flex gap-5 rounded-2xl border border-border bg-surface p-6"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={24} />
                  </div>

                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-muted">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Principles */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-surface p-8 sm:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ShieldCheck size={30} />
              </div>

              <h2 className="mt-6 font-heading text-3xl font-extrabold text-foreground">
                Organized by Design
              </h2>

              <p className="mt-4 leading-8 text-muted">
                Different roles have different responsibilities.
                MentorLagbe uses role-based access and an admin
                review process to keep platform activities
                structured and manageable.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {[
                "Dedicated student and tutor access",
                "Admin-reviewed tuition listings",
                "Structured application management",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl bg-background p-4"
                >
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-primary"
                  />

                  <span className="text-sm font-semibold leading-6 text-foreground">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
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
                Your Next Learning Journey Starts Here
              </h2>

              <p className="mt-4 leading-7 text-white/80">
                Join the MentorLagbe community and take your
                next step as a student or tutor.
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
                  href="/tuitions"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/40 px-7 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Browse Tuitions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
