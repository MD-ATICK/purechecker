"use server";

import nodemailer from 'nodemailer';

export async function sendEmail(values: { name: string, email: string, message: string }) {

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
            from: values.email,
            to: process.env.NEXT_MY_EMAIL, // Your email where you will receive messages
            subject: `New Contact Form Message from ${"name"}`,
            text: "message",
            html: `<p><strong>Name:</strong> ${values.name}</p> 
                   <p><strong>Email:</strong> ${values.email}</p> <br />
                   <p><strong>Message:</strong> ${values.message}</p>`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: 'Failed to send the email' };
    }
}
