"use server"

import { checkSmtpExistence, getMxRecords } from "@/actions/emailVerify"
import { getUserByEmail } from "@/actions/users"
import { signIn } from "@/auth"
import { db } from "@/lib/prisma"
import { SignUpSchema, SignUpValues } from "@/lib/validation"

import { hashSync } from "bcryptjs"
import { AuthError } from "next-auth"

export const signUp = async (values: SignUpValues) => {

    const { name, email, password } = SignUpSchema.parse(values)

    const existingUser = await getUserByEmail(email)
    if (existingUser) return { error: "Email already exists" }

    if (process.env.NODE_ENV === 'development') {
        const domain = email.split('@')[1];
        const mxRecords = await getMxRecords(domain);
        const smtpExists = await checkSmtpExistence(email, mxRecords[0]?.exchange);
        if (!smtpExists.result) {
            return { error: smtpExists.message }
        }
    }

    const hashedPassword = hashSync(password, 10)

    const user = await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    })

    await db.credit.create({
        data: {
            userId: user.id,
            credit: Number(process.env.NEXT_PUBLIC_PER_DAY_FREE_CREDIT || 100),
            type: 'DEFAULT',
        }
    })

    try {
        await signIn("credentials", { email, password, redirectTo: '/' })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" };
                default:
                    return { error: "Something is wrong!" };
            }
        }
        throw error;
    }

}