"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

import BindContentContainer from "@/components/common/BindContentContainer";
import BreadCrumb from "@/components/common/FormComponent/BreadCrumb";
import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import NoDataAvailable from "@/components/common/NoDataAvailable";
import Searchbar from "@/components/common/SearchBar";
import isEmpty from "@/lib/isEmpty";
import { getAllTestsList } from "@/services/ClientSide/academics";
import { TestsType } from "@/types/mockTests";

import TestBox from "./MockTestBox";

type MockTestsProps = {
  initialData: TestsType[];
};
const MockTests = ({ initialData }: MockTestsProps) => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const { data: tests } = useQuery({
    queryKey: ["mockTests"],
    queryFn: async () => {
      const res = await getAllTestsList();
      return res.data;
    },
    initialData,
  });

  const filteredTests: TestsType[] = useMemo(() => {
    if (!tests) return [];
    return tests.filter(({ title }: TestsType) =>
      title?.toLowerCase()?.includes(searchValue.toLowerCase())
    );
  }, [tests, searchValue]);

  return (
    <BindContentContainer>
      <FlexColumn className="w-full gap-4">
        <FlexRow className="w-full items-center justify-between">
          <BreadCrumb
            onBackClick={() => router.push("/")}
            heading="Mock Tests"
          />
          <Searchbar
            wrapperStyle="!w-[10rem] lg:!w-[15rem]"
            placeholder="Search Tests"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </FlexRow>
        {isEmpty(filteredTests) ? (
          <NoDataAvailable />
        ) : (
          <FlexColumn className="no-scrollbar max-h-[calc(100dvh-9rem)] gap-4 overflow-y-auto pb-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
              {filteredTests?.map((test) => {
                return <TestBox key={test.id} {...test} />;
              })}
            </div>
          </FlexColumn>
        )}
      </FlexColumn>
    </BindContentContainer>
  );
};

export default MockTests;
