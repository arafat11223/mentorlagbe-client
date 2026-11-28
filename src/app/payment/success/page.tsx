"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "@/lib/api/client";

type CheckoutVerification = {
  paymentStatus: "paid" | "pending";
  plan: "free" | "pro";
  activated: boolean;
};

type VerificationStatus =
  | "loading"
  | "active"
  | "pending"
  | "error";

export default function PaymentSuccessPage() {
  const [status, setStatus] =
    useState<VerificationStatus>("loading");

  const [message, setMessage] = useState("");

  const verifyPayment = useCallback(async () => {
    const sessionId = new URLSearchParams(
      window.location.search
    ).get("session_id");

    if (!sessionId) {
      setStatus("error");
      setMessage(
        "The checkout session ID is missing. Please return to pricing and try again."
      );
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response =
        await apiRequest<CheckoutVerification>(
          "/api/payments/verify-session",
          {
            method: "POST",
            body: JSON.stringify({ sessionId }),
          }
        );

      if (response.data?.paymentStatus === "paid") {
        setStatus("active");
      } else {
        setStatus("pending");
      }
    } catch (error) {
      setStatus("error");

      setMessage(
        error instanceof Error
          ? error.message
          : "We could not verify your payment. Please try again."
      );
    }
  }, []);

  useEffect(() => {
    void verifyPayment();
  }, [verifyPayment]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        {status === "loading" && (
          <>
            <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

            <h1 className="text-2xl font-bold text-slate-900">
              Verifying Your Payment
            </h1>

            <p className="mt-3 text-sm text-slate-600">
              Please wait while we securely verify your Stripe checkout session.
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
              Your payment was verified by the server and your Pro membership is now active.
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
              Stripe has not confirmed this payment yet. If you have completed checkout, please check again shortly.
            </p>

            <button
              type="button"
              onClick={() => void verifyPayment()}
              className="mt-7 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Check Again
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-2xl font-bold text-slate-900">
              Could Not Verify Payment
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {message}
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => void verifyPayment()}
                className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white"
              >
                Try Again
              </button>

              <Link
                href="/pricing"
                className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
              >
                Back to Pricing
              </Link>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
