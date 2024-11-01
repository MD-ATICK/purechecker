"use server"

import { getUserByEmail } from "@/actions/users"
import { signIn } from "@/auth"
import { LoginSchema, LoginValues } from "@/lib/validation"
import { AuthError } from "next-auth"

export const login = async (values: LoginValues) => {

    const { email, password } = LoginSchema.parse(values)

    const existingUser = await getUserByEmail(email)
    if (!existingUser) return { error: "User not found" }

    try {
        await signIn("credentials", { email, password, redirectTo: '/' })

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" };
                default:
                    return { error: "Invalid credentials" };
            }
        }

        throw error;
    }
}