"use client";

import dynamic from "next/dynamic";
import React from "react";

import { useCommonStore } from "@/store/common";
const Modal = dynamic(() => import("../../Modal"), { ssr: false });
import { getModalContent } from "@/constants/modalContent";

const ModalWrapper = () => {
  const showModal = useCommonStore((state) => state.showModal);
  const modalContent = useCommonStore((state) => state.modalContent);
  const setModalContent = useCommonStore((state) => state.setModalContent);
  const toggleModal = useCommonStore((state) => state.toggleModal);

  const handleModalClose = () => {
    toggleModal();
    setTimeout(() => {
      setModalContent(null);
    }, 150);
  };
  return (
    <Modal
      show={showModal}
      className={getModalContent(modalContent)?.className || ""}
      title={getModalContent(modalContent)?.title}
      onClose={handleModalClose}
      hideCloseButton={!!getModalContent(modalContent)?.hideCloseButton}
    >
      {getModalContent(modalContent)?.content}
    </Modal>
  );
};

export default ModalWrapper;
