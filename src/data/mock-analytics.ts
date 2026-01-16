import { AnalyticsData, TimelineDataPoint, TrafficSource, ProductRevenue } from "@/types";

// Generate last 30 days of revenue data
const generateTimelineData = (): TimelineDataPoint[] => {
  const data: TimelineDataPoint[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Simulate some growth with variation
    const baseRevenue = 3000 + (29 - i) * 50;
    const variation = Math.random() * 500 - 250;
    const revenue = Math.round(baseRevenue + variation);

    const baseUsers = 700 + (29 - i) * 8;
    const userVariation = Math.random() * 50 - 25;
    const users = Math.round(baseUsers + userVariation);

    data.push({
      date: date.toISOString().split("T")[0],
      revenue,
      users,
    });
  }

  return data;
};

export const mockRevenueByProduct: ProductRevenue[] = [
  {
    productId: "proj_1",
    productName: "ShipFast",
    revenue: 4250,
    percentage: 65,
    color: "hsl(262, 83%, 58%)", // purple
  },
  {
    productId: "proj_2",
    productName: "DataFast",
    revenue: 1500,
    percentage: 23,
    color: "hsl(217, 91%, 60%)", // blue
  },
  {
    productId: "proj_other",
    productName: "Other",
    revenue: 780,
    percentage: 12,
    color: "hsl(142, 76%, 36%)", // green
  },
];

export const mockTrafficSources: TrafficSource[] = [
  {
    name: "Twitter/X",
    visitors: 4520,
    conversions: 186,
    conversionRate: 4.1,
    revenue: 1860,
    trend: "up",
  },
  {
    name: "Product Hunt",
    visitors: 3200,
    conversions: 224,
    conversionRate: 7.0,
    revenue: 2240,
    trend: "up",
  },
  {
    name: "Google Search",
    visitors: 2800,
    conversions: 112,
    conversionRate: 4.0,
    revenue: 1120,
    trend: "stable",
  },
  {
    name: "Reddit",
    visitors: 1900,
    conversions: 95,
    conversionRate: 5.0,
    revenue: 950,
    trend: "up",
  },
  {
    name: "Indie Hackers",
    visitors: 1200,
    conversions: 84,
    conversionRate: 7.0,
    revenue: 840,
    trend: "down",
  },
  {
    name: "Hacker News",
    visitors: 980,
    conversions: 39,
    conversionRate: 4.0,
    revenue: 390,
    trend: "stable",
  },
  {
    name: "Direct",
    visitors: 2100,
    conversions: 63,
    conversionRate: 3.0,
    revenue: 630,
    trend: "up",
  },
];

export const mockAnalytics: AnalyticsData = {
  revenue: {
    total: 6530,
    byProduct: mockRevenueByProduct,
    timeline: generateTimelineData(),
    growth: 15.3,
  },
  traffic: {
    sources: mockTrafficSources,
    totalVisitors: 16700,
    totalConversions: 803,
  },
  overview: {
    totalMRR: 4250,
    totalUsers: 892,
    activeProjects: 3,
    avgGrowth: 15.3,
  },
};
