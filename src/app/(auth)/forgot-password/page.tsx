"use client"

import { sendEmail } from "@/actions/sendMail";
import { createVerificationToken } from "@/actions/token";
import { getUserByEmail } from "@/actions/users";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResetPassword } from "@/emails/ResetPassword";
import { render } from "@react-email/components";
import Link from "next/link";
import { FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";

export default function ForgetPasswordPage() {

  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition()
  const [countTime, setCountTime] = useState<number | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await resendVerificationTokenForForgotPassword()
  }

  const resendVerificationTokenForForgotPassword = async () => {
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

          const html = await render(<ResetPassword name={user.name!} token={verificationToken.token} />)
          const data = await sendEmail({ to: user.email!, html, subject: `Reset Your PureChecker Account Password ⚡` })
          if (data.error) {
            toast.error(data.error)
            return;
          }
          if (data?.success) {
            toast.success('Reset Password mail sent successfully')
          }

          setCountTime(59)
          setInterval(() => setCountTime((prev) => prev ? prev - 1 : null), 1000)

        }
      })
    }
  }


  return (
    <div className=" p-2 flex flex-col justify-center items-center h-screen">
      <div className=" w-full md:w-1/3">
        <h2>Forgot Password</h2>
        <p className=" text-sm text-gray-400">Please enter your email address to search for your account.</p>
        <br />
        <form onSubmit={handleSubmit} className=" space-y-8">
          <Input placeholder="Enter your email" className=" w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button className=" w-full" asChild disabled={!email || isPending} type="submit">
            {
              isPending ? <Loading /> : (
                <button className=" text-white font-medium disabled:no-underline" disabled={(countTime !== null) || isPending} onClick={resendVerificationTokenForForgotPassword}>{isPending ? "loading..." : (countTime !== null) ? `Resend mail in ${countTime}` : 'Click'}</button>
              )
            }
          </Button>
        </form>
        <br />
        <Link href={'/login'} className=" text-gray-200 text-sm font-medium w-full hover:underline">
          <p className=' pt-2 text-center text-gray-200'>Back to login</p>
        </Link>
      </div>
    </div>

  )
}
