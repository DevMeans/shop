import type { NextAuthConfig, Session } from 'next-auth';
import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcryptjs from 'bcryptjs';
import prisma from '@/lib/prisma';
import { JWT } from 'next-auth/jwt';
export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account'
    },
    callbacks: {
        jwt({ token, user }) {
           console.log(user)
            if(user){
                token.data=user
            }
            return token;
        },
        session({ session, token, user }: {
            session: Session;
            token?: JWT;
            user?: any;
        }) {
            console.log({session,token,user})
            session.user= token?.data  as any
            return session
        }
    },
    providers: [
        credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);
                if (!parsedCredentials.success) return null;
                const { email, password } = parsedCredentials.data
                const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
                if (!user) return null
                if (!bcryptjs.compareSync(password, user.password)) return null
                const { password: _, ...rest } = user
                return rest;
            },
        }),
    ]
};
export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)