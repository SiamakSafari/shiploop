import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

export default function RevenueLoading() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page header skeleton */}
      <div className="space-y-2">
        <Skeleton variant="shimmer" className="h-9 w-48" />
        <Skeleton variant="shimmer" className="h-5 w-96" />
      </div>

      {/* Stats row skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* Revenue Charts skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-2xl p-6 space-y-4">
          <Skeleton variant="shimmer" className="h-6 w-40" />
          <Skeleton variant="shimmer" className="h-64 w-full rounded-xl" />
        </div>
        <div className="glass rounded-2xl p-6 space-y-4">
          <Skeleton variant="shimmer" className="h-6 w-48" />
          <Skeleton variant="shimmer" className="h-64 w-full rounded-xl" />
        </div>
      </div>

      {/* Traffic and attribution skeleton */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 glass rounded-2xl p-6 space-y-4">
          <Skeleton variant="shimmer" className="h-6 w-36" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton variant="shimmer" className="h-8 w-8 rounded" />
                <Skeleton variant="shimmer" className="h-4 flex-1" />
                <Skeleton variant="shimmer" className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-2xl p-6 space-y-4">
          <Skeleton variant="shimmer" className="h-6 w-32" />
          <Skeleton variant="shimmer" className="h-48 w-full rounded-xl" />
        </div>
      </div>

      {/* Financial Health skeleton */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <Skeleton variant="shimmer" className="h-6 w-40" />
        </div>
        <div className="p-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} variant="shimmer" className="h-24 w-full rounded-xl" />
              ))}
            </div>
            <Skeleton variant="shimmer" className="h-80 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
