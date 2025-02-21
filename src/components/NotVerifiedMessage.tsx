"use client";
import { sendEmail } from "@/actions/sendMail";
import { createVerificationToken } from "@/actions/token";
import { getUserByEmail } from "@/actions/users";
import AccountVerification from "@/emails/AccountVerification";
import { render } from "@react-email/components";
import { Mail, Send } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function NotVerifiedMessage({ email }: { email: string }) {
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

  return (
    <div className=" fixed w-full font-semibold md:flex-row md:items-center md:justify-center md:gap-10 flex flex-col gap-2 items-start text-yellow-800 text-sm bg-[#f7edb5] p-3 top-20">
      <div className=" flex items-start gap-3">
        <Mail className=" size-5" />
        <p>Verify Your Account to use all the features.</p>
      </div>
      <Button
        className="mt-2"
        variant={'default'}
        size={'sm'}
        disabled={countTime !== null || isPending}
        onClick={resendVerificationTokenForAccountVerified}
      >
        {isPending
          ? "Sending..."
          : countTime !== null
          ? `Resend mail in ${countTime}`
          : <span className="flex items-center gap-2">Send a Verification Code <Send size={16} /></span>}
      </Button>
    </div>
    // <div className=" h-20 z-50 text-yellow-500 p-2 flex-col bg-[#413907] backdrop-blur-lg border-t-yellow-500 flex  justify-center text-sm gap-3 items-center w-full fixed top-[60px] left-0">

    //     <div className="  text-yellow-300 text-xs sm:text-sm flex text-start gap-3">
    //         <div className=" h-4 aspect-square">
    //             <Info size={16} className="" />
    //         </div>
    //         <span>
    //             Verify Your Account to use all the features
    //         </span>
    //     </div>

    //     <button
    //         className=" text-white text-xs whitespace-nowrap md:text-sm font-medium disabled:text-gray-300 disabled:cursor-not-allowed hover:underline disabled:no-underline"
    //         disabled={(countTime !== null) || isPending}
    //         onClick={resendVerificationTokenForAccountVerified}>
    //         {isPending ? "Sending..." : (countTime !== null) ? `Resend mail in ${countTime}` : 'Send a Verification Code'}
    //     </button>
    // </div>
  );
}
