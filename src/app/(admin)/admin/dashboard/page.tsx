import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import AnalysisChart from "./AnalysisChart";
import HeaderStats from "./HeaderStats";
import HeaderStatsSkeleton from "./HeaderStatsSkeleton";

export default function page() {
  return (
    <div className=" p-2 md:p-8">
      <Suspense fallback={<HeaderStatsSkeleton type="ADMIN" />}>
        <HeaderStats />
      </Suspense>
      <Suspense fallback={<Skeleton className=' mt-16 w-full aspect-[16/6]' />}>
        <AnalysisChart />
      </Suspense>
    </div>
  )
}
