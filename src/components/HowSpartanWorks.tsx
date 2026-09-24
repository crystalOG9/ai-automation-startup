"use client";

import { motion } from "framer-motion";
import { MessageSquare, Network, Cpu, ShieldCheck, Rocket, ArrowRight } from "lucide-react";
import { defaultViewport, scaleReveal, SPARTAN_EASE } from "@/lib/motion";
import { scrollToSection } from "@/lib/utils";

const STEPS = [
  {
    num: "01",
    title: "YOU SHOW US THE MESS",
    description: "Tell us what your team keeps doing manually.",
    detail: "Walk us through the repetitive screens, spreadsheets, or inboxes slowing your people down.",
    icon: MessageSquare,
  },
  {
    num: "02",
    title: "WE MAP THE PROCESS",
    description: "We break down the workflow and identify where automation actually makes sense.",
    detail: "We pinpoint mechanical steps versus genuine judgement calls to keep operations safe.",
    icon: Network,
  },
  {
    num: "03",
    title: "WE DESIGN THE SYSTEM",
    description: "APIs, integrations, automation and AI — whatever the workflow actually needs.",
    detail: "Custom connectors, error handling pipelines, and database sync built to fit your tools.",
    icon: Cpu,
  },
  {
    num: "04",
    title: "HUMAN CONTROL",
    description: "Important decisions can stay with your team.",
    detail: "Financial sign-offs, customer exceptions, and sensitive approvals remain with your managers.",
    icon: ShieldCheck,
  },
  {
    num: "05",
    title: "DEPLOY",
    description: "The finished system becomes part of the company's real workflow.",
    detail: "Shipped directly into production with monitoring, logs, and zero workflow disruption.",
    icon: Rocket,
  },
];

export function HowSpartanWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-[#0A0A0A] perspective-1200">
      {/* Background visual accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-[#C9AEC6]/[0.02] blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={scaleReveal}
          className="max-w-3xl mx-auto text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-[#C9AEC6]/30 text-[#C9AEC6] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <span>Execution Roadmap</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F6EFF5] uppercase font-sans mb-6 drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
            HOW THIS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#EAD6E6] to-[#C9AEC6]">USUALLY GOES.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#E2D5E3] max-w-2xl mx-auto leading-relaxed font-normal [text-shadow:_0_1px_2px_rgba(0,0,0,0.9),_0_2px_8px_rgba(0,0,0,0.6)]">
            No 6-month consulting retainer. We take one friction point, understand the ground truth, and build the system to solve it.
          </p>
        </motion.div>

        {/* 5-Step Process Timeline / Cards */}
        <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6 mb-16">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={defaultViewport}
                transition={{
                  duration: 0.52,
                  delay: idx * 0.08,
                  ease: SPARTAN_EASE,
                }}
                className="group"
              >
                <div className="p-6 sm:p-7 rounded-2xl border border-white/[0.08] bg-[#121212] hover:bg-[#161616] hover:border-[#C9AEC6]/40 transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md">
                  
                  {/* Step indicator & title */}
                  <div className="flex items-start sm:items-center gap-4 sm:gap-5 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#C9AEC6] shrink-0 group-hover:border-[#C9AEC6]/40 group-hover:scale-105 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="text-[11px] font-mono font-bold text-[#C9AEC6] uppercase tracking-wider">
                          STEP {step.num}
                        </span>
                        <span className="text-white/20 text-xs">/</span>
                        <h3 className="text-base sm:text-lg font-black text-[#F6EFF5] uppercase font-sans tracking-wide group-hover:text-white transition-colors">
                          {step.title}
                        </h3>
                      </div>

                      <p className="text-sm font-medium text-[#F6EFF5] mb-1">
                        &ldquo;{step.description}&rdquo;
                      </p>

                      <p className="text-xs text-[#8E8295] leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>

                  {/* Right Status Badge */}
                  <div className="hidden lg:flex items-center text-[10px] font-mono uppercase tracking-widest text-[#8E8295] px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05] group-hover:text-[#C9AEC6] group-hover:border-[#C9AEC6]/20 transition-colors shrink-0">
                    {`STAGE 0${idx + 1} // 05`}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Prompt */}
        <div className="text-center">
          <a
            href="#contact"
            onClick={(e) => scrollToSection("#contact", e)}
            className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-[#C9AEC6] hover:bg-[#EAD6E6] text-[#0B0B0B] px-8 py-4 rounded-xl text-xs sm:text-sm font-mono font-bold uppercase tracking-wider border border-[#EAD6E6]/60 shadow-[0_0_20px_rgba(201,174,198,0.18)] hover:shadow-[0_0_25px_rgba(201,174,198,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 ease-out group cursor-pointer"
          >
            <span className="relative z-10">START AT STEP 01 — SHOW US THE MESS</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
