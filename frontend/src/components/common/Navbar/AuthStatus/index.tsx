import dynamic from "next/dynamic";

import { CustomLink } from "@/components/ui/custom-link";
import Skeleton from "@/components/ui/Skeleton";

const AccountMenu = dynamic(() => import("../AccountMenu"), {
  ssr: false,
});

const Notification = dynamic(() => import("../Notification"), {
  ssr: false,
});

export const AuthStatus = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean | null;
}) => {
  if (isAuthenticated === true)
    return (
      <>
        <Notification />
        <AccountMenu />
      </>
    );
  if (isAuthenticated === null)
    return (
      <>
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-[2.2rem] w-[2.2rem] sm:h-[2.5rem] sm:w-[2.5rem] rounded-full" />
      </>
    );
  return (
    <CustomLink
      href="/login"
      className="!h-fit !rounded-full py-2 max-md:hidden"
    >
      Login
    </CustomLink>
  );
};
