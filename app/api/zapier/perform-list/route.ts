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
				mxRecords: true,
			},
		});
		return new Response(JSON.stringify(data), {
			status: 200,
		});
	} catch (error) {
		return new Response(
			JSON.stringify({ error: "Wrong api key" + (error as Error).message }),
			{
				status: 401,
			},
		);
	}
}
