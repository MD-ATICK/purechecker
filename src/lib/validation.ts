import z from 'zod';

const requiredString = z.string().trim().min(1, 'Required')
const requiredNumber = z.string().min(1, 'Required').regex(/^\d+$/, {
    message: "Value must contain only numbers",
});


export const LoginSchema = z.object({
    email: requiredString.email(),
    password: requiredString,
})

export type LoginValues = z.infer<typeof LoginSchema>

export const SignUpSchema = z.object({
    name: requiredString,
    email: requiredString.email(),
    password: requiredString.min(8, { message: 'must be at least 8 characters' }),
})

export type SignUpValues = z.infer<typeof SignUpSchema>


export const VolumeSchema = z.object({
    amount: requiredNumber,
    credit: requiredNumber,
    type: z.enum(['SUBSCRIPTION', 'PURCHASE']),
})

export type VolumeValues = z.infer<typeof VolumeSchema>


