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
            <UserAreaChart data={data} />
        </div>
    )
}
