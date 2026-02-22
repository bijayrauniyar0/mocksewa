import { AxiosInstance } from "axios";
import { cookies } from "next/headers";

import { api } from "../ClientSide";

/**
 * Returns an Axios instance with auth cookies injected (server-side only).
 */
export const authenticatedServer = async (): Promise<AxiosInstance> => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  const instance = api;

  if (token) {
    instance.defaults.headers.Cookie = `token=${token}`;
  }

  instance.defaults.withCredentials = true;
  return instance;
};
