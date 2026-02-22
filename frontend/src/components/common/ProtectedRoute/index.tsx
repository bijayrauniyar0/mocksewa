"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Spinner from "@/components/common/Spinner";
import useAuthStore from "@/store/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Show spinner while loading auth status
  if (isAuthenticated === null) {
    return <Spinner />;
  }

  // Don't render children if user is not authenticated
  if (isAuthenticated === false) {
    return null;
  }

  return <>{children}</>;
}
