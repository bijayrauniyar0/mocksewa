import React from "react";

import BindContentContainer from "@/components/common/BindContentContainer";
import { Grid } from "@/components/common/Layouts";
import Skeleton from "@/components/ui/Skeleton";

const MockTestsSkeleton = () => {
  return (
    <BindContentContainer>
      <Grid className="w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton className="flex-1 h-48 md:h-52 w-full" key={index} />
        ))}
      </Grid>
    </BindContentContainer>
  );
};

export default MockTestsSkeleton;
