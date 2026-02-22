import { useMutation } from "@tanstack/react-query";
import { Book, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import Avatar from "@/components/common/Avatar";
import { FlexRow } from "@/components/common/Layouts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitialsFromName } from "@/lib/index";
import { logoutUser } from "@/services/ClientSide/common";
import useAuthStore from "@/store/auth";

const AccountMenu = () => {
  const router = useRouter();
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const userProfile = useAuthStore((state) => state.userProfile);
  const setUserProfile = useAuthStore((state) => state.setUserProfile);

  const { mutate: logout, isPending: isLogoutLoading } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setUserProfile({});
      router.push("/login");
      setIsAuthenticated(false);
    },
  });
  const handleLogout = () => {
    logout();
  };
  const userAvatar = useMemo(() => {
    return (
      <Avatar
        src={userProfile.avatar || ""}
        alt="User"
        fallback={getInitialsFromName(userProfile.name || "")}
        className="h-[2.2rem] w-[2.2rem] md:h-[2.5rem] md:w-[2.5rem]"
      />
    );
  }, [userProfile]);
  return (
    <>
      <DropdownMenu
        open={accountDropdownOpen}
        onOpenChange={(openStatus: any) => setAccountDropdownOpen(openStatus)}
      >
        <DropdownMenuTrigger className="outline-none">
          {userAvatar}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[15rem] !p-0 shadow-[0px_2px_20px_4px_rgba(0,0,0,0.12)] sm:w-[17.5rem]"
        >
          <FlexRow className="items-center gap-3 border-b-[1px] border-[#D7D7D7] px-3 py-2">
            {userAvatar}
            <p className="line-clamp-1 text-sm font-bold uppercase text-[#475467] sm:text-base">
              {userProfile?.name || ""}
            </p>
          </FlexRow>
          <DropdownMenuItem
            className="flex cursor-pointer !items-center gap-2 rounded-none p-3 hover:!bg-primary-100"
            onClick={() => router.push(`/bookmarks`)}
          >
            <Book className="text-[#475467] size-5" />
            <p className="pb-1 text-md text-[#475467]">My Bookmarks</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer !items-center gap-2 rounded-none p-3 hover:!bg-primary-100"
            onClick={() => router.push(`/user-profile/${userProfile.id}/stats`)}
          >
            <Settings className="text-[#475467] size-5" />
            <p className="pb-1 text-md text-[#475467]">My Profile</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2 rounded-none p-3 hover:!bg-primary-100"
            onClick={handleLogout}
            disabled={isLogoutLoading}
          >
            <LogOut className="text-[#475467] size-5" />
            <p className="pb-1 text-md text-[#475467]">Logout</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AccountMenu;
