"use client";

import { Calendar, Target, CheckCircle2, Circle, Clock, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { SMARTGoal, GOAL_STATUS_CONFIG } from "@/types";

interface GoalDetailProps {
  goal: SMARTGoal;
  onCompleteMilestone: (milestoneId: string) => void;
}

export function GoalDetail({ goal, onCompleteMilestone }: GoalDetailProps) {
  const statusConfig = GOAL_STATUS_CONFIG[goal.status];

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatRelativeDate = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "today";
    if (diffDays === 1) return "yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}mo ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
              {goal.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {goal.description}
            </p>
          </div>
          <span className={cn(
            "flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium",
            statusConfig.color.includes("emerald") && "bg-emerald-50 dark:bg-emerald-900/30",
            statusConfig.color.includes("amber") && "bg-amber-50 dark:bg-amber-900/30",
            statusConfig.color.includes("blue") && "bg-blue-50 dark:bg-blue-900/30",
            statusConfig.color.includes("red") && "bg-red-50 dark:bg-red-900/30",
            statusConfig.color.includes("primary") && "bg-gray-50 dark:bg-gray-900/30",
            statusConfig.color
          )}>
            <span>{statusConfig.icon}</span>
            <span>{statusConfig.label}</span>
          </span>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Progress</span>
            <span className="text-sm font-bold text-gray-900 dark:text-gray-50">
              {goal.progress}%
            </span>
          </div>
          <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${goal.progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {goal.measurable.current} / {goal.measurable.target} {goal.measurable.unit}
          </p>
        </div>

        {/* Timeline */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Started {formatDate(goal.timeBound.startDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            <span>Due {formatDate(goal.timeBound.dueDate)}</span>
          </div>
        </div>
      </div>

      {/* SMART Breakdown */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50 mb-4">
          SMART Criteria
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">Specific</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{goal.specific}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">Measurable</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Target: {goal.measurable.target} {goal.measurable.unit}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">Achievable</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{goal.achievable}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">Relevant</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{goal.relevant}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">Time-Bound</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {formatDate(goal.timeBound.startDate)} to {formatDate(goal.timeBound.dueDate)}
            </p>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50 mb-4">
          Milestones
        </h3>
        <div className="space-y-3">
          {goal.milestones.map((milestone) => (
            <button
              key={milestone.id}
              onClick={() => !milestone.completed && onCompleteMilestone(milestone.id)}
              disabled={milestone.completed}
              className={cn(
                "w-full flex items-center gap-3 rounded-lg p-3 transition-all",
                milestone.completed
                  ? "bg-emerald-50 dark:bg-emerald-900/30"
                  : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              {milestone.completed ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              )}
              <span className={cn(
                "flex-1 text-left text-sm",
                milestone.completed
                  ? "text-emerald-600 dark:text-emerald-400 line-through"
                  : "text-gray-900 dark:text-gray-50"
              )}>
                {milestone.label}
              </span>
              {milestone.completedAt && (
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {formatRelativeDate(milestone.completedAt)}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Check-ins */}
      {goal.checkIns.length > 0 && (
        <div className="glass rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50 mb-4">
            Accountability Check-ins
          </h3>
          <div className="space-y-4">
            {goal.checkIns.map((checkIn) => (
              <div
                key={checkIn.id}
                className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4"
              >
                <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-2">
                  <Clock className="h-3 w-3" />
                  <span>{formatRelativeDate(checkIn.date)}</span>
                </div>
                <p className="text-sm text-gray-900 dark:text-gray-50 mb-2">
                  {checkIn.progressNote}
                </p>
                {checkIn.blockers && (
                  <p className="text-sm text-red-600 dark:text-red-400 mb-2">
                    Blockers: {checkIn.blockers}
                  </p>
                )}
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Next: {checkIn.nextSteps}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
