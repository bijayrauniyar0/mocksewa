import { Book, ChevronRight, Clock, Heart } from "lucide-react";
import Link from "next/link";

import { BookmarksType } from "@/api/Bookmarks";
import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import { Button } from "@/components/ui/button";

const BookmarkBox = ({
  title,
  time_limit,
  mock_test_id,
  question_count,
}: BookmarksType) => {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-primary-100 bg-gradient-to-br from-white to-primary-50 shadow-md transition-all duration-300 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-100/40">
      <Link href={`/mock-tests/${mock_test_id}`}>
        <FlexColumn className="items-start gap-4 px-6 py-5">
          {/* Header with bookmark icon */}
          <FlexRow className="w-full items-center justify-between">
            <FlexRow className="items-center gap-2">
              <div className="rounded-lg bg-primary-100 p-2">
                <Book size={16} className="text-primary-700" />
              </div>
              <span className="text-xs font-medium capitalize text-primary-700">
                Mock Test
              </span>
            </FlexRow>
            <div className="rounded-full bg-primary-200 p-2">
              <Heart size={14} className="text-primary-600 fill-primary-600" />
            </div>
          </FlexRow>

          {/* Title */}
          <p className="text-md font-semibold text-gray-700 transition-colors duration-200 group-hover:text-primary-600 md:text-base line-clamp-2">
            {title}
          </p>

          {/* Bookmark specific info */}
          <FlexRow className="items-center justify-between w-full">
            <FlexRow className="items-center">
              <Heart
                size={14}
                className="mr-2 text-primary-500 fill-primary-500"
              />
              <p className="text-xs text-primary-600 font-medium">
                Bookmarked Test
              </p>
            </FlexRow>
            <FlexRow className="items-center">
              <Clock size={14} className="mr-1 text-gray-500" />
              <p className="text-xs text-gray-600 font-medium">
                {`${time_limit} mins`}
              </p>
            </FlexRow>
          </FlexRow>

          {/* Action Button */}
          <FlexRow className="w-full items-center justify-between border-t border-primary-100 pt-4">
            <p className="text-xs text-gray-500">Saved for later</p>
            <Link
              href={`/mcq/${mock_test_id}?question_count=${
                question_count || 10
              }`}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="inline-flex items-center font-medium border-primary-200 text-primary-700 hover:bg-primary-50 hover:border-primary-300"
              >
                Take Test
                <ChevronRight
                  size={14}
                  className="ml-1 transition group-hover:translate-x-1"
                />
              </Button>
            </Link>
          </FlexRow>
        </FlexColumn>
      </Link>
    </div>
  );
};

export default BookmarkBox;
