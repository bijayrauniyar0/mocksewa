import { format } from "date-fns";

import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import { capitalizeFirstLetter } from "@/lib/capitalizeFirstLetter";
import { SessionsBoxProps } from "@/types/myStats";

const SessionsBox = ({
  title,
  score,
  elapsed_time,
  created_at,
  className = "",
}: SessionsBoxProps) => {
  const metrics = [
    {
      name: "Score",
      value: score,
    },
    {
      name: "Seconds",
      value: elapsed_time,
    },
  ];
  return (
    <div
      className={`@container w-full items-center gap-2 px-4 py-4 ${className} border-b border-b-gray-200 last:border-0`}
    >
      <FlexRow className="justify-between items-center gap-4">
        <FlexColumn className="gap-4">
          <p className="text-ellipsis text-sm font-medium leading-4 md:w-[8rem] @md:text-md">
            {capitalizeFirstLetter(title)}
          </p>
          <FlexRow className="gap-2 @md:gap-4 items-center">
            {metrics.map((metric) => (
              <FlexRow
                className="w-fit items-center gap-1 p-2 bg-gray-100 rounded-2xl"
                key={metric.name}
              >
                <div className="h-3 w-3 @md:h-4 @md:w-4 bg-green-500 rounded-full mr-1" />
                <p className="text-sm font-semibold leading-3 text-matt-100 @md:text-md">
                  {metric.value}
                </p>
                <p className="text-xs leading-3 font-normal  tracking-tight text-matt-200 @md:text-sm">
                  {metric.name}
                </p>
              </FlexRow>
            ))}
          </FlexRow>
        </FlexColumn>
        <p className="text-xs @md:text-sm font-medium text-matt-200">
          {created_at ? format(new Date(created_at), "MMMM dd, yyyy") : ""}
        </p>
      </FlexRow>
    </div>
  );
};

export default SessionsBox;
