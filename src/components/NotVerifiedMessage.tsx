"use client"
import { sendEmail } from "@/actions/sendMail";
import { createVerificationToken } from "@/actions/token";
import { getUserByEmail } from "@/actions/users";
import AccountVerification from "@/emails/AccountVerification";
import { render } from "@react-email/components";
import { Info } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function NotVerifiedMessage({ email }: { email: string }) {

    const [countTime, setCountTime] = useState<number | null>(null);
    const [isPending, startTransition] = useTransition()


    const resendVerificationTokenForAccountVerified = async () => {
        if (email) {
            startTransition(async () => {

                const user = await getUserByEmail(email)

                if (!user) {
                    toast.error("Email not found")
                    return
                }

                if (!user.password) {
                    toast.error("You can't forget password of you google account.")
                    return
                }

                const { error, verificationToken } = await createVerificationToken(email)
                if (error) {
                    toast.error(error)
                    return;
                }

                if (verificationToken) {

                    const html = await render(<AccountVerification name={user.name!} token={verificationToken.token} />)
                    const data = await sendEmail({ to: user.email!, html, subject: `Verify Your Account`, from : 'support@purechecker.com' })
                    if (data?.success) {
                        toast.success('Verification mail sent successfully')
                    }

                    if (error) {
                        toast.error(error)
                        return;
                    }
                    setCountTime(59)
                    setInterval(() => setCountTime((prev) => prev ? prev - 1 : null), 1000)

                }
            })
        }
    }


    return (
        <div className=" h-20 border-t text-yellow-500 p-2 flex-col bg-[#f6d50462] backdrop-blur-lg border-t-yellow-500 flex  justify-center text-sm gap-3 items-center w-full fixed bottom-0 left-0">

            <div className="  text-yellow-300 text-xs sm:text-sm flex text-start gap-3">
                <div className=" h-4 aspect-square">
                    <Info size={16} className="" />
                </div>
                <span>
                    Verify Your Account to use all the features
                </span>
            </div>

            <button className=" text-white text-xs whitespace-nowrap md:text-sm font-medium disabled:text-gray-500 hover:underline disabled:no-underline" disabled={(countTime !== null) || isPending} onClick={resendVerificationTokenForAccountVerified}>{isPending ? "loading..." : (countTime !== null) ? `Resend mail in ${countTime}` : 'Send Verify Mail'}</button>
        </div>
    )
}
