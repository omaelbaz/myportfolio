'use server';

import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const ContactSchema = z.object({
    senderEmail: z.string().email({ message: 'Invalid email address' }),
    message: z.string().min(10, { message: 'Message must be at least 10 characters long' }),
});

export const sendEmail = async (formData: FormData) => {
    const senderEmail = formData.get('senderEmail');
    const message = formData.get('message');

    // Server-side validation
    const validatedFields = ContactSchema.safeParse({
        senderEmail,
        message,
    });

    if (!validatedFields.success) {
        let errorMessage = '';
        validatedFields.error.issues.forEach((issue) => {
            errorMessage += issue.message + '. ';
        });
        return {
            error: errorMessage || 'Invalid inputs',
        };
    }

    try {
        await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>',
            to: 'oelbaz010@gmail.com',
            subject: `New Message from Portfolio | ${senderEmail as string}`,
            replyTo: senderEmail as string,
            text: message as string,
        });

        return { success: true };
    } catch (error) {
        console.error('Resend Error:', error);
        return {
            error: 'Something went wrong. Please try again.',
        };
    }
}
