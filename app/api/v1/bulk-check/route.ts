import { parsingFileEmailCheck } from "@/app/(main)/(user)/user/verify-emails/upload-file/actions";
import { db } from "@/lib/prisma";
import { EmailDataDashboard } from "@prisma/client";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const userId = req.headers.get("x-user-id");
		const secretKey = req.headers.get("x-secret-key");
		const enterEmails: string[] = await req.json();

		if (enterEmails.length === 0) {
			return new Response(JSON.stringify({ error: "Email is not valid" }), {
				status: 401,
			});
		}

		if (!userId || !secretKey) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
			});
		}

		const apiToken = await db.apiToken.findFirst({
			where: {
				userId,
				secretKey,
			},
			include: {
				User: true,
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

		parseEmails.map(async data => {
			if (apiToken.User?.zapierBulkWebhookUrl) {
				console.log("webhook", apiToken.User?.zapierBulkWebhookUrl);
				await fetch(apiToken.User?.zapierBulkWebhookUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: data.email,
						domain: data.domain,
						reason: data.reason,
						isExist: data.isExist ? "yes" : "no",
						isValidSyntax: data.isValidSyntax ? "yes" : "no",
						isValidDomain: data.isValidDomain ? "yes" : "no",
						riskLevel: data.riskLevel,
						isDisposable: data.isDisposable ? "yes" : "no",
						free: data.free ? "yes" : "no",
						role: data.role,
					}),
				});
			}
		});

		await db.verifyEmail.createMany({
			data: parseEmails
				.filter(pe => pe && typeof pe === "object")
				.map(pe => ({ ...pe, userId })),
		});

		await db.credit.update({
			where: { userId, credit: { gt: enterEmails.length } },
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
				userId,
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

		return new Response(JSON.stringify({ data: parseEmails }), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ error: (error as Error).message }), {
			status: 500,
		});
	}
}
