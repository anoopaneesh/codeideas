import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";
import { ProgressBar } from "@/components/common/progress-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeIdeas",
  description: "A online coding platform where you can transform your ideas using HTML , CSS and JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen relative`}
      >
        <ProgressBar className="fixed h-1 shadow-lg shadow-sky-500/20 bg-sky-500 top-0">
          {children}
        </ProgressBar>
        <Toaster />
      </body>
    </html>
  );
}
