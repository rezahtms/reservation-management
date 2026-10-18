import { Suspense } from "react";
import DashboardView from "@/components/pages/dashboard/DashboardView";
import DashboardSkeleton from "@/components/pages/dashboard/DashboardSkeleton";

export const instant = false;

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardView />
    </Suspense>
  );
}
