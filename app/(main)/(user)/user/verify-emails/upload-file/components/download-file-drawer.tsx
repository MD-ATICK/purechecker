"use client";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DownloadEmailSchema, DownloadEmailValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download } from "lucide-react";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { getVerifyEmailsByFileId } from "../actions";
import {
	generateCSV,
	generatePDF,
	generateXLSX,
} from "@/utils/BulkConvertFile";
import { toast } from "sonner";

export default function DownloadFileDrawer({ fileId }: { fileId: string }) {
	const [open, setOpen] = useState(false);
	const [isPending, startTransaction] = useTransition();

	const form = useForm<DownloadEmailValues>({
		resolver: zodResolver(DownloadEmailSchema),
		defaultValues: {
			type: "pdf",
			fileName: "",
			filter: "all",
		},
	});

	const onsubmit = async (values: DownloadEmailValues) => {
		startTransaction(async () => {
			const { data } = await getVerifyEmailsByFileId({
				fileId,
				filter: values.filter,
			});
			console.log(data);

			switch (values.type) {
				case "pdf":
					await generatePDF(values.fileName, data);
					break;
				case "csv":
					generateCSV(values.fileName, data);
					break;
				case "xlsx":
					generateXLSX(values.fileName, data);
					break;
				default:
					console.error("Unsupported file type");
					break;
			}
			toast.success("file download successful");
			setOpen(false);
		});
	};

	return (
		<div>
			<Drawer open={open} onOpenChange={setOpen}>
				<DrawerTrigger asChild>
					<Button>
						<Download /> Download
					</Button>
				</DrawerTrigger>
				<DrawerContent>
					<div className='p-3 md:max-w-2xl mx-auto'>
						<DialogTitle className=' font-bold'>
							<div className='flex items-center gap-3'>
								<div className=' h-9 aspect-square flex justify-center items-center rounded-md bg-primary/10 text-primary'>
									<Download size={20} />
								</div>
								<h1 className=' mb-4'>Download File</h1>
							</div>
						</DialogTitle>
						<DialogDescription>
							Download your email verification results as a file for easy
							access, review, and record-keeping.
						</DialogDescription>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onsubmit)}
								className=' space-y-6 my-8'
							>
								<FormField
									control={form.control}
									name='fileName'
									render={({ field }) => (
										<FormItem>
											<FormLabel className=' flex items-center gap-1'>
												File Name <FormMessage />
											</FormLabel>
											<FormControl>
												<Input
													disabled={false}
													placeholder='enter your file name'
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='type'
									render={({ field }) => (
										<FormItem>
											<FormLabel className=' flex items-center gap-1'>
												Download Type <FormMessage />
											</FormLabel>
											<Select
												value={field.value}
												onValueChange={field.onChange}
											>
												<SelectTrigger className='w-full'>
													<SelectValue placeholder='Select A Type' />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='pdf'>Pdf</SelectItem>
													<SelectItem value='xlsx'>Xlsx</SelectItem>
													<SelectItem value='csv'>Csv</SelectItem>
												</SelectContent>
											</Select>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='filter'
									render={({ field }) => (
										<FormItem>
											<FormLabel className=' flex items-center gap-1'>
												Filter Type <FormMessage />
											</FormLabel>
											<Select
												value={field.value}
												onValueChange={field.onChange}
											>
												<SelectTrigger className='w-full'>
													<SelectValue placeholder='Select A Type' />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='all'>All</SelectItem>
													<SelectItem value='deliverable'>
														Deliverable
													</SelectItem>
													<SelectItem value='undeliverable'>
														UnDeliverable
													</SelectItem>
													<SelectItem value='disposable'>Disposable</SelectItem>
												</SelectContent>
											</Select>
										</FormItem>
									)}
								/>
								<br />
								<LoadingButton
									isPending={isPending}
									disabled={isPending}
									className=' w-full h-12'
								>
									Download
								</LoadingButton>
							</form>
						</Form>
					</div>
				</DrawerContent>
			</Drawer>
		</div>
	);
}
