"use client";
import { redirect } from "next/navigation";
import React from "react";

import useAuthStore from "@/store/auth";

import Spinner from "../../Spinner";

type ProtectedLayoutProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};
const ProtectedLayout = ({ children, fallback }: ProtectedLayoutProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (isAuthenticated === null || isAuthenticated === undefined) {
    return <Spinner />;
  }
  if (isAuthenticated === false) {
    if (fallback) {
      return <>{fallback}</>;
    }
    redirect("/login");
  }
  return <>{children}</>;
};

export default ProtectedLayout;
