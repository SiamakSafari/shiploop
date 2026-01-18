"use client";

import { DollarSign, Users, Zap, Trophy, Sparkles } from "lucide-react";
import {
  ShipScoreCard,
  StatCard,
  StreakCounter,
  ActivityFeed,
  QuickActions,
} from "@/components/dashboard";
import { LeaderboardWidget } from "@/components/leaderboard";
import { useAppStore, useProjectsStore } from "@/stores";
import { mockAnalytics, mockLeaderboard } from "@/data";

export default function DashboardPage() {
  const user = useAppStore((state) => state.user);
  const projects = useProjectsStore((state) => state.projects);

  // Calculate aggregate stats
  const totalMRR = projects.reduce((sum, p) => sum + p.metrics.mrr, 0);
  const totalUsers = projects.reduce((sum, p) => sum + p.metrics.users, 0);
  const avgVelocity =
    projects.length > 0
      ? Math.round(
          projects.reduce((sum, p) => sum + p.metrics.velocity, 0) /
            projects.length
        )
      : 0;

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
      <div className="bento-grid">
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
          title="Ship Velocity"
          value={avgVelocity}
          icon={Zap}
          format="number"
          trend={12.5}
          accentColor="dark"
        />
        <StatCard
          title="Global Rank"
          value={user?.rank.position || 0}
          icon={Trophy}
          format="number"
          trend={user?.rank.percentile ? -(100 - user.rank.percentile) / 10 : 0}
          accentColor="gray2"
        />
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column - Ship Score, Streak, and Leaderboard */}
        <div className="space-y-6 lg:col-span-2">
          <ShipScoreCard />
          <StreakCounter />

          {/* Leaderboard Widget */}
          <LeaderboardWidget
            entries={mockLeaderboard}
            currentUserEntry={currentUserEntry}
          />
        </div>

        {/* Right column - Activity and Actions */}
        <div className="space-y-6">
          <QuickActions />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
