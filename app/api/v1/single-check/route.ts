import { singleCheckEmailVerify } from "@/actions/emailVerify";
import { db } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const email = new URL(req.url).searchParams.get("email");
		const userId = req.headers.get("x-user-id");
		const secretKey = req.headers.get("x-secret-key");

		if (!userId || !secretKey) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
			});
		}

		if (!email?.trim()) {
			return new Response(JSON.stringify({ error: "Email is not valid" }), {
				status: 401,
			});
		}

		const apiToken = await db.apiToken.findFirst({
			where: {
				userId,
				secretKey,
			},
		});

		if (!apiToken) {
			return new Response(JSON.stringify({ error: "Unauthorized token" }), {
				status: 401,
			});
		}

		const { error, data, webhookUrl } = await singleCheckEmailVerify({
			email: email.trim(),
			userId,
			apiTokenId: apiToken.id,
			forApi: true,
		});

		if (webhookUrl) {
			try {
				// Send the data to the respective Zapier webhook URL
				const response = await fetch(webhookUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				});
				console.log({ message: "Gone", body: await response.json() });

				if (!response.ok) {
					throw new Error("Error sending data to Zapier webhook");
				}
			} catch (error) {
				return new Response(
					JSON.stringify({ error: (error as Error).message }),
					{
						status: 401,
					},
				);
			}
		}

		if (error) {
			return new Response(JSON.stringify({ error }), {
				status: 401,
			});
		}

		return new Response(JSON.stringify({ data }), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ error: (error as Error).message }), {
			status: 500,
		});
	}
}
