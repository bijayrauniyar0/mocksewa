"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { IChartProps } from "@/types/myStats";

import Suspense from "../../Suspense";
import { ChartTooltipContent } from "../ToolTip";

export default function CustomRadarChart({
  chartData,
  labelKey,
  dataKey,
  className,
  chartConfig,
}: IChartProps) {
  return (
    <Suspense>
      <ChartContainer
        config={chartConfig || {}}
        className={`${className} mx-auto aspect-square w-full h-full`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            data={chartData}
            margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
          >
            <Tooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <PolarAngleAxis
              dataKey={labelKey}
              className="text-xs md:text-sm lg:text-md !whitespace-pre-wrap"
            />
            <PolarGrid />
            <Radar
              dataKey={dataKey}
              fill="var(--chart-primary)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Suspense>
  );
}
