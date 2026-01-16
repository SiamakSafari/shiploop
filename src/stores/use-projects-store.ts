import { create } from "zustand";
import { Project, LaunchPlatform } from "@/types";
import { mockProjects } from "@/data";

interface ProjectsState {
  projects: Project[];
  selectedProjectId: string | null;

  // Actions
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  selectProject: (id: string | null) => void;
  toggleMilestone: (projectId: string, milestoneId: string) => void;
  updateChecklistItem: (projectId: string, platform: LaunchPlatform, itemId: string) => void;
}

export const useProjectsStore = create<ProjectsState>((set) => ({
  projects: mockProjects,
  selectedProjectId: null,

  setProjects: (projects) => set({ projects }),

  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),

  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
      ),
    })),

  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
      selectedProjectId: state.selectedProjectId === id ? null : state.selectedProjectId,
    })),

  selectProject: (id) => set({ selectedProjectId: id }),

  toggleMilestone: (projectId, milestoneId) =>
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          milestones: p.milestones.map((m) => {
            if (m.id !== milestoneId) return m;
            return {
              ...m,
              completed: !m.completed,
              completedAt: !m.completed ? new Date() : undefined,
            };
          }),
          updatedAt: new Date(),
        };
      }),
    })),

  updateChecklistItem: (projectId, platform, itemId) =>
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          launchPlatforms: p.launchPlatforms.map((lp) => {
            if (lp.platform !== platform) return lp;
            const updatedChecklist = lp.checklist.map((item) =>
              item.id === itemId ? { ...item, completed: !item.completed } : item
            );
            const completedCount = updatedChecklist.filter((item) => item.completed).length;
            const progress = Math.round((completedCount / updatedChecklist.length) * 100);
            return {
              ...lp,
              checklist: updatedChecklist,
              progress,
              status:
                progress >= 100
                  ? "ready"
                  : progress > 0
                  ? "in_progress"
                  : "not_started",
            };
          }),
          updatedAt: new Date(),
        };
      }),
    })),
}));
