import NextAuth from 'next-auth'
import GitHub from "next-auth/providers/github"
import authConfig from './auth.config'
import { db } from './lib/db'
import { PrismaAdapter } from '@auth/prisma-adapter'



export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    callbacks: {
        async session({ token, session }) {
            console.log({ sessionToken: token, session })
            if (token.sub && session.user) {
               session.user.id = token.sub
                token.custonmField
            }
            return session;
        },

        async jwt({ token }) {
            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig

})