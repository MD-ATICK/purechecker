"use client"

import Loading from "@/components/Loading"
import { PasswordInput } from "@/components/PasswordInput"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import WelcomeEmail from "@/emails/WelcomeMail"
import { SignUpSchema, SignUpValues } from "@/lib/validation"
import { zodResolver } from '@hookform/resolvers/zod'
import { render } from "@react-email/components"
import { Info } from "lucide-react"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
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
        setError(data?.error)
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
          <div className=" h-12 w-full gap-2 text-xs sm:text-sm rounded-lg bg-[#ff1c1c2e] border border-red-600  text-red-400 flex justify-center items-center" >
            <Info size={16} />
            <p>
              {error}
            </p>
          </div>
        }
        <Button className=" w-full" disabled={isPending}>
          {
            isPending ? <Loading className=" text-white" /> : 'Sign Up'
          }
        </Button>
      </form>
    </Form>
  )
}