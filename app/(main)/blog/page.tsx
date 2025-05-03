import ErrorPage from "@/components/ErrorPage";
import Loading from "@/components/Loading";
import { db } from "@/lib/prisma";
import { Metadata } from "next";
import BlogCard from "./BlogCard";

export const metadata: Metadata = {
	title: "Blog",
};

export default async function BlogPage() {
	const blogs = await db.blog.findMany({ orderBy: { createdAt: "desc" } });

	if (blogs === undefined) {
		return <Loading />;
	}

	if (blogs.length === 0) {
		return <ErrorPage>No blogs found</ErrorPage>;
	}

	return (
		<div className=' '>
			{/* <Banner name='Blogs Page' desc="Explore insightful blogs shared by users, covering tips, updates, and best practices for email verification and beyond!" /> */}
			<div className=' text-center w-full p-2 py-8 lg:w-1/2 space-y-4 mx-auto'>
				<h1 className=' text-primary text-2xl lg:text-5xl font-bold'>
					PureChecker Blog
				</h1>
				<p className=' lg:text-lg text-muted-foreground'>
					Welcome to the PureChecker Blog, your go-to resource for mastering
					email verification, email marketing, and deliverability strategies.
					Stay informed on best practices, avoid email blacklists, and boost
					your campaign performance to ensure your emails reach their intended
					audience.
				</p>
			</div>
			<div className=' p-2 grid grid-cols-1 container mx-auto sm:grid-cols-2  py-10 lg:grid-cols-3 gap-6'>
				{blogs.map(blog => (
					<div key={blog.id}>
						<BlogCard key={blog.id} blog={blog} />
					</div>
				))}
			</div>
		</div>
	);
}
