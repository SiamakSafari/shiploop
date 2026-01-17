"use client";

import { Play, Pause, Trophy, Trash2, Users, CreditCard, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { PricingExperiment, EXPERIMENT_STATUS_CONFIG, PriceVariant } from "@/types";

interface ExperimentDetailProps {
  experiment: PricingExperiment;
  onStart: () => void;
  onPause: () => void;
  onDeclareWinner: (variantId: string) => void;
  onDelete: () => void;
}

export function ExperimentDetail({
  experiment,
  onStart,
  onPause,
  onDeclareWinner,
  onDelete,
}: ExperimentDetailProps) {
  const statusConfig = EXPERIMENT_STATUS_CONFIG[experiment.status];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getConversionRate = (variant: PriceVariant) => {
    if (variant.visitors === 0) return 0;
    return (variant.conversions / variant.visitors) * 100;
  };

  const getRevenuePerVisitor = (variant: PriceVariant) => {
    if (variant.visitors === 0) return 0;
    return variant.revenue / variant.visitors;
  };

  const getBestVariant = () => {
    if (experiment.variants.length === 0) return null;
    return experiment.variants.reduce((best, current) =>
      getConversionRate(current) > getConversionRate(best) ? current : best
    );
  };

  const bestVariant = getBestVariant();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
              {experiment.name}
            </h2>
            {experiment.description && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {experiment.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className={cn(
              "flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium",
              statusConfig.color.includes("emerald") && "bg-emerald-50 dark:bg-emerald-900/30",
              statusConfig.color.includes("amber") && "bg-amber-50 dark:bg-amber-900/30",
              statusConfig.color.includes("blue") && "bg-blue-50 dark:bg-blue-900/30",
              statusConfig.color.includes("slate") && "bg-slate-100 dark:bg-slate-800",
              statusConfig.color.includes("primary") && "bg-teal-50 dark:bg-teal-900/30",
              statusConfig.color
            )}>
              {statusConfig.icon} {statusConfig.label}
            </span>
            <button
              onClick={onDelete}
              className="p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {experiment.status === "draft" && (
            <button
              onClick={onStart}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
            >
              <Play className="h-4 w-4" />
              Start Experiment
            </button>
          )}
          {experiment.status === "running" && (
            <button
              onClick={onPause}
              className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 transition-colors"
            >
              <Pause className="h-4 w-4" />
              Pause
            </button>
          )}
          {experiment.status === "paused" && (
            <button
              onClick={onStart}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
            >
              <Play className="h-4 w-4" />
              Resume
            </button>
          )}
        </div>

        {/* Dates */}
        {experiment.startDate && (
          <div className="flex items-center gap-4 mt-4 text-sm text-slate-500 dark:text-slate-400">
            <span>Started: {formatDate(experiment.startDate)}</span>
            {experiment.endDate && <span>Ended: {formatDate(experiment.endDate)}</span>}
          </div>
        )}
      </div>

      {/* Variants Comparison */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4">
          Variant Comparison
        </h3>
        <div className="space-y-4">
          {experiment.variants.map((variant) => {
            const isWinner = experiment.winningVariantId === variant.id;
            const isBest = bestVariant?.id === variant.id && !experiment.winningVariantId;
            const cvr = getConversionRate(variant);
            const rpv = getRevenuePerVisitor(variant);

            return (
              <div
                key={variant.id}
                className={cn(
                  "rounded-xl p-4 border",
                  isWinner
                    ? "bg-teal-50 dark:bg-teal-900/30 border-primary"
                    : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 dark:text-slate-50">
                      {variant.name}
                    </span>
                    {isWinner && (
                      <span className="flex items-center gap-1 text-xs text-primary">
                        <Trophy className="h-3 w-3" />
                        Winner
                      </span>
                    )}
                    {isBest && (
                      <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                        <TrendingUp className="h-3 w-3" />
                        Leading
                      </span>
                    )}
                  </div>
                  {(experiment.status === "running" || experiment.status === "paused") && !experiment.winningVariantId && (
                    <button
                      onClick={() => onDeclareWinner(variant.id)}
                      className="flex items-center gap-1 rounded-lg bg-slate-100 dark:bg-slate-700 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    >
                      <Trophy className="h-3 w-3" />
                      Declare Winner
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400 dark:text-slate-500 mb-1">Price</p>
                    <p className="font-semibold text-slate-900 dark:text-slate-50">
                      {formatCurrency(variant.price)}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 dark:text-slate-500 mb-1">Visitors</p>
                    <p className="font-semibold text-slate-900 dark:text-slate-50">
                      {variant.visitors.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 dark:text-slate-500 mb-1">Conversion</p>
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {cvr.toFixed(2)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 dark:text-slate-500 mb-1">Revenue</p>
                    <p className="font-semibold text-slate-900 dark:text-slate-50">
                      {formatCurrency(variant.revenue)}
                    </p>
                  </div>
                </div>

                {/* Conversion bar */}
                <div className="mt-3">
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        isWinner ? "bg-primary" : "bg-slate-400"
                      )}
                      style={{ width: `${Math.min(cvr * 5, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Features */}
                {variant.features && variant.features.length > 0 && (
                  <div className="mt-3 flex gap-1 flex-wrap">
                    {variant.features.map((feature, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-slate-100 dark:bg-slate-700 px-2 py-0.5 text-xs text-slate-600 dark:text-slate-400"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Settings */}
      <div className="glass rounded-xl p-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-3">
          Experiment Settings
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-400 dark:text-slate-500">Minimum Sample Size</p>
            <p className="text-slate-900 dark:text-slate-50">{experiment.minimumSampleSize} visitors</p>
          </div>
          <div>
            <p className="text-slate-400 dark:text-slate-500">Confidence Level</p>
            <p className="text-slate-900 dark:text-slate-50">{(experiment.confidenceLevel * 100).toFixed(0)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
