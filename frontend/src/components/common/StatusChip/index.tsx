import React from "react";

import { cn } from "@/lib/utils";

type StatusType =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "default"
  | "theme";

interface StatusChipProps {
  label: string;
  status?: StatusType;
  labelClassName?: string;
}

const statusColors: Record<StatusType, string> = {
  success: "bg-green-50 text-green-600",
  warning: "bg-yellow-50 text-yellow-600",
  error: "bg-red-50 text-red-600",
  info: "bg-blue-50 text-blue-600",
  default: "bg-gray-50 text-gray-600",
  theme: "bg-primary-50 text-primary-600",
};

const StatusChip: React.FC<StatusChipProps> = ({
  label,
  status = "default",
  labelClassName,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full px-3 py-1 w-fit",
        statusColors[status]
      )}
    >
      <p
        className={`${labelClassName} text-xs font-normal capitalize md:text-sm`}
      >
        {label}
      </p>
    </div>
  );
};

export default StatusChip;
