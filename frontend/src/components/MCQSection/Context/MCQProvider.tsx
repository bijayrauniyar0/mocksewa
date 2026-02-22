"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";

import { getElapsedTimeInSeconds } from "@/lib/index"; // Utility to chunk questions
import isEmpty from "@/lib/isEmpty";
import {
  createMcqUserScore,
  getDailyChallenge,
  getMcqs,
  submitDailyChallengeScore,
} from "@/services/ClientSide/academics";

import { MCQContext } from "./MCQContext";
import {
  MCQContextType,
  McqResponseType,
  QuestionType,
  SelectedOptionType,
} from "./MCQContextTypes";

type ViewMode = "answers" | "questions" | "results" | "instructions";

export const MCQProvider: React.FC<{
  children: React.ReactNode;
  isDailyChallenge?: boolean;
}> = ({ children, isDailyChallenge }) => {
  const queryClient = useQueryClient();
  const startTimeRef = useRef(new Date());

  const [selectedOption, setSelectedOption] = useState<SelectedOptionType>({});
  const [visibleQuestionId, setVisibleQuestionId] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("instructions");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const [solvedCount, setSolvedCount] = useState(0);

  const { mock_test_id } = useParams();
  const searchParams = useSearchParams();

  const { data: mcqRawData } = useQuery({
    queryKey: isDailyChallenge
      ? ["daily-challenge"]
      : ["mcq-data", mock_test_id, searchParams.get("mode")],
    queryFn: () =>
      isDailyChallenge
        ? getDailyChallenge()
        : getMcqs({
            mock_test_id,
            question_count: searchParams.get("question_count") || "20",
            mode: searchParams.get("mode") || "practice",
          }),
    select: ({ data }) => {
      if (isDailyChallenge && data.challenge) {
        return {
          ...data.challenge,
          questions: data.challenge.MCQs,
          questions_count: data.challenge.total_questions,
          title: data.challenge.title,
          time_limit: data.challenge.time_limit,
          id: data.challenge.id,
        };
      }
      return data;
    },
    enabled: isDailyChallenge || Boolean(mock_test_id),
  });
  const mcqData = mcqRawData as McqResponseType;

  useEffect(() => {
    if (!mcqData?.questions?.length) return;
    setVisibleQuestionId(mcqData.questions[0].id);
    // Reset solvedCount when new MCQ data is loaded
    setSolvedCount(0);
  }, [mcqData]);

  const questionsChunk = useMemo(() => {
    if (!mcqData?.questions || isEmpty(mcqData?.questions)) return {};
    return mcqData?.questions?.reduce(
      (acc, question, index) => {
        acc[question.id] = { ...question, questionNumber: index + 1 };
        return acc;
      },
      {} as Record<number, QuestionType & { questionNumber: number }>,
    );
  }, [mcqData]);

  // Handle answer selection with optimized solvedCount tracking
  const handleAnswerSelect = (
    questionId: number,
    optionId: number,
    sectionId: number,
  ) => {
    setSelectedOption((prev) => {
      const wasUnanswered = !prev[questionId]?.answer;
      if (wasUnanswered) {
        setSolvedCount((count) => count + 1);
      }
      return {
        ...prev,
        [questionId]: {
          answer: optionId,
          section_id: sectionId,
        },
      };
    });
  };

  const {
    data: submissionResponse,
    mutate: createLeaderboardRecord,
    isPending: answersIsLoading,
  } = useMutation({
    mutationFn: async (payload: Record<string, any>) => {
      const res = isDailyChallenge
        ? await submitDailyChallengeScore(payload)
        : await createMcqUserScore(payload);
      return res.data;
    },
    onSuccess: (data) => {
      setViewMode("results");
      setAnswers(data.answers);
      queryClient.invalidateQueries({ queryKey: ["mockTests"] });
    },
    onError: () => {
      toast.error("Failed to submit answers. Please try again.");
    },
  });

  const handleSubmit = async () => {
    const section_scores =
      mcqData?.questions.reduce(
        (acc, question) => {
          acc[question.section_id] = {
            ...acc[question.section_id],
            [question.id]: selectedOption[question.id]?.answer ?? null,
          };
          return acc;
        },
        {} as Record<number, Record<number, number | null>>,
      ) || {};

    const payload: any = {
      mock_test_id,
      mode: isDailyChallenge
        ? "challenge"
        : searchParams.get("mode") || "practice",
      section_scores,
      question_count: mcqData?.questions_count,
      time_limit: mcqData?.time_limit,
      // full_marks,
      elapsed_time: getElapsedTimeInSeconds(startTimeRef.current),
    };

    if (isDailyChallenge) {
      payload.challenge_id = mcqData?.id;
      payload.score = Object.values(section_scores).reduce((acc, section) => {
        const sectionValue = section as Record<number, number | null>;
        return (
          acc + Object.values(sectionValue).filter((v) => v !== null).length
        ); // Simple score for challenge
      }, 0);
    }

    createLeaderboardRecord(payload);
  };

  const handleNextQuestionClick = (nextQuestionId: number) => {
    setSelectedOption((prevSelections) => {
      return {
        ...prevSelections,
        [visibleQuestionId]: {
          answer: selectedOption?.[visibleQuestionId]?.answer || null,
          section_id: questionsChunk[visibleQuestionId].section_id,
        },
      };
    });
    setVisibleQuestionId(nextQuestionId);
  };

  const value: MCQContextType = {
    selectedOption,
    setSelectedOption,
    visibleQuestionId,
    viewMode,
    setViewMode,
    results: submissionResponse?.evaluation,
    questionsChunk,
    answersIsLoading,
    mcqData: mcqData ?? ({} as McqResponseType),
    solvedCount,
    answers,
    mode: isDailyChallenge
      ? "challenge"
      : searchParams.get("mode") || "practice",
    handleSubmit,
    isOverviewExpanded,
    setIsOverviewExpanded,
    handleNextQuestionClick,
    handleAnswerSelect,
  };

  return <MCQContext.Provider value={value}>{children}</MCQContext.Provider>;
};
