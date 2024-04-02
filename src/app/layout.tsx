import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./material-symbols.css";
import NavigationBar from "@/Components/NavigationBar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Footer from "@/Components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rocket Finance",
  description: "control your finances like a rocket scientist",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html className="h-full" lang="en">
        <body className={`flex flex-col h-full ${inter.className}`}>
          <header>
            <NavigationBar />
          </header>
          <main className="mt-16 flex-auto text-center">{children}</main>
          <footer>
            <Footer />
          </footer>
        </body>
      </html>
    </SessionProvider>
  );
}
