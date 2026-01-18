"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { FinancialMetric, METRIC_CATEGORY_CONFIG } from "@/types";

interface MetricCardProps {
  metric: FinancialMetric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const categoryConfig = METRIC_CATEGORY_CONFIG[metric.category];

  const formatValue = (value: number, unit: string) => {
    if (unit === "currency") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(value);
    }
    if (unit === "percentage") {
      return `${value}%`;
    }
    if (unit === "months") {
      return `${value} mo`;
    }
    return value.toString();
  };

  const getTrend = () => {
    if (!metric.previousValue) return null;
    const diff = metric.value - metric.previousValue;
    const percentChange = metric.previousValue !== 0
      ? ((diff / metric.previousValue) * 100).toFixed(1)
      : 0;
    return { diff, percentChange };
  };

  const trend = getTrend();

  const isPositiveTrend = () => {
    if (!trend) return null;
    // For expenses, lower is better
    if (metric.category === "expenses") {
      return trend.diff < 0;
    }
    return trend.diff > 0;
  };

  const positive = isPositiveTrend();

  return (
    <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{categoryConfig.icon}</span>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {metric.name}
        </span>
      </div>

      <div className="flex items-end justify-between">
        <p className={cn("text-xl font-bold font-space-grotesk", categoryConfig.color)}>
          {formatValue(metric.value, metric.unit)}
        </p>

        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-medium rounded-full px-2 py-0.5",
            positive === true && "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30",
            positive === false && "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30",
            positive === null && "text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800"
          )}>
            {positive === true && <TrendingUp className="h-3 w-3" />}
            {positive === false && <TrendingDown className="h-3 w-3" />}
            {positive === null && <Minus className="h-3 w-3" />}
            <span>{trend.percentChange}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
