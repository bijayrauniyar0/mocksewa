import React from "react";

import { useMCQContext } from "../Context/MCQContext";

type ViewMode = "answers" | "questions" | "results" | "instructions";

// Style constants for better maintainability
const BUTTON_STYLES = {
  base: "flex cursor-pointer items-center justify-start gap-2 rounded-md border p-3 transition-all duration-200 ease-in-out md:gap-4 lg:p-4",
  hover: "hover:border-primary-500",
  selected: "border-primary-500 bg-primary-400",
  correct: "bg-green-100 border-green-500",
  wrong: "bg-red-100 border-red-500",
  default: "border-gray-200",
} as const;

const LABEL_STYLES = {
  selected: "border-white bg-primary-400 border-[3px]",
  correct: "bg-green-700 border-white border-[3px]",
  wrong: "bg-red-700 border-white border-[3px]",
  default: "bg-primary-500",
} as const;

type MCQButtonProps = {
  value: string;
  onClick: () => void;
  isOptionSelected: boolean;
  isAnswerCorrect: boolean;
};

const MCQButton = React.memo(
  ({ value, onClick, isOptionSelected, isAnswerCorrect }: MCQButtonProps) => {
    const { viewMode } = useMCQContext();
    const getButtonClassName = (
      view: ViewMode,
      isOptionSelected: boolean,
      isCorrectAnswer: boolean
    ): string => {
      if (view === "questions" && isOptionSelected) {
        return BUTTON_STYLES.selected;
      }

      if (view === "answers") {
        if (isCorrectAnswer) {
          return BUTTON_STYLES.correct;
        }

        if (isOptionSelected && !isCorrectAnswer) {
          return BUTTON_STYLES.wrong;
        }
      }

      return BUTTON_STYLES.default;
    };

    const getButtonLabelClassName = (
      view: ViewMode,
      isOptionSelected: boolean,
      isCorrectAnswer: boolean
    ): string => {
      if (view === "questions" && isOptionSelected) {
        return LABEL_STYLES.selected;
      }

      if (view === "answers") {
        if (isCorrectAnswer) {
          return LABEL_STYLES.correct;
        }

        if (isOptionSelected && !isCorrectAnswer) {
          return LABEL_STYLES.wrong;
        }
      }

      return LABEL_STYLES.default;
    };

    return (
      <button
        className={`${BUTTON_STYLES.base} ${getButtonClassName(
          viewMode,
          isOptionSelected,
          isAnswerCorrect
        )} ${viewMode === "questions" ? BUTTON_STYLES.hover : ""}`}
        onClick={onClick}
      >
        <div className="relative">
          <div
            className={`h-3 w-3 rounded-full md:h-4 md:w-4 ${getButtonLabelClassName(
              viewMode,
              isOptionSelected,
              isAnswerCorrect
            )}`}
            style={{
              transition:
                "border-width 100ms ease-in-out, background-color 300ms ease-in-out",
            }}
          />
        </div>
        <p
          className={`text-start text-md leading-5 md:leading-7 md:text-base lg:text-lg ${
            isOptionSelected && viewMode === "questions"
              ? "text-white"
              : "text-gray-700"
          }`}
        >
          {value}
        </p>
      </button>
    );
  }
);

MCQButton.displayName = "MCQButton";

export default MCQButton;
