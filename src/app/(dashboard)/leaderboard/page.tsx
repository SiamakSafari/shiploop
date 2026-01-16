"use client";

import { Trophy, ArrowUp, TrendingUp, Target, Sparkles } from "lucide-react";
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
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-400" />
            <h1 className="text-3xl font-bold text-gradient">Leaderboard</h1>
          </div>
          <p className="text-white/60 text-lg">
            See how you rank among indie hackers worldwide.
          </p>
        </div>
        {currentUserEntry && (
          <button
            onClick={scrollToCurrentUser}
            className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-white/70 transition-all hover:bg-white/10 hover:text-white"
          >
            <ArrowUp className="h-4 w-4" />
            Jump to #{currentUserEntry.rank}
          </button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main leaderboard */}
        <div className="space-y-6 lg:col-span-2">
          {/* Podium */}
          <div className="glass hover-lift rounded-2xl overflow-hidden">
            <div className="text-center p-4 border-b border-white/10">
              <h3 className="flex items-center justify-center gap-2 text-lg font-semibold text-white">
                <Trophy className="h-5 w-5 text-yellow-400" />
                Top Shippers
              </h3>
            </div>
            <div className="p-6">
              <Podium top3={top3} />
            </div>
          </div>

          {/* Full rankings */}
          <div className="glass hover-lift rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h3 className="flex items-center gap-2 text-base font-semibold text-white">
                <Sparkles className="h-4 w-4 text-purple-400" />
                All Rankings
              </h3>
            </div>
            <div className="p-4">
              <RankingsTable entries={mockLeaderboard} />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Your stats */}
          {user && currentUserEntry && (
            <div id="current-user" className="glass hover-lift rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <h3 className="flex items-center gap-2 text-base font-semibold text-white">
                  <Target className="h-4 w-4 text-cyan-400" />
                  Your Ranking
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                  <span className="text-white/60">Position</span>
                  <span className="text-2xl font-bold text-gradient">
                    #{currentUserEntry.rank}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                  <span className="text-white/60">Percentile</span>
                  <span className="text-lg font-semibold text-purple-400">
                    Top {user.rank.percentile}%
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                  <span className="text-white/60">Movement</span>
                  <span className="flex items-center gap-1 text-lg font-semibold text-emerald-400">
                    <TrendingUp className="h-4 w-4" />
                    +{currentUserEntry.change} positions
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Share card */}
          <ShareCard />
        </div>
      </div>
    </div>
  );
}
