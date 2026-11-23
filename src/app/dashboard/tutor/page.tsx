import TutorDashboardClient from "./TutorDashboardClient";

// This authenticated dashboard does not require instant navigation.
export const instant = false;

export default function DashboardPage() {
  return <TutorDashboardClient />;
}
