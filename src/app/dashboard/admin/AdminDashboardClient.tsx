"use client";

import {
  BadgeCheck,
  CreditCard,
  Users,
  Clock3,
  Wallet,
} from "lucide-react";

import {
  DashboardError,
  DashboardLoading,
  DashboardPageHeading,
  DashboardStatCard,
} from "../../../components/dashboard/DashboardOverview";
import { useDashboardStats } from "../../../components/dashboard/useDashboardStats";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card";

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
    <section className="space-y-7">
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

      <Card className="overflow-hidden">
        <CardHeader className="flex flex-col gap-3 border-b border-border sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
              <CreditCard size={20} />
            </div>

            <div className="min-w-0">
              <CardTitle>Payment Revenue</CardTitle>
              <CardDescription className="mt-1">
                Recorded successful payments, grouped by currency
              </CardDescription>
            </div>
          </div>

          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-muted">
            <Wallet size={14} />
            Revenue summary
          </span>
        </CardHeader>

        <div className="p-5 sm:p-6">
          {data.revenueByCurrency.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background px-5 py-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-muted">
                <CreditCard size={22} />
              </div>

              <p className="mt-4 font-semibold text-foreground">
                No recorded payments yet
              </p>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted">
                Revenue information will appear here when successful
                payments are recorded.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {data.revenueByCurrency.map((item) => (
                <div
                  key={item.currency}
                  className="rounded-xl border border-border bg-background p-5 transition-[border-color,box-shadow] duration-200 hover:border-primary/20 hover:shadow-[var(--shadow-card)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted">
                      {item.currency}
                    </p>

                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Wallet size={16} />
                    </span>
                  </div>

                  <p className="mt-3 break-words text-2xl font-extrabold tracking-tight text-foreground">
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
