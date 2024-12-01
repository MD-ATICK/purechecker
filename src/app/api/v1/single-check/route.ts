import { checkSmtpExistence, getMxRecords } from "@/actions/emailVerify";
import { db } from "@/lib/prisma";
import { getRiskLevel, isDisposableEmail, isValidSyntax } from "@/lib/utils";
import { NextRequest } from "next/server";


export const dynamic = 'force-dynamic'; // Mark the route as dynamic


export async function GET(req: NextRequest) {
    try {
        const email = "atick@gmail.com";
        const userId = req.headers.get('x-user-id');
        const secretKey = req.headers.get('x-secret-key');

        if (!email || !isValidSyntax(email)) {
            return new Response(JSON.stringify({ error: "Email is not valid" }), {
                status: 401
            })
        }

        if (!userId || !secretKey) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401
            })
        }

        const apiToken = await db.apiToken.findFirst({
            where: {
                userId,
                secretKey
            },
            include: {
                verifyEmails: true
            }
        })


        if (!apiToken) {
            return new Response(JSON.stringify({ error: "Unauthorized token" }), {
                status: 401
            })
        }

        if (apiToken && apiToken.limit && apiToken.limit <= apiToken.verifyEmails.length) {
            return new Response(JSON.stringify({ error: "you have reached your limit" }), {
                status: 401
            })
        }

        const user = await db.user.findFirst({ where: { id: userId } })
        if (!user || !user.id) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401
            })

        }

        const isUserHaveCredit = await db.credit.findFirst({ where: { userId: user.id, credit: { gt: 0 } } })

        if (!isUserHaveCredit) {
            return new Response(JSON.stringify({ error: "you don't have enough credit" }), {
                status: 401
            })
        }


        if (process.env.NODE_ENV === 'development') {
            const domain = email.split('@')[1];
            const isDisposable = isDisposableEmail(domain);
            const mxRecords = await getMxRecords(domain);
            const smtpExists = await checkSmtpExistence(email, mxRecords[0]?.exchange);
            const riskLevel = getRiskLevel(isDisposable, smtpExists.result);


            const data = {
                userId: user.id,
                email,
                domain,
                reason: smtpExists.message,
                isExist: smtpExists.result,
                isValidSyntax: isValidSyntax(email),
                isValidDomain: mxRecords.length > 0 ? true : false,
                riskLevel,
                mxRecords,
                isDisposable,
            }

            await db.credit.update({
                where: { id: isUserHaveCredit.id, userId: user.id, credit: { gt: 0 } },
                data: {
                    credit: (isUserHaveCredit.credit - 1)
                }
            })

            const result = await db.verifyEmail.create({
                data: {
                    ...data,
                    apiTokenId: apiToken?.id
                },

            })

            return new Response(JSON.stringify({ data: result }), {
                status: 200
            })


        }


        const data = {
            userId: userId,
            email: 'mdatick866@gmail.com',
            domain: 'gmail.com',
            reason: "pure email address",
            isExist: true,
            isValidSyntax: true,
            isValidDomain: true,
            riskLevel: 'low',
            mxRecords: [{ exchange: 'gmail-smtp-in.l.google.com', priority: 0 }],
            isDisposable: false,
        }

        await db.credit.update({
            where: { id: isUserHaveCredit.id, userId: user.id, credit: { gt: 0 } },
            data: {
                credit: (isUserHaveCredit.credit - 1)
            }
        })

        const result = await db.verifyEmail.create({
            data: {
                ...data,
                apiTokenId: apiToken?.id
            },

        })

        return new Response(JSON.stringify({ data: result }), {
            status: 200
        })


    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: (error as Error).message }), {
            status: 500
        })
    }
}

