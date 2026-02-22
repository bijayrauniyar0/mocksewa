"use client";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Skeleton from "@/components/ui/Skeleton";
import { getDailyChallenge } from "@/services/ClientSide/academics";

const DailyChallengeWidget = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["daily-challenge-status"],
    queryFn: async () => {
      const res = await getDailyChallenge();
      return res.data;
    },
    retry: false,
  });

  if (isLoading) return <Skeleton className="w-full h-32" />;
  if (error || !data || !data.challenge) return null;

  const { challenge, participated } = data;

  return (
    <Card className="relative overflow-hidden border-none bg-linear-to-br from-primary-600 to-primary-800 p-6 text-white shadow-lg">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-yellow-300" />
            <span className="text-sm font-bold uppercase tracking-wider text-primary-100">
              Daily Challenge
            </span>
          </div>
          <h3 className="text-xl font-bold md:text-2xl">{challenge.title}</h3>
          <p className="text-sm text-primary-100">
            10 questions • 10 minutes • Based on your last activity
          </p>
        </div>

        {participated ? (
          <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
            <CheckCircle2 className="size-5 text-green-300" />
            <span className="font-semibold">
              Today&apos;s challenge completed!
            </span>
          </div>
        ) : (
          <Link href="/daily-challenge">
            <Button className="group bg-white text-primary-700 hover:bg-primary-50">
              Start Challenge
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        )}
      </div>

      {/* Decorative background elements */}
      <div className="absolute -right-8 -top-8 size-32 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -left-8 -bottom-8 size-32 rounded-full bg-primary-400/20 blur-2xl" />
    </Card>
  );
};

export default DailyChallengeWidget;
