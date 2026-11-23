"use client";

import {
  CheckCircle2,
  Clock3,
  FileText,
  GraduationCap,
} from "lucide-react";

import {
  DashboardError,
  DashboardLoading,
  DashboardPageHeading,
  DashboardStatCard,
  PlanBadge,
} from "../../../components/dashboard/DashboardOverview";
import { useDashboardStats } from "../../../components/dashboard/useDashboardStats";

interface StudentDashboardStats {
  totalApplications: number;
  pendingApplications: number;
  acceptedApplications: number;
  currentPlan: "free" | "pro";
}

export default function StudentDashboardPage() {
  const { data, loading, error, retry } =
    useDashboardStats<StudentDashboardStats>("/api/dashboard/student");

  if (loading) {
    return <DashboardLoading label="Student dashboard" />;
  }

  if (error || !data) {
    return (
      <DashboardError
        message={error || "Student statistics are unavailable."}
        onRetry={retry}
      />
    );
  }

  return (
    <section>
      <DashboardPageHeading
        eyebrow="Student workspace"
        title="Your Learning Overview"
        description="Track your tuition applications and monitor your learning journey from one place."
      >
        <PlanBadge plan={data.currentPlan} />
      </DashboardPageHeading>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          title="Total Applications"
          value={data.totalApplications}
          description="All applications submitted"
          icon={FileText}
        />

        <DashboardStatCard
          title="Pending Applications"
          value={data.pendingApplications}
          description="Waiting for tutor response"
          icon={Clock3}
          iconClassName="bg-amber-500/10 text-amber-600"
        />

        <DashboardStatCard
          title="Accepted Applications"
          value={data.acceptedApplications}
          description="Applications accepted by tutors"
          icon={CheckCircle2}
          iconClassName="bg-emerald-500/10 text-emerald-600"
        />

        <DashboardStatCard
          title="Current Membership"
          value={data.currentPlan.toUpperCase()}
          description="Your current platform plan"
          icon={GraduationCap}
        />
      </div>

      <div className="mt-7 rounded-2xl border border-border bg-surface p-6">
        <h3 className="text-base font-bold text-foreground">
          Keep moving forward
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Explore available tuition opportunities and find a learning
          arrangement that matches your academic goals.
        </p>
      </div>
    </section>
  );
}
