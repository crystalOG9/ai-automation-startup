"use client";

import { motion } from "framer-motion";
import { MessageSquareQuote, ArrowRight } from "lucide-react";
import Link from "next/link";

export function CustomerDiscovery() {
  return (
    <section className="py-20 relative overflow-hidden bg-brand-950/10 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card p-8 md:p-12 rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-950/40 via-black/40 to-brand-900/20 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Ambient subtle glow */}
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-brand-500/10 blur-[90px] pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-brand-500/30 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <MessageSquareQuote className="w-3.5 h-3.5 text-brand-400" />
            Early-Stage Discovery
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 uppercase">
            WE&apos;RE NOT BUILDING IN A VACUUM.
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
            We&apos;re currently speaking with businesses to understand where repetitive digital work consumes the most employee time.
          </p>

          <p className="text-base md:text-lg text-white font-medium mb-8">
            Tell us about one workflow that drives your team crazy.
          </p>

          <div>
            <Link
              href="#contact"
              className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-brand-600 hover:bg-brand-500 text-white px-8 py-3.5 rounded-xl text-sm md:text-base font-semibold uppercase font-mono tracking-wider border border-brand-400/60 shadow-[0_0_0_1px_rgba(59,130,246,0.35)] hover:shadow-[0_0_25px_rgba(37,99,235,0.65),0_0_0_1.5px_rgba(96,165,250,0.9)] hover:-translate-y-0.5 hover:scale-[1.015] active:translate-y-0 active:scale-[0.98] transition-all duration-150 ease-out group"
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
