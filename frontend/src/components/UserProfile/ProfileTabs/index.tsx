"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";

import HeaderSwitchTab from "@/components/common/HeaderSwitchTab";

export const userProfileTabsData = [
  {
    id: 1,
    label: "Stats",
    value: "stats",
  },
  {
    id: 3,
    label: "History",
    value: "history",
  },
];

const UserProfileTabs = () => {
  const pathname = usePathname();
  const { user_id } = useParams();
  const router = useRouter();
  const tab = pathname.split("/").pop();
  return (
    <HeaderSwitchTab
      activeTab={(tab as string) || ""}
      headerOptions={userProfileTabsData}
      onChange={(val) => router.push(`/user-profile/${user_id}/${val}`)}
    />
  );
};

export default UserProfileTabs;
