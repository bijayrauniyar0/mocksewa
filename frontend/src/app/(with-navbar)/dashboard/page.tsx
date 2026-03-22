export const revalidate = 1200;
import HomeComponent from "@/components/Home";

export const metadata = {
  title: "Dashboard - MockSewa",
  description: "User dashboard",
};

export default function DashboardPage() {
  return <HomeComponent />;
}