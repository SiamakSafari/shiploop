"use client";

import { TrendingUp, TrendingDown, Minus, Flame } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatCurrency } from "@/lib/utils";
import { LeaderboardEntry } from "@/types";

interface RankingsTableProps {
  entries: LeaderboardEntry[];
  onSelectUser?: (userId: string) => void;
}

export function RankingsTable({ entries, onSelectUser }: RankingsTableProps) {
  return (
    <ScrollArea className="h-[500px]">
      <div className="space-y-2">
        {entries.map((entry) => {
          const ChangeIcon =
            entry.change === 0
              ? Minus
              : entry.change > 0
              ? TrendingUp
              : TrendingDown;
          const changeColor =
            entry.change === 0
              ? "text-muted-foreground"
              : entry.change > 0
              ? "text-[#6BBF8A]"
              : "text-red-500";

          return (
            <div
              key={entry.user.id}
              className={cn(
                "flex items-center gap-4 rounded-lg border border-border p-3 transition-colors",
                entry.isCurrentUser && "border-primary bg-primary/5",
                "hover:bg-muted/50 cursor-pointer"
              )}
              onClick={() => onSelectUser?.(entry.user.id)}
            >
              {/* Rank */}
              <div className="w-8 text-center">
                <span
                  className={cn(
                    "text-lg font-bold",
                    entry.rank <= 3 && "text-primary"
                  )}
                >
                  {entry.rank}
                </span>
              </div>

              {/* Change indicator */}
              <div className={cn("w-6", changeColor)}>
                <ChangeIcon className="h-4 w-4" />
              </div>

              {/* User */}
              <div className="flex flex-1 items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                  <AvatarFallback>
                    {entry.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{entry.user.name}</span>
                    {entry.isCurrentUser && (
                      <span className="rounded bg-primary/20 px-1.5 py-0.5 text-[10px] text-primary">
                        You
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    @{entry.user.username}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">
                    {entry.shipScore}
                  </div>
                  <div className="text-xs text-muted-foreground">Score</div>
                </div>
                <div className="flex items-center gap-1 text-right">
                  <div>
                    <div className="flex items-center gap-1 text-lg font-bold">
                      {entry.streak >= 7 && (
                        <Flame className="h-4 w-4 text-[#E8945A]" />
                      )}
                      {entry.streak}d
                    </div>
                    <div className="text-xs text-muted-foreground">Streak</div>
                  </div>
                </div>
                <div className="w-20 text-right">
                  <div className="text-lg font-bold text-[#6BBF8A]">
                    {formatCurrency(entry.mrr)}
                  </div>
                  <div className="text-xs text-muted-foreground">MRR</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
