import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import React from "react";

import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import { cn } from "@/lib/utils";

import { useMCQContext } from "../Context/MCQContext";

const OverviewMode = React.memo(() => {
  const {
    solvedCount,
    mcqData,
    selectedOption,
    visibleQuestionId,
    isOverviewExpanded,
    setIsOverviewExpanded,
    handleNextQuestionClick,
  } = useMCQContext();

  return (
    <FlexColumn
      className={cn(
        "gap-2 rounded-lg md:transition-[width] transition-[height] max-md:w-full  duration-300 ease-in-out border max-md:fixed z-50 bg-white max-md:bottom-0 max-md:left-0 relative md:h-[calc(100dvh-5.75rem)] h-full",
        isOverviewExpanded
          ? "md:w-56 lg:w-64 max-md:h-96"
          : "md:w-16 max-md:h-10"
      )}
    >
      <FlexRow
        onClick={() => {
          setIsOverviewExpanded(!isOverviewExpanded);
        }}
        className={cn(
          "p-2 border-b md:pointer-events-none max-md:cursor-pointer items-center justify-between max-md:bg-primary-700 max-md:text-white bg-white z-50"
        )}
      >
        <div
          className={cn("", isOverviewExpanded ? "block" : "block md:hidden")}
        >
          <p>
            Questions <span className="md:hidden">Quick View</span>
          </p>
        </div>
        <FlexRow className="items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-400" />
          <p className="text-xs text-white md:text-gray-700 md:text-sm">
            {solvedCount}/{mcqData.questions_count}&nbsp;
            {isOverviewExpanded && <span>Solved</span>}
          </p>
          <div className="md:hidden">
            {isOverviewExpanded ? <ChevronDown /> : <ChevronUp />}
          </div>
        </FlexRow>
      </FlexRow>
      <div
        className={cn(
          "scrollbar-thin grid  gap-2 max-h-[calc(100dvh-8.5rem)] overflow-y-auto p-2",
          isOverviewExpanded
            ? "grid-cols-3 max-md:grid-cols-6 max-md:h-96 md:grid-cols-5"
            : "max-md:h-0 grid-cols-1"
        )}
      >
        {mcqData?.questions.map((question, index) => {
          const selectedOptionValue = selectedOption[question.id]?.answer;
          const isQuestionVisible = visibleQuestionId === question.id;
          return (
            <button
              key={question.id}
              onClick={() => {
                handleNextQuestionClick(question.id);
              }}
              className={cn(
                "flex items-center justify-center rounded-sm p-1 min-h-8 min-w-8 border ",
                selectedOptionValue === null && "bg-red-700 text-white",
                !!selectedOptionValue && "bg-green-600 text-white",
                isQuestionVisible && "bg-primary-700 text-white"
              )}
            >
              <p className="text-sm md:text-md leading-3">{index + 1}</p>
            </button>
          );
        })}
      </div>
      <button
        className={cn(
          "absolute max-md:hidden flex justify-center items-center top-8 -left-[1.875rem] bg-primary-600 text-secondary rounded-l-lg border shadow px-1 h-16"
        )}
        onClick={() => setIsOverviewExpanded(!isOverviewExpanded)}
      >
        {isOverviewExpanded ? (
          <ChevronRight className="size-5" />
        ) : (
          <ChevronLeft className="size-5" />
        )}
      </button>
    </FlexColumn>
  );
});

OverviewMode.displayName = "OverviewMode";

export default OverviewMode;
