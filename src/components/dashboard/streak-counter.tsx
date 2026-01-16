"use client";

import { Flame, Trophy, Award } from "lucide-react";
import { useAppStore } from "@/stores";
import { cn } from "@/lib/utils";
import { getStreakMilestone } from "@/lib/design-system";

export function StreakCounter() {
  const user = useAppStore((state) => state.user);

  if (!user) return null;

  const { streak } = user.shipScore;
  const milestone = getStreakMilestone(streak.currentStreak);

  return (
    <div className="glass hover-lift shape-pill relative overflow-hidden p-5">
      {/* Fire gradient background when on fire */}
      {streak.isOnFire && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-red-500/10 to-transparent" />
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-orange-500/20 blur-3xl" />
        </>
      )}

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              {/* Glow ring */}
              {streak.isOnFire && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500 to-red-500 blur-lg opacity-60 animate-fire-pulse" />
              )}
              <div
                className={cn(
                  "relative flex h-16 w-16 items-center justify-center rounded-full border-2",
                  streak.isOnFire
                    ? "bg-gradient-to-br from-orange-500 to-red-500 shadow-xl shadow-orange-500/40 border-orange-300/30"
                    : "bg-white/10 border-white/20"
                )}
              >
                <Flame
                  className={cn(
                    "h-8 w-8",
                    streak.isOnFire ? "text-white animate-fire-pulse" : "text-white/40"
                  )}
                />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg text-white/50 font-medium">🔥</span>
                <span className={cn("text-5xl font-bold font-space-grotesk", streak.isOnFire ? "text-gradient-fire" : "text-white")}>
                  {streak.currentStreak}
                </span>
                <span className="text-base text-white/50 font-medium">days</span>
              </div>
              <p className="text-sm text-white/60 mt-1 font-medium">
                {streak.isOnFire ? "🎉 You're on fire! Keep it up!" : "Keep shipping to build your streak!"}
              </p>
            </div>
          </div>

          <div className="text-right rounded-xl bg-white/5 px-4 py-3 border border-white/10">
            <div className="flex items-center justify-end gap-1.5 text-white/50">
              <Trophy className="h-4 w-4" />
              <span className="text-xs font-medium">Best streak</span>
            </div>
            <p className="text-2xl font-bold text-gradient font-space-grotesk">{streak.longestStreak} days</p>
          </div>
        </div>

        {/* Milestone Badges */}
        {milestone && milestone.milestone > 0 && (
          <div className="flex items-center gap-2 pt-3 border-t border-white/10">
            <Award className="h-4 w-4 text-yellow-400" />
            <span className="text-xs text-white/60 font-medium">Milestones:</span>
            <div className="flex gap-2">
              {[7, 30, 60, 100].map((m) => (
                <div
                  key={m}
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-semibold transition-all font-fredoka",
                    streak.currentStreak >= m
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 animate-scale-pop"
                      : "bg-white/5 text-white/30 border border-white/10"
                  )}
                >
                  {m}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
