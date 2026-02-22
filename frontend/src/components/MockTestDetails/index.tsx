import dynamic from "next/dynamic";
import React from "react";

import BindContentContainer from "@/components/common/BindContentContainer";
import { getMockTestMetaData } from "@/services/common";
import { MockTestMetaDataWithSections } from "@/types/mockTests";

import TestInfoSkeleton from "./Skeletons/TestInfoSkeleton";
const TestInfo = dynamic(() => import("./TestInfo"), {
  ssr: true,
  loading: () => <TestInfoSkeleton />,
});

const MockTestDetails = async ({ mock_test_id }: { mock_test_id: string }) => {
  let mockTestDetails: MockTestMetaDataWithSections | null = null;

  try {
    const { data } = await getMockTestMetaData({ mock_test_id });
    mockTestDetails = data;
  } catch {
    // console.error("Error fetching mock test details:", error);
  }
  return (
    <BindContentContainer className="lg:px-6 max-sm:py-2">
      <TestInfo initialData={mockTestDetails} />
    </BindContentContainer>
  );
};

export default MockTestDetails;
