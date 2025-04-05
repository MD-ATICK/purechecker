import { DefaultSession } from "next-auth";



export type ExtendedUser = DefaultSession['user'] & {
    role: "ADMIN" | "USER",
    isOAuth: boolean,
    subscriptionId: string,
    customerId: string,
    emailVerified: Date | null,
    banned: boolean,
    password: string | null
}

declare module 'next-auth' {
    interface Session {
        user: ExtendedUser
    }
}