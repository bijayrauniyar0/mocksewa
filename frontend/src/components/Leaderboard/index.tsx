"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useGetTestsTakenByUser } from "@/api/Leaderboard";
import BindContentContainer from "@/components/common/BindContentContainer";
import DropDown from "@/components/common/DropDown";
import BreadCrumb from "@/components/common/FormComponent/BreadCrumb";
import { FlexRow } from "@/components/common/Layouts";
import isEmpty from "@/lib/isEmpty";

import Suspense from "../common/Suspense";
import LeaderboardPlaceholder from "./LeaderboardPlaceholder";
import LeaderboardSkeleton from "./LeaderboardSkeleton";

const Scores = dynamic(() => import("./Scores"), {
  ssr: false,
  loading: () => <LeaderboardSkeleton />,
});

const Leaderboard = () => {
  const router = useRouter();
  const [mockTestId, setMockTestId] = useState<number>();

  const { data: testTakenByUserList, isLoading: isTestTakenByUserListLoading } =
    useGetTestsTakenByUser({});

  useEffect(() => {
    if (!isEmpty(testTakenByUserList)) {
      setMockTestId(testTakenByUserList?.[0]?.id);
    }
  }, [setMockTestId, testTakenByUserList]);

  if (isEmpty(testTakenByUserList) || !mockTestId) {
    return <LeaderboardPlaceholder />;
  }
  return (
    <BindContentContainer className="relative flex flex-col gap-4">
      <FlexRow className="w-full items-center justify-between">
        <BreadCrumb onBackClick={() => router.back()} heading="Leaderboard" />
        <DropDown
          options={testTakenByUserList || []}
          placeholder="Select Test"
          value={mockTestId}
          onChange={(val) => val && setMockTestId(val)}
          className="min-w-[10rem]"
          isLoading={isTestTakenByUserListLoading}
          enableSearchbar={false}
        />
      </FlexRow>
      <Suspense>
        <Scores mockTestId={mockTestId} />
      </Suspense>
    </BindContentContainer>
  );
};

export default Leaderboard;
