"use server"

import { db } from "@/lib/prisma"
import { TransactionStatus } from "@paddle/paddle-node-sdk"
import { revalidatePath } from "next/cache"


export const buyPurchase = async ({ userId, volumeId, transactionId }: { userId: string, volumeId: string, transactionId: string }) => {

    try {

        const volume = await db.volume.findUnique({ where: { id: volumeId } })
        if (!volume) return { error: "Volume not found" }
        if (volume.type !== "PURCHASE") return { error: "Volume type not found" }

        const user = await db.user.findUnique({ where: { id: userId } })
        if (!user) return { error: "User not found" }


        const newCredit = await db.credit.create({
            data: {
                userId,
                credit: volume.credit,
                type: 'PURCHASE',
            }
        })

        await db.purchase.create({
            data: {
                userId,
                transactionId,
                amount: volume.amount,
                credit: volume.credit
            }
        })

        revalidatePath('/')
        return { success: true, data: newCredit }
    } catch (error) {
        throw error
    }

}


export const buySubscription = async ({ userId, volumeId, status, subscriptionId, transactionId }: { userId: string, volumeId: string,subscriptionId : string, transactionId : string, 
    status : TransactionStatus }) => {

    // initial credit, subscription , order, userUpdate
    try {
        const volume = await db.volume.findUnique({ where: { id: volumeId } })
        if (!volume) return { error: "Volume not found" }
        if (volume.type !== "SUBSCRIPTION") return { error: "Volume type not found" }

        const user = await db.user.findUnique({ where: { id: userId } })
        if (!user) return { error: "User not found" }

        const newCredit = await db.credit.create({
            data: {
                userId,
                credit: volume.dailyCredit || (volume.credit / parseInt(process.env.CREDIT_LENGTH || "30")),
                type: 'SUBSCRIPTION',
            }
        })

        const currentPeriodStart = new Date();
        const currentPeriodEnd = new Date(currentPeriodStart);
        currentPeriodEnd.setDate(currentPeriodEnd.getDate() + 30);

        await db.subscription.create({
            data: {
                userId,
                volumeId: volume.id,
                subscriptionId,
                transactionId,
                status,
                currentPeriodStart,
                currentPeriodEnd,
            }
        })

        revalidatePath('/pricing')
        return { success: true, credit: newCredit.credit }
    } catch (error) {
        throw error
    }

}