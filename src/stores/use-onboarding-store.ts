import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OnboardingState {
  hasCompletedOnboarding: boolean;
  hasSeenWelcome: boolean;
  completedSteps: string[];

  // Actions
  completeOnboarding: () => void;
  markWelcomeSeen: () => void;
  completeStep: (stepId: string) => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      hasSeenWelcome: false,
      completedSteps: [],

      completeOnboarding: () =>
        set({
          hasCompletedOnboarding: true,
          hasSeenWelcome: true,
        }),

      markWelcomeSeen: () =>
        set({
          hasSeenWelcome: true,
        }),

      completeStep: (stepId) =>
        set((state) => ({
          completedSteps: state.completedSteps.includes(stepId)
            ? state.completedSteps
            : [...state.completedSteps, stepId],
        })),

      resetOnboarding: () =>
        set({
          hasCompletedOnboarding: false,
          hasSeenWelcome: false,
          completedSteps: [],
        }),
    }),
    {
      name: "shiploop-onboarding",
    }
  )
);
