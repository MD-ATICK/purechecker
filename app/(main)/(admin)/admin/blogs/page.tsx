import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/prisma";
import { formatRelativeDate } from "@/lib/utils";
import { BadgePlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BlogActionButtons from "./BlogActionButtons";

export default async function BlogsPage() {
	const blogs = await db.blog.findMany({
		include: { User: true },
		orderBy: { createdAt: "desc" },
		take: 50,
	});

	return (
		<div>
			<div className=' p-2 flex items-center justify-between'>
				<div className='flex-1'>
					<h1 className=' text-xl font-bold'>Add Blog</h1>
					<p className=' text-muted-foreground text-xs md:text-sm'>
						Add a new blog post to share your insights and engage with your
						audience!
					</p>
				</div>
				<Link href={"/admin/blogs/add"}>
					<Button>
						<BadgePlus />
						Add
					</Button>
				</Link>
			</div>
			<Table className=' w-full'>
				<TableCaption>A list of blogs.</TableCaption>
				<TableHeader>
					<TableRow className=' font-medium'>
						<TableHead className='w-[100px]'>ID</TableHead>
						<TableHead>Image</TableHead>
						<TableHead>Title</TableHead>
						<TableHead>description</TableHead>
						<TableHead>CreatedAt</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{blogs.map(blog => {
						return (
							<TableRow key={blog.id}>
								<TableCell className='w-[100px] font-medium'>
									{blog.id}
								</TableCell>
								<TableCell>
									<div className=' h-16 aspect-square relative'>
										<Image
											alt=''
											fill
											sizes='100px'
											src={blog.image}
											className=' object-cover rounded-sm shadow-sm'
										/>
									</div>
								</TableCell>
								<TableCell>
									{blog.title.length > 20
										? blog.title.slice(0, 20) + "..."
										: blog.title}
								</TableCell>

								<TableCell className=' text-center text-xs'>
									{blog.description.length > 30
										? blog.description.slice(0, 20) + "..."
										: blog.description}
								</TableCell>
								<TableCell className=' text-xs whitespace-nowrap'>
									{formatRelativeDate(blog.createdAt)}
								</TableCell>
								<TableCell>
									<BlogActionButtons blog={blog} />
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}
