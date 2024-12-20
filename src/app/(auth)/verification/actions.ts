"use server"

import { GetDbVerificationTokenByToken } from "@/actions/token"
import { getUserByEmail } from "@/actions/users"
import { db } from "@/lib/prisma"



export const verifyToken = async (token: string) => {
    const { verificationToken } = await GetDbVerificationTokenByToken(token)
    if (!verificationToken) return { error: 'Something went wrong!' }

    const hasExpired = new Date(verificationToken.expires) < new Date()
    if (hasExpired) return { error: 'token already expired.' }

    const findUser = await getUserByEmail(verificationToken.email)
    if (!findUser) return { error: 'user does not exist.' }

    await db.user.update({
        where: { id: findUser.id }, data: {
            emailVerified: new Date(),
            email: findUser.email
        }
    })

    await db.verificationToken.delete({ where: { id: verificationToken.id } })

    return { success: 'verified successfully.', verificationToken }
}