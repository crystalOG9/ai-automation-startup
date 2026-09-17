"use client";

import { motion } from "framer-motion";
import { MessageSquareQuote, ArrowRight } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

import {
  defaultViewport,
  SPARTAN_EASE,
} from "@/lib/motion";

export function CustomerDiscovery() {
  return (
    <section className="py-20 relative overflow-hidden bg-[#0B0B0B] border-t border-white/[0.06] perspective-1200">
      <div className="container mx-auto px-4 md:px-6 relative z-10 preserve-3d">
        <motion.div
          initial={{ opacity: 0, scale: 0.90, z: -120, y: 40, rotateX: 5 }}
          whileInView={{ opacity: 1, scale: 1, z: 0, y: 0, rotateX: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.76, ease: SPARTAN_EASE }}
          className="max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-3xl border border-[#C9AEC6]/30 bg-gradient-to-br from-[#161616] via-[#111111] to-[#141414] text-center relative overflow-hidden shadow-2xl"
        >
          {/* Ambient subtle glow */}
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-[#C9AEC6]/[0.025] blur-[90px] pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-[#C9AEC6]/30 text-[#C9AEC6] text-xs font-semibold uppercase tracking-wider mb-6">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#C9AEC6]" />
            Workflow Review
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F6EFF5] mb-4">
            Tell us about one workflow that costs your team hours.
          </h2>

          <p className="text-base md:text-lg text-[#8E8295] max-w-2xl mx-auto mb-4 leading-relaxed">
            We consult with founders and operations leads to isolate the repetitive digital tasks wasting the most manual effort.
          </p>

          <p className="text-base md:text-lg text-[#F6EFF5] font-medium mb-8">
            Share a single manual bottleneck, and we&apos;ll outline how it can be automated with built-in human control.
          </p>

          <div>
            <a
              href="#contact"
              onClick={(e) => scrollToSection("#contact", e)}
              className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-[#C9AEC6] hover:bg-[#EAD6E6] text-[#0B0B0B] px-8 py-3.5 rounded-xl text-sm md:text-base font-semibold uppercase font-mono tracking-wider border border-[#EAD6E6]/60 shadow-[0_0_20px_rgba(201,174,198,0.18)] hover:shadow-[0_0_30px_rgba(201,174,198,0.3)] hover:-translate-y-0.5 hover:scale-[1.015] active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out group cursor-pointer"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
              <span className="relative z-10">SUBMIT YOUR BOTTLENECK</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-150 text-[#0B0B0B]" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
