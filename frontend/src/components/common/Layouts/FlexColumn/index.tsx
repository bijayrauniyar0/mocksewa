import { cn } from "@/lib/utils";

import { IFlexContainerProps } from "../types";

export default function FlexColumn({
  className = "",
  children,
  ...rest
}: IFlexContainerProps) {
  return (
    <div className={cn(`flex flex-col ${className}`)} {...rest}>
      {children}
    </div>
  );
}
