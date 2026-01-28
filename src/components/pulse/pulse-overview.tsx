"use client";

import { Wallet, TrendingUp, TrendingDown, Target, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PulseOverviewProps {
  currentBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  runway: number; // in months
  targetSavings: number;
}

export function PulseOverview({
  currentBalance,
  monthlyIncome,
  monthlyExpenses,
  runway,
  targetSavings,
}: PulseOverviewProps) {
  const netCashFlow = monthlyIncome - monthlyExpenses;
  const savingsProgress = Math.min(100, (currentBalance / targetSavings) * 100);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Current Balance */}
      <div className="glass rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Wallet className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Balance</span>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">
          ${currentBalance.toLocaleString()}
        </p>
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>Savings goal</span>
            <span>{Math.round(savingsProgress)}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${savingsProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Monthly Income */}
      <div className="glass rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Income/mo</span>
        </div>
        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
          ${monthlyIncome.toLocaleString()}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Predicted monthly
        </p>
      </div>

      {/* Monthly Expenses */}
      <div className="glass rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Expenses/mo</span>
        </div>
        <p className="text-2xl font-bold text-red-600 dark:text-red-400">
          ${monthlyExpenses.toLocaleString()}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Fixed + variable
        </p>
      </div>

      {/* Runway */}
      <div className="glass rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center",
              runway >= 6
                ? "bg-emerald-100 dark:bg-emerald-900/30"
                : runway >= 3
                ? "bg-amber-100 dark:bg-amber-900/30"
                : "bg-red-100 dark:bg-red-900/30"
            )}
          >
            <Clock
              className={cn(
                "h-4 w-4",
                runway >= 6
                  ? "text-emerald-600 dark:text-emerald-400"
                  : runway >= 3
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-red-600 dark:text-red-400"
              )}
            />
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Runway</span>
        </div>
        <p
          className={cn(
            "text-2xl font-bold",
            runway >= 6
              ? "text-emerald-600 dark:text-emerald-400"
              : runway >= 3
              ? "text-amber-600 dark:text-amber-400"
              : "text-red-600 dark:text-red-400"
          )}
        >
          {runway} months
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          At current burn rate
        </p>
      </div>
    </div>
  );
}
