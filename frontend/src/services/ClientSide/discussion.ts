import { api, authenticated } from ".";

export const getAllUsersInDiscussion = async (params: {
  mock_test_id: string;
  page?: number;
  page_size?: number;
}) => {
  const { mock_test_id, ...queryParams } = params;
  return authenticated(api).get(`/discussions/users/${mock_test_id}/`, {
    params: queryParams,
  });
};

export const getHistoryMessages = async (paramsX: Record<string, any>) => {
  const { mock_test_id, ...params } = paramsX;
  return authenticated(api).get(`/discussions/history/${mock_test_id}/`, {
    params,
  });
};
