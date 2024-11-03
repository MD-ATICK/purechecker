import PricingCo from "@/app/(main)/pricing/PricingCo";
import { getUser } from "@/lib/getUser";
import VolumeDialog from "./VolumeDialog";

export default async function PricingPage() {

    const user = await getUser()

    if (!user || !user.id) {
        throw new Error("Unauthorized")
    }

    return (
        <div className=" p-[2vw]">
            <VolumeDialog userId={user?.id} />
            <PricingCo />
        </div>
    )
}
