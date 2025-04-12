"use client";

import deleteImage from "@/assets/delete.png";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Blog } from "@prisma/client";
import { PenTool } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteBlog } from "./actions";

export default function BlogActionButtons({ blog }: { blog: Blog }) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const onDelete = async () => {
		startTransition(async () => {
			const data = await deleteBlog(blog.id);
			if (data.success) {
				toast.success("Blog Deleted Successfully");
				router.refresh();
			}
			if (data.error) {
				toast.error(data.error);
			}
		});
	};

	return (
		<div className=' flex items-center justify-center gap-2'>
			<Link href={`/admin/blogs/edit/${blog.id}`}>
				<Button size={"icon"}>
					<PenTool />
				</Button>
			</Link>
			<LoadingButton
				size={"icon"}
				className=' bg-red-600'
				disabled={isPending}
				isPending={isPending}
				onClick={onDelete}
			>
				<Image alt='' className='  invert' src={deleteImage} height={20} />
			</LoadingButton>
		</div>
	);
}
