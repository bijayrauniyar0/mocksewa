"use client";
import { usePathname } from "next/navigation";
import React from "react";

import Navbar from "../../Navbar";

const routesWithoutNavbar = [
  "/login",
  "/signup",
  "/verify-email",
  "/mcq",
  "/forgot-password",
  "/verify-forgot-password",
  "/reset-password",
];
const NavbarWrapper = () => {
  const pathname = usePathname();

  const showNavbar = !routesWithoutNavbar.some((route) =>
    pathname.includes(route)
  );


  return <> {showNavbar && <Navbar />}</>;
};

export default NavbarWrapper;
