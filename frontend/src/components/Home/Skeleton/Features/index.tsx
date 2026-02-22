import React from "react";

import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import Skeleton from "@/components/ui/Skeleton";

const FeaturesSkeleton = () => {
  return (
    <div className="relative z-[8] overflow-hidden rounded-lg !bg-[rgba(243,236,250,0.7)] px-4 py-8 md:px-16 md:py-16 lg:px-20 lg:py-20">
      <div className="relative flex flex-col gap-4 md:gap-6 sm:grid-cols-3 sm:gap-4 md:grid lg:gap-6">
        {Array.from({ length: 6 }, (_, index) => (
          <FlexColumn
            className={`flex-1 gap-1 md:gap-2 ${
              index % 2 === 0 ? "max-md:items-start" : "max-md:items-end"
            }`}
            key={index}
          >
            <FlexRow className="items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full md:h-10 md:w-10 !bg-white" />
              <Skeleton className="h-3 w-24 rounded-md md:h-5 md:w-32 !bg-white" />
            </FlexRow>
            <Skeleton className="h-10 w-9/12 rounded-md md:h-12 md:w-64 !bg-white" />
          </FlexColumn>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSkeleton;
