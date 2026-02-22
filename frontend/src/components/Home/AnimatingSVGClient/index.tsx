"use client";
import dynamic from "next/dynamic";
import React from "react";
const AnimatingSVG = dynamic(() => import("./AnimatingSVG"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[16rem] md:h-[17rem] lg:h-[24.15rem] w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
    </div>
  ),
});
const AnimatingSVGClient = () => {
  return <AnimatingSVG />;
};

export default AnimatingSVGClient;
