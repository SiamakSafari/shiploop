"use client";

import { cn } from "@/lib/utils";
import { EmptyStateAnimation, RocketAnimation, SuccessAnimation } from "@/components/lottie";
import { Caption, Micro } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AnimatedEmptyStateProps {
  className?: string;
  title: string;
  description?: string;
  variant?: "default" | "rocket" | "success";
  actionLabel?: string;
  onAction?: () => void;
}

export function AnimatedEmptyState({
  className,
  title,
  description,
  variant = "default",
  actionLabel,
  onAction,
}: AnimatedEmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 text-center",
      className
    )}>
      <div className="mb-4 opacity-60">
        {variant === "rocket" ? (
          <RocketAnimation size="2xl" />
        ) : variant === "success" ? (
          <SuccessAnimation size="2xl" loop={false} />
        ) : (
          <EmptyStateAnimation size="2xl" />
        )}
      </div>
      <Caption className="text-muted-foreground font-semibold mb-1">
        {title}
      </Caption>
      {description && (
        <Micro className="text-muted-foreground/75 max-w-xs">
          {description}
        </Micro>
      )}
      {actionLabel && onAction && (
        <Button
          variant="outline"
          size="sm"
          className="mt-4 gap-2"
          onClick={onAction}
        >
          <Plus className="h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

// Specific empty states for common use cases
export function NoProjectsEmptyState({ onAction }: { onAction?: () => void }) {
  return (
    <AnimatedEmptyState
      variant="rocket"
      title="No projects yet"
      description="Create your first project to start tracking your indie hacker journey."
      actionLabel="Create Project"
      onAction={onAction}
    />
  );
}

export function NoIdeasEmptyState({ onAction }: { onAction?: () => void }) {
  return (
    <AnimatedEmptyState
      variant="default"
      title="No ideas yet"
      description="Start capturing your product ideas and validate them before building."
      actionLabel="Add Idea"
      onAction={onAction}
    />
  );
}

export function NoGoalsEmptyState({ onAction }: { onAction?: () => void }) {
  return (
    <AnimatedEmptyState
      variant="rocket"
      title="No goals yet"
      description="Set SMART goals to track your progress and stay accountable."
      actionLabel="Create Goal"
      onAction={onAction}
    />
  );
}

export function NoActivityEmptyState() {
  return (
    <AnimatedEmptyState
      variant="rocket"
      title="No activity yet"
      description="Start shipping to see your activity here."
    />
  );
}

export function AllDoneEmptyState() {
  return (
    <AnimatedEmptyState
      variant="success"
      title="All caught up!"
      description="You've completed everything. Time to celebrate!"
    />
  );
}
