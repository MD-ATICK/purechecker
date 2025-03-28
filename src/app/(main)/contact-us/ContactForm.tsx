"use client"

import { sendEmail } from "@/actions/sendMail";
import LoadingButton from "@/components/LoadingButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ContactUsMail from "@/emails/ContactUsMail";
import { emailConfig } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import { render } from "@react-email/components";
import { FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";

export default function ContactForm() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [isPending, startTransition] = useTransition()
  const {user} = useUserStore();


  const onsubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user?.emailVerified) {
      return toast.error('Please verify your email first');
    }

    if (!name || !email || !message) {
      return toast.error('Please fill all the fields ok.')
    }

    startTransition(async () => {
      if (user) {
        const html = await render(<ContactUsMail name={name!} email={email} message={message} />)
        const subject = ` Here ${name} want to contact with us`
        const data = await sendEmail({ html, subject, to: emailConfig['support'].user, type: 'support' })

        if (data?.success) {
          toast.success('Contact message sent successfully')
        }
      }
    })
  }

  return (
    <>
      <form onSubmit={onsubmit} className=" flex flex-col gap-6">
        <Input disabled={isPending} value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className=" h-14" />
        <Input disabled={isPending} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className=" h-14" />
        <Textarea disabled={isPending} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter your message" className=" h-14" />
        <br />
        <LoadingButton isPending={isPending} type="submit" disabled={isPending} className=" h-14">Send Message</LoadingButton>
      </form>
    </>
  )
}
