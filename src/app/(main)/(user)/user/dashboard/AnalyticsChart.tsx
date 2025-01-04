"use client"
import AreaChartSkeleton from "@/components/AreaChartSkeleton";
import { useUserStore } from "@/store/useUserStore";
import { useEffect, useState, useTransition } from "react";
import { getLast30DayMailVerifyData } from "./actions";
import EmailVerifyAreaChart from "./EmailVerifyAreaChart";

export default function AnalysisChart() {

  // const user = await getUser()
  // if (!user || !user.id) {
  //   return NotFound()
  // }


  // const data = await getLast30DayMailVerifyData(user.id)


  // if (data === undefined) {
  //   return <AreaChartSkeleton />
  // }

  const { user } = useUserStore()

  const [mailVerifyData, setMailVerifyData] = useState<getLast30DayMailVerifyData[]>();


  const [isLoading, startTransition] = useTransition()

  useEffect(() => {
    const call = async () => {
      startTransition(async () => {
        if (user && user.id) {
          const data = await getLast30DayMailVerifyData({ userId: user?.id })
          setMailVerifyData(data)
        }
      })
    }
    call()
  }, [user]);


  if (isLoading) {
    return <AreaChartSkeleton />
  }

  if (mailVerifyData) {
    return (
      <div className="">
        <EmailVerifyAreaChart data={mailVerifyData} />
      </div>
    )
  }
}
