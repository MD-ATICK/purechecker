"use server";
import { getMxRecords, smtpClientCheck } from "@/actions/emailVerify";
import { db } from "@/lib/prisma";
import {
  getRiskLevel,
  inferRole,
  isDisposableEmail,
  isFreeDomain,
  isValidSyntax,
} from "@/lib/utils";

export const getFiles = async (userId?: string) => {
  if (!userId) {
    return { error: "UnAuthorized!" };
  }
  const files = await db.uploadFile.findMany({ where: { userId } });
  return { files };
};

export const parsingFileEmailCheck = async (email: string) => {
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

export const getVerifyEmailsByFileId = async (fileId: string) => {
  const data = await db.verifyEmail.findMany({
    where: { uploadFileId: fileId },
  });

  return { data };
};
