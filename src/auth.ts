import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "../auth.config";
import { getUserById } from "./actions/users";
import { db } from "./lib/prisma";


export const { handlers, signIn, signOut, auth } = NextAuth({
    events: {
        async linkAccount({ user }) {
            if (user.id) {

                const response = await fetch(`${process.env.NEXT_PUBLIC_PADDLE_SANDBOX_API}/customers`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: user.email,
                        name: user.name
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PADDLE_API_KEY}`,
                    },
                })
                const customer = await response.json()

                if (customer?.data?.id) {
                    await db.user.update({
                        where: { id: user.id },
                        data: {
                            customerId: customer?.data?.id
                        }
                    })
                }

                await db.credit.create({
                    data: {
                        userId: user.id,
                        credit: Number(process.env.NEXT_PUBLIC_PER_DAY_FREE_CREDIT || 100),
                        type: 'DEFAULT',
                    }
                })

                await db.user.update({
                    where: { id: user.id },
                    data: {
                        emailVerified: new Date()
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

                // if (!existingUser.emailVerified) return false;

                return true;
            }

            return true;
        },
        async jwt({ token }) {

            if (!token.sub) return token;
            const existingUser = await db.user.findUnique({ where: { id: token.sub }, include: { subscriptions: true } })
            if (!existingUser) return token;

            const isOAuth = await db.account.findFirst({ where: { userId: existingUser.id } })

            token.name = existingUser.name
            token.role = existingUser.role
            token.isOAuth = !!isOAuth
            token.emailVerified = existingUser.emailVerified;
            token.customerId = existingUser.customerId;
            token.subscriptionId = existingUser.subscriptions.find(subs => subs.status === 'active')?.id

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
            session.user.customerId = token.customerId as string
            session.user.emailVerified = token.emailVerified as Date
            return session;
        }
    },
    adapter: {
        ...PrismaAdapter(db)
    },
    session: { strategy: "jwt" },
    ...authConfig
})