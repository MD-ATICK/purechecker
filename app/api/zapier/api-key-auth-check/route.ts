import { db } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
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

    return new Response(JSON.stringify(apiToken.User), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
    });
  }
}
