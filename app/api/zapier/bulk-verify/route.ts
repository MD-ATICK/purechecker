import { parsingFileEmailCheck } from "@/app/(main)/(user)/user/verify-emails/upload-file/actions";
import { db } from "@/lib/prisma";
import { EmailDataDashboard } from "@prisma/client";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const data = await req.json();
	const apiKey = req.headers.get("X-API-KEY");

	const enterEmails: string[] = data.emails;
	console.log({ data, enterEmails });

	if (enterEmails.length === 0) {
		return new Response(JSON.stringify({ error: "Email is not valid" }), {
			status: 401,
		});
	}

	if (!apiKey) {
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
		return new Response(JSON.stringify({ error: "Unauthorized token" }), {
			status: 401,
		});
	}

	if (
		apiToken &&
		apiToken.apiRequestLimit &&
		apiToken.apiRequestLimit < enterEmails.length
	) {
		return new Response(
			JSON.stringify({
				error: `You have reached your limit of ${apiToken.apiRequestLimit}`,
			}),
			{
				status: 401,
			},
		);
	}

	const isUserHaveCredit = await db.credit.findFirst({
		where: { userId: apiToken.userId, credit: { gt: enterEmails.length } },
	});

	if (!isUserHaveCredit) {
		return new Response(
			JSON.stringify({ error: "You don't have enough credit" }),
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
			.map(pe => ({ ...pe, userId: apiToken.userId! })),
	});

	await db.credit.update({
		where: { userId: apiToken.userId, credit: { gt: enterEmails.length } },
		data: {
			credit: {
				decrement: (enterEmails as string[]).length,
			},
		},
	});

	const deliverableEmails: EmailDataDashboard[] = parseEmails
		.filter(pe => pe.isExist)
		.map(pe => ({
			email: pe.email,
			type: "DELIVERABLE",
			checkedAt: new Date(),
		}));

	const undeliverableEmails: EmailDataDashboard[] = parseEmails
		.filter(pe => !pe.isExist)
		.map(pe => ({
			email: pe.email,
			type: "UNDELIVERABLE",
			checkedAt: new Date(),
		}));

	const apiUsageEmails: EmailDataDashboard[] = parseEmails.map(pe => ({
		email: pe.email,
		type: "API_USAGE",
		checkedAt: new Date(),
	}));

	await db.userDashboardData.updateMany({
		where: {
			userId: apiToken.userId,
		},
		data: {
			deliverableEmails: {
				push: deliverableEmails,
			},
			undeliverableEmails: {
				push: undeliverableEmails,
			},
			apiUsagesEmails: {
				push: apiUsageEmails,
			},
		},
	});

	return new Response(
		JSON.stringify({
			data: parseEmails.map(({ mxRecords, ...y }) => {
				void mxRecords;

				return y;
			}),
		}),
		{
			status: 200,
		},
	);
}
