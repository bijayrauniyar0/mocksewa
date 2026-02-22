import Suspense from "@/components/common/Suspense";
import ProtectedLayout from "@/components/common/Wrappers/AuthenticatedRoute";
import MCQSection from "@/components/MCQSection";
import { MCQProvider } from "@/components/MCQSection/Context/MCQProvider";

export const metadata = {
  title: "Daily Challenge | MockSewa",
  description: "Test your skills with our daily 10-question challenge.",
};

const DailyChallengePage = () => {
  return (
    <ProtectedLayout>
      <Suspense>
        <MCQProvider isDailyChallenge={true}>
          <MCQSection />
        </MCQProvider>
      </Suspense>
    </ProtectedLayout>
  );
};

export default DailyChallengePage;
