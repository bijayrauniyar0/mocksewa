import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { UserProfileUpdate } from "@/api/User";
import ErrorMessage from "@/components/common/ErrorMessage";
import { FormControl } from "@/components/common/FormUI";
import InputLabel from "@/components/common/FormUI/InputLabel";
import { FlexColumn } from "@/components/common/Layouts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import isEmpty from "@/lib/isEmpty";
import { updateUser } from "@/services/ClientSide/common";
import useAuthStore from "@/store/auth";
import { useCommonStore } from "@/store/common";
import { signupSchemaStepOne } from "@/validations/Authentication";

const EditProfile = () => {
  const queryClient = useQueryClient();
  const userProfile = useAuthStore((state) => state.userProfile);
  const toggleModal = useCommonStore((state) => state.toggleModal);
  const defaultValues = {
    name: userProfile?.name,
    number: userProfile?.number,
    bio: userProfile?.bio,
  };
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<typeof defaultValues>({
    defaultValues,
    resolver: zodResolver(signupSchemaStepOne.omit({ email: true })),
  });

  const onSuccessFn = () => {
    queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    toggleModal();
  };
  const { mutate: updateUserProfile, isPending: isUpdating } = useMutation({
    mutationFn: (data: UserProfileUpdate) => updateUser(data),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      onSuccessFn();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });
  // const { mutate: changeUserPassword, isPending: isPasswordChanging } =
  //   useMutation({
  //     mutationFn: (data: IChangePasswordPayload) => changePassword(data),
  //     onSuccess: () => {
  //       toast.success('Profile updated successfully');
  //       onSuccessFn();
  //     },
  //     onError: error => {
  //       toast.error(error.message || 'Failed to change profile');
  //     },
  //   });

  // useEffect(() => {
  //   reset(defaultValues);
  // }, [reset]);

  const handleFormSubmit = () => {
    if (isEmpty(dirtyFields)) return;
    const formValues = getValues();
    const updatedValues = Object.keys(dirtyFields).reduce((acc, key) => {
      acc[key] = formValues[key as keyof typeof defaultValues];
      return acc;
    }, {} as Record<string, any>);
    updateUserProfile(updatedValues);
  };
  

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <FlexColumn className="gap-1">
        <FormControl>
          <InputLabel label="Full Name" astric />
          <Input
            id="name"
            type="text"
            placeholder="Enter Your Name"
            {...register("name")}
          />
          <ErrorMessage message={errors.name?.message} />
        </FormControl>
        <FormControl>
          <InputLabel label="Email" astric />
          <Input
            id="email"
            type="email"
            disabled
            readOnly
            placeholder="Enter Email (e.g. mocksewa@example.com)"
            value={userProfile?.email}
          />
        </FormControl>
        <FormControl>
          <InputLabel label="Phone Number" />
          <Input
            id="phone"
            type="text"
            placeholder="Enter Phone Number"
            {...register("number")}
          />
          <ErrorMessage message={errors.number?.message} />
        </FormControl>
        <FormControl>
          <InputLabel label="Bio" />
          <Textarea
            placeholder="Enter Bio (e.g. I am a BCA Aspirant)"
            className="h-[4.5rem] resize-none scrollbar-thin overflow-y-auto"
            {...register("bio")}
          />
          <ErrorMessage message={errors.bio?.message} />
        </FormControl>
      </FlexColumn>
      {/* {formKey === 'password' && (
          <FlexColumn className={`absolute w-full gap-1`}>
            <FormControl>
              <InputLabel label="Old Password" />
              <PasswordInput
                className="w-[4/5] pr-10"
                placeholder="Enter Password"
                {...register('old_password')}
              />

              {errors?.password?.message && (
                <ErrorMessage message={errors.password?.message} />
              )}
            </FormControl>
            <FormControl>
              <InputLabel label="New Password" />
              <PasswordInput
                className="w-[4/5] pr-10"
                placeholder="Enter Password"
                {...register('password')}
              />

              <ErrorMessage message={errors?.password?.message} />
            </FormControl>
            <FormControl>
              <InputLabel label="Confirm Password" />
              <PasswordInput
                className="w-[4/5] pr-10"
                placeholder="Enter Confirm Password"
                {...register('confirmPassword')}
              />

              <ErrorMessage message={errors.confirmPassword?.message} />
            </FormControl>
          </FlexColumn>
        )} */}
      <Button
        className="mx-auto w-fit"
        disabled={!isDirty || isUpdating}
        isLoading={isUpdating}
        type="submit"
      >
        <Save className="h-5 w-5" />
        Save Changes
      </Button>
    </form>
  );
};

export default EditProfile;
