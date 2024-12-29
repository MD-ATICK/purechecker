"use client"

import Loading from "@/app/loading"
import { PasswordInput } from "@/components/PasswordInput"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import WelcomeEmail from "@/emails/WelcomeMail"
import { SignUpSchema, SignUpValues } from "@/lib/validation"
import { zodResolver } from '@hookform/resolvers/zod'
import { render } from "@react-email/components"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { signUp } from "./actions"


export default function SignUpForm() {

  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition()

  const form = useForm<SignUpValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      name: '',
      password: ''
    }
  })

  const onsubmit = async (values: SignUpValues) => {
    setError('')
    startTransition(async () => {
      const html = await render(<WelcomeEmail name={form.getValues('name')} />)
      const data = await signUp(values, html)
      if (data?.error) {
        toast.error(data?.error)
      }
    })
  }




  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className=" space-y-4 my-4">

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" flex items-center gap-1">Name <FormMessage /></FormLabel>
              <FormControl>
                <Input disabled={isPending} placeholder="name" {...field} />
              </FormControl>

            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" flex items-center gap-1">Email <FormMessage /></FormLabel>
              <FormControl>
                <Input disabled={isPending} placeholder="email" {...field} />
              </FormControl>

            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" flex items-center gap-1">Password <FormMessage /></FormLabel>
              <FormControl>
                <PasswordInput disabled={isPending} placeholder="password" {...field} />
              </FormControl>

            </FormItem>
          )}
        />
        {
          error &&
          <p className=" h-10 w-full rounded-lg bg-[#f9a0a0] text-sm text-red-600 flex justify-center items-center" >{error}</p>
        }
        <Button className=" w-full" disabled={isPending}>
          {
            isPending ? <Loading /> : 'Sign Up'
          }
        </Button>
      </form>
    </Form>
  )
}