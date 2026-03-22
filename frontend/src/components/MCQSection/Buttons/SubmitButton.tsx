import { Check, DoorOpen, Home } from "lucide-react";
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
  const {
    solvedCount,
    handleSubmit,
    mcqData,
    viewMode,
    mode,
    answersIsLoading,
  } = useMCQContext();

  const exitPath = mode === "challenge" ? "/" : `/mock-tests/${mock_test_id}`;

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
              router.push(exitPath);
            }}
          />
        ) : (
          <Link href={exitPath}>
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
              <Button
                className={BUTTON_CLASSES}
                variant="primary"
                disabled={answersIsLoading}
              >
                <Check className={ICON_CLASSES} />
                {answersIsLoading ? "Submitting..." : "Submit"}
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
            disabled={answersIsLoading}
            onClick={() => {
              handleSubmit();
            }}
          >
            <Check className={ICON_CLASSES} />
            {answersIsLoading ? "Submitting..." : "Submit"}
          </Button>
        )}
      </FlexRow>
    ),
    answers: (
      <Link href="/">
        <Button className={EXIT_BUTTON_CLASSES} variant="secondary">
          <Home className={ICON_CLASSES} />
          Go Home
        </Button>
      </Link>
    ),
    results: (
      <Link href="/">
        <Button className={EXIT_BUTTON_CLASSES} variant="secondary">
          <Home className={ICON_CLASSES} />
          Go Home
        </Button>
      </Link>
    ),
  };

  return <>{submitButton[viewMode]}</>;
});



SubmitButton.displayName = "SubmitButton";

export default SubmitButton;
