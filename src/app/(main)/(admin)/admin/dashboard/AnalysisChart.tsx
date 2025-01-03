import Loading from "@/components/Loading";
import { getLast14DayUsersData } from "./actions";
import UserAreaChart from "./UsersAreaChart";

export default async function AnalysisChart() {

    const data = await getLast14DayUsersData()

    if (data === undefined) {
        return <Loading />
    }

    return (
        <div className=" my-[5vw]">
              <h2 className=" text-xl md:text-2xl font-bold">See Users Analytics</h2>
              <p className=" text-sm mb-5 text-muted-foreground">The dashboard provides insights on last <span className=" text-sky-500 font-semibold">14 days</span> users through an area chart for efficient monitoring.</p>
            <UserAreaChart data={data} />
        </div>
    )
}
