import { AlarmClock } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { FlexRow } from "@/components/common/Layouts";

import { useMCQContext } from "../Context/MCQContext";

const TimeBox = React.memo(() => {
  const { viewMode, mcqData, mode } = useMCQContext();
  const isPractice = mode === "practice";
  const [remainingTime, setRemainingTime] = useState(() => {
    return isPractice ? 0 : mcqData.time_limit * 60; // Initial time in seconds
  });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset timer when mcqData changes
    setRemainingTime(isPractice ? 0 : mcqData.time_limit * 60);
  }, [mcqData.time_limit, isPractice]);

  useEffect(() => {
    if (!isPractice && remainingTime <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    if (viewMode === "answers") {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    if (viewMode !== "questions") {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Start timer
    intervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (isPractice) return prev + 1; // Count up for practice
        const newTime = prev - 1;
        if (newTime <= 0) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [viewMode, remainingTime, isPractice]);

  // Calculate hours, minutes and seconds from remaining time
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  // Determine color based on remaining time percentage
  const getTimeColor = () => {
    const totalTime = mcqData.time_limit * 60;
    const percentageLeft = (remainingTime / totalTime) * 100;
    if (percentageLeft <= 10) return "text-red-500";
    if (percentageLeft <= 25) return "text-orange-500";
    return "text-gray-500";
  };

  return (
    <FlexRow className="justify-center w-full items-center gap-1">
      <AlarmClock
        className={`size-5 md:size-7 lg:size-8 items-center ${getTimeColor()}`}
      />
      <FlexRow
        className={`items-center justify-end gap-[1px] text-base md:text-xl lg:text-2xl ${getTimeColor()}`}
      >
        <span className="min-w-4">
          {hours.toString().length < 2 ? `0${hours}` : hours}
        </span>
        <span>:</span>
        <span className="min-w-4">
          {minutes.toString().length < 2 ? `0${minutes}` : minutes}
        </span>
        <span>:</span>
        <span className="min-w-4">
          {seconds.toString().length < 2 ? `0${seconds}` : seconds}
        </span>
      </FlexRow>
    </FlexRow>
  );
});

TimeBox.displayName = "TimeBox";

export default TimeBox;
