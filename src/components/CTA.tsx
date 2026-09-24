"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { InstagramIcon } from "@/components/InstagramIcon";
import { defaultViewport, SPARTAN_EASE } from "@/lib/motion";

export function CTA() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#0B0B0B] perspective-1200">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C9AEC6]/30 to-transparent" />
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-80 bg-[#C9AEC6]/[0.025] blur-[170px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Core Value & Call To Action */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6, ease: SPARTAN_EASE }}
            className="space-y-6"
          >
            {/* Eyebrow with pulsing dot */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-xl bg-[#141414] border border-[#C9AEC6]/40 text-[#C9AEC6] text-xs sm:text-sm font-mono uppercase tracking-wider shadow-[0_0_15px_rgba(201,174,198,0.12)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9AEC6] opacity-70"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9AEC6]"></span>
              </span>
              <span>Direct Workflow Assessment</span>
            </div>

            {/* Headline with requested exact text */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F6EFF5] leading-[1.06] uppercase font-sans">
              <span>Got a process that </span>
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#EAD6E6] to-[#C9AEC6]">
                should be automated?
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-[#F6EFF5] font-semibold leading-relaxed [text-shadow:_0_1px_2px_rgba(0,0,0,0.9)]">
              Show us what you&apos;re doing manually.
            </p>

            <p className="text-base sm:text-lg text-[#E2D5E3] leading-relaxed font-normal max-w-2xl [text-shadow:_0_1px_2px_rgba(0,0,0,0.9),_0_2px_8px_rgba(0,0,0,0.6)]">
              We&apos;ll tell you whether it can actually be automated — directly, honestly, and without a 40-slide sales pitch.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-[#C9AEC6] hover:bg-[#EAD6E6] text-[#0B0B0B] px-8 py-4 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase border border-[#EAD6E6]/60 shadow-[0_0_20px_rgba(201,174,198,0.18)] hover:shadow-[0_0_25px_rgba(201,174,198,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 ease-out group font-mono cursor-pointer text-center"
              >
                <span className="relative z-10">SHOW US YOUR WORKFLOW</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-150 text-[#0B0B0B]" />
              </Link>

              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2.5 bg-[#141414] hover:bg-[#1A1A1A] border border-white/[0.08] hover:border-[#C9AEC6]/40 text-[#F6EFF5] hover:text-white px-8 py-4 rounded-xl text-xs sm:text-sm font-medium tracking-wider uppercase hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(201,174,198,0.08)] active:translate-y-0 transition-all duration-150 ease-out font-mono cursor-pointer text-center"
              >
                <span>SEE WHAT WE&apos;VE BUILT</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C9AEC6] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Direct Contact Options */}
            <div className="pt-8 border-t border-white/10">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8E8295] mb-3 font-mono">
                Direct Inquiry Channels
              </div>
              <div className="grid sm:grid-cols-2 gap-3 max-w-lg">
                <a
                  href="mailto:sparten.tech26@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-[#C9AEC6]/40 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#C9AEC6]/10 border border-[#C9AEC6]/20 flex items-center justify-center text-[#C9AEC6] group-hover:scale-105 transition-transform shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-semibold text-[#8E8295] tracking-wider font-mono">Email Directly</div>
                    <div className="text-xs font-medium text-[#F6EFF5] truncate group-hover:text-[#EAD6E6] transition-colors">
                      sparten.tech26@gmail.com
                    </div>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/spartantech.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-[#C9AEC6]/30 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#BAAEC0] group-hover:text-[#C9AEC6] group-hover:scale-105 transition-transform shrink-0">
                    <InstagramIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-semibold text-[#8E8295] tracking-wider font-mono">Instagram</div>
                    <div className="text-xs font-medium text-[#F6EFF5] truncate group-hover:text-[#C9AEC6] transition-colors">
                      @spartantech.ai
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
