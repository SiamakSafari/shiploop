import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IncomeSource {
  id: string;
  name: string;
  type: "recurring" | "one-time" | "variable";
  amount: number;
  frequency?: "weekly" | "monthly" | "quarterly" | "yearly";
  nextDate?: string;
  confidence: number; // 0-100
  projectId?: string;
}

export interface Expense {
  id: string;
  name: string;
  type: "fixed" | "variable";
  amount: number;
  frequency: "monthly" | "quarterly" | "yearly";
  category: "tools" | "hosting" | "marketing" | "contractors" | "other";
  nextDate?: string;
}

export interface CashFlowForecast {
  month: string; // "2024-02"
  predictedIncome: number;
  predictedExpenses: number;
  netCashFlow: number;
  runningBalance: number;
  confidence: number;
}

export interface PulseAlert {
  id: string;
  type: "low_cash" | "missed_target" | "expense_spike" | "opportunity";
  severity: "info" | "warning" | "critical";
  title: string;
  message: string;
  date: string;
  dismissed: boolean;
}

interface PulseState {
  // Current state
  currentBalance: number;
  monthlyBurnRate: number;
  targetSavings: number;
  
  // Income sources
  incomeSources: IncomeSource[];
  
  // Expenses
  expenses: Expense[];
  
  // Forecasts (6 months)
  forecasts: CashFlowForecast[];
  
  // Alerts
  alerts: PulseAlert[];
  
  // Settings
  lowCashThreshold: number; // Alert when balance drops below this
  forecastMonths: number;
  
  // Actions
  setCurrentBalance: (balance: number) => void;
  setMonthlyBurnRate: (rate: number) => void;
  setTargetSavings: (target: number) => void;
  setLowCashThreshold: (threshold: number) => void;
  
  addIncomeSource: (source: Omit<IncomeSource, "id">) => void;
  updateIncomeSource: (id: string, updates: Partial<IncomeSource>) => void;
  removeIncomeSource: (id: string) => void;
  
  addExpense: (expense: Omit<Expense, "id">) => void;
  updateExpense: (id: string, updates: Partial<Expense>) => void;
  removeExpense: (id: string) => void;
  
  dismissAlert: (id: string) => void;
  
