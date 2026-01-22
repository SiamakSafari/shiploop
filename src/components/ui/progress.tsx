"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  shimmer?: boolean
}

function Progress({
  className,
  value,
  shimmer = true,
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "h-full w-full flex-1 transition-all duration-500 ease-out relative rounded-full",
          shimmer && "overflow-hidden"
        )}
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          background: 'linear-gradient(90deg, #E8945A 0%, #7CB4C4 60%, #4AABA8 100%)'
        }}
      >
        {/* Shimmer overlay */}
        {shimmer && (
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
            style={{ backgroundSize: '200% 100%' }}
          />
        )}
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  )
}

export { Progress }
