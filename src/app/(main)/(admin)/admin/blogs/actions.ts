"use server"
import { getUser } from "@/lib/getUser";
import { db } from "@/lib/prisma";
import { BlogValues } from "@/lib/validation";
import slugify from 'slugify';

export const createBlog = async (values: BlogValues) => {

    try {

        const user = await getUser()
        if (!user || !user.id) {
            throw new Error("Unauthorized")
        }


        if (user.role !== "ADMIN") {
            throw new Error("You are not authorized to add a blog")
        }


        const slug = slugify(values.title, { lower: true, strict: true })

        const findBlog = await db.blog.findFirst({ where: { slug } })
        if (findBlog) {
            throw new Error("Blog already created by this title")
        }

        await db.blog.create({
            data: {
                ...values,
                userId: user.id,
                slug
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
            return { error: "There haven't been any blogs with this id" }
        }

        return { blog }
    } catch (error) {
        return { error: (error as Error).message }
    }
}

export const getBlogBySlug = async (slug: string) => {
    try {
        const blog = await db.blog.findFirst({ where: { slug } })

        if (!blog) {
            return { error: "There haven't been any blogs with this id" }
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