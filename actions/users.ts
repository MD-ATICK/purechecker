
"use server"

import { db } from "@/lib/prisma";


export const checkHasSubscriptionAccess = async (subscriptionId: string, userId: string) => {
    try {

        const subscription = await db.subscription.findFirstOrThrow({ where: { id: subscriptionId, userId, status: "active" } })

        if (!subscription) return null;

        const endDate = new Date(subscription.currentPeriodEnd)
        if (endDate < new Date()) {

            await db.subscription.update({ where: { id: subscriptionId, userId, status: "active" }, data: { status: "canceled" } })
            return null
        };

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const credit = await db.credit.findUnique({ where: { userId, type: 'SUBSCRIPTION', createdAt: { gte: startOfDay, lte: endOfDay } } })
        if (credit) {
            return null;
        }

        return subscription

    } catch (error) {
        console.log((error as Error).message)
        return null;
    }
}


export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findFirst({ where: { id } })
        return user;
    } catch (error) {
        console.log((error as Error).message)
        return null
    }
}

export const getCredentialUserById = async (id: string) => {
    try {
        const user = await db.user.findFirst({ where: { id, password: { not: null } } })
        return user;
    } catch (error) {
        console.log((error as Error).message)
        return null
    }
}

export const getUserByIdWithCredit = async (id: string) => {
    try {
        const user = await db.user.findFirst({ where: { id }, include: { credits: true } })
        return user;
    } catch (error) {
        console.log((error as Error).message)
        return null
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findFirst({ where: { email } })
        return user;
    } catch (error) {
        console.log((error as Error).message)
        return null

    }
}

export const userCreditReduce = async (credit: number, reduceCredit: number, userId: string) => {
    try {
        const newUser = await db.credit.update({
            where: { userId: userId },
            data: {
                credit: (credit - reduceCredit)
            }
        })

        return { success: true, credit: newUser.credit }
    } catch (error) {
        console.log((error as Error).message)
        return null

    }
}


export const getSubCredit = async (userId: string) => {
    const x = await db.credit.aggregate({
        _sum: {
            credit: true,
        },
        where: {
            userId: userId
        },
    });

    return x._sum.credit
}