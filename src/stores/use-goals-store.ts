import { create } from "zustand";
import { SMARTGoal, GoalStatus, GoalMilestone, AccountabilityCheckIn } from "@/types";

interface GoalsState {
  goals: SMARTGoal[];
  selectedGoalId: string | null;

  // Actions
  selectGoal: (id: string | null) => void;
  addGoal: (goal: Omit<SMARTGoal, "id" | "createdAt" | "updatedAt" | "progress" | "status">) => void;
  updateGoal: (id: string, updates: Partial<SMARTGoal>) => void;
  deleteGoal: (id: string) => void;
  updateProgress: (id: string, current: number) => void;
  addCheckIn: (goalId: string, checkIn: Omit<AccountabilityCheckIn, "id" | "date">) => void;
  completeMilestone: (goalId: string, milestoneId: string) => void;
}

// Calculate progress percentage
const calculateProgress = (current: number, target: number): number => {
  if (target === 0) return 0;
  return Math.min(100, Math.round((current / target) * 100));
};

// Calculate status based on progress and timeline
const calculateStatus = (goal: SMARTGoal): GoalStatus => {
  const now = new Date();
  const dueDate = new Date(goal.timeBound.dueDate);
  const startDate = new Date(goal.timeBound.startDate);

  if (goal.progress >= 100) return "completed";
  if (now > dueDate) return "failed";

  const totalDuration = dueDate.getTime() - startDate.getTime();
  const elapsed = now.getTime() - startDate.getTime();
  const expectedProgress = (elapsed / totalDuration) * 100;

  if (goal.progress >= expectedProgress - 10) return "on_track";
  if (goal.progress >= expectedProgress - 25) return "at_risk";
  return "active";
};

// Create initial mock data
const createMockGoals = (): SMARTGoal[] => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysFromNow = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
  const ninetyDaysFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);

  return [
    {
      id: "goal-1",
      projectId: "proj-1",
      projectName: "ShipFast",
      title: "Reach $10K MRR",
      description: "Scale recurring revenue to $10,000 per month",
      specific: "Increase MRR from current $4,500 to $10,000 through marketing and product improvements",
      measurable: { target: 10000, current: 4500, unit: "USD" },
      achievable: "Based on current 15% growth rate and planned marketing campaigns",
      relevant: "Achieving profitability and sustainable growth for the business",
      timeBound: { startDate: thirtyDaysAgo, dueDate: ninetyDaysFromNow },
      status: "on_track",
      progress: 45,
      milestones: [
        { id: "ms-1", label: "$5K MRR", targetValue: 5000, completed: false },
        { id: "ms-2", label: "$7.5K MRR", targetValue: 7500, completed: false },
        { id: "ms-3", label: "$10K MRR", targetValue: 10000, completed: false },
      ],
      checkIns: [
        {
          id: "ci-1",
          date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
          progressNote: "Added new pricing tier, seeing good conversion",
          blockers: "Need more traffic to landing page",
          nextSteps: "Launch email campaign next week",
        },
      ],
      createdAt: thirtyDaysAgo,
      updatedAt: now,
    },
    {
      id: "goal-2",
      projectId: "proj-1",
      projectName: "ShipFast",
      title: "Launch on Product Hunt",
      description: "Successfully launch on Product Hunt and reach top 5",
      specific: "Prepare and execute a Product Hunt launch to gain visibility",
      measurable: { target: 5, current: 0, unit: "ranking" },
      achievable: "Product is ready, community is engaged",
      relevant: "Major visibility boost for user acquisition",
      timeBound: { startDate: now, dueDate: sixtyDaysFromNow },
      status: "active",
      progress: 20,
      milestones: [
        { id: "ms-4", label: "Prep materials", targetValue: 25, completed: true, completedAt: now },
        { id: "ms-5", label: "Build hunter network", targetValue: 50, completed: false },
        { id: "ms-6", label: "Schedule launch", targetValue: 75, completed: false },
        { id: "ms-7", label: "Launch day", targetValue: 100, completed: false },
      ],
      checkIns: [],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "goal-3",
      projectId: "proj-2",
      projectName: "CodeReview AI",
      title: "100 Beta Users",
      description: "Onboard 100 active beta users for feedback",
      specific: "Recruit and onboard 100 developers to test the AI code review tool",
      measurable: { target: 100, current: 67, unit: "users" },
      achievable: "Current waitlist has 500+ signups",
      relevant: "Need feedback to improve product before public launch",
      timeBound: { startDate: thirtyDaysAgo, dueDate: sixtyDaysFromNow },
      status: "on_track",
      progress: 67,
      milestones: [
        { id: "ms-8", label: "25 users", targetValue: 25, completed: true, completedAt: thirtyDaysAgo },
        { id: "ms-9", label: "50 users", targetValue: 50, completed: true, completedAt: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000) },
        { id: "ms-10", label: "75 users", targetValue: 75, completed: false },
        { id: "ms-11", label: "100 users", targetValue: 100, completed: false },
      ],
      checkIns: [
        {
          id: "ci-2",
          date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
          progressNote: "Onboarded 12 new users this week",
          nextSteps: "Send personalized outreach to waitlist",
        },
      ],
      createdAt: thirtyDaysAgo,
      updatedAt: now,
    },
  ];
};

export const useGoalsStore = create<GoalsState>((set) => ({
  goals: createMockGoals(),
  selectedGoalId: null,

  selectGoal: (id) => set({ selectedGoalId: id }),

  addGoal: (goalData) =>
    set((state) => {
      const newGoal: SMARTGoal = {
        ...goalData,
        id: `goal-${Date.now()}`,
        progress: calculateProgress(goalData.measurable.current, goalData.measurable.target),
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      newGoal.status = calculateStatus(newGoal);
      return { goals: [...state.goals, newGoal] };
    }),

  updateGoal: (id, updates) =>
    set((state) => ({
      goals: state.goals.map((g) => {
        if (g.id !== id) return g;
        const updated = { ...g, ...updates, updatedAt: new Date() };
        if (updates.measurable) {
          updated.progress = calculateProgress(updates.measurable.current, updates.measurable.target);
        }
        updated.status = calculateStatus(updated);
        return updated;
      }),
    })),

  deleteGoal: (id) =>
    set((state) => ({
      goals: state.goals.filter((g) => g.id !== id),
      selectedGoalId: state.selectedGoalId === id ? null : state.selectedGoalId,
    })),

  updateProgress: (id, current) =>
    set((state) => ({
      goals: state.goals.map((g) => {
        if (g.id !== id) return g;
        const updated = {
          ...g,
          measurable: { ...g.measurable, current },
          progress: calculateProgress(current, g.measurable.target),
          updatedAt: new Date(),
        };
        updated.status = calculateStatus(updated);
        return updated;
      }),
    })),

  addCheckIn: (goalId, checkInData) =>
    set((state) => ({
      goals: state.goals.map((g) => {
        if (g.id !== goalId) return g;
        const newCheckIn: AccountabilityCheckIn = {
          ...checkInData,
          id: `ci-${Date.now()}`,
          date: new Date(),
        };
        return {
          ...g,
          checkIns: [...g.checkIns, newCheckIn],
          updatedAt: new Date(),
        };
      }),
    })),

  completeMilestone: (goalId, milestoneId) =>
    set((state) => ({
      goals: state.goals.map((g) => {
        if (g.id !== goalId) return g;
        return {
          ...g,
          milestones: g.milestones.map((m) =>
            m.id === milestoneId ? { ...m, completed: true, completedAt: new Date() } : m
          ),
          updatedAt: new Date(),
        };
      }),
    })),
}));
