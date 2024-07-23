"use server";
import * as z from 'zod';
import { signIn } from '@/auth';
import { defaultLoginRedirect } from '@/routes';
import { AuthError } from 'next-auth';
import { LoginSchema } from '@/schemas';

type LoginResponse = {
  error?: string;
  success?: string;
  redirectTo?: string;
};

export const login = async (values: z.infer<typeof LoginSchema>): Promise<LoginResponse> => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password } = validatedFields.data;
  try {
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false, // Disable automatic redirect
    });

    if (response?.error) {
      return { error: response.error };
    }

    return { success: 'Login successful!', redirectTo: defaultLoginRedirect };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: 'Invalid Credentials' };
        default:
          return { error: "Something Went Wrong" };
      }
    }

    return { error: "Something Went Wrong" };
  }
};
