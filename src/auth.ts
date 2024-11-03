import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "../auth.config";
import { getUserById } from "./actions/users";
import { db } from "./lib/prisma";


export const { handlers, signIn, signOut, auth } = NextAuth({
    events: {
        async linkAccount({ user }) {
            if (user.id) {
                await db.credit.create({
                    data: {
                        userId: user.id,
                        credit: 10,
                        type: 'DEFAULT',
                    }
                })
            }
        },
    },
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

            const isOAuth = await db.account.findFirst({ where: { userId: existingUser.id } })

            token.name = existingUser.name
            token.role = existingUser.role
            token.isOAuth = !!isOAuth
            token.emailVerified = existingUser.emailVerified;
            token.subscriptionId = existingUser.subscriptionId

            return token;
        },

        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            session.user.name = token.name as string
            session.user.role = token.role as "ADMIN" | "USER"
            session.user.isOAuth = token.isOAuth as boolean
            session.user.subscriptionId = token.subscriptionId as string
            session.user.emailVerified = token.emailVerified as Date
            return session;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig
})