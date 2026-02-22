"use client";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";
import React from "react";

import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import { Card, CardTitle } from "@/components/ui/card";
import { getRecentActivity } from "@/services/common";

interface RecentCompletion {
  id: number;
  userName: string;
  scorePercentage: number;
  timeAgo: string;
}

interface RecentActivityData {
  activeUsersToday: number;
  testsCompletedIn24h: number;
  averageScoreToday: number;
  recentCompletions: RecentCompletion[];
}

interface RecentActivityProps {
  mockTestId: string | string[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ mockTestId }) => {
  const {
    data: activityResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recentActivity", mockTestId],
    queryFn: () => getRecentActivity(mockTestId),
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
    staleTime: 15000, // Consider data stale after 15 seconds
  });

  const activityData: RecentActivityData | undefined = activityResponse?.data;

  // Loading state
  if (isLoading) {
    return (
      <Card className="@container relative w-full gap-4 rounded-lg border px-3 py-4 shadow-sm">
        <CardTitle className="flex items-center gap-1">
          <Users className="size-4 text-primary-700" />
          Recent Activity
        </CardTitle>
        <FlexColumn className="gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-2 bg-gray-50 rounded-md animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </FlexColumn>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="@container relative w-full gap-4 rounded-lg border px-3 py-4 shadow-sm">
        <CardTitle className="flex items-center gap-1">
          <Users className="size-4 text-primary-700" />
          Recent Activity
        </CardTitle>
        <div className="p-4 text-center text-gray-500">
          <p>Failed to load activity data</p>
        </div>
      </Card>
    );
  }

  // Success state with data
  return (
    <Card className="@container relative w-full gap-4 rounded-lg border px-3 py-4 shadow-sm">
      <CardTitle className="flex items-center gap-1">
        <Users className="size-4 text-primary-700" />
        Recent Activity
      </CardTitle>
      <FlexColumn className="gap-3">
        <FlexRow className="justify-between items-center p-2 bg-gray-50 rounded-md">
          <FlexColumn className="gap-1">
            <p className="font-medium text-sm @lg:text-base text-gray-700">
              Active Users Today
            </p>
            <p className="text-xs @lg:text-sm text-gray-500">
              Currently taking this test
            </p>
          </FlexColumn>
          <p className="font-bold text-sm @lg:text-base text-primary-600">
            {activityData?.activeUsersToday || 0} users
          </p>
        </FlexRow>

        <FlexRow className="justify-between items-center p-2 bg-gray-50 rounded-md">
          <FlexColumn className="gap-1">
            <p className="font-medium text-sm @lg:text-base text-gray-700">
              Tests Completed
            </p>
            <p className="text-xs @lg:text-sm text-gray-500">
              In last 24 hours
            </p>
          </FlexColumn>
          <p className="font-bold text-sm @lg:text-base text-orange-600">
            {activityData?.testsCompletedIn24h || 0}
          </p>
        </FlexRow>

        <FlexRow className="justify-between items-center p-2 bg-gray-50 rounded-md">
          <FlexColumn className="gap-1">
            <p className="font-medium text-sm @lg:text-base text-gray-700">
              Average Score
            </p>
            <p className="text-xs @lg:text-sm text-gray-500">
              Community average
            </p>
          </FlexColumn>
          <p className="font-bold text-sm @lg:text-base text-teal-600">
            {activityData?.averageScoreToday || 0}%
          </p>
        </FlexRow>

        {activityData?.recentCompletions &&
          activityData.recentCompletions.length > 0 && (
            <div className="pt-2 border-t border-gray-200">
              <p className="text-xs @lg:text-sm text-gray-500 mb-2">
                Recent Completions:
              </p>
              <FlexColumn className="gap-1">
                {activityData.recentCompletions.map((completion, index) => {
                  // Cycle through colors for variety
                  const colors = [
                    "text-green-600",
                    "text-blue-600",
                    "text-purple-600",
                  ];
                  const colorClass = colors[index % colors.length];

                  return (
                    <FlexRow
                      key={completion.id}
                      className="justify-between items-center"
                    >
                      <p className="text-xs @lg:text-sm text-gray-600">
                        {completion.userName} completed
                      </p>
                      <p
                        className={`text-xs @lg:text-sm ${colorClass} font-medium`}
                      >
                        {completion.scorePercentage}% • {completion.timeAgo}
                      </p>
                    </FlexRow>
                  );
                })}
              </FlexColumn>
            </div>
          )}
      </FlexColumn>
    </Card>
  );
};

export default RecentActivity;
