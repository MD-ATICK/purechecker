import { db } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const data = await req.json();
	const apiKey = req.headers.get("X-API-KEY");

	const hookUrl = data.hookUrl;
	console.log({ data, apiKey });

	if (!apiKey || !hookUrl) {
		return new Response(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
		});
	}

	const apiToken = await db.apiToken.findFirst({
		where: {
			secretKey: apiKey,
		},
		include: {
			User: true,
		},
	});

	if (!apiToken || !apiToken.User) {
		return new Response(JSON.stringify({ error: "Invalid api key" }), {
			status: 401,
		});
	}

	const user = await db.user.update({
		where: { id: apiToken.User.id },
		data: {
			zapierBulkWebhookUrl: hookUrl,
		},
	});

	console.log({ user });
	return new Response(JSON.stringify({ success: true }), {
		status: 200,
	});
}
