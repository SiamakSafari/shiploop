"use client";

import { MoreHorizontal, Trash2, RefreshCw, Rocket, Check, X, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, formatRelativeTime } from "@/lib/utils";
import { Idea, ValidationStatus } from "@/types";

const statusConfig: Record<
  ValidationStatus,
  { label: string; icon: typeof Check; color: string }
> = {
  validated: {
    label: "Validated",
    icon: Check,
    color: "bg-green-500/20 text-green-500",
  },
  rejected: {
    label: "Rejected",
    icon: X,
    color: "bg-red-500/20 text-red-500",
  },
  needs_research: {
    label: "Needs Research",
    icon: AlertCircle,
    color: "bg-yellow-500/20 text-yellow-500",
  },
  pending: {
    label: "Pending",
    icon: AlertCircle,
    color: "bg-muted text-muted-foreground",
  },
};

interface IdeaCardProps {
  idea: Idea;
  onDelete: (id: string) => void;
  onRevalidate: (id: string) => void;
  onConvert: (id: string) => void;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

export function IdeaCard({
  idea,
  onDelete,
  onRevalidate,
  onConvert,
  isSelected,
  onSelect,
}: IdeaCardProps) {
  const status = statusConfig[idea.status];
  const StatusIcon = status.icon;

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:border-primary/50",
        isSelected && "border-primary ring-1 ring-primary"
      )}
      onClick={() => onSelect?.(idea.id)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{idea.title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onRevalidate(idea.id)}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Re-validate
              </DropdownMenuItem>
              {idea.status === "validated" && !idea.convertedToProject && (
                <DropdownMenuItem onClick={() => onConvert(idea.id)}>
                  <Rocket className="mr-2 h-4 w-4" />
                  Start Building
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => onDelete(idea.id)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {idea.description}
        </p>

        <div className="flex items-center justify-between">
          <Badge variant="secondary" className={status.color}>
            <StatusIcon className="mr-1 h-3 w-3" />
            {status.label}
          </Badge>
          <span className="text-lg font-bold">
            {idea.scores.overall}
            <span className="text-xs text-muted-foreground">/100</span>
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatRelativeTime(idea.createdAt)}</span>
          {idea.convertedToProject && (
            <Badge variant="outline" className="text-[10px]">
              Converted to Project
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
