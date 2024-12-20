"use server"
import { db } from '@/lib/prisma';
import { v4 as uuidV4 } from 'uuid';

export const createVerificationToken = async (email: string) => {
    try {
        const token = uuidV4();
        const expires = new Date(new Date().getTime() + (1000 * 3600))


        const { verificationToken } = await GetDbVerificationTokenByEmail(email)

        if (verificationToken) {
            await db.verificationToken.delete({ where: { id: verificationToken.id } })
        }

        const newVerificationToken = await db.verificationToken.create({
            data: {
                email,
                token,
                expires
            }
        })

        return { verificationToken: newVerificationToken };
    } catch (error) {
        return { error: (error as Error).message }
    }
}


export const GetDbVerificationTokenByEmail = async (email: string) => {
    try {

        const verificationToken = await db.verificationToken.findFirst({ where: { email } })

        if (!verificationToken) return { error: 'Verification token not found' }

        const hasExpired = new Date(verificationToken.expires) < new Date()
        if (hasExpired) return { error: 'token already expired.' }


        return { verificationToken }


    } catch (error) {
        return { error: (error as Error).message }
    }
}

export const GetDbVerificationTokenByToken = async (token: string) => {
    try {

        const verificationToken = await db.verificationToken.findFirst({ where: { token } })


        if (!verificationToken) return { error: 'Verification token not found' }

        const hasExpired = new Date(verificationToken.expires) < new Date()
        if (hasExpired) return { error: 'token already expired.' }

        return { verificationToken }

    } catch (error) {
        return { error: (error as Error).message }
    }
}

