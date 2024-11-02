"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";

export default function ContactForm() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

      const [isPending, startTransition] = useTransition()
      
      const onsubmit = () => {
        startTransition(() => {
            console.log('submitted')
        })
      }

  return (
    <form onSubmit={onsubmit} className=" flex flex-col gap-6">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="enter your name" className=" bg-background h-14" />
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="enter your email" className=" bg-background h-14" />
        <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="enter your message" className=" bg-background h-14" />
        <br />
        <Button type="submit" disabled={isPending} className=" h-14">Send Message</Button>
    </form>
  )
}
