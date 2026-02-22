import { api } from "../ClientSide";

export const getReviews = (params: Record<string, any>) => {
  return api.get("/review/", { params });
};

export const getReviewsByMockTestId = async (paramsX: Record<string, any>) => {
  const { mock_test_id, ...params } = paramsX;
  return await api.get(`/review/${mock_test_id}/`, { params });
};
