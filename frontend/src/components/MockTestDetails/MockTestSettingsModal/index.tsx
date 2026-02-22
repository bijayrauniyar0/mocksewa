import React from "react";

import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import Modal from "@/components/common/Modal";

type MockTestModalProps = {
  initialCount: number; // Optional initial count
  count: number;
  handleCountChange: (count: number) => void;
  showSettings: boolean; // Optional prop to control visibility
  handleShowSettings: () => void; // Optional prop to handle visibility
};
export function generatePercentageOptions(
  totalQuestionCount: number
): number[] {
  const percentages = [25, 50, 75, 100];
  return percentages.map((p) => Math.round((p / 100) * totalQuestionCount));
}

const MockTestModal = ({
  count,
  handleCountChange,
  initialCount,
  handleShowSettings,
  showSettings,
}: MockTestModalProps) => {
  const numberOfQuestions = generatePercentageOptions(initialCount); // Assuming 100 is the total number of questions
  return (
    <Modal
      title="Mock Test Settings"
      show={showSettings}
      onClose={() => handleShowSettings()}
    >
      <FlexColumn>
        <p>Choose Number of Questions</p>
        <FlexRow>
          {numberOfQuestions.map((num) => (
            <button
              key={num}
              className={`px-4 py-2 border ${
                count === num
                  ? "bg-primary-600 text-white"
                  : "border-gray-300 text-matt-100 hover:bg-primary-600 hover:text-white"
              } rounded-md m-1 flex duration-300 transition-all ease-in-out`}
              onClick={() => handleCountChange(num)}
            >
              {num}
            </button>
          ))}
        </FlexRow>
      </FlexColumn>
    </Modal>
  );
};

export default MockTestModal;
