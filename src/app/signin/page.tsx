"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";

import { authClient } from "../../lib/auth-client";
import { AuthLayout } from "../../components/auth/AuthLayout";

export default function SigninPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (result.error) {
        setError(result.error.message || "Invalid email or password.");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in to your account"
      description="Enter your account details to continue your learning journey with MentorLagbe."
      footer={
        <>
          Dont have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-primary transition hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
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
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>
        </div>

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
          {loading ? "Signing in..." : "Sign in"}
          {!loading && <ArrowRight size={17} />}
        </button>
      </form>
    </AuthLayout>
  );
}