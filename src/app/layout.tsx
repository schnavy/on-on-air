import type {Metadata} from "next";
import "./globals.scss";
import FloatingMenu from "@/components/FloatingMenu/FloatingMenu";
import SubmissionForm from "@/components/SubmissionForm/SubmissionForm";
import React from "react";

export const metadata: Metadata = {
    title: "On on Air",
    description: "On on Air",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <main>
            {children}
        </main>
        <FloatingMenu/>
        <SubmissionForm/>
        </body>
        </html>
    );
}
