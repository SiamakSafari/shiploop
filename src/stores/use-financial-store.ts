import { create } from "zustand";
import { FinancialHealth, FinancialMetric, MetricCategory } from "@/types";

interface FinancialState {
  healthRecords: FinancialHealth[];
  selectedRecordId: string | null;

  // Actions
  selectRecord: (id: string | null) => void;
  updateMetric: (recordId: string, metricId: string, value: number) => void;
  addRecord: (projectId: string, projectName: string) => void;
  deleteRecord: (id: string) => void;
  updateCashOnHand: (recordId: string, amount: number) => void;
  updateMonthlyExpenses: (recordId: string, amount: number) => void;
}

// Calculate health score based on metrics
const calculateHealthScore = (record: FinancialHealth): number => {
  let score = 50; // Base score

  // Runway impact (0-30 points)
  if (record.runway >= 18) score += 30;
  else if (record.runway >= 12) score += 25;
  else if (record.runway >= 6) score += 15;
  else if (record.runway >= 3) score += 5;

  // Growth rate impact (0-20 points)
  if (record.growthRate >= 20) score += 20;
  else if (record.growthRate >= 10) score += 15;
  else if (record.growthRate >= 5) score += 10;
  else if (record.growthRate > 0) score += 5;
  else if (record.growthRate < 0) score -= 10;

  return Math.max(0, Math.min(100, score));
};

// Calculate runway in months
const calculateRunway = (cashOnHand: number, monthlyExpenses: number, mrr: number): number => {
  const netBurn = monthlyExpenses - mrr;
  if (netBurn <= 0) return 999; // Profitable
  return Math.floor(cashOnHand / netBurn);
};

// Create initial mock data
const createMockRecords = (): FinancialHealth[] => {
  const now = new Date();

  const record1: FinancialHealth = {
    id: "fin-1",
    projectId: "proj-1",
    projectName: "ShipFast",
    healthScore: 0,
    mrr: 4500,
    monthlyExpenses: 2800,
    cashOnHand: 45000,
    growthRate: 15,
    runway: 0,
    metrics: [
      { id: "m-1", category: "revenue", name: "MRR", value: 4500, previousValue: 3900, unit: "currency", updatedAt: now },
      { id: "m-2", category: "revenue", name: "ARR", value: 54000, previousValue: 46800, unit: "currency", updatedAt: now },
      { id: "m-3", category: "expenses", name: "Monthly Burn", value: 2800, previousValue: 2600, unit: "currency", updatedAt: now },
      { id: "m-4", category: "expenses", name: "Server Costs", value: 450, previousValue: 400, unit: "currency", updatedAt: now },
      { id: "m-5", category: "growth", name: "MoM Growth", value: 15, previousValue: 12, unit: "percentage", updatedAt: now },
      { id: "m-6", category: "growth", name: "Churn Rate", value: 3.2, previousValue: 4.1, unit: "percentage", updatedAt: now },
    ],
    updatedAt: now,
  };
  record1.runway = calculateRunway(record1.cashOnHand, record1.monthlyExpenses, record1.mrr);
  record1.healthScore = calculateHealthScore(record1);

  const record2: FinancialHealth = {
    id: "fin-2",
    projectId: "proj-2",
    projectName: "CodeReview AI",
    healthScore: 0,
    mrr: 1200,
    monthlyExpenses: 3500,
    cashOnHand: 28000,
    growthRate: 8,
    runway: 0,
    metrics: [
      { id: "m-7", category: "revenue", name: "MRR", value: 1200, previousValue: 1100, unit: "currency", updatedAt: now },
      { id: "m-8", category: "expenses", name: "Monthly Burn", value: 3500, previousValue: 3200, unit: "currency", updatedAt: now },
      { id: "m-9", category: "growth", name: "MoM Growth", value: 8, previousValue: 5, unit: "percentage", updatedAt: now },
    ],
    updatedAt: now,
  };
  record2.runway = calculateRunway(record2.cashOnHand, record2.monthlyExpenses, record2.mrr);
  record2.healthScore = calculateHealthScore(record2);

  return [record1, record2];
};

export const useFinancialStore = create<FinancialState>((set) => ({
  healthRecords: createMockRecords(),
  selectedRecordId: null,

  selectRecord: (id) => set({ selectedRecordId: id }),

  updateMetric: (recordId, metricId, value) =>
    set((state) => ({
      healthRecords: state.healthRecords.map((r) => {
        if (r.id !== recordId) return r;
        const updatedMetrics = r.metrics.map((m) =>
          m.id === metricId ? { ...m, previousValue: m.value, value, updatedAt: new Date() } : m
        );
        const mrrMetric = updatedMetrics.find((m) => m.name === "MRR");
        const newMrr = mrrMetric?.value ?? r.mrr;
        const updated = {
          ...r,
          metrics: updatedMetrics,
          mrr: newMrr,
          updatedAt: new Date(),
        };
        updated.runway = calculateRunway(updated.cashOnHand, updated.monthlyExpenses, updated.mrr);
        updated.healthScore = calculateHealthScore(updated);
        return updated;
      }),
    })),

  addRecord: (projectId, projectName) =>
    set((state) => {
      const newRecord: FinancialHealth = {
        id: `fin-${Date.now()}`,
        projectId,
        projectName,
        healthScore: 50,
        mrr: 0,
        monthlyExpenses: 0,
        cashOnHand: 0,
        growthRate: 0,
        runway: 0,
        metrics: [],
        updatedAt: new Date(),
      };
      return { healthRecords: [...state.healthRecords, newRecord] };
    }),

  deleteRecord: (id) =>
    set((state) => ({
      healthRecords: state.healthRecords.filter((r) => r.id !== id),
      selectedRecordId: state.selectedRecordId === id ? null : state.selectedRecordId,
    })),

  updateCashOnHand: (recordId, amount) =>
    set((state) => ({
      healthRecords: state.healthRecords.map((r) => {
        if (r.id !== recordId) return r;
        const updated = { ...r, cashOnHand: amount, updatedAt: new Date() };
        updated.runway = calculateRunway(updated.cashOnHand, updated.monthlyExpenses, updated.mrr);
        updated.healthScore = calculateHealthScore(updated);
        return updated;
      }),
    })),

  updateMonthlyExpenses: (recordId, amount) =>
    set((state) => ({
      healthRecords: state.healthRecords.map((r) => {
        if (r.id !== recordId) return r;
        const updated = { ...r, monthlyExpenses: amount, updatedAt: new Date() };
        updated.runway = calculateRunway(updated.cashOnHand, updated.monthlyExpenses, updated.mrr);
        updated.healthScore = calculateHealthScore(updated);
        return updated;
      }),
    })),
}));
