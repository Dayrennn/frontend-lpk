import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Sistem - LPK Delta Abadi International",
    description: "Sistem Kelola Data",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
            <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
            <body className="min-h-full flex flex-col">
                <NextTopLoader color="#c70000" height={5} showSpinner={false} />
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
