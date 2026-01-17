"use client";

import { TrendingUp, TrendingDown, DollarSign, Wallet, CreditCard, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { FinancialHealth, METRIC_CATEGORY_CONFIG } from "@/types";
import { MetricCard } from "./metric-card";

interface FinancialDetailProps {
  health: FinancialHealth;
}

export function FinancialDetail({ health }: FinancialDetailProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return { label: "Excellent", color: "text-emerald-600 dark:text-emerald-400" };
    if (score >= 60) return { label: "Good", color: "text-primary" };
    if (score >= 40) return { label: "Fair", color: "text-amber-600 dark:text-amber-400" };
    return { label: "Needs Attention", color: "text-red-600 dark:text-red-400" };
  };

  const scoreInfo = getScoreLabel(health.healthScore);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
              {health.projectName}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Last updated {new Date(health.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold font-space-grotesk text-primary">
              {health.healthScore}
            </p>
            <p className={cn("text-sm font-medium", scoreInfo.color)}>
              {scoreInfo.label}
            </p>
          </div>
        </div>

        {/* Health Score Bar */}
        <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              health.healthScore >= 80 ? "bg-emerald-500" :
              health.healthScore >= 60 ? "bg-primary" :
              health.healthScore >= 40 ? "bg-amber-500" : "bg-red-500"
            )}
            style={{ width: `${health.healthScore}%` }}
          />
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
            <DollarSign className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wide">MRR</span>
          </div>
          <p className="text-2xl font-bold font-space-grotesk text-emerald-600 dark:text-emerald-400">
            {formatCurrency(health.mrr)}
          </p>
        </div>

        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
            <LineChart className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wide">Runway</span>
          </div>
          <p className={cn(
            "text-2xl font-bold font-space-grotesk",
            health.runway >= 12 ? "text-emerald-600 dark:text-emerald-400" :
            health.runway >= 6 ? "text-amber-600 dark:text-amber-400" :
            "text-red-600 dark:text-red-400"
          )}>
            {health.runway >= 999 ? "Profitable" : `${health.runway} months`}
          </p>
        </div>

        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
            <Wallet className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wide">Cash on Hand</span>
          </div>
          <p className="text-2xl font-bold font-space-grotesk text-slate-900 dark:text-slate-50">
            {formatCurrency(health.cashOnHand)}
          </p>
        </div>

        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
            <CreditCard className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wide">Monthly Burn</span>
          </div>
          <p className="text-2xl font-bold font-space-grotesk text-red-600 dark:text-red-400">
            {formatCurrency(health.monthlyExpenses)}
          </p>
        </div>
      </div>

      {/* Growth Rate */}
      <div className="glass rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            {health.growthRate >= 0 ? (
              <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
            )}
            <span className="text-xs font-medium uppercase tracking-wide">Monthly Growth Rate</span>
          </div>
          <p className={cn(
            "text-xl font-bold font-space-grotesk",
            health.growthRate >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
          )}>
            {health.growthRate >= 0 ? "+" : ""}{health.growthRate}%
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      {health.metrics.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-3">
            All Metrics
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {health.metrics.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
