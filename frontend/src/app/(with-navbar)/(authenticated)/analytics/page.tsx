import React from "react";

import Analytics from "@/components/Analytics";
import ProtectedLayout from "@/components/common/Wrappers/AuthenticatedRoute";

export const metadata = {
  title: "Analytics - Mock Sewa",
  description:
    "Track your performance with detailed analytics on Mock Sewa. Monitor your progress, identify strengths and weaknesses, and improve your test-taking skills over time.",
};
const AnalyticsPage = async () => {
  return (
    <ProtectedLayout>
      <Analytics />
    </ProtectedLayout>
  );
};

export default AnalyticsPage;
