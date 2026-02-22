import React, { Suspense as SuspensePrimitive } from "react";

import Spinner from "../Spinner";

interface SuspenseProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const Suspense = ({ children, fallback }: SuspenseProps) => {
  return (
    <SuspensePrimitive fallback={fallback || <Spinner />}>
      {children}
    </SuspensePrimitive>
  );
};

export default Suspense;
