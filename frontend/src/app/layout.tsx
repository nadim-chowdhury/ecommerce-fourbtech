import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientRootProvider from "@/components/providers/client-root-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "eCommerce",
  description: "Multi-vendor eCommerce platform developed by Nadim Chowdhury",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-neutral-100`}>
        <ClientRootProvider>
          {children}
          <Toaster />
        </ClientRootProvider>
      </body>
    </html>
  );
}
