import { getUser } from "@/lib/getUser";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";


const utapi = new UTApi()

export async function POST(req: Request) {
    const user = await getUser()
    if (!user) return new NextResponse("Unauthorized", { status: 401 })

    const { imageKey } = await req.json()
    try {
        const res = await utapi.deleteFiles(imageKey)
        return NextResponse.json(res)
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}