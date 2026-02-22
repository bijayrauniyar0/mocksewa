import { VariantProps } from "class-variance-authority";
import Link, { LinkProps } from "next/link";
import React from "react";

import { cn } from "@/lib/utils";

import { buttonVariants } from "./button";

type AnchorProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export interface CustomLinkProps
  extends LinkProps,
    AnchorProps,
    VariantProps<typeof buttonVariants> {}

export function CustomLink({
  className,
  variant,
  size,
  href,
  children,
  ...props
}: CustomLinkProps) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, size }), "md:text-sm", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
