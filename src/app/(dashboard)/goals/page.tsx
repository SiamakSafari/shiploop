"use client";

import { useState } from "react";
import { Target, Plus, Sparkles } from "lucide-react";
import { GoalCard, GoalDetail } from "@/components/goals";
import { useGoalsStore, useProjectsStore } from "@/stores";
import { GoalStatus, GOAL_STATUS_CONFIG } from "@/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const statusFilters: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "on_track", label: "On Track" },
  { value: "at_risk", label: "At Risk" },
  { value: "completed", label: "Completed" },
];

export default function GoalsPage() {
  const {
    goals,
    selectedGoalId,
    selectGoal,
    completeMilestone,
  } = useGoalsStore();

  const [filter, setFilter] = useState("all");

  const selectedGoal = goals.find((g) => g.id === selectedGoalId);

  // Filter goals
  const filteredGoals = filter === "all"
    ? goals
    : goals.filter((g) => g.status === filter);

  // Stats
  const stats = {
    total: goals.length,
    onTrack: goals.filter((g) => g.status === "on_track").length,
    atRisk: goals.filter((g) => g.status === "at_risk").length,
    completed: goals.filter((g) => g.status === "completed").length,
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              SMART Goals
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Track your goals with milestones and accountability check-ins.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-medium text-white shadow-md transition-all hover:bg-primary/90 hover:scale-105 active:scale-[0.97]">
          <Plus className="h-4 w-4" />
          New Goal
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatBox label="Total Goals" value={stats.total} color="text-slate-900 dark:text-slate-50" />
        <StatBox label="On Track" value={stats.onTrack} color="text-emerald-600 dark:text-emerald-400" />
        <StatBox label="At Risk" value={stats.atRisk} color="text-amber-600 dark:text-amber-400" />
        <StatBox label="Completed" value={stats.completed} color="text-primary" />
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
        {/* Goals list */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-50">
            <Sparkles className="h-4 w-4 text-primary" />
            Goals ({filteredGoals.length})
          </h2>
          {filteredGoals.length > 0 ? (
            <div className="space-y-3">
              {filteredGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onClick={() => selectGoal(goal.id)}
                  isSelected={selectedGoalId === goal.id}
                />
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="rounded-2xl bg-teal-100 dark:bg-teal-900/30 p-4">
                  <Target className="h-12 w-12 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-50">
                  No Goals Found
                </h3>
                <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
                  {filter === "all"
                    ? "Start setting SMART goals for your projects!"
                    : `No goals with status "${filter}".`}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div>
          {selectedGoal ? (
            <GoalDetail
              goal={selectedGoal}
              onCompleteMilestone={(milestoneId) =>
                completeMilestone(selectedGoal.id, milestoneId)
              }
            />
          ) : (
            <div className="glass rounded-2xl">
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  Select a goal to view details, milestones, and check-ins
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
  value: number;
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
