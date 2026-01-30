"use client";

import Link from "next/link";
import { ExternalLink, MoreHorizontal, Trash2, Edit, Pause, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, formatCurrency, formatRelativeTime } from "@/lib/utils";
import { Project, ProjectStatus } from "@/types";

const statusConfig: Record<ProjectStatus, { label: string; color: string }> = {
  idea: { label: "Idea", color: "bg-gray-500" },
  validating: { label: "Validating", color: "bg-[#D4AF37]" },
  building: { label: "Building", color: "bg-[#7CB4C4]" },
  live: { label: "Live", color: "bg-[#6BBF8A]" },
  paused: { label: "Paused", color: "bg-[#E8945A]" },
};

interface ProjectCardProps {
  project: Project;
  onDelete?: (id: string) => void;
  onPause?: (id: string) => void;
}

export function ProjectCard({ project, onDelete, onPause }: ProjectCardProps) {
  const status = statusConfig[project.status];
  const completedMilestones = project.milestones.filter((m) => m.completed).length;
  const totalMilestones = project.milestones.length;
  const progress = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

  return (
    <Card className="group relative overflow-hidden transition-all hover:border-primary/50">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-base">
              <Link href={`/projects/${project.id}`} className="hover:underline">
                {project.name}
              </Link>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </CardTitle>
            <Badge variant="secondary" className={cn("text-xs", status.color)}>
              {status.label}
            </Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/projects/${project.id}`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onPause?.(project.id)}>
                {project.status === "paused" ? (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Resume
                  </>
                ) : (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Pause
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete?.(project.id)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {project.description}
        </p>

        {/* Progress */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>
              {completedMilestones}/{totalMilestones} milestones
            </span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>

        {/* Metrics */}
        <div className="flex items-center gap-4 text-sm">
          <div className="space-y-0.5">
            <p className="text-muted-foreground">MRR</p>
            <p className={cn("font-bold", project.metrics.mrr > 0 && "text-[#6BBF8A]")}>
              {formatCurrency(project.metrics.mrr)}
            </p>
          </div>
          <div className="space-y-0.5">
            <p className="text-muted-foreground">Users</p>
            <p className="font-bold">{project.metrics.users}</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-muted-foreground">Velocity</p>
            <p className="font-bold">{project.metrics.velocity}/wk</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-muted-foreground">
          Updated {formatRelativeTime(project.updatedAt)}
        </div>
      </CardContent>
    </Card>
  );
}
