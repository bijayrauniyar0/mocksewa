import { useEffect, useState } from "react";

import { useMCQContext } from "../Context/MCQContext";

const Timer = () => {
  const { setViewMode } = useMCQContext();
  const [timeOut, setTimeOut] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOut((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setViewMode("questions");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [setViewMode]);

  return (
    <span className="text-base font-bold text-primary-600">{timeOut}</span>
  );
};
export default Timer;
