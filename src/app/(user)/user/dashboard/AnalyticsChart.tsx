import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import { getUser } from "@/lib/getUser";
import { getLast30DayMailVerifyData } from "./actions";
import EmailVerifyAreaChart from "./EmailVerifyAreaChart";

export default async function AnalysisChart() {

  const user = await getUser()
  if (!user || !user.id) {
    return NotFound()
  }

  const data = await getLast30DayMailVerifyData(user.id)

  if (data === undefined) {
    return <Loading />
  }

  return (
    <div className="">
      <EmailVerifyAreaChart data={data} />
    </div>
  )
}
