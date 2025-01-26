// src/app/api/get-ip/route.js
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const headers = req.headers;
  const ip = headers.get("x-forwarded-for") || headers.get("x-real-ip");

  return NextResponse.json({ ip });
}
