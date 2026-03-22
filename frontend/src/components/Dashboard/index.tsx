"use client";

import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Flame,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  // Mock data
  const userName = "Alex Johnson";
  const challenge = {
    title: "React Hooks Mastery",
    description: "Master advanced React hooks patterns and state management",
    difficulty: "Hard",
    timeLimit: 45,
    questions: 12,
    category: "React",
    reward: 150,
  };
  const participated = false;

  const stats = [
    {
      label: "Accuracy Rate",
      value: "87%",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      label: "Current Streak",
      value: "12 days",
      icon: <Flame className="w-5 h-5" />,
    },
    {
      label: "Tests Completed",
      value: "34",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      label: "Points Earned",
      value: "2,840",
      icon: <Award className="w-5 h-5" />,
    },
  ];

  const recentTests = [
    {
      id: 1,
      title: "Full Stack JavaScript",
      date: "2 days ago",
      accuracy: 82,
      questions: 50,
      duration: 90,
    },
    {
      id: 2,
      title: "React Advanced Patterns",
      date: "5 days ago",
      accuracy: 79,
      questions: 40,
      duration: 75,
    },
    {
      id: 3,
      title: "Database Design",
      date: "1 week ago",
      accuracy: 85,
      questions: 35,
      duration: 60,
    },
    {
      id: 4,
      title: "TypeScript Fundamentals",
      date: "1 week ago",
      accuracy: 88,
      questions: 30,
      duration: 50,
    },
  ];

  const topPerformers = [
    { rank: 1, name: "Sarah Chen", points: 4850, badge: "🏆" },
    { rank: 2, name: "Mike Davis", points: 4620, badge: "🥈" },
    { rank: 3, name: "Emma Wilson", points: 4390, badge: "🥉" },
    { rank: 4, name: "Alex Johnson", points: 4180, badge: "⭐" },
    { rank: 5, name: "Rachel Kim", points: 4050, badge: "" },
  ];

  const skillBreakdown = [
    { skill: "JavaScript", progress: 87, level: "Advanced" },
    { skill: "React", progress: 92, level: "Advanced" },
    { skill: "TypeScript", progress: 75, level: "Intermediate" },
    { skill: "Database", progress: 68, level: "Intermediate" },
  ];

  const upcomingTests = [
    {
      id: 1,
      title: "Microservices Architecture",
      date: "Tomorrow",
      duration: 120,
    },
    { id: 2, title: "System Design Interview", date: "Mar 25", duration: 180 },
    { id: 3, title: "API Security", date: "Mar 28", duration: 90 },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {userName}
          </h1>
          <p className="mt-1 text-slate-600">
            Keep your streak alive and level up your skills
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <span className="font-semibold text-slate-900">12 Day Streak</span>
        </div>
      </div>

      {/* Daily Challenge Banner */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-r from-primary-600 to-primary-700 p-8 text-white shadow-lg">
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/5" />
        <div className="relative z-10">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold">Daily Challenge</span>
              </div>
              <h2 className="mb-3 text-4xl font-bold">{challenge.title}</h2>
              <p className="mb-4 text-primary-100">{challenge.description}</p>
              <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div>
                  <p className="text-xs text-primary-100">Difficulty</p>
                  <p className="font-semibold">{challenge.difficulty}</p>
                </div>
                <div>
                  <p className="text-xs text-primary-100">Time</p>
                  <p className="font-semibold">{challenge.timeLimit} min</p>
                </div>
                <div>
                  <p className="text-xs text-primary-100">Questions</p>
                  <p className="font-semibold">{challenge.questions}</p>
                </div>
                <div>
                  <p className="text-xs text-primary-100">Reward</p>
                  <p className="font-semibold">+{challenge.reward} pts</p>
                </div>
              </div>
              <Link href="/daily-challenge">
                <Button className="group bg-white text-primary-700 hover:bg-slate-100">
                  <Zap className="mr-2 h-4 w-4" />
                  Start Challenge
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            <div className="hidden rounded-lg bg-white/10 p-8 md:flex md:items-center md:justify-center">
              <div className="text-center">
                <div className="mb-4 inline-flex items-center justify-center rounded-full bg-white/20 p-6">
                  <Zap className="h-12 w-12" />
                </div>
                <p className="text-sm text-primary-100">
                  Complete daily challenges to boost your rating
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-0 bg-slate-50 p-6 transition-all hover:bg-slate-100 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                <p className="mt-3 text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>
              <div className="rounded-lg bg-primary-100 p-3 text-primary-600">
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Tests */}
        <Card className="border-0 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Recent Tests</h3>
            <Link
              href="/analytics"
              className="text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {recentTests.map((test) => (
              <div
                key={test.id}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 transition-all hover:border-primary-300 hover:bg-slate-50"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900">{test.title}</h4>
                  <p className="text-sm text-slate-500">
                    {test.questions} questions • {test.duration} min
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-slate-900">
                    {test.accuracy}%
                  </p>
                  <p className="text-xs text-slate-500">{test.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Leaderboard */}
        <Card className="border-0 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Top Performers</h3>
            <Link
              href="/leaderboard"
              className="text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              View →
            </Link>
          </div>
          <div className="space-y-3">
            {topPerformers.slice(0, 5).map((performer) => (
              <div key={performer.rank} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-700">
                  {performer.badge || performer.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {performer.name}
                  </p>
                  <p className="text-xs text-slate-500">{performer.points} pts</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/leaderboard">
            <Button
              variant="outline"
              className="mt-6 w-full border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              See Full Leaderboard
            </Button>
          </Link>
        </Card>
      </div>

      {/* Skills & Progress */}
      <Card className="border-0 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900">Your Skills</h3>
          <p className="text-sm text-slate-600">Track your progress across different topics</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {skillBreakdown.map((skill) => (
            <div key={skill.skill}>
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-semibold text-slate-900">{skill.skill}</h4>
                <span className="text-xs font-medium text-primary-600">
                  {skill.level}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-primary-600 transition-all"
                  style={{ width: `${skill.progress}%` }}
                />
              </div>
              <p className="mt-1 text-sm text-slate-600">{skill.progress}% complete</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Upcoming Tests */}
      <Card className="border-0 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900">Upcoming Tests</h3>
          <p className="text-sm text-slate-600">
            Scheduled tests you can take to improve your skills
          </p>
        </div>
        <div className="space-y-3">
          {upcomingTests.map((test) => (
            <div
              key={test.id}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary-100 p-3 text-primary-600">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{test.title}</h4>
                  <p className="text-sm text-slate-500">{test.duration} minutes</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-900">{test.date}</p>
                <Button
                  variant="outline"
                  className="mt-2 border-primary-300 text-primary-600 hover:bg-primary-50"
                  size="sm"
                >
                  Schedule
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
