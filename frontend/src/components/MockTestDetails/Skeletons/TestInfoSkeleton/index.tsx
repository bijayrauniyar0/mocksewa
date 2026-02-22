import React from "react";

import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import Skeleton from "@/components/ui/Skeleton";

const TestInfoSkeleton = () => {
  return (
    <div className="relative w-full rounded-lg border border-gray-200 bg-white px-3 py-4 shadow-sm">
      <Skeleton className="absolute right-4 top-[-3px] h-6 w-6 md:h-8 md:w-8" />
      <FlexColumn className="gap-8">
        <FlexColumn className="gap-2">
          <Skeleton className="h-5 w-3/4 md:h-7" />
          <Skeleton className="h-5 w-[100px]" />
        </FlexColumn>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FlexColumn className="gap-4">
            <Skeleton className="h-12 w-full" />

            <div className="w-full rounded-md border border-gray-200 bg-white px-3 py-2">
              <FlexRow className="flex-wrap items-center justify-between">
                {[1, 2, 3].map((val) => (
                  <FlexRow className="items-center gap-2" key={val}>
                    <Skeleton className="h-6 w-5" />
                    <FlexColumn className="gap-1">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-3 w-8" />
                    </FlexColumn>
                  </FlexRow>
                ))}
              </FlexRow>
            </div>

            {/* Button skeleton */}
            <Skeleton className="h-10 w-full" />
          </FlexColumn>

          {/* Test metadata skeleton */}
          <div className="w-full rounded-md border border-gray-200 bg-white px-3 py-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <FlexRow
                key={index}
                className="items-center justify-between border-b py-2 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-24 md:w-32" />
                </div>
                <Skeleton className="h-4 w-12 md:w-16" />
              </FlexRow>
            ))}
          </div>
        </div>
      </FlexColumn>
    </div>
  );
};

export default TestInfoSkeleton;
