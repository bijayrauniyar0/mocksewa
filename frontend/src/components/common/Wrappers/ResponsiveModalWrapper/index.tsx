import React from "react";

import useScreenWidth from "@/hooks/useScreenWidth";

import Modal from "../../Modal";

type ResponsiveModalWrapperProps = {
  screenWidth: number;
  children?: React.ReactNode;
  showModal: boolean;
  className?: string;
  title?: string;
  subTitle?: string;
  handleModalClose: () => void;
};
const ResponsiveModalWrapper = ({
  screenWidth,
  showModal,
  className,
  children,
  handleModalClose,
  title,
}: ResponsiveModalWrapperProps) => {
  const currentScreenWidth = useScreenWidth();
  if (currentScreenWidth > screenWidth) {
    return children;
  }
  return (
    <Modal
      show={showModal}
      className={className}
      title={title || ""}
      onClose={handleModalClose}
      titleClassName="!text-base text-gray-800"
      headerClassName="!space-y-0"
    >
      {children}
    </Modal>
  );
};

export default ResponsiveModalWrapper;
