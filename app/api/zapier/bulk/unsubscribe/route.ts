import { db } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
	const apiKey = req.headers.get("X-API-KEY");

	console.log({ apiKey });

	if (!apiKey) {
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
			zapierBulkWebhookUrl: null,
		},
	});

	console.log({ user });
	return new Response(JSON.stringify({ success: true }), {
		status: 200,
	});
}
