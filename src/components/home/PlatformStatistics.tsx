"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Users,
  RefreshCw,
} from "lucide-react";

import { apiRequest } from "../../lib/api/client";

interface PlatformStatisticsData {
  totalStudents: number;
  totalTutors: number;
  approvedTuitions: number;
}

export function PlatformStatistics() {
  const [statistics, setStatistics] =
    useState<PlatformStatisticsData | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadStatistics() {
      try {
        const response =
          await apiRequest<PlatformStatisticsData>("/api/statistics");

        if (!response.data) {
          throw new Error("Statistics data is unavailable.");
        }

        if (isMounted) {
          setStatistics(response.data);
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load platform statistics."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadStatistics();

    return () => {
      isMounted = false;
    };
  }, [retry]);

  const items = [
    {
      label: "Registered Students",
      value: statistics?.totalStudents,
      icon: Users,
      description: "Students joining the platform",
    },
    {
      label: "Registered Tutors",
      value: statistics?.totalTutors,
      icon: GraduationCap,
      description: "Tutors sharing their knowledge",
    },
    {
      label: "Approved Tuitions",
      value: statistics?.approvedTuitions,
      icon: BookOpen,
      description: "Active opportunities to explore",
    },
  ];

  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary">
            MentorLagbe in Numbers
          </span>

          <h2 className="mt-3 font-heading text-3xl font-extrabold text-foreground sm:text-4xl">
            A Growing Learning Community
          </h2>

          <p className="mt-4 leading-7 text-muted">
            Discover the community and tuition opportunities
            available on MentorLagbe.
          </p>
        </div>

        {error && !statistics ? (
          <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-border bg-surface-secondary/40 p-6 text-center">
            <p className="text-sm text-muted">{error}</p>

            <button
              type="button"
              onClick={() => {
                setIsLoading(true);
                setRetry((previous) => previous + 1);
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border bg-background p-7 text-center transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon size={27} />
                  </div>

                  {isLoading ? (
                    <div className="mx-auto mt-5 h-10 w-24 animate-pulse rounded-lg bg-surface-secondary" />
                  ) : (
                    <p className="mt-5 font-heading text-4xl font-extrabold text-foreground">
                      {item.value?.toLocaleString("en-US") ?? "—"}
                    </p>
                  )}

                  <h3 className="mt-3 font-heading text-lg font-bold text-foreground">
                    {item.label}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}