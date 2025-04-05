"use server"

import { db } from "@/lib/prisma"


export const userBannedToggle = async (userId: string, banned: boolean) => {
    try {
        const user = await db.user.findFirst({ where: { id: userId } })
        if (!user) return { error: "User not found" }

        await db.user.update({ where: { id: userId }, data: { banned: !banned } })

        return { success: true, message: banned ? `${user.email} Unbanned` : `${user.email} User Banned` }

    } catch (error) {
        return { error: (error as Error).message }
    }
}