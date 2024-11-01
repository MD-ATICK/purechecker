import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "../auth.config";
import { getUserById } from "./actions/users";
import { db } from "./lib/prisma";


export const { handlers, signIn, signOut, auth } = NextAuth({
    callbacks: {

        async signIn({ user, account }) {
            if (account?.provider === "credentials") {
                const existingUser = await getUserById(String(user.id))
                if (!existingUser) return false

                return true;
            }

            return true;
        },
        async jwt({ token }) {

            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub)
            if (!existingUser) return token;

            token.name = existingUser.name
            token.emailVerified = existingUser.emailVerified;

            return token;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            session.user.name = token.name as string
            session.user.emailVerified = token.emailVerified as Date
            return session;
        }

    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig
})