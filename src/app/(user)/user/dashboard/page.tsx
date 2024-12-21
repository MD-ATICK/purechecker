import HeaderStatsSkeleton from "@/app/(admin)/admin/dashboard/HeaderStatsSkeleton";
import AreaChartSkeleton from "@/components/AreaChartSkeleton";
import { Suspense } from "react";
import AnalysisChart from "./AnalyticsChart";
import HeaderStats from "./HeaderStats";

export default function UserDashboard() {


  return (
    <div className=" p-3 md:p-6 flex flex-col-reverse md:flex-row items-start gap-6 ">
      <div className=" space-y-20 flex-grow">
        <div>
          <h2 className="font-bold">See Your Usage Analytics By Area Chart</h2>
          <p className=" text-sm mb-5 text-muted-foreground">The dashboard provides insights on deliverable and undeliverable emails, along with API usage trends through an area chart for efficient monitoring.</p>
          <Suspense fallback={<AreaChartSkeleton />}>
            <AnalysisChart />
          </Suspense>
        </div>
        {/* <div>
          <h1 className=" text-2xl font-bold">See Your Usage Analytics By Pie Chart</h1>
          <Suspense fallback={<AreaChartSkeleton />}>
            <AnalysisPieChart />
          </Suspense>
        </div> */}
      </div>
      <Suspense fallback={<HeaderStatsSkeleton type="USER" />}>
        <HeaderStats />
      </Suspense>
    </div>
  )
}
