"use client";

import { Flame, TrendingUp, Trophy, Sparkles } from "lucide-react";
import { useAppStore } from "@/stores";
import { cn, getTierColor } from "@/lib/utils";

export function ShipScoreCard() {
  const user = useAppStore((state) => state.user);

  if (!user) return null;

  const { shipScore, rank } = user;
  const circumference = 2 * Math.PI * 52; // radius = 52
  const progress = (shipScore.total / 100) * circumference;
  const offset = circumference - progress;

  return (
    <div className="glass hover-lift animate-glow-pulse-rainbow relative overflow-hidden rounded-2xl p-6">
      {/* Animated gradient border */}
      <div className="gradient-border" />

      {/* Inner glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5" />

      {/* Header */}
      <div className="relative mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
          <h3 className="text-lg font-semibold text-gradient">🚀 Ship Score</h3>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-sm hover-wiggle cursor-default border border-white/10">
          <Trophy className={cn("h-4 w-4", getTierColor(rank.tier))} />
          <span className={getTierColor(rank.tier)}>
            {rank.tier.charAt(0).toUpperCase() + rank.tier.slice(1)}
          </span>
        </div>
      </div>

      <div className="relative flex items-center gap-8">
        {/* Circular progress with glow */}
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full blur-xl bg-gradient-to-r from-purple-500/30 to-cyan-500/30" />

          <svg className="h-36 w-36 -rotate-90 transform relative z-10">
            {/* Background circle */}
            <circle
              cx="72"
              cy="72"
              r="52"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-white/10"
            />
            {/* Glow behind progress */}
            <circle
              cx="72"
              cy="72"
              r="52"
              fill="none"
              stroke="url(#scoreGlow)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="blur-sm opacity-50"
            />
            {/* Progress circle */}
            <circle
              cx="72"
              cy="72"
              r="52"
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-1000 ease-out drop-shadow-lg"
            />
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient id="scoreGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Score number in center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-gradient animate-score-up font-space-grotesk tracking-tight">
              {shipScore.total}
            </span>
            <span className="text-xs text-white/50 font-medium">/ 100</span>
          </div>
        </div>

        {/* Score breakdown */}
        <div className="flex-1 space-y-3">
          <ScoreBar
            label="Commits"
            value={shipScore.breakdown.commits}
            max={25}
            gradient="from-purple-500 via-purple-400 to-fuchsia-500"
          />
          <ScoreBar
            label="Launches"
            value={shipScore.breakdown.launches}
            max={25}
            gradient="from-cyan-500 via-sky-400 to-blue-500"
          />
          <ScoreBar
            label="Revenue"
            value={shipScore.breakdown.revenue}
            max={25}
            gradient="from-emerald-500 via-green-400 to-teal-500"
          />
          <ScoreBar
            label="Growth"
            value={shipScore.breakdown.growth}
            max={25}
            gradient="from-orange-500 via-amber-400 to-yellow-500"
          />
        </div>
      </div>

      {/* Bottom stats */}
      <div className="relative mt-6 flex items-center justify-between rounded-xl bg-white/5 p-4">
        {/* Streak */}
        <div className="flex items-center gap-3">
          {shipScore.streak.isOnFire && (
            <div className="relative">
              <Flame className="h-6 w-6 text-orange-500 animate-fire-pulse" />
              <div className="absolute inset-0 blur-md bg-orange-500/50 animate-fire-pulse" />
            </div>
          )}
          <div>
            <div className="text-xl font-bold text-gradient-fire">
              {shipScore.streak.currentStreak} days
            </div>
            <div className="text-xs text-white/50">Current streak</div>
          </div>
        </div>

        {/* Rank */}
        <div className="text-right">
          <div className="flex items-center justify-end gap-1.5 text-xl font-bold">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
            <span className="text-gradient">Top {rank.percentile}%</span>
          </div>
          <div className="text-xs text-white/50">
            #{rank.position.toLocaleString()} of {rank.totalUsers.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreBar({
  label,
  value,
  max,
  gradient,
}: {
  label: string;
  value: number;
  max: number;
  gradient: string;
}) {
  const percentage = (value / max) * 100;

  return (
    <div className="space-y-1.5 group">
      <div className="flex justify-between text-xs">
        <span className="text-white/60 font-medium">{label}</span>
        <span className="font-semibold text-white/80 font-space-grotesk">
          {value}/{max}
        </span>
      </div>
      <div className="relative h-2.5 overflow-hidden rounded-full bg-white/10 border border-white/5">
        {/* Glow effect behind bar */}
        <div
          className={cn("absolute inset-0 h-full rounded-full bg-gradient-to-r blur-sm opacity-50", gradient)}
          style={{ width: `${percentage}%` }}
        />
        {/* Actual bar with shimmer */}
        <div
          className={cn(
            "relative h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out overflow-hidden",
            gradient
          )}
          style={{ width: `${percentage}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
