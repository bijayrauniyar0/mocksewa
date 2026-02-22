"use client";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  AlertCircle,
  BookOpen,
  Clipboard,
  Clock,
  Crosshair,
  ListOrdered,
  PercentCircle,
  Settings2,
  TrendingUp,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

import BreadCrumb from "@/components/common/FormComponent/BreadCrumb";
import { FlexColumn, FlexRow, Grid } from "@/components/common/Layouts";
import AuthenticatedWrapper from "@/components/common/Wrappers/AuthenticatedWrapper";
import BookMark from "@/components/MockTests/MockTestBox/BookMark";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getMockTestMetaData } from "@/services/common";
import { MockTestMetaDataWithSections } from "@/types/mockTests";

import RecentActivity from "../RecentActivity";

function getPracticeOptions(totalQuestions: number) {
  if (totalQuestions <= 20) return [totalQuestions];

  const options = [10, 25, 50];

  if (totalQuestions <= 50)
    return options.filter((n) => n <= totalQuestions).concat([totalQuestions]);

  if (totalQuestions > 50)
    return options.filter((n) => n <= totalQuestions).concat([totalQuestions]);
}

// Exam rules based on mode
const examRules = {
  ranked: [
    "Read each question carefully before answering",
    "You can navigate between questions using next/previous buttons",
    "Make sure to submit your exam before time runs out",
    "This is a timed exam - your rank will be calculated based on performance",
    "Negative marking applies as per the marking scheme",
    "Once submitted, answers cannot be changed",
  ],
  practice: [
    "Read each question carefully before answering",
    "You can navigate between questions using next/previous buttons",
    "Take your time - this is practice mode with no time pressure",
    "You can review and change answers anytime",
    "Use this mode to improve your understanding",
    "Your performance will not affect rankings",
  ],
};

const META_DATA_CARDS = [
  {
    icon: Clock,
    iconColor: "text-blue-300",
    bgColor: "bg-blue-50",
    label: "Time (in Minutes)",
    value_key: "time_limit",
  },
  {
    icon: ListOrdered,
    iconColor: "text-green-400",
    bgColor: "bg-green-50",
    label: "Number of Questions",
    value_key: "questionCount",
  },
  {
    icon: Crosshair,
    iconColor: "text-yellow-400",
    bgColor: "bg-yellow-50",
    label: "Marks per Question",
    value_key: "marksPerQuestion",
  },
  {
    icon: PercentCircle,
    iconColor: "text-red-400",
    bgColor: "bg-red-50",
    label: "Negative Marking",
    value_key: "negativeMarking",
  },
];

type TestInfoPropsType = {
  initialData: MockTestMetaDataWithSections | null;
};

const MODE_INFO = [
  {
    icon: Trophy,
    key: "ranked",
    label: "Compete and Rank",
  },
  {
    icon: BookOpen,
    key: "practice",
    label: "Practice Mode",
  },
];

const MODE_DESCRIPTION = {
  ranked: {
    icon: <Trophy className="size-4 text-blue-500" />,
    detail: "Competitive mode - Time Limitation - Leaderboard",
    className: "bg-blue-50",
  },
  practice: {
    icon: <BookOpen className="size-4 text-green-500" />,
    detail: "Practice mode - No Time Limitation - No Leaderboard",
    className: "bg-green-50",
  },
};

