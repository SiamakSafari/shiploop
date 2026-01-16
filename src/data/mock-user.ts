import { User, ShipScore, GlobalRank } from "@/types";

export const mockShipScore: ShipScore = {
  total: 84,
  breakdown: {
    commits: 23,
    launches: 19,
    revenue: 22,
    growth: 20,
  },
  streak: {
    currentStreak: 47,
    longestStreak: 52,
    lastActivityDate: new Date(),
    isOnFire: true,
  },
  lastUpdated: new Date(),
};

export const mockRank: GlobalRank = {
  position: 127,
  totalUsers: 12340,
  percentile: 12,
  tier: "gold",
};

export const mockUser: User = {
  id: "usr_1",
  name: "Alex Builder",
  username: "alexbuilder",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
  email: "alex@example.com",
  joinedAt: new Date("2024-06-15"),
  shipScore: mockShipScore,
  rank: mockRank,
  preferences: {
    theme: "dark",
    notifications: true,
    publicProfile: true,
  },
};
