"use client"
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import usePaddle from "@/hooks/usePaddle";
import { useUserStore } from "@/store/useUserStore";
import Link from "next/link";
import { useTransition } from "react";

export default function BuyNowButton({ type, volumeId, paddlePriceId }: { paddlePriceId: string, volumeId: string, type: "SUBSCRIPTION" | "PURCHASE" }) {

    const [isPending, startTransition] = useTransition()
    const paddle = usePaddle()

    const {user} = useUserStore()
    if (!user || !user.id) {
        return  (
            <Link href={'/login'}>
                <Button >Login</Button>
            </Link>
        );
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
            if (user?.email &&  user?.customerId) {
                await paddle?.Checkout.open({
                    items: [{ priceId: paddlePriceId }],
                    customer: { id: user?.customerId },
                    customData: {
                        customerId: user.customerId,
                        userId: user.id,
                        email: user.email,
                        image: user.image,
                        volumeId: volumeId,
                        type: type
                    },
                });
            }
        })
    }

    return (
        <>
            {
                type === 'PURCHASE' &&
                <LoadingButton isPending={isPending} disabled={isPending} onClick={buyHandler}>
                    Buy Credits
                </LoadingButton>
            }
            {
                type === "SUBSCRIPTION" &&
                <LoadingButton  isPending={isPending} disabled={isPending || (user.subscriptionId ? true : false)} onClick={buyHandler}>
                    {
                        user.subscriptionId ? 'Subscribed' : "Subscribe Now"
                    }
                </LoadingButton>
            }
        </>
    )
}
