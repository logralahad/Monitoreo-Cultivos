import { CircleLoading } from "../components";
import { Suspense } from "react";

const MatxSuspense = ({ children }) => {
  return <Suspense fallback={<CircleLoading />}>{children}</Suspense>;
};

export default MatxSuspense;
