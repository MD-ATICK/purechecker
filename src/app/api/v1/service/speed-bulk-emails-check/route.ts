import { NextRequest } from "next/server";
import { ServiceEmailCheck } from "@/actions/emailVerify";

type CheckedEmailType = {
  email: string;
  domain: string;
  reason: string;
  isExist: boolean;
  isValidSyntax: boolean;
  isValidDomain: boolean;
  riskLevel: string;
  mxRecords: { exchange: string; priority: number }[];
  isDisposable: boolean;
  free: boolean;
  role: string;
};

export async function POST(req: NextRequest) {
  const emails: string[] = await req.json();
  const serviceKey = req.headers.get("service-key");
  const serviceEmail = req.headers.get("service-email");

  if (!emails.length) {
    return new Response(JSON.stringify({ error: "Email is not valid" }), {
      status: 401,
    });
  }

  if (serviceKey !== "@#$abc123") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  if (serviceEmail !== "atick.business.info@gmail.com") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const checkedEmails: CheckedEmailType[] = [];

  for (const email of emails) {
    const data = await ServiceEmailCheck({ email: email.trim() });
    if (data) {
      checkedEmails.push(data);
    }
  }

  return new Response(JSON.stringify({ checkedEmails }), {
    status: 201,
  });
}
