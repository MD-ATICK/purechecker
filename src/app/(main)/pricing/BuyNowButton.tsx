"use client"
import LoadingButton from "@/components/LoadingButton";
import usePaddle from "@/hooks/usePaddle";
import { useUser } from "@/hooks/useUser";
import { useCreditStore } from "@/store/useCreditStore";
import { useTransition } from "react";

export default function BuyNowButton({ type, volumeId, paddlePriceId }: { paddlePriceId: string, volumeId: string, type: "SUBSCRIPTION" | "PURCHASE" }) {

    const [isPending, startTransition] = useTransition()
    const paddle = usePaddle()

    const { credit } = useCreditStore()
    const user = useUser()
    if (!user || !user.id) {
        return;
    }

    // const buySubscriptionHandler = () => {
        // startTransition(async () => {
        //     const data = await buySubscription({ volumeId, userId: user.id! })
        //     if (data.success) {
        //         toast.success(`Successfully Activate ${type}`)
        //         setCredit(credit + data.credit)
        //     }
        //     if (data?.error) {
        //         toast.error(data?.error)
        //     }
        // })
    // }

    const buyHandler = async () => {
        startTransition(async () => {
            if (user?.email) {
                await paddle?.Checkout.open({
                    items: [{ priceId: paddlePriceId }],
                    customer: { id: user.customerId },
                    customData: {
                        customerId: user.customerId,
                        userId: user.id,
                        email: user.email,
                        image: user.image,
                        volumeId: volumeId,
                        credit: credit,
                        type: type
                    },
                });
            }
        })
    }

    return (
        <LoadingButton isPending={isPending}
            //  disabled={isPending || ((user.subscriptionId && type === 'SUBSCRIPTION') ? true : false)}
            onClick={buyHandler}>
            {(user.subscriptionId && type === 'SUBSCRIPTION') ? 'Subscribed' : type === 'PURCHASE' ? 'Buy' : 'Subscribe'}
        </LoadingButton>
    )
}
