"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api/client";

type PaymentRecord = {
  _id: string;
  planName: string;
  amount: number;
  currency: "usd";
  transactionId: string | null;
  paymentStatus: "pending" | "paid" | "failed";
  paidAt: string | null;
  createdAt: string;
};

function formatDate(value: string | null) {
  if (!value) return "Not available";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function statusClass(status: PaymentRecord["paymentStatus"]) {
  if (status === "paid") {
    return "bg-green-500/10 text-green-600";
  }

  if (status === "failed") {
    return "bg-red-500/10 text-red-600";
  }

  return "bg-amber-500/10 text-amber-600";
}

export default function PaymentHistory() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    apiRequest<PaymentRecord[]>("/api/payments/mine")
      .then((response) => {
        if (!mounted) return;

        setPayments(response.data ?? []);
        setError("");
      })
      .catch((requestError) => {
        if (!mounted) return;

        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load payment history."
        );
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  async function handleRefresh() {
    setLoading(true);
    setError("");

    try {
      const response = await apiRequest<PaymentRecord[]>("/api/payments/mine");
      setPayments(response.data ?? []);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to load payment history."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Payment History
          </h1>
          <p className="mt-1 text-sm text-muted">
            Review your MentorLagbe membership payments.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={loading}
          className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary disabled:opacity-50"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600"
        >
          {error}
        </div>
      )}

      {loading && payments.length === 0 && (
        <div className="rounded-2xl border border-border bg-surface p-8 text-center text-sm text-muted">
          Loading payment history...
        </div>
      )}

      {!loading && !error && payments.length === 0 && (
        <div className="rounded-2xl border border-border bg-surface px-6 py-12 text-center">
          <h2 className="text-lg font-bold text-foreground">
            No payments yet
          </h2>
          <p className="mt-2 text-sm text-muted">
            Your membership payment records will appear here.
          </p>
        </div>
      )}

      {payments.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="border-b border-border bg-secondary/40 text-muted">
                <tr>
                  <th className="px-5 py-4 font-semibold">Plan</th>
                  <th className="px-5 py-4 font-semibold">Amount</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Date</th>
                  <th className="px-5 py-4 font-semibold">Transaction</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {payments.map((payment) => (
                  <tr key={payment._id}>
                    <td className="px-5 py-4 font-semibold text-foreground">
                      {payment.planName}
                    </td>

                    <td className="px-5 py-4 font-medium text-foreground">
                      {formatAmount(payment.amount)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ${statusClass(payment.paymentStatus)}`}
                      >
                        {payment.paymentStatus}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-muted">
                      {formatDate(payment.paidAt || payment.createdAt)}
                    </td>

                    <td className="px-5 py-4 font-mono text-xs text-muted">
                      {payment.transactionId
                        ? `${payment.transactionId.slice(0, 16)}...`
                        : "Pending"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}