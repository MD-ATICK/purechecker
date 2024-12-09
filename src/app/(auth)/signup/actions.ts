"use server"

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

    // if (process.env.NODE_ENV === 'development') {
    //     const domain = email.split('@')[1];
    //     const mxRecords = await getMxRecords(domain);
    //     const smtpExists = await checkSmtpExistence(email, mxRecords[0]?.exchange);
    //     if (!smtpExists.result) {
    //         return { error: smtpExists.message }
    //     }
    // }

    const hashedPassword = hashSync(password, 10)

    const response = await fetch(`https://sandbox-api.paddle.com/customers`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            name
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer d2fc0d93483be40943d596c118c8577fbcf68c7d88fce33f2e",
        },
    })

    const customer = await response.json()

    if (!response.ok) {        
        return { error: "Something is wrong" }
    }


    if (!customer?.data?.id) {
        return { error: "Something is fun wrong" };
    }

    const user = await db.user.create({
        data: {
            name,
            email,
            customerId: customer?.data?.id,
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