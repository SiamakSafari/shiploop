"use client";

import { ChevronRight, Calendar, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SMARTGoal, GOAL_STATUS_CONFIG } from "@/types";
import { Caption, Micro } from "@/components/ui/typography";

interface GoalCardProps {
  goal: SMARTGoal;
  onClick: () => void;
  isSelected: boolean;
}

export function GoalCard({ goal, onClick, isSelected }: GoalCardProps) {
  const statusConfig = GOAL_STATUS_CONFIG[goal.status];
  const completedMilestones = goal.milestones.filter((m) => m.completed).length;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getDaysRemaining = () => {
    const now = new Date();
    const due = new Date(goal.timeBound.dueDate);
    const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return "Overdue";
    if (diff === 0) return "Due today";
    if (diff === 1) return "1 day left";
    return `${diff} days left`;
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group w-full text-left rounded-xl p-4 transition-all duration-200",
        "bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700",
        "border border-slate-200 dark:border-slate-700",
        "hover:shadow-md active:scale-[0.98]",
        isSelected && "ring-2 ring-primary border-primary dark:border-primary"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Progress Ring */}
        <div className="relative h-12 w-12 shrink-0">
          <svg className="h-12 w-12 -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-slate-200 dark:text-slate-700"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              strokeWidth="3"
              strokeDasharray={`${goal.progress}, 100`}
              className="text-primary"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-50">
              {goal.progress}%
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <Caption className="font-semibold text-slate-900 dark:text-slate-50 truncate">
              {goal.title}
            </Caption>
            <span className={cn(
              "shrink-0 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
              statusConfig.color.includes("emerald") && "bg-emerald-50 dark:bg-emerald-900/30",
              statusConfig.color.includes("amber") && "bg-amber-50 dark:bg-amber-900/30",
              statusConfig.color.includes("blue") && "bg-blue-50 dark:bg-blue-900/30",
              statusConfig.color.includes("red") && "bg-red-50 dark:bg-red-900/30",
              statusConfig.color.includes("primary") && "bg-teal-50 dark:bg-teal-900/30",
              statusConfig.color
            )}>
              <span>{statusConfig.icon}</span>
              <span>{statusConfig.label}</span>
            </span>
          </div>

          <Micro className="text-slate-500 dark:text-slate-400 mt-0.5">
            {goal.projectName}
          </Micro>

          {/* Progress info */}
          <div className="flex items-center gap-3 mt-2">
            <Micro className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
              <CheckCircle2 className="h-3 w-3" />
              {completedMilestones}/{goal.milestones.length} milestones
            </Micro>
            <Micro className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
              <Calendar className="h-3 w-3" />
              {getDaysRemaining()}
            </Micro>
          </div>

          {/* Measurable progress */}
          <div className="mt-2">
            <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  goal.status === "completed" ? "bg-emerald-500" :
                  goal.status === "failed" ? "bg-red-500" :
                  goal.status === "at_risk" ? "bg-amber-500" : "bg-primary"
                )}
                style={{ width: `${goal.progress}%` }}
              />
            </div>
            <Micro className="text-slate-400 dark:text-slate-500 mt-1">
              {goal.measurable.current} / {goal.measurable.target} {goal.measurable.unit}
            </Micro>
          </div>
        </div>

        {/* Chevron */}
        <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all shrink-0" />
      </div>
    </button>
  );
}
