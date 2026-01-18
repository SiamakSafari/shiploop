"use client";

import { Flame, Trophy, Award, Zap } from "lucide-react";
import { useAppStore } from "@/stores";
import { cn } from "@/lib/utils";
import { getStreakMilestone } from "@/lib/design-system";
import { Text, Caption, Micro } from "@/components/ui/typography";
import { useAnimatedCounter } from "@/hooks";

export function StreakCounter() {
  const user = useAppStore((state) => state.user);

  const { value: animatedStreak } = useAnimatedCounter(user?.shipScore.streak.currentStreak || 0, {
    duration: 1200,
    delay: 200,
  });

  if (!user) return null;

  const { streak } = user.shipScore;
  const milestone = getStreakMilestone(streak.currentStreak);

  return (
    <div className="glass-premium hover-lift rounded-2xl relative overflow-hidden p-5 animate-card-enter stagger-2">
      {/* Animated background gradient when on fire */}
      {streak.isOnFire && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 animate-gradient-shift" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        </>
      )}

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {/* Enhanced flame icon with glow */}
            <div className="relative">
              <div
                className={cn(
                  "relative flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all duration-300",
                  streak.isOnFire
                    ? "bg-gradient-to-br from-primary to-primary/80 border-primary shadow-lg"
                    : "bg-muted border-border"
                )}
              >
                {streak.isOnFire && (
                  <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" style={{ animationDuration: '2s' }} />
                )}
                <div className={cn(streak.isOnFire && "streak-flame")}>
                  <Flame
                    className={cn(
                      "h-8 w-8 transition-all duration-300",
                      streak.isOnFire
                        ? "text-primary-foreground streak-flame-icon"
                        : "text-muted-foreground"
                    )}
                  />
                </div>
              </div>
              {/* Sparkle decorations */}
              {streak.isOnFire && (
                <>
                  <Zap className="absolute -top-1 -right-1 h-4 w-4 text-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <Zap className="absolute -bottom-1 -left-1 h-3 w-3 text-primary/60 animate-bounce" style={{ animationDelay: '0.5s' }} />
                </>
              )}
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className={cn(
                  "text-5xl font-bold tracking-tight number-display transition-colors",
                  streak.isOnFire ? "text-primary" : "text-foreground"
                )}>
                  {Math.round(animatedStreak)}
                </span>
                <Text className="text-muted-foreground font-medium">days</Text>
              </div>
              <Caption className={cn(
                "mt-1 transition-colors",
                streak.isOnFire ? "text-primary/80" : "text-muted-foreground"
              )}>
                {streak.isOnFire ? "You're on fire! Keep it up!" : "Keep shipping to build your streak!"}
              </Caption>
            </div>
          </div>

          {/* Best streak card */}
          <div className="text-right rounded-xl bg-gradient-to-br from-muted to-muted/50 px-4 py-3 border border-border hover:border-primary/30 transition-colors">
            <Micro as="div" className="flex items-center justify-end gap-1.5 text-muted-foreground">
              <Trophy className="h-4 w-4 text-primary" />
              <span>Best streak</span>
            </Micro>
            <div className="text-xl font-bold text-primary number-display">{streak.longestStreak} days</div>
          </div>
        </div>

        {/* Milestone Badges with animations */}
        {milestone && milestone.milestone > 0 && (
          <div className="flex items-center gap-2 pt-3 border-t border-border">
            <Award className="h-4 w-4 text-primary" />
            <Micro className="text-muted-foreground">Milestones:</Micro>
            <div className="flex gap-2">
              {[7, 30, 60, 100].map((m, index) => (
                <div
                  key={m}
                  className={cn(
                    "milestone-badge px-3 py-1 rounded-full font-semibold text-xs transition-all number-display",
                    streak.currentStreak >= m
                      ? "achieved bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground border border-border hover:border-primary/30"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
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
