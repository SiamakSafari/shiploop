"use client";

import Link from "next/link";
import { ArrowRight, FolderKanban, Sparkles } from "lucide-react";
import { useProjectsStore } from "@/stores";
import { cn, formatCurrency } from "@/lib/utils";
import { ProjectStatus } from "@/types";
import { getProjectColor } from "@/lib/design-system";

const statusStyles: Record<ProjectStatus, { bg: string; text: string; glow: string }> = {
  idea: { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-600 dark:text-gray-400", glow: "" },
  validating: { bg: "bg-gray-200 dark:bg-gray-700", text: "text-gray-700 dark:text-gray-300", glow: "" },
  building: { bg: "bg-gray-300 dark:bg-gray-600", text: "text-gray-800 dark:text-gray-200", glow: "" },
  live: { bg: "bg-gray-900 dark:bg-gray-100", text: "text-white dark:text-gray-900", glow: "" },
  paused: { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-500 dark:text-gray-400", glow: "" },
};

export function ProjectProgress() {
  const projects = useProjectsStore((state) => state.projects);
  const activeProjects = projects.filter((p) => p.status !== "paused").slice(0, 3);

  return (
    <div className="glass hover-lift rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900">
          <FolderKanban className="h-5 w-5 text-primary" />
          Projects
        </h3>
        <Link
          href="/dashboard/projects"
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 transition-colors group"
        >
          View all <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="p-4 space-y-3">
        {activeProjects.map((project, index) => {
          const completedMilestones = project.milestones.filter(
            (m) => m.completed
          ).length;
          const totalMilestones = project.milestones.length;
          const progress = (completedMilestones / totalMilestones) * 100;
          const status = statusStyles[project.status];
          const projectColor = getProjectColor(index);
          const isFeatured = index === 0 && project.metrics.mrr > 0;

          return (
            <Link
              key={project.id}
              href={`/dashboard/projects/${project.id}`}
              className={cn(
                "block space-y-3 rounded-xl bg-gray-50 p-4 transition-all relative group border border-gray-200",
                "hover:bg-gray-100 hover:scale-[1.02] hover:shadow-md",
                isFeatured && "shape-tilted ring-2 ring-primary/30",
                status.glow
              )}
            >
              {/* Corner badge for featured project */}
              {isFeatured && (
                <div className="corner-badge corner-badge-hot">
                  HOT
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{project.name}</span>
                  <span className={cn("text-[10px] px-2 py-0.5 rounded-full uppercase font-medium", status.bg, status.text)}>
                    {project.status}
                  </span>
                </div>
                {project.metrics.mrr > 0 && (
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {formatCurrency(project.metrics.mrr)}/mo
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span className="font-medium">Progress</span>
                  <span className="font-semibold font-space-grotesk">
                    {completedMilestones}/{totalMilestones} milestones
                  </span>
                </div>
                {/* Custom progress bar with solid color */}
                <div className="relative h-2.5 overflow-hidden rounded-full bg-gray-200 border border-gray-300">
                  <div
                    className="relative h-full transition-all duration-700 rounded-full overflow-hidden"
                    style={{ width: `${progress}%`, backgroundColor: projectColor.color }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}

        {activeProjects.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-sm text-gray-500 mb-2">No active projects yet.</p>
            <Link
              href="/dashboard/projects"
              className="text-sm text-primary hover:text-gray-800 transition-colors"
            >
              Create your first project
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
