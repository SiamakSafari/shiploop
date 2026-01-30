"use client";

import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn, formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { statCardColors, type StatCardType } from "@/lib/design-system";
import { Caption, NumberDisplay } from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/skeleton";

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
}

const accentStyles = {
  dark: {
    border: "card-accent-dark",
    icon: "text-gray-900 dark:text-gray-100",
  },
  black: {
    border: "card-accent-black",
    icon: "text-gray-950 dark:text-white",
  },
  gray1: {
    border: "card-accent-gray-1",
    icon: "text-gray-700 dark:text-gray-200",
  },
  gray2: {
    border: "card-accent-gray-2",
    icon: "text-gray-500 dark:text-gray-400",
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
}: StatCardProps) {
  if (isLoading) {
    return (
      <div className={cn("glass rounded-xl p-3", className)}>
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0 space-y-2">
            <Skeleton variant="shimmer" className="h-4 w-20" />
            <Skeleton variant="shimmer" className="h-8 w-24" />
            <Skeleton variant="shimmer" className="h-4 w-16" />
          </div>
          <Skeleton variant="shimmer" className="h-12 w-12 rounded-xl shrink-0" />
        </div>
      </div>
    );
  }

  const formattedValue = (() => {
    switch (format) {
      case "currency":
        return formatCurrency(value);
      case "percent":
        return `${value}%`;
      default:
        return formatNumber(value);
    }
  })();

  const TrendIcon = trend === undefined || trend === 0 ? Minus : trend > 0 ? TrendingUp : TrendingDown;
  const trendColor =
    trend === undefined || trend === 0
      ? "text-gray-400 dark:text-gray-500"
      : trend > 0
      ? "text-gray-900 dark:text-gray-100"
      : "text-gray-500 dark:text-gray-400";

  // Use statType for specific styling if provided
  const accent = statType ? {
    border: "",
    icon: "text-current",
    tint: statCardColors[statType].tint,
  } : (accentStyles[accentColor] || accentStyles.dark);

  return (
    <div
      className={cn(
        "glass hover-lift relative overflow-hidden rounded-xl p-3 group transition-all duration-250",
        statType ? statCardColors[statType].tint : accent.border,
        className
      )}
      style={statType ? {
        '--glow-color': statCardColors[statType].glow,
      } as React.CSSProperties : undefined}
    >
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0 space-y-2">
          <Caption className="text-gray-600 dark:text-gray-400">{title}</Caption>
          <NumberDisplay variant="medium" className="text-gray-900 dark:text-gray-50 stat-number">{formattedValue}</NumberDisplay>
          {trend !== undefined && (
            <Caption as="div" className={cn("flex items-center gap-1.5", trendColor)}>
              <TrendIcon className="h-4 w-4" />
              <span>{formatPercent(trend)}</span>
            </Caption>
          )}
        </div>
        <div className="shrink-0 flex flex-col items-center">
          <div
            className={cn(
              "rounded-xl p-3 bg-gray-50 dark:bg-gray-800 transition-all duration-250 group-hover:scale-110 group-hover:rotate-3",
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
