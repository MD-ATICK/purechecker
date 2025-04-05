"use client";

import GoogleImage from "@/assets/google.png";
import Loading from "@/components/Loading";
import { PasswordInput } from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema, LoginValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { login } from "./actions";

export default function LoginForm() {
  const [error, setError] = useState<string>("");

  const [isPending, startTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();

  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const searchParams = useSearchParams();
  const paramsError = searchParams.get("error"); //

  const onsubmit = async (values: LoginValues) => {
    setError("");
    startTransition(async () => {
      const data = await login(values);
      if (data?.error) {
        setError(data?.error);
      }
    });
  };

  const googleLoginHandler = async () => {
    startGoogleTransition(async () => {
      await signIn("google", { callbackUrl: "/" });
    });
  };

  useEffect(() => {
    if (paramsError === "OAuthAccountNotLinked") {
      setError("Another Account Created With This Email");
    }
  }, [paramsError]);

  return (
    <div className=" space-y-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onsubmit)}
          className=" text-right space-y-4 my-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" flex items-center gap-1">
                  Email <FormMessage />
                </FormLabel>
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
                <FormLabel className=" flex items-center gap-1">
                  Password <FormMessage />
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    disabled={isPending}
                    placeholder="password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {error && (
            <div className=" h-12 w-full gap-2 text-xs sm:text-sm rounded-lg bg-destructive/10 text-destructive flex justify-center items-center">
              <Info size={16} />
              <p>{error}</p>
            </div>
          )}
          <Button className=" w-full" disabled={isPending}>
            {isPending ? <Loading className=" text-white" /> : "Login"}
          </Button>
        </form>
      </Form>

      <Link
        href={"/forgot-password"}
        className=" text-end text-sm text-muted-foreground font-medium w-full hover:underline"
      >
        <p className=" pt-">Forgot Password</p>
      </Link>

      {/* or line */}
      {/* <div className=' flex items-center gap-3'>
          <div className=' bg-primary/20 flex-1  h-px' />
          <span className=' font-medium text-xs'>OR</span>
          <div className=' bg-primary/20 flex-1  h-px' />
        </div> */}

      {/* Google login button */}
      <Button
        type="button"
        onClick={googleLoginHandler}
        className="  gap-2 w-full"
        variant={"outline"}
      >
        {isGooglePending ? (
          <Loading />
        ) : (
          <>
            <Image src={GoogleImage} width={20} height={20} alt="" />
            <p>Continue with Google</p>
          </>
        )}
      </Button>
    </div>
  );
}
