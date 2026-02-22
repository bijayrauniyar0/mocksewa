"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";

import Avatar from "@/components/common/Avatar";
import { FlexRow } from "@/components/common/Layouts";
import Rating from "@/components/common/Rating";
import Skeleton from "@/components/ui/Skeleton";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { getFormattedDate, getInitialsFromName } from "@/lib/index";
import { getReviewsByMockTestId } from "@/services/ClientSide/review";
import { ReviewWithoutMockTestType } from "@/types/mockTests";

export type ReviewsProps = {
  results: ReviewWithoutMockTestType[];
  page: number;
  next_page?: number | null;
  total: number;
};
const Reviews = ({ initialReviews }: { initialReviews: ReviewsProps }) => {
  const { mock_test_id } = useParams();
  const {
    data: reviewsResponse,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["historyMessages", mock_test_id],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getReviewsByMockTestId({
        page: pageParam,
        page_size: 10,
        mock_test_id,
      });
      return res?.data;
    },
    initialData: { pages: [initialReviews], pageParams: [1] },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.next_page ?? undefined,
  });
  const [isIntersecting, rootRef, viewRef] = useIntersectionObserver({
    threshold: 0.1,
  });
  const reviews = useMemo(() => {
    if (!reviewsResponse?.pages) return [];
    return reviewsResponse.pages.flatMap((page) => page.results || []);
  }, [reviewsResponse]);

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isIntersecting]);
  return (
    <div ref={rootRef}>
      {reviews.map(({ id, User, rating, review, created_at }) => {
        return (
          <div className="p-1" key={`mock-test-review-${id}`}>
            <FlexRow className="items-center justify-between md:rounded-lg md:border md:border-gray-200 md:bg-white md:px-3 py-2 max-md:border-b md:shadow-md">
              <FlexRow className="items-start gap-2 w-full">
                <Avatar
                  src={User.avatar}
                  alt=""
                  fallback={getInitialsFromName(User.name)}
                  className="h-8 w-8 rounded-full md:h-10 md:w-10"
                />
                <div className="w-full flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-800">
                    {User.name}
                  </p>
                  <p className="text-sm text-matt-100 text-wrap">{review}</p>
                  <FlexRow className="justify-between items-center">
                    <Rating value={rating} readonly size="small" />
                    <p className="text-sm shrink-0 font-medium text-gray-600 w-fit">
                      {getFormattedDate(created_at)}
                    </p>
                  </FlexRow>
                </div>
              </FlexRow>
            </FlexRow>
          </div>
        );
      })}
      {hasNextPage && (
        <div className="flex flex-col gap-2" ref={viewRef}>
          <Skeleton className="h-16 rounded-lg w-full" />
          <Skeleton className="h-16 rounded-lg w-full" />
        </div>
      )}
    </div>
  );
};

export default Reviews;
