"use client";

import Link from "next/link";

import { useCallback, useEffect, useState } from "react";
import {
  AlertCircle,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FileText,
  MapPin,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { toast } from "sonner";

import { apiRequest } from "../../../../lib/api/client";
import type {
  ApiSuccessResponse,
  PaginationMetadata,
} from "../../../../lib/api/types";

import { Badge } from "../../../../components/ui/Badge";
import { Button } from "../../../../components/ui/Button";
import { Card } from "../../../../components/ui/Card";

type ApprovalStatus = "pending" | "approved" | "rejected";

type ApprovalFilter = "all" | ApprovalStatus;

interface TuitionRecord {
  _id: string;
  title: string;
  tuitionType: "group" | "one-to-one";
  subject: string;
  classLevel: string;
  mode: "online" | "offline";
  location: string;
  monthlyFee: number;
  daysPerWeek: number;
  bannerImage: string | null;
  description: string;
  approvalStatus: ApprovalStatus;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TuitionListResponse extends ApiSuccessResponse<TuitionRecord[]> {
  pagination?: PaginationMetadata;
}

const PAGE_SIZE = 10;

const approvalInformation: Record<
  ApprovalStatus,
  { label: string; variant: "warning" | "success" | "danger" }
> = {
  pending: {
    label: "Pending review",
    variant: "warning",
  },
  approved: {
    label: "Approved",
    variant: "success",
  },
  rejected: {
    label: "Rejected",
    variant: "danger",
  },
};

function formatFee(amount: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function TutorTuitionsPage() {
  const [tuitions, setTuitions] = useState<TuitionRecord[]>([]);
  const [pagination, setPagination] = useState<PaginationMetadata>({
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 0,
  });

  const [page, setPage] = useState(1);
  const [approvalFilter, setApprovalFilter] =
    useState<ApprovalFilter>("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState<string | null>(null);

  const loadTuitions = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PAGE_SIZE),
      });

      if (approvalFilter !== "all") {
        params.set("approvalStatus", approvalFilter);
      }

      const response = (await apiRequest<TuitionRecord[]>(
        `/api/tuitions/mine?${params.toString()}`
      )) as TuitionListResponse;

      setTuitions(response.data ?? []);

      setPagination(
        response.pagination ?? {
          page,
          limit: PAGE_SIZE,
          total: 0,
          totalPages: 0,
        }
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load your tuition listings."
      );
    } finally {
      setLoading(false);
    }
  }, [page, approvalFilter]);

  useEffect(() => {
    void Promise.resolve().then(() => loadTuitions());
  }, [loadTuitions]);

  async function handleToggleStatus(tuition: TuitionRecord) {
    const nextStatus = !tuition.isActive;

    setActionId(tuition._id);

    try {
      await apiRequest(`/api/tuitions/${tuition._id}/status`, {
        method: "PATCH",
        body: JSON.stringify({
          isActive: nextStatus,
        }),
      });

      toast.success(
        nextStatus
          ? "Tuition listing activated."
          : "Tuition listing deactivated."
      );

      await loadTuitions();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Unable to update tuition status."
      );
    } finally {
      setActionId(null);
    }
  }

  async function handleDelete(tuition: TuitionRecord) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${tuition.title}"? This listing will be removed from your active management list.`
    );

    if (!confirmed) return;

    setActionId(tuition._id);

    try {
      await apiRequest(`/api/tuitions/${tuition._id}`, {
        method: "DELETE",
      });

      toast.success("Tuition listing deleted successfully.");

      if (tuitions.length === 1 && page > 1) {
        setPage((current) => current - 1);
      } else {
        await loadTuitions();
      }
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Unable to delete tuition listing."
      );
    } finally {
      setActionId(null);
    }
  }

  function handleFilterChange(value: ApprovalFilter) {
    setApprovalFilter(value);
    setPage(1);
  }

  return (
    <section className="space-y-6" aria-busy={loading}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
            Tutor workspace
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-foreground">
            My Tuition Listings
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Manage your tuition opportunities, monitor approval progress,
            and control listing visibility.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={() => void loadTuitions()}
            disabled={loading}
          >
            <RefreshCw size={16} aria-hidden="true" />
            Refresh
          </Button>

          <Link
            href="/dashboard/tutor/tuitions/new"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <Plus size={17} aria-hidden="true" />
            Create Tuition
          </Link>
        </div>
      </div>

      <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">
            Your listings
          </p>
          <p className="mt-1 text-sm text-muted" aria-live="polite">
            {pagination.total} non-deleted tuition posts
          </p>
        </div>

        <div className="w-full sm:w-56">
          <label
            htmlFor="approval-filter"
            className="mb-2 block text-xs font-semibold text-muted"
          >
            Filter by approval status
          </label>

          <select
            id="approval-filter"
            value={approvalFilter}
            onChange={(event) =>
              handleFilterChange(event.target.value as ApprovalFilter)
            }
            className="h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
          >
            <option value="all">All listings</option>
            <option value="pending">Pending review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </Card>

      {loading ? (
        <div
          className="grid gap-4"
          role="status"
          aria-label="Loading tuition listings"
        >
          <span className="sr-only">Loading tuition listings...</span>

          {Array.from({ length: 3 }).map((_, index) => (
            <Card
              key={index}
              className="animate-pulse p-6"
              aria-hidden="true"
            >
              <div className="h-5 w-2/5 rounded bg-surface-secondary" />
              <div className="mt-4 h-4 w-3/5 rounded bg-surface-secondary" />
              <div className="mt-6 h-10 w-full rounded bg-surface-secondary" />
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card className="p-8 text-center">
          <AlertCircle
            className="mx-auto text-danger"
            size={36}
            aria-hidden="true"
          />

          <h3 className="mt-4 text-lg font-bold text-foreground">
            Unable to load tuition listings
          </h3>

          <p className="mt-2 text-sm text-muted" role="alert">
            {error}
          </p>

          <Button
            className="mt-5"
            onClick={() => void loadTuitions()}
          >
            <RefreshCw size={16} aria-hidden="true" />
            Try again
          </Button>
        </Card>
      ) : tuitions.length === 0 ? (
        <Card className="px-6 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary">
            <FileText size={27} aria-hidden="true" />
          </div>

          <h3 className="mt-5 text-lg font-bold text-foreground">
            {approvalFilter === "all"
              ? "No tuition listings yet"
              : "No matching tuition listings"}
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
            {approvalFilter === "all"
              ? "Your tuition posts will appear here after you create them."
              : "Try selecting another approval status to see your other listings."}
          </p>

          {approvalFilter !== "all" && (
            <Button
              variant="outline"
              className="mt-5"
              onClick={() => handleFilterChange("all")}
            >
              Show all listings
            </Button>
          )}
        </Card>
      ) : (
        <>
          <div className="grid gap-4">
            {tuitions.map((tuition) => {
              const approval = approvalInformation[tuition.approvalStatus];
              const busy = actionId === tuition._id;

              return (
                <Card key={tuition._id} className="overflow-hidden">
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={approval.variant}>
                            {approval.label}
                          </Badge>

                          <Badge
                            variant={tuition.isActive ? "success" : "default"}
                          >
                            {tuition.isActive ? "Active" : "Inactive"}
                          </Badge>

                          <Badge variant="info">
                            {tuition.mode === "online"
                              ? "Online"
                              : "Offline"}
                          </Badge>
                        </div>

                        <h3 className="mt-4 text-lg font-bold text-foreground">
                          {tuition.title}
                        </h3>

                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                          <span className="inline-flex items-center gap-2">
                            <BookOpen size={15} aria-hidden="true" />
                            {tuition.subject}
                          </span>

                          <span className="inline-flex items-center gap-2">
                            <FileText size={15} aria-hidden="true" />
                            {tuition.classLevel}
                          </span>

                          <span className="inline-flex items-center gap-2">
                            <MapPin size={15} aria-hidden="true" />
                            {tuition.location}
                          </span>

                          <span className="inline-flex items-center gap-2">
                            <CalendarDays size={15} aria-hidden="true" />
                            {tuition.daysPerWeek} days/week
                          </span>
                        </div>

                        <p className="mt-4 text-sm leading-6 text-muted">
                          {tuition.description.length > 180
                            ? `${tuition.description.slice(0, 180)}...`
                            : tuition.description}
                        </p>

                        <p className="mt-3 text-xs text-muted">
                          Created {formatDate(tuition.createdAt)}
                          {" · "}
                          {tuition.tuitionType === "group"
                            ? "Group tuition"
                            : "One-to-one"}
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-row items-center justify-between gap-4 border-t border-border pt-4 lg:min-w-44 lg:flex-col lg:items-end lg:border-t-0 lg:pt-0">
                        <div className="lg:text-right">
                          <p className="text-xs text-muted">Monthly fee</p>
                          <p className="mt-1 text-xl font-extrabold text-primary">
                            {formatFee(tuition.monthlyFee)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/dashboard/tutor/tuitions/${tuition._id}/edit`}
                            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3 text-sm font-semibold text-foreground transition hover:bg-surface-secondary"
                            aria-label={`Edit ${tuition.title}`}
                          >
                            <Pencil size={15} aria-hidden="true" />
                            Edit
                          </Link>

                          <Button
                            size="sm"
                            variant="outline"
                            disabled={busy}
                            onClick={() => void handleToggleStatus(tuition)}
                            aria-label={`${tuition.isActive ? "Deactivate" : "Activate"} ${tuition.title}`}
                          >
                            {tuition.isActive ? (
                              <ToggleRight size={16} aria-hidden="true" />
                            ) : (
                              <ToggleLeft size={16} aria-hidden="true" />
                            )}
                            {tuition.isActive ? "Deactivate" : "Activate"}
                          </Button>

                          <Button
                            size="sm"
                            variant="danger"
                            disabled={busy}
                            onClick={() => void handleDelete(tuition)}
                            aria-label={`Delete ${tuition.title}`}
                          >
                            <Trash2 size={15} aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted" aria-live="polite">
              Showing {tuitions.length} of {pagination.total} listings
              {" · "}
              Page {pagination.page} of {Math.max(pagination.totalPages, 1)}
            </p>

            <nav
              className="flex items-center gap-2"
              aria-label="Tuition listings pagination"
            >
              <Button
                size="sm"
                variant="outline"
                disabled={page <= 1 || loading}
                onClick={() => setPage((current) => current - 1)}
              >
                <ChevronLeft size={16} aria-hidden="true" />
                Previous
              </Button>

              <Button
                size="sm"
                variant="outline"
                disabled={
                  page >= pagination.totalPages || loading
                }
                onClick={() => setPage((current) => current + 1)}
              >
                Next
                <ChevronRight size={16} aria-hidden="true" />
              </Button>
            </nav>
          </div>
        </>
      )}
    </section>
  );
}