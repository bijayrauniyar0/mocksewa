"use client";
import { Fullscreen, X } from "lucide-react";
import React, { useState } from "react";

import HeaderSwitchTab from "@/components/common/HeaderSwitchTab";
import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import useScreenWidth from "@/hooks/useScreenWidth";

type ResponsiveDiscussionsReviewsProps = {
  Reviews: React.ElementType;
  Discussions: React.ElementType;
  screenWidth: number;
  reviewsProps?: Record<string, any>;
};
const ResponsiveDiscussionsReviews = ({
  Reviews,
  Discussions,
  screenWidth,
  reviewsProps = {},
}: ResponsiveDiscussionsReviewsProps) => {
  const [selectedTab, setSelectedTab] = useState("discussions");
  const [fullScreen, setFullScreen] = useState(false);
  const currentScreenWidth = useScreenWidth();
  if (currentScreenWidth > screenWidth) {
    return <></>;
  }
  const headerOptions = [
    {
      label: "Discussions",
      value: "discussions",
      id: 1,
    },
    {
      label: "Reviews",
      value: "reviews",
      id: 2
    },
  ];
  return (
    <FlexColumn className="gap-2 bg-white px-2 shadow-sm rounded-lg border border-gray-200 overflow-hidden">
      <FlexRow className="items-center justify-between py-2 px-2">
        <HeaderSwitchTab
          headerOptions={headerOptions}
          activeTab={selectedTab}
          labelClassName="!py-2 !px-2 "
          onChange={(val) => {
            setSelectedTab(val);
          }}
        />
        {!fullScreen && (
          <Fullscreen
            className="h-6 w-6 text-gray-500 cursor-pointer"
            onClick={() => setFullScreen(true)}
          />
        )}
      </FlexRow>
      <div
        className={`bg-white ${fullScreen ? "fixed inset-0 z-50 h-full" : ""}`}
      >
        {fullScreen && (
          <FlexRow className="px-4 py-4 justify-between items-center cursor-pointer">
            <p className="text-md text-gray-700 lg:text-base capitalize">
              {selectedTab}
            </p>
            <X
              className="h-6 w-6 text-gray-500"
              onClick={() => setFullScreen(false)}
            />
          </FlexRow>
        )}
        {selectedTab === "reviews" ? (
          <div
            className={`scrollbar pb-2 ${
              fullScreen ? "h-[calc(100vh-4rem)] p-2" : "h-[calc(100vh-15rem)]"
            } overflow-y-auto`}
          >
            <Reviews {...reviewsProps} />
          </div>
        ) : (
          <Discussions
            className={`no-scrollbar overflow-y-auto ${
              fullScreen ? "h-[calc(100vh-7.5rem)]" : "h-[calc(100vh-19rem)]"
            }`}
          />
        )}
      </div>
    </FlexColumn>
  );
};

export default ResponsiveDiscussionsReviews;
