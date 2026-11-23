"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  FileText,
  LoaderCircle,
  MapPin,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import { apiRequest, ApiError } from "../../../../lib/api/client";

type ApplicationStatus = "pending" | "accepted" | "rejected" | "cancelled";

interface StudentApplication {
  _id: string;
  tuitionId: string;
  tuitionTitle: string;
  subject: string;
  monthlyFee: number;
  tutorEmail: string;
  preferredSchedule: string;
  status: ApplicationStatus;
  appliedAt: string;
}

function getApplications(data: unknown): StudentApplication[] {
  if (Array.isArray(data)) return data as StudentApplication[];

  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;

    if (Array.isArray(record.applications)) {
      return record.applications as StudentApplication[];
    }

    if (Array.isArray(record.items)) {
      return record.items as StudentApplication[];
    }
  }

  return [];
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return date.toLocaleDateString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatFee(value: number) {
  return `৳${Number(value || 0).toLocaleString("en-BD")}`;
}

function StatusBadge({ status }: { status: ApplicationStatus }) {
  const styles: Record<ApplicationStatus, string> = {
    pending: "bg-amber-500/10 text-amber-600",
    accepted: "bg-emerald-500/10 text-emerald-600",
    rejected: "bg-danger/10 text-danger",
    cancelled: "bg-surface-secondary text-muted",
  };

  const labels: Record<ApplicationStatus, string> = {
    pending: "Pending",
    accepted: "Accepted",
    rejected: "Rejected",
    cancelled: "Cancelled",
  };

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function StudentApplicationsClient() {
  const [applications, setApplications] = useState<StudentApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const loadApplications = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await apiRequest<unknown>("/api/applications/mine");
      setApplications(getApplications(response.data));
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Unable to load your applications."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadApplications();
  }, [loadApplications]);

  async function cancelApplication(application: StudentApplication) {
    if (application.status !== "pending") return;

    const confirmed = window.confirm(
      `Cancel your application for "${application.tuitionTitle}"?`
    );

    if (!confirmed) return;

    setCancellingId(application._id);

    try {
      await apiRequest(
        `/api/applications/${encodeURIComponent(application._id)}/cancel`,
        { method: "PATCH" }
      );

      toast.success("Application cancelled successfully.");
      await loadApplications();
    } catch (err) {
      toast.error(
        err instanceof ApiError
          ? err.message
          : "Unable to cancel this application."
      );
    } finally {
      setCancellingId(null);
    }
  }

  return (
    <section>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
            Student workspace
          </p>
          <h2 className="mt-2 font-heading text-2xl font-extrabold text-foreground">
            My Applications
          </h2>
          <p className="mt-2 text-sm text-muted">
            Track your submitted tuition applications and tutor responses.
          </p>
        </div>

        <Link
          href="/tuitions"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-primary/90"
        >
          <FileText size={17} />
          Find Tuitions
        </Link>
      </div>

      {loading ? (
        <div className="mt-8 flex items-center justify-center rounded-2xl border border-border bg-surface p-12">
          <LoaderCircle className="animate-spin text-primary" size={26} />
          <span className="ml-3 text-sm text-muted">Loading applications...</span>
        </div>
      ) : error ? (
        <div className="mt-8 rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="text-sm text-muted">{error}</p>
          <button
            type="button"
            onClick={() => void loadApplications()}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      ) : applications.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
          <FileText className="mx-auto text-muted" size={36} />
          <h3 className="mt-4 font-bold text-foreground">
            No applications yet
          </h3>
          <p className="mt-2 text-sm text-muted">
            When you apply for a tuition, it will appear here.
          </p>
          <Link
            href="/tuitions"
            className="mt-5 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary/90"
          >
            Explore Tuitions
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-5">
          {applications.map((application) => (
            <article
              key={application._id}
              className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                      {application.subject}
                    </span>
                    <StatusBadge status={application.status} />
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-foreground">
                    {application.tuitionTitle}
                  </h3>
                </div>

                <p className="shrink-0 font-heading text-xl font-extrabold text-primary">
                  {formatFee(application.monthlyFee)}
                  <span className="ml-1 text-xs font-medium text-muted">
                    / month
                  </span>
                </p>
              </div>

              <div className="mt-5 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="mt-0.5 shrink-0 text-primary" size={17} />
                  <div>
                    <p className="text-xs text-muted">Tutor contact</p>
                    <p className="mt-1 break-all font-medium text-foreground">
                      {application.tutorEmail}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <Clock3 className="mt-0.5 shrink-0 text-primary" size={17} />
                  <div>
                    <p className="text-xs text-muted">Preferred schedule</p>
                    <p className="mt-1 font-medium text-foreground">
                      {application.preferredSchedule}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted">
                  <CalendarDays size={16} className="text-primary" />
                  Applied on {formatDate(application.appliedAt)}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <Link
                  href={`/tuitions/${encodeURIComponent(application.tuitionId)}`}
                  className="text-sm font-bold text-primary hover:underline"
                >
                  View Tuition Details
                </Link>

                {application.status === "pending" && (
                  <button
                    type="button"
                    disabled={cancellingId === application._id}
                    onClick={() => void cancelApplication(application)}
                    className="inline-flex items-center gap-2 rounded-xl border border-danger/30 px-4 py-2.5 text-xs font-bold text-danger transition hover:bg-danger/10 disabled:opacity-50"
                  >
                    {cancellingId === application._id ? (
                      <LoaderCircle className="animate-spin" size={15} />
                    ) : (
                      <XCircle size={15} />
                    )}
                    Cancel Application
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

