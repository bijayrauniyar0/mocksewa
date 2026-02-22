import { api } from "../ClientSide";

export const getUserPublicProfileById = async (userId: string) => {
  return await api.get(`/user/${userId}/`);
};
