import { Maximize, Minimize } from "lucide-react";
import React from "react";

import { FlexRow } from "@/components/common/Layouts";
import Logo from "@/components/common/Navbar/Logo";

import SubmitButton from "../Buttons/SubmitButton";
import { useMCQContext } from "../Context/MCQContext";

type HeaderProps = {
  isFullScreen: boolean;
  handleFullScreen: () => void;
};
const Header = ({ isFullScreen, handleFullScreen }: HeaderProps) => {
  const { mcqData, mode } = useMCQContext();
  return (
    <FlexRow className="px-4 flex w-full flex-wrap items-center justify-between border-b border-gray-300 py-2">
      <FlexRow className="items-center gap-2 md:gap-4">
        <Logo className="max-sm:hidden" />
        <h3 className="text-md max-md:hidden text-gray-600 font-semibold md:text-base">
          Exam: {mcqData.title}
        </h3>
        {mode === "challenge" && (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-yellow-200 uppercase tracking-wider">
            Daily Challenge
          </span>
        )}
        {mode === "ranked" && (
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wider">
            Ranked Mode
          </span>
        )}
      </FlexRow>


      <FlexRow className="items-center gap-2">
        <button
          onClick={handleFullScreen}
          className="w-10 h-10 max-md:w-8 max-md:h-8 flex items-center justify-center border border-gray-300 bg-white rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-gray-600 hover:text-gray-900"
          title={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          aria-label={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullScreen ? (
            <Minimize className="w-5 h-5" />
          ) : (
            <Maximize className="w-5 h-5" />
          )}
        </button>
        <SubmitButton />
      </FlexRow>
    </FlexRow>
  );
};

export default Header;
