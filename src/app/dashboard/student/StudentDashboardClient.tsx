"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  FileText,
  GraduationCap,
  Lightbulb,
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
    <section className="space-y-7">
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

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
              <Lightbulb size={21} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                Learning tip
              </p>

              <h3 className="mt-1 text-base font-bold text-foreground">
                Keep moving forward
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                Explore available tuition opportunities and find a learning
                arrangement that matches your academic goals.
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
