<<<<<<< HEAD
import { parsingFileEmailCheck } from "@/app/(main)/(user)/user/verify-emails/test-upload-file/actions";
=======
import { parsingFileEmailCheck } from "@/app/(main)/(user)/user/verify-emails/upload-file/actions";
>>>>>>> fa713f7 (update almost done without blog)
import { db } from "@/lib/prisma";
import { EmailDataDashboard } from "@prisma/client";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
<<<<<<< HEAD
  const { fileId, enterEmails, userId } = await req.json();

  console.log({ fileId, enterEmails, userId });
  if (!fileId || !enterEmails || !userId) {
    return new Response(JSON.stringify({ error: "FileId not provided" }), {
      status: 401,
    });
  }

  const isUserHaveCredit = await db.credit.findFirst({
    where: { userId, credit: { gt: enterEmails.length } },
  });

  if (!isUserHaveCredit) {
    return new Response(
      JSON.stringify({ error: "you don't have enough credit" }),
      {
        status: 401,
      }
    );
  }

  const parseEmails = await Promise.all(
    (enterEmails as string[]).map((email) => parsingFileEmailCheck(email))
  );

  console.log({ userId, fileId, parseEmails });

  await db.verifyEmail.createMany({
    data: parseEmails
      .filter((pe) => pe && typeof pe === "object")
      .map((pe) => ({ ...pe, userId, uploadFileId: fileId })),
  });

  console.log("one");

  await db.uploadFile.update({
    where: { id: fileId },
    data: { status: "COMPLETED" },
  });

  console.log("two");

  await db.credit.update({
    where: { userId, credit: { gt: enterEmails.length } },
    data: {
      credit: {
        decrement: (enterEmails as string[]).length,
      },
    },
  });

  console.log("three");

  const deliverableEmails: EmailDataDashboard[] = parseEmails
    .filter((pe) => pe.isExist)
    .map((pe) => ({
      email: pe.email,
      type: "DELIVERABLE",
      checkedAt: new Date(),
    }));

  const undeliverableEmails: EmailDataDashboard[] = parseEmails
    .filter((pe) => pe.isExist)
    .map((pe) => ({
      email: pe.email,
      type: "UNDELIVERABLE",
      checkedAt: new Date(),
    }));

  await db.userDashboardData.updateMany({
    where: {
      userId,
    },
    data: {
      deliverableEmails: {
        push: deliverableEmails,
      },
      undeliverableEmails: {
        push: undeliverableEmails,
      },
    },
  });
  console.log("four");

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
=======
	const { fileId, enterEmails, userId } = await req.json();

	console.log({ fileId, enterEmails, userId });
	if (!fileId || !enterEmails || !userId) {
		return new Response(JSON.stringify({ error: "FileId not provided" }), {
			status: 401,
		});
	}

	const isUserHaveCredit = await db.credit.findFirst({
		where: { userId, credit: { gt: enterEmails.length } },
	});

	if (!isUserHaveCredit) {
		return new Response(
			JSON.stringify({ error: "you don't have enough credit" }),
			{
				status: 401,
			},
		);
	}

	const parseEmails = await Promise.all(
		(enterEmails as string[]).map(email => parsingFileEmailCheck(email)),
	);

	await db.verifyEmail.createMany({
		data: parseEmails
			.filter(pe => pe && typeof pe === "object")
			.map(pe => ({ ...pe, userId, uploadFileId: fileId })),
	});

	console.log("one");

	await db.uploadFile.update({
		where: { id: fileId },
		data: { status: "COMPLETED" },
	});

	console.log("two");

	await db.credit.update({
		where: { userId, credit: { gt: enterEmails.length } },
		data: {
			credit: {
				decrement: (enterEmails as string[]).length,
			},
		},
	});

	console.log("three");

	const deliverableEmails: EmailDataDashboard[] = parseEmails
		.filter(pe => pe.isExist)
		.map(pe => ({
			email: pe.email,
			type: "DELIVERABLE",
			checkedAt: new Date(),
		}));

	const undeliverableEmails: EmailDataDashboard[] = parseEmails
		.filter(pe => pe.isExist)
		.map(pe => ({
			email: pe.email,
			type: "UNDELIVERABLE",
			checkedAt: new Date(),
		}));

	await db.userDashboardData.updateMany({
		where: {
			userId,
		},
		data: {
			deliverableEmails: {
				push: deliverableEmails,
			},
			undeliverableEmails: {
				push: undeliverableEmails,
			},
		},
	});
	console.log("four");

	return new Response(JSON.stringify({ success: true }), {
		status: 200,
	});
>>>>>>> fa713f7 (update almost done without blog)
}
