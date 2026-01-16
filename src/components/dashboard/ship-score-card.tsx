"use client";

import { Flame, TrendingUp, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/stores";
import { cn, getTierColor } from "@/lib/utils";

export function ShipScoreCard() {
  const user = useAppStore((state) => state.user);

  if (!user) return null;

  const { shipScore, rank } = user;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const progress = (shipScore.total / 100) * circumference;
  const offset = circumference - progress;

  return (
    <Card className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />

      <CardHeader className="relative pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Ship Score</span>
          <div className="flex items-center gap-1 text-sm font-normal">
            <Trophy className={cn("h-4 w-4", getTierColor(rank.tier))} />
            <span className={getTierColor(rank.tier)}>
              {rank.tier.charAt(0).toUpperCase() + rank.tier.slice(1)}
            </span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="relative">
        <div className="flex items-center gap-6">
          {/* Circular progress */}
          <div className="relative">
            <svg className="h-32 w-32 -rotate-90 transform">
              {/* Background circle */}
              <circle
                cx="64"
                cy="64"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-muted"
              />
              {/* Progress circle */}
              <circle
                cx="64"
                cy="64"
                r="45"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-all duration-1000 ease-out"
              />
              {/* Gradient definition */}
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(262, 83%, 58%)" />
                  <stop offset="100%" stopColor="hsl(217, 91%, 60%)" />
                </linearGradient>
              </defs>
            </svg>

            {/* Score number in center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold animate-score-up">
                {shipScore.total}
              </span>
              <span className="text-xs text-muted-foreground">/ 100</span>
            </div>
          </div>

          {/* Score breakdown */}
          <div className="flex-1 space-y-2">
            <ScoreBar
              label="Commits"
              value={shipScore.breakdown.commits}
              max={25}
              color="from-purple-500 to-blue-500"
            />
            <ScoreBar
              label="Launches"
              value={shipScore.breakdown.launches}
              max={25}
              color="from-blue-500 to-cyan-500"
            />
            <ScoreBar
              label="Revenue"
              value={shipScore.breakdown.revenue}
              max={25}
              color="from-green-500 to-emerald-500"
            />
            <ScoreBar
              label="Growth"
              value={shipScore.breakdown.growth}
              max={25}
              color="from-orange-500 to-yellow-500"
            />
          </div>
        </div>

        {/* Bottom stats */}
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          {/* Streak */}
          <div className="flex items-center gap-2">
            {shipScore.streak.isOnFire && (
              <Flame className="h-5 w-5 text-orange-500 animate-fire-pulse" />
            )}
            <div>
              <div className="text-lg font-bold">
                {shipScore.streak.currentStreak} days
              </div>
              <div className="text-xs text-muted-foreground">Current streak</div>
            </div>
          </div>

          {/* Rank */}
          <div className="text-right">
            <div className="flex items-center gap-1 text-lg font-bold">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Top {rank.percentile}%
            </div>
            <div className="text-xs text-muted-foreground">
              #{rank.position.toLocaleString()} of {rank.totalUsers.toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ScoreBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const percentage = (value / max) * 100;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">
          {value}/{max}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-500", color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
