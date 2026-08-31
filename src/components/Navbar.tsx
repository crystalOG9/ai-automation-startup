"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { FlowzenLogo } from "@/components/FlowzenLogo";

const NAV_LINKS = [
  { name: "How It Works", href: "#how-it-works" },
  { name: "Workflow Demo", href: "#workflow-demo" },
  { name: "Philosophy", href: "#differentiator" },
  { name: "Solutions", href: "#solutions" },
  { name: "Why Us", href: "#why-us" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
        isScrolled
          ? "glass py-3 border-white/10 shadow-lg shadow-black/30"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl md:text-2xl font-bold tracking-tighter text-foreground flex items-center gap-2.5 group"
        >
          <FlowzenLogo size={34} />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-white/80 font-bold tracking-tight">
            Flowzen
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA and Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="#contact"
            className="hidden md:flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]"
          >
            Show Us Your Workflow
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            className="lg:hidden text-foreground p-1.5 rounded-lg bg-white/5 border border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 glass border-b border-white/10 p-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="py-2.5 px-4 text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="#contact"
                className="flex items-center justify-center gap-2 bg-brand-600 text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Show Us Your Workflow
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
