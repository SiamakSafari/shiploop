"use client";

import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn, formatPercent } from "@/lib/utils";
import { statCardColors, type StatCardType } from "@/lib/design-system";
import { Caption } from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnimatedCounter } from "@/hooks";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: number;
  format?: "currency" | "number" | "percent";
  className?: string;
  statType?: StatCardType;
  accentColor?: "dark" | "black" | "gray1" | "gray2";
  isLoading?: boolean;
  animationDelay?: number;
}

const accentStyles = {
  dark: {
    border: "card-accent-dark",
    icon: "text-gray-900 dark:text-gray-100",
    gradient: "from-gray-100 to-white dark:from-gray-800 dark:to-gray-900",
  },
  black: {
    border: "card-accent-black",
    icon: "text-gray-950 dark:text-white",
    gradient: "from-gray-50 to-white dark:from-gray-900 dark:to-black",
  },
  gray1: {
    border: "card-accent-gray-1",
    icon: "text-gray-700 dark:text-gray-200",
    gradient: "from-gray-100/50 to-white dark:from-gray-800/50 dark:to-gray-900",
  },
  gray2: {
    border: "card-accent-gray-2",
    icon: "text-gray-500 dark:text-gray-400",
    gradient: "from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-950",
  },
};

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  format = "number",
  className,
  statType,
  accentColor = "dark",
  isLoading = false,
  animationDelay = 0,
}: StatCardProps) {
  // Animated counter
  const { value: animatedValue } = useAnimatedCounter(value, {
    duration: 1200,
    delay: animationDelay,
  });

  if (isLoading) {
    return (
      <div className={cn("glass rounded-xl p-5", className)}>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton variant="shimmer" className="h-4 w-20" />
            <Skeleton variant="shimmer" className="h-8 w-24" />
            <Skeleton variant="shimmer" className="h-4 w-16" />
          </div>
          <Skeleton variant="shimmer" className="h-12 w-12 rounded-xl" />
        </div>
      </div>
    );
  }

  const formattedValue = (() => {
    const roundedValue = Math.round(animatedValue);
    switch (format) {
      case "currency":
        return `$${roundedValue.toLocaleString()}`;
      case "percent":
        return `${roundedValue}%`;
      default:
        return roundedValue.toLocaleString();
    }
  })();

  const TrendIcon = trend === undefined || trend === 0 ? Minus : trend > 0 ? TrendingUp : TrendingDown;
  const trendColor =
    trend === undefined || trend === 0
      ? "text-gray-400 dark:text-gray-500"
      : trend > 0
      ? "text-emerald-600 dark:text-emerald-400"
      : "text-red-500 dark:text-red-400";

  // Use statType for specific styling if provided
  const accent = statType ? {
    border: "",
    icon: "text-current",
    tint: statCardColors[statType].tint,
    gradient: "",
  } : (accentStyles[accentColor] || accentStyles.dark);

  return (
    <div
      className={cn(
        "stat-card-premium glass relative overflow-hidden rounded-xl p-5 group animate-card-enter",
        statType ? statCardColors[statType].tint : accent.border,
        className
      )}
      style={{
        animationDelay: `${animationDelay}ms`,
        ...(statType ? { '--glow-color': statCardColors[statType].glow } as React.CSSProperties : {}),
      }}
    >
      {/* Gradient overlay */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-50 pointer-events-none",
        accent.gradient
      )} />

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <Caption className="text-gray-600 dark:text-gray-400 font-medium">{title}</Caption>
          <div className="text-3xl font-bold tracking-tight text-foreground number-display counter-animate">
            {formattedValue}
          </div>
          {trend !== undefined && (
            <Caption as="div" className={cn("flex items-center gap-1.5 font-medium", trendColor)}>
              <TrendIcon className="h-4 w-4" />
              <span>{formatPercent(trend)}</span>
            </Caption>
          )}
        </div>
        <div className="flex flex-col items-center">
          <div
            className={cn(
              "icon-glow rounded-xl p-3 bg-gray-50 dark:bg-gray-800/80 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg",
              statType ? "" : accent.icon
            )}
            style={statType ? {
              color: statCardColors[statType].primary,
            } : undefined}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
