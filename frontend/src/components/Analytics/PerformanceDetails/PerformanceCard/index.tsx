import { Calendar, Clock, Target, X } from "lucide-react";

import { Card } from "@/components/ui/card";
import { formatDate, getPerformanceColor } from "@/lib";

import { PerformanceDataType } from "..";

const PerformanceCard = ({
  created_at,
  score,
  elapsed_time,
  id,
  full_marks,
  unanswered_questions,
}: PerformanceDataType) => {
  const stats = [
    {
      bgColor: "bg-blue-50",
      icon: <Calendar className="w-5 h-5 text-blue-600 mx-auto mb-2" />,
      label: "Date",
      labelColor: "text-blue-600",
      value: formatDate(created_at),
    },
    {
      bgColor: "bg-orange-50",
      icon: <X className="w-5 h-5 text-orange-600 mx-auto mb-2" />,
      label: "Unattempted",
      labelColor: "text-orange-600",
      value: unanswered_questions,
    },
    {
      bgColor: "bg-primary-50",
      icon: <Target className="w-5 h-5 text-primary-600 mx-auto mb-2" />,
      label: "Full Marks",
      labelColor: "text-primary-600",
      value: full_marks,
    },
    {
      bgColor: "bg-gray-50",
      icon: <Clock className="w-5 h-5 text-gray-600 mx-auto mb-2" />,
      label: "Time",
      labelColor: "text-gray-600",
      value: `${elapsed_time} s`,
    },
  ];

  const performanceColor = getPerformanceColor(full_marks, score);
  return (
    <Card
      className={`p-4 border-0 border-l-4 flex flex-col gap-2`}
      style={{ borderColor: performanceColor }}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-md md:text-base text-matt-100">
          Session {id}
        </h3>

        <div
          className={`px-3 py-1 rounded-full text-xs font-bold`}
          style={{ backgroundColor: performanceColor, color: "#fff" }}
        >
          Score: {score}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
        {stats.map((card, idx) => (
          <div
            key={idx}
            className={`text-center p-1 rounded-md ${card.bgColor}`}
          >
            {card.icon}
            <p className={`text-xs font-medium ${card.labelColor}`}>
              {card.label}
            </p>
            <p className="text-xs md:text-sm font-bold text-matt-100">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PerformanceCard;
