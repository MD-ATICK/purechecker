"use server"

import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"


export const buyPurchase = async ({ userId, volumeId }: { userId: string, volumeId: string }) => {

    try {

        const volume = await db.volume.findUnique({ where: { id: volumeId } })
        if (!volume) return { error: "Volume not found" }
        if (volume.type !== "PURCHASE") return { error: "Volume type not found" }

        const user = await db.user.findUnique({ where: { id: userId } })
        if (!user) return { error: "User not found" }

        const paymentId = '64bff5d4c8e4d2a59f1b7f41' // just for test there will be add the payment gateway id

        const newCredit = await db.credit.create({
            data: {
                userId,
                credit: volume.credit,
                type: 'PURCHASE',
            }
        })

        await db.order.create({
            data: {
                userId,
                paymentId,
                amount: volume.amount,
                plan: "PURCHASE",
                credit: volume.credit
            }
        })


        return { success: true, data: newCredit }
    } catch (error) {
        throw error
    }

}


export const buySubscription = async ({ userId, volumeId }: { userId: string, volumeId: string }) => {

    // initial credit, subscription , order, userUpdate

    try {
        const volume = await db.volume.findUnique({ where: { id: volumeId } })
        if (!volume) return { error: "Volume not found" }
        if (volume.type !== "SUBSCRIPTION") return { error: "Volume type not found" }

        const user = await db.user.findUnique({ where: { id: userId } })
        if (!user) return { error: "User not found" }

        const paymentId = '64bff5d4c8e4d2a59f1b7f41' // just for test there will be add the payment gateway id

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

    console.log('creating sub', volume.id)
      await db.subscription.create({
            data: {
                userId,
                volumeId: volume.id,
                paymentId,
                status: "ACTIVE",
                currentPeriodStart,
                currentPeriodEnd,
            }
        })


        await db.order.create({
            data: {
                userId,
                paymentId,
                amount: volume.amount,
                plan: "SUBSCRIPTION",
                credit: volume.credit
            }
        })

        revalidatePath('/pricing')
        return { success: true, credit: newCredit.credit }
    } catch (error) {
        throw error
    }

}