import React from "react";

import { FlexColumn } from "@/components/common/Layouts";
import Skeleton from "@/components/ui/Skeleton";

const LeaderboardSkeleton = () => {
  return (
    <FlexColumn className="gap-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-16 w-full" />
      ))}
    </FlexColumn>
  );
};

export default LeaderboardSkeleton;
