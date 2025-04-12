"use client"
import { Mail, Send } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { createVerificationToken } from "@/actions/token";
import { render } from "@react-email/components";
import { sendEmail } from "@/actions/sendMail";
import AccountVerification from "@/emails/AccountVerification";
import { getUserByEmail } from "@/actions/users";

export default function VerifyAccountMessage({ email }: { email: string }) {
  const pathName = usePathname();
  const [countTime, setCountTime] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const resendVerificationTokenForAccountVerified = async () => {
    if (email) {
      startTransition(async () => {
        const user = await getUserByEmail(email);

        if (!user) {
          toast.error("Email not found");
          return;
        }

        if (!user.password) {
          toast.error("You can't forget password of you google account.");
          return;
        }

        const { error, verificationToken } = await createVerificationToken(
          email
        );
        if (error) {
          toast.error(error);
          return;
        }

        if (verificationToken) {
          const html = await render(
            <AccountVerification
              name={user.name!}
              token={verificationToken.token}
            />
          );
          const data = await sendEmail({
            to: user.email!,
            html,
            subject: `Verify Your Account`,
            type: "info",
          });
          if (data?.success) {
            toast.success("Verification mail sent successfully");
          }

          if (error) {
            toast.error(error);
            return;
          }
          setCountTime(59);
          setInterval(
            () => setCountTime((prev) => (prev ? prev - 1 : null)),
            1000
          );
        }
      });
    }
  };

  useEffect(() => {
    resendVerificationTokenForAccountVerified();
  }, []);

  if (pathName.includes("admin") || pathName.includes("user")) return null;

  return (
    <div className=" w-full font-semibold md:flex-row md:items-center md:justify-center md:gap-5 flex flex-col gap-2 items-start text-green-800 text-sm bg-[#c0f7b5] p-4">
      <div className=" flex items-center text-sm md:text-lg gap-3">
        <Mail className=" size-5 md:size-6" />
        <p>
          Thank you for registering. Compete your registration by clicking the
          validation link we sent to {email}.
        </p>
      </div>
      <Button
        className=""
        variant={"default"}
        disabled={countTime !== null || isPending}
        size={"sm"}
        onClick={resendVerificationTokenForAccountVerified}
      >
        {isPending ? (
          "Sending..."
        ) : countTime !== null ? (
          `Resend mail in ${countTime}`
        ) : (
          <span className="flex items-center gap-2">
            Send a Verification Link <Send size={16} />
          </span>
        )}
      </Button>
    </div>
  );
}
