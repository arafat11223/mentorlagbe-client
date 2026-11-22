"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";

import { authClient } from "../../lib/auth-client";
import { AuthLayout } from "../../components/auth/AuthLayout";

type UserRole = "student" | "tutor";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("student");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const signupData = {
        name: name.trim(),
        email: email.trim(),
        password,
        role,
      };

      const result = await authClient.signUp.email(signupData);

      if (result.error) {
        setError(result.error.message || "Registration failed.");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError("Unable to create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      eyebrow="Get started"
      title="Create your account"
      description="Join MentorLagbe and connect with the right learning opportunities."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-primary transition hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-foreground"
          >
            Full name
          </label>

          <div className="relative">
            <UserRound
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              maxLength={100}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your full name"
              className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-foreground"
          >
            Email address
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold text-foreground"
          >
            Password
          </label>

          <div className="relative">
            <LockKeyhole
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              maxLength={128}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>

          <p className="mt-2 text-xs text-muted">
            Use at least 8 characters for your password.
          </p>
        </div>

        <fieldset>
          <legend className="mb-3 text-sm font-semibold text-foreground">
            I want to join as
          </legend>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("student")}
              aria-pressed={role === "student"}
              className={`rounded-xl border p-4 text-left transition ${
                role === "student"
                  ? "border-primary bg-primary/5 ring-2 ring-primary/10"
                  : "border-border bg-background hover:border-primary/50"
              }`}
            >
              <span
                className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${
                  role === "student"
                    ? "bg-primary text-primary-foreground"
                    : "bg-surface-secondary text-muted"
                }`}
              >
                <BookOpen size={20} />
              </span>

              <span className="block text-sm font-semibold text-foreground">
                Student
              </span>

              <span className="mt-1 block text-xs leading-5 text-muted">
                Find a suitable tutor
              </span>
            </button>

            <button
              type="button"
              onClick={() => setRole("tutor")}
              aria-pressed={role === "tutor"}
              className={`rounded-xl border p-4 text-left transition ${
                role === "tutor"
                  ? "border-primary bg-primary/5 ring-2 ring-primary/10"
                  : "border-border bg-background hover:border-primary/50"
              }`}
            >
              <span
                className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${
                  role === "tutor"
                    ? "bg-primary text-primary-foreground"
                    : "bg-surface-secondary text-muted"
                }`}
              >
                <GraduationCap size={20} />
              </span>

              <span className="block text-sm font-semibold text-foreground">
                Tutor
              </span>

              <span className="mt-1 block text-xs leading-5 text-muted">
                Teach and share knowledge
              </span>
            </button>
          </div>
        </fieldset>

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
          {!loading && <ArrowRight size={17} />}
        </button>
      </form>
    </AuthLayout>
  );
}
