import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header skeleton */}
      <div className="space-y-2">
        <Skeleton variant="shimmer" className="h-9 w-64" />
        <Skeleton variant="shimmer" className="h-5 w-96" />
      </div>

      {/* Stats row skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* Main content grid skeleton */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Ship Score Card skeleton */}
          <div className="glass rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton variant="shimmer" className="h-6 w-32" />
              <Skeleton variant="shimmer" className="h-8 w-20 rounded-full" />
            </div>
            <div className="flex items-center gap-8">
              <Skeleton variant="shimmer" className="h-32 w-32 rounded-full" />
              <div className="flex-1 space-y-3">
                <Skeleton variant="shimmer" className="h-4 w-full" />
                <Skeleton variant="shimmer" className="h-4 w-3/4" />
                <Skeleton variant="shimmer" className="h-4 w-1/2" />
              </div>
            </div>
          </div>

          {/* Streak skeleton */}
          <div className="glass rounded-xl p-6 space-y-4">
            <Skeleton variant="shimmer" className="h-6 w-40" />
            <div className="flex gap-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} variant="shimmer" className="h-12 w-12 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Leaderboard skeleton */}
          <div className="glass rounded-xl p-6 space-y-4">
            <Skeleton variant="shimmer" className="h-6 w-32" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <Skeleton variant="shimmer" className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton variant="shimmer" className="h-4 w-32" />
                    <Skeleton variant="shimmer" className="h-3 w-20" />
                  </div>
                  <Skeleton variant="shimmer" className="h-6 w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Quick Actions skeleton */}
          <div className="glass rounded-xl p-6 space-y-4">
            <Skeleton variant="shimmer" className="h-6 w-32" />
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} variant="shimmer" className="h-20 rounded-xl" />
              ))}
            </div>
          </div>

          {/* Activity Feed skeleton */}
          <div className="glass rounded-xl p-6 space-y-4">
            <Skeleton variant="shimmer" className="h-6 w-32" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Skeleton variant="shimmer" className="h-8 w-8 rounded-full shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton variant="shimmer" className="h-4 w-full" />
                    <Skeleton variant="shimmer" className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
