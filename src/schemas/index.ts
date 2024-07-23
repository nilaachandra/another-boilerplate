import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please Provide an Email!"
    }),
    password: z.string().min(6, {
        message: 'Please Provide a Password!'
    })
})

export const SignupSchema = z.object({
    email: z.string().email({
        message: "Please provide an Email"
    }),
    password: z.string().min(6, {
        message: "Password should be Minimum 6 characters"
    }),
    name: z.string().min(4, {
        message: "Name should be atleast 4 characters"
    })
})