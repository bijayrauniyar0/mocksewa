"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { FlexRow } from "@/components/common/Layouts";
import {
  authenticatedNavbarData,
  publicNavbarData,
} from "@/constants/navbarData";
import useAuthStore from "@/store/auth";

import { AuthStatus } from "./AuthStatus";
import Logo from "./Logo";
const SmallScreenNavbar = dynamic(() => import("./SmallScreenNavbar"));

const Navbar = () => {
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Choose navbar data based on authentication status
  const navbarData = isAuthenticated
    ? authenticatedNavbarData
    : publicNavbarData;

  return (
    <>
      <header className="sticky right-0 top-0 z-[11]">
        <nav className="flex w-full items-center justify-between bg-white px-4 py-1 shadow-sm xl:px-7">
          <Link href={isAuthenticated ? "/dashboard" : "/"}>
            <Logo />
          </Link>
          <div className="flex items-center gap-x-9 max-md:hidden">
            {navbarData.map((navbarItem) => {
              const isActive = pathname.startsWith(navbarItem.link);
              return (
                <Link
                  key={navbarItem.id}
                  prefetch={true}
                  className={`border-b-2 border-transparent px-3 py-2 text-base font-medium tracking-[-0.5px] text-matt-100 ${
                    isActive
                      ? "border-b-primary-600 duration-200"
                      : "duration-200 hover:text-primary-600"
                  }`}
                  href={navbarItem.link}
                >
                  {navbarItem.name}
                </Link>
              );
            })}
          </div>

          <FlexRow className="flex items-center gap-3 max-sm:gap-2">
            <AuthStatus isAuthenticated={isAuthenticated} />
            <SmallScreenNavbar navbarData={navbarData} />
          </FlexRow>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
