import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import {
  forgotPassword,
  resendVerificationEmail,
} from "@/services/ClientSide/common";

export const useSendVerificationEmail = () => {
  const router = useRouter();
  const [timerValue, setTimerValue] = useState(0);
  const handleTimerUpdate = (value: number) => {
    setTimerValue(value);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: Record<string, any>) =>
      resendVerificationEmail(payload),
    onSuccess: () => {
      toast.success("Verification email sent successfully.");
      setTimerValue((prev) => prev + 120);
    },
    onError: (error: any) => {
      const caughtError = error?.response?.data;
      const errorMessage = caughtError?.message;
      const isVerified = caughtError?.isVerified;
      const userFound = caughtError?.userFound;

      if (isVerified === true) {
        toast.error(errorMessage || "Email already verified. Please login.");
        router.push("/login");
        return;
      }

      if (userFound === false) {
        toast.error(errorMessage || "User not found. Please sign up.");
        router.push("/login");
        return;
      }

      if (isVerified === false && userFound === true) {
        toast.error(errorMessage || "Failed to send verification email.");
        return;
      }
    },
  });

  return {
    mutate,
    isPending,
    timerValue,
    handleTimerUpdate,
  };
};

export const useSendPasswordResetEmail = () => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (payload: Record<string, any>) => forgotPassword(payload),
    onError: ({ response }: any) => {
      toast.error(
        response?.data?.message || "Something went wrong. Please try again."
      );
    },
  });
  return {
    mutate,
    isPending,
    isSuccess,
  };
};
