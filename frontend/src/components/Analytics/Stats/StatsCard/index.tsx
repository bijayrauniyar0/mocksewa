import React from "react";

import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import { cn } from "@/lib/utils";
import { StatsCardProps } from "@/types/myStats";

const StatsCard = ({
  Icon,
  iconBgColor,
  iconColor,
  title,
  value,
  className,
}: StatsCardProps) => {
  return (
    <FlexRow
      className={cn(
        className,
        `relative items-center w-full rounded-lg border shadow-md bg-white px-2 py-2 gap-2 lg:gap-4 lg:p-3`
      )}
    >
      <div
        className={`${iconBgColor} flex min-h-[2.5rem] min-w-[2.5rem] items-center justify-center rounded-full lg:min-h-[3.5rem] lg:min-w-[3.5rem]`}
      >
        <Icon className={`${iconColor} w-5 h-5 md:h-6 md:w-6 lg:h-8 lg:w-8`} />
      </div>
      <FlexColumn>
        <p className="text-sm font-semibold leading-4 text-matt-100 md:text-base md:leading-4 lg:text-lg lg:leading-normal">
          {value}
        </p>
        <p className="text-xs font-medium leading-4 tracking-tight text-gray-600 md:text-sm md:leading-4 lg:text-md lg:leading-normal">
          {title}
        </p>
      </FlexColumn>
    </FlexRow>
  );
};

export default StatsCard;
