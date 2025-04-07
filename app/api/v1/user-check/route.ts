import { db } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "email not provided" }), {
        status: 401,
      });
    }

    const user = await db.user.findFirst({ where: { email } });

    if (!user) {
      return new Response(JSON.stringify({ error: "user not found" }), {
        status: 401,
      });
    }

    return new Response(JSON.stringify({ user }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
    });
  }
}
