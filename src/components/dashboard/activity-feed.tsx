"use client";

import {
  GitCommit,
  DollarSign,
  UserPlus,
  Rocket,
  Flag,
  Lightbulb,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppStore } from "@/stores";
import { cn, formatRelativeTime } from "@/lib/utils";
import { ActivityType } from "@/types";

const activityIcons: Record<ActivityType, { icon: typeof GitCommit; color: string }> = {
  commit: { icon: GitCommit, color: "text-purple-500 bg-purple-500/10" },
  revenue: { icon: DollarSign, color: "text-green-500 bg-green-500/10" },
  signup: { icon: UserPlus, color: "text-blue-500 bg-blue-500/10" },
  launch: { icon: Rocket, color: "text-orange-500 bg-orange-500/10" },
  milestone: { icon: Flag, color: "text-cyan-500 bg-cyan-500/10" },
  idea_validated: { icon: Lightbulb, color: "text-yellow-500 bg-yellow-500/10" },
};

export function ActivityFeed() {
  const activity = useAppStore((state) => state.activity);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] px-4 pb-4">
          <div className="space-y-4">
            {activity.slice(0, 10).map((item, index) => {
              const { icon: Icon, color } = activityIcons[item.type];

              return (
                <div
                  key={item.id}
                  className={cn(
                    "flex gap-3 animate-slide-up",
                    index === 0 && "pt-0"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={cn("mt-0.5 rounded-full p-1.5", color)}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-sm font-medium leading-none">
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{formatRelativeTime(item.timestamp)}</span>
                      {item.projectName && (
                        <>
                          <span>·</span>
                          <span className="text-primary">{item.projectName}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
