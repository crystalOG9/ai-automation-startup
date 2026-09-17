import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BackgroundVisuals } from "@/components/BackgroundVisuals";
import { PrecisionMouseSystem } from "@/components/PrecisionMouseSystem";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SpartanIntro } from "@/components/SpartanIntro";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SPARTAN | Custom Automation Systems & Engineering Studio",
  description: "A small technical team building custom automation systems for businesses that are tired of doing the same thing 500 times.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-brand-500/30 selection:text-brand-50">
        <SpartanIntro />
        <BackgroundVisuals />
        <PrecisionMouseSystem />
        <ScrollToTop />
        <Navbar />
        <main className="flex-1 flex flex-col w-full">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
