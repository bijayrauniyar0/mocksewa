import { LucideIcon } from "lucide-react";

import { SectionType } from "@/components/MCQSection/Context/MCQContextTypes";

import { ReviewType } from "./home";

export interface TestsType {
  id: number;
  title: string;
  students_count: number;
  bookmark: boolean;
  last_accessed?: string;
}

export type MockTestMetaData = Omit<SectionType, "questions" | "section_id"> & {
  full_marks: number;
};
export type MarkingDetailsType = {
  name: string;
  value: number;
};
export type AccumulatorType = {
  full_marks: number;
  negative_marking: MarkingDetailsType[];
  marks_per_question: MarkingDetailsType[];
};
export type BaseMetaDataType = {
  time_limit: string;
  question_count: number;
};

interface ISection {
  id: number;
  name: string;
  marks_per_question: number;
  negative_marking: number;
  question_weight: number;
}
export interface MockTestMetaDataWithSections {
  id: number;
  title: string;
  description: string;
  time_limit: number;
  question_count: number;
  bookmark: boolean;
  sections: ISection[];
}

export type TestInfoKey =
  | "duration"
  | "full_marks"
  | "pass_marks"
  | "negative_marking"
  | "total_questions";

export interface TestMetaDataItem {
  id: number;
  label: string;
  value_key: TestInfoKey;
  icon: LucideIcon;
  icon_color: string;
}

export type ReviewWithoutMockTestType = Omit<ReviewType, "MockTest"> & {
  created_at: string;
};
