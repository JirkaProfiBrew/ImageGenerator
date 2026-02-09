import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ImageGen AI - Bulk AI Image Platform",
  description:
    "Test AI services, choose best price/quality, bulk process images",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
