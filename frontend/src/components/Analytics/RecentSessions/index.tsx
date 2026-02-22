import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";

import { FlexColumn } from "@/components/common/Layouts";
import { getRecentSessions } from "@/services/ClientSide/userStats";
import useAnalyticsStore from "@/store/analytics";
import { SessionsBoxProps } from "@/types/myStats";

import { RecentSessionsSkeleton } from "../AnalyticsSkeleton";
import SessionsBox from "./SessionsBox";

type RecentSessions = SessionsBoxProps & { id: number };

const RecentSessions = () => {
  const mode = useAnalyticsStore((state) => state.mode);
  const { data: recentSessions, isLoading: recentSessionsIsLoading } = useQuery<
    AxiosResponse<RecentSessions[]>, // Response from queryFn
    Error,
    RecentSessions[]
  >({
    queryKey: ["recent-sessions", mode],
    queryFn: () => getRecentSessions({ mode }),
    select: ({ data }) => data,
  });
  return (
    <FlexColumn className="gap-2 md:gap-4">
      <p className="text-base font-medium leading-4 tracking-tight text-matt-100 md:text-lg">
        Recent Sessions
      </p>
      <FlexColumn className="bg-white border border-gray-200 shadow-sm rounded-lg">
        {recentSessionsIsLoading ? (
          <RecentSessionsSkeleton />
        ) : (
          recentSessions?.map(({ id, ...session }) => (
            <SessionsBox {...session} key={id} />
          ))
        )}
      </FlexColumn>
    </FlexColumn>
  );
};

export default RecentSessions;
