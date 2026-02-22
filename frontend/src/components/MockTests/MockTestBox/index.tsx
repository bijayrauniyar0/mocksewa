import { format } from "date-fns";
import { Book, ChevronRight, Users } from "lucide-react";
import Link from "next/link";

import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import { Button } from "@/components/ui/button";
import { TestsType } from "@/types/mockTests";

import BookMark from "./BookMark";

function getDiffHoursDays(date: Date) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return { diffHours, diffDays };
}

export function formatLastAccessed(dateString?: string) {
  if (!dateString) return "Never Accessed"; // handle null/undefined
  const date = new Date(dateString);
  const { diffHours, diffDays } = getDiffHoursDays(date);

  if (diffDays < 1) {
    return `Active ${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  } else if (diffDays < 3) {
    return `Active ${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  } else if (diffDays < 7) {
    return `Last accessed ${diffDays} days ago`;
  } else {
    return `Last accessed on ${format(new Date(dateString), "MMM dd, yyyy ")}`; // full date
  }
}

const TestBox = ({
  id,
  title,
  students_count,
  bookmark,
  last_accessed,
}: TestsType) => {
  const { diffHours: lastAccessedHours } = getDiffHoursDays(
    new Date(last_accessed || "")
  );
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:border-primary-200 hover:shadow-lg">
      <Link href={`/mock-tests/${id}`}>
        <FlexColumn className="items-start gap-4 px-6 py-5">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary-50 p-2">
              <Book size={16} className="text-primary-700" />
            </div>
            <span className="text-xs font-medium capitalize text-primary-700">
              Mock Test
            </span>
          </div>

          <p className="text-md font-semibold text-gray-700 transition-colors duration-200 group-hover:text-primary-600 md:text-base">
            {title}
          </p>

          <div className="flex items-center">
            <Users size={14} className="mr-1 text-gray-400" />
            <span className="text-xs text-gray-500">
              {students_count} students
            </span>
          </div>

          <div className="flex w-full items-center justify-between border-t border-gray-100 pt-4">
            {/* <Flame size={20} className="text-orange-500" /> */}
            <FlexRow className="gap-1 items-center">
              {lastAccessedHours < 72 && (
                <div className="h-2 w-2 bg-green-600 rounded-full" />
              )}
              <p className="text-sm">{formatLastAccessed(last_accessed)}</p>
            </FlexRow>
            <Button className="inline-flex items-center font-medium">
              View
              <ChevronRight
                size={14}
                className="transition group-hover:translate-x-1"
              />
            </Button>
          </div>
        </FlexColumn>
      </Link>
      <BookMark initialBookmark={bookmark} mockTestId={id} />
    </div>
  );
};

export default TestBox;
