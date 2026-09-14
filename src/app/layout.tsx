import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SPARTAN | Custom Workflow Automation",
  description: "We map repetitive business workflows and build custom automation directly into your existing tools.",
};

import { BackgroundVisuals } from "@/components/BackgroundVisuals";
import { PrecisionMouseSystem } from "@/components/PrecisionMouseSystem";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-brand-500/30 selection:text-brand-50">
        <BackgroundVisuals />
        <PrecisionMouseSystem />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
