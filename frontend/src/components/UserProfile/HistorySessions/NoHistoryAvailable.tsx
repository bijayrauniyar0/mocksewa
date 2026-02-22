import Image from "next/image";
import React from "react";

import noDataFound from "@/assets/images/no-data-found.png";
import { FlexColumn } from "@/components/common/Layouts";

type NoHistoryAvailableProps = {
  className?: string;
  titleClassName?: string;
  isOwnProfile?: boolean;
};

const NoHistoryAvailable = ({
  titleClassName,
  className,
  isOwnProfile = false,
}: NoHistoryAvailableProps) => {
  return (
    <FlexColumn className="items-center justify-center p-6 min-h-[300px]">
      <Image
        src={noDataFound}
        alt="No history found"
        className={`${className} aspect-square h-32 w-32 lg:h-64 lg:w-64 object-contain opacity-90`}
      />
      <div className="text-center mt-4 space-y-2">
        <h3 className={`${titleClassName} text-lg font-semibold text-gray-700`}>
          No History Available
        </h3>
        <p className="text-sm text-gray-500 max-w-sm">
          {isOwnProfile
            ? "Start taking mock tests to build your performance history and track your progress over time."
            : "This user hasn't taken any mock tests yet."}
        </p>
      </div>
    </FlexColumn>
  );
};

export default NoHistoryAvailable;
