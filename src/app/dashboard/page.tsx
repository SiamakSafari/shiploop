"use client";

import { DollarSign, Users, Trophy, Sparkles } from "lucide-react";
import {
  ShipScoreCard,
  StatCard,
  StreakCounter,
  ActivityFeed,
} from "@/components/dashboard";
import { LeaderboardWidget } from "@/components/leaderboard";
import { useAppStore, useProjectsStore } from "@/stores";
import { mockAnalytics, mockLeaderboard } from "@/data";

export default function DashboardPage() {
  const user = useAppStore((state) => state.user);
  const projects = useProjectsStore((state) => state.projects) ?? [];

  // Calculate aggregate stats
  const totalMRR = projects.reduce((sum, p) => sum + p.metrics.mrr, 0);
  const totalUsers = projects.reduce((sum, p) => sum + p.metrics.users, 0);
  // Get current user's leaderboard entry
  const currentUserEntry = mockLeaderboard.find((e) => e.isCurrentUser);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-foreground" />
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.name.split(" ")[0]}
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Here&apos;s how your indie hacker journey is going.
        </p>
      </div>

      {/* Stats row - Bento grid style */}
      <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total MRR"
          value={totalMRR}
          icon={DollarSign}
          format="currency"
          trend={mockAnalytics.overview.avgGrowth}
          accentColor="dark"
        />
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={Users}
          format="number"
          trend={8.2}
          accentColor="gray1"
        />
        <StatCard
          title="Global Rank"
          value={user?.rank.position || 0}
          icon={Trophy}
          format="number"
          trend={user?.rank.percentile ? -(100 - user.rank.percentile) / 10 : 0}
          accentColor="gray2"
        />
        <StatCard
          title="Ship Score"
          value={user?.shipScore.total || 0}
          icon={Sparkles}
          format="number"
          trend={user?.shipScore.total ? (user.shipScore.total / 10) : 0}
          accentColor="dark"
        />
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 items-start">
        <ShipScoreCard />
        <ActivityFeed className="xl:row-span-2" />
        <StreakCounter />
        <LeaderboardWidget
          entries={mockLeaderboard}
          currentUserEntry={currentUserEntry}
        />
      </div>
    </div>
  );
}
