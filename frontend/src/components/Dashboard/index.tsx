"use client";

import {
  ArrowRight,
  Award,
  BookOpen,
  Flame,
  Play,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  const userName = "Priya Sharma";
  const currentSubject = "English";

  const dailyChallenge = {
    title: "English Grammar - Sentence Correction",
    description: "Test your skills with 5 carefully selected grammar questions",
    difficulty: "Medium",
    questions: 5,
    timeLimit: 10,
    reward: 50,
  };

  const stats = [
    {
      label: "Your Accuracy",
      value: "82%",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      label: "Current Streak",
      value: "8 days",
      icon: <Flame className="w-5 h-5" />,
    },
    {
      label: "Tests Completed",
      value: "23",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      label: "Points Earned",
      value: "2,850",
      icon: <Award className="w-5 h-5" />,
    },
  ];

  const recentSessions = [
    {
      id: 1,
      title: "Sentence Completion",
      date: "Today",
      accuracy: 85,
      questions: 15,
      duration: 12,
    },
    {
      id: 2,
      title: "Reading Comprehension",
      date: "Yesterday",
      accuracy: 80,
      questions: 10,
      duration: 18,
    },
    {
      id: 3,
      title: "Grammar Rules",
      date: "2 days ago",
      accuracy: 88,
      questions: 20,
      duration: 20,
    },
    {
      id: 4,
      title: "Vocabulary & Usage",
      date: "3 days ago",
      accuracy: 78,
      questions: 12,
      duration: 14,
    },
  ];

  const topScorers = [
    { rank: 1, name: "Arjun Patel", score: 5240 },
    { rank: 2, name: "Meera Singh", score: 5120 },
    { rank: 3, name: "Vikram Kumar", score: 4890 },
  ];

  const practiceCategories = [
    {
      title: "Practice Mode",
      description: "Unlimited questions at your pace",
    },
    {
      title: "Ranked Mode",
      description: "Compete & build streaks",
    },
    {
      title: "Mock Test",
      description: "Real exam simulation",
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {userName}
          </h1>
          <p className="mt-2 text-slate-600">
            Master {currentSubject} with focused practice
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-slate-100 px-4 py-3 w-fit">
          <Flame className="h-5 w-5 text-orange-500" />
          <div>
            <p className="text-xs text-slate-600">Current Streak</p>
            <p className="font-bold text-slate-900">8 days</p>
          </div>
        </div>
      </div>

      {/* Daily Challenge Banner */}
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-8 text-white shadow-lg">
        <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
        
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">Daily Challenge</span>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <h2 className="mb-2 text-4xl font-bold">{dailyChallenge.title}</h2>
              <p className="mb-6 text-primary-100">{dailyChallenge.description}</p>
              
              <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <p className="text-xs font-semibold text-primary-100 uppercase">Difficulty</p>
                  <p className="mt-1 font-bold">{dailyChallenge.difficulty}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary-100 uppercase">Questions</p>
                  <p className="mt-1 font-bold">{dailyChallenge.questions}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary-100 uppercase">Time</p>
                  <p className="mt-1 font-bold">{dailyChallenge.timeLimit} min</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary-100 uppercase">Reward</p>
                  <p className="mt-1 font-bold">+{dailyChallenge.reward} pts</p>
                </div>
              </div>
              
              <Link href="/daily-challenge">
                <Button className="group bg-white text-primary-700 hover:bg-slate-100">
                  <Play className="mr-2 h-4 w-4" />
                  Start Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            
            <div className="hidden rounded-2xl bg-white/10 p-6 backdrop-blur md:flex md:flex-col md:items-center md:justify-center">
              <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-white/20 p-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <p className="text-center text-sm font-semibold">
                Consistent practice builds mastery
              </p>
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

      {/* Practice Modes */}
      <div>
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900">How to Practice</h3>
          <p className="text-sm text-slate-600">Choose your preferred practice method</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {practiceCategories.map((mode, idx) => (
            <Card
              key={idx}
              className="border-2 border-slate-200 p-6 transition-all hover:border-primary-400 hover:shadow-md cursor-pointer hover:bg-slate-50"
            >
              <h4 className="mb-2 font-bold text-slate-900">{mode.title}</h4>
              <p className="mb-4 text-sm text-slate-600">{mode.description}</p>
              <Button variant="outline" className="w-full border-slate-300 text-slate-700">
                Start <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Practice Sessions */}
        <Card className="border-0 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Recent Sessions</h3>
              <p className="text-sm text-slate-600">{currentSubject} practice history</p>
            </div>
            <Link
              href="/history"
              className="text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 transition-all hover:border-primary-300 hover:bg-white"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900">{session.title}</h4>
                  <p className="text-sm text-slate-600">{session.questions} questions • {session.duration} minutes</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-900">{session.accuracy}%</p>
                  <p className="text-xs text-slate-500">{session.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Leaderboard */}
        <Card className="border-0 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">Top Scorers</h3>
            <p className="text-sm text-slate-600">{currentSubject} leaderboard</p>
          </div>
          <div className="space-y-4">
            {topScorers.map((scorer) => (
              <div key={scorer.rank} className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full font-bold text-white ${
                  scorer.rank === 1 ? 'bg-yellow-500' :
                  scorer.rank === 2 ? 'bg-slate-400' :
                  'bg-slate-300'
                }`}>
                  {scorer.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {scorer.name}
                  </p>
                  <p className="text-xs text-slate-500">{scorer.score} points</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/leaderboard">
            <Button
              variant="outline"
              className="mt-6 w-full border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              <Users className="mr-2 h-4 w-4" />
              Full Leaderboard
            </Button>
          </Link>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card className="border-0 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900">Your Performance</h3>
          <p className="text-sm text-slate-600">{currentSubject} statistics</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-600 mb-2">Total Questions</p>
            <p className="text-3xl font-bold text-slate-900">127</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-600 mb-2">Correct Answers</p>
            <p className="text-3xl font-bold text-primary-600">104</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-600 mb-2">Time Spent</p>
            <p className="text-3xl font-bold text-slate-900">4h 32m</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-600 mb-2">Rank</p>
            <p className="text-3xl font-bold text-slate-900">#47</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
