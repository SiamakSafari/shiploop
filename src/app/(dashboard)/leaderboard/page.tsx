"use client";

import { Trophy, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Podium, RankingsTable, ShareCard } from "@/components/leaderboard";
import { mockLeaderboard } from "@/data";
import { useAppStore } from "@/stores";

export default function LeaderboardPage() {
  const user = useAppStore((state) => state.user);
  const currentUserEntry = mockLeaderboard.find((e) => e.isCurrentUser);

  // Get top 3 for podium
  const top3 = mockLeaderboard.filter((e) => e.rank <= 3);

  // Scroll to current user
  const scrollToCurrentUser = () => {
    const element = document.getElementById("current-user");
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">
            See how you rank among indie hackers worldwide.
          </p>
        </div>
        {currentUserEntry && (
          <Button variant="outline" onClick={scrollToCurrentUser} className="gap-2">
            <ArrowUp className="h-4 w-4" />
            Jump to #{currentUserEntry.rank}
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main leaderboard */}
        <div className="space-y-6 lg:col-span-2">
          {/* Podium */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Top Shippers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Podium top3={top3} />
            </CardContent>
          </Card>

          {/* Full rankings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">All Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <RankingsTable entries={mockLeaderboard} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Your stats */}
          {user && currentUserEntry && (
            <Card id="current-user">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Your Ranking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Position</span>
                  <span className="text-2xl font-bold">
                    #{currentUserEntry.rank}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Percentile</span>
                  <span className="text-lg font-semibold text-primary">
                    Top {user.rank.percentile}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Movement</span>
                  <span className="text-lg font-semibold text-green-500">
                    +{currentUserEntry.change} positions
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Share card */}
          <ShareCard />
        </div>
      </div>
    </div>
  );
}
