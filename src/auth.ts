import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from './lib/db';
import { getUserByEmail, getUserByID } from './data/user';
import { LoginSchema } from "@/schemas";
import bcrypt from 'bcryptjs';
import { UserRole } from "@prisma/client";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    pages: {
        error: '/auth/error', // Custom error page
    },
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);
                
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    const user = await getUserByEmail(email);
                    
                    if (!user || !user.password) return null;
                    
                    const passwordMatch = await bcrypt.compare(
                        password, user.password
                    );
                    if (passwordMatch) return user;
                }
                
                return null;
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "github") {
                if (!user.email) {
                    console.log("No email provided by GitHub");
                    return false;
                }

                const existingUser = await getUserByEmail(user.email);
                if (existingUser) {
                    // Link the GitHub account to the existing user
                    await linkAccount(existingUser.id, account);
                    return true;
                } else {
                    // Create a new user
                    await db.user.create({
                        data: {
                            name: user.name || undefined,
                            email: user.email,
                            image: user.image || undefined,
                            role: UserRole.USER,
                        },
                    });
                }
            }
            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;
            const existingUser = await getUserByID(token.sub);

            if (!existingUser) return token;
            token.role = existingUser.role;

            return token;
        }
    },
});

// Helper function to link accounts
async function linkAccount(userId: string, account: any) {
    await db.account.create({
        data: {
            userId: userId,
            type: account.type,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            refresh_token: account.refresh_token,
            access_token: account.access_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
            scope: account.scope,
            id_token: account.id_token,
            session_state: account.session_state,
        },
    });
}