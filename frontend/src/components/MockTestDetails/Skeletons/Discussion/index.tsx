import React from "react";

import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import Skeleton from "@/components/ui/Skeleton";

const DiscussionsSkeleton = () => {
  return (
    <FlexColumn className="gap-4">
      {Array.from({ length: 5 }, (_, index) => (
        <FlexRow className="gap-2" key={index}>
          <Skeleton className="h-8 w-8 rounded-full md:h-10 md:w-10 !bg-white" />
          <FlexColumn className="gap-2">
            <Skeleton className="h-2 w-24 rounded-md md:h-3 md:w-32 !bg-white" />
            <Skeleton className="h-6 w-9/12 rounded-md md:h-8 md:w-64 !bg-white" />
          </FlexColumn>
        </FlexRow>
      ))}
    </FlexColumn>
  );
};

export default DiscussionsSkeleton;
