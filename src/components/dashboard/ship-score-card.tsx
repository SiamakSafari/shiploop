"use client";

import { useState, useEffect } from "react";
import { Flame, TrendingUp, Trophy, Sparkles } from "lucide-react";
import { useAppStore } from "@/stores";
import { cn, getTierColor } from "@/lib/utils";
import { Heading, Caption, Micro, NumberDisplay } from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { TrophyAnimation, FireAnimation } from "@/components/lottie";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!user) return <ShipScoreCardSkeleton />;

  const { shipScore, rank } = user;
  const circumference = 2 * Math.PI * 52; // radius = 52
  const progress = (shipScore.total / 100) * circumference;
  const offset = circumference - progress;

  return (
    <div className="glass hover-lift relative overflow-hidden rounded-2xl p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          <Heading level={3} className="text-primary">Ship Score</Heading>
        </div>
        <Caption as="div" className="flex items-center gap-1.5 rounded-full bg-gray-900 dark:bg-gray-100 px-3 py-1.5 hover-wiggle cursor-default shadow-sm">
          {mounted ? <TrophyAnimation size="xs" /> : <Trophy className="h-4 w-4 text-white dark:text-gray-900" />}
          <span className="text-white dark:text-gray-900 font-semibold">
            {rank.tier.charAt(0).toUpperCase() + rank.tier.slice(1)}
          </span>
        </Caption>
      </div>

      <div className="relative flex items-center gap-8">
        {/* Circular progress */}
        <div className="relative">
          <svg className="h-36 w-36 -rotate-90 transform">
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
            {/* Progress circle with SwingAI gradient */}
            <defs>
              <linearGradient id="swingai-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E8945A" />
                <stop offset="60%" stopColor="#7CB4C4" />
                <stop offset="100%" stopColor="#4AABA8" />
              </linearGradient>
            </defs>
            <circle
              cx="72"
              cy="72"
              r="52"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              stroke="url(#swingai-gradient)"
              className="transition-all duration-700 ease-out"
            />
          </svg>

          {/* Score number in center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <NumberDisplay variant="large" className="text-gray-900 dark:text-gray-50 animate-score-up">
              {shipScore.total}
            </NumberDisplay>
            <Micro className="text-gray-500 dark:text-gray-400 font-medium">/ 100</Micro>
          </div>
        </div>

        {/* Score breakdown */}
        <div className="flex-1 space-y-3">
          <ScoreBar
            label="Commits"
            value={shipScore.breakdown.commits}
            max={25}
            color="#171717"
            darkColor="#e5e5e5"
          />
          <ScoreBar
            label="Launches"
            value={shipScore.breakdown.launches}
            max={25}
            color="#404040"
            darkColor="#d4d4d4"
          />
          <ScoreBar
            label="Revenue"
            value={shipScore.breakdown.revenue}
            max={25}
            color="#171717"
            darkColor="#e5e5e5"
          />
          <ScoreBar
            label="Growth"
            value={shipScore.breakdown.growth}
            max={25}
            color="#525252"
            darkColor="#a3a3a3"
          />
        </div>
      </div>

      {/* Bottom stats */}
      <div className="mt-6 flex items-center justify-between rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-200 dark:border-gray-700">
        {/* Streak */}
        <div className="flex items-center gap-3">
          {shipScore.streak.isOnFire ? (
            mounted ? <FireAnimation size="sm" /> : <Flame className="h-6 w-6 text-primary" />
          ) : (
            <Flame className="h-6 w-6 text-gray-400" />
          )}
          <div>
            <NumberDisplay variant="small" className="text-primary">
              {shipScore.streak.currentStreak} days
            </NumberDisplay>
            <Micro className="text-gray-500">Current streak</Micro>
          </div>
        </div>

        {/* Rank */}
        <div className="text-right">
          <NumberDisplay variant="small" as="div" className="flex items-center justify-end gap-1.5">
            <TrendingUp className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            <span className="text-primary">Top {rank.percentile}%</span>
          </NumberDisplay>
          <Micro className="text-gray-500">
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
}: {
  label: string;
  value: number;
  max: number;
  color?: string;
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
      <div className="relative h-2.5 overflow-hidden rounded-full bg-[#2E3546] dark:bg-[#2E3546] border border-[#383F52]">
        {/* SwingAI gradient bar */}
        <div
          className="relative h-full rounded-full transition-all duration-700 ease-out overflow-hidden"
          style={{
            width: `${percentage}%`,
            background: 'linear-gradient(90deg, #E8945A 0%, #7CB4C4 60%, #4AABA8 100%)'
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
