"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ClipboardList, LoaderCircle, Send } from "lucide-react";
import { toast } from "sonner";

import { apiRequest, ApiError } from "../../lib/api/client";

interface BusinessProfile {
  role: "student" | "tutor" | "admin";
}

interface TuitionApplicationFormProps {
  tuitionId: string;
}

export function TuitionApplicationForm({
  tuitionId,
}: TuitionApplicationFormProps) {
  const router = useRouter();

  const [role, setRole] = useState<BusinessProfile["role"] | null>(null);
  const [checkingRole, setCheckingRole] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [studentPhone, setStudentPhone] = useState("");
  const [preferredSchedule, setPreferredSchedule] = useState("");
  const [studentNote, setStudentNote] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      try {
        const response =
          await apiRequest<BusinessProfile>("/api/users/me");

        if (!cancelled) {
          setRole(response.data?.role ?? null);
        }
      } catch {
        if (!cancelled) {
          setRole(null);
        }
      } finally {
        if (!cancelled) {
          setCheckingRole(false);
        }
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!studentPhone.trim() || !preferredSchedule.trim()) {
      toast.error("Please provide your phone number and preferred schedule.");
      return;
    }

    setSubmitting(true);

    try {
      await apiRequest(`/api/applications/${encodeURIComponent(tuitionId)}`, {
        method: "POST",
        body: JSON.stringify({
          studentPhone: studentPhone.trim(),
          preferredSchedule: preferredSchedule.trim(),
          studentNote: studentNote.trim(),
        }),
      });

      toast.success("Your tuition application has been submitted.");
      setStudentPhone("");
      setPreferredSchedule("");
      setStudentNote("");
      router.push("/dashboard/student/applications");
    } catch (error) {
      toast.error(
        error instanceof ApiError
          ? error.message
          : "Unable to submit your application. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (checkingRole) {
    return (
      <div className="mt-9 rounded-2xl border border-border bg-surface p-6">
        <p className="text-sm text-muted">Checking application access...</p>
      </div>
    );
  }

  if (role !== "student") {
    return (
      <div className="mt-9 rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-center gap-3">
          <ClipboardList className="text-primary" size={22} />
          <h2 className="font-heading text-lg font-bold text-foreground">
            Interested in this tuition?
          </h2>
        </div>

        <p className="mt-3 text-sm leading-6 text-muted">
          Sign in with a Student account to apply for this tuition opportunity.
        </p>

        {!role && (
          <a
            href="/sign-in"
            className="mt-4 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary/90"
          >
            Sign in as Student
          </a>
        )}

        {role && (
          <p className="mt-3 text-xs text-muted">
            Applications can only be submitted by Student accounts.
          </p>
        )}
      </div>
    );
  }

  return (
    <section className="mt-9 rounded-2xl border border-border bg-surface p-6 sm:p-7">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ClipboardList size={22} />
        </div>

        <div>
          <h2 className="font-heading text-lg font-extrabold text-foreground">
            Apply for This Tuition
          </h2>
          <p className="mt-1 text-xs text-muted">
            Share your contact details and preferred schedule.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label
            htmlFor="studentPhone"
            className="mb-2 block text-sm font-semibold text-foreground"
          >
            Phone Number <span className="text-danger">*</span>
          </label>
          <input
            id="studentPhone"
            type="tel"
            required
            minLength={7}
            maxLength={20}
            value={studentPhone}
            onChange={(event) => setStudentPhone(event.target.value)}
            placeholder="Enter your contact number"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </div>

        <div>
          <label
            htmlFor="preferredSchedule"
            className="mb-2 block text-sm font-semibold text-foreground"
          >
            Preferred Schedule <span className="text-danger">*</span>
          </label>
          <textarea
            id="preferredSchedule"
            required
            minLength={3}
            maxLength={200}
            rows={3}
            value={preferredSchedule}
            onChange={(event) => setPreferredSchedule(event.target.value)}
            placeholder="Example: Saturday to Thursday, 5 PM to 7 PM"
            className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </div>

        <div>
          <label
            htmlFor="studentNote"
            className="mb-2 block text-sm font-semibold text-foreground"
          >
            Additional Note <span className="text-muted">(Optional)</span>
          </label>
          <textarea
            id="studentNote"
            maxLength={1000}
            rows={4}
            value={studentNote}
            onChange={(event) => setStudentNote(event.target.value)}
            placeholder="Tell the tutor anything important about your learning needs..."
            className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {submitting ? (
            <>
              <LoaderCircle className="animate-spin" size={17} />
              Submitting...
            </>
          ) : (
            <>
              <Send size={17} />
              Submit Application
            </>
          )}
        </button>
      </form>
    </section>
  );
}
