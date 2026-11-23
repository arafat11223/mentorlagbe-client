
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  GraduationCap,
  MapPin,
  RefreshCw,
  UserRound,
  Users,
  Wallet,
  BookOpen,
  Monitor,
} from "lucide-react";

import { apiRequest, ApiError } from "../../lib/api/client";
import { TuitionApplicationForm } from "../applications/TuitionApplicationForm";

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
  bannerImage: string | null;
  description: string;
  tutorName: string;
  createdAt: string;
}

interface TuitionDetailsProps {
  id: string;
}

function formatFee(fee: number) {
  return `à§³${fee.toLocaleString("en-BD")}`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function TuitionDetails({ id }: TuitionDetailsProps) {
  const [tuition, setTuition] = useState<Tuition | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function fetchTuition() {
      setIsLoading(true);
      setError("");

      try {
        const response = await apiRequest<Tuition>(
          `/api/tuitions/${encodeURIComponent(id)}`
        );

        if (!isMounted) return;

        setTuition(response.data ?? null);

        if (!response.data) {
          setError("Tuition details could not be found.");
        }
      } catch (err) {
        if (!isMounted) return;

        setTuition(null);

        if (err instanceof ApiError && err.statusCode === 404) {
          setError("This tuition opportunity is no longer available.");
        } else {
          setError(
            err instanceof ApiError
              ? err.message
              : "Unable to load tuition details."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchTuition();

    return () => {
      isMounted = false;
    };
  }, [id, retryCount]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-40 rounded bg-surface-secondary" />
          <div className="h-48 rounded-2xl bg-surface-secondary" />
          <div className="h-8 w-2/3 rounded bg-surface-secondary" />
          <div className="h-4 w-full rounded bg-surface-secondary" />
          <div className="h-4 w-3/4 rounded bg-surface-secondary" />
        </div>
      </div>
    );
  }

  if (error || !tuition) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <GraduationCap size={32} />
        </div>

        <h1 className="mt-6 font-heading text-2xl font-extrabold text-foreground">
          Tuition Not Available
        </h1>

        <p className="mt-3 text-sm text-muted">{error}</p>

        {error.includes("Unable to") && (
          <button
            type="button"
            onClick={() => setRetryCount((previous) => previous + 1)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary/90"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        )}

        <div>
          <Link
            href="/tuitions"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
          >
            <ArrowLeft size={17} />
            Back to All Tuitions
          </Link>
        </div>
      </div>
    );
  }

  const information = [
    {
      icon: BookOpen,
      label: "Subject",
      value: tuition.subject,
    },
    {
      icon: GraduationCap,
      label: "Class Level",
      value: tuition.classLevel,
    },
    {
      icon: Monitor,
      label: "Learning Mode",
      value: tuition.mode === "online" ? "Online" : "Offline",
    },
    {
      icon: Users,
      label: "Tuition Type",
      value:
        tuition.tuitionType === "group"
          ? "Group Tuition"
          : "One-to-One",
    },
    {
      icon: MapPin,
      label: "Location",
      value: tuition.location,
    },
    {
      icon: CalendarDays,
      label: "Days Per Week",
      value: `${tuition.daysPerWeek} days`,
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/tuitions"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-primary"
        >
          <ArrowLeft size={17} />
          Back to All Tuitions
        </Link>

        <div className="mt-7 overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
          {tuition.bannerImage ? (
            <div className="h-56 overflow-hidden bg-surface-secondary sm:h-72">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tuition.bannerImage}
                alt={tuition.title}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex h-48 items-center justify-center bg-primary/10 text-primary sm:h-56">
              <GraduationCap size={72} strokeWidth={1.3} />
            </div>
          )}

          <div className="p-6 sm:p-9">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
                {tuition.subject}
              </span>

              <span className="rounded-lg bg-surface-secondary px-3 py-1.5 text-xs font-semibold text-muted">
                {tuition.mode === "online" ? "Online" : "Offline"}
              </span>
            </div>

            <h1 className="mt-5 font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
              {tuition.title}
            </h1>

            <p className="mt-3 text-sm text-muted">
              Posted on {formatDate(tuition.createdAt)}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {information.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-xl border border-border bg-background p-4"
                  >
                    <div className="flex items-center gap-2 text-primary">
                      <Icon size={18} />
                      <span className="text-xs font-semibold text-muted">
                        {item.label}
                      </span>
                    </div>

                    <p className="mt-3 text-sm font-bold text-foreground">
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 rounded-2xl bg-primary/5 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <Wallet size={23} className="text-primary" />

                <div>
                  <p className="text-sm font-semibold text-muted">
                    Monthly Tuition Fee
                  </p>

                  <p className="mt-1 font-heading text-3xl font-extrabold text-primary">
                    {formatFee(tuition.monthlyFee)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-9">
              <h2 className="font-heading text-xl font-extrabold text-foreground">
                Tuition Description
              </h2>

              <p className="mt-4 whitespace-pre-wrap text-sm leading-8 text-muted">
                {tuition.description}
              </p>
            </div>

            <div className="mt-9 border-t border-border pt-7">
              <h2 className="font-heading text-lg font-bold text-foreground">
                Posted By
              </h2>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <UserRound size={23} />
                </div>

                <div>
                  <p className="font-bold text-foreground">
                    {tuition.tutorName}
                  </p>

                  <p className="mt-1 text-xs text-muted">
                    Tuition Provider
                  </p>
                </div>
              </div>
            </div>
            <TuitionApplicationForm tuitionId={id} />
          </div>
        </div>
      </div>
    </main>
  );
}

