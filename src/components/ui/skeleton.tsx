import { cn } from "@/lib/utils"

interface SkeletonProps extends React.ComponentProps<"div"> {
  variant?: "default" | "shimmer"
}

function Skeleton({ className, variant = "default", ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "rounded-md bg-gray-100",
        variant === "default" && "animate-pulse",
        variant === "shimmer" && "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-200/60 before:to-transparent",
        className
      )}
      {...props}
    />
  )
}

// Pre-built skeleton helpers for common patterns
function SkeletonText({ className, lines = 1, ...props }: SkeletonProps & { lines?: number }) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="shimmer"
          className={cn("h-4", i === lines - 1 && lines > 1 ? "w-3/4" : "w-full")}
        />
      ))}
    </div>
  )
}

function SkeletonCard({ className, ...props }: SkeletonProps) {
  return (
    <div className={cn("glass rounded-xl p-5 space-y-3", className)} {...props}>
      <Skeleton variant="shimmer" className="h-4 w-20" />
      <Skeleton variant="shimmer" className="h-8 w-24" />
      <Skeleton variant="shimmer" className="h-4 w-16" />
    </div>
  )
}

export { Skeleton, SkeletonText, SkeletonCard }
