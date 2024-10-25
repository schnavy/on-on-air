import type {Metadata} from "next";
import "./globals.scss";

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
        {children}
        </body>
        </html>
    );
}
