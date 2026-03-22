"use client";

import {
  ArrowRight,
  Award,
  BookOpen,
  Clock,
  Flame,
  Lightbulb,
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
  // Mock data
  const userName = "Priya Sharma";
  const dailyChallenge = {
    title: "English Grammar - Sentence Correction",
    description: "Test your skills with 5 tricky grammar questions",
    difficulty: "Medium",
    questions: 5,
    timeLimit: 10,
    category: "English",
    reward: 50,
  };

  const stats = [
    {
      label: "Overall Accuracy",
      value: "76%",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      label: "Consecutive Days",
      value: "8 days",
      icon: <Flame className="w-5 h-5" />,
    },
    {
      label: "Practice Tests",
      value: "47",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      label: "Total Score",
      value: "3,580",
      icon: <Award className="w-5 h-5" />,
    },
  ];

  const recentAttempts = [
    {
      id: 1,
      subject: "Mathematics",
      tests: "Algebra & Geometry",
      date: "Today",
      accuracy: 82,
      questions: 30,
    },
    {
      id: 2,
      subject: "Science",
      tests: "Physics - Motion",
      date: "Yesterday",
      accuracy: 75,
      questions: 25,
    },
    {
      id: 3,
      subject: "English",
      tests: "Reading Comprehension",
      date: "2 days ago",
      accuracy: 88,
      questions: 20,
    },
  ];

  const subjectProgress = [
    {
      subject: "Mathematics",
      completed: 18,
      total: 30,
      accuracy: 78,
      level: "Intermediate",
    },
    {
      subject: "English",
      completed: 12,
      total: 20,
      accuracy: 84,
      level: "Advanced",
    },
    {
      subject: "Science",
      completed: 15,
      total: 25,
      accuracy: 72,
      level: "Beginner",
    },
    {
      subject: "General Knowledge",
      completed: 22,
      total: 35,
      accuracy: 81,
      level: "Intermediate",
    },
  ];

  const topRanked = [
    { rank: 1, name: "Arjun Patel", score: 5240 },
    { rank: 2, name: "Meera Singh", score: 5120 },
    { rank: 3, name: "Vikram Kumar", score: 4890 },
  ];

  const practiceOptions = [
    {
      id: 1,
      title: "Practice Mode",
      description: "Unlimited questions, learn at your pace",
      icon: "📚",
      color: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: 2,
      title: "Ranked Mode",
      description: "Compete with other students, build streaks",
      icon: "🏆",
      color: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      id: 3,
      title: "Full Mock Test",
      description: "Real exam simulation with time limit",
      icon: "⏱️",
      color: "bg-orange-50",
      borderColor: "border-orange-200",
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {userName}!
          </h1>
          <p className="mt-2 text-slate-600">
            Continue your practice journey and master MCQs
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-orange-50 border border-orange-200 px-4 py-3">
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
            <span className="text-sm font-semibold">Daily MCQ Challenge</span>
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
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-white/20 p-6">
                <Lightbulb className="h-10 w-10" />
              </div>
              <p className="text-center text-sm font-semibold">
                Maintain your streak to earn bonus points
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
          <h3 className="text-lg font-bold text-slate-900">Choose Your Practice Mode</h3>
          <p className="text-sm text-slate-600">Select how you want to practice today</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {practiceOptions.map((mode) => (
            <Card
              key={mode.id}
              className={`border-2 p-6 transition-all hover:shadow-md cursor-pointer ${mode.color} ${mode.borderColor}`}
            >
              <div className="mb-4 text-3xl">{mode.icon}</div>
              <h4 className="mb-2 font-bold text-slate-900">{mode.title}</h4>
              <p className="mb-4 text-sm text-slate-600">{mode.description}</p>
              <Button variant="outline" className="w-full border-slate-300">
                Start <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Attempts */}
        <Card className="border-0 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Recent Attempts</h3>
              <p className="text-sm text-slate-600">Your latest MCQ practice sessions</p>
            </div>
            <Link
              href="/history"
              className="text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              View History →
            </Link>
          </div>
          <div className="space-y-3">
            {recentAttempts.map((attempt) => (
              <div
                key={attempt.id}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 transition-all hover:border-primary-300 hover:bg-white"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary-600" />
                    <h4 className="font-semibold text-slate-900">{attempt.subject}</h4>
                  </div>
                  <p className="text-sm text-slate-600">{attempt.tests}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-900">{attempt.accuracy}%</p>
                  <p className="text-xs text-slate-500">{attempt.questions} Q • {attempt.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Ranked Leaderboard */}
        <Card className="border-0 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">Top Ranked</h3>
            <p className="text-sm text-slate-600">Best scorers this month</p>
          </div>
          <div className="space-y-4">
            {topRanked.map((player) => (
              <div key={player.rank} className="flex items-center gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-white ${
                  player.rank === 1 ? 'bg-yellow-500' :
                  player.rank === 2 ? 'bg-slate-400' :
                  'bg-orange-500'
                }`}>
                  {player.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {player.name}
                  </p>
                  <p className="text-xs text-slate-500">{player.score} points</p>
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

      {/* Subject Progress */}
      <Card className="border-0 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900">Your Subject Progress</h3>
          <p className="text-sm text-slate-600">Track your mastery across all subjects</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {subjectProgress.map((subject) => (
            <div key={subject.subject} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="font-semibold text-slate-900">{subject.subject}</h4>
                <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                  {subject.level}
                </span>
              </div>
              <div className="mb-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm text-slate-600">Progress</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {subject.completed}/{subject.total}
                  </p>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-300">
                  <div
                    className="h-full rounded-full bg-primary-600 transition-all"
                    style={{ width: `${(subject.completed / subject.total) * 100}%` }}
                  />
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Accuracy: <span className="font-semibold text-slate-900">{subject.accuracy}%</span>
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
