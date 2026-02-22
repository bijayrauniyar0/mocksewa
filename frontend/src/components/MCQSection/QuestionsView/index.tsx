import React, { memo } from "react";

import { FlexColumn } from "@/components/common/Layouts";
import { useMCQContext } from "@/components/MCQSection/Context/MCQContext";
import { cn } from "@/lib/utils";

import MCQButton from "./OptionButton";

const QuestionsView = () => {
  const {
    selectedOption,
    visibleQuestionId,
    viewMode,
    answers,
    questionsChunk,
    handleAnswerSelect,
    isOverviewExpanded,
  } = useMCQContext();

  const currentQuestion = questionsChunk[visibleQuestionId];

  if (!currentQuestion) {
    return (
      <div className="flex w-full px-4 flex-col gap-4 overflow-y-auto scrollbar-thin h-[calc(100dvh-11rem)] md:h-[calc(100dvh-14rem)] items-center justify-center">
        <p className="text-gray-500">No question available</p>
      </div>
    );
  }

  return (
    <FlexColumn className="w-full px-2 md:px-4 gap-4 overflow-y-auto scrollbar-thin h-[calc(100dvh-14.5rem)]">
      <p className="text-center font-semibold text-base md:text-lg lg:text-2xl">
        Q{currentQuestion.questionNumber}. {currentQuestion.question}
      </p>
      <div
        className={cn(
          "grid select-none grid-cols-1 gap-2 md:px-4 md:py-4",
          isOverviewExpanded ? "@min-4xl:grid-cols-2" : "@min-3xl:grid-cols-2"
        )}
      >
        {currentQuestion.options.map((option) => {
          const isOptionSelected =
            selectedOption[currentQuestion.id]?.answer === option.id;
          let correctAnswer = 0;
          if (answers && viewMode === "answers") {
            correctAnswer = answers[String(currentQuestion.id)];
          }
          return (
            <MCQButton
              value={option.value}
              onClick={() => {
                if (viewMode === "answers") return;
                handleAnswerSelect(
                  currentQuestion.id,
                  option.id,
                  currentQuestion.section_id
                );
              }}
              isOptionSelected={isOptionSelected}
              key={`${currentQuestion.id}-${option.id}`}
              isAnswerCorrect={correctAnswer === option.id}
            />
          );
        })}
      </div>
    </FlexColumn>
  );
};

export default memo(QuestionsView);
