"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { LeaderboardEntry } from "@/types";
import { TrophyAnimation } from "@/components/lottie";

interface LeaderboardWidgetProps {
  entries: LeaderboardEntry[];
  currentUserEntry?: LeaderboardEntry;
}

export function LeaderboardWidget({ entries, currentUserEntry }: LeaderboardWidgetProps) {
  // Get top 5 entries
  const top5 = entries.filter(e => e.rank <= 5);

  return (
    <div className="glass hover-lift rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-gray-50">
          <TrophyAnimation size="sm" />
          Top Shippers
        </h3>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          Global Rankings
        </span>
      </div>

      <div className="p-3 space-y-1.5 max-w-md">
        {/* Top 5 */}
        {top5.map((entry) => {
          const ChangeIcon =
            entry.change === 0
              ? Minus
              : entry.change > 0
              ? TrendingUp
              : TrendingDown;
          const changeColor =
            entry.change === 0
              ? "text-gray-400 dark:text-gray-500"
              : entry.change > 0
              ? "text-emerald-400"
              : "text-red-500";

          return (
            <div
              key={entry.user.id}
              className={cn(
                "flex items-center gap-3 rounded-xl p-2 transition-colors",
                entry.isCurrentUser && "bg-primary/10 border border-primary/30",
                "hover:bg-gray-100 dark:hover:bg-gray-800/50"
              )}
            >
              {/* Rank */}
              <div className="w-6 text-center">
                <span className={cn(
                  "text-sm font-bold",
                  entry.rank === 1 && "text-yellow-500",
                  entry.rank === 2 && "text-gray-400",
                  entry.rank === 3 && "text-orange-400"
                )}>
                  {entry.rank}
                </span>
              </div>

              {/* User */}
              <Avatar className="h-7 w-7">
                <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                <AvatarFallback className="text-xs">
                  {entry.user.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-50 truncate">
                    {entry.user.name}
                  </span>
                  {entry.isCurrentUser && (
                    <span className="rounded bg-primary/20 px-1 py-0.5 text-[9px] font-medium text-primary">
                      You
                    </span>
                  )}
                </div>
              </div>

              {/* Score */}
              <div className="text-right">
                <span className="text-sm font-bold text-primary font-space-grotesk">
                  {entry.shipScore}
                </span>
              </div>

              {/* Change */}
              <div className={cn("w-4", changeColor)}>
                <ChangeIcon className="h-3 w-3" />
              </div>
            </div>
          );
        })}

        {/* Current user's position (if not in top 5) */}
        {currentUserEntry && currentUserEntry.rank > 5 && (
          <>
            <div className="flex items-center justify-center py-1">
              <div className="flex gap-1">
                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl p-2 bg-primary/10 border border-primary/30">
              <div className="w-6 text-center">
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                  {currentUserEntry.rank}
                </span>
              </div>
              <Avatar className="h-7 w-7">
                <AvatarImage src={currentUserEntry.user.avatar} alt={currentUserEntry.user.name} />
                <AvatarFallback className="text-xs">
                  {currentUserEntry.user.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-50 truncate">
                    {currentUserEntry.user.name}
                  </span>
                  <span className="rounded bg-primary/20 px-1 py-0.5 text-[9px] font-medium text-primary">
                    You
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-primary font-space-grotesk">
                  {currentUserEntry.shipScore}
                </span>
              </div>
              <div className={cn(
                "w-4",
                currentUserEntry.change === 0
                  ? "text-gray-400 dark:text-gray-500"
                  : currentUserEntry.change > 0
                  ? "text-emerald-400"
                  : "text-red-500"
              )}>
                {currentUserEntry.change === 0 ? (
                  <Minus className="h-3 w-3" />
                ) : currentUserEntry.change > 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
