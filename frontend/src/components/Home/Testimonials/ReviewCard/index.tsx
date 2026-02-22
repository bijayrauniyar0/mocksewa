// components/TestimonialCard.tsx
import Link from "next/link";
import React from "react";

import Avatar from "@/components/common/Avatar";
import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import Rating from "@/components/common/Rating";
import { getInitialsFromName } from "@/lib";
import { ReviewType } from "@/types/home";

const ReviewCard = ({ MockTest, User, rating, review }: ReviewType) => {
  return (
    <FlexColumn className="gap-4 rounded-lg bg-white p-4 shadow-md md:p-8 max-sm:w-[calc(100vw-7rem)] md:shadow-lg md:min-w-[18rem] lg:min-w-[22rem] xl:min-w-[25rem]">
      <FlexRow className="items-center gap-4">
        <Avatar
          src={User.avatar}
          alt={User.name}
          fallback={getInitialsFromName(User.name)}
          className="h-8 w-8 rounded-full md:h-12 md:w-12"
        />
        <div>
          <Link href={`/user-profile/${User.id}`} className="flex-1">
            <p className="text-md font-bold leading-4 md:text-base md:leading-normal">
              {User.name}
            </p>
          </Link>
          <Link href={`mock-tests/${MockTest.id}`} className="flex-1">
            <p className="text-sm text-gray-600 md:text-md">{MockTest.title}</p>
          </Link>
        </div>
      </FlexRow>
      <p className="text-sm text-gray-700 md:text-md">&quot;{review}&quot;</p>
      <Rating value={rating} readonly size="medium" />
    </FlexColumn>
  );
};

export default ReviewCard;
