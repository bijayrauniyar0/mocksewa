import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { FlexColumn } from "@/components/common/Layouts";
import { Button } from "@/components/ui/button";

const CountDown = () => {
  const router = useRouter();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [timeOut, setTimeOut] = useState(50);

  const startCountdown = useCallback((initialTime: number) => {
    let time = initialTime;

    intervalRef.current = setInterval(() => {
      setTimeOut(time);
      time -= 1;
      if (time < 0 && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 1000);
  }, []);

  useEffect(() => {
    startCountdown(timeOut);
    if (timeOut <= 0) {
      router.push(`/leaderboard`);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [router, startCountdown, timeOut]);

  const cancelInterval = () => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
  };
  return (
    <>
      {timeOut !== 0 && (
        <FlexColumn className="items-center gap-1">
          <p className="text-center text-sm font-medium leading-4 md:text-md">
            Redirecting to Mock Tests in{" "}
            <span className="text-primary-500">{timeOut}</span>
          </p>
          <Button
            variant="link"
            onClick={() => {
              cancelInterval();
              router.push(`/leaderboard`);
            }}
            className="h-fit !py-0"
          >
            Redirect Now
          </Button>
        </FlexColumn>
      )}
    </>
  );
};

export default CountDown;
