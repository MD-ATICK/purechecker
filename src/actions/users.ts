
"use server"

import { db } from "@/lib/prisma";


export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findFirstOrThrow({ where: { id } })
        return user;
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findFirstOrThrow({ where: { email } })
        return user;
    } catch (error) {
        console.log(error)
        return null
    }
}
