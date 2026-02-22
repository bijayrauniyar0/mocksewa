"use client";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import ErrorMessage from "@/components/common/ErrorMessage";
import { FormControl, Input } from "@/components/common/FormUI";
import InputLabel from "@/components/common/FormUI/InputLabel";
import useDebouncedInput from "@/hooks/useDebouncedInput";
import { checkIfEmailExists } from "@/services/ClientSide/common";

export default function StepOne() {
  const {
    register,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useFormContext();
  const email = watch("email");
  const { mutate: checkEmail } = useMutation({
    mutationFn: (payload: Record<string, any>) => checkIfEmailExists(payload),
    onSuccess: (data: any) => {
      if (data?.data?.exists) {
        setError("email", {
          type: "custom",
          message: "Email already exists",
        });
      } else {
        setError("email", {
          type: "custom",
          message: "",
        });
      }
    },
  });

  const [inputValue, handleDebouncedChange, setInputValue] = useDebouncedInput({
    init: email,
    onChange: (e) => setValue("email", e.target.value),
    ms: 700,
  });

  useEffect(() => {
    setInputValue(email);
  }, [setInputValue, email]);
  useEffect(() => {
    if (email.includes("@") && email.includes(".")) {
      checkEmail({ email });
    }
  }, [email, checkEmail]);

  return (
    <>
      <FormControl className="mb-4">
        <InputLabel label="Full Name" className="mb-1" astric />
        <Input
          id="name"
          type="text"
          placeholder="Enter Your Name"
          {...register("name")}
        />
        <ErrorMessage message={errors.name?.message as string} />
      </FormControl>
      <FormControl className="mb-4">
        <InputLabel label="Email" className="mb-1" astric />
        <Input
          id="email"
          type="email"
          placeholder="Enter Email (e.g. bijay@example.com)"
          onChange={handleDebouncedChange}
          value={inputValue}
        />
        <ErrorMessage message={errors.email?.message as string} />
      </FormControl>
      <FormControl className="mb-4">
        <InputLabel label="Phone Number" className="mb-1" />
        <Input
          id="phone"
          type="text"
          placeholder="Enter Phone Number"
          {...register("number")}
        />
        <ErrorMessage message={errors.number?.message as string} />
      </FormControl>
    </>
  );
}
