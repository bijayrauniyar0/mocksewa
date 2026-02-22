import { api, authenticated } from ".";

export const toggleBookmark = async (mock_test_id: number) => {
  return authenticated(api).post(`/bookmarks/toggle/${mock_test_id}`);
};

export const getBookmarks = async (params?: Record<string, any>) => {
  return authenticated(api).get("/bookmarks/", { params });
};

export const getBookmarkById = async (mock_test_id: number) => {
  return authenticated(api).get(`/bookmarks/${mock_test_id}/`);
};
