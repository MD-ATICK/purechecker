import { checkSmtpExistence, getMxRecords } from "@/actions/emailVerify";
import { db } from "@/lib/prisma";
import { getRiskLevel, isDisposableEmail, isValidSyntax } from "@/lib/utils";
import { VerifyEmail } from "@prisma/client";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const email = "atick@gmail.com"; // This seems like a static test value. You might want to replace it with dynamic logic.
        const userId = req.headers.get('x-user-id');
        const secretKey = req.headers.get('x-secret-key');
        const bulkEmails: string[] = await req.json()

        if (bulkEmails.length === 0) {
            return new Response(JSON.stringify({ error: "Email is not valid" }), {
                status: 401
            })
        }

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

        if (apiToken && apiToken.limit && apiToken.limit <= (apiToken.verifyEmails.length + bulkEmails.length)) {
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

        const isUserHaveCredit = await db.credit.findFirst({ where: { userId: user.id, credit: { gt: bulkEmails.length } } })

        if (!isUserHaveCredit) {
            return new Response(JSON.stringify({ error: "you don't have enough credit" }), {
                status: 401
            })
        }

        const results: VerifyEmail[] = [];  // Initialize the results array

        // Use for loop instead of map to handle async code properly
        for (const email of bulkEmails) {
            const domain = email.split('@')[1];
            const isDisposable = isDisposableEmail(domain);
            const mxRecords = await getMxRecords(domain);
            const smtpExists = await checkSmtpExistence(email, mxRecords[0]?.exchange);
            const riskLevel = getRiskLevel(isDisposable, smtpExists.result);

            const verifyEmailData = {
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

            const result = await db.verifyEmail.create({
                data: {
                    ...verifyEmailData,
                    apiTokenId: apiToken?.id
                },
            })

            results.push(result) // Push the result into the initialized array
        }

        // Decrease the credit after processing all emails
        await db.credit.update({
            where: { id: isUserHaveCredit.id, userId: user.id, credit: { gt: 0 } },
            data: {
                credit: (isUserHaveCredit.credit - bulkEmails.length)
            }
        })

        return new Response(JSON.stringify({ data: results }), {
            status: 200
        })

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: (error as Error).message }), {
            status: 500
        })
    }
}
