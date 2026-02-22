import ProtectedLayout from "@/components/common/Wrappers/AuthenticatedRoute";
import MCQSection from "@/components/MCQSection";
import { MCQProvider } from "@/components/MCQSection/Context/MCQProvider";

export const metadata = {
  title: "MCQ Test | MockSewa",
  description: "Take your MCQ tests seamlessly with MockSewa.",
};
const MCQPage = () => {
  return (
    <ProtectedLayout>
      <MCQProvider>
        <MCQSection />
      </MCQProvider>
    </ProtectedLayout>
  );
};

export default MCQPage;
