"use client";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { chartConfig } from "@/constants/MyStats";
import { IChartProps } from "@/types/myStats";

const CustomLineChart = ({
  chartData,
  dataKey,
  fill,
  tooltip,
  className,
  labelKey = "label",
  xAxisInterval,
}: IChartProps) => {
  return (
    <ChartContainer
      config={chartConfig || {}}
      className={`${className} mx-auto aspect-square w-full h-full`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{ right: 30 }}
          className={`ml-[-45px] lg:mr-2 lg:ml-[-5px] !z-[5]`}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={labelKey}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            interval={xAxisInterval || 0}
          />
          <YAxis
            // domain={[() => 0, (dataMax: number) => (dataMax * 1.25).toFixed(0)]}
            allowDecimals={false}
          />
          <ChartTooltip cursor={false} content={tooltip} />
          <Line
            dataKey={dataKey}
            stroke={fill || "var(--chart-primary)"}
            radius={4}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default CustomLineChart;
