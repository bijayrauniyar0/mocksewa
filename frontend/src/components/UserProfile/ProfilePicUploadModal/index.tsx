import { Camera } from "lucide-react";
import Image from "next/image";
import React from "react";

import { FlexColumn } from "@/components/common/Layouts";
import { Button } from "@/components/ui/button";

const ProfilePicUploadModal = () => {
  return (
    <FlexColumn className="gap-5">
      <Image src="" alt="" className="h-48 w-48 rounded-full" />
      <Button variant="outline">
        <Camera /> Change Image
      </Button>
    </FlexColumn>
  );
};

export default ProfilePicUploadModal;
