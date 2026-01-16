export type ProjectStatus = "idea" | "validating" | "building" | "live" | "paused";

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
  metrics: ProjectMetrics;
  milestones: Milestone[];
  launchPlatforms: LaunchPlatformStatus[];
}

export interface ProjectMetrics {
  mrr: number;
  users: number;
  growth: number; // percentage
  velocity: number; // commits per week
  lastCommitAt?: Date;
}

export interface Milestone {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  completedAt?: Date;
  order: number;
}

export interface LaunchPlatformStatus {
  platform: LaunchPlatform;
  status: "not_started" | "in_progress" | "ready" | "launched";
  progress: number; // 0-100
  checklist: ChecklistItem[];
  launchDate?: Date;
}

export type LaunchPlatform =
  | "product_hunt"
  | "indie_hackers"
  | "hacker_news"
  | "reddit"
  | "twitter";

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  required: boolean;
}
