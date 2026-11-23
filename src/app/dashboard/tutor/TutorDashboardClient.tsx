"use client";

import {
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
    <section>
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

      <div className="mt-7 rounded-2xl border border-border bg-surface p-6">
        <h3 className="text-base font-bold text-foreground">
          Build your teaching presence
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Keep your teaching profile and tuition opportunities organized.
          Your dashboard statistics update from your account activity.
        </p>
      </div>
    </section>
  );
}
