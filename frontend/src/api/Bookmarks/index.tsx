import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getBookmarks } from "@/services/ClientSide/bookmark";
import { BaseMetaDataType, TestsType } from "@/types/mockTests";

export type BookmarksType = Omit<
  TestsType,
  "last_accessed" | "students_count" | "bookmark"
> &
  BaseMetaDataType & {
    mock_test_id: number;
  };

export interface UseBookmarksOptions
  extends Partial<UseQueryOptions<BookmarksType[], Error>> {
  search?: string;
}

export const useBookmarks = ({
  search,
  ...options
}: UseBookmarksOptions = {}) => {
  return useQuery<BookmarksType[], Error>({
    queryKey: ["bookmarks", search],
    queryFn: async () => {
      const params = search ? { search } : undefined;
      const res = await getBookmarks(params);
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: true, // Always enabled, but can be overridden
    ...options,
  });
};
