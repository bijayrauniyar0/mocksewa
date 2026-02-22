import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

import useIntersectionObserver from "./useIntersectionObserver"; // assuming your hook

interface IPage<TResult> {
  results: TResult[];
  next_page?: number;
  page: number;
  total?: number;
}
interface UseInfiniteScrollOptions<TQueryFnArgs, TResult> {
  queryKey: unknown[];
  queryFn: (
    args: { pageParam?: number } & TQueryFnArgs
  ) => Promise<IPage<TResult>>;
  queryFnArgs: TQueryFnArgs;
  page_size?: number;
  threshold?: number; // intersection observer threshold
  initialData?: {
    pages: Array<IPage<TResult>>;
    pageParams: number[];
  };
  initialPageParam?: number;
  enabled?: boolean;
  isIntersecting?: boolean; // optional, to control intersection observer behavior externally
}

function useInfiniteScroll<TQueryFnArgs, TResult>({
  queryKey,
  queryFn,
  queryFnArgs,
  threshold = 0.1,
  initialData,
  page_size = 10,
  initialPageParam = 1,
  enabled = true,
}: UseInfiniteScrollOptions<TQueryFnArgs, TResult>) {
  const {
    data: resData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = initialPageParam }) =>
      queryFn({ page: pageParam, page_size, ...queryFnArgs }),
    getNextPageParam: (lastPage) => lastPage.next_page ?? undefined,
    initialData,
    initialPageParam,
    enabled,
  });

  const [isIntersecting, rootRef, viewRef] = useIntersectionObserver({
    threshold,
  });

  const data = useMemo(() => {
    if (!resData?.pages) return [];
    return resData.pages.flatMap((page) => page.results || []);
  }, [resData]);

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    rootRef,
    viewRef,
    total: resData?.pages?.[0]?.total || 0,
  };
}

export default useInfiniteScroll;