const TestInfo = ({ initialData }: TestInfoPropsType) => {
  const { mock_test_id } = useParams<{ mock_test_id: string }>();
  const router = useRouter();

  const [selectedMode, setSelectedMode] = useState<"ranked" | "practice">(
    "ranked",
  );
  const [questionCount, setQuestionCount] = useState<number>(
    initialData?.question_count || 10,
  );
  const { data: mockTestDetails } =
    useQuery<MockTestMetaDataWithSections | null>({
      queryKey: ["mockTestDetailsData", mock_test_id, questionCount],
      queryFn: async () => {
        const res = await getMockTestMetaData({
          mock_test_id,
          question_count: questionCount,
        });
        return res.data;
      },
      refetchOnMount: false,
      staleTime: 0,
      placeholderData: initialData,
    });

  const { title, bookmark, time_limit, sections } = mockTestDetails || {};

  // Extract metadata values in array

  const metaDataValues = useMemo(() => {
    if (!sections || sections.length === 0) return {};
    const isMultipleSections = sections && sections.length > 1;

    if (!isMultipleSections) {
      return {
        time_limit,
        questionCount,
        negativeMarking: sections[0].negative_marking,
        marksPerQuestion: sections[0].marks_per_question,
      };
    }
    const flatMarksPerValue = sections.map(
      (section) => section.marks_per_question,
    );
    const flatNegativeMarkingValue = sections.map(
      (section) => section.negative_marking,
    );
    const minNegativeMarking = Math.min(...flatNegativeMarkingValue);
    const maxNegativeMarking = Math.max(...flatNegativeMarkingValue);
    const minMarksPerQuestion = Math.min(...flatMarksPerValue);
    const maxMarksPerQuestion = Math.max(...flatMarksPerValue);
    return {
      time_limit,
      questionCount,
      negativeMarking: `${minNegativeMarking} - ${maxNegativeMarking}`,
      marksPerQuestion: `${minMarksPerQuestion} - ${maxMarksPerQuestion}`,
    };
  }, [questionCount, sections, time_limit]);
  // if (!mockTestDetails) {
  //   return null;
  // }

  const questionCountOptions = getPracticeOptions(
    mockTestDetails?.question_count || 10,
  );
  return (
    <FlexColumn className="@container gap-4">
      <FlexRow className="items-center justify-between w-full">
        <BreadCrumb heading={title || ""} onBackClick={() => router.back()} />
        <BookMark
          initialBookmark={!!bookmark}
          mockTestId={Number(mock_test_id)}
        />
      </FlexRow>

      <Grid className="w-full grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
        {META_DATA_CARDS.map((card, index) => (
          <Card key={index} className={`flex flex-row items-end gap-1 p-4`}>
            <FlexColumn className="gap-1 w-full">
              <h3 className="text-primary-600 font-bold text-lg @lg:text-xl @2xl:text-2xl">
                {
                  metaDataValues?.[
                    card.value_key as keyof typeof metaDataValues
                  ]
                }
              </h3>
              <p className="text-sm @lg:text-base font-medium text-gray-700">
                {card.label}
              </p>
            </FlexColumn>
            <card.icon className={`${card.iconColor} size-10`} />
          </Card>
        ))}
      </Grid>
      <Card className="relative w-full gap-4 rounded-lg border px-3 py-4 shadow-sm">
        <CardTitle className="flex items-center gap-1">
          <Settings2 className="size-4 text-primary-700" />
          Test Configuration
        </CardTitle>
        <FlexColumn className="gap-4">
          <div>
            <label className="font-medium text-gray-700 text-sm @lg:text-base">
              Select Mode
            </label>
            <Grid className="grid-cols-2 gap-2 mt-2">
              {MODE_INFO.map((mode) => (
                <button
                  key={mode.key}
                  className={cn(
                    "flex flex-col items-center justify-center  p-2",
                    selectedMode === mode.key
                      ? "bg-primary-50"
                      : "hover:bg-gray-100",
                    "rounded-md transition-colors duration-200",
                  )}
                  onClick={() =>
                    setSelectedMode(mode.key as "ranked" | "practice")
                  }
                >
                  <mode.icon className="size-5 mb-1" />
                  <p className="capitalize text-sm @lg:text-base">{mode.key}</p>
                  <span className="text-xs @lg:text-sm text-gray-600">
                    {mode.label}
                  </span>
                </button>
              ))}
            </Grid>
          </div>
          <FlexRow
            className={`p-2 rounded-md items-center ${MODE_DESCRIPTION[selectedMode].className} gap-2`}
          >
            {MODE_DESCRIPTION[selectedMode].icon}
            <p className="text-sm @lg:text-base font-medium">
              {MODE_DESCRIPTION[selectedMode].detail}
            </p>
          </FlexRow>
          {selectedMode === "practice" && (
            <div>
              <label className="font-medium text-gray-700 text-sm @lg:text-base">
                Number of Questions
              </label>
              {questionCountOptions && questionCountOptions?.length > 1 && (
                <FlexRow className="gap-2 mt-2">
                  {getPracticeOptions(
                    mockTestDetails?.question_count || 10,
                  )?.map((option) => (
                    <button
                      key={option}
                      className={cn(
                        "p-2 rounded-md",
                        questionCount === option
                          ? "bg-primary-50"
                          : "hover:bg-gray-100",
                        "w-full transition-colors duration-200",
                      )}
                      onClick={() => setQuestionCount(option)}
                    >
                      <p className="text-center text-sm @lg:text-base">
                        {option}
                      </p>
                    </button>
                  ))}
                </FlexRow>
              )}
            </div>
          )}

          <Link
            href={`/mcq/${mock_test_id}?question_count=${questionCount}&mode=${selectedMode}`}
            className="w-full"
          >
            <Button className="w-full mt-2">
              Start{" "}
              {selectedMode === "ranked" ? "Ranked Test" : "Practice Mode"}
            </Button>
          </Link>
        </FlexColumn>
        {(sections || [])?.length > 1 && (
          <div className="@container h-full relative w-full gap-4 flex flex-col">
            <div className="flex items-center gap-1">
              <Clipboard className="size-4 text-primary-700" />
              Section Wise Marking Scheme
            </div>
            {sections?.map((section) => {
              const hasNegativeMarking = section.negative_marking > 0;

              return (
                <FlexRow
                  className="justify-between items-center bg-gray-100/60 p-2 shadow-xs rounded-md"
                  key={section.name}
                >
                  <FlexColumn className="gap-1">
                    <p className="font-medium text-gray-700 text-sm @lg:text-base">
                      {section.name}
                    </p>
                    <p className="flex-1 text-xs @lg:text-sm text-gray-400">
                      {(section.question_weight || 1) * questionCount} Questions
                    </p>
                  </FlexColumn>
                  <FlexColumn className="gap-1 items-end">
                    <p className="text-sm @lg:text-base font-semibold text-green-600">
                      + {section.marks_per_question} marks
                    </p>
                    <p
                      className={`text-xs @lg:text-sm font-medium text-gray-600 ${
                        hasNegativeMarking ? "" : "opacity-50"
                      }`}
                    >
                      {hasNegativeMarking
                        ? `  - ${section.negative_marking} wrong`
                        : "No Penalty"}
                    </p>
                  </FlexColumn>
                </FlexRow>
              );
            })}
          </div>
        )}
      </Card>
      <Card className="@container relative h-full w-full gap-4 rounded-lg border px-3 py-4 shadow-sm">
        <div className="flex items-center gap-1">
          <AlertCircle className="size-4 text-primary-700" />
          Exam Instructions -{" "}
          {selectedMode === "ranked" ? "Ranked Mode" : "Practice Mode"}
        </div>
        <FlexColumn className="gap-2 mt-3">
          <ul className="list-disc list-inside pl-4 space-y-2 marker:text-primary-700 marker:text-xl">
            {examRules[selectedMode].map((rule) => (
              <li
                className="text-sm @lg:text-base leading-tight text-gray-600"
                key={rule}
              >
                {rule}
              </li>
            ))}
          </ul>
        </FlexColumn>
      </Card>

      <RecentActivity mockTestId={mock_test_id} />

      <AuthenticatedWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="@container relative w-full gap-4 rounded-lg border px-3 py-4 shadow-sm">
            <CardTitle className="flex items-center gap-1">
              <TrendingUp className="size-4 text-primary-700" />
              Your Stats
            </CardTitle>
            <FlexColumn className="gap-3">
              <FlexRow className="justify-between items-center p-2 bg-gray-50 rounded-md">
                <FlexColumn className="gap-1">
                  <p className="font-medium text-sm @lg:text-base text-gray-700">
                    Total Attempts
                  </p>
                  <p className="text-xs @lg:text-sm text-gray-500">
                    Tests taken
                  </p>
                </FlexColumn>
                <p className="font-bold text-sm @lg:text-base text-primary-600">
                  15
                </p>
              </FlexRow>
              <FlexRow className="justify-between items-center p-2 bg-gray-50 rounded-md">
                <FlexColumn className="gap-1">
                  <p className="font-medium text-sm @lg:text-base text-gray-700">
                    Average Time Taken
                  </p>
                  <p className="text-xs @lg:text-sm text-gray-500">
                    Per attempt
                  </p>
                </FlexColumn>
                <p className="font-bold text-sm @lg:text-base text-green-600">
                  45 Mins
                </p>
              </FlexRow>
              <FlexRow className="justify-between items-center p-2 bg-gray-50 rounded-md @lg:col-span-2">
                <FlexColumn className="gap-1">
                  <p className="font-medium text-sm @lg:text-base text-gray-700">
                    Average Score
                  </p>
                  <p className="text-xs @lg:text-sm text-gray-500">
                    Overall average
                  </p>
                </FlexColumn>
                <p className="font-bold text-sm @lg:text-base text-blue-600">
                  52%
                </p>
              </FlexRow>
            </FlexColumn>
          </Card>

          {/* Performance Trends */}
          <Card className="@container relative w-full gap-4 rounded-lg border px-3 py-4 shadow-sm">
            <CardTitle className="flex items-center gap-1">
              <Activity className="size-4 text-primary-700" />
              Performance Trends
            </CardTitle>
            <FlexColumn className="gap-3">
              <FlexRow className="justify-between items-center p-2 bg-gray-50 rounded-md">
                <FlexColumn className="gap-1">
                  <p className="font-medium text-sm @lg:text-base text-gray-700">
                    Last Attempt
                  </p>
                  <p className="text-xs @lg:text-sm text-gray-500">
                    2 days ago
                  </p>
                </FlexColumn>
                <FlexColumn className="items-end gap-1">
                  <p className="font-bold text-sm @lg:text-base text-green-600">
                    85%
                  </p>
                  <p className="text-xs @lg:text-sm text-green-600">↗ +12%</p>
                </FlexColumn>
              </FlexRow>
              <FlexRow className="justify-between items-center p-2 bg-gray-50 rounded-md">
                <FlexColumn className="gap-1">
                  <p className="font-medium text-sm @lg:text-base text-gray-700">
                    Average Improvement
                  </p>
                  <p className="text-xs @lg:text-sm text-gray-500">
                    Per attempt
                  </p>
                </FlexColumn>
                <FlexColumn className="items-end gap-1">
                  <p className="font-bold text-sm @lg:text-base text-blue-600">
                    +7.5%
                  </p>
                  <p className="text-xs @lg:text-sm text-blue-600">
                    Trending up
                  </p>
                </FlexColumn>
              </FlexRow>
              <FlexRow className="justify-between items-center p-2 bg-gray-50 rounded-md">
                <FlexColumn className="gap-1">
                  <p className="font-medium text-sm @lg:text-base text-gray-700">
                    Best Performance
                  </p>
                  <p className="text-xs @lg:text-sm text-gray-500">
                    Personal record
                  </p>
                </FlexColumn>
                <FlexColumn className="items-end gap-1">
                  <p className="font-bold text-sm @lg:text-base text-purple-600">
                    92%
                  </p>
                  <p className="text-xs @lg:text-sm text-purple-600">
                    1 week ago
                  </p>
                </FlexColumn>
              </FlexRow>
            </FlexColumn>
          </Card>
        </div>
      </AuthenticatedWrapper>
    </FlexColumn>
  );
};

export default TestInfo;
