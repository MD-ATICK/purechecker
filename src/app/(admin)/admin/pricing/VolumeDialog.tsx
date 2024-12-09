"use client"

import editImage from '@/assets/blog.png';
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
import { Volume } from "@prisma/client";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createVolume, updateVolume } from "./actions";



export default function VolumeDialog({ userId, volume }: { userId: string, volume?: Volume }) {

    const [open, setOpen] = useState(false);

    const [error, setError] = useState<string>("");
    const router = useRouter()

    const [isPending, startTransition] = useTransition()


    const form = useForm<VolumeValues>({
        resolver: zodResolver(VolumeSchema),
        defaultValues: volume || {
            perCreditPrice: 0,
            credit: 0,
            paddlePriceId: "",
            type: "PURCHASE",
        }
    })
    const discountCalculate = form.watch('type') === "PURCHASE" ? Math.floor(((20 - (Number(form.watch("perCreditPrice")) * 10000)) / 20) * 100) || 0 : 0
    const amountCalculate = form.watch('type') === "SUBSCRIPTION" ?
        (Number(form.watch("perCreditPrice")) * Number(form.watch('credit') / 30) || 0) :
        (Number(form.watch("perCreditPrice")) * Number(form.watch('credit')) || 0)

    const onsubmit = async (values: VolumeValues) => {
        setError('')
        startTransition(async () => {

            const data = volume ?
                await updateVolume(volume.id, { ...values, discount: discountCalculate, credit: Number(values.credit), amount: amountCalculate, userId })
                :
                await createVolume({
                    // paddlePriceId: values.paddlePriceId,
                    // perCreditPrice: values.perCreditPrice,
                    ...values,
                    discount: discountCalculate,
                    credit: Number(values.credit),
                    type: values.type,
                    amount: amountCalculate,
                    userId
                })
            if (data.volume) {
                toast.success('Volume Created Successfully')
                setOpen(false)
                router.refresh()
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
                {
                    volume ?
                        <Button size={'icon'}>
                            <Image alt="" className=" invert" src={editImage} height={15} />
                        </Button>
                        :
                        <Button>
                            Add Volume
                        </Button>
                }
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    Add Volume
                </DialogTitle>
                {/* <DialogDescription>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vero!
                </DialogDescription> */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onsubmit)} className=" space-y-4 my-4">

                        <FormField
                            control={form.control}
                            name="paddlePriceId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" flex items-center gap-1">
                                        Paddle Price Id.
                                        <Link className=' text-primary underline' href={'https://sandbox-vendors.paddle.com/products-v2'}>Go Now</Link>
                                        <FormMessage />
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="text" disabled={isPending} placeholder="enter paddle price id" {...field} />
                                    </FormControl>

                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="perCreditPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" flex items-center gap-1">Per Credit Price ($) <FormMessage /></FormLabel>
                                    <FormControl>
                                        <Input type="text" disabled={isPending} placeholder="enter amount" {...field} />
                                    </FormControl>

                                </FormItem>
                            )}
                        />

                        <FormItem>
                            <FormLabel className=" flex items-center gap-1">Amount <FormMessage /></FormLabel>
                            <FormControl>
                                <Input type="text" value={amountCalculate} disabled={true} placeholder="enter amount" />
                            </FormControl>
                        </FormItem>


                        <FormItem>
                            <FormLabel className=" flex items-center gap-1">Discount <FormMessage /></FormLabel>
                            <FormControl>
                                <Input type="text" value={discountCalculate} disabled={true} placeholder="enter amount" />
                            </FormControl>
                        </FormItem>

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
                                    <Input type="text" value={Math.floor(Number(form.watch("credit")) / Number(process.env.NEXT_PUBLIC_SUBSCRIPTION_DAY_LENGTH || "30"))} disabled={true} placeholder="enter amount" />
                                </FormControl>
                            </FormItem>
                        }

                        {
                            !volume &&
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
                        }

                        {
                            error &&
                            <p className=" h-10 w-full rounded-lg bg-[#f2a8a8] text-sm text-red-600 flex justify-center items-center" >{error}</p>
                        }
                        <LoadingButton className=" w-full" isPending={isPending} disabled={isPending}>Create</LoadingButton>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
