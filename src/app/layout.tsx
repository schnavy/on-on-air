import type {Metadata} from "next";
import "./globals.scss";
import FloatingMenu from "@/components/FloatingMenu/FloatingMenu";
import SubmissionForm from "@/components/SubmissionForm/SubmissionForm";
import React from "react";

export const metadata: Metadata = {
    title: "On on Air",
    description: "On(line) on Air is a open Index for new/ independent/ experimental/ punk/ niche/ nerdy/ experimental/ contemporary web radios.",
    openGraph: {
        type: "website",
        url: "https://on-on-air.davidwahrenburg.de/",
        title: "On on Air",
        description: "On(line) on Air is a open Index for new/ independent/ experimental/ punk/ niche/ nerdy/ experimental/ contemporary web radios.",
        images: ["/img/thumb.jpg"],
    },
    twitter: {
        card: "summary_large_image",
        title: "On on Air",
        description: "On(line) on Air is a open Index for new/ independent/ experimental/ punk/ niche/ nerdy/ experimental/ contemporary web radios.",
        images: ["/img/thumb.jpg"],
        site: "https://on-on-air.davidwahrenburg.de/",
    }
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <main>{children}</main>
                <FloatingMenu/>
                <SubmissionForm/>
            </body>
        </html>
    );
}
