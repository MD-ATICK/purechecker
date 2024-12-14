import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getUser } from "@/lib/getUser"
import { db } from "@/lib/prisma"
import { formatRelativeDate } from "@/lib/utils"
import Image from "next/image"
import { notFound } from "next/navigation"
import BlogActionButtons from "./BlogActionButtons"
import BlogDialog from "./BlogDialog"

export default async function UsersPage() {


    const user = await getUser()
    const blogs = await db.blog.findMany({ include: { User : true },orderBy: {createdAt: 'desc'},take: 50 })

    
    if (!user || !user.id) {
        return notFound()
    }

    return (
        <div>
            <div className=" p-[1.5vw] flex items-center justify-between">
                <div className="flex-1">
                    <h1 className=" text-xl font-bold">Add Blog</h1>
                    <p className=" text-muted-foreground text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum maxime quos libero vel magni cupiditate.</p>
                </div>
                <div className=" flex-1 flex justify-end">
                <BlogDialog userId={user.id} />
                </div>
            </div>
            <Table className="">
                <TableCaption>A list of blogs.</TableCaption>
                <TableHeader>
                    <TableRow className=" font-medium">
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>tags</TableHead>
                        <TableHead>description</TableHead>
                        <TableHead>CreatedAt</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        blogs.map((blog) => {


                            return (
                                <TableRow key={blog.id} >
                                    <TableCell className="w-[100px] font-medium">{blog.id}</TableCell>
                                    <TableCell>
                                        <div className=" h-16 aspect-square relative">
                                            <Image alt="" fill sizes="100px" src={blog.image} className=" object-cover rounded-sm shadow-sm" />

                                        </div>
                                    </TableCell>
                                    <TableCell>{blog.title.length > 20 ? blog.title.slice(0, 20) + "..." : blog.title}</TableCell>
                                    <TableCell>{blog.category}</TableCell>
                                    <TableCell className=" text-center">{...blog.tags.slice(0, 2)}</TableCell>
                                    <TableCell className=" text-center text-xs">{blog.description.length > 30 ? blog.description.slice(0, 20) + "..." : blog.description}</TableCell>
                                    <TableCell className=" text-xs">{formatRelativeDate(blog.createdAt)}</TableCell>
                                    <TableCell>
                                        <BlogActionButtons blog={blog} />
                                    </TableCell>

                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}
