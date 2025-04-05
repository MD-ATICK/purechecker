"use server"

import { getUserByEmail } from "@/actions/users"
import { signIn } from "@/auth"
import { LoginSchema, LoginValues } from "@/lib/validation"
import { compareSync } from "bcryptjs"
import { AuthError } from "next-auth"

export const login = async (values: LoginValues) => {

    const { email, password } = LoginSchema.parse(values)

    const existingUser = await getUserByEmail(email)
    if (!existingUser) return { error: "Account was not created with this email" }

    const userHasPassword = existingUser.password !== null
    if (!userHasPassword) return { error: "You can't login with this account" }

    const verifyPassword = existingUser.password && compareSync(password, existingUser.password)
    if (!verifyPassword) return { error: "Invalid credentials" }

    try {
        await signIn("credentials", { email, password, redirectTo: '/' })

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials provided" };
                default:
                    return { error: error.message };
            }
        }

        throw error;
    }
}