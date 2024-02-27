'use client';

import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import { SessionProvider } from "next-auth/react";
import { JotaiProvider } from "./providers/jotaiProvider";

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <JotaiProvider>
          <SessionProvider>
            <Header />
            <main className="mt-16">
                {children}
            </main>
          </SessionProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
