"use client";
import { Grid, Rows } from "lucide-react";
import React, { useState } from "react";

import { FlexRow } from "@/components/common/Layouts";
import Skeleton from "@/components/ui/Skeleton";
import ToolTip from "@/components/ui/tooltip";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { getPerformanceDetails } from "@/services/ClientSide/userStats";
import useAnalyticsStore from "@/store/analytics";
import { IFilters } from "@/types/myStats";

import PerformanceCard from "./PerformanceCard";
import PerformanceRow from "./PerformanceRow";

export type PerformanceDataType = {
  id: number;
  created_at: string;
  score: number;
  accuracy: string;
  elapsed_time: string;
  full_marks: number;
  unanswered_questions: number;
};
const PerformanceDetails = ({ timePeriodFilter }: IFilters) => {
  const [viewMode, setViewMode] = useState<"card" | "row">("card");
  const mockTestId = useAnalyticsStore((state) => state.mockTestId);
  const mode = useAnalyticsStore((state) => state.mode);
  const {
    data: performanceDetails,
    viewRef,
    hasNextPage,
    total,
  } = useInfiniteScroll<any, PerformanceDataType>({
    queryKey: ["performanceDetails", timePeriodFilter, mockTestId, mode],
    queryFn: async (args) => {
      const res = await getPerformanceDetails(args);
      return res?.data;
    },
    queryFnArgs: {
      time_period: timePeriodFilter,
      mock_test_id: mockTestId,
      mode,
    },
    threshold: 0.5,
    initialPageParam: 1,
    page_size: 10,
    enabled: !!mockTestId,
  });

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <FlexRow className="justify-between items-center">
        <p className="text-base font-medium leading-4 tracking-tight text-matt-100 md:text-lg">
          Performance Details
        </p>
        <FlexRow className="items-center">
          <ToolTip
            triggerChildren={
              <div
                className={`${
                  viewMode === "card" ? "bg-primary-600" : ""
                }  items-center flex justify-center cursor-pointer rounded-sm p-1`}
              >
                <Grid
                  size={20}
                  className={` ${
                    viewMode === "card" ? "text-white" : "text-matt-100"
                  }`}
                />
              </div>
            }
            message="Card View"
            onClick={() => setViewMode("card")}
          />
          <ToolTip
            triggerChildren={
              <div
                className={`${
                  viewMode === "row" ? "bg-primary-600" : ""
                }  flex justify-center items-center cursor-pointer p-1 rounded-sm`}
              >
                <Rows
                  size={20}
                  className={` ${
                    viewMode === "row" ? "text-white" : "text-matt-100"
                  }`}
                />
              </div>
            }
            message="Row View"
            onClick={() => setViewMode("row")}
          />
        </FlexRow>
      </FlexRow>
      <div
        className={`${
          viewMode === "card" ? "md:grid md:grid-cols-2 gap-4" : ""
        } flex flex-col gap-2 w-full`}
      >
        {performanceDetails.map((detail, index) => {
          const sessionId = total - index;
          if (viewMode === "card") {
            return (
              <PerformanceCard {...detail} id={sessionId} key={detail.id} />
            );
          }
          return <PerformanceRow {...detail} id={sessionId} key={detail.id} />;
        })}
      </div>
      <div ref={viewRef} className="flex flex-col gap-2">
        {hasNextPage &&
          Array.from({ length: 3 }, (_, index) => (
            <Skeleton key={index} className="w-full h-16" />
          ))}
      </div>
    </div>
  );
};

export default PerformanceDetails;
