// Re-export all types
export * from "./user";
export * from "./project";
export * from "./idea";
export * from "./analytics";
export * from "./leaderboard";

// Activity types
export type ActivityType =
  | "commit"
  | "revenue"
  | "signup"
  | "launch"
  | "milestone"
  | "idea_validated";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  projectId?: string;
  projectName?: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}
