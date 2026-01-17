"use client";

import { Flame, Trophy, Award } from "lucide-react";
import { useAppStore } from "@/stores";
import { cn } from "@/lib/utils";
import { getStreakMilestone } from "@/lib/design-system";
import { Text, Caption, Micro, NumberDisplay } from "@/components/ui/typography";

export function StreakCounter() {
  const user = useAppStore((state) => state.user);

  if (!user) return null;

  const { streak } = user.shipScore;
  const milestone = getStreakMilestone(streak.currentStreak);

  return (
    <div className="glass hover-lift shape-pill relative overflow-hidden p-5">
      {/* Subtle purple background when on fire */}
      {streak.isOnFire && (
        <div className="absolute inset-0 bg-violet-50 dark:bg-violet-900/30" />
      )}

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div
                className={cn(
                  "relative flex h-16 w-16 items-center justify-center rounded-full border-2",
                  streak.isOnFire
                    ? "bg-primary shadow-md border-violet-300"
                    : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                )}
              >
                <Flame
                  className={cn(
                    "h-8 w-8",
                    streak.isOnFire ? "text-white animate-fire-pulse" : "text-slate-400 dark:text-slate-500"
                  )}
                />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <NumberDisplay variant="large" className={cn(streak.isOnFire ? "text-primary" : "text-slate-900 dark:text-slate-50")}>
                  {streak.currentStreak}
                </NumberDisplay>
                <Text className="text-slate-500 dark:text-slate-400 font-medium">days</Text>
              </div>
              <Caption className="text-slate-600 dark:text-slate-300 mt-1">
                {streak.isOnFire ? "You're on fire! Keep it up!" : "Keep shipping to build your streak!"}
              </Caption>
            </div>
          </div>

          <div className="text-right rounded-xl bg-slate-50 dark:bg-slate-800/50 px-4 py-3 border border-slate-200 dark:border-slate-700">
            <Micro as="div" className="flex items-center justify-end gap-1.5 text-slate-500">
              <Trophy className="h-4 w-4" />
              <span>Best streak</span>
            </Micro>
            <NumberDisplay variant="small" className="text-primary">{streak.longestStreak} days</NumberDisplay>
          </div>
        </div>

        {/* Milestone Badges */}
        {milestone && milestone.milestone > 0 && (
          <div className="flex items-center gap-2 pt-3 border-t border-slate-200">
            <Award className="h-4 w-4 text-primary" />
            <Micro className="text-slate-600">Milestones:</Micro>
            <div className="flex gap-2">
              {[7, 30, 60, 100].map((m) => (
                <Micro
                  key={m}
                  as="div"
                  className={cn(
                    "px-2 py-1 rounded-full font-semibold transition-all font-fredoka",
                    streak.currentStreak >= m
                      ? "bg-primary text-white shadow-md animate-scale-pop"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700"
                  )}
                >
                  {m}
                </Micro>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
