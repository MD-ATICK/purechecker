import { DefaultSession } from "next-auth";



export type ExtendedUser = DefaultSession['user'] & {
    role: "ADMIN" | "USER",
    isOAuth : boolean
}

declare module 'next-auth' {
    interface Session {
        user: ExtendedUser
    }
}