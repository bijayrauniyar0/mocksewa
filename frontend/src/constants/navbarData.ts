import { BarChart3, Home, Info, TestTube, Trophy } from "lucide-react";

export interface IChildLinkData {
  id: number;
  name: string;
  icon: string;
  shortDescription: string;
  link: string;
}

export interface INavbarLinkData {
  id: number;
  name: string;
  link: string;
  icon?: any; // Changed from string to any to support React components
  children?: IChildLinkData[];
}

// Navbar for not logged in users
export const publicNavbarData = [
  { id: 1, name: "Exams", link: "/mock-tests", icon: TestTube },
  { id: 2, name: "About", link: "/about", icon: Info },
];

// Navbar for logged in users
export const authenticatedNavbarData = [
  { id: 1, name: "Dashboard", link: "/dashboard", icon: Home },
  { id: 2, name: "Exams", link: "/mock-tests", icon: TestTube }, // Keep existing functionality
  { id: 3, name: "Analytics", link: "/analytics", icon: BarChart3 },
  { id: 4, name: "Leaderboard", link: "/leaderboard", icon: Trophy },
];

// Legacy export for backward compatibility - will be removed
export const navbarData = authenticatedNavbarData;
