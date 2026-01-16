"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { TrafficSource } from "@/types";

interface TrafficSourcesProps {
  sources: TrafficSource[];
}

export function TrafficSources({ sources }: TrafficSourcesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Traffic Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 text-left font-medium text-muted-foreground">
                  Source
                </th>
                <th className="pb-3 text-right font-medium text-muted-foreground">
                  Visitors
                </th>
                <th className="pb-3 text-right font-medium text-muted-foreground">
                  Conv.
                </th>
                <th className="pb-3 text-right font-medium text-muted-foreground">
                  Rate
                </th>
                <th className="pb-3 text-right font-medium text-muted-foreground">
                  Revenue
                </th>
                <th className="pb-3 text-right font-medium text-muted-foreground">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody>
              {sources.map((source) => {
                const TrendIcon =
                  source.trend === "stable"
                    ? Minus
                    : source.trend === "up"
                    ? TrendingUp
                    : TrendingDown;
                const trendColor =
                  source.trend === "stable"
                    ? "text-muted-foreground"
                    : source.trend === "up"
                    ? "text-green-500"
                    : "text-red-500";

                return (
                  <tr key={source.name} className="border-b border-border last:border-0">
                    <td className="py-3 font-medium">{source.name}</td>
                    <td className="py-3 text-right">
                      {formatNumber(source.visitors)}
                    </td>
                    <td className="py-3 text-right">
                      {formatNumber(source.conversions)}
                    </td>
                    <td className="py-3 text-right">
                      {source.conversionRate.toFixed(1)}%
                    </td>
                    <td className="py-3 text-right text-green-500">
                      {formatCurrency(source.revenue)}
                    </td>
                    <td className="py-3 text-right">
                      <TrendIcon className={cn("inline h-4 w-4", trendColor)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
