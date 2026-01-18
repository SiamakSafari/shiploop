// Financial Health Calculator Types

export type MetricCategory = "revenue" | "expenses" | "runway" | "growth";

export interface FinancialMetric {
  id: string;
  category: MetricCategory;
  name: string;
  value: number;
  previousValue?: number;
  unit: "currency" | "percentage" | "months";
  updatedAt: Date;
}

export interface FinancialHealth {
  id: string;
  projectId: string;
  projectName: string;
  healthScore: number; // 0-100
  metrics: FinancialMetric[];
  runway: number; // months
  mrr: number;
  monthlyExpenses: number;
  growthRate: number;
  cashOnHand: number;
  updatedAt: Date;
}

export const METRIC_CATEGORY_CONFIG: Record<MetricCategory, { icon: string; label: string; color: string }> = {
  revenue: { icon: "dollar-sign", label: "Revenue", color: "text-emerald-600 dark:text-emerald-400" },
  expenses: { icon: "trending-down", label: "Expenses", color: "text-red-600 dark:text-red-400" },
  runway: { icon: "plane", label: "Runway", color: "text-blue-600 dark:text-blue-400" },
  growth: { icon: "trending-up", label: "Growth", color: "text-purple-600 dark:text-purple-400" },
};
