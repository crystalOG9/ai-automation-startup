"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown, ShieldCheck, Database, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { WorkflowNetwork } from "./WorkflowNetwork";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.35]);
  const [focusBox, setFocusBox] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
    label: string;
  } | null>(null);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const heroRect = heroRef.current.getBoundingClientRect();
    const cursorX = e.clientX;
    const cursorY = e.clientY;

    const targets = heroRef.current.querySelectorAll<HTMLElement>("[data-hero-focus]");
    let closestEl: HTMLElement | null = null;
    let minDistance = Infinity;

    for (let i = 0; i < targets.length; i++) {
      const el = targets[i];
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(cursorX - centerX, cursorY - centerY);

      if (dist < minDistance) {
        minDistance = dist;
        closestEl = el;
      }
    }

    if (closestEl && minDistance < 190) {
      const targetEl = closestEl as HTMLElement;
      const rect = targetEl.getBoundingClientRect();
      setFocusBox({
        top: rect.top - heroRect.top - 5,
        left: rect.left - heroRect.left - 6,
        width: rect.width + 12,
        height: rect.height + 10,
        label: targetEl.dataset.heroFocus || "TARGET",
      });
    } else {
      setFocusBox(null);
    }
  };

  const handleHeroMouseLeave = () => {
    setFocusBox(null);
  };

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-[90vh] flex items-center pt-32 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Subtle controlled SPARTAN blue atmospheric lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[450px] bg-brand-600/[0.06] blur-[160px] rounded-full pointer-events-none select-none" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-brand-900/[0.08] blur-[140px] rounded-full pointer-events-none select-none" />
      
      <motion.div
        style={{ y: heroContentY, opacity: heroContentOpacity }}
        className="container mx-auto px-4 md:px-6 relative z-10"
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column - Copy & Value Proposition with Digital Focus System */}
          <div
            ref={heroRef}
            onMouseMove={handleHeroMouseMove}
            onMouseLeave={handleHeroMouseLeave}
            className="lg:col-span-6 max-w-2xl relative"
          >
            {/* Geometric Digital Scanning Focus Reticle */}
            <AnimatePresence>
              {focusBox && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    top: focusBox.top,
                    left: focusBox.left,
                    width: focusBox.width,
                    height: focusBox.height,
                  }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  className="absolute pointer-events-none z-20 hidden md:block"
                >
                  {/* 4 Crisp High-Contrast L-Corner Brackets */}
                  <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-brand-400" />
                  <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-brand-400" />
                  <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-brand-400" />
                  <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-brand-400" />

                  {/* Sharp 1px boundary line */}
                  <div className="absolute inset-0 border border-brand-400/40 rounded-lg bg-brand-500/[0.03]" />

                  {/* Technical coordinate micro-tag */}
                  <div className="absolute -top-3 right-2 px-1.5 py-0.2 bg-[#030712] border border-brand-400/70 rounded text-[9px] font-mono tracking-widest text-brand-300 uppercase shadow-[0_0_10px_rgba(59,130,246,0.35)]">
                    FOCUS // {focusBox.label}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Technical Badge */}
              <div
                data-hero-focus="PROCESS_SPEC"
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-brand-950/60 border border-brand-500/30 text-brand-300 text-xs font-mono uppercase tracking-wider mb-6 shadow-[0_0_15px_rgba(37,99,235,0.15)] transition-colors hover:border-brand-400"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-70"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
                <span>Enterprise Process & Workflow Automation</span>
              </div>
              
              {/* Main Headline */}
              <h1
                data-hero-focus="CORE_HEADLINE"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white mb-6 leading-[1.12] uppercase"
              >
                YOUR EMPLOYEES SHOULDN&apos;T SPEND THEIR DAY DOING WORK{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-blue-300 to-slate-200">
                  COMPUTERS CAN HANDLE.
                </span>
              </h1>
              
              {/* Subheading */}
              <p
                data-hero-focus="OVERVIEW_BRIEF"
                className="text-base md:text-lg text-slate-400 mb-9 leading-relaxed max-w-xl font-normal"
              >
                We discover repetitive business workflows and build AI-powered automation around the way your company actually works — so your team can focus on decisions, customers and growth.
              </p>
              
              {/* CTA Action Buttons with Refined Snappy Hover Response */}
              <div
                data-hero-focus="ACTION_DISPATCH"
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10"
              >
                <Link
                  href="#contact"
                  className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-brand-600 hover:bg-brand-500 text-white px-7 py-3.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase border border-brand-400/60 shadow-[0_0_0_1px_rgba(59,130,246,0.35)] hover:shadow-[0_0_24px_rgba(37,99,235,0.65),0_0_0_1.5px_rgba(96,165,250,0.9)] hover:-translate-y-0.5 hover:scale-[1.015] active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out group font-mono"
                >
                  {/* Directional specular sweep on hover */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                  
                  <span className="relative z-10">SHOW US YOUR WORKFLOW</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-150" />
                </Link>
                
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/15 hover:border-brand-400/70 text-slate-300 hover:text-white px-7 py-3.5 rounded-xl text-xs sm:text-sm font-medium tracking-wider uppercase hover:-translate-y-0.5 hover:shadow-[0_0_18px_rgba(59,130,246,0.3)] active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out font-mono"
                >
                  <span>SEE HOW IT WORKS</span>
                  <ArrowDown className="w-3.5 h-3.5 text-brand-400" />
                </Link>
              </div>

              {/* Core Workflow Safeguard Status Chips */}
              <div className="pt-6 border-t border-white/[0.07] grid grid-cols-3 gap-3">
                <div
                  data-hero-focus="GUARD_01"
                  className="flex items-center gap-2 text-xs font-medium text-slate-300 p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-brand-500/50 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">Human-Controlled</span>
                </div>
                <div
                  data-hero-focus="GUARD_02"
                  className="flex items-center gap-2 text-xs font-medium text-slate-300 p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-brand-500/50 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  <Database className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="truncate">System-Integrated</span>
                </div>
                <div
                  data-hero-focus="GUARD_03"
                  className="flex items-center gap-2 text-xs font-medium text-slate-300 p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-brand-500/50 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                  <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                  <span className="truncate">Workflow-Specific</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Dynamic Signature Business Workflow Network Tree */}
          <div className="lg:col-span-6 relative w-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="w-full relative"
            >
              <WorkflowNetwork />
            </motion.div>
          </div>
          
        </div>
      </motion.div>
    </section>
  );
}



