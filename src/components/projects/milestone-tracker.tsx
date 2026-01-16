"use client";

import { Check, Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";
import { Milestone } from "@/types";

interface MilestoneTrackerProps {
  milestones: Milestone[];
  onToggle?: (milestoneId: string) => void;
}

export function MilestoneTracker({ milestones, onToggle }: MilestoneTrackerProps) {
  const sortedMilestones = [...milestones].sort((a, b) => a.order - b.order);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Milestones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-4">
          {/* Vertical line */}
          <div className="absolute left-3 top-0 h-full w-0.5 bg-muted" />

          {sortedMilestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className={cn(
                "relative flex cursor-pointer items-start gap-4 pl-10",
                milestone.completed && "opacity-75"
              )}
              onClick={() => onToggle?.(milestone.id)}
            >
              {/* Circle/Check indicator */}
              <div
                className={cn(
                  "absolute left-0 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors",
                  milestone.completed
                    ? "border-green-500 bg-green-500"
                    : "border-muted bg-background"
                )}
              >
                {milestone.completed ? (
                  <Check className="h-3 w-3 text-white" />
                ) : (
                  <Circle className="h-2 w-2 text-muted-foreground" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <p
                  className={cn(
                    "font-medium",
                    milestone.completed && "line-through text-muted-foreground"
                  )}
                >
                  {milestone.title}
                </p>
                {milestone.description && (
                  <p className="text-sm text-muted-foreground">
                    {milestone.description}
                  </p>
                )}
                {milestone.completedAt && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Completed {formatDate(milestone.completedAt)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
