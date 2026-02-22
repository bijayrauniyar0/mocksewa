import Image from "next/image";
import React from "react";

import MockSewaLogo from "@/assets/images/logos/mocksewa2.png";
import { cn } from "@/lib/utils";

import { FlexRow } from "../../Layouts";

type LogoProps = {
  className?: string;
};
const Logo = ({ className }: LogoProps) => {
  return (
    <FlexRow className="cursor-pointer items-center gap-2">
      <Image src={MockSewaLogo} alt="MS Logo" width={32} height={32} priority />
      <p className={cn("text-xl font-bold text-primary-700", className)}>
        MockSewa
      </p>
    </FlexRow>
  );
};

export default Logo;
