import { AlertTriangle, BarChart3, Target, TrendingUp } from "lucide-react";
import Link from "next/link";
import React from "react";

import { FlexColumn } from "@/components/common/Layouts";
import { Button } from "@/components/ui/button";

const NoDataAnalytics = () => {
  const features = [
    {
      icon: <BarChart3 size={20} />,
      title: "Track Progress",
      colorClass: "text-green-500 bg-green-50",
    },
    {
      icon: <Target size={20} />,
      title: "Identify Strengths",
      colorClass: "text-blue-500 bg-blue-50",
    },
    {
      icon: <AlertTriangle size={20} />,
      title: "Find Weaknesses",
      colorClass: "text-amber-500 bg-amber-50",
    },
    {
      icon: <TrendingUp size={20} />,
      title: "Performance Trends",
      colorClass: "text-red-500 bg-red-50",
    },
  ];

  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-5rem)] overflow-hidden">
      <FlexColumn className="items-center justify-center py-8 px-4 w-full max-w-4xl mx-auto">
        <div className="mb-4 text-primary-600">
          <svg
            width="100"
            height="100"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M95 25H25C22.2386 25 20 27.2386 20 30V90C20 92.7614 22.2386 95 25 95H95C97.7614 95 100 92.7614 100 90V30C100 27.2386 97.7614 25 95 25Z"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M35 45H45V75H35V45Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M55 55H65V75H55V55Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M75 35H85V75H75V35Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M30 85L90 85"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">
          No Performance Data Available
        </h2>
        <p className="text-gray-600 text-center mb-6 max-w-md">
          Take part in a test to start tracking your progress. Your performance
          metrics and trends will appear here.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6 w-full">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center p-2 bg-white rounded-lg border border-gray-100 shadow-sm"
            >
              <div
                className={`mr-3 flex-shrink-0 p-1.5 rounded-full ${feature.colorClass}`}
              >
                {feature.icon}
              </div>
              <h3 className="font-medium text-gray-800 text-sm">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>

        <Link href="/mock-tests">
          <Button variant="primary" className="font-medium text-sm px-4 py-1">
            Take a Test Now
          </Button>
        </Link>
      </FlexColumn>
    </div>
  );
};

export default NoDataAnalytics;
