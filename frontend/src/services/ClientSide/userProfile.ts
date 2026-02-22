import { api, authenticated } from ".";

export const getUserPublicProfileById = async (userId: string) => {
  return authenticated(api).get(`/user/${userId}/`);
};
