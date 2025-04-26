import { db } from "@/lib/prisma";

export async function GET() {
	try {
		const data = await db.verifyEmail.findMany({
			take: 2,
			select: {
				email: true,
				domain: true,
				reason: true,
				isExist: true,
				isDisposable: true,
				isValidSyntax: true,
				isValidDomain: true,
				riskLevel: true,
				free: true,
				role: true,
			},
		});
		return new Response(
			JSON.stringify(
				data.map(item => ({
					email: item.email,
					domain: item.domain,
					reason: item.reason,
					isExist: item.isExist ? "yes" : "no",
					isValidSyntax: item.isValidSyntax ? "yes" : "no",
					isValidDomain: item.isValidDomain ? "yes" : "no",
					riskLevel: item.riskLevel,
					isDisposable: item.isDisposable ? "yes" : "no",
					free: item.free ? "yes" : "no",
					role: item.role,
				})),
			),
			{
				status: 200,
			},
		);
	} catch (error) {
		return new Response(
			JSON.stringify({ error: "Wrong api key" + (error as Error).message }),
			{
				status: 401,
			},
		);
	}
}
