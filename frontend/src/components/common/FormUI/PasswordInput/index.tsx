import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

import Input from "../Input";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ placeholder, className, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        <Input
          ref={ref}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          className={cn(`!w-full`, className)}
          {...rest}
        />
        {showPassword ? (
          <Eye
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2/4 h-5 w-5 -translate-y-2/4"
          />
        ) : (
          <EyeOff
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2/4 h-5 w-5 -translate-y-2/4"
          />
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
