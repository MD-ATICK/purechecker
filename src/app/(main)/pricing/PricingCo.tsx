import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUser } from "@/lib/getUser"
import { db } from "@/lib/prisma"
import Purchase from "./Purchase"
import Subscription from "./Subscription"


export default async function PricingCo({ route }: { route?: "ADMIN" | "USER" }) {

    const user = await getUser()
    if (!user || !user.id) {
        return (<p>Not user found!</p>)
    }
    const purchases = await db.volume.findMany({ where: { type: 'PURCHASE' }, orderBy: { credit: 'desc' } })
    const subscriptions = await db.volume.findMany({ where: { type: "SUBSCRIPTION" }, orderBy: { credit: 'desc' } })

    return (
        <div className=" container mx-auto mt-4 flex justify-center items-center">
            <Tabs defaultValue="purchase" className=" w-full">
                <TabsList className=" w-full h-12 md:h-16">
                    <TabsTrigger value="purchase">Pay as You go</TabsTrigger>
                    <TabsTrigger value="subscription">Monthly Subscription</TabsTrigger>
                </TabsList>
                <TabsContent value="purchase">
                    <Purchase route={route} purchases={purchases} />
                </TabsContent>
                <TabsContent value="subscription">
                    <Subscription route={route} subscriptions={subscriptions} />
                </TabsContent>
            </Tabs>

        </div>
    )
}
