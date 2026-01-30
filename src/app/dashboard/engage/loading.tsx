import { Skeleton } from "@/components/ui/skeleton";

export default function EngageLoading() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page header skeleton */}
      <div className="space-y-2">
        <Skeleton variant="shimmer" className="h-9 w-40" />
        <Skeleton variant="shimmer" className="h-5 w-80" />
      </div>

      {/* Main tabs skeleton */}
      <Skeleton variant="shimmer" className="h-10 w-80 rounded-lg" />

      {/* Stats row skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass rounded-xl p-4 space-y-2">
            <Skeleton variant="shimmer" className="h-4 w-20" />
            <Skeleton variant="shimmer" className="h-8 w-16" />
          </div>
        ))}
      </div>

      {/* Filters skeleton */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton variant="shimmer" className="h-10 w-32 rounded-xl" />
        <Skeleton variant="shimmer" className="h-10 w-96 rounded-lg" />
        <Skeleton variant="shimmer" className="h-10 w-44 rounded-lg" />
      </div>

      {/* Content grid skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left column - list */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton variant="shimmer" className="h-4 w-4" />
            <Skeleton variant="shimmer" className="h-5 w-32" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="glass rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Skeleton variant="shimmer" className="h-5 w-40" />
                    <Skeleton variant="shimmer" className="h-4 w-full max-w-xs" />
                  </div>
                  <Skeleton variant="shimmer" className="h-6 w-16 rounded-full" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton variant="shimmer" className="h-4 w-20" />
                  <Skeleton variant="shimmer" className="h-4 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column - detail */}
        <div className="glass rounded-2xl p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Skeleton variant="shimmer" className="h-6 w-48" />
                <div className="flex gap-2">
                  <Skeleton variant="shimmer" className="h-5 w-16 rounded-full" />
                  <Skeleton variant="shimmer" className="h-5 w-20 rounded-full" />
                </div>
              </div>
              <Skeleton variant="shimmer" className="h-8 w-8 rounded" />
            </div>
            <Skeleton variant="shimmer" className="h-24 w-full rounded-lg" />
          </div>
          <div className="space-y-3">
            <Skeleton variant="shimmer" className="h-5 w-24" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} variant="shimmer" className="h-8 w-20 rounded-lg" />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton variant="shimmer" className="h-5 w-20" />
            <Skeleton variant="shimmer" className="h-24 w-full rounded-lg" />
          </div>
          <div className="flex gap-2">
            <Skeleton variant="shimmer" className="h-10 flex-1 rounded-xl" />
            <Skeleton variant="shimmer" className="h-10 w-24 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
