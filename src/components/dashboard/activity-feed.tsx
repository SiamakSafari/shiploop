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

const activityIcons: Record<ActivityType, { icon: typeof GitCommit; color: string; glow: string; emoji: string }> = {
  commit: { icon: GitCommit, color: "text-indigo-400 bg-indigo-500/20", glow: "shadow-indigo-500/20", emoji: "💻" },
  revenue: { icon: DollarSign, color: "text-mint-400 bg-emerald-500/20", glow: "shadow-emerald-500/20", emoji: "💰" },
  signup: { icon: UserPlus, color: "text-sky-400 bg-sky-500/20", glow: "shadow-sky-500/20", emoji: "👥" },
  launch: { icon: Rocket, color: "text-coral-400 bg-red-500/20", glow: "shadow-red-500/20", emoji: "🚀" },
  milestone: { icon: Flag, color: "text-hot-pink-400 bg-pink-500/20", glow: "shadow-pink-500/20", emoji: "🎉" },
  idea_validated: { icon: Lightbulb, color: "text-yellow-400 bg-yellow-500/20", glow: "shadow-yellow-500/20", emoji: "💡" },
};

export function ActivityFeed() {
  const activity = useAppStore((state) => state.activity);

  return (
    <div className="glass hover-lift h-full rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <h3 className="flex items-center gap-2 text-base font-semibold text-white">
          <Activity className="h-5 w-5 text-cyan-400 animate-pulse" />
          📊 Recent Activity
        </h3>
      </div>
      <ScrollArea className="h-[300px] p-4">
        <div className="space-y-3">
          {activity.slice(0, 10).map((item, index) => {
            const { icon: Icon, color, glow, emoji } = activityIcons[item.type];
            const isImportant = item.type === 'launch' || item.type === 'milestone' || item.type === 'revenue';

            return (
              <div
                key={item.id}
                className={cn(
                  "relative flex gap-3 animate-slide-up rounded-xl bg-white/5 p-3 transition-all hover:bg-white/8 group border border-white/10",
                  "hover:scale-[1.02] hover:shadow-lg",
                  glow
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Important activity badge */}
                {isImportant && (
                  <div className="absolute -top-1 -right-1">
                    <Sparkles className="h-3 w-3 text-yellow-400 animate-pulse" />
                  </div>
                )}

                <div className="relative">
                  <div className={cn("mt-0.5 rounded-lg p-2.5 shadow-lg transition-transform group-hover:scale-110 border border-white/10", color)}>
                    <Icon className="h-4 w-4" />
                  </div>
                  {/* Floating emoji */}
                  <div className="absolute -top-1 -right-1 text-sm">
                    {emoji}
                  </div>
                </div>

                <div className="flex-1 space-y-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {item.title}
                  </p>
                  {item.description && (
                    <p className="text-xs text-white/50 truncate font-medium">
                      {item.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-white/40 font-medium">
                    <span>{formatRelativeTime(item.timestamp)}</span>
                    {item.projectName && (
                      <>
                        <span className="text-white/20">·</span>
                        <span className="text-purple-400 font-semibold">{item.projectName}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
