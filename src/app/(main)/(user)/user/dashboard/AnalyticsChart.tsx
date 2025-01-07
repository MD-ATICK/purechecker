
import { getLast30DayMailVerifyData } from "./actions";
import EmailVerifyAreaChart from "./EmailVerifyAreaChart";

export default async function AnalysisChart({ data }: { data: getLast30DayMailVerifyData[] }) {

  // const user = await getUser()
  // if (!user || !user.id) {
  //   return NotFound()
  // }


  // const data = await getLast30DayMailVerifyData(user.id)


  // if (data === undefined) {
  //   return <AreaChartSkeleton />
  // }

  return (
    <div className="">
      <EmailVerifyAreaChart data={data} />
    </div>
  )
}
