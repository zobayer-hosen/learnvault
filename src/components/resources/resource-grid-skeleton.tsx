import { Skeleton } from "@/components/ui/skeleton";

export function ResourceGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div role="status" aria-label="Loading resources">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: count }, (_, index) => (
          <li key={index} className="overflow-hidden rounded-xl border border-border bg-surface">
            <Skeleton className="h-28 rounded-none" />
            <div className="space-y-2.5 p-4">
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="mt-4 h-5 w-24" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
