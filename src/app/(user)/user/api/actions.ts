"use server"
import { getUser } from "@/lib/getUser"
import { db } from "@/lib/prisma"
import { generateRandomToken } from "@/lib/utils"
import { ApiTokenValue } from "@/lib/validation"


export const createApiToken = async ({ values, userId }: { values: ApiTokenValue, userId: string }) => {
    try {

        const secretKey = generateRandomToken()

        const apiToken = await db.apiToken.create({
            data: {
                ...values,
                userId: userId,
                secretKey
            }
        })
        return { success: true, apiToken }
    } catch (error) {
        return { error: (error as Error).message }
    }
}


export const deleteApiToken = async (id: string) => {
    try {

        const user = await getUser()
        if (!user || !user.id) {
            throw new Error("Unauthorized")
        }

        await db.apiToken.delete({
            where: {
                id
            }
        })
        return { success: true }
    } catch (error) {
        return { error: (error as Error).message }
    }
}

export const getAllApiTokens = async () => {
    try {

        const user = await getUser()
        if (!user || !user.id || user.role !== 'ADMIN') {
            throw new Error("Unauthorized")
        }

        const apiTokens = await db.apiToken.findMany({orderBy: {createdAt: 'desc'},take: 50, include: { verifyEmails: true, User: true } })
        return { success: true, apiTokens }
    } catch (error) {
        return { error: (error as Error).message }
    }
}

export const getAllApiTokensByUserId = async (userId: string) => {
    try {


        const apiTokens = await db.apiToken.findMany({
            where: {
                userId: userId
            },
            include: {
                verifyEmails: true
            }
        })
        return { success: true, apiTokens }
    } catch (error) {
        return { error: (error as Error).message }
    }
}