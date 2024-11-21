import type {Metadata} from "next";
import {Analytics} from "@vercel/analytics/react"
import localFont from "next/font/local";
import "./(styles)/globals.css";

import {ThemeProvider} from "@/components/providers/theme-provider"
import {Toaster} from "@/components/ui/toaster"
import {QueryProvider} from "@/components/providers/query-provider"

const geistSans = localFont({
    src: "./(public)/fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./(public)/fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Go To Work - Project Management System",
    description: "Modern project and task management system",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <QueryProvider>
                {children}
                <Toaster/>
            </QueryProvider>
        </ThemeProvider>

        <Analytics/>
        </body>
        </html>
    );
}
