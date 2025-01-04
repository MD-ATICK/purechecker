
import NotFound from "@/app/not-found";
import AreaChartSkeleton from "@/components/AreaChartSkeleton";
import { getUser } from "@/lib/getUser";
import { getLast30DayMailVerifyData } from "./actions";
import EmailVerifyAreaChart from "./EmailVerifyAreaChart";

export default async function AnalysisChart() {

  const user = await getUser()
  if (!user || !user.id) {
    return NotFound()
  }


  // previous commit 
  const data = await getLast30DayMailVerifyData(user.id)


  if (data === undefined) {
    return <AreaChartSkeleton />
  }

  return (
    <div className="">
      <EmailVerifyAreaChart data={data} />
    </div>
  )
}
