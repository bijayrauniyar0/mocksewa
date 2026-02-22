import { BookOpen, Clock, DoorOpen, Expand, GridIcon } from "lucide-react";
import { useMemo } from "react";

import { FlexColumn, FlexRow, Grid } from "@/components/common/Layouts";
import { Button } from "@/components/ui/button";

import { useMCQContext } from "../Context/MCQContext";
import Timer from "./Timer";

const InstructionsView = () => {
  const { mcqData, setViewMode } = useMCQContext();

  const instructionDetails = useMemo(
    () => [
      {
        label: `${mcqData.time_limit} Minutes`,
        icon: <Clock className="h-4 w-4 text-primary-600 md:h-5 md:w-5" />,
      },
      {
        label: `${mcqData.questions_count} Questions`,
        icon: <BookOpen className="h-4 w-4 text-primary-600 md:h-5 md:w-5" />,
      },
    ],
    [mcqData.questions_count, mcqData.time_limit]
  );

  return (
    <div className="mx-auto h-[calc(100dvh-8rem)] md:h-[calc(100dvh-8rem)] flex justify-center items-center px-4">
      <FlexColumn className="mx-auto max-w-full items-center justify-center gap-4 md:gap-6 lg:max-w-[60%]">
        <p className="text-base font-semibold text-primary-600 md:text-lg">
          Challenge Yourself!
        </p>

        <Grid className="grid-cols-2">
          {instructionDetails.map((instruction) => {
            return (
              <FlexRow
                className="flex-1 items-center gap-2"
                key={instruction.label}
              >
                <div className="rounded-lg bg-primary-100 p-2">
                  {instruction.icon}
                </div>
                <p className="text-sm font-semibold leading-3 md:text-md">
                  {instruction.label}
                </p>
              </FlexRow>
            );
          })}
        </Grid>

        <FlexColumn className="w-full items-start gap-2 md:gap-4 rounded-lg bg-white shadow-md border-gray-100 border p-4">
          <FlexRow className="items-center gap-2">
            <div className="rounded-md bg-red-400 p-1">
              <DoorOpen className="h-4 w-4 cursor-pointer rounded-lg text-white md:h-5 md:w-5" />
            </div>
            <p className="text-sm md:text-md">
              You can leave anytime you want !
            </p>
          </FlexRow>
          <FlexRow className="items-center gap-2">
            <div className="rounded-md bg-blue-400 p-1">
              <Expand className="h-4 w-4 cursor-pointer rounded-lg text-white md:h-5 md:w-5" />
            </div>
            <p className="text-sm md:text-md">
              Toggle full screen to avoid distraction !
            </p>
          </FlexRow>
          <FlexRow className="items-center gap-2">
            <div className="rounded-md bg-gray-300 p-1">
              <GridIcon className="h-4 w-4 cursor-pointer rounded-lg text-white md:h-5 md:w-5" />
            </div>
            <p className="text-sm md:text-md">Switch between sections !</p>
          </FlexRow>
        </FlexColumn>
        <FlexColumn className="gap-2 md:gap-4">
          <p className="text-sm md:text-md">
            Exam starting in <Timer /> seconds
          </p>
          <Button
            className="mx-auto w-fit"
            onClick={() => {
              setViewMode("questions");
            }}
          >
            Start Now
          </Button>
        </FlexColumn>
      </FlexColumn>
    </div>
  );
};

export default InstructionsView;
