import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import {signInSchema} from "@/lib/zod";

export const {handlers, auth, signIn, signOut} = NextAuth({
        adapter: PrismaAdapter(prisma),
        providers: [
            CredentialsProvider({
                credentials: {
                    email: {label: "Email", type: "text"},
                    password: {label: "Password", type: "password"},
                },
                authorize: async (credentials) => {
                    const {email, password} = await signInSchema.parseAsync(credentials);
                    const user = await prisma.user.findUnique({
                        where: {email},
                    });
                    if (user && (await bcrypt.compare(password, user.password))) {
                        console.log(user);
                        return user;
                    }
                    throw new Error("Invalid credentials.");
                },
            }),
        ],
        callbacks: {
            async session({session, user}) {
                session.user = user; // Pass user details to the session
                return session;
            },
        },
    }
)
