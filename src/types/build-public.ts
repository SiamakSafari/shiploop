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
  twitter: { icon: "🐦", label: "Twitter/X", charLimit: 280 },
  linkedin: { icon: "💼", label: "LinkedIn", charLimit: 3000 },
  indiehackers: { icon: "🚀", label: "Indie Hackers", charLimit: 5000 },
  reddit: { icon: "🤖", label: "Reddit", charLimit: 10000 },
  blog: { icon: "📝", label: "Blog Post", charLimit: 50000 },
};

export const POST_TYPE_CONFIG: Record<PostType, { icon: string; label: string; template: string }> = {
  milestone: { icon: "🎯", label: "Milestone", template: "Just hit [X]! Here's what I learned..." },
  lesson: { icon: "💡", label: "Lesson Learned", template: "Today I learned that..." },
  metrics: { icon: "📊", label: "Metrics Update", template: "Monthly update: MRR $X, Users Y..." },
  behind_scenes: { icon: "🎬", label: "Behind the Scenes", template: "Here's what building [X] looks like..." },
  question: { icon: "❓", label: "Question", template: "Fellow builders, how do you handle [X]?" },
};

export const POST_STATUS_CONFIG: Record<PostStatus, { icon: string; label: string; color: string }> = {
  draft: { icon: "📝", label: "Draft", color: "text-slate-600 dark:text-slate-400" },
  scheduled: { icon: "📅", label: "Scheduled", color: "text-blue-600 dark:text-blue-400" },
  published: { icon: "✅", label: "Published", color: "text-emerald-600 dark:text-emerald-400" },
  failed: { icon: "❌", label: "Failed", color: "text-red-600 dark:text-red-400" },
};
