import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

import { SessionProvider } from "next-auth/react";
import { cachedAuth } from "@/lib/server/caches";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rocket Finance",
  description: "Control your Finances like a Rocket Scientist",
  icons: "/rocket.svg",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await cachedAuth();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
