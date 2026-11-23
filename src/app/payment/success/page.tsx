"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api/client";

type MembershipStatus = {
  role: "student" | "tutor" | "admin";
  plan: "free" | "pro";
};

type VerificationStatus = "loading" | "active" | "pending" | "error";

export default function PaymentSuccessPage() {
  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    apiRequest<MembershipStatus>("/api/users/me")
      .then((response) => {
        if (!mounted) return;

        setStatus(response.data?.plan === "pro" ? "active" : "pending");
      })
      .catch(() => {
        if (!mounted) return;

        setStatus("error");
        setMessage(
          "We could not verify your membership. Please sign in and check again."
        );
      });

    return () => {
      mounted = false;
    };
  }, []);

  async function handleRetry() {
    setStatus("loading");
    setMessage("");

    try {
      const response = await apiRequest<MembershipStatus>("/api/users/me");
      setStatus(response.data?.plan === "pro" ? "active" : "pending");
    } catch {
      setStatus("error");
      setMessage(
        "We could not verify your membership. Please sign in and check again."
      );
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        {status === "loading" && (
          <>
            <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
            <h1 className="text-2xl font-bold text-slate-900">
              Verifying your payment
            </h1>
            <p className="mt-3 text-sm text-slate-600">
              Please wait while we check your membership status.
            </p>
          </>
        )}

        {status === "active" && (
          <>
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
              ✓
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Pro Membership Activated!
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Your payment was verified and your Pro membership is now active.
            </p>
            <Link
              href="/dashboard"
              className="mt-7 inline-flex rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Go to Dashboard
            </Link>
          </>
        )}

        {status === "pending" && (
          <>
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl text-amber-700">
              !
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Payment Verification Pending
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Your membership has not been activated yet. Payment confirmation
              may take a short time. Please check again shortly.
            </p>
            <button
              type="button"
              onClick={handleRetry}
              className="mt-7 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Check Again
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-2xl font-bold text-slate-900">
              Could Not Verify Membership
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {message}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={handleRetry}
                className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white"
              >
                Try Again
              </button>
              <Link
                href="/signin"
                className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
              >
                Sign In
              </Link>
            </div>
          </>
        )}
      </section>
    </main>
  );
}