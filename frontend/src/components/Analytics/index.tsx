"use client";
import React, { Suspense, useEffect, useState } from "react";

import useTestTakenByUserList from "@/api/MockTests";
import BindContentContainer from "@/components/common/BindContentContainer";
import DropDown from "@/components/common/DropDown";
import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import SwitchTab from "@/components/common/SwitchTab";
import isEmpty from "@/lib/isEmpty";
import useAnalyticsStore from "@/store/analytics";
import { IPerformanceTrendProps } from "@/types/myStats";

import NoDataAnalytics from "./NoDataAnalytics";
import PerformanceDetails from "./PerformanceDetails";
import PerformanceTrend from "./PerformanceTrend";
import RecentSessions from "./RecentSessions";
import Stats from "./Stats";

const Analytics = () => {
  const [timePeriodFilter] =
    useState<IPerformanceTrendProps["time_period"]>("all_time");
  const mockTestFilter = useAnalyticsStore((state) => state.mockTestId);
  const setMockTestId = useAnalyticsStore((state) => state.setMockTestId);
  const mode = useAnalyticsStore((state) => state.mode);
  const setMode = useAnalyticsStore((state) => state.setMode);

  const {
    data: testTakenByUserList,
    isLoading: isTestTakenByUserListLoading,
    isSuccess: mockTestTakenByUserIsSuccess,
    isError: mockTestTakenByUserIsError,
  } = useTestTakenByUserList();

  const modeOptions = [
    { label: "Practice", value: "practice" },
    { label: "Ranked", value: "ranked" },
  ];

  const hasNoData =
    mockTestTakenByUserIsSuccess &&
    isEmpty(testTakenByUserList) &&
    !isTestTakenByUserListLoading &&
    !mockTestTakenByUserIsError;

  useEffect(() => {
    if (mockTestTakenByUserIsSuccess && !isEmpty(testTakenByUserList)) {
      setMockTestId(testTakenByUserList[0]?.id);
    }
  }, [mockTestTakenByUserIsSuccess, setMockTestId, testTakenByUserList]);

  return (
    <>
      {hasNoData ? (
        <NoDataAnalytics />
      ) : (
        <BindContentContainer>
          <FlexColumn className="gap-4 md:gap-8">
            <FlexRow className="flex-wrap items-center justify-between gap-2 md:gap-4">
              <div>
                <p className="text-primary-600 text-md font-semibold md:text-base lg:text-lg">
                  Your Performance History
                </p>
                <p className="text-xs font-medium md:text-md">
                  Track your progress and analyze your performance trends over
                  time
                </p>
              </div>

              <FlexRow className="items-center justify-end gap-2 md:gap-4 flex-wrap">
                <SwitchTab
                  options={modeOptions}
                  activeValue={mode}
                  onChange={(val) => setMode(val as any)}
                  className="bg-gray-100"
                />
                <FlexRow className="items-center justify-between max-sm:w-full gap-2">
                  <p className="text-sm font-medium text-gray-600 md:text-md">
                    Test
                  </p>
                  <DropDown
                    options={testTakenByUserList || []}
                    value={mockTestFilter || ""}
                    isLoading={isTestTakenByUserListLoading}
                    onChange={(mockTest) => {
                      if (!mockTest) return;
                      setMockTestId(mockTest);
                    }}
                    choose="value"
                    className="w-[9rem]"
                    enableSearchbar={false}
                  />
                </FlexRow>
              </FlexRow>
            </FlexRow>
            <Suspense>
              <Stats timePeriodFilter={timePeriodFilter} />
            </Suspense>
            <Suspense>
              <PerformanceTrend />
            </Suspense>
            <Suspense>
              <RecentSessions />
            </Suspense>
            <Suspense>
              <PerformanceDetails timePeriodFilter={timePeriodFilter} />
            </Suspense>
          </FlexColumn>
        </BindContentContainer>
      )}
    </>
  );
};

export default Analytics;
