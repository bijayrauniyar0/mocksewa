import { User } from "@/store/auth";

export type UserProfileUpdate = Partial<Omit<User, "avatar">> & {
  avatar?: File; // Adding the avatar field with File type
};

export type UserProfileParamsProps = {
  params: Promise<{
    user_id: string;
  }>;
};
