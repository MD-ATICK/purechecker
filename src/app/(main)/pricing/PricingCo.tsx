import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUser } from "@/lib/getUser"
import { db } from "@/lib/prisma"
import Purchase from "./Purchase"
import Subscription from "./Subscription"


export default async function PricingCo() {

    const user = await getUser()
    if (!user || !user.id) {
        return (<p>Not user found!</p>)
    }
    const purchases = await db.volume.findMany({ where: { type: 'PURCHASE' }, orderBy: { credit: 'desc' } })
    const subscriptions = await db.volume.findMany({ where: { type: "SUBSCRIPTION" }, orderBy: { credit: 'desc' } })

    return (
        <div className=" container mx-auto flex justify-center items-center p-[2vw]">
            <Tabs defaultValue="subscription" className=" w-full">
                <TabsList className=" w-full h-16">
                    <TabsTrigger value="purchase">Pay as You go</TabsTrigger>
                    <TabsTrigger value="subscription">Monthly Subscription</TabsTrigger>
                </TabsList>
                <TabsContent value="purchase">
                    <Purchase purchases={purchases} />
                </TabsContent>
                <TabsContent value="subscription">
                    <Subscription subscriptions={subscriptions} />
                </TabsContent>
            </Tabs>

        </div>
    )
}
