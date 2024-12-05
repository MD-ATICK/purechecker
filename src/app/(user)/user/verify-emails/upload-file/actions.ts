
"use server"

import { db } from "@/lib/prisma"
import { extractEmailsFromFile } from "@/utils/BulkConvertFile"



export const getUploadFilesById = async (uploadFileId: string) => {
    try {

        const uploadFile = await db.uploadFile.findFirstOrThrow({ where: { id: uploadFileId }, include: { checkedEmails: true } })
        return { success: true, uploadFile }

    } catch (error) {
        return { error: (error as Error).message }
    }
}
export const getUploadFilesByUserId = async (userId: string) => {
    try {

        const uploadFiles = await db.uploadFile.findMany({ where: { userId: userId } })
        return { success: true, uploadFiles }

    } catch (error) {
        return { error: (error as Error).message }
    }
}
export const getCheckEmailsByUploadFileId = async (fileId: string, userId: string) => {
    try {

        const uploadFiles = await db.uploadFile.findUnique({ where: { id: fileId, userId }, include: { checkedEmails: true } })
        return { success: true, checkedEmails: uploadFiles?.checkedEmails }

    } catch (error) {
        return { error: (error as Error).message }
    }
}


export const createUploadFile = async (formData: FormData, userId: string) => {
    try {
        const file = formData.get('file') as File

        const bulkEmails = await extractEmailsFromFile(file);

        const uploadFile = await db.uploadFile.create({
            data: {
                fileName: file.name,
                fileType: file.type,
                fileSize: file.size,
                userId,
                enterEmails: bulkEmails,
                status: "PENDING"
            }
        })


        return { success: true, uploadFile }
    } catch (error) {
        return { error: (error as Error).message }
    }

}

export const deleteUploadFile = async (uploadFileId: string) => {
    try {


        const uploadFile = await db.uploadFile.delete({ where: { id: uploadFileId } })


        return { success: true, uploadFile }
    } catch (error) {
        return { error: (error as Error).message }
    }

}

export const uploadUploadFileStatus = async (uploadFileId: string) => {
    try {


        const uploadFile = await db.uploadFile.update({ where: { id: uploadFileId }, data: { status: "COMPLETED" } })


        return { success: true, uploadFile }
    } catch (error) {
        return { error: (error as Error).message }
    }

}

