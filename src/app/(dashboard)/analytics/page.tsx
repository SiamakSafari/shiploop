"use client";

import { DollarSign, Users, TrendingUp, BarChart3 } from "lucide-react";
import { StatCard } from "@/components/dashboard";
import {
  RevenueChart,
  RevenueBreakdown,
  TrafficSources,
  AttributionCard,
} from "@/components/analytics";
import { mockAnalytics } from "@/data";

export default function AnalyticsPage() {
  const { revenue, traffic, overview } = mockAnalytics;

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Analytics</h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          Track your revenue, traffic, and growth across all products.
        </p>
      </div>

      {/* Overview stats */}
      <div className="bento-grid">
        <StatCard
          title="Total MRR"
          value={overview.totalMRR}
          icon={DollarSign}
          format="currency"
          trend={overview.avgGrowth}
          accentColor="teal"
        />
        <StatCard
          title="Total Users"
          value={overview.totalUsers}
          icon={Users}
          format="number"
          trend={8.2}
          accentColor="gray1"
        />
        <StatCard
          title="Total Revenue"
          value={revenue.total}
          icon={BarChart3}
          format="currency"
          trend={revenue.growth}
          accentColor="teal"
        />
        <StatCard
          title="Conversion Rate"
          value={
            traffic.totalConversions > 0
              ? (traffic.totalConversions / traffic.totalVisitors) * 100
              : 0
          }
          icon={TrendingUp}
          format="percent"
          trend={2.1}
          accentColor="gray2"
        />
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart data={revenue.timeline} />
        <RevenueBreakdown data={revenue.byProduct} />
      </div>

      {/* Traffic and attribution */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TrafficSources sources={traffic.sources} />
        </div>
        <AttributionCard sources={traffic.sources} />
      </div>
    </div>
  );
}
