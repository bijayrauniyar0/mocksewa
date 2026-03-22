"use client";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import React from "react";

const CustomLineChart = dynamic(
  () => import("@/components/common/Charts/LineChart"),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-88" />,
  }
);
const CustomRadarChart = dynamic(
  () => import("@/components/common/Charts/RadarChart"),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-88" />,
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
import { Grid } from "@/components/common/Layouts";
import NoDataAvailable from "@/components/common/NoDataAvailable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Skeleton from "@/components/ui/Skeleton";
import { radarMetricsLabels } from "@/constants/MyStats";
import isEmpty from "@/lib/isEmpty";
import {
  getMetricsForRadarChart,
  getUserScores,
} from "@/services/ClientSide/userStats";
import useAnalyticsStore from "@/store/analytics";
import useAuthStore from "@/store/auth";

const OverallPerformance = () => {
  const mockTestId = useAnalyticsStore((state) => state.mockTestId);
  const userProfile = useAuthStore((state) => state.userProfile);
  const user_id = userProfile.id?.toString();

  const { data: radarMetrics, isLoading: radarChartDataIsLoading } = useQuery({
    queryKey: ["radarMetrics", user_id, mockTestId],
    queryFn: () =>
      getMetricsForRadarChart({ user_id, mock_test_id: mockTestId }),
    select: ({ data }) => {
      return Object.keys(data).map((key) => ({
        label: radarMetricsLabels[key].label,
        description: radarMetricsLabels[key].description,
        value: data[key],
      }));
    },
    enabled: !!user_id && !!mockTestId,
  });

  const { data: userScoresData, isLoading: userScoresIsLoading } = useQuery({
    queryKey: ["user-scores", user_id, mockTestId],
    queryFn: () => getUserScores({ user_id, mock_test_id: mockTestId }),
    select: ({ data }) => data,
    enabled: !!user_id && !!mockTestId,
  });

  return (
    <Grid className="grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Subject Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
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
              className="h-full w-full max-h-60 md:max-h-64"
            />
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Score Progression
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userScoresIsLoading ? (
            <Skeleton className="w-full h-88" />
          ) : !userScoresData || isEmpty(userScoresData) ? (
            <NoDataAvailable />
          ) : (
            <CustomLineChart
              chartData={userScoresData}
              dataKey="total_score"
              className="h-full w-full max-h-60 md:max-h-64"
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
  );
};

export default OverallPerformance;
