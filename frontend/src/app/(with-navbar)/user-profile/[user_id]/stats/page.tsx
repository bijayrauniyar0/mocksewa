import React from "react";

import Stats from "@/components/UserProfile/Stats";
import { UserProfileParamsProps } from "@/types/user";

export const metadata = {
  title: "Stats",
  description: "User stats page",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StatsPage = ({ params }: UserProfileParamsProps) => {
  return <Stats />;
};

export default StatsPage;
