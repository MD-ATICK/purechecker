"use server"

import { db } from "@/lib/prisma"


export const getSubscriptionById = async (subscriptionId : string) => {
    try {   

        const subscription = await db.subscription.findUnique({ where: { id: subscriptionId } })
        if (!subscription) return { error: "Subscription not found" }

        return {success : true, subscription}
        
    } catch (error) {
        return { error: (error as Error).message }

    }
}

export const customerPortal = async (customerId: string) => {
    try {


        const res = await fetch(`${process.env.NEXT_PUBLIC_PADDLE_SANDBOX_API}/customers/${customerId}/portal-sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer d2fc0d93483be40943d596c118c8577fbcf68c7d88fce33f2e`
            }
        })

        if (!res.ok) {
            return { error: `${res.status} ${res.statusText}` }
        }
        const data = await res.json()
        const url = data?.data?.urls?.general?.overview

        if(url){
            return {success : true, url}
        }

    } catch (error) {
        return { error: (error as Error).message }
    }
}