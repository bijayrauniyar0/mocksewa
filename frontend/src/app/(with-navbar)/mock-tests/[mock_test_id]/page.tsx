import React from "react";

import Suspense from "@/components/common/Suspense";
import MockTestDetails from "@/components/MockTestDetails";

type MockTestDetailsPageProps = {
  params: Promise<{
    mock_test_id: string;
  }>;
};

const MockTestDetailsPage = async ({ params }: MockTestDetailsPageProps) => {
  const { mock_test_id } = await params;

  return (
    <Suspense>
      <MockTestDetails mock_test_id={mock_test_id} />
    </Suspense>
  );
};

export const metadata = {
  title: "Mock Test Details",
  description: "View details and take mock tests to improve your skills.",
};

export default MockTestDetailsPage;
