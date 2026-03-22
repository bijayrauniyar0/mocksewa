"use client";
import { redirect } from "next/navigation";

import useAuthStore from "@/store/auth";

const UserProfilePage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userId = useAuthStore((state) => state.userProfile.id);
  if (userId && isAuthenticated) {
    redirect(`/user-profile/${userId}`);
  }
};

export default UserProfilePage;
