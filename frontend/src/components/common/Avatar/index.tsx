import React from "react";

import {
  Avatar as AvatarPrimitive,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface AvatarProps extends React.ComponentProps<typeof AvatarImage> {
  src?: string;
  alt: string;
  fallback?: string;
}

const Avatar = ({ src, alt, fallback, className, ...props }: AvatarProps) => {
  return (
    <AvatarPrimitive className={className}>
      <AvatarImage src={src} alt={alt} {...props} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </AvatarPrimitive>
  );
};

export default Avatar;
