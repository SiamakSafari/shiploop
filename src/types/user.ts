export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  email: string;
  joinedAt: Date;
  shipScore: ShipScore;
  rank: GlobalRank;
  preferences: UserPreferences;
}

export interface ShipScore {
  total: number; // 0-100
  breakdown: {
    commits: number; // 0-25 points
    launches: number; // 0-25 points
    revenue: number; // 0-25 points
    growth: number; // 0-25 points
  };
  streak: StreakData;
  lastUpdated: Date;
}

export interface StreakData {
  currentStreak: number; // e.g., 47 days
  longestStreak: number;
  lastActivityDate: Date;
  isOnFire: boolean; // >= 7 days
}

export interface GlobalRank {
  position: number; // e.g., 127
  totalUsers: number; // e.g., 12,340
  percentile: number; // e.g., 12 (top 12%)
  tier: "diamond" | "gold" | "silver" | "bronze";
}

export interface UserPreferences {
  theme: "dark" | "light" | "system";
  notifications: boolean;
  publicProfile: boolean;
}
