import {z} from 'zod';

export const bookingSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(6, "Invalid phone number"),
    post_code: z.string().min(1, "Invalid post code"),
    address: z.string().min(1, "Invalid address"),
    city: z.string().min(1, "Invalid city"),
});

export const paymentSchema = z.object({
    proof: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Proof of payment is required"),
});

export const checkBookingSchema = z.object({
    trx_id: z.string().min(1, "Transaction ID is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
});