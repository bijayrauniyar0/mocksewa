import { FlexRow } from "@/components/common/Layouts";
import { Card } from "@/components/ui/card";
import { formatDate, getPerformanceColor } from "@/lib";

import { PerformanceDataType } from "..";

const PerformanceRow = ({
  created_at,
  score,
  elapsed_time,
  id,
  full_marks,
  unanswered_questions,
}: PerformanceDataType) => {
  const performanceColor = getPerformanceColor(full_marks, score);
  return (
    <Card
      className={`p-4 border-0 border-l-4 `}
      style={{ borderColor: performanceColor }}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start">
          <h4 className="text-md md:text-base font-semibold text-matt-100">
            Session {id}
          </h4>
          <p className="text-sm text-gray-500">{formatDate(created_at)}</p>
        </div>

        <FlexRow className="items-center gap-6">
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Score
            </p>
            <p
              className={`text-md md:text-base font-bold `}
              style={{ color: performanceColor }}
            >
              {score}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-orange-500 uppercase tracking-wide">
              Unattempted
            </p>
            <p className="text-md md:text-base font-bold text-orange-600">
              {unanswered_questions}
            </p>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Full Marks
            </p>
            <p className="text-md md:text-base font-bold text-primary-500">
              {full_marks}
            </p>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Time
            </p>
            <p className="text-md md:text-base font-bold text-gray-600">
              {elapsed_time} s
            </p>
          </div>
        </FlexRow>
      </div>
    </Card>
  );
};

export default PerformanceRow;
