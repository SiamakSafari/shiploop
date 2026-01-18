"use client";

import { cn } from "@/lib/utils";
import { badgeTierConfig, badgeCategoryConfig, type BadgeTier, type BadgeCategory } from "@/lib/design-system";
import { Lock, Sparkles, Check } from "lucide-react";
import { Icon } from "@/components/ui/icon";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  tier: BadgeTier;
  category: BadgeCategory;
  unlocked: boolean;
  progress?: number; // 0-100
  unlockedAt?: Date;
}

interface AchievementBadgeProps {
  badge: Badge;
  size?: "sm" | "md" | "lg";
  showProgress?: boolean;
  className?: string;
}

export function AchievementBadge({
  badge,
  size = "md",
  showProgress = true,
  className,
}: AchievementBadgeProps) {
  const tierConfig = badgeTierConfig[badge.tier];
  const categoryConfig = badgeCategoryConfig[badge.category];

  const sizeClasses = {
    sm: "w-16 h-16 text-2xl",
    md: "w-20 h-20 text-3xl",
    lg: "w-24 h-24 text-4xl",
  };

  const circleRadius = size === "sm" ? 30 : size === "md" ? 38 : 46;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * circleRadius;
  const progressOffset = circumference - ((badge.progress || 0) / 100) * circumference;

  return (
    <div className={cn("group relative", className)}>
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full transition-all duration-300",
          sizeClasses[size],
          badge.unlocked
            ? "shape-hexagon cursor-pointer hover:scale-110 animate-scale-pop"
            : "opacity-40 grayscale"
        )}
      >
        {/* Background with tier gradient */}
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-gradient-to-br",
            tierConfig.gradient,
            badge.unlocked && "animate-glow-pulse-rainbow"
          )}
          style={badge.unlocked ? {
            boxShadow: `0 0 20px ${tierConfig.glow}`,
          } : undefined}
        />

        {/* Category accent ring */}
        {badge.unlocked && (
          <div
            className={cn(
              "absolute inset-[-4px] rounded-full bg-gradient-to-br opacity-50 blur-sm",
              categoryConfig.gradient
            )}
          />
        )}

        {/* Icon */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          {badge.unlocked ? (
            <Icon
              name={badge.icon}
              size={size === "sm" ? 24 : size === "md" ? 32 : 40}
              className="text-white"
            />
          ) : (
            <Lock className={cn(
              "text-white/40",
              size === "sm" ? "h-6 w-6" : size === "md" ? "h-8 w-8" : "h-10 w-10"
            )} />
          )}
        </div>

        {/* Progress ring for incomplete badges */}
        {!badge.unlocked && showProgress && badge.progress !== undefined && badge.progress > 0 && (
          <svg
            className="absolute inset-0 -rotate-90 transform"
            width="100%"
            height="100%"
            viewBox={`0 0 ${(circleRadius + strokeWidth) * 2} ${(circleRadius + strokeWidth) * 2}`}
          >
            {/* Background circle */}
            <circle
              cx={circleRadius + strokeWidth}
              cy={circleRadius + strokeWidth}
              r={circleRadius}
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth={strokeWidth}
            />
            {/* Progress circle */}
            <circle
              cx={circleRadius + strokeWidth}
              cy={circleRadius + strokeWidth}
              r={circleRadius}
              fill="none"
              stroke={categoryConfig.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={progressOffset}
              className="transition-all duration-500"
            />
          </svg>
        )}

        {/* Sparkle effect for newly unlocked */}
        {badge.unlocked && badge.unlockedAt && (
          <div className="absolute -top-1 -right-1">
            <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
          </div>
        )}
      </div>

      {/* Tooltip on hover */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 animate-scale-pop">
        <div className="glass rounded-lg p-3 shadow-xl border border-white/20 min-w-[200px]">
          <div className="flex items-center gap-2 mb-1">
            <Icon name={badge.icon} size={18} className="text-white" />
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-white font-fredoka">{badge.name}</span>
              <span className="text-xs">{tierConfig.icon}</span>
            </div>
          </div>
          <p className="text-xs text-white/60 mb-2">{badge.description}</p>

          {badge.unlocked ? (
            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
              <Check className="h-3 w-3" />
              <span className="font-semibold">Unlocked</span>
              {badge.unlockedAt && (
                <span className="text-white/40">
                  {new Date(badge.unlockedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          ) : (
            <div className="space-y-1">
              {badge.progress !== undefined && (
                <>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/50">Progress</span>
                    <span className="font-semibold text-white">{badge.progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={cn("h-full bg-gradient-to-r transition-all", categoryConfig.gradient)}
                      style={{ width: `${badge.progress}%` }}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        {/* Tooltip arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px]">
          <div className="w-2 h-2 bg-white/10 backdrop-blur-xl rotate-45 border-r border-b border-white/20" />
        </div>
      </div>
    </div>
  );
}
