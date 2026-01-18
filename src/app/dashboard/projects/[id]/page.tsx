"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MilestoneTracker } from "@/components/projects";
import { PlatformChecklist } from "@/components/launch-hub";
import { useProjectsStore } from "@/stores";
import { cn, formatCurrency, formatRelativeTime, getPlatformDisplayName } from "@/lib/utils";
import { ProjectStatus, LaunchPlatform } from "@/types";

const statusConfig: Record<ProjectStatus, { label: string; color: string }> = {
  idea: { label: "Idea", color: "bg-gray-500" },
  validating: { label: "Validating", color: "bg-yellow-500" },
  building: { label: "Building", color: "bg-blue-500" },
  live: { label: "Live", color: "bg-green-500" },
  paused: { label: "Paused", color: "bg-orange-500" },
};

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = use(params);
  const { projects, toggleMilestone, updateChecklistItem } = useProjectsStore();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-semibold">Project Not Found</h2>
        <p className="mt-2 text-muted-foreground">
          The project you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/projects">Back to Projects</Link>
        </Button>
      </div>
    );
  }

  const status = statusConfig[project.status];
  const completedMilestones = project.milestones.filter((m) => m.completed).length;
  const totalMilestones = project.milestones.length;
  const progress = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

  const handleToggleChecklist = (platform: LaunchPlatform, itemId: string) => {
    updateChecklistItem(project.id, platform, itemId);
  };

  return (
    <div className="space-y-6">
      {/* Back button and header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/projects">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{project.name}</h1>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            <Badge variant="secondary" className={cn("text-xs", status.color)}>
              {status.label}
            </Badge>
          </div>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Edit className="h-4 w-4" />
          Edit
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">MRR</p>
            <p className={cn("text-2xl font-bold", project.metrics.mrr > 0 && "text-green-500")}>
              {formatCurrency(project.metrics.mrr)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Users</p>
            <p className="text-2xl font-bold">{project.metrics.users}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Ship Velocity</p>
            <p className="text-2xl font-bold">{project.metrics.velocity}/wk</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Growth</p>
            <p className={cn("text-2xl font-bold", project.metrics.growth > 0 && "text-green-500")}>
              {project.metrics.growth > 0 ? "+" : ""}
              {project.metrics.growth}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress overview */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Overall Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {completedMilestones} of {totalMilestones} milestones completed
            </span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Last updated {formatRelativeTime(project.updatedAt)}
          </p>
        </CardContent>
      </Card>

      {/* Milestones and Launch Status */}
      <div className="grid gap-6 lg:grid-cols-2">
        <MilestoneTracker
          milestones={project.milestones}
          onToggle={(milestoneId) => toggleMilestone(project.id, milestoneId)}
        />

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Launch Preparation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {project.launchPlatforms.map((platform) => (
              <div key={platform.platform} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{getPlatformDisplayName(platform.platform)}</span>
                  <span
                    className={cn(
                      "font-medium",
                      platform.progress >= 100
                        ? "text-green-500"
                        : platform.progress > 0
                        ? "text-yellow-500"
                        : "text-muted-foreground"
                    )}
                  >
                    {platform.progress}%
                  </span>
                </div>
                <Progress value={platform.progress} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
