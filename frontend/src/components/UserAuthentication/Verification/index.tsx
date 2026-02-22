"use client";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { FlexRow } from "@/components/common/Layouts";
import { verifyEmail } from "@/services/ClientSide/common";
import useAuthStore from "@/store/auth";

import VerificationFailed from "./VerificationFailed";
import EmailVerified from "./Verified";
import EmailVerifying from "./Verifying";

export default function EmailVerification() {
  const { token } = useParams();
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "success" | "error"
  >("pending");

  useEffect(() => {
    setIsPageLoaded(true);
    return () => {
      setIsPageLoaded(false);
    };
  }, []);

  const { mutate: mutateVerifyEmail, isPending: isEmailVerifying } =
    useMutation({
      mutationFn: (payload: Record<string, any>) => verifyEmail(payload),
      onSuccess: () => {
        if (!isPageLoaded) return;
        setTimeout(() => {
          setVerificationStatus("success");
        }, 1000);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      },
      onError: (error: any) => {
        if (!isPageLoaded) return;
        const caughtError = error?.response?.data;
        if (caughtError.verificationStatus === "failed") {
          setTimeout(() => {
            setVerificationStatus("error");
          }, 1000);
          return;
        }
      },
    });

  useEffect(() => {
    if (token) {
      mutateVerifyEmail({ token });
    }
  }, [mutateVerifyEmail, token]);
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const getVerificationStatus = () => {
    if (isEmailVerifying || verificationStatus === "pending") {
      return <EmailVerifying />;
    } else if (verificationStatus === "success") {
      return <EmailVerified />;
    } else {
      return <VerificationFailed />;
    }
  };
  return (
    <FlexRow className="flex h-[calc(100vh-3.15rem)] items-center justify-center bg-purple-50 px-2 max-sm:h-[calc(100vh-2.55rem)]">
      {getVerificationStatus()}
    </FlexRow>
  );
}
