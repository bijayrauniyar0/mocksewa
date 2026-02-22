import { Bell } from "lucide-react";
import React from "react";

const NoNotificationsAvailable = () => {
  return (
    <div className="flex flex-col items-center justify-center relative py-12">
      {/* Background decorative circles */}
      <div className="absolute top-8 left-12 w-16 h-16 bg-purple-100 rounded-full opacity-60" />
      <div className="absolute top-16 right-16 w-12 h-12 bg-blue-100 rounded-full opacity-40" />
      <div className="absolute bottom-20 left-8 w-20 h-20 bg-purple-50 rounded-full opacity-80" />

      <div className="absolute top-12 right-24 w-2 h-2 bg-orange-300 rounded-full" />
      <div className="absolute top-20 left-20 w-1.5 h-1.5 bg-orange-400 rounded-full" />
      <div className="absolute bottom-16 right-12 w-2 h-2 bg-green-300 rounded-full"></div>
      <div className="absolute bottom-24 left-16 w-1.5 h-1.5 bg-green-400 rounded-full" />
      <div className="absolute top-1/3 right-8 w-1 h-1 bg-primary-400 rounded-full" />
      <div className="absolute bottom-1/3 left-6 w-1 h-1 bg-blue-400 rounded-full" />

      {/* Main icon container */}
      <div className="relative mb-6 z-10">
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="relative">
            {/* Bell icon with gradient */}
            <div className="bg-gradient-to-br from-blue-400 to-primary-500 p-4 rounded-xl">
              <Bell className="w-12 h-12 text-white" />
            </div>
            {/* Orange notification dot */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full border-2 border-white"></div>
          </div>
        </div>
      </div>

      {/* Text content */}
      <h2 className="text-base md:text-xl z-10 font-bold text-gray-600 mb-2 text-center">
        No Notifications Right Now!
      </h2>

      <p className="text-gray-500 text-sm text-center">
        You&apos;re up-to-date !!
      </p>
    </div>
  );
};

export default NoNotificationsAvailable;
