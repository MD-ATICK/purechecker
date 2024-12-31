"use server"
import { db } from '@/lib/prisma';
import disposableDomains from 'disposable-email-domains';
import dns from 'dns';
import freeDomains from 'free-email-domains';
import net from 'net';

// singleBulkEmailVerify
export const emailCheck = async ({ email, userId, uploadFileId, apiTokenId }: { email: string, userId: string, uploadFileId?: string, apiTokenId?: string }) => {
    const domain = email.split('@')[1];
    const free = isFreeDomain(domain);
    const role = inferRole(email) || "user";
    const isDisposable = isDisposableEmail(domain);
    const mxRecords = await getMxRecords(domain);
    const smtpExists = await checkSmtpExistence(email, mxRecords[0]?.exchange);
    const riskLevel = getRiskLevel(isDisposable, smtpExists.result);


    const data = {
        userId: userId,
        email,
        domain,
        reason: smtpExists.message,
        isExist: smtpExists.result,
        isValidSyntax: isValidSyntax(email),
        isValidDomain: mxRecords.length > 0 ? true : false,
        riskLevel,
        mxRecords,
        isDisposable,
        uploadFileId,
        apiTokenId,
        free,
        role,
    }

    const result = await db.verifyEmail.create({
        data
    })

    return { data: result }

}

export const checkHaveCreditForBulkCheck = async (checkEmailCount: number, userId: string) => {
    try {
        const isUserHaveCredit = await db.credit.findFirst({ where: { userId: userId, credit: { gte: checkEmailCount } } })
        if (!isUserHaveCredit) {
            return { error: "you don't have enough credit" }
        }
        return {
            success: true,
            creditId: isUserHaveCredit.id,
            credit: isUserHaveCredit.credit
        }
    } catch (error) {
        return { error: (error as Error).message }
    }
}

export const reduceCredit = async (checkEmailCount: number, userId: string, creditId: string, credit: number) => {
    try {
        await db.credit.update({
            where: { id: creditId, userId, credit: { gte: checkEmailCount } },
            data: {
                credit: (credit - checkEmailCount)
            },

        })

        return { success: true }

    } catch (error) {
        return { error: (error as Error).message }
    }
}



// this used in only searchField and single check api
export const singleCheckEmailVerify = async (email: string, userId: string, apiTokenId?: string) => {
    try {

        if (!email || !isValidSyntax(email)) {
            return { error: "Email is not valid" }
        }

        const user = await db.user.findFirst({ where: { id: userId } })
        if (!user || !user.id) return { error: "Please login first to get access" }

        if (!user?.emailVerified) return { error: "Please verify your email first" }

        const isUserHaveCredit = await db.credit.findFirst({ where: { userId: user.id, credit: { gt: 0 } } })

        if (!isUserHaveCredit) {
            return { error: "you don't have enough credit" }
        }

        const { data } = await emailCheck({ email, userId: user.id, apiTokenId })

        await db.credit.update({
            where: { id: isUserHaveCredit.id, userId: user.id, credit: { gt: 0 } },
            data: {
                credit: (isUserHaveCredit.credit - 1)
            }
        })

        return { data }

    } catch (error) {
        return { error: (error as Error).message }

    }
}


function isFreeDomain(domain: string): boolean {
    return freeDomains.includes(domain);
}

function inferRole(email: string) {
    const prefix = email.split("@")[0];
    let role = "user";

    if (prefix.startsWith("admin") || prefix.startsWith("info") || prefix.startsWith("support")) {
        role = "admin";
    }

    return role;
}

// Basic syntax check
function isValidSyntax(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Assess risk level based on checks
function getRiskLevel(disposable: boolean, smtpExists: boolean): string {
    if (!smtpExists) return "high";
    if (disposable) return "medium";
    return "low";
}
// Check if the email domain is disposable
function isDisposableEmail(domain: string): boolean {
    return disposableDomains.includes(domain);
}

// Retrieve MX records for a domain
export async function getMxRecords(domain: string): Promise<dns.MxRecord[]> {
    try {
        return await dns.promises.resolveMx(domain);
    } catch (error) {
        console.error("Error fetching MX records:", error);
        return [];
    }
}



export async function checkSmtpExistence(email: string, mxHost: string): Promise<{ result: boolean, message: string }> {
    return new Promise((resolve) => {

        const client = net.createConnection(25, mxHost);
        let result = false;
        let message = '';


        client.setTimeout(10000);

        client.on('connect', () => {
            // SMTP handshake initiation
            client.write(`EHLO ${mxHost}\r\n`);
            client.write(`MAIL FROM:<test@${mxHost}>\r\n`);
            client.write(`RCPT TO:<${email}>\r\n`);
        });

        client.on('data', (data) => {
            const response = data.toString();

            switch (true) {
                case response.includes('550-5.1.1'):
                    result = false
                    message = "Email address does not exist";
                    break;
                case response.includes('550 5.7.1'):
                    result = false
                    message = "Service Unavailable:  Blocked by Spamhaus";
                    break;
                // case response.includes('554'):
                //     result = false
                //     message = "Transaction failed: generic error";
                //     break;
                case response.includes('5.7.1'):
                    result = false
                    message = "Message rejected due to policy reasons";
                    break;
                default:
                    result = false
                    message = "Unknown error occurred";
                    break;
                case response.includes('250') || response.includes('220'):
                    message =  'OK'
                    result = true; // Email exists
                    break;
            }

            client.end();
        });

        client.on('timeout', () => {
            console.error("SMTP request timed out");
            resolve({ result: false, message: "Request timed out" }); // Timeout likely means no reliable response
            client.end();
        });

        client.on('error', (error) => {
            console.error("SMTP Error:", error.message);
            resolve({ result: false, message: error.message }); // Network or connection error; treat as non-existent
            client.end();
        });

        client.on('end', () => {
            resolve({ result, message }); // Resolve based on the last `result` value
        });
    });
}
