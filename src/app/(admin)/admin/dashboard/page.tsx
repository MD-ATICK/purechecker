import { Suspense } from "react";
import Loading from "../loading";
import AnalysisChart from "./AnalysisChart";
import HeaderStats from "./HeaderStats";
import HeaderStatsSkeleton from "./HeaderStatsSkeleton";

export default function page() {
  return (
    <div className=" p-2 md:p-8">
      <Suspense fallback={<HeaderStatsSkeleton type="ADMIN" />}>
        <HeaderStats />
      </Suspense>
      <Suspense fallback={<Loading className=" mt-4" />}>
        <AnalysisChart />
      </Suspense>
    </div>
  )
}
