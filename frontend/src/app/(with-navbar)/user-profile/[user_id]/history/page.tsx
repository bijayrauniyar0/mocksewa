import React from "react";

import HistorySessions from "@/components/UserProfile/HistorySessions";
import { getHistorySessions } from "@/services/common";
import { PaginationInitialType } from "@/types/common";
import { IHistorySession } from "@/types/myStats";
import { UserProfileParamsProps } from "@/types/user";

const HistoryPage = async ({ params }: UserProfileParamsProps) => {
  const resolvedParams = await params;
  let initialHistorySessions: PaginationInitialType<IHistorySession> = {
    page: 1,
    page_size: 10,
    total: 0,
    results: [] as IHistorySession[],
  };
  try {
    const { data } = await getHistorySessions({
      user_id: resolvedParams.user_id,
      page_size: 10,
      page: 1,
    });
    initialHistorySessions = data;
  } catch {
    //
  }

  return <HistorySessions initialHistorySessions={initialHistorySessions} />;
};

export default HistoryPage;
