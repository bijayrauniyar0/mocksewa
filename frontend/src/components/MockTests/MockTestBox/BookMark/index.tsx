"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import React from "react";

import { useUpdateBookmark } from "@/api/MockTests";
import { getBookmarkById } from "@/services/ClientSide/bookmark";
import useAuthStore from "@/store/auth";

type BookMarkProps = {
  initialBookmark: boolean;
  mockTestId: number;
};
const BookMark = ({ initialBookmark, mockTestId }: BookMarkProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const queryClient = useQueryClient();
  const { mutate: updateBookmark, isPending } = useUpdateBookmark({
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["isTestBookmarked", mockTestId],
      });

      const previous = queryClient.getQueryData([
        "isTestBookmarked",
        mockTestId,
      ]);
      queryClient.setQueryData(
        ["isTestBookmarked", mockTestId],
        (old: boolean) => !old
      );
      return { previous };
    },
    onError: (err, _, context: any) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(
          ["isTestBookmarked", mockTestId],
          context.previous
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["isTestBookmarked", mockTestId],
      });
      queryClient.invalidateQueries({
        queryKey: ["bookmarks", mockTestId],
      });
    },
  });

  const { data: bookmark } = useQuery({
    queryKey: ["isTestBookmarked", mockTestId],
    queryFn: async () => {
      const res = await getBookmarkById(mockTestId);
      return res.data.is_bookmarked;
    },
    initialData: initialBookmark,
    enabled: Boolean(isAuthenticated),
  });
  if (!isAuthenticated) {
    return <></>;
  }

  return (
    <button disabled={isPending} className="absolute -top-[2px] right-3 ">
      <Bookmark
        fill={bookmark ? "currentColor" : "none"}
        onClick={() => {
          updateBookmark(mockTestId);
        }}
        className="h-7 w-7 text-primary-600 max-md:h-6 max-md:w-6 cursor-pointer"
      />
    </button>
  );
};

export default BookMark;
