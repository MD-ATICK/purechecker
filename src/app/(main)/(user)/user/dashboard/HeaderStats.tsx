"use client"
import HeaderStatsSkeleton from "@/app/(main)/(admin)/admin/dashboard/HeaderStatsSkeleton"
import { useUserStore } from "@/store/useUserStore"
import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { getHeaderStatsData } from "./actions"

export default function HeaderStats() {

    const { user } = useUserStore()

    const [headerStatsData, setHeaderStatsData] = useState<{ deliverable: number, unDeliverable: number, apiUsage: number }>();


    const [isLoading, startTransition] = useTransition()

    // const data = await getHeaderStatsData({ userId: user?.id })

    // if (!user || !user?.id) {
    //     return <ErrorPage>User not found</ErrorPage>
    // }
    // if (data === undefined) {
    //     return <Loading />
    // }

    // if (data.error) {
    //     return <ErrorPage>Somethings is wrong! {data.error}</ErrorPage>
    // }

    useEffect(() => {
        const call = async () => {
            startTransition(async () => {
                if (user && user.id) {
                    const { unDeliverable, deliverable, apiUsage, error } = await getHeaderStatsData({ userId: user?.id })
                    if (error) {
                        toast.error(error)
                    }
                    if (unDeliverable && deliverable && apiUsage) {
                        setHeaderStatsData({ unDeliverable, deliverable, apiUsage })
                    }
                }
            })
        }
        call()
    }, [user]);

    if (isLoading) {
        return <HeaderStatsSkeleton type="USER" />
    }

    return (
        <div className=" w-full md:h-[90vh] md:sticky top-0 right-0 md:w-[260px] flex flex-col gap-6">
            <div className=" h-full w-full py-3 md:px-10  shadow-sm  border-b-2">
                <h2 className=" text-2xl md:text-2xl font-bold">Deliverable</h2>
                <div className=" flex items-end justify-between pr-4">
                    <h1 className=" text-2xl md:text-4xl text-green-500">{headerStatsData?.deliverable || 0}</h1>
                </div>
            </div>
            <div className=" h-full w-full md:px-10  shadow-sm  border-b-2">
                <h2 className=" text-2xl md:text-2xl font-bold">UnDeliverable</h2>
                <div className=" flex items-end justify-between pr-4">
                    <h1 className=" text-2xl md:text-4xl text-red-500">{headerStatsData?.unDeliverable || 0}</h1>
                </div>
            </div>
            <div className=" h-full w-full md:px-10  shadow-sm ">
                <h2 className=" text-2xl md:text-2xl font-bold">Api Usage</h2>
                <div className=" flex items-end justify-between pr-4">
                    <h1 className=" text-2xl md:text-4xl text-primary">{headerStatsData?.apiUsage || 0}</h1>
                </div>
            </div>

        </div>
    )
}
