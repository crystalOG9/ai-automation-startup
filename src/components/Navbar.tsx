"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SpartanLogo } from "@/components/SpartanLogo";

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
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b",
        isScrolled
          ? "bg-[#030712]/80 backdrop-blur-xl border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.6)] py-3"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="text-xl md:text-2xl font-bold tracking-tighter text-foreground flex items-center gap-2.5 group select-none"
        >
          <div className="transition-transform duration-300 group-hover:scale-105">
            <SpartanLogo size={32} priority />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/95 to-slate-200 font-bold tracking-tight text-lg md:text-xl">
            SPARTAN
          </span>
        </Link>

        {/* Desktop Navigation with Sharp Animated Blue Highlight */}
        <nav
          className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md"
          onMouseLeave={() => setHoveredHref(null)}
        >
          {NAV_LINKS.map((link) => {
            const isHovered = hoveredHref === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredHref(link.href)}
                className={cn(
                  "relative px-4 py-2 text-xs font-semibold tracking-wider transition-colors duration-150 uppercase font-mono",
                  isHovered ? "text-white" : "text-slate-400 hover:text-slate-200"
                )}
              >
                {/* Sharp high-contrast blue geometric active frame */}
                {isHovered && (
                  <motion.div
                    layoutId="nav-sharp-highlight"
                    transition={{ type: "spring", stiffness: 500, damping: 32 }}
                    className="absolute inset-0 rounded-lg bg-brand-500/20 border border-brand-400 shadow-[0_0_15px_rgba(59,130,246,0.35)]"
                  />
                )}
                
                <span className="relative z-10">{link.name}</span>

                {/* Razor-sharp bottom blue laser indicator */}
                {isHovered && (
                  <motion.div
                    layoutId="nav-laser-bar"
                    transition={{ type: "spring", stiffness: 500, damping: 32 }}
                    className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-brand-400 rounded-full shadow-[0_0_8px_#60a5fa]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA and Mobile Menu Toggle */}
        <div className="flex items-center gap-3 md:gap-4">
          <Link
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 relative overflow-hidden bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold tracking-wider uppercase border border-brand-400/60 shadow-[0_0_0_1px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.55),0_0_0_1.5px_rgba(96,165,250,0.8)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out group"
          >
            {/* Crisp directional specular sweep on hover */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
            
            <span className="relative z-10 font-mono text-xs">Show Us Your Workflow</span>
            <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 transition-transform duration-150" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-slate-300 hover:text-white p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
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

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-[#060b17]/95 backdrop-blur-2xl border-b border-white/10 p-5 shadow-2xl"
          >
            <nav className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="py-2.5 px-4 text-sm font-medium text-slate-300 hover:text-white hover:bg-brand-500/10 rounded-xl transition-colors flex items-center justify-between border border-transparent hover:border-brand-500/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-400 opacity-60" />
                </Link>
              ))}
              <div className="pt-3">
                <Link
                  href="#contact"
                  className="flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-[0_0_20px_rgba(37,99,235,0.35)] transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Show Us Your Workflow</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

