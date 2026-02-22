export const revalidate = 1200;

import HomeComponent from "@/components/Home";

export const metadata = {
  title: "MockSewa - Landing Page",
  description: "Landing page for MockSewa",
};

export default function LandingPage() {
  return <HomeComponent />;
}
