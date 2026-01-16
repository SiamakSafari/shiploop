"use client";

import { Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAppStore } from "@/stores";
import { cn } from "@/lib/utils";

export function StreakCounter() {
  const user = useAppStore((state) => state.user);

  if (!user) return null;

  const { streak } = user.shipScore;

  return (
    <Card className="relative overflow-hidden">
      {/* Fire gradient background when on fire */}
      {streak.isOnFire && (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-red-500/10 to-transparent" />
      )}

      <CardContent className="relative flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full",
              streak.isOnFire
                ? "bg-gradient-to-br from-orange-500 to-red-500"
                : "bg-muted"
            )}
          >
            <Flame
              className={cn(
                "h-6 w-6",
                streak.isOnFire ? "text-white animate-fire-pulse" : "text-muted-foreground"
              )}
            />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">{streak.currentStreak}</span>
              <span className="text-sm text-muted-foreground">days</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {streak.isOnFire ? "You're on fire!" : "Keep shipping!"}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-muted-foreground">Best streak</p>
          <p className="text-lg font-semibold">{streak.longestStreak} days</p>
        </div>
      </CardContent>
    </Card>
  );
}
