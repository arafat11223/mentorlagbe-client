"use client";

import {
  BadgeCheck,
  Clock3,
  CreditCard,
  Users,
} from "lucide-react";

import {
  DashboardError,
  DashboardLoading,
  DashboardPageHeading,
  DashboardStatCard,
} from "../../../components/dashboard/DashboardOverview";
import { useDashboardStats } from "../../../components/dashboard/useDashboardStats";
import { Card } from "../../../components/ui/Card";

interface RevenueItem {
  currency: string;
  totalAmount: number;
  totalPayments: number;
}

interface AdminDashboardStats {
  totalUsers: number;
  totalTutors: number;
  pendingTuitions: number;
  approvedTuitions: number;
  revenueByCurrency: RevenueItem[];
}

function formatRevenue(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency.toUpperCase()} ${amount.toLocaleString("en-US")}`;
  }
}

export default function AdminDashboardPage() {
  const { data, loading, error, retry } =
    useDashboardStats<AdminDashboardStats>("/api/dashboard/admin");

  if (loading) {
    return <DashboardLoading label="Admin dashboard" />;
  }

  if (error || !data) {
    return (
      <DashboardError
        message={error || "Admin statistics are unavailable."}
        onRetry={retry}
      />
    );
  }

  return (
    <section>
      <DashboardPageHeading
        eyebrow="Platform administration"
        title="Platform Overview"
        description="Monitor platform users, tuition moderation progress and recorded payment revenue."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          title="Total Users"
          value={data.totalUsers}
          description="Registered platform users"
          icon={Users}
        />

        <DashboardStatCard
          title="Total Tutors"
          value={data.totalTutors}
          description="Registered tutor accounts"
          icon={Users}
          iconClassName="bg-blue-500/10 text-blue-600"
        />

        <DashboardStatCard
          title="Pending Tuitions"
          value={data.pendingTuitions}
          description="Listings awaiting moderation"
          icon={Clock3}
          iconClassName="bg-amber-500/10 text-amber-600"
        />

        <DashboardStatCard
          title="Approved Tuitions"
          value={data.approvedTuitions}
          description="Approved non-deleted listings"
          icon={BadgeCheck}
          iconClassName="bg-emerald-500/10 text-emerald-600"
        />
      </div>

      <Card className="mt-7 overflow-hidden">
        <div className="flex items-center gap-3 border-b border-border p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
            <CreditCard size={20} />
          </div>

          <div>
            <h3 className="font-bold text-foreground">
              Payment Revenue
            </h3>
            <p className="mt-1 text-xs text-muted">
              Recorded successful payments, grouped by currency
            </p>
          </div>
        </div>

        <div className="p-5">
          {data.revenueByCurrency.length === 0 ? (
            <div className="py-8 text-center">
              <p className="font-semibold text-foreground">
                No recorded payments yet
              </p>
              <p className="mt-2 text-sm text-muted">
                Revenue information will appear here when successful payments
                are recorded.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {data.revenueByCurrency.map((item) => (
                <div
                  key={item.currency}
                  className="rounded-xl border border-border bg-background p-5"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">
                    {item.currency}
                  </p>

                  <p className="mt-2 text-2xl font-extrabold tracking-tight text-foreground">
                    {formatRevenue(item.totalAmount, item.currency)}
                  </p>

                  <p className="mt-2 text-sm text-muted">
                    {item.totalPayments} successful{" "}
                    {item.totalPayments === 1 ? "payment" : "payments"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </section>
  );
}
