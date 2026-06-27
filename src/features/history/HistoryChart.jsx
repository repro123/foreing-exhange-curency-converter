"use client";

import { useSearchParams } from "next/navigation";

import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

import CurrentDateTime from "@/features/history-chart-components/CurrentDateTime";
import HistoryTooltip from "@/features/history-chart-components/HistoryTooltip";
import { formatXAxisDate } from "@/lib/utils";

export const description = "A linear line chart";

function HistoryChart({ series, fromCurrency, toCurrency }) {
  const searchParams = useSearchParams();
  const period = searchParams.get("period") ?? "1M";

  const openRate = series[0].rate;
  const lastRate = series[series.length - 1].rate;
  const percentChange = ((lastRate - openRate) / openRate) * 100;

  const chartConfig = {
    rate: {
      label: `${fromCurrency}/${toCurrency} Rate`,
      color: "var(--color-primary)",
    },
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="preset-3-medium">{`${fromCurrency}/${toCurrency}`}</CardTitle>
        <CardDescription className="text-nav preset-5">
          {lastRate} · <CurrentDateTime />
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <ChartContainer config={chartConfig} className="h-120 w-full">
          <AreaChart
            accessibilityLayer
            data={series}
            margin={{
              left: 12,
              right: 12,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-primary)"
                  stopOpacity={1}
                />
                <stop
                  offset="25%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.6}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="currentColor"
              strokeOpacity={0.05}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={25}
              interval="preserveStartEnd"
              minTickGap={40}
              angle={-45}
              padding={{ left: 15, right: 15 }}
              height={70}
              tickFormatter={(value) => formatXAxisDate(value, period)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={70}
              tick={{ fill: "var(--color-foreground)", opacity: 0.4 }}
              domain={["auto", "auto"]}
              tickFormatter={(value) => value.toFixed(4)}
            />

            <ChartTooltip
              cursor={true}
              content={(props) => (
                <HistoryTooltip
                  {...props}
                  fromCurrency={fromCurrency}
                  toCurrency={toCurrency}
                  percentChange={percentChange}
                  period={period}
                />
              )}
            />
            <Area
              dataKey="rate"
              animationDuration={500}
              type="linear"
              stroke="var(--color-primary)"
              strokeWidth={1.5}
              fill="url(#rateGradient)"
              dot={false}
              activeDot={{
                r: 4,
                fill: "var(--color-primary)",
                stroke: "var(--color-background)",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default HistoryChart;
