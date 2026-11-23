import { DashboardShell } from "../../components/dashboard/DashboardShell";

// Authenticated dashboards use session-specific client-side data.
// They do not need instant-navigation validation or prefetching.
export const instant = false;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return <DashboardShell>{children}</DashboardShell>;
}
