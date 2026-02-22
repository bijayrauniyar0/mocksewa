"use client";
import { useFormContext } from "react-hook-form";

import ErrorMessage from "@/components/common/ErrorMessage";
import { FormControl } from "@/components/common/FormUI";
import Checkbox from "@/components/common/FormUI/CheckBox";
import InputLabel from "@/components/common/FormUI/InputLabel";
import PasswordInput from "@/components/common/FormUI/PasswordInput";

export default function StepTwo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <FormControl className="relative mb-3">
        <InputLabel label="Password" className="mb-1 text-xs" />
        <PasswordInput
          id="password"
          className="w-[4/5] pr-10"
          placeholder="Enter Password"
          {...register("password")}
        />

        {errors?.password?.message && (
          <ErrorMessage message={errors.password?.message as string} />
        )}
      </FormControl>
      <FormControl className="relative mb-3">
        <InputLabel label="Password" className="mb-1 text-xs" />
        <PasswordInput
          id="confirm-password"
          className="w-[4/5] pr-10"
          placeholder="Enter Password"
          {...register("confirmPassword")}
        />

        <ErrorMessage message={errors.confirmPassword?.message as string} />
      </FormControl>
      <div className="mb-8">
        <Checkbox
          label="I agree to the terms and conditions"
          labelClassName="!text-gray-800  !mb-0"
          {...register("isTermsChecked")}
        />
      </div>
    </>
  );
}
