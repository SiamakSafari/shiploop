"use client";

import { Share2, Download, Flame, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/stores";
import { getTierColor, formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function ShareCard() {
  const user = useAppStore((state) => state.user);

  if (!user) return null;

  const handleShare = () => {
    const text = `Ship Score: ${user.shipScore.total} 🚀
${user.shipScore.streak.currentStreak} day streak 🔥
Top ${user.rank.percentile}% of indie hackers

Track your shipping at ShipLoop.dev`;

    if (navigator.share) {
      navigator.share({
        title: "My Ship Score",
        text,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-base">
          Share Your Rank
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Preview card */}
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 via-background to-accent/20 p-6">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative flex items-center gap-4">
            <Avatar className="h-16 w-16 ring-2 ring-primary">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="font-bold">{user.name}</div>
              <div className="text-sm text-muted-foreground">
                @{user.username}
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold">{user.shipScore.total}</div>
              <div className="text-xs text-muted-foreground">Ship Score</div>
            </div>
          </div>

          <div className="relative mt-4 flex items-center justify-between border-t border-border pt-4">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="font-bold">{user.shipScore.streak.currentStreak}</span>
              <span className="text-sm text-muted-foreground">day streak</span>
            </div>

            <div className="flex items-center gap-2">
              <Trophy className={cn("h-5 w-5", getTierColor(user.rank.tier))} />
              <span className="font-bold">Top {user.rank.percentile}%</span>
            </div>
          </div>

          <div className="relative mt-4 text-center text-xs text-muted-foreground">
            ShipLoop.dev - The Indie Hacker OS
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
