"use client";
import React, { useRef, useState } from "react";

import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import isEmpty from "@/lib/isEmpty";

import QuestionsViewButtons from "./Buttons/QuestionViewButtons";
import ResultsViewButtons from "./Buttons/ResultViewButtons";
import { useMCQContext } from "./Context/MCQContext";
import Header from "./Header";
import InfoView from "./InfoView";
import InstructionsView from "./InstructionsView";
import MCQSkeleton from "./MCQSkeleton";
import OverviewMode from "./OverviewMode";
import QuestionsView from "./QuestionsView";
import ResultsView from "./ResultsView";
import TimeBox from "./TimeBox";

// View mode mappings for better performance and maintainability
const VIEW_COMPONENTS = {
  questions: QuestionsView,
  answers: QuestionsView,
  results: ResultsView,
  instructions: InstructionsView,
} as const;

const BUTTON_COMPONENTS = {
  questions: QuestionsViewButtons,
  answers: QuestionsViewButtons,
  results: ResultsViewButtons,
} as const;

const MCQBox = () => {
  const { mcqData, viewMode } = useMCQContext();
  const fullScreenRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const renderCurrentView = () => {
    const ViewComponent =
      VIEW_COMPONENTS[viewMode as keyof typeof VIEW_COMPONENTS];
    return ViewComponent ? <ViewComponent /> : null;
  };

  const renderViewButtons = () => {
    const ButtonComponent =
      BUTTON_COMPONENTS[viewMode as keyof typeof BUTTON_COMPONENTS];
    return ButtonComponent ? <ButtonComponent /> : null;
  };

  const handleFullScreen = () => {
    if (fullScreenRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullScreen(false);
      } else {
        fullScreenRef.current.requestFullscreen();
        setIsFullScreen(true);
      }
    }
  };

  const showSidebar = viewMode === "questions" || viewMode === "answers";
  return (
    <div
      ref={fullScreenRef}
      className="relative mx-auto w-full overflow-hidden border bg-white h-screen"
    >
      {!mcqData || isEmpty(mcqData) ? (
        <MCQSkeleton />
      ) : (
        <FlexColumn className="items-end relative gap-3 md:gap-5">
          <Header
            handleFullScreen={handleFullScreen}
            isFullScreen={isFullScreen}
          />

          <div className="flex flex-col md:flex-row w-full px-4 gap-4 h-full overflow-hidden">
            <div className="@container relative flex-1 border w-full rounded-lg p-4 bg-white overflow-y-auto">
              <InfoView />
              {viewMode === "questions" && (
                <FlexRow className="items-center justify-center w-full py-4">
                  <TimeBox />
                </FlexRow>
              )}
              <div className="w-full">{renderCurrentView()}</div>
              <div className="w-full md:block">{renderViewButtons()}</div>
            </div>

            {showSidebar && <OverviewMode />}
          </div>
        </FlexColumn>
      )}
    </div>
  );
};

MCQBox.displayName = "MCQBox";

export default MCQBox;
