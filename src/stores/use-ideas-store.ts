import { create } from "zustand";
import { Idea, IdeaScores, ValidationStatus } from "@/types";
import { mockIdeas } from "@/data";

interface IdeasState {
  ideas: Idea[];
  selectedIdeaId: string | null;

  // Actions
  setIdeas: (ideas: Idea[]) => void;
  addIdea: (idea: Omit<Idea, "id" | "createdAt" | "updatedAt">) => void;
  updateIdea: (id: string, updates: Partial<Idea>) => void;
  deleteIdea: (id: string) => void;
  selectIdea: (id: string | null) => void;
  validateIdea: (id: string) => void;
  convertToProject: (ideaId: string, projectId: string) => void;
}

// Simulate idea validation scoring
function generateScores(): IdeaScores {
  const demand = Math.floor(Math.random() * 40) + 50; // 50-90
  const competition = Math.floor(Math.random() * 60) + 20; // 20-80
  const feasibility = Math.floor(Math.random() * 30) + 60; // 60-90
  const overall = Math.round((demand + (100 - competition) + feasibility) / 3);
  return { demand, competition, feasibility, overall };
}

function getStatusFromScore(overall: number): ValidationStatus {
  if (overall >= 75) return "validated";
  if (overall >= 60) return "needs_research";
  return "rejected";
}

export const useIdeasStore = create<IdeasState>((set) => ({
  ideas: mockIdeas,
  selectedIdeaId: null,

  setIdeas: (ideas) => set({ ideas }),

  addIdea: (ideaData) =>
    set((state) => {
      const scores = generateScores();
      const newIdea: Idea = {
        ...ideaData,
        id: `idea_${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        scores,
        status: getStatusFromScore(scores.overall),
      };
      return { ideas: [newIdea, ...state.ideas] };
    }),

  updateIdea: (id, updates) =>
    set((state) => ({
      ideas: state.ideas.map((idea) =>
        idea.id === id ? { ...idea, ...updates, updatedAt: new Date() } : idea
      ),
    })),

  deleteIdea: (id) =>
    set((state) => ({
      ideas: state.ideas.filter((idea) => idea.id !== id),
      selectedIdeaId: state.selectedIdeaId === id ? null : state.selectedIdeaId,
    })),

  selectIdea: (id) => set({ selectedIdeaId: id }),

  validateIdea: (id) =>
    set((state) => {
      const scores = generateScores();
      return {
        ideas: state.ideas.map((idea) =>
          idea.id === id
            ? {
                ...idea,
                scores,
                status: getStatusFromScore(scores.overall),
                updatedAt: new Date(),
              }
            : idea
        ),
      };
    }),

  convertToProject: (ideaId, projectId) =>
    set((state) => ({
      ideas: state.ideas.map((idea) =>
        idea.id === ideaId
          ? { ...idea, convertedToProject: projectId, updatedAt: new Date() }
          : idea
      ),
    })),
}));
