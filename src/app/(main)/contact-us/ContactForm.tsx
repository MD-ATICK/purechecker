"use client"

import LoadingButton from "@/components/LoadingButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import WelcomeEmail from "@/emails/WelcomeMail";
import { FormEvent, useState, useTransition } from "react";
import ReactDOMServer from 'react-dom/server';
import { toast } from "sonner";
import { contactUs } from "./actions";

export default function ContactForm() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [isPending, startTransition] = useTransition()



  const onsubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(async () => {
      const contactUsHtml = ReactDOMServer.renderToStaticMarkup(WelcomeEmail({ userFirstname: name }))
      const data = await contactUs({ name, email, message }, contactUsHtml)
      if (data?.success) {
        toast.success('Message sent successfully')
      }
    })
  }

  return (
    <form onSubmit={onsubmit} className=" flex flex-col gap-6">
      <Input disabled={isPending} value={name} onChange={(e) => setName(e.target.value)} placeholder="enter your name" className=" bg-background h-14" />
      <Input disabled={isPending} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="enter your email" className=" bg-background h-14" />
      <Textarea disabled={isPending} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="enter your message" className=" bg-background h-14" />
      <br />
      <LoadingButton isPending={isPending} type="submit" disabled={isPending} className=" h-14">Send Message</LoadingButton>
    </form>
  )
}
