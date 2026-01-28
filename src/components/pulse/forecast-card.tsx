"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { CashFlowForecast } from "@/stores/use-pulse-store";
import { cn } from "@/lib/utils";

interface ForecastCardProps {
  forecast: CashFlowForecast;
  isFirst?: boolean;
}

export function ForecastCard({ forecast, isFirst }: ForecastCardProps) {
  const monthName = new Date(forecast.month + "-01").toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  const isPositive = forecast.netCashFlow > 0;
  const isNegative = forecast.netCashFlow < 0;
  const isLowBalance = forecast.runningBalance < 5000;
  const isCritical = forecast.runningBalance < 0;

  return (
    <div
      className={cn(
        "rounded-xl border p-4 transition-all",
        isFirst
          ? "bg-primary/5 border-primary/20"
          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
        isCritical && "border-red-500/50 bg-red-50 dark:bg-red-900/20"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900 dark:text-gray-50">
            {monthName}
          </span>
          {isFirst && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-primary/10 text-primary">
              CURRENT
            </span>
          )}
        </div>
        <div
          className={cn(
            "flex items-center gap-1 text-sm font-medium",
            isPositive && "text-emerald-600 dark:text-emerald-400",
            isNegative && "text-red-600 dark:text-red-400",
            !isPositive && !isNegative && "text-gray-500"
          )}
        >
          {isPositive && <TrendingUp className="h-3.5 w-3.5" />}
          {isNegative && <TrendingDown className="h-3.5 w-3.5" />}
          {!isPositive && !isNegative && <Minus className="h-3.5 w-3.5" />}
          {isPositive && "+"}${Math.abs(forecast.netCashFlow).toLocaleString()}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Income</p>
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            ${forecast.predictedIncome.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Expenses</p>
          <p className="text-sm font-medium text-red-600 dark:text-red-400">
            ${forecast.predictedExpenses.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Balance</p>
          <p
            className={cn(
              "text-sm font-medium",
              isCritical
                ? "text-red-600 dark:text-red-400"
                : isLowBalance
                ? "text-amber-600 dark:text-amber-400"
                : "text-gray-900 dark:text-gray-50"
            )}
          >
            ${forecast.runningBalance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Confidence indicator */}
      <div className="mt-3 flex items-center gap-2">
        <div className="flex-1 h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              forecast.confidence >= 80
                ? "bg-emerald-500"
                : forecast.confidence >= 60
                ? "bg-amber-500"
                : "bg-red-500"
            )}
            style={{ width: `${forecast.confidence}%` }}
          />
        </div>
        <span className="text-[10px] text-gray-500 dark:text-gray-400">
          {forecast.confidence}% confidence
        </span>
      </div>
    </div>
  );
}
