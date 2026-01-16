"use client";

import Link from "next/link";
import { ArrowRight, FolderKanban, Sparkles } from "lucide-react";
import { useProjectsStore } from "@/stores";
import { cn, formatCurrency } from "@/lib/utils";
import { ProjectStatus } from "@/types";
import { getProjectGradient } from "@/lib/design-system";

const statusStyles: Record<ProjectStatus, { bg: string; text: string; glow: string }> = {
  idea: { bg: "bg-gray-500/20", text: "text-gray-400", glow: "" },
  validating: { bg: "bg-yellow-500/20", text: "text-yellow-400", glow: "shadow-yellow-500/10" },
  building: { bg: "bg-blue-500/20", text: "text-blue-400", glow: "shadow-blue-500/10" },
  live: { bg: "bg-emerald-500/20", text: "text-emerald-400", glow: "shadow-emerald-500/10" },
  paused: { bg: "bg-orange-500/20", text: "text-orange-400", glow: "" },
};

export function ProjectProgress() {
  const projects = useProjectsStore((state) => state.projects);
  const activeProjects = projects.filter((p) => p.status !== "paused").slice(0, 3);

  return (
    <div className="glass hover-lift rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h3 className="flex items-center gap-2 text-base font-semibold text-white">
          <FolderKanban className="h-5 w-5 text-purple-400" />
          📂 Projects
        </h3>
        <Link
          href="/projects"
          className="flex items-center gap-1 text-xs text-white/50 hover:text-white transition-colors group"
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
          const projectGradient = getProjectGradient(index);
          const isFeatured = index === 0 && project.metrics.mrr > 0;

          return (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className={cn(
                "block space-y-3 rounded-xl bg-white/5 p-4 transition-all relative group border border-white/10",
                "hover:bg-white/10 hover:scale-[1.02] hover:shadow-lg",
                isFeatured && "shape-tilted ring-2 ring-purple-500/20",
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
                  <span className="font-medium text-white">{project.name}</span>
                  <span className={cn("text-[10px] px-2 py-0.5 rounded-full uppercase font-medium", status.bg, status.text)}>
                    {project.status}
                  </span>
                </div>
                {project.metrics.mrr > 0 && (
                  <span className="text-sm font-medium text-emerald-400">
                    {formatCurrency(project.metrics.mrr)}/mo
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-white/50">
                  <span className="font-medium">Progress</span>
                  <span className="font-semibold font-space-grotesk">
                    {completedMilestones}/{totalMilestones} milestones
                  </span>
                </div>
                {/* Custom progress bar with unique gradient */}
                <div className="relative h-2.5 overflow-hidden rounded-full bg-white/10 border border-white/5">
                  <div
                    className={cn("absolute inset-0 bg-gradient-to-r blur-sm opacity-50", projectGradient.class)}
                    style={{ width: `${progress}%` }}
                  />
                  <div
                    className={cn("relative h-full bg-gradient-to-r transition-all duration-700 rounded-full overflow-hidden", projectGradient.class)}
                    style={{ width: `${progress}%` }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}

        {activeProjects.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-sm text-white/50 mb-2">No active projects yet.</p>
            <Link
              href="/projects"
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Create your first project
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
