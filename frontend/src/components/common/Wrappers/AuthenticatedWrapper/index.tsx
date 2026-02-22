"use client";
import React from "react";

import useAuthStore from "@/store/auth";

import Spinner from "../../Spinner";

type AuthenticatedWrapperProps = {
  children: React.ReactNode;
};
const AuthenticatedWrapper = ({ children }: AuthenticatedWrapperProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (isAuthenticated === null || isAuthenticated === undefined) {
    return <Spinner />;
  }
  if (isAuthenticated === false) {
    return <></>;
  }
  return <>{children}</>;
};

export default AuthenticatedWrapper;
