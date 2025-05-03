import HeaderStatsSkeleton from "@/app/(main)/(admin)/admin/dashboard/HeaderStatsSkeleton";
import AreaChartSkeleton from "@/components/AreaChartSkeleton";
import Loading from "@/components/Loading";
import { getUser } from "@/lib/getUser";
import { getLast30dayDashboardData } from "@/lib/utils";
import { Suspense } from "react";
import {
	getDashboardDataByUserId,
	getLast30DayMailVerifyData,
} from "./actions";
import AnalysisChart from "./AnalyticsChart";
import HeaderStats from "./HeaderStats";

export default async function UserDashboard() {
	const user = await getUser();

	if (!user || !user.id) {
		return <Loading />;
	}

	const { dashboardData, error } = await getDashboardDataByUserId(user.id);

	if (error) {
		return (
			<p className=' bg-green-600/10 text-green-600  p-2'>
				Please make some verification of emails to see your dashboard
			</p>
		);
	}

	if (!dashboardData) {
		return <Loading />;
	}

	const deliverable = dashboardData?.deliverableEmails.length;
	const undeliverable = dashboardData?.undeliverableEmails.length;
	const apiUsage = dashboardData?.apiUsagesEmails.length;

	const last30DaysDashboardData: getLast30DayMailVerifyData[] =
		getLast30dayDashboardData(dashboardData);

	return (
		<div className='  flex flex-col-reverse bg-gradient-to-t lg:bg-gradient-to-r to-gray-600/10 via-gray-600/10 lg:via-white lg:to-gray-600/10  from-white md:flex-row items-start gap-6 '>
			<div className=' space-y-20 flex-grow'>
				<div className=' p-3'>
					<h2 className='font-bold'>See Your Usage Analytics By Area Chart</h2>
					<p className=' text-sm mb-5 text-muted-foreground'>
						The dashboard provides insights on{" "}
						<span className=' font-semibold text-sky-500'>Last 30 days</span>{" "}
						your deliverable and undeliverable emails, along with API usage
						trends through an area chart for efficient monitoring.
					</p>
					<Suspense fallback={<AreaChartSkeleton />}>
						<AnalysisChart data={last30DaysDashboardData} />
					</Suspense>
				</div>
				{/* <div>
          <h1 className=" text-2xl font-bold">See Your Usage Analytics By Pie Chart</h1>
          <Suspense fallback={<AreaChartSkeleton />}>
            <AnalysisPieChart />
          </Suspense>
        </div> */}
			</div>
			<Suspense fallback={<HeaderStatsSkeleton type='USER' />}>
				<HeaderStats
					deliverable={deliverable || 0}
					unDeliverable={undeliverable || 0}
					apiUsage={apiUsage || 0}
				/>
			</Suspense>
		</div>
	);
}
