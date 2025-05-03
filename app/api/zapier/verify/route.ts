import { parsingFileEmailCheck } from "@/app/(main)/(user)/user/verify-emails/upload-file/actions";
import { db } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const data = await req.json();
	const apiKey = req.headers.get("X-API-KEY");

	console.log({ apiKey });
	const email = data.email;

	if (!apiKey || !email) {
		return new Response(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
		});
	}

	const apiToken = await db.apiToken.findFirst({
		where: {
			secretKey: apiKey,
		},
	});

	if (!apiToken || !apiToken.userId) {
		return new Response(JSON.stringify({ error: "Invalid api key" }), {
			status: 401,
		});
	}
	const isUserHaveCredit = await db.credit.findFirst({
		where: { userId: apiToken.userId, credit: { gt: 1 } },
	});

	if (!isUserHaveCredit) {
		return new Response(
			JSON.stringify({ error: "you don't have enough credit" }),
			{
				status: 401,
			},
		);
	}

	const parseData = await parsingFileEmailCheck(email);

	await db.credit.update({
		where: { userId: apiToken.userId, credit: { gt: 1 } },
		data: {
			credit: {
				decrement: 1,
			},
		},
	});

	if (parseData.isExist) {
		await db.userDashboardData.updateMany({
			where: {
				userId: apiToken.userId,
			},
			data: {
				deliverableEmails: {
					push: {
						email: parseData.email,
						type: "DELIVERABLE",
						checkedAt: new Date(),
					},
				},
				apiUsagesEmails: {
					push: {
						email: parseData.email,
						type: "API_USAGE",
						checkedAt: new Date(),
					},
				},
			},
		});
	} else {
		await db.userDashboardData.updateMany({
			where: {
				userId: apiToken.userId,
			},
			data: {
				undeliverableEmails: {
					push: {
						email: parseData.email,
						type: "UNDELIVERABLE",
						checkedAt: new Date(),
					},
				},
				apiUsagesEmails: {
					push: {
						email: parseData.email,
						type: "API_USAGE",
						checkedAt: new Date(),
					},
				},
			},
		});
	}

	const { mxRecords, ...y } = parseData;
	void mxRecords;

	return new Response(JSON.stringify(y), {
		status: 200,
	});
}
