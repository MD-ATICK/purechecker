"use server"
import { sendEmail } from "@/actions/sendMail"


export const contactUs = async (values: { name: string, email: string, message: string }, contactUsHtml: string) => {

    try {
        await sendEmail({
            fromEmail: values.email,
            subject: `New - Message from ${values.name}`,
            text: values.message,
            html: contactUsHtml,
        })
        return { success: true }

    } catch (error) {
        throw error
    }
}