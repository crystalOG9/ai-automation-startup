"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn, scrollToSection } from "@/lib/utils";
import { SpartanLogo } from "@/components/SpartanLogo";

// Synchronized sequence matching page flow
const NAV_LINKS = [
  { name: "Home", href: "#hero", id: "hero" },
  { name: "Method", href: "#differentiator", id: "differentiator" },
  { name: "How It Works", href: "#how-it-works", id: "how-it-works" },
  { name: "Workflow Demo", href: "#workflow-demo", id: "workflow-demo" },
  { name: "Solutions", href: "#solutions", id: "solutions" },
  { name: "Why Us", href: "#why-us", id: "why-us" },
  { name: "Contact", href: "#contact", id: "contact" },
];

export function Navbar() {
  const [activeId, setActiveId] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isManualScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let rafId: number | null = null;
    let isScrolledCurrent = false;
    let activeIdCurrent = "hero";

    const updateNavState = () => {
      rafId = null;
      const scrollY = window.scrollY;
      const shouldBeScrolled = scrollY > 20;
      if (shouldBeScrolled !== isScrolledCurrent) {
        isScrolledCurrent = shouldBeScrolled;
        setIsScrolled(shouldBeScrolled);
      }

      if (isManualScrollRef.current) return;

      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Bottom of page (CTA / Contact / Why Us area)
      if (scrollY + windowHeight >= docHeight - 80) {
        if (activeIdCurrent !== "contact") {
          activeIdCurrent = "contact";
          setActiveId("contact");
        }
        return;
      }

      // Very top of page
      if (scrollY < 140) {
        if (activeIdCurrent !== "hero") {
          activeIdCurrent = "hero";
          setActiveId("hero");
        }
        return;
      }

      // Check section bounding boxes with smooth hysteresis threshold
      const sectionIds = ["differentiator", "how-it-works", "workflow-demo", "solutions", "why-us", "contact"];
      let matchedNavId = "hero";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 120) {
            matchedNavId = id;
            break;
          }
        }
      }

      if (matchedNavId !== activeIdCurrent) {
        activeIdCurrent = matchedNavId;
        setActiveId(matchedNavId);
      }
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateNavState);
      }
    };

    updateNavState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setActiveId(id);
    isManualScrollRef.current = true;

    scrollToSection(href, e);

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, 850);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b",
        isScrolled
          ? "bg-[#0B0B0B]/90 backdrop-blur-xl border-white shadow-[0_1px_12px_rgba(255,255,255,0.2),0_4px_24px_rgba(0,0,0,0.6)] py-3"
          : "bg-transparent border-transparent py-5 shadow-none"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={(e) => handleLinkClick(e, "#hero", "hero")}
          className="text-xl md:text-2xl font-bold tracking-tighter text-foreground flex items-center gap-2.5 group select-none"
        >
          <div className="transition-transform duration-300 group-hover:scale-105">
            <SpartanLogo size={32} priority />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] via-[#EAD6E6] to-[#C9AEC6] font-bold tracking-tight text-lg md:text-xl">
            SPARTAN
          </span>
        </Link>

        {/* Desktop Navigation - Plain Text Links with Champagne Laser Glowing Underline */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href, link.id)}
                className={cn(
                  "relative py-1 text-xs sm:text-sm font-semibold tracking-wider transition-colors duration-200 uppercase font-mono cursor-pointer select-none",
                  isActive
                    ? "text-[#F6EFF5] [text-shadow:0_0_12px_rgba(201,174,198,0.4)]"
                    : "text-[#BAAEC0] hover:text-[#F6EFF5]"
                )}
              >
                <span>{link.name}</span>

                {/* Glowing Champagne Laser Underline */}
                {isActive && (
                  <motion.div
                    layoutId="nav-active-glow-laser"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-[#C9AEC6] shadow-[0_0_8px_#C9AEC6,0_0_16px_rgba(201,174,198,0.4)] pointer-events-none"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle (desktop navigation is clean and uncluttered) */}
        <div className="lg:hidden flex items-center">
          <button
            className="text-[#BAAEC0] hover:text-[#F6EFF5] w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
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
            className="lg:hidden absolute top-full left-0 right-0 bg-[#0B0B0B]/95 backdrop-blur-2xl border-b border-white/[0.06] p-5 shadow-2xl"
          >
            <nav className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "py-2.5 px-4 text-sm font-medium rounded-xl transition-all duration-150 flex items-center justify-between cursor-pointer",
                      isActive
                        ? "text-[#F6EFF5] font-semibold [text-shadow:0_0_10px_rgba(201,174,198,0.3)] bg-white/[0.04]"
                        : "text-[#BAAEC0] hover:text-[#F6EFF5] hover:bg-white/[0.04]"
                    )}
                    onClick={(e) => {
                      handleLinkClick(e, link.href, link.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <span>{link.name}</span>
                    <ArrowRight className={cn("w-3.5 h-3.5", isActive ? "text-[#C9AEC6]" : "text-[#8E8295]/60")} />
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
