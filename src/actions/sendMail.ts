"use server";

import nodemailer from 'nodemailer';

export async function sendEmail(values: { subject: string, html: string, to: string, from: string }) {

    try {
        // Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // You can use Gmail, Outlook, or any other provider
            auth: {
                user: process.env.NEXT_EMAIL_USERNAME, // Your email address
                pass: process.env.NEXT_EMAIL_PASSWORD, // Your email password or app-specific password
            },
        });


        // Define email options
        const mailOptions = {
            from: `"Pure Checker" <${values.from}>`,
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
