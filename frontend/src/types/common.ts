export type PaginationInitialType<T> = {
  page: number;
  page_size: number;
  total: number;
  results: T[];
};
