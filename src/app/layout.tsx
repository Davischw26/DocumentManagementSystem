import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_TITLE || "David's Beispielprojekt",
  description: "David's Beispielprojekt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b">
          <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-semibold hover:text-gray-600 transition-colors"
            >
              {process.env.NEXT_PUBLIC_APP_TITLE || "David's Beispielprojekt"}
            </Link>
            <a
              href="https://github.com/Davischw26/DocumentManagementSystem"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-600 transition-colors"
            >
              GitHub
            </a>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
