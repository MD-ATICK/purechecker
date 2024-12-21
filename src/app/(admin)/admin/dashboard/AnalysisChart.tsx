import Loading from "../loading";
import { getLast30DayUsersData } from "./actions";
import UserAreaChart from "./UsersAreaChart";

export default async function AnalysisChart() {

    const data = await getLast30DayUsersData()

    if (data === undefined) {
        return <Loading />
    }

    return (
        <div className=" my-[5vw]">
              <h2 className=" text-xl md:text-2xl font-bold">See Users Analytics</h2>
              <p className=" text-sm mb-5 text-muted-foreground">The dashboard provides insights on users through an area chart for efficient monitoring.</p>
            <UserAreaChart data={data} />
        </div>
    )
}
