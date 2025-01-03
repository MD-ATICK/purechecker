import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { db } from "@/lib/prisma"
import Purchase from "./Purchase"
import Subscription from "./Subscription"


export default async function PricingCo({ route, heading }: { route?: "ADMIN" | "USER", heading?: string }) {

    const purchases = await db.volume.findMany({ where: { type: 'PURCHASE' }, orderBy: { credit: 'desc' } })
    const subscriptions = await db.volume.findMany({ where: { type: "SUBSCRIPTION" }, orderBy: { credit: 'desc' } })

    return (
        <div>
            {
                heading &&
                <h1 className=" text-center py-3" >{heading}</h1>
            }
            <div className=" container mx-auto mt-4 flex justify-center items-center">
                <Tabs defaultValue="purchase" className=" w-full">
                    <TabsList className=" w-full h-12 md:h-16">
                        <TabsTrigger value="purchase" className=" w-1/2">Pay as You go</TabsTrigger>
                        <TabsTrigger value="subscription" className=" w-1/2">Monthly Subscription</TabsTrigger>
                    </TabsList>
                    <TabsContent value="purchase">
                        <Purchase route={route} purchases={purchases} />
                    </TabsContent>
                    <TabsContent value="subscription">
                        <Subscription route={route} subscriptions={subscriptions} />
                    </TabsContent>
                </Tabs>

            </div>
        </div>
    )
}
