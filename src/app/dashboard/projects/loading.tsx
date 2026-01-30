import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

export default function ProjectsLoading() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton variant="shimmer" className="h-9 w-48" />
          <Skeleton variant="shimmer" className="h-5 w-80" />
        </div>
        <Skeleton variant="shimmer" className="h-10 w-32 rounded-xl" />
      </div>

      {/* Filters skeleton */}
      <div className="flex gap-4">
        <Skeleton variant="shimmer" className="h-10 w-64 rounded-lg" />
        <Skeleton variant="shimmer" className="h-10 w-40 rounded-lg" />
      </div>

      {/* Projects grid skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass rounded-2xl p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Skeleton variant="shimmer" className="h-12 w-12 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton variant="shimmer" className="h-5 w-32" />
                  <Skeleton variant="shimmer" className="h-3 w-20" />
                </div>
              </div>
              <Skeleton variant="shimmer" className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton variant="shimmer" className="h-4 w-full" />
            <Skeleton variant="shimmer" className="h-4 w-3/4" />
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <Skeleton variant="shimmer" className="h-4 w-24" />
              <Skeleton variant="shimmer" className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
