import { Info } from "lucide-react";

import ToolTip from "@/components/ui/tooltip";

export interface IInputLabelProps {
  label: string | undefined;
  tooltipMessage?: string;
  astric?: boolean;
  id?: string;
  disabled?: boolean;
  className?: string;
}

export default function InputLabel({
  label,
  tooltipMessage,
  astric,
  id,
  disabled,
  className,
}: IInputLabelProps) {
  return (
    <div
      className={` flex items-center gap-x-[0.375rem] ${className} ${
        disabled ? "text-gray-600" : ""
      }`}
    >
      <div className="flex items-center">
        <p id={id} className="text-md text-gray-700">
          {label}
        </p>
        {astric ? <span className="text-red-700">&nbsp;*</span> : null}
      </div>
      <div className="mt-[2px] h-5 w-5">
        {tooltipMessage ? (
          <ToolTip
            triggerChildren={<Info className="size-4 text-matt-200" />}
            message={tooltipMessage || "tooltip"}
          />
        ) : null}
      </div>
    </div>
  );
}
