import { UserProfileUpdate } from "@/types/user";

import { api, authenticated } from ".";

export const getAllUsers = async () => {
  return api.get("/user/");
};

export const getUserProfile = async () => {
  return authenticated(api).get(`/user/profile/`);
};

export const logoutUser = async () => {
  return authenticated(api).post("/auth/log-out/");
};

export const createNewUser = (payload: Record<string, any>) => {
  return api.post("/auth/signup/", { ...payload });
};

export const checkIfEmailExists = (payload: Record<string, any>) => {
  return api.post("/auth/check-email-exists/", { ...payload });
};

export const resendVerificationEmail = (payload: Record<string, any>) => {
  return api.post("/auth/resend-verification-mail/", payload);
};

export const verifyEmail = (payload: Record<string, any>) => {
  return api.post("/auth/verify-email/", payload);
};

export const updateUser = (payload: UserProfileUpdate) => {
  return authenticated(api).patch("/user/profile/", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const changePassword = (payload: Record<string, string>) => {
  return authenticated(api).patch("/user/change-password/", {
    ...payload,
  });
};

export const login = (payload: Record<string, any>) => {
  return api.post("/auth/login/", { ...payload });
};

export const forgotPassword = (payload: Record<string, any>) => {
  return api.post("/auth/forgot-password/", { ...payload });
};

export const getNotificationCount = () => {
  return authenticated(api).get("/notification/unread-count/");
};

export const getNotifications = (params: Record<string, any>) => {
  return authenticated(api).get("/notification/", { params });
};
export const markNotificationAsRead = (notificationId: number) => {
  return authenticated(api).post(`/notification/${notificationId}/`);
};
export const markAllNotificationsAsRead = () => {
  return authenticated(api).post("/notification/");
};
