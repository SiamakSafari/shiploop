import { create } from "zustand";
import { PublicPost, PostPlatform, PostStatus, PostType } from "@/types";

interface BuildPublicState {
  posts: PublicPost[];
  selectedPostId: string | null;

  // Actions
  selectPost: (id: string | null) => void;
  createDraft: (post: Omit<PublicPost, "id" | "createdAt" | "updatedAt" | "status">) => void;
  updatePost: (id: string, updates: Partial<PublicPost>) => void;
  deletePost: (id: string) => void;
  schedulePost: (id: string, scheduledFor: Date) => void;
  markPublished: (id: string) => void;
  markFailed: (id: string) => void;
  trackEngagement: (id: string, engagement: { likes: number; comments: number; shares: number }) => void;
  addTag: (id: string, tag: string) => void;
  removeTag: (id: string, tag: string) => void;
}

// Create initial mock data
const createMockPosts = (): PublicPost[] => {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  return [
    {
      id: "post-1",
      projectId: "proj-1",
      projectName: "ShipFast",
      platform: "twitter",
      type: "milestone",
      status: "published",
      content: "Just hit $5K MRR with ShipFast! Here's what worked:\n\n1. Focus on one core feature\n2. Ship fast, iterate faster\n3. Listen to early users\n\nWhat's your #1 tip for reaching this milestone?",
      publishedAt: twoDaysAgo,
      engagement: { likes: 142, comments: 23, shares: 18 },
      tags: ["mrr", "milestone", "indiehacker"],
      createdAt: twoDaysAgo,
      updatedAt: twoDaysAgo,
    },
    {
      id: "post-2",
      projectId: "proj-1",
      projectName: "ShipFast",
      platform: "linkedin",
      type: "lesson",
      status: "scheduled",
      title: "Why I Stopped Chasing Perfect Code",
      content: "3 months ago, I spent 2 weeks refactoring code that users never saw.\n\nToday, I ship features in hours and fix issues as they come.\n\nThe lesson? Perfect is the enemy of shipped.\n\nIndie hackers, what's your take on technical debt vs. speed?",
      scheduledFor: tomorrow,
      tags: ["lessons", "shipping", "productivity"],
      createdAt: yesterday,
      updatedAt: now,
    },
    {
      id: "post-3",
      projectId: "proj-1",
      projectName: "ShipFast",
      platform: "twitter",
      type: "metrics",
      status: "draft",
      content: "Monthly update for ShipFast:\n\n- MRR: $4,500 (+15%)\n- Users: 312 (+28)\n- Churn: 3.2% (-0.9%)\n\nBiggest win: New onboarding flow increased activation by 40%\n\nBiggest challenge: Still figuring out enterprise pricing",
      tags: ["metrics", "transparency", "buildinpublic"],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "post-4",
      projectId: "proj-2",
      projectName: "CodeReview AI",
      platform: "indiehackers",
      type: "behind_scenes",
      status: "draft",
      title: "Building an AI Code Review Tool: Week 8",
      content: "This week I tackled the hardest part yet: making the AI understand context across multiple files.\n\nThe problem: AI was giving advice based on single files, missing the bigger picture.\n\nThe solution: Built a context window that pulls in related files and recent changes.\n\nResult: 40% more relevant suggestions!\n\nAnyone else building AI dev tools? Would love to exchange notes.",
      tags: ["ai", "devtools", "buildinpublic"],
      createdAt: yesterday,
      updatedAt: now,
    },
    {
      id: "post-5",
      projectId: "proj-1",
      projectName: "ShipFast",
      platform: "reddit",
      type: "question",
      status: "published",
      title: "How do you handle pricing for international customers?",
      content: "Building a SaaS and getting customers from all over the world. Wondering how other indie hackers handle:\n\n1. Currency conversion - do you show local prices?\n2. Purchasing power parity - offer lower prices in certain regions?\n3. Payment methods - Stripe covers most, but what about regions it doesn't?\n\nWould appreciate any insights from your experience!",
      publishedAt: yesterday,
      engagement: { likes: 45, comments: 32, shares: 5 },
      tags: ["pricing", "international", "saas"],
      createdAt: yesterday,
      updatedAt: yesterday,
    },
  ];
};

export const useBuildPublicStore = create<BuildPublicState>((set) => ({
  posts: createMockPosts(),
  selectedPostId: null,

  selectPost: (id) => set({ selectedPostId: id }),

  createDraft: (postData) =>
    set((state) => {
      const newPost: PublicPost = {
        ...postData,
        id: `post-${Date.now()}`,
        status: "draft",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return { posts: [newPost, ...state.posts] };
    }),

  updatePost: (id, updates) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
      ),
    })),

  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== id),
      selectedPostId: state.selectedPostId === id ? null : state.selectedPostId,
    })),

  schedulePost: (id, scheduledFor) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === id
          ? { ...p, status: "scheduled" as PostStatus, scheduledFor, updatedAt: new Date() }
          : p
      ),
    })),

  markPublished: (id) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === id
          ? { ...p, status: "published" as PostStatus, publishedAt: new Date(), updatedAt: new Date() }
          : p
      ),
    })),

  markFailed: (id) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === id ? { ...p, status: "failed" as PostStatus, updatedAt: new Date() } : p
      ),
    })),

  trackEngagement: (id, engagement) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === id ? { ...p, engagement, updatedAt: new Date() } : p
      ),
    })),

  addTag: (id, tag) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === id && !p.tags.includes(tag)
          ? { ...p, tags: [...p.tags, tag], updatedAt: new Date() }
          : p
      ),
    })),

  removeTag: (id, tag) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === id
          ? { ...p, tags: p.tags.filter((t) => t !== tag), updatedAt: new Date() }
          : p
      ),
    })),
}));
