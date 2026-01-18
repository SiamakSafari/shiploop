"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { ProductRevenue } from "@/types";

interface RevenueBreakdownProps {
  data: ProductRevenue[];
}

const COLORS = [
  "#171717", // near black
  "#404040", // dark gray
  "#737373", // medium gray
  "#a3a3a3", // light gray
];

export function RevenueBreakdown({ data }: RevenueBreakdownProps) {
  // Transform data for Recharts compatibility
  const chartData = data.map((item) => ({
    name: item.productName,
    value: item.revenue,
    percentage: item.percentage,
    productId: item.productId,
    productName: item.productName,
    revenue: item.revenue,
    color: item.color,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Revenue by Product</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const item = payload[0].payload;
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-md">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(item.value)} ({item.percentage}%)
                      </p>
                    </div>
                  );
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value: string) => (
                  <span className="text-sm text-muted-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
