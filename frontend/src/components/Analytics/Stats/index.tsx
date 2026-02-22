import { useQuery } from "@tanstack/react-query";
import React from "react";

import { Grid } from "@/components/common/Layouts";
import { statsData } from "@/constants/MyStats";
import { getUserStats } from "@/services/ClientSide/userStats";
import useAnalyticsStore from "@/store/analytics";
import { IFilters } from "@/types/myStats";

import { MyStatsSkeleton } from "../AnalyticsSkeleton";
import StatsCard from "./StatsCard";

const Stats = ({ timePeriodFilter }: IFilters) => {
  const mockTestId = useAnalyticsStore((state) => state.mockTestId);
  const mode = useAnalyticsStore((state) => state.mode);
  const { data: userStats, isLoading: userStatsIsLoading } = useQuery({
    queryKey: ["userStats", timePeriodFilter, mockTestId, mode],
    queryFn: () =>
      getUserStats({
        time_period: timePeriodFilter,
        mock_test_id: mockTestId,
        mode,
      }),
    select: ({ data }) => data,
    enabled: !!timePeriodFilter && !!mockTestId,
  });
  const filteredStats = React.useMemo(() => {
    if (mode === "ranked") {
      return statsData.filter((s) => s.value_key !== "total_questions");
    }
    return statsData.filter((s) => s.value_key !== "current_rank");
  }, [mode]);

  return (
    <Grid className="w-full grid-cols-2 gap-2 md:grid-cols-4">
      {userStatsIsLoading ? (
        <MyStatsSkeleton />
      ) : (
        filteredStats.map(({ value_key, ...stat }) => (
          <StatsCard
            {...stat}
            key={stat.title}
            value={userStats?.[value_key] || "N/A"}
          />
        ))
      )}
    </Grid>
  );
};

export default Stats;
