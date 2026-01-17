"use client";

import { useState } from "react";
import { FlaskConical, Plus, Sparkles } from "lucide-react";
import { ExperimentCard, ExperimentDetail } from "@/components/pricing";
import { usePricingStore } from "@/stores";
import { ExperimentStatus, EXPERIMENT_STATUS_CONFIG } from "@/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const statusFilters: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "running", label: "Running" },
  { value: "draft", label: "Draft" },
  { value: "completed", label: "Completed" },
];

export default function PricingPage() {
  const {
    experiments,
    selectedExperimentId,
    selectExperiment,
    startExperiment,
    pauseExperiment,
    declareWinner,
    deleteExperiment,
  } = usePricingStore();

  const [filter, setFilter] = useState("all");

  const selectedExperiment = experiments.find((e) => e.id === selectedExperimentId);

  // Filter experiments
  const filteredExperiments = filter === "all"
    ? experiments
    : experiments.filter((e) => {
        if (filter === "completed") {
          return e.status === "completed" || e.status === "winner_declared";
        }
        return e.status === filter;
      });

  // Stats
  const stats = {
    active: experiments.filter((e) => e.status === "running").length,
    totalVariants: experiments.reduce((sum, e) => sum + e.variants.length, 0),
    bestConversion: (() => {
      const rates = experiments.flatMap((e) =>
        e.variants.map((v) => (v.visitors > 0 ? (v.conversions / v.visitors) * 100 : 0))
      );
      return rates.length > 0 ? Math.max(...rates).toFixed(1) : "0";
    })(),
    totalRevenue: experiments.reduce(
      (sum, e) => sum + e.variants.reduce((vSum, v) => vSum + v.revenue, 0),
      0
    ),
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              Pricing Experiments
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Run A/B tests on pricing to optimize conversion and revenue.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-medium text-white shadow-md transition-all hover:bg-primary/90 hover:scale-105 active:scale-[0.97]">
          <Plus className="h-4 w-4" />
          New Experiment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatBox label="Active Experiments" value={stats.active.toString()} color="text-emerald-600 dark:text-emerald-400" />
        <StatBox label="Total Variants" value={stats.totalVariants.toString()} color="text-slate-900 dark:text-slate-50" />
        <StatBox label="Best Conversion" value={`${stats.bestConversion}%`} color="text-blue-600 dark:text-blue-400" />
        <StatBox label="Total Revenue" value={formatCurrency(stats.totalRevenue)} color="text-primary" />
      </div>

      {/* Filters */}
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          {statusFilters.map((status) => (
            <TabsTrigger
              key={status.value}
              value={status.value}
              className={cn(
                "text-slate-500 dark:text-slate-400 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-50 data-[state=active]:shadow-sm"
              )}
            >
              {status.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Experiments list */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-50">
            <Sparkles className="h-4 w-4 text-primary" />
            Experiments ({filteredExperiments.length})
          </h2>
          {filteredExperiments.length > 0 ? (
            <div className="space-y-3">
              {filteredExperiments.map((experiment) => (
                <ExperimentCard
                  key={experiment.id}
                  experiment={experiment}
                  onClick={() => selectExperiment(experiment.id)}
                  isSelected={selectedExperimentId === experiment.id}
                />
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="rounded-2xl bg-teal-100 dark:bg-teal-900/30 p-4">
                  <FlaskConical className="h-12 w-12 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-50">
                  No Experiments Found
                </h3>
                <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
                  {filter === "all"
                    ? "Start your first pricing experiment!"
                    : `No experiments with status "${filter}".`}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div>
          {selectedExperiment ? (
            <ExperimentDetail
              experiment={selectedExperiment}
              onStart={() => startExperiment(selectedExperiment.id)}
              onPause={() => pauseExperiment(selectedExperiment.id)}
              onDeclareWinner={(variantId) => declareWinner(selectedExperiment.id, variantId)}
              onDelete={() => {
                deleteExperiment(selectedExperiment.id);
                selectExperiment(null);
              }}
            />
          ) : (
            <div className="glass rounded-2xl">
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  Select an experiment to view details and manage variants
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="glass rounded-xl p-4">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className={cn("text-2xl font-bold font-space-grotesk", color)}>
        {value}
      </p>
    </div>
  );
}
