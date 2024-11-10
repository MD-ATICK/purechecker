"use server"

import { db } from "@/lib/prisma";

export const createVolume = async ({ userId, credit, type, amount, discount, perCreditPrice }: { amount: number, credit: number, type: "PURCHASE" | "SUBSCRIPTION", userId: string, perCreditPrice: number, discount: number }) => {
    try {

        const user = await db.user.findFirst({ where: { id: userId, role: "ADMIN" } })

        if (!user) {
            return { error: "User not found" }
        }

        let volume;
        switch (type) {
            case "SUBSCRIPTION":
                const dailyCredit = Math.floor(credit / parseInt(process.env.CREDIT_LENGTH || "30"));
                volume = await db.volume.create({ data: { discount, perCreditPrice, amount, userId, credit, dailyCredit, type: "SUBSCRIPTION" } })
                break;
            case "PURCHASE":
                volume = await db.volume.create({ data: { discount, perCreditPrice, amount, userId, credit, type: "PURCHASE" } })
                break;
        }

        return { volume }

    } catch (error) {
        return { error: (error as Error).message }
    }
}

export const deleteVolume = async (id: string) => {
    try {
        await db.volume.delete({ where: { id } })
        return { success: true }
    } catch (error) {
        return { error: (error as Error).message }
    }
}

export const updateVolume = async (id: string, values: { amount: number, credit: number, userId: string, perCreditPrice: number, discount: number }) => {
    try {
        const volume = await db.volume.update({ where: { id }, data: values })
        return { volume }
    } catch (error) {
        return { error: (error as Error).message }
    }
}