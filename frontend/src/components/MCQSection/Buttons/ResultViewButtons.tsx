import { useRouter } from "next/navigation";
import React from "react";

import { FlexRow } from "@/components/common/Layouts";
import { useMCQContext } from "@/components/MCQSection/Context/MCQContext";
import { Button } from "@/components/ui/button";

const ResultViewButtons = React.memo(() => {
  const { setViewMode } = useMCQContext();
  const router = useRouter();
  return (
    <FlexRow className="gap-2 justify-end w-full">
      <Button
        onClick={() => {
          setViewMode("answers");
        }}
        variant="secondary"
        className="w-full md:w-fit"
      >
        Preview Answers
      </Button>
      <Button
        onClick={() => {
          router.refresh();
        }}
        className="w-full md:w-fit"
      >
        Try Again
      </Button>
    </FlexRow>
  );
});

ResultViewButtons.displayName = "ResultViewButtons";

export default ResultViewButtons;
