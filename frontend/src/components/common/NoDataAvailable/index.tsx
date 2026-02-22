import Image from "next/image";
import React from "react";

import noDataFound from "@/assets/images/no-data-found.png";

import { FlexColumn } from "../Layouts";

type NoDataAvailableProps = {
  className?: string;
  titleClassName?: string;
};
const NoDataAvailable = ({
  titleClassName,
  className,
}: NoDataAvailableProps) => {
  return (
    <FlexColumn className="items-center justify-center p-4">
      <Image
        src={noDataFound}
        alt=""
        className={`${className} aspect-square h-[14rem] w-[14rem] object-contain`}
      />
      <p className={`${titleClassName} text-xl font-medium`}>
        No Data Available
      </p>
    </FlexColumn>
  );
};

export default NoDataAvailable;
