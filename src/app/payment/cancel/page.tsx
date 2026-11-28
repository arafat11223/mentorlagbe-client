import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl text-amber-700">
          !
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          Payment Cancelled
        </h1>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          Your checkout was cancelled. No Pro membership has been activated through this checkout.
          You can return to the pricing page whenever you are ready.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/pricing"
            className="inline-flex rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Return to Pricing
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
