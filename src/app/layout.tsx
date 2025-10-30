import Footer from "@/app/Footer";
import "@/app/globals.css";
import Navbar from "@/app/Navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cookbook",
  description: "Mai Cookbook (see what I did there?)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dracula">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased py-4 flex flex-col min-h-screen`}
      >
        <div className="container mx-auto grow flex flex-col gap-4">
          <Navbar />
          <main className="container mx-auto py-4 px-6 bg-base-200 grow flex flex-col">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
