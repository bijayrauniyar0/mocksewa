import {
  Clock,
  Crosshair,
  ListOrdered,
  PercentCircle,
  Star,
  Users,
} from "lucide-react";


export const mockTestInfoStats = [
  {
    icon: Star,
    iconColor: "text-yellow-400",
    label: "Rating",
    valueKey: "rating",
  },
  {
    icon: Users,
    iconColor: "text-purple-500",
    label: "Students",
    valueKey: "students_count",
  },
  {
    icon: Star,
    iconColor: "text-purple-500",
    label: "Reviews",
    valueKey: "students_count_2", // You can replace this with `reviews_count` if available
  },
];

export const testMetaData = [
  {
    id: 1,
    label: "Time (in Minutes)",
    icon: Clock,
    icon_color: "text-blue-300",
    value_key: "time_limit",
    className: "bg-blue-50",
  },
  {
    id: 4,
    label: "Negative Marking",
    icon: PercentCircle,
    icon_color: "text-red-400",
    value_key: "negative_marking",
    className: "bg-red-50",
  },
  {
    id: 5,
    label: "Number of Questions",
    value_key: "question_count",
    icon: ListOrdered,
    icon_color: "text-green-400",
    className: "bg-green-50",
  },
  {
    id: 3,
    label: "Marks per Question",
    icon: Crosshair,
    icon_color: "text-yellow-400",
    value_key: "marks_per_question",
    className: "bg-yellow-50",
  },
];
