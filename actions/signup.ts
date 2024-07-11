"use server"
import * as z from 'zod'
import { SignupSchema } from '../schemas'
import bcrypt from 'bcrypt'
import prisma from '../prisma/client'
import { error } from 'console'
import { getUserByEmail } from '../data/user'

export const signup = async (values: z.infer<typeof SignupSchema>) => {
    const validatedFields = SignupSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid Fields!" }
    }

    const { email, password, name } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    //function to check existing user
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return { error: "Email already in use!" }
    }

    //creating the user
    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }

        //TODO : Send Verification Email
    })
    return { success: "Succesfully Created Account" }
}