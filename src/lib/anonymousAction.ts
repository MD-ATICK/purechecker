"use server";

import { anonymousUserEmailCheck } from "@/actions/emailVerify";
import { db } from "./prisma";

export const getAllAnonymousUsers = async () => {
  return await db.anonymous.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });
};

export const anonymousUserCheck = async ({ email }: { email: string }) => {
  const ip = await fetch("https://api.ipify.org").then((res) => res.text());

  if (!ip) {
    return { error: "Something went wrong" };
  }

  const anonymousUser = await db.anonymous.findFirst({
    where: { localIp: ip || "127.0.0.1" },
  });

  if (anonymousUser) {
    const haveCredit = anonymousUser.credit > 0 ? true : false;
    if (!haveCredit) {
      return { popup: true };
    }

    const { data } = await anonymousUserEmailCheck({ email });

    await db.anonymous.update({
      where: { id: anonymousUser.id, localIp: ip },
      data: {
        credit: anonymousUser.credit - 1,
      },
    });

    return {
      data,
      message: "Email Check By Old Anonymous User" + anonymousUser.credit,
    };
  }

  await db.anonymous.create({
    data: {
      localIp: ip || "127.0.0.1",
    },
  });

  const { data } = await anonymousUserEmailCheck({ email });

  return { data, message: "Email Check By Created Anonymous User" };
};
