"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SpartanLogo } from "@/components/SpartanLogo";
import { GooeyNav, GooeyNavItem } from "@/components/GooeyNav";

const NAV_LINKS: GooeyNavItem[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu whenever pathname changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b",
        isScrolled
          ? "bg-[#0B0B0B]/90 backdrop-blur-xl border-white/[0.08] shadow-[0_1px_12px_rgba(255,255,255,0.06),0_4px_24px_rgba(0,0,0,0.6)] py-3"
          : "bg-transparent border-transparent py-5 shadow-none"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="text-xl md:text-2xl font-bold tracking-tighter text-foreground flex items-center gap-2.5 group select-none shrink-0"
        >
          <div className="transition-transform duration-300 group-hover:scale-105">
            <SpartanLogo size={32} priority />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] via-[#EAD6E6] to-[#C9AEC6] font-bold tracking-tight text-lg md:text-xl">
            SPARTAN
          </span>
        </Link>

        {/* Desktop Gooey Navigation */}
        <div className="hidden md:flex items-center">
          <GooeyNav
            items={NAV_LINKS}
            initialActiveIndex={Math.max(0, NAV_LINKS.findIndex((item) => item.href === pathname))}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>

        {/* Desktop CTA Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="relative overflow-hidden inline-flex items-center justify-center gap-2 bg-[#141414] hover:bg-[#1A1A1A] text-[#F6EFF5] hover:text-white px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase border border-white/[0.12] hover:border-[#C9AEC6]/50 shadow-[0_0_15px_rgba(201,174,198,0.08)] hover:shadow-[0_0_20px_rgba(201,174,198,0.18)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 ease-out group cursor-pointer"
          >
            <span className="relative z-10">SHOW US YOUR WORKFLOW</span>
            <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform duration-150 text-[#C9AEC6]" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            className="text-[#BAAEC0] hover:text-[#F6EFF5] w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
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
            className="md:hidden absolute top-full left-0 right-0 bg-[#0B0B0B]/95 backdrop-blur-2xl border-b border-white/[0.08] p-5 shadow-2xl"
          >
            <nav className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "py-2.5 px-4 text-sm font-medium rounded-xl transition-all duration-150 flex items-center justify-between cursor-pointer font-mono uppercase",
                      isActive
                        ? "text-[#F6EFF5] font-semibold [text-shadow:0_0_10px_rgba(201,174,198,0.3)] bg-white/[0.04]"
                        : "text-[#BAAEC0] hover:text-[#F6EFF5] hover:bg-white/[0.04]"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className={cn("w-3.5 h-3.5", isActive ? "text-[#C9AEC6]" : "text-[#8E8295]/60")} />
                  </Link>
                );
              })}

              <div className="pt-3 mt-2 border-t border-white/[0.08]">
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#C9AEC6] hover:bg-[#EAD6E6] text-[#0B0B0B] font-mono font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>SHOW US YOUR WORKFLOW</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
