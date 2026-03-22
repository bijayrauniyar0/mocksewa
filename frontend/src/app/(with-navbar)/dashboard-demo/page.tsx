import Dashboard from "@/components/Dashboard";
import BindContentContainer from "@/components/common/BindContentContainer";

export const metadata = {
  title: "Dashboard Demo - MockSewa",
  description: "Dashboard preview with sample data",
};

export default function DashboardDemoPage() {
  return (
    <BindContentContainer className="py-8">
      <Dashboard />
    </BindContentContainer>
  );
}
