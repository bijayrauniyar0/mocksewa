import { api, authenticated } from ".";

export const getUserStats = async (params: Record<string, any>) => {
  return authenticated(api).get("/analytics/stats/", { params });
};

export const getRecentSessions = async (params?: Record<string, any>) => {
  return authenticated(api).get("/analytics/recent-sessions/", { params });
};

export const getPerformanceTrend = async (params: Record<string, any>) => {
  return authenticated(api).get("/analytics/performance-trend/", {
    params,
  });
};

export const getMockTestTakenByUser = async () => {
  return authenticated(api).get("/user/profile/mock-tests");
};

export const getMetricsForRadarChart = async (paramsX: Record<string, any>) => {
  const { user_id, ...params } = paramsX;
  return authenticated(api).get(`/analytics/radar-metrics/${user_id}`, {
    params,
  });
};
export const getUserScores = async (paramsX: Record<string, any>) => {
  const { user_id, ...params } = paramsX;
  return authenticated(api).get(`/analytics/user-scores/${user_id}`, {
    params,
  });
};
export const getUserPublicStats = async (paramsX: Record<string, any>) => {
  const { user_id, ...params } = paramsX;
  return authenticated(api).get(`/analytics/user-stats/${user_id}`, {
    params,
  });
};
