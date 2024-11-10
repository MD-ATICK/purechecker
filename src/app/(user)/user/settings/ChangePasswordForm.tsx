"use client"
import LoadingButton from "@/components/LoadingButton";
import { PasswordInput } from "@/components/PasswordInput";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangePasswordSchema, ChangePasswordValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { changePassword } from "./actions";

export default function ChangePasswordForm({ user }: { user: User }) {



    const form = useForm<ChangePasswordValues>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })

    const [isPending, startTransition] = useTransition()


    const onsubmit = async (values: ChangePasswordValues) => {
        startTransition(async () => {
            const data = await changePassword(user.id, values)
            if (data.success) {
                toast.success('Password Changed Successfully')
                form.reset()
            }
            if (data.error) {
                toast.error(data.error)
            }
        })
    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)} className=" space-y-6 my-2">
                <div className=" flex items-center justify-between">
                    <div className="flex-1">
                        <h1 className=" text-2xl font-bold">Change your password</h1>
                        <FormDescription className=" text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum maxime quos libero vel magni cupiditate.</FormDescription>
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className=" flex items-center gap-1">Password <FormMessage /></FormLabel>
                            <FormDescription>Enter your new password.</FormDescription>

                            <FormControl>
                                <Input disabled={isPending} placeholder="enter a password" {...field} />
                            </FormControl>

                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className=" flex items-center gap-1">Confirm Password <FormMessage /></FormLabel>
                            <FormDescription>Give Again you new password</FormDescription>

                            <FormControl>
                                <Input type="password" disabled={isPending} placeholder="enter password again" {...field} />
                            </FormControl>

                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className=" flex items-center gap-1">Old Password <FormMessage /></FormLabel>
                            <FormDescription>Enter your old password</FormDescription>

                            <FormControl>
                                <PasswordInput disabled={isPending} placeholder="**************" {...field} />
                            </FormControl>

                        </FormItem>
                    )}
                />

                <div className=" w-full flex justify-end items-end">
                    <LoadingButton isPending={isPending} disabled={isPending} type="submit">
                        Change Password
                    </LoadingButton>
                </div>
            </form>
        </Form>

    )
}
