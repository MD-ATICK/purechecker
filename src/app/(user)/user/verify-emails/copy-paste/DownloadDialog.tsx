"use client"
import downloadImage from '@/assets/download.png';
import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DownloadEmailSchema, DownloadEmailValues } from '@/lib/validation';
import { BulkDownloadEmailType, generateCSV, generatePDF, generateXLSX } from '@/utils/BulkConvertFile';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function DownloadDialog({ checkEmails }: { checkEmails: BulkDownloadEmailType[] }) {

    const [open, setOpen] = useState(false);

    const form = useForm<DownloadEmailValues>({
        resolver: zodResolver(DownloadEmailSchema),
        defaultValues: {
            type: "pdf",
            skip: 1,
            take: 1,
            fileName: "",
            filter: "all"
        }
    })

    const [isPending, startTransition] = useTransition()

    const onsubmit = async (values: DownloadEmailValues) => {
        let margeData: BulkDownloadEmailType[] | [] = [];
        margeData = checkEmails.slice((values.skip - 1), values.take)
        margeData = margeData.filter((item) => {
            if (values.filter === "all") {
                return item
            } else if (values.filter === "deliverable") {
                return item.isExist
            } else if (values.filter === "undeliverable") {
                return !item.isExist
            } else if (values.filter === "disposable") {
                return item.isDisposable
            }
        })
        if (margeData.length === 0) {
            return toast.error("No data found")
        }

        startTransition(async () => {
            if (values.type === "pdf") {
                await generatePDF(values.fileName, margeData)
            } else if (values.type === "xlsx") {
                await generateXLSX(values.fileName, margeData)
            } else if (values.type === "csv") {
                await generateCSV(values.fileName, margeData)
            }

            setOpen(false)
        })
    }

    useEffect(() => {
        form.setValue("take", checkEmails.length)
    }, [checkEmails]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='' variant={'outline'} size={'icon'}>
                    <Image alt='' src={downloadImage} className='' height={25} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Download File</DialogTitle>
                <DialogDescription>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, tempora.</DialogDescription>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onsubmit)} className=" space-y-6 my-4">

                        <div className=' grid grid-cols-2 gap-4'>
                            <FormField
                                control={form.control}
                                name="skip"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" flex items-center gap-1">Skip <FormMessage /></FormLabel>
                                        <FormControl>
                                            <Input disabled={false} placeholder="enter skip email number" {...field} />
                                        </FormControl>

                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="take"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className=" flex items-center gap-1">Take <FormMessage /></FormLabel>
                                        <FormControl>
                                            <Input disabled={false} placeholder="enter take email number" {...field} />
                                        </FormControl>

                                    </FormItem>
                                )}
                            />


                        </div>
                        <FormField
                            control={form.control}
                            name="fileName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" flex items-center gap-1">File Name <FormMessage /></FormLabel>
                                    <FormControl>
                                        <Input disabled={false} placeholder="enter your file name" {...field} />
                                    </FormControl>

                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" flex items-center gap-1">Download Type <FormMessage /></FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select A Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pdf">Pdf</SelectItem>
                                            <SelectItem value="xlsx">Xlsx</SelectItem>
                                            <SelectItem value="csv">Csv</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="filter"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" flex items-center gap-1">Filter Type <FormMessage /></FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select A Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="deliverable">Deliverable</SelectItem>
                                            <SelectItem value="undeliverable">UnDeliverable</SelectItem>
                                            <SelectItem value="disposable">Disposable</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <br />
                        <LoadingButton isPending={isPending} disabled={isPending}>Download</LoadingButton>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
