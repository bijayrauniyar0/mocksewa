export type OptionType = {
  id: number;
  value: string;
};

export type QuestionType = {
  id: number;
  section_id: number;
  question: string;
  options: OptionType[];
  answer: string; // If it's always a string (e.g., "1")
};

export type SectionType = {
  name: string;
  section_id: number;
  question_count: number;
  marks_per_question: number;
  negative_marking: number;
};

export type McqResponseType = {
  id?: number;
  title: string;
  questions_count: number;
  time_limit: number;
  questions: QuestionType[];
  sections: SectionType[];
  full_marks: number;
};

export type SelectedOptionType = {
  [key: number]: {
    section_id: number;
    answer: number | null;
  };
};
export interface MCQContextType {
  selectedOption: SelectedOptionType;
  setSelectedOption: React.Dispatch<React.SetStateAction<SelectedOptionType>>;
  visibleQuestionId: number;
  viewMode: "answers" | "questions" | "results" | "instructions";
  setViewMode: React.Dispatch<
    React.SetStateAction<"answers" | "questions" | "results" | "instructions">
  >;
  results: { right: number; wrong: number; unanswered: number };
  questionsChunk: Record<number, QuestionType & { questionNumber: number }>;
  isOverviewExpanded: boolean;
  setIsOverviewExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  answersIsLoading: boolean;
  mcqData: McqResponseType;
  solvedCount: number;
  answers: Record<string, number>;
  mode: string;
  handleSubmit: () => void;
  handleNextQuestionClick: (nextQuestionId: number) => void;
  handleAnswerSelect: (
    questionId: number,
    optionId: number,
    sectionId: number,
  ) => void;
}
