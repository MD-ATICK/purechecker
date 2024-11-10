import { getTotalPayments, getTotalSubscriptions, getTotalVerifyEmails, getUsersData } from "./actions"

export default async function HeaderStats() {

    const usersData = await getUsersData()
    const subscriptionsData = await getTotalSubscriptions()
    const paymentsData = await getTotalPayments()
    const emailsData = await getTotalVerifyEmails()

    return (
        <div className=" md:h-32 w-full grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
            <div className=" h-full w-full p-2 md:p-4 border-b-2 md:border-r-2 md:border-b-0">
                <h2 className=" text-lg md:text-2xl font-bold">Users</h2>
                <div className=" flex items-end justify-between pr-4">
                    <h1 className=" text-primary">{usersData.users}</h1>
                    {
                        usersData.statsPercent < 0 ?
                            (<p className=" text-red-500">{Math.floor(usersData.statsPercent)}%</p>)
                            :
                            (<p className=" text-green-500">+{Math.floor(usersData.statsPercent)}%</p>)
                    }
                </div>
            </div>
            <div className=" h-full w-full p-2 md:p-4 border-b-2 md:border-r-2 md:border-b-0">
                <h2 className=" text-lg md:text-2xl font-bold">Subscription Users</h2>
                <div className=" flex items-end justify-between pr-4">
                    <h1 className=" text-primary">{subscriptionsData.subscriptions}</h1>
                    {
                        subscriptionsData.statsPercent < 0 ?
                            (<p className=" text-red-500">{Math.floor(subscriptionsData.statsPercent)}%</p>)
                            :
                            (<p className=" text-green-500">+{Math.floor(subscriptionsData.statsPercent)}%</p>)
                    }
                </div>
            </div>
            <div className=" h-full w-full p-2 md:p-4 border-b-2 md:border-r-2 md:border-b-0">
                <h2 className=" text-lg md:text-2xl font-bold">Payments</h2>
                <div className=" flex items-end justify-between pr-4">
                    <h1 className=" text-primary">{paymentsData.payments}</h1>
                    {
                        paymentsData.statsPercent < 0 ?
                            (<p className=" text-red-500">{Math.floor(paymentsData.statsPercent)}%</p>)
                            :
                            (<p className=" text-green-500">+{Math.floor(paymentsData.statsPercent)}%</p>)
                    }
                </div>
            </div>
            <div className=" h-full w-full p-4">
                <h2 className=" text-lg md:text-2xl font-bold">Verify Emails</h2>
                <div className=" flex items-end justify-between pr-4">
                    <h1 className=" text-primary">{emailsData.verifyEmails}</h1>
                    {
                        emailsData.statsPercent < 0 ?
                            (<p className=" text-red-500">{Math.floor(emailsData.statsPercent)}%</p>)
                            :
                            (<p className=" text-green-500">+{Math.floor(emailsData.statsPercent)}%</p>)
                    }
                </div>
            </div>

        </div>
    )
}
