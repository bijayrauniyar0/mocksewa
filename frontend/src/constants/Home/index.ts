/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  BookOpen,
  Briefcase,
  Calculator,
  Clock,
  GraduationCap,
  Laptop2,
  Lightbulb,
  LineChart,
  LucideIcon,
  MessagesSquare,
  Pencil,
  Stethoscope,
  Trophy,
} from "lucide-react";
import { Settings } from "react-slick";

export interface CategoryCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  className?: string;
}
export interface FeatureCardProps extends CategoryCardProps {}
export const Categories: CategoryCardProps[] = [
  {
    Icon: GraduationCap,
    title: "College Entrance Exams",
    description: "Engineering, Medical, Law",
    iconColor: "text-indigo-700",
    bgColor: "bg-indigo-100",
  },
  {
    Icon: Briefcase,
    title: "Government Jobs",
    description: "Civil Services, Banking, Railways",
    iconColor: "text-orange-700",
    bgColor: "bg-orange-100",
  },
  {
    Icon: Laptop2,
    title: "IT Certifications",
    description: "Programming, Networking, Security",
    iconColor: "text-blue-700",
    bgColor: "bg-blue-100",
  },
  {
    Icon: Stethoscope,
    title: "Medical Exams",
    description: "NEET, AIIMS, Medical PG",
    iconColor: "text-rose-700",
    bgColor: "bg-rose-100",
  },
  {
    Icon: Calculator,
    title: "Engineering Exams",
    description: "JEE, GATE, ESE",
    iconColor: "text-teal-700",
    bgColor: "bg-teal-100",
  },
  {
    Icon: BookOpen,
    title: "Entrance Exams",
    description: "CMAT, +2 Entrance, BBA Entrance",
    iconColor: "text-green-700",
    bgColor: "bg-green-100",
  },
];

export const features: FeatureCardProps[] = [
  {
    title: "Realistic Mock Tests",
    description:
      "Experience exam-like conditions with timed tests that mirror the actual format and difficulty level.",
    Icon: Pencil,
    iconColor: "text-purple-700",
    bgColor: "bg-purple-100",
  },
  {
    title: "Detailed Analytics",
    description:
      "Track your progress with comprehensive performance metrics, including test-wise analysis.",
    Icon: LineChart,
    iconColor: "text-blue-700",
    bgColor: "bg-blue-100",
  },
  {
    title: "Competitive Leaderboards",
    description:
      "Compete with peers nationwide and benchmark your performance against top performers.",
    Icon: Trophy,
    iconColor: "text-yellow-700",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Flexible Study Schedule",
    description:
      "Practice anytime, anywhere with 24/7 access to all mock tests and study materials.",
    Icon: Clock,
    iconColor: "text-emerald-700",
    bgColor: "bg-emerald-100",
  },
  {
    title: "Smart Question Bank",
    description:
      "Access thousands of quality MCQs with detailed explanations and solutions.",
    Icon: Lightbulb,
    iconColor: "text-pink-700",
    bgColor: "bg-pink-100",
  },

  {
    title: "Community Support",
    description:
      "Connect with fellow aspirants and experts to discuss questions and clarify doubts.",
    Icon: MessagesSquare,
    iconColor: "text-teal-700",
    bgColor: "bg-teal-100",
  },
];

export const testimonialSliderSettings: Settings = {
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 2000,
  cssEase: "",
  centerMode: true,
  centerPadding: "0",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const platformMetrics = [
  {
    title: "Exam Categories",
    value: "5+",
  },
  {
    title: "Questions",
    value: "5,000+",
  },
  {
    title: "Students",
    value: "200+",
  },
];
