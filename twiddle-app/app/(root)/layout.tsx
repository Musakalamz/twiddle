import React from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Twiddle",
  description:
    "A social media App, to connect and  discover what's happening in the world!",
};

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <ClerkProvider>
          <body>
            <main className={`${inter.className} bg-black`}>
              <div className="w-full flex justify-center items-center min-h-screen">
                {children}
              </div>
            </main>
          </body>
        </ClerkProvider>
      </html>
    </>
  );
}
