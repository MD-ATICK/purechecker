import { getBlogBySlug } from "@/app/(main)/(admin)/admin/blogs/actions";
import leftChevron from "@/assets/left-chevron.png";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
	const data = await getBlogBySlug((await params)?.slug);

	return {
		title: data.blog?.title,
		description: data.blog?.description,
		openGraph: {
			title: data.blog?.title,
			description: data.blog?.description,
			images: [
				{
					url: data.blog?.image, // Replace with your image URL
					width: 1200,
					height: 630,
					alt: data.blog?.title,
				},
			],
		},
	};
}

export default async function SingleBlog({ params }: PageProps) {
	if (!(await params)?.slug) {
		return notFound();
	}

	const data = await getBlogBySlug((await params)?.slug);

	if (data.error || !data.blog) {
		return notFound();
	}

	const { image, title, htmlContent, createdAt, slug } = data.blog;

	return (
		<div className=' max-w-5xl mx-auto p-2 space-y-6 py-4 md:py-10'>
			<Link
				href={"/blog"}
				className=' text-muted-foreground hover:text-white text-xs md:text-lg flex items-center gap-2'
			>
				<Image alt='' src={leftChevron} className=' dark:invert' height={10} />
				<p>blog</p>
				<Image alt='' src={leftChevron} className=' dark:invert' height={10} />
				<p>{slug}</p>
			</Link>
			<div className=' '>
				<div className='w-full flex-1 aspect-[3/2] rounded-lg relative'>
					<Image
						alt={title}
						src={image}
						fill
						sizes='1000px'
						className=' rounded-lg object-cover'
					/>
				</div>
				<div>
					<h2 className=' text-4xl font-bold text-primary'>
						{title} Lorem ipsum dolor sit amet consectetur elit. Maxime?
					</h2>
					<p className=' text-muted-foreground'>
						{format(createdAt, "MMM dd, yyyy")}
					</p>
				</div>
			</div>
			<div dangerouslySetInnerHTML={{ __html: htmlContent }} />
		</div>
	);
}
