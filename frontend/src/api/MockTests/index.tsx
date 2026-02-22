import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { toggleBookmark } from "@/services/ClientSide/bookmark";
import { getMockTestTakenByUser } from "@/services/ClientSide/userStats";
import { TestTakenByUserList } from "@/types/leaderboard";

const useTestTakenByUserList = (
  options?: Partial<UseQueryOptions<TestTakenByUserList[], Error>>
) => {
  return useQuery({
    queryKey: ["testTakenByUserList"],
    queryFn: async () => {
      const res = await getMockTestTakenByUser();
      return res.data;
    },
    ...options,
  });
};

export default useTestTakenByUserList;

export const useUpdateBookmark = (
  options?: Partial<UseMutationOptions<AxiosResponse, Error, number>>
) => {
  return useMutation<AxiosResponse, Error, number>({
    mutationFn: (mockTestId: number) => toggleBookmark(mockTestId),
    ...options,
  });
};
