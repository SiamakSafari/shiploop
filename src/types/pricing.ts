// Pricing Experiment Tracker Types

export type ExperimentStatus = "draft" | "running" | "paused" | "completed" | "winner_declared";

export interface PriceVariant {
  id: string;
  name: string; // e.g., "Control", "Variant A"
  price: number;
  features?: string[];
  visitors: number;
  conversions: number;
  revenue: number;
}

export interface PricingExperiment {
  id: string;
  projectId: string;
  projectName: string;
  name: string;
  description?: string;
  status: ExperimentStatus;
  variants: PriceVariant[];
  startDate?: Date;
  endDate?: Date;
  winningVariantId?: string;
  minimumSampleSize: number;
  confidenceLevel: number; // 0.95 default
  createdAt: Date;
  updatedAt: Date;
}

export interface ExperimentStatusConfig {
  label: string;
  color: string;
}

export const EXPERIMENT_STATUS_CONFIG: Record<ExperimentStatus, ExperimentStatusConfig> = {
  draft: { label: "Draft", color: "text-slate-600 dark:text-slate-400" },
  running: { label: "Running", color: "text-emerald-600 dark:text-emerald-400" },
  paused: { label: "Paused", color: "text-amber-600 dark:text-amber-400" },
  completed: { label: "Completed", color: "text-blue-600 dark:text-blue-400" },
  winner_declared: { label: "Winner Declared", color: "text-primary" },
};
