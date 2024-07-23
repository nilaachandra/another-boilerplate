"use server";
import * as z from 'zod';
import { signIn } from '@/auth';
import { defaultLoginRedirect } from '@/routes';
import { AuthError } from 'next-auth';
import { LoginSchema } from '@/schemas';

type LoginResponse = {
  error?: string;
  success?: string;
};

export const login = async (values: z.infer<typeof LoginSchema>): Promise<LoginResponse> => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password } = validatedFields.data;
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: defaultLoginRedirect,
    });
    return { success: 'Login successful!' }; // Ensure a success message is returned
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: 'Invalid Credentials' };
        default:
          return { error: "Something Went Wrong" };
      }
    }

    return { error: "Something Went Wrong" }; // Ensure a generic error message is returned
  }
};
