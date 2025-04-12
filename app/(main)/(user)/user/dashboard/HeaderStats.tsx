import { Cable, Mail, MailWarning } from "lucide-react";

export default async function HeaderStats({
  deliverable,
  unDeliverable,
  apiUsage,
}: {
  deliverable: number;
  unDeliverable: number;
  apiUsage: number;
}) {
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
    <div className=" w-full md:h-[100vh] p-2 md:sticky top-0 right-0 md:w-[260px] flex flex-col gap-3 py-4">
      <div className=" h-full w-full px-6 py-3 md:px-6  rounded-xl bg-white shadow-sm ">
        <div className="flex items-center gap-2">
          <div className=" h-10 flex justify-center items-center aspect-square rounded-sm bg-emerald-500/10 text-emerald-500">
            <Mail size={15} />
          </div>
          <h2 className=" text-2xl md:text-2xl font-bold">Deliverable</h2>
        </div>
        <div className=" flex items-end justify-between pr-4">
          <h1 className=" text-2xl md:text-4xl font-bold text-emerald-500">
            {deliverable || 0}
          </h1>
        </div>
      </div>
      <div className=" h-full w-full px-6 py-3 md:px-6  rounded-xl bg-white shadow-sm ">
        <div className="flex items-center gap-2">
          <div className=" h-10 flex justify-center items-center aspect-square rounded-sm bg-red-500/10 text-red-500">
            <MailWarning size={15} />
          </div>
          <h2 className=" text-2xl md:text-2xl font-bold">UnDeliverable</h2>
        </div>
        <div className=" flex items-end justify-between pr-4">
          <h1 className=" text-2xl md:text-4xl font-bold text-red-500">
            {unDeliverable || 0}
          </h1>
        </div>
      </div>
      <div className=" h-full w-full px-6 py-3 md:px-6  rounded-xl bg-white shadow-sm ">
        <div className="flex items-center gap-2">
          <div className=" h-10 flex justify-center items-center aspect-square rounded-sm bg-primary/10 text-primary">
            <Cable size={15} />
          </div>
          <h2 className=" text-2xl md:text-2xl font-bold">Api Usage</h2>
        </div>
        <div className=" flex items-end justify-between pr-4">
          <h1 className=" text-2xl md:text-4xl font-bold text-primary">
            {apiUsage || 0}
          </h1>
        </div>
      </div>
    </div>
  );
}
