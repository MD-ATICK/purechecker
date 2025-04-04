import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { getUserByEmail } from "./actions/users";
import { db } from "./lib/prisma";
import authConfig from "./auth.config";


export const { handlers, signIn, signOut, auth } = NextAuth({
    events: {
        async linkAccount({ user }) {
            if (user.id && user.email && user.name) {

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

                if (response.statusText === 'Conflict' || !customer?.data?.id) {
                    const errorDetail = customer?.error?.detail
                    const ctm_Id = errorDetail.slice(errorDetail.indexOf('ctm_'), errorDetail.length)

                    await db.user.update({
                        where: { id: user.id },
                        data: {
                            customerId: ctm_Id
                        }
                    })
                }


                if (customer?.data?.id) {
                    await db.user.update({
                        where: { id: user.id },
                        data: {
                            customerId: customer?.data?.id
                        }
                    })
                }

                await db.userDashboardData.create({
                    data: {
                        userId: user?.id,
                    }
                })

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
            if (account?.provider === 'google' && user.email) {
                // Custom logic to link accounts or handle conflicts
                const existingUser = await getUserByEmail(user.email);
                if (existingUser && existingUser.password) {
                    throw new Error("OAuthAccountNotLinked");
                    // return false;
                }
            }
            return true;
        },
        async jwt({ token }) {

            if (!token.sub) return token;
            const existingUser = await db.user.findFirst({ where: { id: token.sub }, include: { subscriptions: true } })
            if (!existingUser) return token;

            // const isOAuth = await db.account.findFirst({ where: { userId: existingUser.id } })
            const isOAuth = existingUser.password ? false : true

            token.name = existingUser.name
            token.role = existingUser.role
            token.isOAuth = !!isOAuth
            token.emailVerified = existingUser.emailVerified;
            token.customerId = existingUser.customerId;
            token.banned = existingUser.banned
            token.password = existingUser.password
            token.subscriptionId = existingUser.subscriptions.find(subs => subs.status === 'active')?.id

            return token;
        },

        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            session.user.name = token.name as string
            session.user.password = token.password as string || null
            session.user.role = token.role as "ADMIN" | "USER"
            session.user.isOAuth = token.isOAuth as boolean
            session.user.banned = token.banned as boolean
            session.user.subscriptionId = token.subscriptionId as string
            session.user.customerId = token.customerId as string
            session.user.emailVerified = token.emailVerified as Date
            return session;
        }
    },
   secret: process.env.AUTH_SECRET,
    adapter: {
        ...PrismaAdapter(db)
    },
    session: { strategy: "jwt" },
    ...authConfig
})