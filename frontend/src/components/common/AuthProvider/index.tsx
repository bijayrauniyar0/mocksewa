// components/auth-provider.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { checkLogin } from "@/services/ClientSide/auth";
import { getUserProfile } from "@/services/ClientSide/common";
import useAuthStore from "@/store/auth";

export default function AuthProvider() {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setUserProfile = useAuthStore((state) => state.setUserProfile);
  const { data: isAuthenticated } = useQuery({
    queryKey: ["isAuthenticated"],
    queryFn: async () => {
      try {
        const res = await checkLogin();
        return res.data.isAuthenticated;
      } catch (err: any) {
        if (err?.response?.status === 401) {
          return false;
        }
        throw err; // rethrow for other unexpected errors
      }
    },
  });
  useEffect(() => {
    setIsAuthenticated(isAuthenticated);
  }, [isAuthenticated, setIsAuthenticated]);

  const { isSuccess: isUserDataFetched, data: loggedInUserDetails } = useQuery({
    queryKey: ["getUserProfile", isAuthenticated],
    queryFn: () => getUserProfile(),
    select: ({ data }) => data,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (isUserDataFetched && loggedInUserDetails) {
      setUserProfile(loggedInUserDetails);
    }
  }, [loggedInUserDetails, isUserDataFetched, setUserProfile]);

  return null;
}
