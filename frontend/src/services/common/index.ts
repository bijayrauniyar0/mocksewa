import { api } from "../ClientSide";

export const getHistorySessions = async (paramsX: Record<string, any>) => {
  const { user_id, ...params } = paramsX;
  return await api.get(`/analytics/history-sessions/${user_id}`, {
    params,
  });
};

export const getMockTestMetaData = async (paramsX: Record<string, any>) => {
  const { mock_test_id, ...params } = paramsX;
  return await api.get(`/mcq/mock-tests/meta-data/${mock_test_id}/`, {
    params,
  });
};

export const getRecentActivity = async (mock_test_id: string | string[]) => {
  return await api.get(`/mcq/exam/recent-activity/${mock_test_id}`);
};
