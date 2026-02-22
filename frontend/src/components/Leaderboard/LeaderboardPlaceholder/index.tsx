"use client";
import {
  ArrowRight,
  Award,
  Lock,
  Medal,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";

import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import { Button } from "@/components/ui/button";

export default function LeaderboardPlaceholder() {
  const benefits = [
    {
      icon: <Users size={20} />,
      title: "Compare with Peers",
      colorClass: "text-blue-500 bg-blue-50",
    },
    {
      icon: <Target size={20} />,
      title: "Set Targets",
      colorClass: "text-green-500 bg-green-50",
    },
    {
      icon: <TrendingUp size={20} />,
      title: "Track Improvement",
      colorClass: "text-red-500 bg-red-50",
    },
    {
      icon: <Award size={20} />,
      title: "Earn Recognition",
      colorClass: "text-amber-500 bg-amber-50",
    },
  ];

  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-5rem)] overflow-hidden">
      <FlexColumn className="items-center justify-center p-4 w-full max-w-3xl mx-auto">
        <FlexRow className="items-center bg-amber-100 rounded-full p-4 justify-center mb-3 w-fit">
          <Trophy size={44} className="text-yellow-500" />
        </FlexRow>

        <FlexRow className="gap-1.5 items-center pb-1">
          <h2 className="text-lg font-bold text-gray-800">
            Leaderboard Locked
          </h2>
          <Lock size={18} className="text-gray-600" />
        </FlexRow>
        <p className="text-gray-600 mb-4 text-center text-sm max-w-xs">
          Participate in a test to see how you rank!
        </p>

        {/* Improved Podium Visualization - Adjusted colors for better contrast */}
        <div className="flex items-end justify-center mb-4 w-full max-w-xs">
          <div className="flex flex-col items-center mx-1">
            <div className="w-12 h-10 flex items-center justify-center">
              <Medal className="text-blue-400" size={18} />
            </div>
            <div className="w-14 h-10 bg-gradient-to-t from-blue-100 to-blue-50 rounded-t-md flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-blue-300 opacity-30"></div>
              <span className="text-blue-700 font-bold text-xs">2nd</span>
            </div>
          </div>

          <div className="flex flex-col items-center mx-1">
            <div className="w-12 h-10 flex items-center justify-center">
              <Trophy className="text-yellow-500" size={22} />
            </div>
            <div className="w-16 h-16 bg-gradient-to-t from-yellow-200 to-yellow-100 rounded-t-md flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-400 opacity-30"></div>
              <span className="text-yellow-700 font-bold text-sm">1st</span>
            </div>
          </div>

          <div className="flex flex-col items-center mx-1">
            <div className="w-12 h-10 flex items-center justify-center">
              <Medal className="text-orange-600" size={18} />
            </div>
            <div className="w-14 h-8 bg-gradient-to-t from-orange-200 to-orange-100 rounded-t-md flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-orange-400 opacity-30"></div>
              <span className="text-orange-700 font-bold text-xs">3rd</span>
            </div>
          </div>
        </div>

        {/* Benefits of participating */}
        <div className="grid grid-cols-2 gap-2 mb-4 w-full">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center p-2 bg-white rounded-lg border border-gray-100 shadow-sm"
            >
              <div
                className={`mr-2 flex-shrink-0 p-1.5 rounded-full ${benefit.colorClass}`}
              >
                {benefit.icon}
              </div>
              <h3 className="font-medium text-gray-800 text-sm">
                {benefit.title}
              </h3>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Button variant="primary" className="group px-4 py-1 text-sm">
          View Tests
          <ArrowRight
            size={16}
            className="ml-1.5 transition-all duration-200 group-hover:transform group-hover:translate-x-1"
          />
        </Button>
      </FlexColumn>
    </div>
  );
}
