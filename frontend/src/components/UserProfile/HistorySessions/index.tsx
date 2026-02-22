"use client";
import { useParams } from "next/navigation";
import React from "react";

import SessionsBox from "@/components/Analytics/RecentSessions/SessionsBox";
import { Card, CardContent } from "@/components/ui/card";
import Skeleton from "@/components/ui/Skeleton";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import isEmpty from "@/lib/isEmpty";
import { getHistorySessions } from "@/services/common";
import useAuthStore from "@/store/auth";
import { PaginationInitialType } from "@/types/common";
import { IHistorySession } from "@/types/myStats";

import NoHistoryAvailable from "./NoHistoryAvailable";

export type HistorySessionsProps = {
  initialHistorySessions: PaginationInitialType<IHistorySession>;
};
const HistorySessions = ({ initialHistorySessions }: HistorySessionsProps) => {
  const { user_id } = useParams();
  const userProfile = useAuthStore((state) => state.userProfile);
  const isOwnProfile = Number(user_id) === userProfile.id;

  const {
    data: historySessions,
    rootRef,
    viewRef,
    hasNextPage,
  } = useInfiniteScroll({
    queryKey: ["performanceDetails", user_id],
    queryFn: async (args) => {
      const res = await getHistorySessions(args);
      return res?.data;
    },
    queryFnArgs: { user_id },
    initialPageParam: 1,
    page_size: 10,
    initialData: { pages: [initialHistorySessions], pageParams: [1] },
  });
  // const {
  //   data: reviewsResponse,
  //   fetchNextPage,
  //   hasNextPage,
  // } = useInfiniteQuery({
  //   queryKey: ["history-sessions", user_id],
  //   queryFn: async ({ pageParam = 1 }) => {
  //     const res = await getHistorySessions({
  //       page: pageParam,
  //       page_size: 10,
  //       user_id,
  //     });
  //     return res?.data;
  //   },
  //   initialData: { pages: [initialHistorySessions], pageParams: [1] },
  //   initialPageParam: 1,
  //   getNextPageParam: (lastPage) => lastPage?.next_page ?? undefined,
  // });
  // const [isIntersecting, rootRef, viewRef] = useIntersectionObserver({
  //   threshold: 0.1,
  // });
  // const historySessions: IHistorySession[] = useMemo(() => {
  //   if (!reviewsResponse?.pages) return [];
  //   return reviewsResponse.pages.flatMap((page) => page.results || []);
  // }, [reviewsResponse]);

  // useEffect(() => {
  //   if (isIntersecting && hasNextPage) {
  //     fetchNextPage();
  //   }
  // }, [fetchNextPage, hasNextPage, isIntersecting]);
  const isHistorySessionsEmpty = isEmpty(historySessions);
  return (
    <Card ref={rootRef} className="p-0">
      <CardContent
        className={`p-0 ${
          isHistorySessionsEmpty
            ? "h-[calc(100vh-10.5rem)] flex items-center justify-center"
            : ""
        }`}
      >
        {isHistorySessionsEmpty ? (
          <NoHistoryAvailable isOwnProfile={isOwnProfile} />
        ) : (
          historySessions.map((session) => {
            return (
              <SessionsBox
                key={session.id}
                created_at={session.created_at}
                elapsed_time={session.elapsed_time}
                score={session.score}
                title={session.MockTest.title}
                // className="!p-0 border-0"
              />
            );
          })
        )}
      </CardContent>
      {hasNextPage && (
        <div ref={viewRef} className="text-center p-2 text-gray-500">
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton
              key={index}
              className="w-full h-16 mb-2"
              style={{ width: "100%", height: "4rem" }}
            />
          ))}
        </div>
      )}
    </Card>
  );
};

export default HistorySessions;
