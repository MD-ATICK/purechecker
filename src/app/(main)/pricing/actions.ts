"use server"

import { db } from "@/lib/prisma"
import { Interval, SubscriptionStatus } from "@paddle/paddle-node-sdk"
import { CreditType } from "@prisma/client"
import { revalidatePath } from "next/cache"



export const createCredit = async (userId: string, volumeId: string, type: CreditType) => {
    try {


        if (!userId || !volumeId || !type) return { error: "something is wrong" }

        const volume = await db.volume.findUnique({ where: { id: volumeId } })
        if (!volume) return { error: "Something went wrong" }

        await db.credit.create({
            data: {
                userId,
                credit: type === "SUBSCRIPTION" ? Math.floor(volume.credit / parseInt(process.env.NEXT_PUBLIC_SUBSCRIPTION_DAY_LENGTH || "30")) : volume.credit,
                type
            }
        })

        return { success: true }
    } catch (error) {
        console.log((error as Error).message)
        return { error: "something is wrong" }
    }
}
export const buyPurchase = async ({ userId, volumeId, transactionId }: { userId: string, volumeId: string, transactionId: string }) => {

    try {


        const volume = await db.volume.findUnique({ where: { id: volumeId } })
        if (!volume) return { error: "Something went wrong" }
        if (volume.type !== "PURCHASE") return { error: "Something went wrong" }

        const user = await db.user.findUnique({ where: { id: userId } })
        if (!user) return { error: "Account was not created with this email" }

        await db.purchase.create({
            data: {
                userId,
                paddleTransactionId: transactionId,
                volumeId: volume.id
            }
        })

        await db.order.create({
            data: {
                name: user.name!,
                email: user.email!,
                amount: volume.amount,
                type: volume.type,
                credit: volume.credit,
                paddleTransactionId: transactionId
            }
        })

        revalidatePath('/')
        return { success: true }
    } catch (error) {
        throw error
    }

}


type subscriptionFucProps = {
    userId: string,
    volumeId: string,
    subscriptionId: string,
    subscriptionScheduleChange: boolean,
    status: SubscriptionStatus,
    currentPeriodStart: string,
    currentPeriodEnd: string,
    billingCycleInterval?: Interval
}


export const updateSubscription = async ({ userId, volumeId, status, subscriptionId, currentPeriodEnd, currentPeriodStart, subscriptionScheduleChange }: subscriptionFucProps) => {
    try {
        await db.subscription.updateMany({
            where: {
                paddleSubscriptionId: subscriptionId,
                volumeId,
                userId,
            },
            data: {
                subscriptionScheduleChange,
                status,
                currentPeriodStart,
                currentPeriodEnd,
            }
        })

        revalidatePath('/pricing')
        return { success: true }
    } catch (error) {
        throw error
    }

}
export const buySubscription = async ({ userId, volumeId, status, billingCycleInterval, subscriptionId, currentPeriodEnd, currentPeriodStart, subscriptionScheduleChange }: subscriptionFucProps) => {

    try {
        const volume = await db.volume.findUnique({ where: { id: volumeId } })
        if (!volume) return { error: "Volume not found" }
        if (volume.type !== "SUBSCRIPTION") return { error: "Something went wrong" }

        const user = await db.user.findUnique({ where: { id: userId } })
        if (!user) return { error: "Account was not created with this email" }


        await db.subscription.create({
            data: {
                userId,
                volumeId: volume.id,
                paddleSubscriptionId: subscriptionId,
                subscriptionScheduleChange,
                status,
                currentPeriodStart,
                currentPeriodEnd,
                billingCycleInterval: billingCycleInterval || "month"
            }
        })

        await db.order.create({
            data: {
                name: user.name!,
                email: user.email!,
                amount: volume.amount,
                type: volume.type,
                credit: volume.credit,
                paddleTransactionId: subscriptionId
            }
        })


        revalidatePath('/pricing')
        return { success: true }
    } catch (error) {
        throw error
    }

}