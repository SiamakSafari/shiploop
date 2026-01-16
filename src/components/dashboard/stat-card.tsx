"use client";

import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn, formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { statCardColors, type StatCardType } from "@/lib/design-system";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: number;
  format?: "currency" | "number" | "percent";
  className?: string;
  emoji?: string;
  statType?: StatCardType;
  accentColor?: "purple" | "cyan" | "pink" | "emerald";
}

const accentStyles = {
  purple: {
    bg: "from-purple-500/20 to-purple-500/5",
    icon: "bg-purple-500/20 text-purple-400",
    glow: "shadow-purple-500/20",
  },
  cyan: {
    bg: "from-cyan-500/20 to-cyan-500/5",
    icon: "bg-cyan-500/20 text-cyan-400",
    glow: "shadow-cyan-500/20",
  },
  pink: {
    bg: "from-pink-500/20 to-pink-500/5",
    icon: "bg-pink-500/20 text-pink-400",
    glow: "shadow-pink-500/20",
  },
  emerald: {
    bg: "from-emerald-500/20 to-emerald-500/5",
    icon: "bg-emerald-500/20 text-emerald-400",
    glow: "shadow-emerald-500/20",
  },
};

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  format = "number",
  className,
  emoji,
  statType,
  accentColor = "purple",
}: StatCardProps) {
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
      ? "text-white/40"
      : trend > 0
      ? "text-emerald-400"
      : "text-red-400";

  // Use statType for specific styling if provided
  const accent = statType ? {
    bg: "from-current/20 to-current/5",
    icon: "text-current",
    glow: "hover-glow",
    tint: statCardColors[statType].tint,
  } : accentStyles[accentColor];

  return (
    <div
      className={cn(
        "glass hover-lift relative overflow-hidden rounded-xl p-5 group transition-all duration-300",
        statType ? statCardColors[statType].tint : accent.glow,
        className
      )}
      style={statType ? {
        '--glow-color': statCardColors[statType].glow,
      } as React.CSSProperties : undefined}
    >
      {/* Gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-50",
          statType ? "opacity-0" : accent.bg
        )}
      />

      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-white/60 font-medium">{title}</p>
          <p className="text-3xl font-bold text-white stat-number">{formattedValue}</p>
          {trend !== undefined && (
            <div className={cn("flex items-center gap-1.5 text-sm font-medium", trendColor)}>
              <TrendIcon className="h-4 w-4" />
              <span>{formatPercent(trend)}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          {emoji && (
            <div className="text-2xl hover-wiggle cursor-default">
              {emoji}
            </div>
          )}
          <div
            className={cn(
              "rounded-xl p-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
              statType ? "bg-white/5" : accent.icon
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
