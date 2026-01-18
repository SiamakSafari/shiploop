"use client";

import { Flame, TrendingUp, Trophy, Sparkles } from "lucide-react";
import { useAppStore } from "@/stores";
import { cn } from "@/lib/utils";
import { Caption, Micro, NumberDisplay } from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnimatedCounter } from "@/hooks";

function ShipScoreCardSkeleton() {
  return (
    <div className="glass rounded-2xl p-6">
      {/* Header skeleton */}
      <div className="mb-4 flex items-center justify-between">
        <Skeleton variant="shimmer" className="h-6 w-28" />
        <Skeleton variant="shimmer" className="h-8 w-20 rounded-full" />
      </div>

      <div className="flex items-center gap-8">
        {/* Circular progress skeleton */}
        <Skeleton variant="shimmer" className="h-36 w-36 rounded-full" />

        {/* Score bars skeleton */}
        <div className="flex-1 space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between">
                <Skeleton variant="shimmer" className="h-3 w-16" />
                <Skeleton variant="shimmer" className="h-3 w-10" />
              </div>
              <Skeleton variant="shimmer" className="h-2.5 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom stats skeleton */}
      <div className="mt-6 flex items-center justify-between rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Skeleton variant="shimmer" className="h-6 w-6 rounded" />
          <div>
            <Skeleton variant="shimmer" className="h-5 w-20 mb-1" />
            <Skeleton variant="shimmer" className="h-3 w-24" />
          </div>
        </div>
        <div className="text-right">
          <Skeleton variant="shimmer" className="h-5 w-20 mb-1 ml-auto" />
          <Skeleton variant="shimmer" className="h-3 w-28" />
        </div>
      </div>
    </div>
  );
}

export function ShipScoreCard() {
  const user = useAppStore((state) => state.user);

  // Animated score counter
  const { value: animatedScore } = useAnimatedCounter(user?.shipScore.total || 0, {
    duration: 1500,
    delay: 300,
  });

  if (!user) return <ShipScoreCardSkeleton />;

  const { shipScore, rank } = user;
  const circumference = 2 * Math.PI * 52; // radius = 52
  const progress = (animatedScore / 100) * circumference;
  const offset = circumference - progress;

  return (
    <div className="glass-premium hover-lift relative overflow-hidden rounded-2xl p-6 animate-card-enter">
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />

      {/* Header */}
      <div className="relative mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-display font-medium text-foreground">Ship Score</h3>
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
        </div>
        <div className="level-badge animate-badge-pop">
          <Trophy className="h-4 w-4" />
          <span>
            {rank.tier.charAt(0).toUpperCase() + rank.tier.slice(1)}
          </span>
        </div>
      </div>

      <div className="relative flex items-center gap-8">
        {/* Circular progress with glow */}
        <div className="score-ring-container">
          {/* Glow effect behind ring */}
          <div className="score-ring-glow" />

          <svg className="h-36 w-36 -rotate-90 transform relative z-10">
            {/* Background circle */}
            <circle
              cx="72"
              cy="72"
              r="52"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-gray-200 dark:text-gray-700"
            />
            {/* Progress circle with gradient */}
            <circle
              cx="72"
              cy="72"
              r="52"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="stroke-primary transition-all duration-700 ease-out"
              style={{
                filter: "drop-shadow(0 0 6px rgba(189, 183, 107, 0.5))",
              }}
            />
          </svg>

          {/* Score number in center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <div className="text-5xl font-bold tracking-tight text-foreground number-display">
              {Math.round(animatedScore)}
            </div>
            <Micro className="text-muted-foreground font-medium">/ 100</Micro>
          </div>
        </div>

        {/* Score breakdown */}
        <div className="flex-1 space-y-3">
          <ScoreBar
            label="Commits"
            value={shipScore.breakdown.commits}
            max={25}
            color="#bdb76b"
            darkColor="#bdb76b"
          />
          <ScoreBar
            label="Launches"
            value={shipScore.breakdown.launches}
            max={25}
            color="#7c8c6e"
            darkColor="#8fa382"
          />
          <ScoreBar
            label="Revenue"
            value={shipScore.breakdown.revenue}
            max={25}
            color="#a89070"
            darkColor="#c4a882"
          />
          <ScoreBar
            label="Growth"
            value={shipScore.breakdown.growth}
            max={25}
            color="#8b8b3d"
            darkColor="#a8a84a"
          />
        </div>
      </div>

      {/* Bottom stats */}
      <div className="relative mt-6 flex items-center justify-between rounded-xl bg-gradient-to-r from-muted to-muted/50 p-4 border border-border overflow-hidden">
        {/* Subtle animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />

        {/* Streak */}
        <div className="relative flex items-center gap-3">
          {shipScore.streak.isOnFire && (
            <div className="streak-flame">
              <Flame className="h-6 w-6 text-primary streak-flame-icon" />
            </div>
          )}
          <div>
            <div className="text-xl font-bold text-primary number-display">
              {shipScore.streak.currentStreak} days
            </div>
            <Micro className="text-muted-foreground">Current streak</Micro>
          </div>
        </div>

        {/* Rank */}
        <div className="relative text-right">
          <div className="flex items-center justify-end gap-1.5">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            <span className="text-xl font-bold text-primary number-display">Top {rank.percentile}%</span>
          </div>
          <Micro className="text-muted-foreground">
            #{rank.position.toLocaleString()} of {rank.totalUsers.toLocaleString()}
          </Micro>
        </div>
      </div>
    </div>
  );
}

function ScoreBar({
  label,
  value,
  max,
  color,
  darkColor,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
  darkColor?: string;
}) {
  const percentage = (value / max) * 100;

  return (
    <div className="space-y-1.5 group">
      <div className="flex justify-between">
        <Micro className="text-gray-600 dark:text-gray-300 font-medium">{label}</Micro>
        <Micro className="font-semibold text-gray-700 dark:text-gray-200 font-space-grotesk">
          {value}/{max}
        </Micro>
      </div>
      <div className="relative h-2.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
        {/* Actual bar with solid color */}
        <div
          className="relative h-full rounded-full transition-all duration-700 ease-out overflow-hidden score-bar"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
            ['--dark-color' as string]: darkColor || color
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
