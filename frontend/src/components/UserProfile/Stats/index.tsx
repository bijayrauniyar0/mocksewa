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

const Stats = () => {
  const { user_id } = useParams();
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
        <Card>
          <CardHeader>
            <CardTitle className="md:text-base">Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {radarChartDataIsLoading ? (
              <Skeleton className="w-full h-[22rem]" />
            ) : !radarMetrics || isEmpty(radarMetrics) ? (
              <NoDataAvailable />
            ) : (
              <CustomRadarChart
                chartData={radarMetrics}
                dataKey="value"
                labelKey="label"
                chartTitle="Performance Overview"
                className="h-full w-full max-h-[300px] md:max-h-[225px] lg:max-h-[350px]"
              />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="md:text-base"> Scores Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {userScoresIsLoading ? (
              <Skeleton className="w-full h-[22rem]" />
            ) : !userScoresData || isEmpty(userScoresData) ? (
              <NoDataAvailable />
            ) : (
              <CustomLineChart
                chartData={userScoresData}
                dataKey="total_score"
                className="h-full w-full max-h-[300px] md:max-h-[225px] lg:max-h-[350px]"
                labelKey="date"
                tooltip={
                  <ChartTooltipContent labelKey="date" valueKey="total_score" />
                }
                xAxisInterval={Math.floor(userScoresData.length / 5)}
              />
            )}
          </CardContent>
        </Card>
      </Grid>
    </FlexColumn>
  );
};

export default Stats;
