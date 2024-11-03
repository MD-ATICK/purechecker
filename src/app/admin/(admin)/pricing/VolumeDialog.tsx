"use client"

import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { VolumeSchema, VolumeValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createVolume } from "./actions";



export default function VolumeDialog({ userId }: { userId: string }) {

    const [open, setOpen] = useState(false);

    const [error, setError] = useState<string>("");

    const [isPending, startTransition] = useTransition()

    const form = useForm<VolumeValues>({
        resolver: zodResolver(VolumeSchema),
        defaultValues: {
            amount: undefined,
            credit: undefined,
            type: undefined
        }
    })

    const onsubmit = async (values: VolumeValues) => {
        setError('')
        startTransition(async () => {
            const data = await createVolume({ credit: parseInt(values.credit), type: values.type, amount: parseInt(values.amount), userId })
            if (data.volume) {
                console.log(data.volume)
                toast.success('Volume Created Successfully')
                setOpen(false)
            }
            if (data?.error) {
                toast.error(data?.error)
            }
        })
    }


    const isSubscription = form.watch('type') === 'SUBSCRIPTION'


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    Add Volume
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    Add Volume
                </DialogTitle>
                <DialogDescription>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vero!
                </DialogDescription>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onsubmit)} className=" space-y-4 my-4">

                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" flex items-center gap-1">Amount ($) <FormMessage /></FormLabel>
                                    <FormControl>
                                        <Input type="text" disabled={isPending} placeholder="enter amount" {...field} />
                                    </FormControl>

                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="credit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" flex items-center gap-1">Credit <FormMessage /></FormLabel>
                                    <FormControl>
                                        <Input type="text" disabled={isPending} placeholder="enter amount" {...field} />
                                    </FormControl>

                                </FormItem>
                            )}
                        />

                        {
                            isSubscription &&
                            <FormItem>
                                <FormLabel className=" flex items-center gap-1">Daily Credit <FormMessage /></FormLabel>
                                <FormControl>
                                    <Input type="text" value={Math.floor(parseInt(form.watch("credit")) / parseInt(process.env.NEXT_PUBLIC_CREDIT_LENGTH || "30"))} disabled={true} placeholder="enter amount" />
                                </FormControl>
                            </FormItem>
                        }

                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" flex items-center gap-1">Amount <FormMessage /></FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select A Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PURCHASE">Purchase</SelectItem>
                                            <SelectItem value="SUBSCRIPTION">Subscription</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        {
                            error &&
                            <p className=" h-10 w-full rounded-lg bg-[#f2a8a8] text-sm text-red-600 flex justify-center items-center" >{error}</p>
                        }
                        <br />
                        <LoadingButton className=" w-full" isPending={isPending} disabled={isPending}>Create</LoadingButton>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
