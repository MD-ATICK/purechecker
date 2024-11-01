import { getUserByEmail } from "@/actions/users";
import { LoginSchema } from "@/lib/validation";
import { compareSync } from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import google from "next-auth/providers/google";


export default {
    providers: [
        google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        credentials({
            async authorize(credentials) {
                const validate = LoginSchema.safeParse(credentials)

                if (validate.success) {
                    const user = await getUserByEmail(validate.data.email)
                    if (!user || !user.password) return null;

                    const isCorrectPassword = compareSync(validate.data.password, user.password)
                    if (!isCorrectPassword) return null;

                    return user;
                }

                return null;
            }
        })
    ],
} satisfies NextAuthConfig