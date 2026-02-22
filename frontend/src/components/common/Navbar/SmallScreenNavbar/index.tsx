"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import MockSewaLogo from "@/assets/images/logos/mocksewa2.png";
import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import { CustomLink } from "@/components/ui/custom-link";
import { INavbarLinkData } from "@/constants/navbarData";
import useAuthStore from "@/store/auth";

interface SmallScreenNavbarProps {
  navbarData: INavbarLinkData[];
}

const SmallScreenNavbar = ({ navbarData }: SmallScreenNavbarProps) => {
  const pathname = usePathname();
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const closeBurgerMenu = () => setBurgerMenuOpen(false);

  return (
    <div className="w-full md:hidden">
      <Menu
        name="menu"
        className="flex cursor-pointer items-center justify-center h-5 w-5"
        onClick={() => setBurgerMenuOpen(true)}
      />

      <div
        className={`${
          burgerMenuOpen ? "translate-x-0" : "translate-x-full"
        } duration-300 ease-in-out transition-all fixed right-0 top-0 z-[100] h-screen w-full bg-white`}
      >
        <FlexRow className="items-center justify-between px-6 py-4">
          <Link
            className="flex min-w-[9rem] cursor-pointer items-center gap-2"
            href={isAuthenticated ? "/dashboard" : "/"}
          >
            <Image src={MockSewaLogo} alt="MS" className="w-8" />
            <p className="text-xl font-bold text-primary-700">MockSewa</p>
          </Link>
          <X className="h-5 w-5" onClick={closeBurgerMenu} />
        </FlexRow>

        <FlexColumn className="w-full gap-1 p-4">
          {navbarData.map((item) => {
            const isActive = pathname.startsWith(item.link);
            return (
              <Link
                key={item.id}
                onClick={closeBurgerMenu}
                className={`rounded-lg px-3 py-4 text-md transition-all duration-300 ease-in-out hover:bg-primary-200 ${
                  isActive
                    ? "bg-primary-200 font-medium text-primary-700"
                    : "font-normal text-black hover:no-underline"
                }`}
                href={item.link}
              >
                <FlexRow className="items-center gap-2">
                  <item.icon className="!h-5 !w-5 text-primary-700" />
                  {item.name}
                </FlexRow>
              </Link>
            );
          })}
        </FlexColumn>

        {!isAuthenticated && (
          <FlexColumn className="w-full gap-6 px-6">
            <CustomLink
              href="/login"
              className="!h-fit w-full !rounded-full py-3"
            >
              Login
            </CustomLink>
            <CustomLink
              href="/signup"
              variant="secondary"
              className="!h-fit w-full !rounded-full py-3"
            >
              Sign Up
            </CustomLink>
          </FlexColumn>
        )}
      </div>
    </div>
  );
};

export default SmallScreenNavbar;
