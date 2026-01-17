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
            <Trophy className="h-6 w-6 text-amber-500" />
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Leaderboard</h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            See how you rank among indie hackers worldwide.
          </p>
        </div>
        {currentUserEntry && (
          <button
            onClick={scrollToCurrentUser}
            className="flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-2 text-slate-600 dark:text-slate-300 transition-all hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-50 border border-slate-200 dark:border-slate-700"
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
            <div className="text-center p-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="flex items-center justify-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-50">
                <Trophy className="h-5 w-5 text-amber-500" />
                Top Shippers
              </h3>
            </div>
            <div className="p-6">
              <Podium top3={top3} />
            </div>
          </div>

          {/* Full rankings */}
          <div className="glass hover-lift rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-slate-50">
                <Sparkles className="h-4 w-4 text-primary" />
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
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-slate-50">
                  <Target className="h-4 w-4 text-primary" />
                  Your Ranking
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400">Position</span>
                  <span className="text-2xl font-bold text-primary font-space-grotesk">
                    #{currentUserEntry.rank}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400">Percentile</span>
                  <span className="text-lg font-semibold text-primary">
                    Top {user.rank.percentile}%
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400">Movement</span>
                  <span className="flex items-center gap-1 text-lg font-semibold text-emerald-600">
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
