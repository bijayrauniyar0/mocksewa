"use client";
import { useQueryClient } from "@tanstack/react-query";
import { Camera } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

import { useUserProfileUpdate } from "@/api/User";
import { ConfirmationDialog } from "@/components/common/Confirmation";
import { FlexColumn } from "@/components/common/Layouts";
import Modal from "@/components/common/Modal";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import Skeleton from "@/components/ui/Skeleton";
import { resizeImageToFile } from "@/lib/resizeImage";

const AvatarChange = () => {
  const queryClient = useQueryClient();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [avatar, setAvatar] = useState<File>();
  const confirmationTriggerRef = useRef<HTMLDivElement>(null);

  const handleCancel = () => {
    setAvatar(undefined);
    setPreviewImage("");
    setShowImageUploadModal(false);
  };
  const { mutate, isPending } = useUserProfileUpdate({
    onSuccess: () => {
      setShowImageUploadModal(false);
      setAvatar(undefined);
      setPreviewImage("");
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });

  const handleSubmit = () => {
    if (avatar) {
      mutate({ avatar });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      resizeImageToFile(file, (dataUrl, resizedFile) => {
        setPreviewImage(dataUrl);
        setAvatar(resizedFile);
      });
      setShowImageUploadModal(true);
    }
    e.target.value = ""; // Reset the input value
  };

  const triggerConfirmationDialog = () => {
    if (confirmationTriggerRef.current) {
      confirmationTriggerRef.current.click();
    }
  };
  return (
    <>
      <button className="flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-200 transition-all duration-200 hover:bg-gray-200">
        <input
          type="file"
          name="profile"
          id="profile"
          className="absolute cursor-pointer opacity-0"
          onChange={handleImageChange}
        />
        <Camera fill="#1f2937" className="h-7 w-7 text-gray-200" />
      </button>
      <Modal
        title="Change Profile Picture"
        show={showImageUploadModal}
        onClose={() => {
          triggerConfirmationDialog();
        }}
      >
        <FlexColumn className="items-center gap-5">
          <div className="relative h-fit w-fit shrink-0 rounded-full">
            {previewImage ? (
              <Image
                src={previewImage}
                width={200}
                height={200}
                alt=""
                className="aspect-square h-40 w-40 rounded-full border-4 shadow-sm lg:h-48 lg:w-48"
              />
            ) : (
              <Skeleton className="h-40 w-40 lg:h-48 lg:w-48 rounded-full" />
            )}
            <button className="absolute bottom-0 right-0 flex h-8 w-8 -translate-x-2 -translate-y-4 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-200 transition-all duration-200 hover:bg-gray-200">
              <input
                type="file"
                name=""
                id=""
                className="absolute cursor-pointer opacity-0"
                onChange={handleImageChange}
              />
              <Camera fill="#1f2937" className="h-7 w-7 text-gray-200" />
            </button>
          </div>
        </FlexColumn>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              triggerConfirmationDialog();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            isLoading={isPending}
            disabled={isPending}
            onClick={() => {
              handleSubmit();
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </Modal>
      <div className="z-[10000]">
        <ConfirmationDialog
          overlayClassName="bg-white/70"
          title="Discard Changes?"
          description="Are you sure that you want to discard your changes?"
          confirmText="Discard"
          triggerChildren={<div ref={confirmationTriggerRef} />}
          handleConfirm={handleCancel}
        />
      </div>
    </>
  );
};

export default AvatarChange;
