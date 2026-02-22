"use client";
import React, { useMemo, useState } from "react";

import { BookmarksType, useBookmarks } from "@/api/Bookmarks";
import BindContentContainer from "@/components/common/BindContentContainer";
import BreadCrumb from "@/components/common/FormComponent/BreadCrumb";
import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import Searchbar from "@/components/common/SearchBar";
import Skeleton from "@/components/ui/Skeleton";
import useDebounceListener from "@/hooks/useDebounceListener";
import isEmpty from "@/lib/isEmpty";

import BookmarkBox from "./BookmarkBox";

const BookmarksSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
    {Array.from({ length: 8 }).map((_, index) => (
      <Skeleton key={index} className="h-48 rounded-xl" />
    ))}
  </div>
);

const BookmarksComponent = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounceListener(searchValue, 500);

  const {
    data: bookmarks,
    isLoading,
    isError,
    error,
  } = useBookmarks({
    search:
      typeof debouncedSearchValue === "string"
        ? debouncedSearchValue
        : undefined,
  });

  const filteredBookmarks: BookmarksType[] = useMemo(() => {
    if (!bookmarks) return [];
    return bookmarks;
  }, [bookmarks]);

  const hasNoData = !isLoading && !isError && isEmpty(filteredBookmarks);

  if (isError) {
    return (
      <BindContentContainer>
        <FlexColumn className="w-full gap-4">
          <BreadCrumb heading="Bookmarks" />
          <div className="flex items-center justify-center h-64">
            <p className="text-red-500">
              Error loading bookmarks:{" "}
              {(error as Error)?.message || "Something went wrong"}
            </p>
          </div>
        </FlexColumn>
      </BindContentContainer>
    );
  }

  return (
    <BindContentContainer>
      <FlexColumn className="w-full gap-4">
        <FlexRow className="w-full items-center justify-between">
          <BreadCrumb heading="My Bookmarks" />
          <Searchbar
            wrapperStyle="!w-[10rem] lg:!w-[15rem]"
            placeholder="Search Bookmarks"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </FlexRow>

        {isLoading ? (
          <BookmarksSkeleton />
        ) : hasNoData ? (
          <div className="flex items-center justify-center h-64">
            {debouncedSearchValue ? (
              <div className="text-center">
                <p className="text-gray-500 text-lg mb-2">No bookmarks found</p>
                <p className="text-gray-400 text-sm">
                  Try adjusting your search terms
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-500 text-lg mb-2">No bookmarks yet</p>
                <p className="text-gray-400 text-sm">
                  Start bookmarking mock tests to see them here
                </p>
              </div>
            )}
          </div>
        ) : (
          <FlexColumn className="no-scrollbar max-h-[calc(100dvh-9rem)] gap-4 overflow-y-auto pb-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
              {filteredBookmarks?.map((bookmark) => {
                return <BookmarkBox key={bookmark.id} {...bookmark} />;
              })}
            </div>
          </FlexColumn>
        )}
      </FlexColumn>
    </BindContentContainer>
  );
};

export default BookmarksComponent;
