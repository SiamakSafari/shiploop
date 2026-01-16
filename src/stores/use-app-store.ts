import { create } from "zustand";
import { User, ShipScore, ActivityItem } from "@/types";
import { mockUser, mockActivity } from "@/data";

interface AppState {
  user: User | null;
  activity: ActivityItem[];
  isLoading: boolean;

  // Actions
  setUser: (user: User) => void;
  updateShipScore: (score: Partial<ShipScore>) => void;
  incrementStreak: () => void;
  addActivity: (activity: ActivityItem) => void;
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: mockUser,
  activity: mockActivity,
  isLoading: false,

  setUser: (user) => set({ user }),

  updateShipScore: (scoreUpdate) =>
    set((state) => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          shipScore: {
            ...state.user.shipScore,
            ...scoreUpdate,
            lastUpdated: new Date(),
          },
        },
      };
    }),

  incrementStreak: () =>
    set((state) => {
      if (!state.user) return state;
      const newStreak = state.user.shipScore.streak.currentStreak + 1;
      return {
        user: {
          ...state.user,
          shipScore: {
            ...state.user.shipScore,
            streak: {
              ...state.user.shipScore.streak,
              currentStreak: newStreak,
              longestStreak: Math.max(newStreak, state.user.shipScore.streak.longestStreak),
              lastActivityDate: new Date(),
              isOnFire: newStreak >= 7,
            },
          },
        },
      };
    }),

  addActivity: (activity) =>
    set((state) => ({
      activity: [activity, ...state.activity],
    })),

  setLoading: (isLoading) => set({ isLoading }),
}));
