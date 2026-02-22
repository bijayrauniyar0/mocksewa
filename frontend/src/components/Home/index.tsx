import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

import BindContentContainer from "@/components/common/BindContentContainer";
import Footer from "@/components/common/Footer";
import { FlexColumn, FlexRow, Grid } from "@/components/common/Layouts";
import { Button } from "@/components/ui/button";
import { Categories, features, platformMetrics } from "@/constants/Home";
import { getReviews } from "@/services/ServerSide/reviews";

import Suspense from "../common/Suspense";
import AnimatingSVGClient from "./AnimatingSVGClient";
import DailyChallengeWidget from "./DailyChallengeWidget";

const FeatureCard = dynamic(() => import("./FeaturesCard"));
const Section = dynamic(() => import("./Section"));
const CategoryCard = dynamic(() => import("./CategoryCard"));
const Testimonials = dynamic(() => import("./Testimonials"));

const Home = async () => {
  let reviewList = [];
  try {
    const { data } = await getReviews({});
    reviewList = data;
  } catch {
    //
  }
  return (
    <>
      <BindContentContainer className="overflow-hidden max-sm:px-4">
        <FlexColumn className="w-full gap-8 md:gap-10 lg:gap-12">
          <FlexRow className="z-[9] items-center justify-between gap-4 pb-8 max-md:flex-wrap md:gap-8 md:pb-12 lg:pb-16">
            <FlexColumn className="items-start gap-6 md:max-w-[40%] md:gap-8">
              <FlexColumn className="gap-2 md:gap-3">
                <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
                  Ace Your <span className="text-primary-600">Exams</span> with
                  MockSewa
                </h1>
                <p className="text-base text-matt-100 md:text-lg lg:text-xl">
                  Practice with high-quality MCQs, compete on leaderboards, and
                  analyze your performance with detailed metrics.
                </p>
              </FlexColumn>
              <Button className="w-fit shadow-[5px_5px_6px_#65508c]">
                <Link href="/mock-tests">Explore Exams</Link>
              </Button>
            </FlexColumn>

            <AnimatingSVGClient />
          </FlexRow>

          <Suspense>
            <DailyChallengeWidget />
          </Suspense>

          <Grid className="z-[9] mx-auto grid-cols-3 gap-2 text-center max-md:w-full md:w-4/5 md:gap-6 lg:w-1/2 lg:gap-8">
            {platformMetrics.map((metric) => (
              <div key={metric.title}>
                <p className="lg:text-xl2 text-lg font-bold text-primary-600 md:text-xl lg:text-3xl">
                  {metric.value}
                </p>
                <p className="text-sm text-gray-600 md:text-base lg:text-lg">
                  {metric.title}
                </p>
              </div>
            ))}
          </Grid>

          <div className="relative z-[8] overflow-hidden rounded-lg !bg-[rgba(243,236,250,0.7)] px-4 py-8 md:px-16 md:py-16 lg:px-20 lg:py-20 flex flex-col gap-8 md:grid md:grid-cols-3 md:gap-6 sm:gap-4">
            <Suspense>
              {features.map((feature, index) => (
                <FeatureCard
                  {...feature}
                  key={feature.title}
                  className={`${
                    index % 2 === 0 ? "max-md:items-start" : "max-md:items-end"
                  }`}
                />
              ))}
            </Suspense>
          </div>

          <Section
            header="Explore Our Exam Categories"
            description=" MockSewa offers comprehensive preparation for a wide range of competitive exams."
          >
            <Suspense>
              <div className="grid gap-2 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
                {Categories.map((category, index) => (
                  <CategoryCard {...category} key={index} />
                ))}
              </div>
            </Suspense>
            <Button className="mx-auto w-fit" variant={"secondary"}>
              View All Exams
            </Button>
          </Section>
          <Suspense>
            <Testimonials reviews={reviewList} />
          </Suspense>
          <Section
            header="Ready to Elevate Your Exam Preparation?"
            description="Join thousands of successful students who transformed their preparation with MockSewa."
          >
            <Button className="mx-auto w-fit">
              <Link href="/mock-tests">Get Started Now</Link>
            </Button>
          </Section>
        </FlexColumn>
      </BindContentContainer>
      {/* <Suspense fallback={<></>}>
        <BackgroundParticles />
      </Suspense> */}
      <Footer />
    </>
  );
};

export default Home;
