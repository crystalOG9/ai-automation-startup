"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown, Layers, Cpu, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { SPARTAN_EASE } from "@/lib/motion";
import { scrollToSection } from "@/lib/utils";

const SYSTEM_CAPABILITIES = [
  {
    tag: "01 / INTEGRATION",
    title: "Zero System Migration",
    description: "Hooks into your existing databases, ERPs, CRM & inboxes without replacing software.",
    icon: Layers,
  },
  {
    tag: "02 / ARCHITECTURE",
    title: "Deterministic Logic",
    description: "Custom rule pipelines and audited code. Zero hallucinations or black-box drift.",
    icon: Cpu,
  },
  {
    tag: "03 / GOVERNANCE",
    title: "Human-in-the-Loop",
    description: "Policy-enforced sign-offs for sensitive financial actions, payouts, and client comms.",
    icon: ShieldCheck,
  },
  {
    tag: "04 / DELIVERY",
    title: "Fixed Scope & Milestones",
    description: "Predictable engineering sprints delivered in weeks with production SLA validation.",
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
    <section id="hero" ref={sectionRef} className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-0 md:pt-40 overflow-hidden perspective-1200">
      {/* Subtle controlled atmospheric lighting tuned to graphite and faint champagne */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[480px] bg-[#141414]/[0.3] blur-[180px] rounded-full pointer-events-none select-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#C9AEC6]/[0.025] blur-[160px] rounded-full pointer-events-none select-none" />
      
      <motion.div
        style={{ y: heroContentY, opacity: heroContentOpacity }}
        className="container mx-auto px-4 md:px-6 relative z-10 my-auto"
      >
        {/* Full-Width Expansive Hero Layout in Obsidian, Graphite & Champagne Gold */}
        <div className="max-w-5xl xl:max-w-6xl">
          <div className="space-y-0">
            {/* 1. SPARTAN Branding / Technical Eyebrow Badge */}
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
              <span>Custom Process &amp; Workflow Automation</span>
            </motion.div>
            
            {/* 2. Main Headline with Cosmic Starlight into Galaxy Stardust */}
            <motion.h1
              initial={{ opacity: 0, y: 26, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.64, delay: 0.1, ease: SPARTAN_EASE }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.65rem] font-bold tracking-tight text-[#C9AEC6] mb-8 leading-[1.05] max-w-5xl"
            >
              <span className="text-[#C9AEC6]">Your team shouldn&apos;t spend all day doing work </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#EAD6E6] to-[#C9AEC6]">
                computers can handle.
              </span>
            </motion.h1>
            
            {/* 3. Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: SPARTAN_EASE }}
              className="text-lg sm:text-xl md:text-2xl text-[#BAAEC0] mb-10 leading-relaxed max-w-3xl font-normal"
            >
              We identify repetitive operational steps and build custom automation directly into your existing software — keeping your operators focused on <strong className="text-[#F6EFF5] font-semibold">decisions and exceptions</strong>.
            </motion.p>
            
            {/* 4. CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.56, delay: 0.3, ease: SPARTAN_EASE }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-14"
            >
              <a
                href="#contact"
                onClick={(e) => scrollToSection("#contact", e)}
                className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-[#C9AEC6] hover:bg-[#EAD6E6] text-[#0B0B0B] px-8 py-4 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase border border-[#EAD6E6]/60 shadow-[0_0_20px_rgba(201,174,198,0.18)] hover:shadow-[0_0_25px_rgba(201,174,198,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out group font-mono cursor-pointer"
              >
                {/* Directional specular sweep on hover */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
                
                <span className="relative z-10">SHOW US YOUR WORKFLOW</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-150 text-[#0B0B0B]" />
              </a>
              
              <a
                href="#how-it-works"
                onClick={(e) => scrollToSection("#how-it-works", e)}
                className="inline-flex items-center justify-center gap-2.5 bg-[#141414] hover:bg-[#1A1A1A] border border-white/[0.08] hover:border-[#C9AEC6]/40 text-[#F6EFF5] hover:text-white px-8 py-4 rounded-xl text-xs sm:text-sm font-medium tracking-wider uppercase hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(201,174,198,0.08)] active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out font-mono cursor-pointer"
              >
                <span>SEE HOW IT WORKS</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#C9AEC6]" />
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 5. Enterprise Architectural Guarantees & System Capabilities Grid */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: SPARTAN_EASE }}
        className="w-full mt-14 border-y border-white/[0.08] bg-[#0E0E0E]/90 backdrop-blur-md relative z-10"
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
