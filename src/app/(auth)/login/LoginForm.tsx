"use client"

import Loading from '@/app/loading'
import GoogleImage from '@/assets/google.png'
import { PasswordInput } from "@/components/PasswordInput"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginSchema, LoginValues } from "@/lib/validation"
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Image from "next/image"
import Link from 'next/link'
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'
import { login } from './actions'

export default function LoginForm() {

  const [error, setError] = useState<string>("");

  const [isPending, startTransition] = useTransition()

  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onsubmit = async (values: LoginValues) => {
    setError('')
    startTransition(async () => {
      const data = await login(values)
      if (data?.error) {
        toast.error(data?.error)
      }
    })
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className=" text-right space-y-6 my-3">

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
          <p className=" h-10 w-full rounded-lg bg-[#f2a8a8] text-sm text-red-600 flex justify-center items-center" >{error}</p>
        }
        <Button className=" w-full" disabled={isPending}>
          {
            isPending ? <Loading /> : 'Login'
          }
        </Button>
        <Link href={'/forgot-password'} className=" text-sm font-medium w-full hover:underline">
          <p className=' pt-2'>Forgot Password</p>
        </Link>

        {/* or line */}
        <div className=' flex items-center gap-3'>
          <div className=' bg-muted flex-1  h-px' />
          <span className=' font-medium text-sm'>OR</span>
          <div className=' bg-muted flex-1  h-px' />
        </div>

        {/* Google login button */}
        <Button type='button' onClick={() => signIn('google', { callbackUrl: '/' })} className="  gap-2 w-full" variant={'secondary'}>
          <Image src={GoogleImage} width={20} height={20} alt="" />
          Login With Google
        </Button>
      </form>
    </Form>
  )
}