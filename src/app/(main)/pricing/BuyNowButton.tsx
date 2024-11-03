"use client"
import LoadingButton from "@/components/LoadingButton";
import { useUser } from "@/hooks/useUser";
import { useCreditStore } from "@/store/useCreditStore";
import { useTransition } from "react";
import { toast } from "sonner";
import { buyPurchase, buySubscription } from "./actions";

export default function BuyNowButton({ type, volumeId }: { volumeId: string, type: "SUBSCRIPTION" | "PURCHASE" }) {

    const [isPending, startTransition] = useTransition()

    const { credit, setCredit } = useCreditStore()
    const user = useUser()
    if (!user || !user.id) {
        return;
    }

    const buySubscriptionHandler = () => {
        startTransition(async () => {
            const data = await buySubscription({ volumeId, userId: user.id! })
            if (data.success) {
                toast.success(`Successfully Activate ${type}`)
                setCredit(credit + data.credit)
            }
            if (data?.error) {
                toast.error(data?.error)
            }
        })
    }

    const buyPurchaseHandler = async () => {
        startTransition(async () => {
            const data = await buyPurchase({ volumeId, userId: user.id! })
            if (data.success) {
                toast.success(`Successfully Activate ${type}`)
                setCredit(credit + data.data.credit)
            }
            if (data?.error) {
                toast.error(data?.error)
            }
        })
    }

    return (
        <LoadingButton isPending={isPending} disabled={isPending || ((user.subscriptionId && type === 'SUBSCRIPTION') ? true : false)} onClick={type === "PURCHASE" ? buyPurchaseHandler : buySubscriptionHandler}>
            {(user.subscriptionId && type === 'SUBSCRIPTION') ? 'Subscribed' : type === 'PURCHASE' ? 'Buy Now' : 'Subscribe Now'}
        </LoadingButton>
    )
}
