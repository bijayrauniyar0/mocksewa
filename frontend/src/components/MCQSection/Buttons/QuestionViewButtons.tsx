import { MoveLeft, MoveRight } from "lucide-react";
import React from "react";

import { FlexRow } from "@/components/common/Layouts";
import { useMCQContext } from "@/components/MCQSection/Context/MCQContext";
import { Button } from "@/components/ui/button";

// Constants for button styling
const BUTTON_CLASSES =
  "text-xs max-md:h-fit max-md:px-3 max-md:py-2 md:text-sm";

const QuestionsViewButtons = React.memo(() => {
  const {
    visibleQuestionId,
    questionsChunk,
    mcqData: { questions },
    handleNextQuestionClick,
  } = useMCQContext();

  const currentQuestionIndex =
    questionsChunk[visibleQuestionId].questionNumber - 1;

  return (
    <FlexRow className="w-full justify-between gap-4">
      <Button
        variant="outline"
        className={BUTTON_CLASSES}
        onClick={() => {
          if (currentQuestionIndex === 0) return;
          handleNextQuestionClick(questions[currentQuestionIndex - 1].id);
        }}
        disabled={currentQuestionIndex === 0}
      >
        <MoveLeft className="size-4" />
        PREV
      </Button>
      <Button
        className={BUTTON_CLASSES}
        onClick={() => {
          if (currentQuestionIndex === questions.length - 1) return;
          handleNextQuestionClick(questions[currentQuestionIndex + 1]?.id);
        }}
        disabled={currentQuestionIndex === questions.length - 1}
      >
        NEXT
        <MoveRight className="size-4" />
      </Button>
    </FlexRow>
  );
});

QuestionsViewButtons.displayName = "QuestionsViewButtons";

export default QuestionsViewButtons;
