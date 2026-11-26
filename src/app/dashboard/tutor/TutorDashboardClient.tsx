"use client";

import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  FileText,
  Users,
} from "lucide-react";

import {
  DashboardError,
  DashboardLoading,
  DashboardPageHeading,
  DashboardStatCard,
  PlanBadge,
} from "../../../components/dashboard/DashboardOverview";
import { useDashboardStats } from "../../../components/dashboard/useDashboardStats";
import { Card } from "../../../components/ui/Card";

interface TutorDashboardStats {
  totalTuitions: number;
  approvedActiveTuitions: number;
  totalApplicants: number;
  currentPlan: "free" | "pro";
}

export default function TutorDashboardPage() {
  const { data, loading, error, retry } =
    useDashboardStats<TutorDashboardStats>("/api/dashboard/tutor");

  if (loading) {
    return <DashboardLoading label="Tutor dashboard" />;
  }

  if (error || !data) {
    return (
      <DashboardError
        message={error || "Tutor statistics are unavailable."}
        onRetry={retry}
      />
    );
  }

  return (
    <section className="space-y-7">
      <DashboardPageHeading
        eyebrow="Tutor workspace"
        title="Your Teaching Overview"
        description="Monitor your tuition listings, approved opportunities and student interest."
      >
        <PlanBadge plan={data.currentPlan} />
      </DashboardPageHeading>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          title="Total Tuition Posts"
          value={data.totalTuitions}
          description="Your non-deleted tuition listings"
          icon={FileText}
        />

        <DashboardStatCard
          title="Approved & Active"
          value={data.approvedActiveTuitions}
          description="Listings currently available"
          icon={CheckCircle2}
          iconClassName="bg-emerald-500/10 text-emerald-600"
        />

        <DashboardStatCard
          title="Total Applicants"
          value={data.totalApplicants}
          description="Applications received across your listings"
          icon={Users}
          iconClassName="bg-blue-500/10 text-blue-600"
        />

        <DashboardStatCard
          title="Current Membership"
          value={data.currentPlan.toUpperCase()}
          description="Your current platform plan"
          icon={BookOpen}
        />
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
              <BookOpen size={21} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                Teaching tip
              </p>

              <h3 className="mt-1 text-base font-bold text-foreground">
                Build your teaching presence
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                Keep your teaching profile and tuition opportunities
                organized. Your dashboard statistics update from your
                account activity.
              </p>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="hidden shrink-0 text-muted/60 sm:block"
          >
            <ArrowUpRight size={22} />
          </div>
        </div>
      </Card>
    </section>
  );
}
