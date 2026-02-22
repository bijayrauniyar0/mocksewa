import { ChevronDown, ChevronUp, Minus } from "lucide-react";
import React from "react";

import Avatar from "@/components/common/Avatar";
import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import { getInitialsFromName } from "@/lib/index";
import useAuthStore from "@/store/auth";
import { ScoreRowProps } from "@/types/leaderboard";

const ScoreRow = ({
  avatar,
  name,
  total_score,
  rank,
  previous_rank,
  user_id,
}: ScoreRowProps) => {
  const userProfile = useAuthStore((state) => state.userProfile);
  return (
    <FlexRow
      className={`w-full select-none items-center justify-between rounded-lg border border-gray-300 bg-[#fbfbfb] px-2 py-2 shadow-sm md:px-4 ${
        userProfile?.id === user_id
          ? "sticky bottom-0 top-[-0.75rem] bg-primary-100 z-[10]"
          : ""
      }`}
    >
      <FlexRow className="items-center gap-2">
        {previous_rank && (
          <>
            {previous_rank > rank ? (
              <ChevronUp
                fill="currentColor"
                stroke="none"
                className="flex items-center justify-center h-5 w-5 md:h-7 md:w-7 text-green-700"
              />
            ) : previous_rank === rank ? (
              <Minus className="flex items-center justify-center p-0 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
            ) : (
              <ChevronDown
                fill="currentColor"
                stroke="none"
                className="flex items-center justify-center p-0 h-5 w-5 md:h-7 md:w-7 text-red-700"
              />
            )}
          </>
        )}
        <p className="w-4 text-base font-semibold text-primary-600">{rank}</p>
        <Avatar
          src={avatar}
          alt="User Avatar"
          className="h-10 w-10 rounded-full md:h-12 md:w-12"
          fallback={getInitialsFromName(name)}
        />
        <FlexRow className="items-center gap-2">
          <p className="text-md font-semibold leading-4 md:text-base">
            {name.split(" ")[0]}
          </p>
          {userProfile.id === user_id && (
            <div className="rounded-full bg-primary-50 px-2 py-1 text-sm">
              You
            </div>
          )}
        </FlexRow>
      </FlexRow>
      <FlexColumn className="items-center">
        <p className="text-md font-medium leading-3 tracking-tighter">
          {total_score}
        </p>
      </FlexColumn>
      {/* <Icon className="text-primary-700" name="arrow_drop_up" /> */}
    </FlexRow>
  );
};

export default ScoreRow;
