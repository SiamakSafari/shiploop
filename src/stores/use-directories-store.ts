import { create } from "zustand";
import {
  DirectorySubmission,
  DirectoryName,
  SubmissionStatus,
  DIRECTORIES,
} from "@/types";

interface DirectoriesState {
  submissions: DirectorySubmission[];
  selectedSubmissionId: string | null;

  // Actions
  addSubmission: (projectId: string, projectName: string, directory: DirectoryName) => void;
  updateSubmission: (id: string, updates: Partial<DirectorySubmission>) => void;
  deleteSubmission: (id: string) => void;
  selectSubmission: (id: string | null) => void;
  toggleRequirement: (submissionId: string, requirementId: string) => void;
  updateStatus: (id: string, status: SubmissionStatus) => void;
  setSubmissionUrl: (id: string, url: string) => void;
  setListingUrl: (id: string, url: string) => void;
}

// Helper to calculate progress and status
const calculateProgressAndStatus = (
  requirements: DirectorySubmission["requirements"],
  currentStatus: SubmissionStatus
): { progress: number; status: SubmissionStatus } => {
  const completedCount = requirements.filter((r) => r.completed).length;
  const progress = Math.round((completedCount / requirements.length) * 100);

  // Only auto-update status if not already submitted/approved/live/rejected
  if (["submitted", "in_review", "approved", "live", "rejected"].includes(currentStatus)) {
    return { progress, status: currentStatus };
  }

  const status: SubmissionStatus =
    progress >= 100 ? "preparing" : progress > 0 ? "preparing" : "not_started";

  return { progress, status };
};

// Create initial mock data
const createMockSubmissions = (): DirectorySubmission[] => {
  const now = new Date();
  return [
    {
      id: "sub-1",
      directory: "product_hunt",
      projectId: "proj-1",
      projectName: "ShipFast",
      status: "live",
      progress: 100,
      requirements: DIRECTORIES.find((d) => d.name === "product_hunt")!.requirements.map((r) => ({
        ...r,
        completed: true,
      })),
      submissionUrl: "https://producthunt.com/posts/shipfast",
      listingUrl: "https://producthunt.com/products/shipfast",
      submittedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      approvedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
      createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
      updatedAt: now,
    },
    {
      id: "sub-2",
      directory: "betalist",
      projectId: "proj-1",
      projectName: "ShipFast",
      status: "in_review",
      progress: 100,
      requirements: DIRECTORIES.find((d) => d.name === "betalist")!.requirements.map((r) => ({
        ...r,
        completed: true,
      })),
      submittedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
      updatedAt: now,
    },
    {
      id: "sub-3",
      directory: "indie_hackers",
      projectId: "proj-1",
      projectName: "ShipFast",
      status: "preparing",
      progress: 60,
      requirements: DIRECTORIES.find((d) => d.name === "indie_hackers")!.requirements.map((r, i) => ({
        ...r,
        completed: i < 3,
      })),
      createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
      updatedAt: now,
    },
    {
      id: "sub-4",
      directory: "hacker_news",
      projectId: "proj-2",
      projectName: "CodeReview AI",
      status: "not_started",
      progress: 0,
      requirements: DIRECTORIES.find((d) => d.name === "hacker_news")!.requirements.map((r) => ({
        ...r,
        completed: false,
      })),
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "sub-5",
      directory: "futurepedia",
      projectId: "proj-2",
      projectName: "CodeReview AI",
      status: "submitted",
      progress: 100,
      requirements: DIRECTORIES.find((d) => d.name === "futurepedia")!.requirements.map((r) => ({
        ...r,
        completed: true,
      })),
      submittedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
      updatedAt: now,
    },
  ];
};

export const useDirectoriesStore = create<DirectoriesState>((set) => ({
  submissions: createMockSubmissions(),
  selectedSubmissionId: null,

  addSubmission: (projectId, projectName, directory) => {
    const directoryInfo = DIRECTORIES.find((d) => d.name === directory);
    if (!directoryInfo) return;

    const newSubmission: DirectorySubmission = {
      id: `sub-${Date.now()}`,
      directory,
      projectId,
      projectName,
      status: "not_started",
      progress: 0,
      requirements: directoryInfo.requirements.map((r) => ({ ...r, completed: false })),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => ({
      submissions: [...state.submissions, newSubmission],
    }));
  },

  updateSubmission: (id, updates) =>
    set((state) => ({
      submissions: state.submissions.map((s) =>
        s.id === id ? { ...s, ...updates, updatedAt: new Date() } : s
      ),
    })),

  deleteSubmission: (id) =>
    set((state) => ({
      submissions: state.submissions.filter((s) => s.id !== id),
      selectedSubmissionId: state.selectedSubmissionId === id ? null : state.selectedSubmissionId,
    })),

  selectSubmission: (id) => set({ selectedSubmissionId: id }),

  toggleRequirement: (submissionId, requirementId) =>
    set((state) => ({
      submissions: state.submissions.map((s) => {
        if (s.id !== submissionId) return s;

        const updatedRequirements = s.requirements.map((r) =>
          r.id === requirementId ? { ...r, completed: !r.completed } : r
        );

        const { progress, status } = calculateProgressAndStatus(updatedRequirements, s.status);

        return {
          ...s,
          requirements: updatedRequirements,
          progress,
          status,
          updatedAt: new Date(),
        };
      }),
    })),

  updateStatus: (id, status) =>
    set((state) => ({
      submissions: state.submissions.map((s) => {
        if (s.id !== id) return s;

        const updates: Partial<DirectorySubmission> = {
          status,
          updatedAt: new Date(),
        };

        if (status === "submitted" && !s.submittedAt) {
          updates.submittedAt = new Date();
        }
        if (status === "approved" && !s.approvedAt) {
          updates.approvedAt = new Date();
        }

        return { ...s, ...updates };
      }),
    })),

  setSubmissionUrl: (id, url) =>
    set((state) => ({
      submissions: state.submissions.map((s) =>
        s.id === id ? { ...s, submissionUrl: url, updatedAt: new Date() } : s
      ),
    })),

  setListingUrl: (id, url) =>
    set((state) => ({
      submissions: state.submissions.map((s) =>
        s.id === id ? { ...s, listingUrl: url, updatedAt: new Date() } : s
      ),
    })),
}));
