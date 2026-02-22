"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface IDatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined;

  handleDate: (date: DateRange | undefined) => void;
  placeHolderClassName?: string;
}
export function DatePickerWithRange({
  className,
  date,
  handleDate,
  placeHolderClassName,
}: IDatePickerWithRangeProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-fit max-w-[15rem] justify-start text-left font-normal max-md:px-2 max-md:!text-xs",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="max-md:h-5 max-md:w-5" />
            <p className={`max-md:text-xs ${placeHolderClassName}`}>
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </p>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="z-[111] mt-2 w-auto rounded-lg border border-gray-300 !bg-white p-0 shadow-sm"
          align="end"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.to}
            selected={date}
            onSelect={handleDate}
            numberOfMonths={2}
            disabled={{ after: new Date() }}
            // month={date?.from}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
