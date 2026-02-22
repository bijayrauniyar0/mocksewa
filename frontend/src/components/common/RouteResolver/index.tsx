"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Spinner from "@/components/common/Spinner";
import useAuthStore from "@/store/auth";

interface RouteResolverProps {
  publicComponent: React.ComponentType;
  authenticatedPath: string;
}

export default function RouteResolver({
  publicComponent: PublicComponent,
  authenticatedPath,
}: RouteResolverProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === true) {
      router.push(authenticatedPath);
    }
  }, [isAuthenticated, router, authenticatedPath]);

  // Show spinner while loading auth status
  if (isAuthenticated === null) {
    return <Spinner />;
  }

  // Redirect authenticated users
  if (isAuthenticated === true) {
    return null;
  }

  // Show public component for non-authenticated users
  return <PublicComponent />;
}
