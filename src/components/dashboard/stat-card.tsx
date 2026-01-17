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
  accentColor?: "teal" | "black" | "gray1" | "gray2";
  isLoading?: boolean;
}

const accentStyles = {
  teal: {
    border: "card-accent-teal",
    icon: "text-primary",
  },
  black: {
    border: "card-accent-black",
    icon: "text-black dark:text-white",
  },
  gray1: {
    border: "card-accent-gray-1",
    icon: "text-slate-700 dark:text-slate-200",
  },
  gray2: {
    border: "card-accent-gray-2",
    icon: "text-slate-500 dark:text-slate-400",
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
  accentColor = "teal",
  isLoading = false,
}: StatCardProps) {
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
      ? "text-slate-400 dark:text-slate-500"
      : trend > 0
      ? "text-emerald-600"
      : "text-red-600";

  // Use statType for specific styling if provided
  const accent = statType ? {
    border: "",
    icon: "text-current",
    tint: statCardColors[statType].tint,
  } : (accentStyles[accentColor] || accentStyles.teal);

  return (
    <div
      className={cn(
        "glass hover-lift relative overflow-hidden rounded-xl p-5 group transition-all duration-250",
        statType ? statCardColors[statType].tint : accent.border,
        className
      )}
      style={statType ? {
        '--glow-color': statCardColors[statType].glow,
      } as React.CSSProperties : undefined}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Caption className="text-slate-600 dark:text-slate-400">{title}</Caption>
          <NumberDisplay variant="medium" className="text-slate-900 dark:text-slate-50 stat-number">{formattedValue}</NumberDisplay>
          {trend !== undefined && (
            <Caption as="div" className={cn("flex items-center gap-1.5", trendColor)}>
              <TrendIcon className="h-4 w-4" />
              <span>{formatPercent(trend)}</span>
            </Caption>
          )}
        </div>
        <div className="flex flex-col items-center">
          <div
            className={cn(
              "rounded-xl p-3 bg-slate-50 dark:bg-slate-800 transition-all duration-250 group-hover:scale-110 group-hover:rotate-3",
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
