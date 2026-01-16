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
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Track your revenue, traffic, and growth across all products.
        </p>
      </div>

      {/* Overview stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total MRR"
          value={overview.totalMRR}
          icon={DollarSign}
          format="currency"
          trend={overview.avgGrowth}
        />
        <StatCard
          title="Total Users"
          value={overview.totalUsers}
          icon={Users}
          format="number"
          trend={8.2}
        />
        <StatCard
          title="Total Revenue"
          value={revenue.total}
          icon={BarChart3}
          format="currency"
          trend={revenue.growth}
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
