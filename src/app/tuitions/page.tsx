
import type { Metadata } from "next";
import { Search, BookOpen, Users, ShieldCheck } from "lucide-react";

import { TuitionBrowser } from "../../components/tuitions/TuitionBrowser";

export const metadata: Metadata = {
  title: "Find Tuitions",
  description:
    "Explore approved tuition opportunities and find the right tutor or student on MentorLagbe.",
};

export default function TuitionsPage() {
  return (
    <main className="flex-1 bg-background">
      {/* Page hero */}
      <section className="relative overflow-hidden bg-primary py-16 text-white sm:py-20">
        <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-36 -left-20 h-80 w-80 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest">
              <Search size={14} />
              Tuition Marketplace
            </span>

            <h1 className="mt-6 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Find the Right Tuition for Your Journey
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Discover approved tuition opportunities, explore different
              subjects, and connect with the right learning community.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-4">
              <BookOpen size={23} />
              <span className="text-sm font-semibold">
                Multiple Subjects
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-4">
              <Users size={23} />
              <span className="text-sm font-semibold">
                Flexible Learning
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-4">
              <ShieldCheck size={23} />
              <span className="text-sm font-semibold">
                Approved Listings
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Tuition listing */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TuitionBrowser />
        </div>
      </section>
    </main>
  );
}
