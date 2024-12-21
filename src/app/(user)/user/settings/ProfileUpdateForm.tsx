"use client"
import LoadingButton from "@/components/LoadingButton";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserProfileUpdateSchema, UserProfileUpdateValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateUserProfile } from "./actions";

export default function ProfileUpdateForm({ user }: { user: User }) {



    const form = useForm<UserProfileUpdateValues>({
        resolver: zodResolver(UserProfileUpdateSchema),
        defaultValues: {
            name: user.name || undefined,
            address: user.address || undefined,
            country: user.country || undefined,
            state: user.state || undefined,
            city: user.city || undefined,
            mobile: user.mobile || undefined,
            image: user.image || undefined
        }
    })

    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const onsubmit = async (values: UserProfileUpdateValues) => {
        startTransition(async () => {
            const data = await updateUserProfile(user.id, values)
            if (data.success) {
                toast.success('Profile Updated Successfully')
                router.refresh()
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
                        <h1 className=" text-2xl font-bold">Change your profile</h1>
                        <FormDescription className=" text-muted-foreground">Update your profile information to keep your account details accurate and up to date.</FormDescription>
                    </div>
                </div>
                <div className=" grid grid-cols-1 gap-6 items-center justify-between">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" flex items-center gap-1">Name <FormMessage /></FormLabel>
                                <FormDescription>Enter your own choose name.</FormDescription>

                                <FormControl>
                                    <Input disabled={isPending} placeholder="email" {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" flex items-center gap-1">Mobile <FormMessage /></FormLabel>
                                <FormDescription>Give me your mobile number.</FormDescription>

                                <FormControl>
                                    <Input disabled={isPending} placeholder="mobile" {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />
                </div>
                <div className=" grid grid-cols-1 gap-6 items-center justify-between">
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" flex items-center gap-1">City <FormMessage /></FormLabel>
                                <FormDescription>Write your city</FormDescription>

                                <FormControl>
                                    <Input disabled={isPending} placeholder="city" {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" flex items-center gap-1">Country <FormMessage /></FormLabel>
                                <FormDescription>Write your country</FormDescription>

                                <FormControl>
                                    <Input disabled={isPending} placeholder="Country" {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />
                </div>
                <div className=" grid grid-cols-1 gap-6 items-center justify-between">
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" flex items-center gap-1">Address <FormMessage /></FormLabel>
                                <FormDescription>Write your address</FormDescription>
                                <FormControl>
                                    <Input disabled={isPending} placeholder="Address" {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className=" flex items-center gap-1">State <FormMessage /></FormLabel>
                                <FormDescription>Write your state</FormDescription>

                                <FormControl>
                                    <Input disabled={isPending} placeholder="State" {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />
                </div>
                <div className=" w-full flex justify-end items-end">
                    <LoadingButton isPending={isPending} disabled={isPending} type="submit">
                        Change Profile
                    </LoadingButton>
                </div>
            </form>
        </Form>

    )
}
