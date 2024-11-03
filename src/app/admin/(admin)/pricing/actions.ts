"use server"

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createVolume = async ({ userId, credit, type, amount }: { amount: number, credit: number, type: "PURCHASE" | "SUBSCRIPTION", userId: string }) => {
    try {

        const user = await db.user.findFirst({ where: { id: userId, role: "ADMIN" } })

        if (!user) {
            return { error: "User not found" }
        }

        let volume;
        switch (type) {
            case "SUBSCRIPTION":
                const dailyCredit = Math.floor(credit / parseInt(process.env.CREDIT_LENGTH || "30"));
                volume = await db.volume.create({ data: { amount, userId, credit, dailyCredit, type: "SUBSCRIPTION" } })
                break;
            case "PURCHASE":
                volume = await db.volume.create({ data: { amount, userId, credit, type: "PURCHASE" } })
                break;
        }

        revalidatePath('/admin/pricing')
        return { volume }

    } catch (error) {
        throw error;
    }
}