"use client";

import { DollarSign, Users, Zap, Trophy } from "lucide-react";
import {
  ShipScoreCard,
  StatCard,
  StreakCounter,
  ActivityFeed,
  QuickActions,
  ProjectProgress,
  LaunchStatus,
} from "@/components/dashboard";
import { useAppStore, useProjectsStore } from "@/stores";
import { mockAnalytics } from "@/data";

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

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back, {user?.name.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s how your indie hacker journey is going.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total MRR"
          value={totalMRR}
          icon={DollarSign}
          format="currency"
          trend={mockAnalytics.overview.avgGrowth}
        />
        <StatCard
          title="Total Users"
          value={totalUsers}
          icon={Users}
          format="number"
          trend={8.2}
        />
        <StatCard
          title="Ship Velocity"
          value={avgVelocity}
          icon={Zap}
          format="number"
          trend={12.5}
        />
        <StatCard
          title="Global Rank"
          value={user?.rank.position || 0}
          icon={Trophy}
          format="number"
          trend={user?.rank.percentile ? -(100 - user.rank.percentile) / 10 : 0}
        />
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column - Ship Score and Streak */}
        <div className="space-y-6 lg:col-span-2">
          <ShipScoreCard />
          <StreakCounter />

          {/* Projects and Launch Status */}
          <div className="grid gap-6 md:grid-cols-2">
            <ProjectProgress />
            <LaunchStatus />
          </div>
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
