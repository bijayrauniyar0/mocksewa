"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import useAuthStore from "@/store/auth";

interface RedirectIfAuthenticatedProps {
  children: React.ReactNode;
}

export default function RedirectIfAuthenticated({
  children,
}: RedirectIfAuthenticatedProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === true) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  // Don't render children if user is authenticated or auth status is loading
  if (isAuthenticated === true || isAuthenticated === null) {
    return null;
  }

  return <>{children}</>;
}
