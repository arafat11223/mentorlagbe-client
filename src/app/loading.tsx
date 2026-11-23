export default function Loading() {
  return (
    <main
      className="flex-1"
      aria-label="Loading page"
      aria-busy="true"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <div className="mx-auto h-4 w-32 rounded-full bg-surface-secondary" />
            <div className="mx-auto h-10 w-3/4 rounded-xl bg-surface-secondary" />
            <div className="mx-auto h-4 w-full max-w-lg rounded-lg bg-surface-secondary" />
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-card)]"
              >
                <div className="h-40 rounded-xl bg-surface-secondary" />
                <div className="mt-5 h-5 w-3/4 rounded-lg bg-surface-secondary" />
                <div className="mt-3 h-4 w-1/2 rounded-lg bg-surface-secondary" />
                <div className="mt-6 h-10 rounded-lg bg-surface-secondary" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}