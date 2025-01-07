
export default async function HeaderStats({ deliverable, unDeliverable, apiUsage }: { deliverable: number, unDeliverable: number, apiUsage: number }) {

    // const user = await getUser()

    // if (!user || !user.id) {
    //     return <ErrorPage>Unauthorized Access</ErrorPage>

    // }
    // const data = await getHeaderStatsData({ userId: user.id })

    // if (data === undefined) {
    //     return <HeaderStats />
    // }

    // if (data.error) {
    //     return <ErrorPage>Somethings is wrong! {data.error}</ErrorPage>
    // }

    return (
        <div className=" w-full md:h-[90vh] md:sticky top-0 right-0 md:w-[260px] flex flex-col gap-6">
            <div className=" h-full w-full py-3 md:px-10  shadow-sm  border-b-2">
                <h2 className=" text-2xl md:text-2xl font-bold">Deliverable</h2>
                <div className=" flex items-end justify-between pr-4">
                    <h1 className=" text-2xl md:text-4xl text-green-500">{deliverable || 0}</h1>
                </div>
            </div>
            <div className=" h-full w-full md:px-10  shadow-sm  border-b-2">
                <h2 className=" text-2xl md:text-2xl font-bold">UnDeliverable</h2>
                <div className=" flex items-end justify-between pr-4">
                    <h1 className=" text-2xl md:text-4xl text-red-500">{unDeliverable || 0}</h1>
                </div>
            </div>
            <div className=" h-full w-full md:px-10  shadow-sm ">
                <h2 className=" text-2xl md:text-2xl font-bold">Api Usage</h2>
                <div className=" flex items-end justify-between pr-4">
                    <h1 className=" text-2xl md:text-4xl text-primary">{apiUsage || 0}</h1>
                </div>
            </div>

        </div>
    )
}
