
"use client";

import { useEffect, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  CalendarDays,
  Users,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  X,
} from "lucide-react";

import {
  apiRequest,
  ApiError,
} from "../../lib/api/client";
import type { PaginationMetadata } from "../../lib/api/types";

interface Tuition {
  _id: string;
  title: string;
  tuitionType: "group" | "one-to-one";
  subject: string;
  classLevel: string;
  mode: "online" | "offline";
  location: string;
  monthlyFee: number;
  daysPerWeek: number;
  tutorName: string;
  createdAt: string;
}

interface TuitionFilters {
  search: string;
  subject: string;
  classLevel: string;
  mode: string;
}

const PAGE_LIMIT = 9;

const initialFilters: TuitionFilters = {
  search: "",
  subject: "",
  classLevel: "",
  mode: "",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatFee(fee: number) {
  return `৳${fee.toLocaleString("en-BD")}`;
}

export function TuitionBrowser() {
  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [filters, setFilters] = useState<TuitionFilters>(initialFilters);
  const [appliedFilters, setAppliedFilters] =
    useState<TuitionFilters>(initialFilters);

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationMetadata>({
    page: 1,
    limit: PAGE_LIMIT,
    total: 0,
    totalPages: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function fetchTuitions() {
      setIsLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(PAGE_LIMIT),
          sort: "latest",
        });

        if (appliedFilters.search.trim()) {
          params.set("search", appliedFilters.search.trim());
        }

        if (appliedFilters.subject.trim()) {
          params.set("subject", appliedFilters.subject.trim());
        }

        if (appliedFilters.classLevel.trim()) {
          params.set("classLevel", appliedFilters.classLevel.trim());
        }

        if (appliedFilters.mode) {
          params.set("mode", appliedFilters.mode);
        }

        const response = await apiRequest<Tuition[]>(
          `/api/tuitions?${params.toString()}`
        );

        if (!isMounted) return;

        setTuitions(response.data ?? []);
        setPagination(
          response.pagination ?? {
            page,
            limit: PAGE_LIMIT,
            total: response.data?.length ?? 0,
            totalPages: response.data?.length ? 1 : 0,
          }
        );
      } catch (err) {
        if (!isMounted) return;

        setError(
          err instanceof ApiError
            ? err.message
            : "Unable to load tuition opportunities."
        );

        setTuitions([]);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchTuitions();

    return () => {
      isMounted = false;
    };
  }, [page, appliedFilters, retryCount]);

  function handleFilterSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setAppliedFilters({ ...filters });
  }

  function clearFilters() {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
    setPage(1);
  }

  const hasActiveFilters = Object.values(appliedFilters).some(
    (value) => value.trim() !== ""
  );

  return (
    <div>
      {/* Search and filters */}
      <form
        onSubmit={handleFilterSubmit}
        className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6"
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={19} className="text-primary" />
          <h2 className="font-heading text-lg font-bold text-foreground">
            Find Your Tuition
          </h2>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Search */}
          <div className="lg:col-span-4">
            <label
              htmlFor="tuition-search"
              className="mb-2 block text-sm font-semibold text-foreground"
            >
              Search opportunities
            </label>

            <div className="flex h-12 items-center gap-3 rounded-xl border border-border bg-background px-4 focus-within:border-primary">
              <Search size={19} className="shrink-0 text-muted" />

              <input
                id="tuition-search"
                type="search"
                value={filters.search}
                onChange={(event) =>
                  setFilters((previous) => ({
                    ...previous,
                    search: event.target.value,
                  }))
                }
                placeholder="Search by title, subject or keyword..."
                className="h-full w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="tuition-subject"
              className="mb-2 block text-sm font-semibold text-foreground"
            >
              Subject
            </label>

            <input
              id="tuition-subject"
              type="text"
              value={filters.subject}
              onChange={(event) =>
                setFilters((previous) => ({
                  ...previous,
                  subject: event.target.value,
                }))
              }
              placeholder="e.g. Mathematics"
              className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary"
            />
          </div>

          {/* Class level */}
          <div>
            <label
              htmlFor="tuition-class"
              className="mb-2 block text-sm font-semibold text-foreground"
            >
              Class Level
            </label>

            <input
              id="tuition-class"
              type="text"
              value={filters.classLevel}
              onChange={(event) =>
                setFilters((previous) => ({
                  ...previous,
                  classLevel: event.target.value,
                }))
              }
              placeholder="e.g. Class 10"
              className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary"
            />
          </div>

          {/* Mode */}
          <div>
            <label
              htmlFor="tuition-mode"
              className="mb-2 block text-sm font-semibold text-foreground"
            >
              Learning Mode
            </label>

            <select
              id="tuition-mode"
              value={filters.mode}
              onChange={(event) =>
                setFilters((previous) => ({
                  ...previous,
                  mode: event.target.value,
                }))
              }
              className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none focus:border-primary"
            >
              <option value="">All Modes</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white transition hover:bg-primary/90"
            >
              <Search size={17} />
              Search
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                aria-label="Clear filters"
                title="Clear filters"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border text-muted transition hover:border-primary hover:text-primary"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Listing heading */}
      <div className="mt-10 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-heading text-2xl font-extrabold text-foreground">
            Available Tuition Opportunities
          </h2>

          <p className="mt-2 text-sm text-muted">
            Explore approved tuition posts and find your next opportunity.
          </p>
        </div>

        {!isLoading && !error && (
          <p className="text-sm font-semibold text-muted">
            {pagination.total} {pagination.total === 1 ? "result" : "results"} found
          </p>
        )}
      </div>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: PAGE_LIMIT }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl border border-border bg-surface p-6"
            >
              <div className="h-5 w-2/3 rounded bg-surface-secondary" />
              <div className="mt-5 h-4 w-1/2 rounded bg-surface-secondary" />
              <div className="mt-3 h-4 w-3/4 rounded bg-surface-secondary" />
              <div className="mt-8 h-8 w-1/3 rounded bg-surface-secondary" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!isLoading && error && (
        <div className="mt-7 rounded-2xl border border-border bg-surface p-10 text-center">
          <h3 className="font-heading text-lg font-bold text-foreground">
            Unable to Load Tuitions
          </h3>

          <p className="mt-2 text-sm text-muted">{error}</p>

          <button
            type="button"
            onClick={() => setRetryCount((previous) => previous + 1)}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary/90"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !error && tuitions.length === 0 && (
        <div className="mt-7 rounded-2xl border border-border bg-surface px-6 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <GraduationCap size={28} />
          </div>

          <h3 className="mt-5 font-heading text-xl font-bold text-foreground">
            No Tuition Opportunities Yet
          </h3>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
            {hasActiveFilters
              ? "No tuition opportunities match your current filters. Try changing your search."
              : "New tuition opportunities will appear here once they are approved."}
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 text-sm font-bold text-primary hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Tuition cards */}
      {!isLoading && !error && tuitions.length > 0 && (
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tuitions.map((tuition) => (
            <article
              key={tuition._id}
              className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
                  {tuition.subject}
                </span>

                <span className="rounded-lg bg-surface-secondary px-3 py-1.5 text-xs font-semibold text-muted">
                  {tuition.mode === "online" ? "Online" : "Offline"}
                </span>
              </div>

              <h3 className="mt-5 font-heading text-lg font-bold text-foreground">
                {tuition.title}
              </h3>

              <p className="mt-2 text-sm text-muted">
                {tuition.classLevel}
              </p>

              <div className="mt-5 space-y-3 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="shrink-0 text-primary" />
                  <span>{tuition.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Users size={16} className="shrink-0 text-primary" />
                  <span>
                    {tuition.tuitionType === "group"
                      ? "Group Tuition"
                      : "One-to-One"}
                  </span>
                  <span>·</span>
                  <span>{tuition.daysPerWeek} days/week</span>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays
                    size={16}
                    className="shrink-0 text-primary"
                  />
                  <span>{formatDate(tuition.createdAt)}</span>
                </div>
              </div>

              <div className="mt-auto flex items-end justify-between gap-3 border-t border-border pt-5">
                <div>
                  <p className="text-xs text-muted">Monthly Fee</p>
                  <p className="mt-1 font-heading text-xl font-extrabold text-primary">
                    {formatFee(tuition.monthlyFee)}
                  </p>
                </div>

                <p className="text-right text-xs text-muted">
                  By {tuition.tutorName}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && !error && pagination.totalPages > 1 && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((previous) => previous - 1)}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-4 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={17} />
            Previous
          </button>

          <span className="px-3 text-sm font-semibold text-muted">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            type="button"
            disabled={page >= pagination.totalPages}
            onClick={() => setPage((previous) => previous + 1)}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-4 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ChevronRight size={17} />
          </button>
        </div>
      )}
    </div>
  );
}
