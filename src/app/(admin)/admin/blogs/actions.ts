"use server"
import { getUser } from "@/lib/getUser";
import { db } from "@/lib/prisma";
import { BlogValues } from "@/lib/validation";

export const createBlog = async (values: BlogValues) => {

    try {

        const user = await getUser()
        if (!user || !user.id) {
            throw new Error("Unauthorized")
        }


        if (user.role !== "ADMIN") {
            throw new Error("You are not authorized to add a blog")
        }


        await db.blog.create({
            data: {
                ...values,
                userId: user.id
            }
        })

        return { success: true }

    } catch (error) {
        return { error: (error as Error).message }
    }

}

export const deleteBlog = async (id: string) => {
    try {
        await db.blog.delete({ where: { id } })
        return { success: true }
    } catch (error) {
        return { error: (error as Error).message }
    }
}

export const updateBlog = async (id: string, values: BlogValues) => {
    try {
        await db.blog.update({ where: { id }, data: values })
        return { success: true }
    } catch (error) {
        return { error: (error as Error).message }
    }
}

export const getBlogById = async (id: string) => {
    try {
        const blog = await db.blog.findFirst({ where: { id } })

        if (!blog) {
            return {error : 'Blog not found'}
        }

        return { blog }
    } catch (error) {
        return { error: (error as Error).message }
    }
}

export const getAllBlogs = async () => {
    try {
        const blogs = await db.blog.findMany({ include: { User: true } })
        return { blogs }
    } catch (error) {
        return { error: (error as Error).message }
    }
}