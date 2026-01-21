// AI Ship Coach Types

export type CoachPersonality = "drill-sergeant" | "hype-beast" | "zen-master" | "roast-master";

export type MessageTrigger =
  | "streak-started"
  | "streak-continued"
  | "streak-broken"
  | "milestone-hit"
  | "revenue-milestone"
  | "slacking"
  | "comeback"
  | "first-launch"
  | "leaderboard-climb"
  | "leaderboard-drop"
  | "daily-checkin"
  | "weekly-summary"
  | "ship-score-up"
  | "ship-score-down";

export interface CoachContext {
  userName: string;
  shipScore: number;
  currentStreak: number;
  longestStreak: number;
  isOnFire: boolean;
  totalRevenue: number;
  projectCount: number;
  launchCount: number;
  lastActiveDate: string;
  daysSinceLastActivity: number;
  leaderboardPosition: number;
  leaderboardChange: number; // positive = climbed, negative = dropped
}

export interface CoachMessage {
  id: string;
  personality: CoachPersonality;
  trigger: MessageTrigger;
  content: string;
  emoji: string;
  timestamp: Date;
  isRead: boolean;
}

export interface CoachPersonalityConfig {
  id: CoachPersonality;
  name: string;
  description: string;
  avatar: string;
  color: string;
  tone: string;
  catchphrase: string;
}

export const COACH_PERSONALITIES: Record<CoachPersonality, CoachPersonalityConfig> = {
  "drill-sergeant": {
    id: "drill-sergeant",
    name: "Sergeant Ship",
    description: "No excuses. No mercy. Only results.",
    avatar: "🎖️",
    color: "#dc2626", // red
    tone: "intense, demanding, military-style motivation",
    catchphrase: "DROP AND GIVE ME 20 COMMITS!",
  },
  "hype-beast": {
    id: "hype-beast",
    name: "Hype Hayes",
    description: "Your biggest fan. Maximum energy. Pure vibes.",
    avatar: "🔥",
    color: "#f59e0b", // amber
    tone: "extremely enthusiastic, supportive, uses lots of emojis and hype language",
    catchphrase: "LET'S GOOOOO!!! 🚀🔥",
  },
  "zen-master": {
    id: "zen-master",
    name: "Master Zen",
    description: "Calm wisdom. Balanced perspective. Inner peace.",
    avatar: "🧘",
    color: "#10b981", // emerald
    tone: "calm, philosophical, wise, focuses on the journey not destination",
    catchphrase: "The code flows like water...",
  },
  "roast-master": {
    id: "roast-master",
    name: "Roasty McRoastface",
    description: "Brutal honesty with a side of humor. Tough love.",
    avatar: "😈",
    color: "#8b5cf6", // violet
    tone: "sarcastic, witty, roasts with love, Gordon Ramsay energy",
    catchphrase: "Oh, you call THAT shipping?",
  },
};
