"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Layers, Cpu, ShieldCheck, CheckCircle2 } from "lucide-react";
import { SPARTAN_EASE } from "@/lib/motion";

const SYSTEM_CAPABILITIES = [
  {
    tag: "01 / CUSTOM BUILDS",
    title: "Zero Predefined Boxes",
    description: "Built around your actual business stack — WhatsApp, CRM, spreadsheets, databases & APIs.",
    icon: Layers,
  },
  {
    tag: "02 / RELIABLE LOGIC",
    title: "Deterministic Execution",
    description: "Audited code pipelines and deterministic rules. Zero hallucinations or black-box drift.",
    icon: Cpu,
  },
  {
    tag: "03 / GOVERNANCE",
    title: "Human In Control",
    description: "Policy-enforced approvals for sensitive financial steps, client messages, and key decisions.",
    icon: ShieldCheck,
  },
  {
    tag: "04 / PRODUCTION",
    title: "Real Business Deployment",
    description: "Shipped directly into your team's day-to-day operations with verified reliability.",
    icon: CheckCircle2,
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.3]);

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-[100vh] lg:min-h-[105vh] flex flex-col justify-between pt-32 pb-0 md:pt-40 overflow-hidden perspective-1200">
      {/* Subtle controlled atmospheric lighting tuned to graphite and faint champagne */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[480px] bg-[#141414]/[0.3] blur-[180px] rounded-full pointer-events-none select-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#C9AEC6]/[0.025] blur-[160px] rounded-full pointer-events-none select-none" />
      
      {/* Subtle black transparent gradient overlay behind left-side text: strongest near left edge, smoothly fading to transparent toward the right */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-full sm:w-[90%] md:w-[78%] lg:w-[68%] xl:w-[60%] pointer-events-none select-none z-0"
        style={{
          background:
            "linear-gradient(to right, rgba(8, 8, 8, 0.82) 0%, rgba(8, 8, 8, 0.65) 30%, rgba(8, 8, 8, 0.32) 65%, rgba(8, 8, 8, 0) 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      />

      <motion.div
        style={{ y: heroContentY, opacity: heroContentOpacity }}
        className="container mx-auto px-4 md:px-6 relative z-10 my-auto pb-16 md:pb-24"
      >
        {/* Full-Width Expansive Hero Layout */}
        <div className="max-w-5xl xl:max-w-6xl">
          <div className="space-y-0">
            {/* 1. SPARTAN Engineering Studio Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.52, ease: SPARTAN_EASE }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-xl bg-[#141414] border border-[#C9AEC6]/40 text-[#C9AEC6] text-xs sm:text-sm font-mono uppercase tracking-wider mb-8 shadow-[0_0_15px_rgba(201,174,198,0.12)] transition-colors hover:border-[#C9AEC6]/70"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9AEC6] opacity-70"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9AEC6]"></span>
              </span>
              <span>Automation Engineering Studio</span>
            </motion.div>
            
            {/* 2. Main Headline: WE AUTOMATE THE WORK NOBODY WANTS TO DO. */}
            <motion.h1
              initial={{ opacity: 0, y: 26, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.64, delay: 0.1, ease: SPARTAN_EASE }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-bold tracking-tight text-[#F6EFF5] mb-8 leading-[1.04] max-w-5xl uppercase font-sans drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]"
            >
              <span>We automate the work </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#EAD6E6] to-[#C9AEC6]">
                nobody wants to do.
              </span>
            </motion.h1>
            
            {/* 3. Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: SPARTAN_EASE }}
              className="text-lg sm:text-xl md:text-2xl text-[#E2D5E3] mb-8 leading-relaxed max-w-3xl font-normal [text-shadow:_0_1px_2px_rgba(0,0,0,0.9),_0_2px_8px_rgba(0,0,0,0.6)]"
            >
              You show us the process. We figure out what should be automated, connected, or left to a human.
            </motion.p>

            {/* 4. Small supporting line */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: SPARTAN_EASE }}
              className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-[#BFB2C6] mb-10 [text-shadow:_0_1px_2px_rgba(0,0,0,0.9)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9AEC6] shadow-[0_0_8px_rgba(201,174,198,0.5)]" />
              <span>No automation theatre. Just systems that actually run.</span>
            </motion.div>
            
            {/* 5. CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.56, delay: 0.3, ease: SPARTAN_EASE }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-4"
            >
              <Link
                href="/contact"
                className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-[#C9AEC6] hover:bg-[#EAD6E6] text-[#0B0B0B] px-8 py-4 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase border border-[#EAD6E6]/60 shadow-[0_0_20px_rgba(201,174,198,0.18)] hover:shadow-[0_0_25px_rgba(201,174,198,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out group font-mono cursor-pointer"
              >
                {/* Directional specular sweep on hover */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
                
                <span className="relative z-10">SHOW US YOUR WORKFLOW</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-150 text-[#0B0B0B]" />
              </Link>
              
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2.5 bg-[#141414] hover:bg-[#1A1A1A] border border-white/[0.08] hover:border-[#C9AEC6]/40 text-[#F6EFF5] hover:text-white px-8 py-4 rounded-xl text-xs sm:text-sm font-medium tracking-wider uppercase hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(201,174,198,0.08)] active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out font-mono cursor-pointer"
              >
                <span>SEE WHAT WE&apos;VE BUILT</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C9AEC6] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 6. Studio Capabilities Grid - Shifted down with generous breathing room for the galaxy */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: SPARTAN_EASE }}
        className="w-full mt-28 md:mt-48 border-y border-white/[0.08] bg-[#0E0E0E]/70 backdrop-blur-md relative z-10"
      >
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {SYSTEM_CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            const borderClasses = [
              "border-b sm:border-b lg:border-b-0 sm:border-r lg:border-r border-white/[0.08]",
              "border-b sm:border-b lg:border-b-0 sm:border-r-0 lg:border-r border-white/[0.08]",
              "border-b sm:border-b-0 lg:border-b-0 sm:border-r lg:border-r border-white/[0.08]",
              "border-b-0 sm:border-b-0 lg:border-b-0 sm:border-r-0 lg:border-r-0",
            ];

            return (
              <div
                key={idx}
                className={`py-6 px-6 sm:px-8 xl:px-10 flex flex-col justify-start group hover:bg-white/[0.02] transition-colors duration-200 ${borderClasses[idx]}`}
              >
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <span className="text-[10px] font-mono tracking-widest text-[#C9AEC6]/80 uppercase">
                    {cap.tag}
                  </span>
                  <Icon className="w-3.5 h-3.5 text-[#8E8295] group-hover:text-[#C9AEC6] transition-colors" />
                </div>
                <h3 className="text-sm font-semibold text-[#F6EFF5] tracking-tight mb-1.5 group-hover:text-white transition-colors">
                  {cap.title}
                </h3>
                <p className="text-xs text-[#8E8295] leading-relaxed font-normal">
                  {cap.description}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
