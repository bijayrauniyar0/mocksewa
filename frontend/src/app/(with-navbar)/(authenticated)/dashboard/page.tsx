export const revalidate = 1200;
import Dashboard from "@/components/Dashboard";
import BindContentContainer from "@/components/common/BindContentContainer";

export const metadata = {
  title: "Dashboard - MockSewa",
  description: "User dashboard with daily challenges and performance tracking",
};

export default function DashboardPage() {
  return (
    <BindContentContainer className="py-8">
      <Dashboard />
    </BindContentContainer>
  );
}
