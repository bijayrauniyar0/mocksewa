import React from "react";

import BookmarksComponent from "@/components/Bookmarks";
import ProtectedLayout from "@/components/common/Wrappers/AuthenticatedRoute";

export const metadata = {
  title: "My Bookmarks",
  description:
    "View and manage your bookmarked mock tests. Quickly access your saved tests for efficient study sessions.",
};

const BookMarksPage = () => {
  return (
    <ProtectedLayout>
      <BookmarksComponent />
    </ProtectedLayout>
  );
};

export default BookMarksPage;
