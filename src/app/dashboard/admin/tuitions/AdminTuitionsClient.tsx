"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AlertCircle,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  RefreshCw,
  Search,
  ShieldCheck,
  XCircle,
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
import {
  DashboardError,
  DashboardLoading,
  DashboardPageHeading,
} from "../../../../components/dashboard/DashboardOverview";

type ApprovalStatus = "pending" | "approved" | "rejected";

type ApprovalFilter = "all" | ApprovalStatus;

interface AdminTuition {
  _id: string;
  tutorId: string;
  tutorName: string;
  tutorEmail: string;
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

interface AdminTuitionListResponse
  extends ApiSuccessResponse<AdminTuition[]> {
  pagination?: PaginationMetadata;
}

const PAGE_SIZE = 10;

const approvalInformation: Record<
  ApprovalStatus,
  {
    label: string;
    variant: "warning" | "success" | "danger";
  }
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

export default function AdminTuitionsClient() {
  const [tuitions, setTuitions] = useState<AdminTuition[]>([]);

  const [pagination, setPagination] = useState<PaginationMetadata>({
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 0,
  });

  const [page, setPage] = useState(1);
  const [approvalFilter, setApprovalFilter] =
    useState<ApprovalFilter>("pending");

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

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

      if (search) {
        params.set("search", search);
      }

      const response = (
        await apiRequest<AdminTuition[]>(
          `/api/admin/tuitions?${params.toString()}`
        )
      ) as AdminTuitionListResponse;

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
          : "Unable to load tuition listings."
      );
    } finally {
      setLoading(false);
    }
  }, [page, approvalFilter, search]);

  useEffect(() => {
    void loadTuitions();
  }, [loadTuitions]);

  function handleFilterChange(value: ApprovalFilter) {
    setApprovalFilter(value);
    setPage(1);
  }

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearch(searchInput.trim());
    setPage(1);
  }

  async function handleModeration(
    tuition: AdminTuition,
    nextStatus: "approved" | "rejected"
  ) {
    if (tuition.approvalStatus !== "pending") {
      return;
    }

    if (nextStatus === "rejected") {
      const confirmed = window.confirm(
        `Are you sure you want to reject "${tuition.title}"?`
      );

      if (!confirmed) return;
    }

    setActionId(tuition._id);

    try {
      await apiRequest(
        `/api/admin/tuitions/${tuition._id}/approval`,
        {
          method: "PATCH",
          body: JSON.stringify({
            approvalStatus: nextStatus,
          }),
        }
      );

      toast.success(
        nextStatus === "approved"
          ? "Tuition listing approved successfully."
          : "Tuition listing rejected successfully."
      );

      if (tuitions.length === 1 && page > 1) {
        setPage((current) => current - 1);
      } else {
        await loadTuitions();
      }
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Unable to update tuition approval."
      );
    } finally {
      setActionId(null);
    }
  }

  return (
    <section className="space-y-6">
      <DashboardPageHeading
        eyebrow="Admin workspace"
        title="Tuition Moderation"
        description="Review tutor-submitted tuition listings and control which opportunities become visible on the public marketplace."
      >
        <Button
          variant="outline"
          onClick={() => void loadTuitions()}
          disabled={loading}
        >
          <RefreshCw size={16} />
          Refresh
        </Button>
      </DashboardPageHeading>

      <Card className="space-y-5 p-5">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-foreground">
            Manage tuition listings
          </h3>

          <p className="text-sm text-muted">
            {pagination.total} listing
            {pagination.total === 1 ? "" : "s"} found
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative min-w-0 flex-1">
            <Search
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search title, subject, tutor name or email..."
              aria-label="Search tuition listings"
              className="h-11 w-full rounded-lg border border-border bg-surface pl-10 pr-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </div>

          <Button type="submit">
            <Search size={16} />
            Search
          </Button>

          {search !== "" && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setSearchInput("");
                setSearch("");
                setPage(1);
              }}
            >
              Clear
            </Button>
          )}
        </form>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label
            htmlFor="admin-approval-filter"
            className="text-sm font-semibold text-muted"
          >
            Approval status
          </label>

          <select
            id="admin-approval-filter"
            value={approvalFilter}
            onChange={(event) =>
              handleFilterChange(event.target.value as ApprovalFilter)
            }
            className="h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 sm:w-56"
          >
            <option value="pending">Pending review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="all">All listings</option>
          </select>
        </div>
      </Card>

      {loading ? (
        <DashboardLoading label="Tuition moderation" />
      ) : error ? (
        <DashboardError
          message={error}
          onRetry={() => void loadTuitions()}
        />
      ) : tuitions.length === 0 ? (
        <Card className="px-6 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary">
            <ShieldCheck size={28} />
          </div>

          <h3 className="mt-5 text-lg font-bold text-foreground">
            {search
              ? "No matching tuition listings"
              : approvalFilter === "pending"
                ? "No pending listings"
                : "No tuition listings found"}
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
            {search
              ? "Try another search term or clear your current search."
              : approvalFilter === "pending"
                ? "New tutor submissions awaiting review will appear here."
                : "There are no listings available for this filter."}
          </p>

          {(search || approvalFilter !== "pending") && (
            <Button
              variant="outline"
              className="mt-5"
              onClick={() => {
                setSearch("");
                setSearchInput("");
                setApprovalFilter("pending");
                setPage(1);
              }}
            >
              Show pending listings
            </Button>
          )}
        </Card>
      ) : (
        <>
          <div className="grid gap-4">
            {tuitions.map((tuition) => {
              const approval =
                approvalInformation[tuition.approvalStatus];

              const busy = actionId === tuition._id;
              const isPending = tuition.approvalStatus === "pending";

              return (
                <Card key={tuition._id} className="overflow-hidden">
                  <div className="flex flex-col">
                    <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row">
                      <div
                        role="img"
                        aria-label={
                          tuition.bannerImage
                            ? `Banner image for ${tuition.title}`
                            : "No tuition banner image"
                        }
                        className="h-44 w-full shrink-0 rounded-xl border border-border bg-surface-secondary bg-cover bg-center lg:h-36 lg:w-52"
                        style={
                          tuition.bannerImage
                            ? {
                                backgroundImage: `url("${tuition.bannerImage}")`,
                              }
                            : undefined
                        }
                      >
                        {!tuition.bannerImage && (
                          <div className="flex h-full items-center justify-center text-muted">
                            <BookOpen size={34} />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={approval.variant}>
                            {approval.label}
                          </Badge>

                          <Badge variant="info">
                            {tuition.mode === "online"
                              ? "Online"
                              : "Offline"}
                          </Badge>

                          <Badge variant="default">
                            {tuition.tuitionType === "group"
                              ? "Group"
                              : "One-to-one"}
                          </Badge>

                          <Badge
                            variant={tuition.isActive ? "success" : "default"}
                          >
                            {tuition.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>

                        <h3 className="mt-4 text-lg font-bold text-foreground">
                          {tuition.title}
                        </h3>

                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                          <span className="inline-flex items-center gap-2">
                            <BookOpen size={15} />
                            {tuition.subject}
                          </span>

                          <span className="inline-flex items-center gap-2">
                            <ShieldCheck size={15} />
                            {tuition.classLevel}
                          </span>

                          <span className="inline-flex items-center gap-2">
                            <MapPin size={15} />
                            {tuition.location}
                          </span>

                          <span className="inline-flex items-center gap-2">
                            <CalendarDays size={15} />
                            {tuition.daysPerWeek} days/week
                          </span>
                        </div>

                        <div className="mt-4 rounded-lg bg-surface-secondary p-3">
                          <p className="text-xs font-bold uppercase tracking-wider text-muted">
                            Tutor information
                          </p>

                          <p className="mt-2 text-sm font-semibold text-foreground">
                            {tuition.tutorName}
                          </p>

                          <p className="mt-1 break-all text-sm text-muted">
                            {tuition.tutorEmail}
                          </p>
                        </div>

                        <p className="mt-4 whitespace-pre-line text-sm leading-6 text-muted">
                          {tuition.description.length > 240
                            ? `${tuition.description.slice(0, 240)}...`
                            : tuition.description}
                        </p>

                        <p className="mt-3 text-xs text-muted">
                          Submitted {formatDate(tuition.createdAt)}
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-row items-center justify-between gap-4 border-t border-border pt-4 lg:min-w-40 lg:flex-col lg:items-end lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                        <div className="lg:text-right">
                          <p className="text-xs text-muted">
                            Monthly fee
                          </p>

                          <p className="mt-1 text-xl font-extrabold text-primary">
                            {formatFee(tuition.monthlyFee)}
                          </p>
                        </div>

                        {isPending ? (
                          <div className="flex flex-wrap items-center gap-2">
                            <Button
                              size="sm"
                              disabled={busy}
                              isLoading={busy && actionId === tuition._id}
                              onClick={() =>
                                void handleModeration(tuition, "approved")
                              }
                            >
                              <CheckCircle2 size={15} />
                              Approve
                            </Button>

                            <Button
                              size="sm"
                              variant="danger"
                              disabled={busy}
                              onClick={() =>
                                void handleModeration(tuition, "rejected")
                              }
                            >
                              <XCircle size={15} />
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <p className="text-xs font-semibold text-muted">
                            No action required
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              Showing {tuitions.length} of {pagination.total} listings
              {" · "}
              Page {pagination.page} of {Math.max(pagination.totalPages, 1)}
            </p>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={page <= 1 || loading}
                onClick={() => setPage((current) => current - 1)}
              >
                <ChevronLeft size={16} />
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
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
