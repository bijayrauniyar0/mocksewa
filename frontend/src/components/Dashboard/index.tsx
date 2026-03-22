"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Flame,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Skeleton from "@/components/ui/Skeleton";
import { getDailyChallenge } from "@/services/ClientSide/academics";

interface QuickStat {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}

const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["daily-challenge-status"],
    queryFn: async () => {
      const res = await getDailyChallenge();
      return res.data;
    },
    retry: false,
  });

  const quickStats: QuickStat[] = [
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: "Accuracy Rate",
      value: "78%",
      color: "bg-gradient-to-br from-blue-50 to-blue-100",
    },
    {
      icon: <Flame className="w-5 h-5" />,
      label: "Current Streak",
      value: "12 days",
      color: "bg-gradient-to-br from-orange-50 to-orange-100",
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      label: "Tests Completed",
      value: "24",
      color: "bg-gradient-to-br from-purple-50 to-purple-100",
    },
    {
      icon: <Target className="w-5 h-5" />,
      label: "Questions Solved",
      value: "342",
      color: "bg-gradient-to-br from-green-50 to-green-100",
    },
  ];

  if (isLoading) {
    return <Skeleton className="w-full h-96" />;
  }

  const { challenge, participated } = data || {};

  return (
    <div className="w-full space-y-8">
      {/* Daily Challenge Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 p-8 text-white shadow-xl">
        {/* Decorative background elements */}
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-primary-400/20 blur-3xl" />
        <div className="absolute right-1/4 top-1/2 h-32 w-32 rounded-full bg-white/5 blur-2xl" />

        <div className="relative z-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Left Content */}
            <div className="flex-1">
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded-full bg-yellow-300/20 p-2 backdrop-blur-sm">
                  <Sparkles className="h-5 w-5 text-yellow-300" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-wider text-primary-100">
                  Daily Challenge
                </span>
              </div>

              {challenge ? (
                <>
                  <h2 className="mb-2 text-3xl font-bold leading-tight md:text-4xl">
                    {challenge.title}
                  </h2>
                  <p className="mb-4 text-base text-primary-100">
                    10 questions • 10 minutes • Based on your last activity
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">
                      <span className="text-sm font-medium">Difficulty:</span>
                      <span className="font-semibold">Medium</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">
                      <span className="text-sm font-medium">Category:</span>
                      <span className="font-semibold">Mixed Topics</span>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-primary-100">No challenge available today</p>
              )}
            </div>

            {/* Right Action */}
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              {participated ? (
                <div className="flex items-center gap-3 rounded-xl bg-white/20 px-4 py-3 backdrop-blur-sm">
                  <div className="rounded-full bg-green-400/20 p-2">
                    <CheckCircle2 className="h-5 w-5 text-green-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary-100">
                      Challenge Completed
                    </p>
                    <p className="text-xs text-primary-100/80">
                      Come back tomorrow for a new one
                    </p>
                  </div>
                </div>
              ) : (
                <Link href="/daily-challenge" className="w-full md:w-auto">
                  <Button className="group w-full bg-white text-primary-700 shadow-lg hover:bg-primary-50 md:w-auto">
                    Start Challenge
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat, index) => (
          <Card
            key={index}
            className={`${stat.color} border-0 p-6 shadow-md transition-transform hover:shadow-lg hover:scale-105`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className="rounded-lg bg-white/50 p-2.5 text-primary-700">
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="border border-gray-200 p-6 shadow-md lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Recent Tests</h3>
            <Link
              href="/analytics"
              className="text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-4 transition-colors hover:bg-gray-100"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    Mock Test #{item}
                  </p>
                  <p className="text-sm text-gray-500">
                    {10 + item * 3} questions • Completed 2 days ago
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary-600">
                    {75 + item * 2}%
                  </p>
                  <p className="text-xs text-gray-500">Accuracy</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Leaderboard Preview */}
        <Card className="border border-gray-200 p-6 shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Leaderboard</h3>
            <Link
              href="/leaderboard"
              className="text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              View
            </Link>
          </div>

          <div className="space-y-3">
            {[1, 2, 3].map((rank) => (
              <div key={rank} className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-white ${
                    rank === 1
                      ? "bg-yellow-400"
                      : rank === 2
                        ? "bg-gray-400"
                        : "bg-orange-400"
                  }`}
                >
                  {rank}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    User {rank}
                  </p>
                  <p className="text-xs text-gray-500">
                    {1000 - rank * 50} points
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            className="mt-6 w-full border-primary-200 text-primary-600 hover:bg-primary-50"
          >
            See Full Leaderboard
          </Button>
        </Card>
      </div>

      {/* CTA Section */}
      <Card className="border-0 bg-gradient-to-r from-primary-50 to-purple-50 p-8 shadow-md">
        <div className="flex flex-col items-center text-center">
          <h3 className="mb-2 text-2xl font-bold text-gray-900">
            Ready to Improve Your Score?
          </h3>
          <p className="mb-6 text-gray-600">
            Explore our comprehensive test collection and ace your exams
          </p>
          <Link href="/mock-tests">
            <Button className="bg-primary-600 hover:bg-primary-700">
              Browse Tests
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
