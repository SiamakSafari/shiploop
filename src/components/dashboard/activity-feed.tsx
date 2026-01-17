"use client";

import {
  GitCommit,
  DollarSign,
  UserPlus,
  Rocket,
  Flag,
  Lightbulb,
  Activity,
  Sparkles,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppStore } from "@/stores";
import { cn, formatRelativeTime } from "@/lib/utils";
import { ActivityType } from "@/types";
import { activityColors } from "@/lib/design-system";
import { Heading, Caption, Micro } from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/skeleton";

const activityIcons: Record<ActivityType, { icon: typeof GitCommit; color: string; glow: string }> = {
  commit: { icon: GitCommit, color: "text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800", glow: "" },
  revenue: { icon: DollarSign, color: "text-primary bg-teal-50 dark:bg-teal-900/30", glow: "" },
  signup: { icon: UserPlus, color: "text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800", glow: "" },
  launch: { icon: Rocket, color: "text-primary bg-teal-50 dark:bg-teal-900/30", glow: "" },
  milestone: { icon: Flag, color: "text-primary bg-teal-50 dark:bg-teal-900/30", glow: "" },
  idea_validated: { icon: Lightbulb, color: "text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800", glow: "" },
};

export function ActivityFeed() {
  const activity = useAppStore((state) => state.activity);

  return (
    <div className="glass hover-lift h-full rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <Heading level={4} className="flex items-center gap-2 text-slate-900 dark:text-slate-50">
          <Activity className="h-5 w-5 text-primary animate-pulse" />
          Recent Activity
        </Heading>
      </div>
      <ScrollArea className="max-h-[400px] p-5">
        <div className="space-y-3">
          {activity.slice(0, 10).map((item, index) => {
            const { icon: Icon, color, glow } = activityIcons[item.type];
            const isImportant = item.type === 'launch' || item.type === 'milestone' || item.type === 'revenue';

            return (
              <div
                key={item.id}
                className={cn(
                  "relative flex gap-3 animate-slide-up rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3 transition-all hover:bg-slate-100 dark:hover:bg-slate-700 group border border-slate-200 dark:border-slate-700",
                  "hover:scale-[1.02] hover:shadow-md active:scale-[0.98]",
                  glow
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Important activity badge */}
                {isImportant && (
                  <div className="absolute -top-1 -right-1">
                    <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                  </div>
                )}

                <div className="relative">
                  <div className={cn("mt-0.5 rounded-lg p-2.5 shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-3 border border-slate-200 dark:border-slate-700", color)}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <div className="flex-1 space-y-1 min-w-0">
                  <Caption className="text-slate-900 dark:text-slate-50 truncate font-semibold">
                    {item.title}
                  </Caption>
                  {item.description && (
                    <Micro className="text-slate-500 dark:text-slate-400 truncate font-medium">
                      {item.description}
                    </Micro>
                  )}
                  <Micro as="div" className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-medium">
                    <span>{formatRelativeTime(item.timestamp)}</span>
                    {item.projectName && (
                      <>
                        <span className="text-slate-300 dark:text-slate-600">·</span>
                        <span className="text-primary font-semibold">{item.projectName}</span>
                      </>
                    )}
                  </Micro>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

export function ActivityFeedSkeleton() {
  return (
    <div className="glass h-full rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <Skeleton variant="shimmer" className="h-5 w-32" />
      </div>
      <div className="p-5 space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex gap-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3 border border-slate-200 dark:border-slate-700"
          >
            <Skeleton variant="shimmer" className="h-9 w-9 rounded-lg shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton variant="shimmer" className="h-4 w-3/4" />
              <Skeleton variant="shimmer" className="h-3 w-1/2" />
              <Skeleton variant="shimmer" className="h-3 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
