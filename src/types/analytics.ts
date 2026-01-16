export interface AnalyticsData {
  revenue: RevenueData;
  traffic: TrafficData;
  overview: OverviewMetrics;
}

export interface RevenueData {
  total: number;
  byProduct: ProductRevenue[];
  timeline: TimelineDataPoint[];
  growth: number; // percentage vs last period
}

export interface ProductRevenue {
  productId: string;
  productName: string;
  revenue: number;
  percentage: number;
  color: string; // for chart
}

export interface TimelineDataPoint {
  date: string; // ISO date
  revenue: number;
  users?: number;
}

export interface TrafficData {
  sources: TrafficSource[];
  totalVisitors: number;
  totalConversions: number;
}

export interface TrafficSource {
  name: string;
  visitors: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
  trend: "up" | "down" | "stable";
}

export interface OverviewMetrics {
  totalMRR: number;
  totalUsers: number;
  activeProjects: number;
  avgGrowth: number;
}
