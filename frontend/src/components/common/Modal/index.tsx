import { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface IModalProps {
  title: string;
  subtitle?: string;
  show: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  headerContent?: string;
  zIndex?: number;
  hideCloseButton?: boolean;
  titleClassName?: string;
  headerClassName?: string;
  childrenWrapperClassName?: string;
}

export default function Modal({
  title,
  subtitle,
  show,
  onClose,
  children,
  className,
  titleClassName,
  headerClassName,
  childrenWrapperClassName,
}: IModalProps) {
  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "max-w-[calc(100vw-2rem)] border-gray-300 overflow-hidden !rounded-xl bg-white !p-0 md:max-w-[42rem]",
          className
        )}
      >
        <DialogHeader className={`${headerClassName} px-2 pt-2 md:px-6 md:pt-6`}>
          <DialogTitle className={`${titleClassName} heading-6 text-left`}>
            {title}
          </DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        <div
          className={`${childrenWrapperClassName} scrollbar h-full max-h-[calc(100dvh-8rem)] overflow-y-auto px-2 pb-2 md:px-6 md:pb-6`}
        >
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
