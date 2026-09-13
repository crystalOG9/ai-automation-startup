"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SpartanLogo } from "@/components/SpartanLogo";

// Synchronized sequence:
// 1. Hero -> 2. Method -> 3. How It Works -> 4. Workflow Demo -> 5. Solutions -> 6. Why Us
const NAV_LINKS = [
  { name: "Home", href: "#hero", id: "hero" },
  { name: "Method", href: "#differentiator", id: "differentiator" },
  { name: "How It Works", href: "#how-it-works", id: "how-it-works" },
  { name: "Workflow Demo", href: "#workflow-demo", id: "workflow-demo" },
  { name: "Solutions", href: "#solutions", id: "solutions" },
  { name: "Why Us", href: "#why-us", id: "why-us" },
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
        if (activeIdCurrent !== "why-us") {
          activeIdCurrent = "why-us";
          setActiveId("why-us");
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

      // Mid-view line for responsive section detection
      const viewLine = scrollY + windowHeight * 0.35;

      const targets = [
        { id: "contact", navId: "why-us" },
        { id: "discovery", navId: "why-us" },
        { id: "why-us", navId: "why-us" },
        { id: "roi", navId: "solutions" },
        { id: "human-in-the-loop", navId: "solutions" },
        { id: "industries", navId: "solutions" },
        { id: "solutions", navId: "solutions" },
        { id: "workflow-demo", navId: "workflow-demo" },
        { id: "how-it-works", navId: "how-it-works" },
        { id: "core-message", navId: "differentiator" },
        { id: "differentiator", navId: "differentiator" },
        { id: "problem", navId: "hero" },
        { id: "hero", navId: "hero" },
      ];

      let matchedNavId = "hero";
      for (const target of targets) {
        const el = document.getElementById(target.id);
        if (el && viewLine >= el.offsetTop) {
          matchedNavId = target.navId;
          break;
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

    if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const targetEl = document.querySelector(href);
      if (targetEl) {
        const navHeight = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elRect = targetEl.getBoundingClientRect().top;
        const targetPos = elRect - bodyRect - navHeight;
        window.scrollTo({ top: Math.max(0, targetPos), behavior: "smooth" });
      }
    }

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
          ? "bg-[#0B0B0B]/90 backdrop-blur-xl border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.6)] py-3"
          : "bg-transparent border-transparent py-5"
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

        {/* CTA and Mobile Menu Toggle */}
        <div className="flex items-center gap-3 md:gap-4">
          <Link
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 relative overflow-hidden bg-[#C9AEC6] hover:bg-[#EAD6E6] text-[#0B0B0B] px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold tracking-wider uppercase border border-[#EAD6E6]/60 shadow-[0_0_15px_rgba(201,174,198,0.15)] hover:shadow-[0_0_20px_rgba(201,174,198,0.25)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out group"
          >
            {/* Crisp directional specular sweep on hover */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
            
            <span className="relative z-10 font-mono text-xs">Show Us Your Workflow</span>
            <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 transition-transform duration-150 text-[#0B0B0B]" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#BAAEC0] hover:text-[#F6EFF5] w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
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
                      "py-2.5 px-4 text-sm font-medium rounded-xl transition-all duration-150 flex items-center justify-between",
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
              <div className="pt-3">
                <Link
                  href="#contact"
                  className="flex items-center justify-center gap-2 bg-[#C9AEC6] hover:bg-[#EAD6E6] text-[#0B0B0B] px-5 py-3 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(201,174,198,0.2)] transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Show Us Your Workflow</span>
                  <ArrowRight className="w-4 h-4 text-[#0B0B0B]" />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
