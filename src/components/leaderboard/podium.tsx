"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, formatCurrency } from "@/lib/utils";
import { LeaderboardEntry } from "@/types";

interface PodiumProps {
  top3: LeaderboardEntry[];
}

export function Podium({ top3 }: PodiumProps) {
  // Reorder: 2nd, 1st, 3rd for podium display
  const [first, second, third] = top3;
  const podiumOrder = [second, first, third].filter(Boolean);

  const getPodiumStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          height: "h-32",
          gradient: "from-yellow-500/20 via-yellow-500/10 to-transparent",
          medal: "🥇",
          ring: "ring-yellow-500",
        };
      case 2:
        return {
          height: "h-24",
          gradient: "from-gray-400/20 via-gray-400/10 to-transparent",
          medal: "🥈",
          ring: "ring-gray-400",
        };
      case 3:
        return {
          height: "h-20",
          gradient: "from-orange-600/20 via-orange-600/10 to-transparent",
          medal: "🥉",
          ring: "ring-orange-600",
        };
      default:
        return {
          height: "h-16",
          gradient: "from-muted/20 to-transparent",
          medal: "",
          ring: "ring-muted",
        };
    }
  };

  return (
    <div className="flex items-end justify-center gap-4">
      {podiumOrder.map((entry, index) => {
        if (!entry) return null;
        const style = getPodiumStyle(entry.rank);
        const isFirst = entry.rank === 1;

        return (
          <div key={entry.user.id} className="flex flex-col items-center gap-2">
            {/* User info */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <Avatar
                  className={cn(
                    "ring-2",
                    style.ring,
                    isFirst ? "h-16 w-16" : "h-12 w-12"
                  )}
                >
                  <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                  <AvatarFallback>
                    {entry.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute -bottom-1 -right-1 text-lg">
                  {style.medal}
                </span>
              </div>
              <span
                className={cn(
                  "mt-2 font-medium",
                  isFirst ? "text-base" : "text-sm"
                )}
              >
                {entry.user.name}
              </span>
              <span className="text-xs text-muted-foreground">
                @{entry.user.username}
              </span>
              <div className="mt-1 flex items-center gap-2 text-xs">
                <span className="font-bold text-primary">{entry.shipScore}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-green-500">
                  {formatCurrency(entry.mrr)}
                </span>
              </div>
            </div>

            {/* Podium block */}
            <div
              className={cn(
                "w-24 rounded-t-lg bg-gradient-to-t",
                style.height,
                style.gradient
              )}
            />
          </div>
        );
      })}
    </div>
  );
}
