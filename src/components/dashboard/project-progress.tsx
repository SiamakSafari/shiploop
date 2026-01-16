"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProjectsStore } from "@/stores";
import { cn, formatCurrency } from "@/lib/utils";
import { ProjectStatus } from "@/types";

const statusColors: Record<ProjectStatus, string> = {
  idea: "bg-gray-500",
  validating: "bg-yellow-500",
  building: "bg-blue-500",
  live: "bg-green-500",
  paused: "bg-orange-500",
};

export function ProjectProgress() {
  const projects = useProjectsStore((state) => state.projects);
  const activeProjects = projects.filter((p) => p.status !== "paused").slice(0, 3);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base">Projects</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/projects" className="gap-1 text-xs">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeProjects.map((project) => {
          const completedMilestones = project.milestones.filter(
            (m) => m.completed
          ).length;
          const totalMilestones = project.milestones.length;
          const progress = (completedMilestones / totalMilestones) * 100;

          return (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="block space-y-2 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{project.name}</span>
                  <Badge
                    variant="secondary"
                    className={cn("text-[10px]", statusColors[project.status])}
                  >
                    {project.status}
                  </Badge>
                </div>
                {project.metrics.mrr > 0 && (
                  <span className="text-sm font-medium text-green-500">
                    {formatCurrency(project.metrics.mrr)}/mo
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>
                    {completedMilestones}/{totalMilestones} milestones
                  </span>
                </div>
                <Progress value={progress} className="h-1.5" />
              </div>
            </Link>
          );
        })}

        {activeProjects.length === 0 && (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No active projects yet.
            <br />
            <Link href="/projects" className="text-primary hover:underline">
              Create your first project
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
