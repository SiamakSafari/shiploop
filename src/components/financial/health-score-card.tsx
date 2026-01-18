"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FinancialHealth } from "@/types";
import { Caption, Micro } from "@/components/ui/typography";

interface HealthScoreCardProps {
  health: FinancialHealth;
  onClick: () => void;
  isSelected: boolean;
}

export function HealthScoreCard({ health, onClick, isSelected }: HealthScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 60) return "text-primary";
    if (score >= 40) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-primary";
    if (score >= 40) return "bg-amber-500";
    return "bg-red-500";
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

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
      <div className="flex items-start gap-4">
        {/* Health Score Circle */}
        <div className="relative h-16 w-16 shrink-0">
          <svg className="h-16 w-16 -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-gray-200 dark:text-gray-700"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              strokeWidth="3"
              strokeDasharray={`${health.healthScore}, 100`}
              className={getScoreBgColor(health.healthScore)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn("text-lg font-bold font-space-grotesk", getScoreColor(health.healthScore))}>
              {health.healthScore}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <Caption className="font-semibold text-gray-900 dark:text-gray-50 truncate">
            {health.projectName}
          </Caption>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <Micro className="text-gray-400 dark:text-gray-500">MRR</Micro>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                {formatCurrency(health.mrr)}
              </p>
            </div>
            <div>
              <Micro className="text-gray-400 dark:text-gray-500">Runway</Micro>
              <p className={cn(
                "text-sm font-semibold",
                health.runway >= 12 ? "text-emerald-600 dark:text-emerald-400" :
                health.runway >= 6 ? "text-amber-600 dark:text-amber-400" :
                "text-red-600 dark:text-red-400"
              )}>
                {health.runway >= 999 ? "Profitable" : `${health.runway} mo`}
              </p>
            </div>
          </div>

          {/* Growth indicator */}
          <div className="flex items-center gap-1 mt-2">
            {health.growthRate >= 0 ? (
              <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-600 dark:text-red-400" />
            )}
            <Micro className={health.growthRate >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}>
              {health.growthRate >= 0 ? "+" : ""}{health.growthRate}% MoM
            </Micro>
          </div>
        </div>
      </div>
    </button>
  );
}
