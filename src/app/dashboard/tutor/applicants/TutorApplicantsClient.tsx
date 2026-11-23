"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Check,
  Clock3,
  LoaderCircle,
  RefreshCw,
  UserRound,
  X,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import { apiRequest, ApiError } from "../../../../lib/api/client";

type ApplicationStatus = "pending" | "accepted" | "rejected" | "cancelled";

interface TutorApplication {
  _id: string;
  tuitionId: string;
  tuitionTitle: string;
  subject: string;
  monthlyFee: number;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  preferredSchedule: string;
  studentNote: string;
  status: ApplicationStatus;
  appliedAt: string;
}

function getApplications(data: unknown): TutorApplication[] {
  if (Array.isArray(data)) return data as TutorApplication[];

  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;

    if (Array.isArray(record.applications)) {
      return record.applications as TutorApplication[];
    }

    if (Array.isArray(record.items)) {
      return record.items as TutorApplication[];
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

function StatusBadge({ status }: { status: ApplicationStatus }) {
  const styles: Record<ApplicationStatus, string> = {
    pending: "bg-amber-500/10 text-amber-600",
    accepted: "bg-emerald-500/10 text-emerald-600",
    rejected: "bg-danger/10 text-danger",
    cancelled: "bg-surface-secondary text-muted",
  };

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ${styles[status]}`}>
      {status}
    </span>
  );
}

export default function TutorApplicantsClient() {
  const [applications, setApplications] = useState<TutorApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadApplications = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await apiRequest<unknown>("/api/applications/tutor");
      setApplications(getApplications(response.data));
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Unable to load applicants."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadApplications();
  }, [loadApplications]);

  async function updateStatus(
    application: TutorApplication,
    status: "accepted" | "rejected"
  ) {
    const action = status === "accepted" ? "accept" : "reject";

    if (
      !window.confirm(
        `Are you sure you want to ${action} ${application.studentName}'s application?`
      )
    ) {
      return;
    }

    setUpdatingId(application._id);

    try {
      await apiRequest(
        `/api/applications/${encodeURIComponent(application._id)}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status }),
        }
      );

      toast.success(
        status === "accepted"
          ? "Application accepted successfully."
          : "Application rejected."
      );

      await loadApplications();
    } catch (err) {
      toast.error(
        err instanceof ApiError
          ? err.message
          : "Unable to update this application."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <section>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
            Tutor workspace
          </p>
          <h2 className="mt-2 font-heading text-2xl font-extrabold text-foreground">
            Tuition Applicants
          </h2>
          <p className="mt-2 text-sm text-muted">
            Review student applications for your tuition posts.
          </p>
        </div>

        <Link
          href="/dashboard/tutor/tuitions"
          className="inline-flex items-center justify-center rounded-xl border border-border bg-surface px-4 py-3 text-sm font-bold text-foreground transition hover:bg-surface-secondary"
        >
          Manage My Tuitions
        </Link>
      </div>

      {loading ? (
        <div className="mt-8 flex items-center justify-center rounded-2xl border border-border bg-surface p-12">
          <LoaderCircle className="animate-spin text-primary" size={26} />
          <span className="ml-3 text-sm text-muted">Loading applicants...</span>
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
          <UserRound className="mx-auto text-muted" size={36} />
          <h3 className="mt-4 font-bold text-foreground">
            No applicants yet
          </h3>
          <p className="mt-2 text-sm text-muted">
            Student applications for your tuition posts will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5">
          {applications.map((application) => (
            <article
              key={application._id}
              className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                      {application.subject}
                    </span>
                    <StatusBadge status={application.status} />
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-foreground">
                    {application.tuitionTitle}
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    Applicant: {application.studentName}
                  </p>
                </div>

                <p className="shrink-0 font-heading text-lg font-extrabold text-primary">
                  ৳{Number(application.monthlyFee || 0).toLocaleString("en-BD")}
                  <span className="ml-1 text-xs font-medium text-muted">
                    / month
                  </span>
                </p>
              </div>

              <div className="mt-5 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
                <div className="flex items-start gap-2 text-sm">
                  <UserRound className="mt-0.5 shrink-0 text-primary" size={17} />
                  <div className="min-w-0">
                    <p className="text-xs text-muted">Student contact</p>
                    <p className="mt-1 break-all font-medium text-foreground">
                      {application.studentEmail}
                    </p>
                    <p className="mt-1 font-medium text-foreground">
                      {application.studentPhone}
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

              {application.studentNote && (
                <div className="mt-5 rounded-xl bg-background p-4">
                  <p className="text-xs font-bold text-muted">
                    Student Note
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-foreground">
                    {application.studentNote}
                  </p>
                </div>
              )}

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <Link
                  href={`/dashboard/tutor/tuitions/${encodeURIComponent(application.tuitionId)}/edit`}
                  className="text-sm font-bold text-primary hover:underline"
                >
                  View My Tuition
                </Link>

                {application.status === "pending" && (
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={updatingId === application._id}
                      onClick={() => void updateStatus(application, "rejected")}
                      className="inline-flex items-center gap-2 rounded-xl border border-danger/30 px-4 py-2.5 text-xs font-bold text-danger transition hover:bg-danger/10 disabled:opacity-50"
                    >
                      {updatingId === application._id ? (
                        <LoaderCircle className="animate-spin" size={15} />
                      ) : (
                        <X size={15} />
                      )}
                      Reject
                    </button>

                    <button
                      type="button"
                      disabled={updatingId === application._id}
                      onClick={() => void updateStatus(application, "accepted")}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                    >
                      {updatingId === application._id ? (
                        <LoaderCircle className="animate-spin" size={15} />
                      ) : (
                        <Check size={15} />
                      )}
                      Accept
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

