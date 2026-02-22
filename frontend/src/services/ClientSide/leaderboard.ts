import { api, authenticated } from ".";

export const createLeaderboardEntry = (payload: Record<string, any>) => {
  return authenticated(api).post("/leaderboard/", payload);
};

export const getLeaderboard = (params: Record<string, any>) => {
  return authenticated(api).get("/leaderboard/rank/", { params });
};
