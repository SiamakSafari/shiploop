"use client";

import { Flame, TrendingUp, Trophy, Sparkles } from "lucide-react";
import { useAnimatedCounter } from "@/hooks";
import { Micro } from "@/components/ui/typography";

export function ShipScorePreview() {
  const demoScore = 78;
  const { value: animatedScore } = useAnimatedCounter(demoScore, {
    duration: 2000,
    delay: 500,
  });

  const circumference = 2 * Math.PI * 52;
  const progress = (animatedScore / 100) * circumference;
  const offset = circumference - progress;

  const breakdown = {
    commits: 21,
    launches: 18,
    revenue: 22,
    growth: 17,
  };

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
          <span>Gold</span>
        </div>
      </div>

      <div className="relative flex items-center gap-8">
        {/* Circular progress with glow */}
        <div className="score-ring-container">
          <div className="score-ring-glow" />
          <svg className="h-36 w-36 -rotate-90 transform relative z-10">
            <circle
              cx="72"
              cy="72"
              r="52"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-gray-200 dark:text-gray-700"
            />
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
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <div className="text-5xl font-bold tracking-tight text-foreground number-display">
              {Math.round(animatedScore)}
            </div>
            <Micro className="text-muted-foreground font-medium">/ 100</Micro>
          </div>
        </div>

        {/* Score breakdown */}
        <div className="flex-1 space-y-3">
          <ScoreBar label="Commits" value={breakdown.commits} max={25} />
          <ScoreBar label="Launches" value={breakdown.launches} max={25} />
          <ScoreBar label="Revenue" value={breakdown.revenue} max={25} />
          <ScoreBar label="Growth" value={breakdown.growth} max={25} />
        </div>
      </div>

      {/* Bottom stats */}
      <div className="relative mt-6 flex items-center justify-between rounded-xl bg-gradient-to-r from-muted to-muted/50 p-4 border border-border overflow-hidden">
        <div className="relative flex items-center gap-3">
          <div className="streak-flame">
            <Flame className="h-6 w-6 text-primary streak-flame-icon" />
          </div>
          <div>
            <div className="text-xl font-bold text-primary number-display">
              47 days
            </div>
            <Micro className="text-muted-foreground">Current streak</Micro>
          </div>
        </div>
        <div className="relative text-right">
          <div className="flex items-center justify-end gap-1.5">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            <span className="text-xl font-bold text-primary number-display">Top 12%</span>
          </div>
          <Micro className="text-muted-foreground">
            #342 of 2,847
          </Micro>
        </div>
      </div>
    </div>
  );
}

function ScoreBar({ label, value, max }: { label: string; value: number; max: number }) {
  const percentage = (value / max) * 100;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between">
        <Micro className="text-gray-600 dark:text-gray-300 font-medium">{label}</Micro>
        <Micro className="font-semibold text-gray-700 dark:text-gray-200">
          {value}/{max}
        </Micro>
      </div>
      <div className="relative h-2.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
        <div
          className="relative h-full rounded-full bg-primary transition-all duration-700 ease-out overflow-hidden"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
