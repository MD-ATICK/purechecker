import Loading from "@/app/loading"
import ErrorPage from "@/components/ErrorPage"
import { getHeaderStatsData } from "./actions"

export default async function HeaderStats() {
    
    const data = await getHeaderStatsData()

    if(data === undefined){
        return <Loading />
    }

    if(data.error){
        return <ErrorPage>Somethings is wrong!</ErrorPage>
    }

    return (
        <div className=" w-full md:h-[90vh] md:sticky top-0 right-0 md:w-[260px] flex flex-col gap-6">
            <div className=" h-full w-full py-3 md:px-10  shadow-sm  border-b-2">
                <h2 className=" text-2xl md:text-2xl font-bold">Deliverable</h2>
                <div className=" flex items-end justify-between pr-4">
                    <h1 className=" text-2xl md:text-4xl text-green-500">{data.deliverable}</h1>
                </div>
            </div>
            <div className=" h-full w-full md:px-10  shadow-sm  border-b-2">
                <h2 className=" text-2xl md:text-2xl font-bold">UnDeliverable</h2>
                <div className=" flex items-end justify-between pr-4">
                    <h1 className=" text-2xl md:text-4xl text-red-500">{data.unDeliverable}</h1>
                </div>
            </div>
            <div className=" h-full w-full md:px-10  shadow-sm ">
                <h2 className=" text-2xl md:text-2xl font-bold">Api Usage</h2>
                <div className=" flex items-end justify-between pr-4">
                    <h1 className=" text-2xl md:text-4xl text-primary">{data.apiUsage}</h1>
                </div>
            </div>

        </div>
    )
}
