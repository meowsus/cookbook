import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <div className="container mx-auto p-4">{children}</div>

        <Toaster
          toastOptions={{
            classNames: {
              error: "!bg-red-100 !text-red-800 !border-red-500",
              success: "!bg-green-100 !text-green-800 !border-green-500",
              info: "!bg-blue-100 !text-blue-800 !border-blue-500",
              warning: "!bg-yellow-100 !text-yellow-800 !border-yellow-500",
            },
          }}
        />
      </body>
    </html>
  );
}
