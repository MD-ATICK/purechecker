import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { db } from "@/lib/prisma"
import { formatRelativeDate } from "@/lib/utils"
import Image from "next/image"
import BlogActionButtons from "./BlogActionButtons"

export default async function UsersPage() {


    const blogs = await db.blog.findMany({ include: { User: true } })

    return (
        <div>
            <Table>
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
                                        <Image alt="" height={30} src={blog.image} className=" object-cover rounded-sm shadow-sm" />
                                    </TableCell>
                                    <TableCell>{blog.title.length > 20 ? blog.title.slice(0, 20) + "..." : blog.title}</TableCell>
                                    <TableCell>{blog.category}</TableCell>
                                    <TableCell className=" text-center">{...blog.tags.slice(0, 2)}</TableCell>
                                    <TableCell className=" text-center text-sm">{blog.description.length > 30 ? blog.description.slice(0, 20) + "..." : blog.description}</TableCell>
                                    <TableCell>{formatRelativeDate(blog.createdAt)}</TableCell>
                                    <TableCell>
                                        <BlogActionButtons userId={blog.User.id} />
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
