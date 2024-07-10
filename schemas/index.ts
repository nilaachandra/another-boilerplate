import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please Provide an Email!"
    }),
    password: z.string().min(6, {
        message: 'Please Provide a Password!'
    })
})