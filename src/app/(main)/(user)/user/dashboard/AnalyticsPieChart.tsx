import ErrorPage from "@/components/ErrorPage";
import Loading from "@/components/Loading";
import { getHeaderStatsData } from "./actions";
import VerifyEmailPieChart from "./VerifyEmailPieChart";

export default async function AnalysisPieChart() {

    const data = await getHeaderStatsData()

    if (data === undefined) {
        return <Loading />
    }

    if (data.error) {
        return <ErrorPage>Somethings is wrong!</ErrorPage>
    }

    const updatedData = [
        {
            name: 'Deliverable',
            value: data.deliverable || 0,
        },
        {
            name: 'UnDeliverable',
            value: data.unDeliverable || 0,
        },
        {
            name: 'Api Usage',
            value: data.apiUsage || 0,
        }
    ]

    return (
        <div className=" w-full">
            {
                updatedData.find(d => d.value > 0)  ?
                    <VerifyEmailPieChart data={updatedData} />
                    : (
                        <p className=" text-sm text-muted-foreground font-medium p-2">Have not any data</p>
                    )
            }
        </div>
    )
}
