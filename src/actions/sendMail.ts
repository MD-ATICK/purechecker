"use server";

import { emailConfig } from '@/lib/utils';
import nodemailer from 'nodemailer';

export async function sendEmail(values: { subject: string, html: string, to: string, type: "info" | "billing" | "support" }) {

    try {


        const { user, pass } = emailConfig[values.type]
        // Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 587,
            secure: false,
            auth: {
                user,
                pass
            },
        });



        // Define email options
        const mailOptions = {
            from: `"Pure Checker" <${emailConfig[values.type].user}>`,
            to: values.to,
            subject: values.subject,
            html: values.html,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: 'Failed to send the email' };
    }
}
