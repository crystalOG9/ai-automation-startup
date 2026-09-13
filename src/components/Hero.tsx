"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import Link from "next/link";

import { SPARTAN_EASE } from "@/lib/motion";
import { Hero3DExperience } from "@/components/Hero3DExperience";

const TICKER_ITEMS = [
  "Custom Business Logic",
  "Zero System Migration",
  "Human-in-the-Loop Safeguards",
  "Integrated Into Your Existing Tools",
  "Fixed Scope & Predictable Delivery",
  "Production-Ready Workflow Pipelines",
  "Audited & Validated Before Live Deployment",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.4]);

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-0 md:pt-36 overflow-hidden perspective-1200">
      {/* Subtle controlled atmospheric lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[400px] bg-[#881337]/[0.18] blur-[140px] rounded-full pointer-events-none select-none" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#e11d48]/[0.07] blur-[120px] rounded-full pointer-events-none select-none" />
      
      <motion.div
        style={{ y: heroContentY, opacity: heroContentOpacity }}
        className="container mx-auto px-4 md:px-6 relative z-10 my-auto"
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center max-w-7xl mx-auto">
          {/* Left Column: Core Technical Value Proposition */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-0">
            {/* 1. SPARTAN Branding / Technical Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.48, ease: SPARTAN_EASE }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-xl bg-[#1c1114]/85 border border-[#e11d48]/40 text-white text-xs sm:text-sm font-mono uppercase tracking-wider mb-6 sm:mb-8 shadow-[0_0_15px_rgba(225,29,72,0.18)] transition-colors hover:border-[#fb7185]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e11d48] opacity-70" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e11d48]" />
              </span>
              <span>Custom Process &amp; Workflow Automation</span>
            </motion.div>
            
            {/* 2. Main Headline with White into Satin Crimson Contrast */}
            <motion.h1
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.58, delay: 0.08, ease: SPARTAN_EASE }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-[3.4rem] xl:text-[4rem] font-bold tracking-tight text-white mb-6 sm:mb-8 leading-[1.08]"
            >
              <span className="text-[#a3959a]">Your team shouldn&apos;t spend all day doing work </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#fda4af] to-[#e11d48]">
                computers can handle.
              </span>
            </motion.h1>
            
            {/* 3. Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.52, delay: 0.16, ease: SPARTAN_EASE }}
              className="text-base sm:text-lg md:text-xl text-[#d4c9cd] mb-8 sm:mb-10 leading-relaxed max-w-2xl font-normal"
            >
              We identify repetitive operational steps and build custom automation directly into your existing software — keeping your operators focused on <strong className="text-white font-semibold">decisions and exceptions</strong>.
            </motion.p>
            
            {/* 4. CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.48, delay: 0.24, ease: SPARTAN_EASE }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-8 sm:mb-12"
            >
              <Link
                href="#contact"
                className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#e11d48] via-[#be123c] to-[#9f1239] hover:from-[#f43f5e] hover:to-[#e11d48] text-white px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase border border-[#fb7185]/50 shadow-[0_0_25px_rgba(225,29,72,0.35)] hover:shadow-[0_0_35px_rgba(225,29,72,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out group font-mono"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
                
                <span className="relative z-10">SHOW US YOUR WORKFLOW</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-150 text-white" />
              </Link>
              
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-[#e11d48]/60 text-white hover:text-white px-7 py-3.5 rounded-xl text-xs sm:text-sm font-medium tracking-wider uppercase hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(225,29,72,0.18)] active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out font-mono"
              >
                <span>SEE HOW IT WORKS</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#fb7185]" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Adaptive 3D Automation Core (3D on Desktop, Fallback on Mobile/Touch) */}
          <div className="lg:col-span-6 xl:col-span-5 relative w-full flex items-center justify-center mt-4 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.56, delay: 0.18, ease: SPARTAN_EASE }}
              className="w-full relative"
            >
              <Hero3DExperience />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 5. Ticker marquee strip in Obsidian & Crimson palette */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: SPARTAN_EASE }}
        className="w-full mt-10 sm:mt-14 py-3.5 border-y border-white/[0.08] bg-[#0e080a]/90 backdrop-blur-md overflow-hidden select-none"
      >
        <motion.div
          className="flex w-max space-x-10 text-xs font-mono tracking-widest text-[#a3959a] uppercase"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 32 }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center space-x-3 shrink-0">
              <span className="text-[#e11d48]">✦</span>
              <span className="hover:text-white transition-colors">{item}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
