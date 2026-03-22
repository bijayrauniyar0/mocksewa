import React from "react";

import Suspense from "@/components/common/Suspense";
import MockTestsComponent from "@/components/MockTests";
import { getAllTestsList } from "@/services/ClientSide/academics";

const MockTestsListPage = async () => {
  const { data } = await getAllTestsList();

  return (
    <Suspense>
      <MockTestsComponent initialData={data} />
    </Suspense>
  );
};

export const metadata = {
  title: "Mock Tests",
  description:
    "Explore a wide range of mock tests to help you prepare effectively and achieve your goals.",
};

export const revalidate = 300;

export default MockTestsListPage;
