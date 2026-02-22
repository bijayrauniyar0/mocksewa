import { Calendar, CheckCircle, Medal, Trophy } from "lucide-react";

import { ChartConfig } from "@/components/ui/chart";

export const modeDropDownOptions = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Ranked",
    value: "ranked",
  },
  {
    label: "Practice",
    value: "practice",
  },
];
export const timePeriodDropDownOptions = [
  {
    label: "Last 7 Days",
    value: "last_7_days",
  },
  {
    label: "Last 30 Days",
    value: "last_30_days",
  },
  {
    label: "All Time",
    value: "all_time",
  },
];

export const statsData = [
  {
    title: "Average Accuracy",
    value_key: "avg_accuracy",
    Icon: CheckCircle,
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100",
  },
  {
    title: "Score",
    value_key: "score",
    Icon: Medal,
    iconColor: "text-green-700",
    iconBgColor: "bg-green-100",
  },
  {
    title: "Total Sessions",
    value_key: "total_sessions",
    Icon: Calendar,
    iconColor: "text-purple-600",
    iconBgColor: "bg-purple-100",
  },
  {
    title: "Questions Solved",
    value_key: "total_questions",
    Icon: CheckCircle,
    iconColor: "text-orange-600",
    iconBgColor: "bg-orange-100",
  },
  {
    title: "Current Rank",
    value_key: "current_rank",
    Icon: Trophy,
    iconColor: "text-amber-600",
    iconBgColor: "bg-amber-100",
  },
];

export const radarMetricsLabels: {
  [key: string]: { label: string; description: string };
} = {
  accuracy: {
    label: "Accuracy",
    description:
      "Percentage of total marks obtained out of full marks. Higher is better.",
  },
  avg_elapsed_time: {
    label: "Elapsed Time",
    description:
      "Efficiency of time usage compared to allowed time. Lower is better.",
  },
  tests_taken: {
    label: "Tests Taken",
    description:
      "Number of attempts made for this subject or mock test. Higher indicates more practice.",
  },
  improvement_rate: {
    label: "Improvement Rate",
    description:
      "Progress in performance from first attempt to most recent. Higher is better.",
  },
  avg_unanswered_questions: {
    label: "Unanswered",
    description:
      "Average percentage of questions left unanswered. Lower is better.",
  },
};

export const chartConfig = {
  currentData: {
    label: "Total Score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export const chartKeysData = [
  {
    label: "Avg Score",
    value: "avg_score",
    color: "#3b82f6", // Medium Blue
  },
  {
    label: "Avg Elapsed Time (in Minutes)",
    value: "avg_elapsed_time",
    color: "#1e3a8a", // Dark Blue
  },
  {
    label: "Avg Accuracy (%)",
    value: "avg_accuracy",
    color: "#10b981", // Emerald
  },
  {
    label: "Total Questions Solved",
    value: "total_questions",
    color: "#f59e0b", // Amber
  },
  {
    label: "Sessions Completed",
    value: "total_sessions",
    color: "#8b5cf6", // Purple
  },
];

export const filterByOptions = [
  {
    label: "Last 3 days",
    value: "last_3_days",
  },
  {
    label: "Last 3 Weeks",
    value: "last_3_weeks",
  },
  {
    label: "Last 3 Months",
    value: "last_3_months",
  },
];
