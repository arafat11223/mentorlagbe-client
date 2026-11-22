
import { Suspense } from "react";
import type { Metadata } from "next";

import { TuitionDetails } from "../../../components/tuitions/TuitionDetails";

interface TuitionDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata: Metadata = {
  title: "Tuition Details",
  description:
    "Explore tuition details, requirements, location and monthly fee on MentorLagbe.",
};

function TuitionDetailsLoading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-5 w-40 rounded bg-surface-secondary" />
          <div className="h-56 rounded-2xl bg-surface-secondary" />
          <div className="h-8 w-2/3 rounded bg-surface-secondary" />
          <div className="h-4 w-full rounded bg-surface-secondary" />
          <div className="h-4 w-3/4 rounded bg-surface-secondary" />
        </div>
      </div>
    </main>
  );
}

async function TuitionDetailsContent({
  params,
}: TuitionDetailsPageProps) {
  const { id } = await params;

  return <TuitionDetails id={id} />;
}

export default function TuitionDetailsPage({
  params,
}: TuitionDetailsPageProps) {
  return (
    <Suspense fallback={<TuitionDetailsLoading />}>
      <TuitionDetailsContent params={params} />
    </Suspense>
  );
}
