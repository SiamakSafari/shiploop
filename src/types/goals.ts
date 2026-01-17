// Goal Setting with Accountability Types

export type GoalStatus = "active" | "on_track" | "at_risk" | "completed" | "failed";

export interface SMARTGoal {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  description: string;
  // SMART criteria
  specific: string;
  measurable: { target: number; current: number; unit: string };
  achievable: string;
  relevant: string;
  timeBound: { startDate: Date; dueDate: Date };
  // Tracking
  status: GoalStatus;
  progress: number;
  milestones: GoalMilestone[];
  checkIns: AccountabilityCheckIn[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GoalMilestone {
  id: string;
  label: string;
  targetValue: number;
  completed: boolean;
  completedAt?: Date;
}

export interface AccountabilityCheckIn {
  id: string;
  date: Date;
  progressNote: string;
  blockers?: string;
  nextSteps: string;
}

export const GOAL_STATUS_CONFIG: Record<GoalStatus, { icon: string; label: string; color: string }> = {
  active: { icon: "🎯", label: "Active", color: "text-blue-600 dark:text-blue-400" },
  on_track: { icon: "✅", label: "On Track", color: "text-emerald-600 dark:text-emerald-400" },
  at_risk: { icon: "⚠️", label: "At Risk", color: "text-amber-600 dark:text-amber-400" },
  completed: { icon: "🏆", label: "Completed", color: "text-primary" },
  failed: { icon: "❌", label: "Failed", color: "text-red-600 dark:text-red-400" },
};
