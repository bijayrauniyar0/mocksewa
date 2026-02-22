'use client";';
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import ErrorMessage from "@/components/common/ErrorMessage";
import { Input } from "@/components/common/FormUI";
import InputLabel from "@/components/common/FormUI/InputLabel";
import PasswordInput from "@/components/common/FormUI/PasswordInput";
import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import { Button } from "@/components/ui/button";
import { login } from "@/services/ClientSide/common";
import { apiURL } from "@/services/ClientSide/index";
import useAuthStore from "@/store/auth";

import FormControl from "../../common/FormUI/FormControl";

const initialState = {
  email: "",
  password: "",
  // keepSignedIn: false,
};

export default function Login() {
  const router = useRouter();
  const setUserProfile = useAuthStore((state) => state.setUserProfile);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: initialState,
  });

  const { mutate } = useMutation<any, any, any, unknown>({
    mutationFn: (payload: Record<string, any>) => login(payload),
    onSuccess: (res: any) => {
      setUserProfile(res.data.user);
      router.push("/");
      setIsAuthenticated(true);
    },
    onError: ({ response }: any) => {
      if (response?.status === 401 && response?.data?.verified === false) {
        setUserProfile({ email: watch("email") });
        router.push("/verify-email");
        return;
      }
      const caughtError = response?.data?.message;
      if (caughtError) {
        setError("email", {
          type: "manual",
          message: caughtError,
        });
      }
    },
  });
  const email = watch("email");
  useEffect(() => {
    if (errors?.email?.type === "manual") {
      clearErrors("email");
    }
  }, [email, errors, clearErrors]);

  const onSubmit = (data: Record<string, any>) => {
    mutate(data);
  };
  const handleLogin = () => {
    window.location.href = `${apiURL}/auth/google`;
  };

  return (
    <div className="h-full">
      <div className="grid h-full place-items-center">
        <div className="login-form w-full overflow-hidden p-7 text-center sm:min-w-[25.25rem] sm:px-12 lg:px-16">
          {/* ------ icon ------ */}

          <h1 className="select-none text-5xl font-semibold text-primary-700">
            MockSewa
          </h1>
          {/*  ------ form ------ */}
          <form onSubmit={handleSubmit(onSubmit)} className="pb-8 pt-12">
            <FlexColumn className="gap-4">
              <FormControl>
                <InputLabel label="Email" className="mb-1" />
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter Email (e.g. bijay@example.com)"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors?.email?.message && (
                  <ErrorMessage message={errors.email.message} />
                )}
              </FormControl>

              <FormControl className="relative">
                <InputLabel label="Password" className="mb-1 text-xs" />
                <PasswordInput
                  id="password"
                  className="w-[4/5] pr-10"
                  placeholder="Enter Password"
                  {...register("password", {
                    required: "Password is Required",
                  })}
                />
                {errors?.password?.message && (
                  <ErrorMessage message={errors.password.message} />
                )}
              </FormControl>
            </FlexColumn>

            <div className="flex items-center justify-end gap-2">
              <Link
                className="cursor-pointer px-2 text-primary-800"
                href="/forgot-password"
              >
                Forgot Password ?
              </Link>
            </div>

            <FlexColumn className="w-full items-center justify-center gap-8">
              <Button
                className="w-full p-3 mt-6 md:mt-10"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                type="submit"
              >
                Sign In
              </Button>
              <p className="text-center text-sm">
                Don&apos;t have an account ?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-primary-700 hover:underline"
                >
                  Register Here
                </Link>
              </p>
            </FlexColumn>
          </form>

          <FlexColumn className="items-start gap-8">
            <FlexRow className="w-full items-center justify-between gap-2">
              <div className="h-px w-2/5 bg-gray-300" />
              <p className="text-center">Or</p>
              <div className="h-px w-2/5 bg-gray-300" />
            </FlexRow>
            <button
              onClick={handleLogin}
              className="mx-auto flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition-colors hover:bg-gray-100"
            >
              <Image
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="h-5 w-5"
                width={20}
                height={20}
              />
              <span>Continue with Google</span>
            </button>
          </FlexColumn>
        </div>
      </div>
    </div>
  );
}
