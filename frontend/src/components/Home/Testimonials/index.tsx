"use client";
import React from "react";

import Suspense from "@/components/common/Suspense";
import { ReviewType } from "@/types/home";

import Section from "../Section";
import ReviewCard from "./ReviewCard";
import TestimonialSliderWrapper from "./SliderWrapper";

const Testimonials = ({ reviews }: { reviews: ReviewType[] }) => {
  return (
    <div className="z-[9] rounded-lg bg-gradient-to-tl from-primary-50 to-primary-100 px-1 pt-8 shadow-sm">
      <Section
        header="What Our Students Say"
        description="Hear from students who improved their scores and achieved their goals with MockSewa."
      >
        <Suspense>
          <TestimonialSliderWrapper childrenLength={reviews?.length || 0}>
            {reviews?.map((review, i) => (
              <div className="px-2" key={(review.id, i)}>
                <ReviewCard {...review} />
              </div>
            ))}
          </TestimonialSliderWrapper>
        </Suspense>
      </Section>
    </div>
  );
};

export default Testimonials;
