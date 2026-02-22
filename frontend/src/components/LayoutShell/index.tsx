"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { getUserProfile } from "@/services/ClientSide/common";
import useAuthStore from "@/store/auth";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUserProfile = useAuthStore((state) => state.setUserProfile);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { isSuccess: isUserDataFetched, data: loggedInUserDetails } = useQuery({
    queryKey: ["getUserProfile", isAuthenticated],
    queryFn: () => getUserProfile(),
    select: ({ data }) => data,
    enabled: Boolean(isAuthenticated),
  });

  useEffect(() => {
    if (isUserDataFetched && loggedInUserDetails) {
      setUserProfile(loggedInUserDetails);
    }
  }, [loggedInUserDetails, isUserDataFetched, setUserProfile]);

  return <>{children}</>;
}
