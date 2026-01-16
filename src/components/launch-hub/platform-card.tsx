"use client";

import { Check, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn, getPlatformDisplayName } from "@/lib/utils";
import { LaunchPlatformStatus, LaunchPlatform } from "@/types";

const platformEmojis: Record<LaunchPlatform, string> = {
  product_hunt: "🚀",
  indie_hackers: "💡",
  hacker_news: "📰",
  reddit: "🔗",
  twitter: "🐦",
};

const statusLabels = {
  not_started: "Not Started",
  in_progress: "In Progress",
  ready: "Ready",
  launched: "Launched",
};

const statusColors = {
  not_started: "bg-muted text-muted-foreground",
  in_progress: "bg-yellow-500/20 text-yellow-500",
  ready: "bg-green-500/20 text-green-500",
  launched: "bg-blue-500/20 text-blue-500",
};

interface PlatformCardProps {
  platform: LaunchPlatformStatus;
  onClick: () => void;
  isSelected: boolean;
}

export function PlatformCard({ platform, onClick, isSelected }: PlatformCardProps) {
  const completedItems = platform.checklist.filter((item) => item.completed).length;
  const totalItems = platform.checklist.length;

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:border-primary/50",
        isSelected && "border-primary ring-1 ring-primary"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{platformEmojis[platform.platform]}</span>
            <div>
              <h3 className="font-medium">
                {getPlatformDisplayName(platform.platform)}
              </h3>
              <p className="text-xs text-muted-foreground">
                {completedItems}/{totalItems} tasks
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={statusColors[platform.status]}>
              {statusLabels[platform.status]}
            </Badge>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <div className="mt-3">
          <Progress value={platform.progress} className="h-1.5" />
        </div>
      </CardContent>
    </Card>
  );
}
