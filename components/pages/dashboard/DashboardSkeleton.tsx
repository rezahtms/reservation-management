import { Skeleton } from "@/components/ui/Skeleton";

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-60" />
        </div>
        <Skeleton className="h-10 w-36 rounded-xl" />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {Array.from({ length: 5 }).map((_, skeletonIndex) => (
          <Skeleton
            key={skeletonIndex}
            className="h-24 w-full rounded-2xl"
          />
        ))}
      </div>
      <Skeleton className="h-96 w-full rounded-2xl" />
    </div>
  );
}

export { DashboardSkeleton };
export default DashboardSkeleton;
