"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import IconButton from "@/components/common/IconButton";
import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import { Button } from "@/components/ui/button";
import { createNewUser } from "@/services/ClientSide/common";
import useAuthStore from "@/store/auth";
import {
  signupSchemaStepOne,
  stepTwoValidation,
} from "@/validations/Authentication";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

export const defaultValues = {
  name: "",
  email: "",
  number: "",
  password: "",
  confirmPassword: "",
  isTermsChecked: false,
};

const SignupForm = () => {
  const router = useRouter();
  const setUserProfile = useAuthStore((state) => state.setUserProfile);
  const [formStep, setFormStep] = React.useState(1);
  const methods = useForm({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(
      formStep === 1 ? signupSchemaStepOne : stepTwoValidation
    ),
  });
  const { handleSubmit, reset, getValues } = methods;

  const { mutate, isPending } = useMutation<any, any, any, unknown>({
    mutationFn: (payload: Record<string, any>) => createNewUser(payload),
    onSuccess: () => {
      setUserProfile({
        email: getValues("email"),
        name: getValues("name"),
      });
      router.push("/verify-email");
    },
    onError: (error: any) => {
      const caughtError = error?.response?.data?.message;
      toast.error(caughtError || "Signup Failed Something Went Wrong");
    },
  });

  const onSubmit = async () => {
    if (formStep === 1) {
      setFormStep(2);
      return;
    }
    const data = getValues();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, isTermsChecked, ...payload } = data;
    mutate(payload);
  };

  return (
    <div className="login-inner grid h-full place-items-center">
      <div className="login-form w-full space-y-14 overflow-hidden p-7 text-center sm:min-w-[25.25rem] sm:px-12 lg:px-16">
        {/* ------ icon ------ */}

        <p className="select-none text-5xl font-semibold text-primary-700">
          MockSewa
        </p>
        {/*  ------ form ------ */}

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {formStep === 1 && <StepOne />}
            {formStep === 2 && <StepTwo />}
            <FlexColumn className="w-full items-center justify-center gap-8">
              <FlexRow className="w-full gap-2">
                {formStep !== 1 && (
                  <IconButton
                    className="w-[4rem] rounded-lg border p-3 text-primary-700 shadow-sm"
                    disabled={isPending}
                    name="chevron_left"
                    onClick={() => {
                      const values = getValues();
                      setFormStep(1);
                      reset({
                        ...values,
                        password: "",
                        confirmPassword: "",
                      });
                    }}
                  />
                )}
                <Button
                  className="w-full p-3 ease-in-out"
                  disabled={isPending}
                  isLoading={isPending}
                  type="submit"
                >
                  {formStep === 1 ? "Next" : "Sign Up"}
                </Button>
              </FlexRow>
              <p className="text-center text-sm">
                Already have an account ?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-primary-700 hover:underline"
                >
                  Login Here
                </Link>
              </p>
            </FlexColumn>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default SignupForm;
