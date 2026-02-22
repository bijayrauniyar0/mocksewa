import { authenticatedServer } from ".";

export const checkLogin = async () => {
  const api = await authenticatedServer();
  return await api.get("/auth/check-login/");
};
