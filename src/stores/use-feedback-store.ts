import { create } from "zustand";
import {
  CustomerFeedback,
  FeedbackSource,
  FeedbackSentiment,
  FeedbackCategory,
  FeedbackStatus,
} from "@/types";

interface FeedbackState {
  feedbacks: CustomerFeedback[];
  selectedFeedbackId: string | null;

  // Actions
  selectFeedback: (id: string | null) => void;
  addFeedback: (feedback: Omit<CustomerFeedback, "id" | "createdAt" | "updatedAt">) => void;
  updateFeedback: (id: string, updates: Partial<CustomerFeedback>) => void;
  deleteFeedback: (id: string) => void;
  updateStatus: (id: string, status: FeedbackStatus) => void;
  categorize: (id: string, category: FeedbackCategory) => void;
  addTag: (id: string, tag: string) => void;
  removeTag: (id: string, tag: string) => void;
  setNotes: (id: string, notes: string) => void;
}

// Create initial mock data
const createMockFeedbacks = (): CustomerFeedback[] => {
  const now = new Date();

  return [
    {
      id: "fb-1",
      projectId: "proj-1",
      projectName: "ShipFast",
      source: "email",
      sentiment: "positive",
      category: "praise",
      status: "reviewed",
      content: "Love the new dashboard! It's so much faster now and the UI is beautiful. Keep up the great work!",
      customerName: "Sarah Chen",
      customerEmail: "sarah@example.com",
      tags: ["dashboard", "performance", "ui"],
      createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      updatedAt: now,
    },
    {
      id: "fb-2",
      projectId: "proj-1",
      projectName: "ShipFast",
      source: "twitter",
      sentiment: "neutral",
      category: "feature_request",
      status: "actionable",
      content: "Would be great if ShipFast had Slack integration. Currently copying updates manually.",
      customerName: "@devbuilder",
      tags: ["slack", "integration", "automation"],
      notes: "Added to Q2 roadmap for consideration",
      createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      updatedAt: now,
    },
    {
      id: "fb-3",
      projectId: "proj-1",
      projectName: "ShipFast",
      source: "support",
      sentiment: "negative",
      category: "bug_report",
      status: "new",
      content: "Getting 500 error when trying to export data to CSV. Happens every time I click the export button.",
      customerName: "Mike Johnson",
      customerEmail: "mike.j@company.io",
      tags: ["export", "bug", "csv"],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "fb-4",
      projectId: "proj-2",
      projectName: "CodeReview AI",
      source: "survey",
      sentiment: "positive",
      category: "praise",
      status: "reviewed",
      content: "The AI suggestions are incredibly accurate. Saved me hours of code review time this week!",
      customerName: "Alex Rivera",
      tags: ["ai", "accuracy", "time-saving"],
      createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
      updatedAt: now,
    },
    {
      id: "fb-5",
      projectId: "proj-2",
      projectName: "CodeReview AI",
      source: "chat",
      sentiment: "neutral",
      category: "question",
      status: "resolved",
      content: "How do I set up the GitHub integration? The docs mention it but I can't find the settings page.",
      customerName: "Jordan Lee",
      tags: ["github", "setup", "docs"],
      notes: "Pointed to updated docs, user confirmed working",
      createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
      updatedAt: now,
    },
    {
      id: "fb-6",
      projectId: "proj-1",
      projectName: "ShipFast",
      source: "review",
      sentiment: "positive",
      category: "praise",
      status: "new",
      content: "5 stars! Best project management tool I've used. The gamification features keep me motivated.",
      customerName: "Emma Watson",
      tags: ["gamification", "motivation", "review"],
      createdAt: now,
      updatedAt: now,
    },
  ];
};

export const useFeedbackStore = create<FeedbackState>((set) => ({
  feedbacks: createMockFeedbacks(),
  selectedFeedbackId: null,

  selectFeedback: (id) => set({ selectedFeedbackId: id }),

  addFeedback: (feedbackData) =>
    set((state) => {
      const newFeedback: CustomerFeedback = {
        ...feedbackData,
        id: `fb-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return { feedbacks: [newFeedback, ...state.feedbacks] };
    }),

  updateFeedback: (id, updates) =>
    set((state) => ({
      feedbacks: state.feedbacks.map((f) =>
        f.id === id ? { ...f, ...updates, updatedAt: new Date() } : f
      ),
    })),

  deleteFeedback: (id) =>
    set((state) => ({
      feedbacks: state.feedbacks.filter((f) => f.id !== id),
      selectedFeedbackId: state.selectedFeedbackId === id ? null : state.selectedFeedbackId,
    })),

  updateStatus: (id, status) =>
    set((state) => ({
      feedbacks: state.feedbacks.map((f) =>
        f.id === id ? { ...f, status, updatedAt: new Date() } : f
      ),
    })),

  categorize: (id, category) =>
    set((state) => ({
      feedbacks: state.feedbacks.map((f) =>
        f.id === id ? { ...f, category, updatedAt: new Date() } : f
      ),
    })),

  addTag: (id, tag) =>
    set((state) => ({
      feedbacks: state.feedbacks.map((f) =>
        f.id === id && !f.tags.includes(tag)
          ? { ...f, tags: [...f.tags, tag], updatedAt: new Date() }
          : f
      ),
    })),

  removeTag: (id, tag) =>
    set((state) => ({
      feedbacks: state.feedbacks.map((f) =>
        f.id === id
          ? { ...f, tags: f.tags.filter((t) => t !== tag), updatedAt: new Date() }
          : f
      ),
    })),

  setNotes: (id, notes) =>
    set((state) => ({
      feedbacks: state.feedbacks.map((f) =>
        f.id === id ? { ...f, notes, updatedAt: new Date() } : f
      ),
    })),
}));
