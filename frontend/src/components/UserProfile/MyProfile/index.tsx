"use client";
import React from "react";
import useAuthStore from "@/store/auth";
import Avatar from "@/components/common/Avatar";
import { getInitialsFromName } from "@/lib";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  Pencil,
  Shield,
  BookOpen,
  User as UserIcon,
} from "lucide-react";
import { useCommonStore } from "@/store/common";
import BindContentContainer from "@/components/common/BindContentContainer";
import useTestTakenByUserList from "@/api/MockTests";
import Skeleton from "@/components/ui/Skeleton";
import Link from "next/link";

const MyProfile = () => {
  const userProfile = useAuthStore((state) => state.userProfile);
  const toggleModal = useCommonStore((state) => state.toggleModal);

  const { data: testTakenByUserList, isLoading: isTestTakenLoading } =
    useTestTakenByUserList();

  if (!userProfile.id) return null;

  return (
    <BindContentContainer className="py-10 max-xl:px-4 max-w-4xl mx-auto space-y-12">
      {/* Profile Header */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-10">
        <div className="relative group self-center md:self-start">
          <Avatar
            src={userProfile.avatar}
            alt={userProfile.name || "User"}
            fallback={getInitialsFromName(userProfile.name || "")}
            className="w-32 h-32 md:w-44 md:h-44 text-5xl ring-4 ring-primary-50"
          />
        </div>

        <div className="flex-1 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
            <div className="text-center md:text-left space-y-1">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                {userProfile.name}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                  <Mail className="w-4 h-4 text-primary-500" />
                  {userProfile.email}
                </div>
                {userProfile.number && (
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm border-l border-slate-200 pl-4">
                    <Phone className="w-4 h-4 text-primary-500" />
                    {userProfile.number}
                  </div>
                )}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="rounded-full px-6 border-slate-200 hover:bg-slate-50 transition-colors shadow-none mt-2"
              onClick={() => toggleModal("edit-profile")}
            >
              <Pencil className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-100/30 rounded-full -translate-y-12 translate-x-12 blur-2xl group-hover:bg-primary-200/40 transition-colors" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
              <UserIcon className="w-3 h-3" />
              About me
            </h3>
            <p className="text-slate-700 leading-relaxed italic relative z-10">
              {userProfile.bio ||
                "No bio added yet. Tell us about yourself and your preparation journey!"}
            </p>
          </div>
        </div>
      </section>

      <div className="space-y-10 pt-6 border-t border-slate-100">
        {/* Personal Info */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-1 hover:border-primary-200 transition-colors cursor-default">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Full Name
              </p>
              <p className="text-slate-700 font-semibold">{userProfile.name}</p>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-1 hover:border-primary-200 transition-colors cursor-default">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Email Address
              </p>
              <p className="text-slate-700 font-semibold truncate">
                {userProfile.email}
              </p>
            </div>
            {userProfile.number && (
              <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-1 hover:border-primary-200 transition-colors cursor-default">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Phone Number
                </p>
                <p className="text-slate-700 font-semibold">
                  {userProfile.number}
                </p>
              </div>
            )}
            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-1 hover:border-primary-200 transition-colors cursor-default">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Account Status
              </p>
              <p className="text-primary-600 font-bold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                Verified User
              </p>
            </div>
          </div>
        </section>

        {/* Current Preparations */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary-500" />
            Current Preparations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {isTestTakenLoading ? (
              [1, 2].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-2xl" />
              ))
            ) : testTakenByUserList && testTakenByUserList.length > 0 ? (
              testTakenByUserList.slice(0, 4).map((test) => (
                <Link
                  href={`/mock-tests`}
                  key={test.id}
                  className="p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-primary-200 transition-all group"
                >
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">
                    Mock test
                  </p>
                  <p className="text-slate-700 font-bold group-hover:text-primary-600 transition-colors">
                    {test.label || "Examination"}
                  </p>
                </Link>
              ))
            ) : (
              <div className="col-span-full p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-slate-500 text-sm">
                  No exam preparations started yet.
                </p>
                <Link
                  href="/mock-tests"
                  className="text-primary-600 text-sm font-bold hover:underline mt-2 inline-block"
                >
                  Explore Exams
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </BindContentContainer>
  );
};

export default MyProfile;
