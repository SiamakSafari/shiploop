"use client";

import { ExternalLink, Github, Star, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  url?: string;
  githubUrl?: string;
  techStack: string[];
  stats: {
    stars?: number;
    users?: number;
    mrr?: number;
  };
  launchedAt?: string;
  updatedAt: string;
}

interface ProjectShowcaseProps {
  projects: Project[];
  className?: string;
}

export function ProjectShowcase({ projects, className }: ProjectShowcaseProps) {
  if (projects.length === 0) {
    return (
      <div className={cn("glass rounded-2xl p-12 text-center", className)}>
        <p className="text-gray-500 dark:text-gray-400">
          No public projects yet
        </p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-6 md:grid-cols-2", className)}>
      {projects.map((project) => (
        <div
          key={project.id}
          className="glass rounded-2xl p-6 hover-lift transition-all group"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 group-hover:text-primary transition-colors">
                {project.name}
              </h3>
              <span
                className={cn(
                  "inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1",
                  project.status === "launched"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : project.status === "building"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                )}
              >
                {project.status}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/10 transition-all"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            {project.stats.stars !== undefined && (
              <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <Star className="h-4 w-4" />
                <span>{project.stats.stars}</span>
              </div>
            )}
            {project.stats.users !== undefined && (
              <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <TrendingUp className="h-4 w-4" />
                <span>{project.stats.users} users</span>
              </div>
            )}
            {project.stats.mrr !== undefined && project.stats.mrr > 0 && (
              <div className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                ${project.stats.mrr}/mo
              </div>
            )}
            <span className="ml-auto text-xs text-gray-400">
              Updated {format(new Date(project.updatedAt), "MMM d, yyyy")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
