import { authenticatedServer } from ".";

export const getLeaderboard = async (params: Record<string, any>) => {
  const api = await authenticatedServer();
  return api.get("/leaderboard/rank/", { params });
};
