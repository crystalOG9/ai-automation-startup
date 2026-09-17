"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Terminal, Sparkles, ArrowRight } from "lucide-react";
import { defaultViewport, fadeInLeft, fadeInRight } from "@/lib/motion";

export function SpartanWhoWeAre() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#0B0B0B] perspective-1200">
      {/* Subtle atmospheric glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#C9AEC6]/[0.025] blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          
          {/* Left Column: Mission & Identity */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInLeft}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-[#C9AEC6]/30 text-[#C9AEC6] text-xs font-mono font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C9AEC6]" />
              <span>Identity &amp; Approach</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F6EFF5] uppercase font-sans leading-[1.08]">
              We&apos;re <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#EAD6E6] to-[#C9AEC6]">SPARTAN.</span>
            </h2>

            <p className="text-lg sm:text-xl text-[#BAAEC0] leading-relaxed font-normal">
              A small technical team building custom automation systems for businesses that are tired of doing the same thing 500 times.
            </p>

            <p className="text-sm sm:text-base text-[#8E8295] leading-relaxed">
              We aren&apos;t a 40-person agency charging you for pitch decks. We sit down with your operators, inspect where data gets stuck between software, and write the custom glue code, database connectors, and AI triage pipelines that fix it permanently.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C9AEC6] hover:text-[#EAD6E6] transition-colors group cursor-pointer"
              >
                <span>EXPLORE CAPABILITIES</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-white/20">/</span>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#BAAEC0] hover:text-[#F6EFF5] transition-colors group cursor-pointer"
              >
                <span>MORE ABOUT US</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Code/Terminal Identity Block */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInRight}
            className="lg:col-span-6"
          >
            <div className="relative rounded-2xl border border-white/[0.08] bg-[#121212]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden font-mono text-xs sm:text-sm group hover:border-[#C9AEC6]/40 transition-colors duration-300">
              
              {/* Terminal Window Chrome / Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#171717] border-b border-white/[0.06] select-none">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#EF4444]/60 inline-block border border-white/10" />
                  <span className="w-3 h-3 rounded-full bg-[#EAB308]/60 inline-block border border-white/10" />
                  <span className="w-3 h-3 rounded-full bg-[#22C55E]/60 inline-block border border-white/10" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#8E8295]">
                  <Terminal className="w-3 h-3 text-[#C9AEC6]" />
                  <span>spartan ~ whoami</span>
                </div>
                <div className="text-[10px] text-[#8E8295]/50 tracking-wider">zsh</div>
              </div>

              {/* Terminal Body */}
              <div className="p-5 sm:p-6 space-y-4 text-[#BAAEC0]">
                {/* Command */}
                <div className="flex items-center gap-2 text-[#F6EFF5]">
                  <span className="text-[#C9AEC6] select-none font-bold">$</span>
                  <span className="font-semibold tracking-wide">whoami</span>
                </div>

                {/* Main Return Output */}
                <div className="pl-4 border-l-2 border-[#C9AEC6]/30 py-1">
                  <div className="text-xl sm:text-2xl font-black text-[#F6EFF5] tracking-wider mb-2 font-sans">
                    SPARTAN
                  </div>
                  <div className="text-xs text-[#8E8295] leading-relaxed">
                    Custom automation systems &amp; engineering studio.
                  </div>
                </div>

                {/* Core Stack Disciplines */}
                <div className="pt-2">
                  <div className="text-[11px] uppercase tracking-widest text-[#8E8295] mb-2 font-semibold">
                    {"// CORE CAPABILITIES"}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 text-[#F6EFF5]">
                      <span className="text-[#C9AEC6]">›</span>
                      <span>web</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#F6EFF5]">
                      <span className="text-[#C9AEC6]">›</span>
                      <span>backend</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#F6EFF5]">
                      <span className="text-[#C9AEC6]">›</span>
                      <span>APIs</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#F6EFF5]">
                      <span className="text-[#C9AEC6]">›</span>
                      <span>automation</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#F6EFF5] col-span-2">
                      <span className="text-[#C9AEC6]">›</span>
                      <span>marketing</span>
                    </div>
                  </div>
                </div>

                {/* Telemetry / Quirky Real-World Status */}
                <div className="pt-3 border-t border-white/[0.06] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8E8295]">status:</span>
                    <span className="text-[#22C55E] font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                      building
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8E8295]">meetings:</span>
                    <span className="text-[#F6EFF5]">minimal</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8E8295]">coffee:</span>
                    <span className="text-[#C9AEC6]">questionable</span>
                  </div>
                </div>

                {/* Interactive cursor line */}
                <div className="pt-2 flex items-center gap-2 text-[#C9AEC6]">
                  <span className="select-none font-bold">$</span>
                  <span className="w-2 h-4 bg-[#C9AEC6] animate-pulse inline-block" />
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
