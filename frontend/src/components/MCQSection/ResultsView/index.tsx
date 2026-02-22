import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import Skeleton from "@/components/ui/Skeleton";
import { endStats } from "@/constants/QuestionsBox";

import { useMCQContext } from "../Context/MCQContext";
import CountDown from "./CountDown";

const ResultsView = () => {
  const { results, answersIsLoading } = useMCQContext();

  return (
    <div className="mx-auto h-[calc(100vh-15rem)] md:h-[calc(100vh-17rem)] flex justify-center items-center px-4">
      <FlexColumn className="flex w-full items-center gap-6">
        <FlexColumn className="w-full items-center gap-1">
          <p className="text-base font-semibold leading-4 md:text-lg md:leading-normal">
            Challenge Completed
          </p>
          <p className="text-center text-sm leading-4 md:text-base">
            You&apos;ve finished all the problems! Here&apos;s your performance
            summary
          </p>
        </FlexColumn>
        <FlexColumn className="w-full gap-4 rounded-lg bg-gray-100 px-2 py-4 md:px-6 md:py-6 md:pt-4">
          <p className="text-center text-md font-semibold md:text-base">
            Your Stats:
          </p>
          <FlexColumn className="items-start gap-4">
            {endStats.map((stat, idx) => (
              <FlexRow key={idx} className="items-center gap-2">
                <div
                  className={`${stat.bg_color} rounded-full p-1 flex justify-center items-center`}
                >
                  <stat.icon
                    className={`${stat.color} h-4 w-4 md:h-6 md:w-6`}
                  />
                </div>
                {answersIsLoading ? (
                  <Skeleton className="h-6 w-64" />
                ) : (
                  <p className="text-md font-medium leading-4 tracking-tight md:text-base md:tracking-normal">{`${
                    results?.[stat.keyName as keyof typeof results]
                  } ${stat.text}`}</p>
                )}
              </FlexRow>
            ))}
          </FlexColumn>
          <CountDown />
        </FlexColumn>
      </FlexColumn>
    </div>
  );
};

export default ResultsView;
