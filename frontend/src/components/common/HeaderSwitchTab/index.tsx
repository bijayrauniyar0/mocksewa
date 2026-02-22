"use client";
import { cn } from "@/lib/utils";

interface IHeaderSwitchTabProps {
  headerOptions: Record<string, any>;
  activeTab?: string;

  onChange?: (val: string) => void;
  className?: string;
  labelClassName?: string;
}

const HeaderSwitchTab = ({
  headerOptions,
  activeTab,
  onChange,
  className,
  labelClassName,
}: IHeaderSwitchTabProps) => {
  return (
    <div className={cn("flex w-fit items-center gap-2", className)}>
      {headerOptions.map((header: Record<string, any>) => (
        <div
          onClick={() => {
            if (onChange) {
              onChange(header.value);
            }
          }}
          key={header.id}
          className="cursor-pointer flex-col items-center"
        >
          <p
            className={`${labelClassName} px-3 rounded-lg py-2 text-sm font-semibold duration-200 md:text-base ${
              header.value === activeTab
                ? "text-primary-700"
                : "text-gray-500 hover:bg-gray-200"
            }`}
          >
            {header.label}
          </p>
          <div
            className={`${
              header.value === activeTab
                ? "bg-primary-700 py-0 h-[3px] w-full rounded-lg"
                : ""
            }`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default HeaderSwitchTab;
