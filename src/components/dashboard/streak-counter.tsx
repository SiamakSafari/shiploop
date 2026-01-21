"use client";

import { useState, useEffect } from "react";
import { Flame, Trophy, Award } from "lucide-react";
import { useAppStore } from "@/stores";
import { cn } from "@/lib/utils";
import { getStreakMilestone } from "@/lib/design-system";
import { Text, Caption, Micro, NumberDisplay } from "@/components/ui/typography";
import { FireAnimation } from "@/components/lottie";

export function StreakCounter() {
  const user = useAppStore((state) => state.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!user) return null;

  const { streak } = user.shipScore;
  const milestone = getStreakMilestone(streak.currentStreak);

  return (
    <div className="glass hover-lift rounded-2xl relative overflow-hidden p-5">
      {/* Subtle highlight background when on fire */}
      {streak.isOnFire && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800/50" />
      )}

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div
                className={cn(
                  "relative flex h-16 w-16 items-center justify-center rounded-full border-2",
                  streak.isOnFire
                    ? "bg-gray-900 dark:bg-gray-100 shadow-md border-gray-700 dark:border-gray-300"
                    : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                )}
              >
                {streak.isOnFire ? (
                  mounted ? <FireAnimation size="md" /> : <Flame className="h-8 w-8 text-primary" />
                ) : (
                  <Flame className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                )}
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <NumberDisplay variant="large" className={cn(streak.isOnFire ? "text-primary" : "text-gray-900 dark:text-gray-50")}>
                  {streak.currentStreak}
                </NumberDisplay>
                <Text className="text-gray-500 dark:text-gray-400 font-medium">days</Text>
              </div>
              <Caption className="text-gray-600 dark:text-gray-300 mt-1">
                {streak.isOnFire ? "You're on fire! Keep it up!" : "Keep shipping to build your streak!"}
              </Caption>
            </div>
          </div>

          <div className="text-right rounded-xl bg-gray-50 dark:bg-gray-800/50 px-4 py-3 border border-gray-200 dark:border-gray-700">
            <Micro as="div" className="flex items-center justify-end gap-1.5 text-gray-500">
              <Trophy className="h-4 w-4" />
              <span>Best streak</span>
            </Micro>
            <NumberDisplay variant="small" className="text-primary">{streak.longestStreak} days</NumberDisplay>
          </div>
        </div>

        {/* Milestone Badges */}
        {milestone && milestone.milestone > 0 && (
          <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
            <Award className="h-4 w-4 text-primary" />
            <Micro className="text-gray-600">Milestones:</Micro>
            <div className="flex gap-2">
              {[7, 30, 60, 100].map((m) => (
                <Micro
                  key={m}
                  as="div"
                  className={cn(
                    "px-2 py-1 rounded-full font-semibold transition-all font-fredoka",
                    streak.currentStreak >= m
                      ? "bg-primary text-white shadow-md animate-scale-pop"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700"
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
