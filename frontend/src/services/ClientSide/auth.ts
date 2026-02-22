import { api, authenticated } from ".";

export const forgotPassword = (payload: Record<string, any>) => {
  return api.post("/auth/forgot-password/", { ...payload });
};

export const resetPassword = (payload: Record<string, any>) => {
  return api.post("/auth/reset-forgot-password/", { ...payload });
};

export const checkLogin = async () => {
  return authenticated(api).get("/auth/check-login/");
};
