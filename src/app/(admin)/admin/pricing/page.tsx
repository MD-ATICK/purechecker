import PricingCo from "@/app/(main)/pricing/PricingCo";
import { getUser } from "@/lib/getUser";
import VolumeDialog from "./VolumeDialog";

export default async function PricingPage() {

    const user = await getUser()

    if (!user || !user.id) {
        throw new Error("Unauthorized")
    }

    return (
        <div className=" p-[1.5vw] space-y-5">
            <div className=" flex items-center justify-between">
                <div className="flex-1">
                    <h1 className=" text-xl font-bold">Add Volume</h1>
                    <p className=" text-muted-foreground text-sm">
                    Add a new Volume to allocate for seamless email verification.!</p>
                </div>
                <div className=" flex-1 flex justify-end">
                    <VolumeDialog userId={user.id} />
                </div>
            </div>
            <PricingCo route="ADMIN"/>
        </div>
    )
}
