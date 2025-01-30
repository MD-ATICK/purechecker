import { emailCheck } from "@/actions/emailVerify";
import { db } from "@/lib/prisma";
import { VerifyEmail } from "@prisma/client";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const userId = req.headers.get('x-user-id');
        const secretKey = req.headers.get('x-secret-key');
        const bulkEmails: string[] = await req.json()

        if (bulkEmails.length === 0) {
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


        if (apiToken && apiToken.apiRequestLimit && (apiToken.apiRequestLimit < bulkEmails.length)) {
            return new Response(JSON.stringify({ error: "you have reached your limit" }), {
                status: 401
            })
        }

        const user = await db.user.findUnique({ where: { id: userId } })
        if (!user || !user.id) {
            return new Response(JSON.stringify({ error: 'Invalid Headers Sent' }), {
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
            const { data } = await emailCheck({ email: email.trim(), userId, apiTokenId: apiToken.id, forApi: true }) // Push the result into the initialized array
            if (data) {
                results.push(data)
            }
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
