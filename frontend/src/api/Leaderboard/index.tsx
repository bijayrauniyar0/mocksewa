"use client";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getLeaderboard } from "@/services/ClientSide/leaderboard";
import { getMockTestTakenByUser } from "@/services/ClientSide/userStats";
import { TestTakenByUserList, UserRank } from "@/types/leaderboard";

type UseLeaderboardProps = {
  params: {
    mock_test_id: number;
    // search: string;
  };
  options?: Partial<UseQueryOptions<UserRank[], Error>>;
};
type UseGetTestsTakenByUserProps = {
  options?: Partial<UseQueryOptions<TestTakenByUserList[], Error>>;
};
export const useLeaderboard = ({ params, options }: UseLeaderboardProps) => {
  return useQuery<UserRank[], Error>({
    queryKey: ["leaderboard", params],
    queryFn: async () => {
      const response = await getLeaderboard({
        filter_by: "monthly",
        ...params,
      });
      return response.data;
    },
    ...options,
  });
};
export const useGetTestsTakenByUser = ({
  options,
}: UseGetTestsTakenByUserProps) => {
  return useQuery<TestTakenByUserList[], Error>({
    queryKey: ["tests-taken-by-user"],
    queryFn: async () => {
      const res = await getMockTestTakenByUser();
      return res.data;
    },
    ...options,
  });
};
