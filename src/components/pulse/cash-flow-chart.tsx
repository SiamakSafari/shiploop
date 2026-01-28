"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { CashFlowForecast } from "@/stores/use-pulse-store";

interface CashFlowChartProps {
  forecasts: CashFlowForecast[];
  lowCashThreshold: number;
}

export function CashFlowChart({ forecasts, lowCashThreshold }: CashFlowChartProps) {
  const data = forecasts.map((f) => ({
    month: new Date(f.month + "-01").toLocaleDateString("en-US", { month: "short" }),
    balance: f.runningBalance,
    income: f.predictedIncome,
    expenses: f.predictedExpenses,
    confidence: f.confidence,
  }));

  const minBalance = Math.min(...forecasts.map((f) => f.runningBalance));
  const maxBalance = Math.max(...forecasts.map((f) => f.runningBalance));
  const yMin = Math.min(0, minBalance - 1000);
  const yMax = maxBalance + 2000;

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-50">
            Cash Flow Forecast
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            6-month projection based on current income & expenses
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-gray-500 dark:text-gray-400">Balance</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <span className="text-gray-500 dark:text-gray-400">Low Cash Threshold</span>
          </div>
        </div>
      </div>

      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <YAxis
              domain={[yMin, yMax]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
                      <p className="font-medium text-gray-900 dark:text-gray-50">
                        {data.month}
                      </p>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        Balance: ${data.balance.toLocaleString()}
                      </p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        Income: ${data.income.toLocaleString()}
                      </p>
                      <p className="text-sm text-red-600 dark:text-red-400">
                        Expenses: ${data.expenses.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Confidence: {data.confidence}%
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine
              y={lowCashThreshold}
              stroke="#f87171"
              strokeDasharray="4 4"
              strokeWidth={2}
            />
            <ReferenceLine y={0} stroke="#9ca3af" strokeWidth={1} />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#balanceGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
