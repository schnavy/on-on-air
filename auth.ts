import NextAuth from "next-auth"
import Nodemailer from "next-auth/providers/nodemailer"
import {PrismaAdapter} from "@auth/prisma-adapter"
import prisma from "./src/lib/prisma"
import sendVerificationRequest from "./src/lib/auth-mail";

export const {handlers, auth, signIn, signOut} = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Nodemailer({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: Number(process.env.EMAIL_SERVER_PORT),
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
            sendVerificationRequest,
        }),
    ],
})