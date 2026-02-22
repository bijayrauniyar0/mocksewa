import { Check, DoorOpen } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import { ConfirmationDialog } from "@/components/common/Confirmation";
import { FlexRow } from "@/components/common/Layouts";
import { Button } from "@/components/ui/button";

import { useMCQContext } from "../Context/MCQContext";

const BUTTON_CLASSES =
  "text-xs max-md:h-fit max-md:px-3 max-md:py-2 md:text-sm";
const ICON_CLASSES = "h-4 w-4 cursor-pointer md:h-5 md:w-5";
const EXIT_BUTTON_CLASSES =
  "text-xs max-md:h-fit max-md:px-3 max-md:py-2 md:text-sm text-nowrap";

const SubmitButton = React.memo(() => {
  const { mock_test_id } = useParams();
  const router = useRouter();
  const { solvedCount, handleSubmit, mcqData } = useMCQContext();
  const viewMode = "questions"; // Placeholder for actual viewMode from context
  if (viewMode !== "questions" && viewMode !== "answers") {
    return null;
  }
  const submitButton: { [key: string]: React.ReactNode } = {
    questions: (
      <FlexRow className="gap-2">
        {solvedCount > 0 ? (
          <ConfirmationDialog
            description="Are you sure you want to leave the exam?"
            confirmText="Leave"
            triggerChildren={
              <Button variant="secondary" className={BUTTON_CLASSES}>
                <DoorOpen className={ICON_CLASSES} />
                Cancel
              </Button>
            }
            handleConfirm={() => {
              router.push(`/mock-tests/${mock_test_id}`);
            }}
          />
        ) : (
          <Link href={`/mock-tests/${mock_test_id}`}>
            <Button variant="secondary" className={BUTTON_CLASSES}>
              <DoorOpen className={ICON_CLASSES} />
              Cancel
            </Button>
          </Link>
        )}
        {solvedCount !== mcqData.questions_count ? (
          <ConfirmationDialog
            title="Are you sure you want to submit?"
            description="There are unanswered questions!"
            confirmText="Submit"
            overlayClassName="bg-black/50"
            triggerChildren={
              <Button className={BUTTON_CLASSES} variant="primary">
                <Check className={ICON_CLASSES} />
                Submit
              </Button>
            }
            handleConfirm={() => {
              handleSubmit();
            }}
          />
        ) : (
          <Button
            className={BUTTON_CLASSES}
            variant="secondary"
            onClick={() => {
              handleSubmit();
            }}
          >
            <Check className={ICON_CLASSES} />
            Submit
          </Button>
        )}
      </FlexRow>
    ),
    answers: (
      <Link href={`/mock-tests`}>
        <Button className={EXIT_BUTTON_CLASSES} variant="secondary">
          Exit
        </Button>
      </Link>
    ),
  };

  return <>{submitButton[viewMode]}</>;
});

SubmitButton.displayName = "SubmitButton";

export default SubmitButton;
