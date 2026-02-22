import { Loader2 } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center",
        className
      )}
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary-700" />
    </div>
  );
};

export default Spinner;
