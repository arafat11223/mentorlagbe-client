"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  RefreshCw,
  Users,
} from "lucide-react";

import {
  apiRequest,
  ApiError,
} from "../../lib/api/client";

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

export function LatestTuitions() {
  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchTuitions() {
      try {
        const response =
          await apiRequest<Tuition[]>("/api/tuitions/featured");

        if (isMounted) {
          setTuitions(response.data ?? []);
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof ApiError
              ? err.message
              : "Unable to load tuition listings."
          );
        }
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
  }, []);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Latest Opportunities
            </span>

            <h2 className="mt-3 font-heading text-3xl font-extrabold text-foreground sm:text-4xl">
              Recently Posted Tuitions
            </h2>

            <p className="mt-4 leading-7 text-muted">
              Explore the latest approved tuition opportunities
              and find one that matches your interests.
            </p>
          </div>

          <Link
            href="/tuitions"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary transition hover:gap-3"
          >
            View All Tuitions
            <ArrowRight size={18} />
          </Link>
        </div>

        {isLoading && (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
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

        {!isLoading && error && (
          <div className="mt-12 rounded-2xl border border-border bg-surface p-8 text-center">
            <p className="font-semibold text-foreground">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary"
            >
              <RefreshCw size={16} />
              Reload Page
            </button>
          </div>
        )}

        {!isLoading && !error && tuitions.length === 0 && (
          <div className="mt-12 rounded-2xl border border-border bg-surface p-10 text-center">
            <h3 className="font-heading text-xl font-bold text-foreground">
              No Tuition Opportunities Yet
            </h3>

            <p className="mt-3 text-sm leading-6 text-muted">
              New tuition opportunities will appear here
              once they are approved.
            </p>
          </div>
        )}

        {!isLoading && !error && tuitions.length > 0 && (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

                <h3 className="mt-5 font-heading text-lg font-bold text-foreground transition group-hover:text-primary">
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

                  <div className="text-right">
                  <p className="text-xs text-muted">
                    By {tuition.tutorName}
                  </p>

                  <Link
                    href={`/tuitions/${tuition._id}`}
                    className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-primary transition hover:gap-2"
                  >
                    View Details
                    <ArrowRight size={15} />
                  </Link>
                </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}