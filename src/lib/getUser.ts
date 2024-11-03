
"use server"
import { auth } from "@/auth"
import { db } from "./prisma"


export const getUser = async () => {
    const session = await auth()
    return session?.user
}

export const checkSubscription = async ({ userId, subscriptionId }: { userId: string, subscriptionId: string }) => {

    try {

        const user = await db.user.findUnique({ where: { id: userId } })
        if (!user) throw new Error('Unauthorized')

        const subscription = await db.subscription.findUnique({ where: { id: subscriptionId } })
        if (!subscription) {
            await db.user.update({ where: { id: userId }, data: { subscriptionId: null } })
        }

        return;
    } catch (error) {
        throw error;
    }

}