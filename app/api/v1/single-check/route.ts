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
      }
    });

    if (!apiToken) {
      return new Response(JSON.stringify({ error: "Unauthorized token" }), {
        status: 401,
      });
    }

    const { error, data } = await singleCheckEmailVerify({
      email: email.trim(),
      userId,
      apiTokenId: apiToken.id,
      forApi: true,
    });


    

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
