"use client";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useParams } from "next/navigation";

import Avatar from "@/components/common/Avatar";
import { Button } from "@/components/ui/button";
import { getInitialsFromName } from "@/lib/index";
import { getUserPublicProfileById } from "@/services/ClientSide/userProfile";
import useAuthStore, { User } from "@/store/auth";
import { useCommonStore } from "@/store/common";

import AvatarChange from "./AvatarChange";

type UserProfileProps = {
  initialData: User | null;
};
const UserDetailsSection = ({ initialData }: UserProfileProps) => {
  const { user_id } = useParams();
  const toggleModal = useCommonStore((state) => state.toggleModal);
  const userProfile = useAuthStore((state) => state.userProfile);
  const { data: userProfileData } = useQuery<User | null>({
    queryKey: ["user-profile", user_id],
    queryFn: async () => {
      const res = await getUserPublicProfileById(user_id as string);
      return res.data;
    },
    initialData,
  });

  return (
    <div className="flex flex-col sm:flex-row md:flex-col gap-4 items-center">
      <div className="relative h-fit w-fit md:mx-auto rounded-full shrink-0">
        <Avatar
          src={userProfileData?.avatar || ""}
          alt=""
          className="w-[7rem] sm:w-[10rem] md:w-[10rem] lg:w-[14rem] h-full aspect-square"
          fallback={getInitialsFromName(userProfileData?.name || "")}
        />
        {Number(user_id) === userProfile.id && (
          <div className="absolute bottom-0 right-0 -translate-x-2 -translate-y-12">
            <AvatarChange />
          </div>
        )}
      </div>
      <div className="flex w-full flex-col gap-4">
        <div className="flex max-sm:flex-col sm:justify-between md:flex-col gap-4">
          <p className="text-xl font-semibold max-sm:text-center md:text-2xl lg:text-4xl">
            {userProfileData?.name}
          </p>
          {userProfile.id === Number(user_id) && (
            <Button
              variant="outline"
              onClick={() => toggleModal("edit-profile")}
            >
              <Pencil className="h-4 w-4 md:h-[20px] md:w-[20px]" />
              Edit Profile
            </Button>
          )}
        </div>
        <p className="max-sm:text-center">{userProfileData?.bio}</p>
      </div>
    </div>
  );
};

export default UserDetailsSection;
