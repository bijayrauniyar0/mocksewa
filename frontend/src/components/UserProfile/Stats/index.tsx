"use client";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import React from "react";

import StatsCard from "@/components/Analytics/Stats/StatsCard";
const CustomLineChart = dynamic(
  () => import("@/components/common/Charts/LineChart"),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[22rem]" />,
  }
);
const CustomRadarChart = dynamic(
  () => import("@/components/common/Charts/RadarChart"),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[22rem]" />,
  }
);
const ChartTooltipContent = dynamic(
  () =>
    import("@/components/common/Charts/ToolTip").then(
      (m) => m.ChartTooltipContent
    ),
  {
    ssr: false,
  }
);
import { MyStatsSkeleton } from "@/components/Analytics/AnalyticsSkeleton";
import { FlexColumn, Grid } from "@/components/common/Layouts";
import NoDataAvailable from "@/components/common/NoDataAvailable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Skeleton from "@/components/ui/Skeleton";
import { radarMetricsLabels, statsData } from "@/constants/MyStats";
import isEmpty from "@/lib/isEmpty";
import {
  getMetricsForRadarChart,
  getUserPublicStats,
  getUserScores,
} from "@/services/ClientSide/userStats";

const Stats = ({ userId }: { userId?: string }) => {
  const { user_id: paramUserId } = useParams();
  const user_id = userId || paramUserId;
  const { data: radarMetrics, isLoading: radarChartDataIsLoading } = useQuery({
    queryKey: ["radarMetrics", user_id],
    queryFn: () => getMetricsForRadarChart({ user_id, mock_test_id: 1 }),
    select: ({ data }) => {
      return Object.keys(data).map((key) => ({
        label: radarMetricsLabels[key].label,
        description: radarMetricsLabels[key].description,
        value: data[key],
      }));
    },
  });
  const { data: userStats, isLoading: userStatsIsLoading } = useQuery({
    queryKey: ["user-stats", user_id],
    queryFn: () => getUserPublicStats({ user_id, mock_test_id: 1 }),
    select: ({ data }) => data,
  });
  const { data: userScoresData, isLoading: userScoresIsLoading } = useQuery({
    queryKey: ["user-scores", user_id],
    queryFn: () => getUserScores({ user_id, mock_test_id: 1 }),
    select: ({ data }) => data,
  });
  return (
    <FlexColumn className="gap-2 md:gap-4 h-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
        {userStatsIsLoading ? (
          <MyStatsSkeleton />
        ) : (
          statsData.map(({ value_key, ...stat }) => (
            <StatsCard
              {...stat}
              value={userStats?.[value_key] || "N/A"}
              key={value_key}
            />
          ))
        )}
      </div>
      <Grid className="grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4 h-full">
        <div className="space-y-4">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Performance Overview</p>
          <div className="bg-slate-50 rounded-2xl p-4">
            {radarChartDataIsLoading ? (
              <Skeleton className="w-full h-88" />
            ) : !radarMetrics || isEmpty(radarMetrics) ? (
              <NoDataAvailable />
            ) : (
              <CustomRadarChart
                chartData={radarMetrics}
                dataKey="value"
                labelKey="label"
                chartTitle="Performance Overview"
                className="h-full w-full max-h-75 md:max-h-56.25 lg:max-h-87.5"
              />
            )}
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Scores Overview</p>
          <div className="bg-slate-50 rounded-2xl p-4">
            {userScoresIsLoading ? (
              <Skeleton className="w-full h-88" />
            ) : !userScoresData || isEmpty(userScoresData) ? (
              <NoDataAvailable />
            ) : (
              <CustomLineChart
                chartData={userScoresData}
                dataKey="total_score"
                className="h-full w-full max-h-75 md:max-h-56.25 lg:max-h-87.5"
                labelKey="date"
                tooltip={
                  <ChartTooltipContent labelKey="date" valueKey="total_score" />
                }
                xAxisInterval={Math.floor(userScoresData.length / 5)}
              />
            )}
          </div>
        </div>
      </Grid>
    </FlexColumn>
  );
};

export default Stats;
