"use client";

import { ChevronRight, Calendar, Trophy, TrendingUp, FileText, RefreshCw, Pause, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { PricingExperiment, ExperimentStatus, EXPERIMENT_STATUS_CONFIG } from "@/types";
import { Caption, Micro } from "@/components/ui/typography";
import { LucideIcon } from "lucide-react";

const STATUS_ICONS: Record<ExperimentStatus, LucideIcon> = {
  draft: FileText,
  running: RefreshCw,
  paused: Pause,
  completed: CheckCircle,
  winner_declared: Trophy,
};

interface ExperimentCardProps {
  experiment: PricingExperiment;
  onClick: () => void;
  isSelected: boolean;
}

export function ExperimentCard({ experiment, onClick, isSelected }: ExperimentCardProps) {
  const statusConfig = EXPERIMENT_STATUS_CONFIG[experiment.status];

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getTotalVisitors = () => {
    return experiment.variants.reduce((sum, v) => sum + v.visitors, 0);
  };

  const getBestConversionRate = () => {
    if (experiment.variants.length === 0) return 0;
    const rates = experiment.variants.map((v) =>
      v.visitors > 0 ? (v.conversions / v.visitors) * 100 : 0
    );
    return Math.max(...rates);
  };

  const getTotalRevenue = () => {
    return experiment.variants.reduce((sum, v) => sum + v.revenue, 0);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const winningVariant = experiment.winningVariantId
    ? experiment.variants.find((v) => v.id === experiment.winningVariantId)
    : null;

  return (
    <button
      onClick={onClick}
      className={cn(
        "group w-full text-left rounded-xl p-4 transition-all duration-200",
        "bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700",
        "border border-gray-200 dark:border-gray-700",
        "hover:shadow-md active:scale-[0.98]",
        isSelected && "ring-2 ring-primary border-primary dark:border-primary"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Status Icon */}
        {(() => {
          const StatusIcon = STATUS_ICONS[experiment.status];
          return (
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl shrink-0",
              experiment.status === "running" && "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
              experiment.status === "winner_declared" && "bg-primary/10 text-primary",
              experiment.status === "draft" && "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
              experiment.status === "paused" && "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
              experiment.status === "completed" && "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
            )}>
              <StatusIcon className="h-5 w-5" />
            </div>
          );
        })()}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <Caption className="font-semibold text-gray-900 dark:text-gray-50 truncate">
              {experiment.name}
            </Caption>
            <span className={cn(
              "shrink-0 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
              statusConfig.color.includes("emerald") && "bg-emerald-50 dark:bg-emerald-900/30",
              statusConfig.color.includes("amber") && "bg-amber-50 dark:bg-amber-900/30",
              statusConfig.color.includes("blue") && "bg-blue-50 dark:bg-blue-900/30",
              statusConfig.color.includes("slate") && "bg-gray-100 dark:bg-gray-800",
              statusConfig.color.includes("primary") && "bg-gray-50 dark:bg-gray-900/30",
              statusConfig.color
            )}>
              {statusConfig.label}
            </span>
          </div>

          <Micro className="text-gray-500 dark:text-gray-400 mb-2">
            {experiment.projectName} - {experiment.variants.length} variants
          </Micro>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <p className="text-gray-400 dark:text-gray-500">Visitors</p>
              <p className="font-semibold text-gray-900 dark:text-gray-50">
                {getTotalVisitors().toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-400 dark:text-gray-500">Best CVR</p>
              <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                {getBestConversionRate().toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-gray-400 dark:text-gray-500">Revenue</p>
              <p className="font-semibold text-gray-900 dark:text-gray-50">
                {formatCurrency(getTotalRevenue())}
              </p>
            </div>
          </div>

          {/* Winner indicator */}
          {winningVariant && (
            <div className="flex items-center gap-1 mt-2 text-xs text-primary">
              <Trophy className="h-3 w-3" />
              <span>Winner: {winningVariant.name}</span>
            </div>
          )}

          {/* Dates */}
          {experiment.startDate && (
            <Micro className="flex items-center gap-1 text-gray-400 dark:text-gray-500 mt-2">
              <Calendar className="h-3 w-3" />
              Started {formatDate(experiment.startDate)}
              {experiment.endDate && ` - Ended ${formatDate(experiment.endDate)}`}
            </Micro>
          )}
        </div>

        {/* Chevron */}
        <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:translate-x-0.5 transition-all shrink-0" />
      </div>
    </button>
  );
}
