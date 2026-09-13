"use client";

import { motion } from "framer-motion";
import { MessageSquareQuote, ArrowRight } from "lucide-react";
import Link from "next/link";

import {
  defaultViewport,
  SPARTAN_EASE,
} from "@/lib/motion";

export function CustomerDiscovery() {
  return (
    <section className="py-20 relative overflow-hidden bg-[#090607]/60 border-t border-white/5 perspective-1200">
      <div className="container mx-auto px-4 md:px-6 relative z-10 preserve-3d">
        <motion.div
          initial={{ opacity: 0, scale: 0.90, z: -120, y: 40, rotateX: 5 }}
          whileInView={{ opacity: 1, scale: 1, z: 0, y: 0, rotateX: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.76, ease: SPARTAN_EASE }}
          className="max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-3xl border border-[#e11d48]/30 bg-gradient-to-br from-[#120b0e]/90 via-[#090607]/90 to-[#1c1114]/80 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Ambient subtle glow */}
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-[#881337]/25 blur-[90px] pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-[#e11d48]/30 text-[#e11d48] text-xs font-semibold uppercase tracking-wider mb-6">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#e11d48]" />
            Workflow Review
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Tell us about one workflow that costs your team hours.
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
            We consult with founders and operations leads to isolate the repetitive digital tasks wasting the most manual effort.
          </p>

          <p className="text-base md:text-lg text-white font-medium mb-8">
            Share a single manual bottleneck, and we&apos;ll outline how it can be automated with built-in human control.
          </p>

          <div>
            <Link
              href="#contact"
              className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#e11d48] to-[#be123c] text-white px-8 py-3.5 rounded-xl text-sm md:text-base font-semibold uppercase font-mono tracking-wider border border-[#e11d48]/60 shadow-[0_0_20px_rgba(225, 29, 72,0.3)] hover:brightness-105 hover:shadow-[0_0_30px_rgba(225, 29, 72,0.5)] hover:-translate-y-0.5 hover:scale-[1.015] active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out group"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
              <span className="relative z-10">SHOW US YOUR WORKFLOW</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-150" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
