"use client";

import editImage from "@/assets/blog.png";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ApiTokenSchema, ApiTokenValue } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiToken } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createApiToken } from "./actions";
import { Plus } from "lucide-react";

export default function ApiTokenCreateDialog({
	userId,
	apiToken,
}: {
	userId: string;
	apiToken?: ApiToken;
}) {
	const [open, setOpen] = useState(false);

	const [error, setError] = useState<string>("");
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const form = useForm<ApiTokenValue>({
		resolver: zodResolver(ApiTokenSchema),
		defaultValues: {
			apiName: apiToken?.apiName || "",
			apiRequestLimit: apiToken?.apiRequestLimit || undefined,
		},
	});

	const onsubmit = async (values: ApiTokenValue) => {
		setError("");
		startTransition(async () => {
			const data = await createApiToken({ values, userId });
			if (data.success) {
				toast.success("Api Token Created Successfully");
				setOpen(false);
				router.refresh();
			}
			if (data.error) {
				setError(data.error);
			}
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<div className=' max-w-2xl flex justify-end items-center w-full'>
					{apiToken ? (
						<Button size={"icon"} className=''>
							<Image alt='' className=' invert' src={editImage} height={15} />
						</Button>
					) : (
						<Button>
							<Plus /> Generate Token
						</Button>
					)}
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Generate Token</DialogTitle>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onsubmit)}
						className=' space-y-4 my-4'
					>
						<FormField
							control={form.control}
							name='apiRequestLimit'
							render={({ field }) => (
								<FormItem>
									<FormLabel className=' flex items-center gap-1'>
										Api Limit{" "}
										<span className=' opacity-80 font-medium'>(optoinal)</span>{" "}
										<FormMessage />
									</FormLabel>
									<FormControl>
										<Input
											type='text'
											disabled={isPending}
											placeholder='enter api limit'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='apiName'
							render={({ field }) => (
								<FormItem>
									<FormLabel className=' flex items-center gap-1'>
										Api Name <FormMessage />
									</FormLabel>
									<FormControl>
										<Input
											type='text'
											disabled={isPending}
											placeholder='enter api name'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						{error && (
							<p className=' h-10 w-full rounded-lg bg-[#f2a8a8] text-sm text-red-600 flex justify-center items-center'>
								{error}
							</p>
						)}
						<LoadingButton
							className=' w-full'
							isPending={isPending}
							disabled={isPending}
						>
							Generate
						</LoadingButton>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