  recalculateForecasts: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

// Calculate forecasts based on income and expenses
const calculateForecasts = (
  currentBalance: number,
  incomeSources: IncomeSource[],
  expenses: Expense[],
  months: number
): CashFlowForecast[] => {
  const forecasts: CashFlowForecast[] = [];
  let runningBalance = currentBalance;
  
  const now = new Date();
  
  for (let i = 0; i < months; i++) {
    const forecastDate = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const monthKey = forecastDate.toISOString().slice(0, 7);
    
    // Calculate monthly income
    let monthlyIncome = 0;
    let incomeConfidence = 100;
    
    incomeSources.forEach((source) => {
      if (source.type === "recurring") {
        if (source.frequency === "monthly") {
          monthlyIncome += source.amount;
        } else if (source.frequency === "weekly") {
          monthlyIncome += source.amount * 4;
        } else if (source.frequency === "quarterly" && i % 3 === 0) {
          monthlyIncome += source.amount;
        } else if (source.frequency === "yearly" && i === 0) {
          monthlyIncome += source.amount;
        }
      } else if (source.type === "variable") {
        // Reduce confidence for variable income
        monthlyIncome += source.amount * (source.confidence / 100);
        incomeConfidence = Math.min(incomeConfidence, source.confidence);
      } else if (source.type === "one-time" && i === 0) {
        monthlyIncome += source.amount;
      }
    });
    
    // Calculate monthly expenses
    let monthlyExpenses = 0;
    
    expenses.forEach((expense) => {
      if (expense.frequency === "monthly") {
        monthlyExpenses += expense.amount;
      } else if (expense.frequency === "quarterly" && i % 3 === 0) {
        monthlyExpenses += expense.amount;
      } else if (expense.frequency === "yearly" && i === 0) {
        monthlyExpenses += expense.amount;
      }
    });
    
    const netCashFlow = monthlyIncome - monthlyExpenses;
    runningBalance += netCashFlow;
    
    // Confidence decreases further into the future
    const timeDecay = Math.max(50, 100 - (i * 8));
    const finalConfidence = Math.round((incomeConfidence * timeDecay) / 100);
    
    forecasts.push({
      month: monthKey,
      predictedIncome: Math.round(monthlyIncome),
      predictedExpenses: Math.round(monthlyExpenses),
      netCashFlow: Math.round(netCashFlow),
      runningBalance: Math.round(runningBalance),
      confidence: finalConfidence,
    });
  }
  
  return forecasts;
};

// Generate alerts based on forecasts
const generateAlerts = (
  forecasts: CashFlowForecast[],
  lowCashThreshold: number,
  currentBalance: number
): PulseAlert[] => {
  const alerts: PulseAlert[] = [];
  
  forecasts.forEach((forecast, index) => {
    // Low cash warning
    if (forecast.runningBalance < lowCashThreshold) {
      const monthName = new Date(forecast.month + "-01").toLocaleDateString("en-US", { month: "long", year: "numeric" });
      alerts.push({
        id: generateId(),
        type: "low_cash",
        severity: forecast.runningBalance < 0 ? "critical" : "warning",
        title: forecast.runningBalance < 0 ? "Negative Balance Predicted" : "Low Cash Warning",
        message: `Your balance is predicted to drop to $${forecast.runningBalance.toLocaleString()} in ${monthName}.`,
        date: forecast.month,
        dismissed: false,
      });
    }
    
    // Expense spike (if expenses are 50% higher than previous month)
    if (index > 0 && forecast.predictedExpenses > forecasts[index - 1].predictedExpenses * 1.5) {
      const monthName = new Date(forecast.month + "-01").toLocaleDateString("en-US", { month: "long" });
      alerts.push({
        id: generateId(),
        type: "expense_spike",
        severity: "info",
        title: "Expense Spike Detected",
        message: `Expenses in ${monthName} are higher than usual. Consider reviewing your spending.`,
        date: forecast.month,
        dismissed: false,
      });
    }
  });
  
  // Opportunity: If consistently positive cash flow
  const avgCashFlow = forecasts.reduce((sum, f) => sum + f.netCashFlow, 0) / forecasts.length;
  if (avgCashFlow > 1000) {
    alerts.push({
      id: generateId(),
      type: "opportunity",
      severity: "info",
      title: "Savings Opportunity",
      message: `You're averaging $${Math.round(avgCashFlow).toLocaleString()}/month positive cash flow. Consider increasing your runway buffer.`,
      date: new Date().toISOString().slice(0, 7),
      dismissed: false,
    });
  }
  
  return alerts;
};

// Initial mock data
const mockIncomeSources: IncomeSource[] = [
  {
    id: "inc-1",
    name: "SaaS MRR",
    type: "recurring",
    amount: 2400,
    frequency: "monthly",
    confidence: 90,
  },
  {
    id: "inc-2",
    name: "Consulting",
    type: "variable",
    amount: 3000,
    frequency: "monthly",
    confidence: 60,
  },
  {
    id: "inc-3",
    name: "Affiliate Revenue",
    type: "recurring",
    amount: 400,
    frequency: "monthly",
    confidence: 75,
  },
];

const mockExpenses: Expense[] = [
  {
    id: "exp-1",
    name: "Hosting & Infrastructure",
    type: "fixed",
    amount: 250,
    frequency: "monthly",
    category: "hosting",
  },
  {
    id: "exp-2",
    name: "Tools & Subscriptions",
    type: "fixed",
    amount: 180,
    frequency: "monthly",
    category: "tools",
  },
  {
    id: "exp-3",
    name: "Marketing",
    type: "variable",
    amount: 500,
    frequency: "monthly",
    category: "marketing",
  },
];

export const usePulseStore = create<PulseState>()(
  persist(
    (set, get) => ({
      currentBalance: 15000,
      monthlyBurnRate: 930,
      targetSavings: 10000,
      incomeSources: mockIncomeSources,
      expenses: mockExpenses,
      forecasts: [],
      alerts: [],
      lowCashThreshold: 5000,
      forecastMonths: 6,
      
      setCurrentBalance: (balance) => {
        set({ currentBalance: balance });
        get().recalculateForecasts();
      },
      
      setMonthlyBurnRate: (rate) => set({ monthlyBurnRate: rate }),
      
      setTargetSavings: (target) => set({ targetSavings: target }),
      
      setLowCashThreshold: (threshold) => {
        set({ lowCashThreshold: threshold });
        get().recalculateForecasts();
      },
      
      addIncomeSource: (source) => {
        set((state) => ({
          incomeSources: [...state.incomeSources, { ...source, id: generateId() }],
        }));
        get().recalculateForecasts();
      },
      
      updateIncomeSource: (id, updates) => {
        set((state) => ({
          incomeSources: state.incomeSources.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        }));
        get().recalculateForecasts();
      },
      
      removeIncomeSource: (id) => {
        set((state) => ({
          incomeSources: state.incomeSources.filter((s) => s.id !== id),
        }));
        get().recalculateForecasts();
      },
      
      addExpense: (expense) => {
        set((state) => ({
          expenses: [...state.expenses, { ...expense, id: generateId() }],
        }));
        get().recalculateForecasts();
      },
      
      updateExpense: (id, updates) => {
        set((state) => ({
          expenses: state.expenses.map((e) =>
            e.id === id ? { ...e, ...updates } : e
          ),
        }));
        get().recalculateForecasts();
      },
      
      removeExpense: (id) => {
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        }));
        get().recalculateForecasts();
      },
      
      dismissAlert: (id) => {
        set((state) => ({
          alerts: state.alerts.map((a) =>
            a.id === id ? { ...a, dismissed: true } : a
          ),
        }));
      },
      
      recalculateForecasts: () => {
        const state = get();
        const forecasts = calculateForecasts(
          state.currentBalance,
          state.incomeSources,
          state.expenses,
          state.forecastMonths
        );
        const alerts = generateAlerts(forecasts, state.lowCashThreshold, state.currentBalance);
        set({ forecasts, alerts });
      },
    }),
    {
      name: "shiploop-pulse",
      onRehydrateStorage: () => (state) => {
        // Recalculate forecasts on load
        state?.recalculateForecasts();
      },
    }
  )
);
