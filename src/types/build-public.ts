// Build in Public Posting Drafts Types

export type PostPlatform = "twitter" | "linkedin" | "indiehackers" | "reddit" | "blog";
export type PostStatus = "draft" | "scheduled" | "published" | "failed";
export type PostType = "milestone" | "lesson" | "metrics" | "behind_scenes" | "question";

export interface PublicPost {
  id: string;
  projectId: string;
  projectName: string;
  platform: PostPlatform;
  type: PostType;
  status: PostStatus;
  title?: string;
  content: string;
  scheduledFor?: Date;
  publishedAt?: Date;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const PLATFORM_CONFIG: Record<PostPlatform, { icon: string; label: string; charLimit: number }> = {
  twitter: { icon: "twitter", label: "Twitter/X", charLimit: 280 },
  linkedin: { icon: "briefcase", label: "LinkedIn", charLimit: 3000 },
  indiehackers: { icon: "rocket", label: "Indie Hackers", charLimit: 5000 },
  reddit: { icon: "bot", label: "Reddit", charLimit: 10000 },
  blog: { icon: "file-text", label: "Blog Post", charLimit: 50000 },
};

export const POST_TYPE_CONFIG: Record<PostType, { icon: string; label: string; template: string }> = {
  milestone: { icon: "target", label: "Milestone", template: "Just hit [X]! Here's what I learned..." },
  lesson: { icon: "lightbulb", label: "Lesson Learned", template: "Today I learned that..." },
  metrics: { icon: "bar-chart", label: "Metrics Update", template: "Monthly update: MRR $X, Users Y..." },
  behind_scenes: { icon: "clapperboard", label: "Behind the Scenes", template: "Here's what building [X] looks like..." },
  question: { icon: "help-circle", label: "Question", template: "Fellow builders, how do you handle [X]?" },
};

export const POST_STATUS_CONFIG: Record<PostStatus, { icon: string; label: string; color: string }> = {
  draft: { icon: "file-text", label: "Draft", color: "text-slate-600 dark:text-slate-400" },
  scheduled: { icon: "calendar", label: "Scheduled", color: "text-blue-600 dark:text-blue-400" },
  published: { icon: "check-circle", label: "Published", color: "text-emerald-600 dark:text-emerald-400" },
  failed: { icon: "x-circle", label: "Failed", color: "text-red-600 dark:text-red-400" },
};
