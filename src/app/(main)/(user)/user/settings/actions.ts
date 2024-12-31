"use server"

import { db } from "@/lib/prisma"
import { ChangePasswordValues, ForgotPasswordValues, UserProfileUpdateValues } from "@/lib/validation"
import { compareSync, hashSync } from "bcryptjs"

export const updateUserProfile = async (userId: string, values: UserProfileUpdateValues) => {

    try {

        if (values.mobile && (values.mobile.length < 8 || values.mobile.length > 15)) {
            return { error: "Invalid mobile number" }
        }

        await db.user.update({ where: { id: userId }, data: { ...values } })

        return { success: true }
    } catch (error) {
        return { error: (error as Error).message }
    }
}

export const changePassword = async (userId: string, values: ChangePasswordValues) => {

    try {

        const user = await db.user.findUnique({ where: { id: userId } })

        if (!user || !user.password) {
            return { error: "Something went wrong!" }
        }

        if (values.password !== values.confirmPassword) {
            return { error: "Password doesn't match" }
        }

        const verifyPassword = compareSync(values.oldPassword, user.password)

        if (!verifyPassword) {
            return { error: "Invalid credentials" }
        }

        const hashPassword = hashSync(values.password, 10)

        await db.user.update({ where: { id: userId }, data: { password: hashPassword } })

        return { success: true }
    } catch (error) {

        return { error: (error as Error).message }
    }
}
export const resetPassword = async (email: string, values: ForgotPasswordValues) => {

    try {

        const user = await db.user.findUnique({ where: { email } })

        if (!user || !user.password) {
            return { error: "Something went wrong!" }
        }

        if (values.password !== values.confirmPassword) {
            return { error: "Password doesn't match" }
        }


        const hashPassword = hashSync(values.password, 10)

        await db.user.update({ where: { email }, data: { password: hashPassword } })

        return { success: true }
    } catch (error) {

        return { error: (error as Error).message }
    }
}