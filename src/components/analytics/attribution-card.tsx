"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";
import { TrafficSource } from "@/types";

interface AttributionCardProps {
  sources: TrafficSource[];
}

export function AttributionCard({ sources }: AttributionCardProps) {
  // Get top performing sources by revenue
  const sortedSources = [...sources].sort((a, b) => b.revenue - a.revenue);
  const totalRevenue = sources.reduce((sum, s) => sum + s.revenue, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Revenue Attribution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedSources.slice(0, 5).map((source, index) => {
          const percentage = (source.revenue / totalRevenue) * 100;

          return (
            <div key={source.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{source.name}</span>
                <span className="text-green-500">
                  {formatCurrency(source.revenue)}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    index === 0
                      ? "bg-primary"
                      : index === 1
                      ? "bg-blue-500"
                      : "bg-muted-foreground"
                  )}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {percentage.toFixed(1)}% of total revenue
              </p>
            </div>
          );
        })}

        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <p className="text-xs text-muted-foreground">
            &quot;This {formatCurrency(sortedSources[0]?.revenue || 0)} came from{" "}
            {sortedSources[0]?.name}&quot;
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
