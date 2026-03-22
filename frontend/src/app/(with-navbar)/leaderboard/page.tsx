import React from "react";

import ProtectedLayout from "@/components/common/Wrappers/AuthenticatedRoute";
import Leaderboard from "@/components/Leaderboard";
export const metadata = {
  title: "Leaderboard",
  description: "Leaderboard page",
};
const LeaderboardPage = () => {
  return <Leaderboard />;
};

export default LeaderboardPage;
