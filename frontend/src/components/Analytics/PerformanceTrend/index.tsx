import { useQuery } from "@tanstack/react-query";
import {
  BarChartIcon,
  Calendar,
  CheckCircle,
  LineChart,
  Timer,
} from "lucide-react";
import React, { useState } from "react";

import CustomBarChart from "@/components/common/Charts/BarChart";
import CustomLineChart from "@/components/common/Charts/LineChart";
import { FlexColumn, FlexRow, Grid } from "@/components/common/Layouts";
import NoDataAvailable from "@/components/common/NoDataAvailable";
import SwitchTab from "@/components/common/SwitchTab";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { chartKeysData, filterByOptions } from "@/constants/MyStats";
import isEmpty from "@/lib/isEmpty";
import { getPerformanceTrend } from "@/services/ClientSide/userStats";
import useAnalyticsStore from "@/store/analytics";

import { PerformanceTrendSkeleton } from "../AnalyticsSkeleton";

export const chartTooltipMeta: Record<
  string,
  { title: string; icon: (color: string) => React.ReactNode }
> = {
  avg_score: {
    title: "Avg Score",
    icon: (color) => (
      <BarChartIcon
        color={color}
        className="flex h-4 w-4 items-center md:h-5 md:w-5"
      />
    ),
  },
  avg_elapsed_time: {
    title: "Avg Elapsed Time",
    icon: (color) => (
      <Timer
        color={color}
        className="flex h-4 w-4 items-center md:h-5 md:w-5"
      />
    ),
  },
  avg_accuracy: {
    title: "Avg Accuracy",
    icon: (color) => (
      <CheckCircle
        color={color}
        className="flex h-4 w-4 items-center md:h-5 md:w-5"
      />
    ),
  },
  total_questions: {
    title: "Questions Solved",
    icon: (color) => (
      <LineChart
        color={color}
        className="flex h-4 w-4 items-center md:h-5 md:w-5"
      />
    ),
  },
  total_sessions: {
    title: "Sessions Completed",
    icon: (color) => (
      <Calendar
        color={color}
        className="flex h-4 w-4 items-center md:h-5 md:w-5"
      />
    ),
  },
};

export const chartsTypeData = [
  {
    type: "bar",
    icon: <BarChartIcon className="h-5 w-5 md:h-6 md:w-6" />,
  },
  {
    type: "line",
    icon: <LineChart className="h-5 w-5 md:h-6 md:w-6" />,
  },
];

export const ChartTooltipContent = ({
  active,
  payload,
  label,
  className,
}: Record<string, any>) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className={`rounded p-2 shadow-md ${className} bg-white`}>
      <p className="text-xs font-bold md:text-sm">{label}</p>
      {payload.map((item: any, index: any) => {
        return (
          <FlexRow key={index} className="items-center gap-2">
            {chartTooltipMeta?.[item.name]?.icon(item.color)}
            <span className="text-sm">
              {chartTooltipMeta?.[item.name]?.title}: {item.value}
            </span>
          </FlexRow>
        );
      })}
    </div>
  );
};

export default function PerformanceTrend() {
  const [selectedChartType, setSelectedChartType] = useState<
    Record<string, string>
  >(
    chartKeysData.reduce((acc, item) => {
      acc[item.value] = "bar";
      return acc;
    }, {} as Record<string, string>)
  );

  const [filterBy, setFilterBy] = useState<string>("last_3_weeks");

  const mockTestId = useAnalyticsStore((state) => state.mockTestId);
  const mode = useAnalyticsStore((state) => state.mode);

  const { data: chartData, isLoading: chartDataIsLoading } = useQuery({
    queryKey: ["performanceTrend", filterBy, mockTestId, mode],
    queryFn: () => {
      return getPerformanceTrend({
        filter_by: filterBy,
        mock_test_id: mockTestId,
        mode,
      });
    },
    select: (res) => {
      return res?.data;
    },
    enabled: !!mockTestId,
  });

  const filteredOptions = React.useMemo(() => {
    if (mode === "ranked") {
      return chartKeysData.filter((opt) =>
        ["avg_accuracy", "avg_elapsed_time"].includes(opt.value)
      );
    }
    return chartKeysData.filter((opt) =>
      ["avg_score", "avg_elapsed_time"].includes(opt.value)
    );
  }, [mode]);

  return (
    <FlexColumn className="gap-2 md:gap-4">
      <FlexRow className="items-center justify-between max-md:gap-2">
        <p className="text-md font-medium leading-4 tracking-tight text-matt-100 md:text-md lg:text-base">
          Performance Trend ({mode === "ranked" ? "Ranked" : "Practice"})
        </p>
        <SwitchTab
          options={filterByOptions}
          onChange={(val) => setFilterBy(val)}
          activeValue={filterBy}
        />
      </FlexRow>

      <Grid className="w-full grid-cols-1 gap-4 md:grid-cols-2">
        {chartDataIsLoading ? (
          <PerformanceTrendSkeleton />
        ) : (
          filteredOptions.map((option) => (
            <Card key={option.value} className="w-full h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-md! tracking-normal">
                  {option.label}
                  <FlexRow className="gap-2">
                    {chartsTypeData.map((chart) => (
                      <button
                        key={chart.type}
                        onClick={() => {
                          setSelectedChartType((prevData) => {
                            return {
                              ...prevData,
                              [option.value]: chart.type,
                            };
                          });
                        }}
                        className={`rounded-lg border border-gray-200 p-1 shadow-sm ${
                          selectedChartType?.[option.value] === chart.type
                            ? "bg-primary-500 text-white"
                            : "bg-white"
                        }`}
                      >
                        {chart.icon}
                      </button>
                    ))}
                  </FlexRow>
                </CardTitle>
              </CardHeader>
              {/* <ChartContainer config={chartConfig}> */}
              <CardContent>
                {isEmpty(chartData) ? (
                  <NoDataAvailable />
                ) : (
                  <>
                    {selectedChartType[option.value] === "line" ? (
                      <CustomLineChart
                        dataKey={option.value}
                        chartData={chartData}
                        fill={option.color}
                        tooltip={ChartTooltipContent}
                        className="h-full w-full max-h-60 md:max-h-64"
                      />
                    ) : (
                      <CustomBarChart
                        dataKey={option.value}
                        chartData={chartData}
                        fill={option.color}
                        tooltip={ChartTooltipContent}
                        className="h-full w-full max-h-60 md:max-h-64"
                      />
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </Grid>
    </FlexColumn>
  );
}
