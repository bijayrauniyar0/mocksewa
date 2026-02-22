"use client";
import dynamic from "next/dynamic";
import { memo } from "react";

import { useLeaderboard } from "@/api/Leaderboard";
import { FlexColumn } from "@/components/common/Layouts";
import { ScoresProps } from "@/types/leaderboard";

import LeaderboardSkeleton from "../LeaderboardSkeleton";

const ScoreRow = dynamic(() => import("./ScoreRow"), {
  ssr: false,
});

const Scores = ({ mockTestId, isLoading }: ScoresProps) => {
  const {
    data: leaderboardData,
    isLoading: leaderBoardIsLoading,
    isSuccess: leaderboardDataIsFetchedSuccessfully,
  } = useLeaderboard({
    params: {
      mock_test_id: mockTestId,
      // search: searchValue,
    },
    options: {
      queryKey: ["leaderboard", mockTestId],
      enabled: !!mockTestId,
    },
  });

  if (
    leaderBoardIsLoading ||
    !leaderboardDataIsFetchedSuccessfully ||
    !leaderboardData ||
    isLoading
  ) {
    return <LeaderboardSkeleton />;
  }
  // console.log(leaderboardData);
  return (
    <FlexColumn className="no-scrollbar pt-3 h-[calc(100dvh-9rem)] w-full gap-2 overflow-y-auto md:h-[calc(100vh-11rem)]">
      {leaderboardData?.map((leaderboard) => {
        return <ScoreRow {...leaderboard} key={leaderboard.user_id} />;
      })}
    </FlexColumn>
  );
};

export default memo(Scores);
