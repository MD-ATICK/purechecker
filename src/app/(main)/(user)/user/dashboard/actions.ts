"use server"

import { getUser } from "@/lib/getUser"
import { db } from "@/lib/prisma"

export const getHeaderStatsData = async () => {

    try {

        const nextAuthUser = await getUser()
        if (!nextAuthUser || !nextAuthUser.id) {
            return { error: "Unauthorized Access" }
        }

        const user = await db.user.findUnique({ where: { id: nextAuthUser.id }, include: { verifyEmails: true, apis: { include: { verifyEmails: true } } } })

        if (!user || !user.id) {
            return { error: "Something went wrong" }
        }

        const deliverable = user.verifyEmails.filter((email) => email.isExist).length
        const unDeliverable = user.verifyEmails.filter((email) => !email.isExist).length
        const apiUsage = user.apis.reduce((acc, curr) => acc + curr.verifyEmails.length, 0)
        return { deliverable, unDeliverable, apiUsage }
    } catch (error) {
        return { error: (error as Error).message }
    }
}

export interface getLast14DayMailVerifyData {
    day: string
    deliverable: number,
    unDeliverable: number,
    apiUsage: number
}


export const getLast14DayMailVerifyData = async (userId: string) => {
    const last14DaysData: getLast14DayMailVerifyData[] = []
    const currentDate = new Date()

    for (let i = 14; i > 0; i--) {
        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - (i - 1));
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - (i - 2));
        const dayName = startDate.toLocaleDateString('en-US', { month: "short", day: "numeric" });

        const userEmails = await db.verifyEmail.findMany({ where: { userId, createdAt: { gte: startDate, lte: endDate } } })

        const deliverable = userEmails.filter((email) => email.isExist).length
        const unDeliverable = userEmails.filter((email) => !email.isExist).length
        const apiUsage = (await db.apiToken.findMany({ where: { userId: userId, createdAt: { gte: startDate, lte: endDate } }, include: { verifyEmails: true } })).reduce((acc, curr) => acc + curr.verifyEmails.length, 0)

        last14DaysData.push({ day: dayName, deliverable, unDeliverable, apiUsage })

    }

    return last14DaysData;
}