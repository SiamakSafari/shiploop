import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

export default function LaunchLoading() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page header skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton variant="shimmer" className="h-9 w-32" />
          <Skeleton variant="shimmer" className="h-5 w-96" />
        </div>
        <Skeleton variant="shimmer" className="h-10 w-48 rounded-lg" />
      </div>

      {/* Countdown section skeleton */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 glass rounded-2xl p-6 space-y-4">
          <Skeleton variant="shimmer" className="h-6 w-48" />
          <div className="flex gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex-1 text-center space-y-2">
                <Skeleton variant="shimmer" className="h-16 w-full rounded-xl" />
                <Skeleton variant="shimmer" className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-2xl p-6 space-y-4">
          <Skeleton variant="shimmer" className="h-5 w-32" />
          <Skeleton variant="shimmer" className="h-12 w-24" />
          <Skeleton variant="shimmer" className="h-2 w-full rounded-full" />
        </div>
      </div>

      {/* Platform checklists skeleton */}
      <div className="space-y-4">
        <Skeleton variant="shimmer" className="h-6 w-48" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass rounded-xl p-4 flex items-center gap-4">
                <Skeleton variant="shimmer" className="h-10 w-10 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton variant="shimmer" className="h-5 w-32" />
                  <Skeleton variant="shimmer" className="h-2 w-full rounded-full" />
                </div>
                <Skeleton variant="shimmer" className="h-4 w-12" />
              </div>
            ))}
          </div>
          <div className="glass rounded-2xl p-6 space-y-4">
            <Skeleton variant="shimmer" className="h-6 w-40" />
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton variant="shimmer" className="h-5 w-5 rounded" />
                  <Skeleton variant="shimmer" className="h-4 flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Directory submissions skeleton */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton variant="shimmer" className="h-6 w-48" />
          <Skeleton variant="shimmer" className="h-8 w-32 rounded-lg" />
        </div>
        <Skeleton variant="shimmer" className="h-10 w-96 rounded-lg" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} variant="shimmer" className="h-24 w-full rounded-xl" />
            ))}
          </div>
          <Skeleton variant="shimmer" className="h-80 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
