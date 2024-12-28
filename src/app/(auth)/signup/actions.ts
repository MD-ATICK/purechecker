"use server"

import { checkSmtpExistence, getMxRecords } from "@/actions/emailVerify";
import { sendEmail } from "@/actions/sendMail";
import { getUserByEmail } from "@/actions/users";
import { signIn } from "@/auth";
import { db } from "@/lib/prisma";
import { isDisposableEmail } from "@/lib/utils";
import { SignUpSchema, SignUpValues } from "@/lib/validation";
import { User } from "@prisma/client";
import { hashSync } from "bcryptjs";
import { AuthError } from "next-auth";




export const signUp = async (values: SignUpValues, html: string) => {

    const { name, email, password } = SignUpSchema.parse(values)


    if (process.env.NEXT_PUBLIC_SMTP_RUN === 'on') {
        const domain = email.split('@')[1];
        const isDisposable = isDisposableEmail(domain);
        const mxRecords = await getMxRecords(domain);
        const smtpExists = await checkSmtpExistence(email, mxRecords[0]?.exchange);

        if (!smtpExists.result || isDisposable) {
            return { error: "Email is not usable" }
        }
    }

    const existingUser = await getUserByEmail(email)
    if (existingUser) return { error: "Account already has been created" }

    const hashedPassword = hashSync(password, 10)

    const response = await fetch(`${process.env.NEXT_PUBLIC_PADDLE_SANDBOX_API}/customers`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            name
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PADDLE_API_KEY}`,
        },
    })

    const customer = await response.json()



    if (!response.ok && response.statusText !== 'Conflict') {
        return { error: `Something went wrong` }
    }

    let user: User;

    if (response.statusText === 'Conflict' || !customer?.data?.id) {

        const errorDetail = customer?.error?.detail
        const ctm_Id = errorDetail.slice(errorDetail.indexOf('ctm_'), errorDetail.length)

        user = await db.user.create({
            data: {
                name,
                email,
                customerId: ctm_Id,
                password: hashedPassword,
            }
        })

    } else {
        user = await db.user.create({
            data: {
                name,
                email,
                customerId: customer?.data?.id,
                password: hashedPassword,
            }
        })
    }




    await db.credit.create({
        data: {
            userId: user?.id,
            credit: Number(process.env.NEXT_PUBLIC_PER_DAY_FREE_CREDIT || 100),
            type: 'DEFAULT',
        }
    })

    if (user) {
        const subject = `Welcome to PureChecker`
        await sendEmail({ to: user.email!, html, subject, from: 'support@purechecker.com' })
    }


    try {
        await signIn("credentials", { email, password, redirectTo: '/' })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" };
                default:
                    return { error: "Something went wrong!" };
            }
        }
        throw error;
    }

}