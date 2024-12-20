"use server"

import { sendEmail } from "@/actions/sendMail"
import PurchaseMail from "@/emails/PurchanseMail"
import SubscriptionMail from "@/emails/SubscriptionMail"
import { db } from "@/lib/prisma"
import { Interval, SubscriptionStatus } from "@paddle/paddle-node-sdk"
import { CreditType } from "@prisma/client"
import { render } from "@react-email/components"
import { revalidatePath } from "next/cache"



export const createCredit = async (userId: string, volumeId: string, type: CreditType) => {
    try {


        console.log({ userId, volumeId, type })
        if (!userId || !volumeId || !type) return { error: "something is wrong" }

        const volume = await db.volume.findUnique({ where: { id: volumeId } })
        if (!volume) return { error: "Volume not found" }

        const createdCredit = await db.credit.create({
            data: {
                userId,
                credit: type === "SUBSCRIPTION" ? Math.floor(volume.credit / parseInt(process.env.NEXT_PUBLIC_SUBSCRIPTION_DAY_LENGTH || "30")) : volume.credit,
                type
            }
        })

        console.log('---------------- created credit ----------------------', createdCredit)

        return { success: true }
    } catch (error) {
        console.log((error as Error).message)
        return { error: "something is wrong" }
    }
}
export const buyPurchase = async ({ userId, volumeId, transactionId }: { userId: string, volumeId: string, transactionId: string }) => {

    try {

        const volume = await db.volume.findUnique({ where: { id: volumeId } })
        if (!volume) return { error: "Volume not found" }
        if (volume.type !== "PURCHASE") return { error: "Volume type not found" }

        const user = await db.user.findUnique({ where: { id: userId } })
        if (!user) return { error: "User not found" }

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
                credit: volume.credit
            }
        })
        const html = await render(<PurchaseMail name={user.name!} email={user.email!} amount={volume.amount} credit={volume.credit} createdAt={new Date().toISOString()} type={volume.type} />)
        const subject = `You have been made a purchase from our website. ⚡`
        await sendEmail({ to: user.email!, html, subject })

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
        if (volume.type !== "SUBSCRIPTION") return { error: "Volume type not found" }

        const user = await db.user.findUnique({ where: { id: userId } })
        if (!user) return { error: "User not found" }

        // const newCredit = await db.credit.create({
        //     data: {
        //         userId,
        //         credit: volume.dailyCredit || (volume.credit / parseInt(process.env.CREDIT_LENGTH || "30")),
        //         type: 'SUBSCRIPTION',
        //     }
        // })

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
                credit: volume.credit
            }
        })

        const html = await render(<SubscriptionMail name={user.name!} email={user.email!} amount={volume.amount} credit={volume.credit} perDayCredit={Math.floor(volume.credit / 30)} createdAt={new Date().toISOString()} type={volume.type} />)
        const subject = `You have been brought a subscription from our website. 🔥❤️`
        await sendEmail({ to: user.email!, html, subject })


        revalidatePath('/pricing')
        return { success: true }
    } catch (error) {
        throw error
    }

}