"use client";

import { ChevronRight, Funnel } from "lucide-react";
import { Suspense } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useScreenWidth from "@/hooks/useScreenWidth";

import Spinner from "../../Spinner";

type Props = {
  children: React.ReactNode;
};

const ResponsiveDropdownWrapper = ({ children }: Props) => {
  const screenWidth = useScreenWidth();

  if (screenWidth > 768) return <>{children}</>;

  return (
    <Suspense fallback={<Spinner />}>
      {screenWidth > 768
        ? children
        : Boolean(screenWidth) && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="group flex items-center justify-center rounded-lg bg-primary-600 px-2 py-[0.35rem] text-md text-white lg:text-base">
                  <p className="hidden md:block">Filters</p>
                  <ChevronRight className="hidden h-4 w-4 transition-all duration-100 ease-in-out group-hover:translate-x-2 md:block" />
                  <Funnel className="h-4 w-4 md:hidden" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end">
                <div className="flex flex-col gap-2 px-4 py-2">{children}</div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
    </Suspense>
  );
};

export default ResponsiveDropdownWrapper;
