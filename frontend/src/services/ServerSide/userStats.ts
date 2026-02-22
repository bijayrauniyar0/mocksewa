import { authenticatedServer } from ".";

export const getMockTestTakenByUser = async () => {
  const api = await authenticatedServer();
  return await api.get("/user/profile/mock-tests");
};

export const getLeaderboard = async (params: Record<string, any>) => {
  const api = await authenticatedServer();
  return await api.get("/leaderboard/rank/", { params });
};
