import { create } from "zustand";
import { PricingExperiment, PriceVariant, ExperimentStatus } from "@/types";

interface PricingState {
  experiments: PricingExperiment[];
  selectedExperimentId: string | null;

  // Actions
  selectExperiment: (id: string | null) => void;
  createExperiment: (experiment: Omit<PricingExperiment, "id" | "createdAt" | "updatedAt">) => void;
  updateExperiment: (id: string, updates: Partial<PricingExperiment>) => void;
  deleteExperiment: (id: string) => void;
  addVariant: (experimentId: string, variant: Omit<PriceVariant, "id">) => void;
  updateVariant: (experimentId: string, variantId: string, updates: Partial<PriceVariant>) => void;
  recordConversion: (experimentId: string, variantId: string, revenue: number) => void;
  declareWinner: (experimentId: string, variantId: string) => void;
  startExperiment: (id: string) => void;
  pauseExperiment: (id: string) => void;
}

// Calculate conversion rate
const getConversionRate = (variant: PriceVariant): number => {
  if (variant.visitors === 0) return 0;
  return (variant.conversions / variant.visitors) * 100;
};

// Create initial mock data
const createMockExperiments = (): PricingExperiment[] => {
  const now = new Date();
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  return [
    {
      id: "exp-1",
      projectId: "proj-1",
      projectName: "ShipFast",
      name: "Pro Tier Pricing Test",
      description: "Testing $29 vs $39 for the Pro tier to find optimal price point",
      status: "running",
      variants: [
        {
          id: "var-1",
          name: "Control ($29)",
          price: 29,
          features: ["All features", "Email support", "API access"],
          visitors: 1250,
          conversions: 87,
          revenue: 2523,
        },
        {
          id: "var-2",
          name: "Variant A ($39)",
          price: 39,
          features: ["All features", "Priority support", "API access", "Custom domain"],
          visitors: 1180,
          conversions: 71,
          revenue: 2769,
        },
      ],
      startDate: twoWeeksAgo,
      minimumSampleSize: 1000,
      confidenceLevel: 0.95,
      createdAt: twoWeeksAgo,
      updatedAt: now,
    },
    {
      id: "exp-2",
      projectId: "proj-1",
      projectName: "ShipFast",
      name: "Annual Discount Test",
      description: "Testing 20% vs 30% annual discount",
      status: "completed",
      variants: [
        {
          id: "var-3",
          name: "20% Discount",
          price: 278,
          visitors: 850,
          conversions: 42,
          revenue: 11676,
        },
        {
          id: "var-4",
          name: "30% Discount",
          price: 244,
          visitors: 820,
          conversions: 58,
          revenue: 14152,
        },
      ],
      startDate: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      endDate: oneWeekAgo,
      winningVariantId: "var-4",
      minimumSampleSize: 500,
      confidenceLevel: 0.95,
      createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      updatedAt: oneWeekAgo,
    },
    {
      id: "exp-3",
      projectId: "proj-2",
      projectName: "CodeReview AI",
      name: "Free Trial Length",
      description: "7-day vs 14-day free trial conversion",
      status: "draft",
      variants: [
        {
          id: "var-5",
          name: "7-Day Trial",
          price: 0,
          visitors: 0,
          conversions: 0,
          revenue: 0,
        },
        {
          id: "var-6",
          name: "14-Day Trial",
          price: 0,
          visitors: 0,
          conversions: 0,
          revenue: 0,
        },
      ],
      minimumSampleSize: 500,
      confidenceLevel: 0.95,
      createdAt: now,
      updatedAt: now,
    },
  ];
};

export const usePricingStore = create<PricingState>((set) => ({
  experiments: createMockExperiments(),
  selectedExperimentId: null,

  selectExperiment: (id) => set({ selectedExperimentId: id }),

  createExperiment: (experimentData) =>
    set((state) => {
      const newExperiment: PricingExperiment = {
        ...experimentData,
        id: `exp-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return { experiments: [...state.experiments, newExperiment] };
    }),

  updateExperiment: (id, updates) =>
    set((state) => ({
      experiments: state.experiments.map((e) =>
        e.id === id ? { ...e, ...updates, updatedAt: new Date() } : e
      ),
    })),

  deleteExperiment: (id) =>
    set((state) => ({
      experiments: state.experiments.filter((e) => e.id !== id),
      selectedExperimentId: state.selectedExperimentId === id ? null : state.selectedExperimentId,
    })),

  addVariant: (experimentId, variantData) =>
    set((state) => ({
      experiments: state.experiments.map((e) => {
        if (e.id !== experimentId) return e;
        const newVariant: PriceVariant = {
          ...variantData,
          id: `var-${Date.now()}`,
        };
        return { ...e, variants: [...e.variants, newVariant], updatedAt: new Date() };
      }),
    })),

  updateVariant: (experimentId, variantId, updates) =>
    set((state) => ({
      experiments: state.experiments.map((e) => {
        if (e.id !== experimentId) return e;
        return {
          ...e,
          variants: e.variants.map((v) => (v.id === variantId ? { ...v, ...updates } : v)),
          updatedAt: new Date(),
        };
      }),
    })),

  recordConversion: (experimentId, variantId, revenue) =>
    set((state) => ({
      experiments: state.experiments.map((e) => {
        if (e.id !== experimentId) return e;
        return {
          ...e,
          variants: e.variants.map((v) =>
            v.id === variantId
              ? { ...v, conversions: v.conversions + 1, revenue: v.revenue + revenue }
              : v
          ),
          updatedAt: new Date(),
        };
      }),
    })),

  declareWinner: (experimentId, variantId) =>
    set((state) => ({
      experiments: state.experiments.map((e) =>
        e.id === experimentId
          ? {
              ...e,
              winningVariantId: variantId,
              status: "winner_declared" as ExperimentStatus,
              endDate: new Date(),
              updatedAt: new Date(),
            }
          : e
      ),
    })),

  startExperiment: (id) =>
    set((state) => ({
      experiments: state.experiments.map((e) =>
        e.id === id
          ? { ...e, status: "running" as ExperimentStatus, startDate: new Date(), updatedAt: new Date() }
          : e
      ),
    })),

  pauseExperiment: (id) =>
    set((state) => ({
      experiments: state.experiments.map((e) =>
        e.id === id ? { ...e, status: "paused" as ExperimentStatus, updatedAt: new Date() } : e
      ),
    })),
}));
