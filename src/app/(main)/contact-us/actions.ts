"use server"
import { sendEmail } from "@/actions/sendMail"



export const contactUs = async (values: { name: string, email: string, message: string }) => {

    try {
        await sendEmail(values)
        return { success: true }

    } catch (error) {
        throw error
    }
}