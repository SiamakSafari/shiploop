"use client";

import { Medal, TrendingUp, Flame, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { topLeaderboard } from "@/data/landing-data";
import { cn } from "@/lib/utils";

export function LeaderboardPreview() {
  const getPodiumStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          height: "h-32",
          gradient: "from-[#D4AF37]/20 via-[#D4AF37]/10 to-transparent",
          medalColor: "text-[#D4AF37]",
          ring: "ring-[#D4AF37]",
          bg: "bg-[#D4AF37]/10",
        };
      case 2:
        return {
          height: "h-24",
          gradient: "from-gray-400/20 via-gray-400/10 to-transparent",
          medalColor: "text-gray-400",
          ring: "ring-gray-400",
          bg: "bg-gray-400/10",
        };
      case 3:
        return {
          height: "h-20",
          gradient: "from-[#E8945A]/20 via-[#E8945A]/10 to-transparent",
          medalColor: "text-[#E8945A]",
          ring: "ring-[#E8945A]",
          bg: "bg-[#E8945A]/10",
        };
      default:
        return {
          height: "h-16",
          gradient: "from-muted/20 to-transparent",
          medalColor: "text-muted-foreground",
          ring: "ring-muted",
          bg: "bg-muted/10",
        };
    }
  };

  // Reorder for podium display: 2nd, 1st, 3rd
  const [first, second, third] = topLeaderboard;
  const podiumOrder = [second, first, third];

  return (
    <section className="py-24 relative overflow-hidden bg-muted/30">
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-grid opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm font-medium text-primary">
              Global Leaderboard
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            Compete with the Best
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how you stack up against thousands of indie hackers worldwide.
            Your position on the leaderboard could be here.
          </p>
        </div>

        {/* Podium */}
        <div className="flex items-end justify-center gap-4 md:gap-8 mb-12">
          {podiumOrder.map((entry) => {
            const style = getPodiumStyle(entry.rank);
            const isFirst = entry.rank === 1;

            return (
              <div
                key={entry.username}
                className="flex flex-col items-center gap-2 animate-card-enter"
                style={{ animationDelay: `${entry.rank * 100}ms` }}
              >
                {/* User info */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <Avatar
                      className={cn(
                        "ring-2",
                        style.ring,
                        isFirst ? "h-16 w-16 md:h-20 md:w-20" : "h-12 w-12 md:h-16 md:w-16"
                      )}
                    >
                      <AvatarImage src={entry.avatar} alt={entry.name} />
                      <AvatarFallback>
                        {entry.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    {entry.rank <= 3 && (
                      <span className={cn("absolute -bottom-1 -right-1", style.medalColor)}>
                        <Medal className="h-5 w-5" />
                      </span>
                    )}
                  </div>

                  <span className={cn("mt-2 font-medium text-foreground", isFirst ? "text-base" : "text-sm")}>
                    {entry.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    @{entry.username}
                  </span>

                  {/* Stats */}
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <span className="font-bold text-primary">{entry.shipScore}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-[#6BBF8A] font-medium">
                      ${(entry.mrr / 1000).toFixed(1)}k
                    </span>
                  </div>

                  {/* Streak badge */}
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Flame className="h-3 w-3 text-[#E8945A]" />
                    <span>{entry.streak} days</span>
                  </div>
                </div>

                {/* Podium block */}
                <div
                  className={cn(
                    "w-20 md:w-28 rounded-t-lg bg-gradient-to-t",
                    style.height,
                    style.gradient
                  )}
                />
              </div>
            );
          })}
        </div>

        {/* Your position CTA */}
        <div className="glass-premium rounded-2xl p-6 md:p-8 max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold text-foreground">
              Your Position Could Be Here
            </span>
          </div>
          <p className="text-muted-foreground mb-6">
            Join the leaderboard and see how you rank against other indie hackers.
            Track your progress, celebrate wins, and climb to the top.
          </p>
          <a href="#waitlist">
            <Button size="lg" className="gap-2">
              Join the Competition
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
