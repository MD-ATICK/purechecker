"use server";
import { db } from "@/lib/prisma";
import disposableDomains from "disposable-email-domains";
import dns from "dns";
import freeDomains from "free-email-domains";
import net from "net";
import { SMTPClient } from "smtp-client";
import axios from "axios";

export const anonymousUserEmailCheck = async ({ email }: { email: string }) => {
  try {
    const domain = email.split("@")[1];
    const free = isFreeDomain(domain);
    const role = inferRole(email) || "user";
    const isDisposable = isDisposableEmail(domain);
    const mxRecords = await getMxRecords(domain);

    const smtpExists = await smtpClientCheck({
      email,
      mxRecord: mxRecords[0]?.exchange,
    });
    const riskLevel = getRiskLevel(isDisposable, smtpExists.result);

    const data = {
      email,
      domain,
      reason: smtpExists.message,
      isExist: smtpExists.result,
      isValidSyntax: isValidSyntax(email),
      isValidDomain: mxRecords.length > 0 ? true : false,
      riskLevel,
      mxRecords,
      isDisposable,
      free,
      role,
    };

    return { data };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

export const ServiceEmailCheck = async ({ email }: { email: string }) => {
  const domain = email.split("@")[1];
  const free = isFreeDomain(domain);
  const role = inferRole(email) || "user";
  const isDisposable = isDisposableEmail(domain);
  const mxRecords = await getMxRecords(domain);

  const smtpExists = await smtpClientCheck({
    email,
    mxRecord: mxRecords[0]?.exchange,
  });

  const riskLevel = getRiskLevel(isDisposable, smtpExists.result);

  return {
    email,
    domain,
    reason: smtpExists.message,
    isExist: smtpExists.result,
    isValidSyntax: isValidSyntax(email),
    isValidDomain: mxRecords.length > 0 ? true : false,
    riskLevel,
    mxRecords,
    isDisposable,
    free,
    role,
  };
};

// singleBulkEmailVerify
export const emailCheck = async ({
  email,
  userId,
  uploadFileId,
  apiTokenId,
  forApi,
}: {
  email: string;
  userId: string;
  uploadFileId?: string;
  apiTokenId?: string;
  forApi?: boolean;
}) => {
  const domain = email.split("@")[1];
  const free = isFreeDomain(domain);
  const role = inferRole(email) || "user";
  const isDisposable = isDisposableEmail(domain);
  const mxRecords = await getMxRecords(domain);

  // * it's my method
  // const smtpExists = await checkSmtpExistence(email, mxRecords[0]?.exchange);

  // * it's provided by cilent
  const smtpExists = await smtpClientCheck({
    email,
    mxRecord: mxRecords[0]?.exchange,
  });
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
  };

  if (smtpExists.result) {
    if (forApi) {
      await db.userDashboardData.updateMany({
        where: { userId },
        data: {
          deliverableEmails: {
            push: {
              email,
              type: "DELIVERABLE",
            },
          },
          apiUsagesEmails: {
            push: {
              email,
              type: "API_USAGE",
            },
          },
        },
      });
    } else {
      await db.userDashboardData.updateMany({
        where: { userId },
        data: {
          deliverableEmails: {
            push: {
              email,
              type: "DELIVERABLE",
            },
          },
        },
      });
    }
  } else {
    if (forApi) {
      await db.userDashboardData.updateMany({
        where: { userId },
        data: {
          undeliverableEmails: {
            push: {
              email,
              type: "UNDELIVERABLE",
            },
          },
          apiUsagesEmails: {
            push: {
              email,
              type: "API_USAGE",
            },
          },
        },
      });
    } else {
      await db.userDashboardData.updateMany({
        where: { userId },
        data: {
          undeliverableEmails: {
            push: {
              email,
              type: "UNDELIVERABLE",
            },
          },
        },
      });
    }
  }

  const result = await db.verifyEmail.create({
    data,
  });

  return { data: result };
};

export const smtpClientCheck = async ({
  email,
  mxRecord,
}: {
  email: string;
  mxRecord: string;
}) => {
  try {
    const client = new SMTPClient({
      host: mxRecord,
      port: 25, // or 587 for TLS
    });
    await client.connect();
    await client.greet({ hostname: "mail.purechecker.com" });
    await client.mail({ from: "test1@purechecker.com" });
    await client.rcpt({ to: email });
    await client.quit();

    return { result: true, message: "Ok" };
  } catch (error) {
    return {
      result: false,
      message: (error as Error).message
        .toLowerCase()
        .includes("service unavailable")
        ? "Service Unavailable: Blocked by Spamhaus"
        : (error as Error).message.toLowerCase().includes("does not exist")
        ? "Email address does not exist"
        : (error as Error).message.toLowerCase().includes("mailbox unavailable")
        ? "Mailbox is temporarily unavailable"
        : "NOT OK",
    };
  }
};

export const checkHaveCreditForBulkCheck = async (
  checkEmailCount: number,
  userId: string
) => {
  try {
    const isUserHaveCredit = await db.credit.findFirst({
      where: { userId: userId, credit: { gte: checkEmailCount } },
    });
    if (!isUserHaveCredit) {
      return { error: "you don't have enough credit" };
    }
    return {
      success: true,
      creditId: isUserHaveCredit.id,
      credit: isUserHaveCredit.credit,
    };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

export const reduceCredit = async (
  checkEmailCount: number,
  userId: string,
  creditId: string,
  credit: number
) => {
  try {
    await db.credit.update({
      where: { id: creditId, userId, credit: { gte: checkEmailCount } },
      data: {
        credit: credit - checkEmailCount,
      },
    });

    return { success: true };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

// this used in only searchField and single check api
export const singleCheckEmailVerify = async ({
  email,
  userId,
  apiTokenId,
  forApi,
}: {
  email: string;
  userId: string;
  apiTokenId?: string;
  forApi?: boolean;
}) => {
  try {
    if (!email || !isValidSyntax(email)) {
      return { error: "Email is not valid" };
    }

    const user = await db.user.findFirst({ where: { id: userId } });
    if (!user || !user.id) return { error: "Please login first to get access" };

    if (user.zapierWebhookUrl) {
      console.log("run zapier webhook validate");

      await axios.post(user.zapierWebhookUrl, {
        type: "validate",
        userId: user.id,
      });
    }

    if (!user?.emailVerified)
      return { error: "Please verify your email first" };

    const isUserHaveCredit = await db.credit.findFirst({
      where: { userId: user.id, credit: { gt: 0 } },
    });

    if (!isUserHaveCredit) {
      return { error: "you don't have enough credit" };
    }

    const { data } = await emailCheck({
      email,
      userId: user.id,
      apiTokenId,
      forApi,
    });

    await db.credit.update({
      where: { id: isUserHaveCredit.id, userId: user.id, credit: { gt: 0 } },
      data: {
        credit: isUserHaveCredit.credit - 1,
      },
    });

    return { data };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

function isFreeDomain(domain: string): boolean {
  return freeDomains.includes(domain);
}

function inferRole(email: string) {
  const prefix = email.split("@")[0];
  let role = "user";

  if (
    prefix.startsWith("admin") ||
    prefix.startsWith("info") ||
    prefix.startsWith("support")
  ) {
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

export async function checkSmtpExistence(
  email: string,
  mxHost: string
): Promise<{ result: boolean; message: string }> {
  return new Promise((resolve) => {
    const client = net.createConnection(25, mxHost);
    let result = false;
    let message = "";

    client.setTimeout(10000);

    client.on("connect", () => {
      // SMTP handshake initiation
      client.write(`EHLO ${mxHost}\r\n`);
      client.write(`MAIL FROM:<test@${mxHost}>\r\n`);
      client.write(`RCPT TO:<${email}>\r\n`);
    });

    client.on("data", (data) => {
      const response = data.toString();
      console.count("---------------------" + email + "---------------------");
      switch (true) {
        case response.includes("550-5.1.1"):
          result = false;
          message = "Email address does not exist";
          break;
        case response.includes("550 5.7.1"):
          result = false;
          message = "Service Unavailable:  Blocked by Spamhaus";
          break;
        // case response.includes('554'):
        //     result = false
        //     message = "Transaction failed: generic error";
        //     break;
        case response.includes("5.7.1"):
          result = false;
          message = "Message rejected due to policy reasons";
          break;
        default:
          result = false;
          message = "Unknown error occurred";
          break;
        case response.includes("250") || response.includes("220"):
          message = "OK";
          result = true; // Email exists
          break;
      }

      client.end();
    });

    client.on("timeout", () => {
      console.error("SMTP request timed out");
      resolve({ result: false, message: "Request timed out" }); // Timeout likely means no reliable response
      client.end();
    });

    client.on("error", (error) => {
      console.error("SMTP Error:", error.message);
      resolve({ result: false, message: error.message }); // Network or connection error; treat as non-existent
      client.end();
    });

    client.on("end", () => {
      resolve({ result, message }); // Resolve based on the last `result` value
    });
  });
}
