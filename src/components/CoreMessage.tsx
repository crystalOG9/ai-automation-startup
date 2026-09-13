"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Users } from "lucide-react";

const AI_TASKS = [
  "Extract Data",
  "Classify Inbound",
  "Cross-Reference ERP",
  "Parse Documents",
  "Sync Spreadsheets",
  "Draft Responses",
  "Validate Rules",
];

const HUMAN_TASKS = [
  "Approve High Values",
  "Handle Edge Cases",
  "Client Negotiation",
  "Dispute Resolution",
  "Strategic Exceptions",
  "Account Relationships",
];

import {
  fadeInLeft,
  fadeInRight,
  scaleReveal,
  defaultViewport,
  SPARTAN_EASE,
} from "@/lib/motion";

export function CoreMessage() {
  return (
    <section id="core-message" className="py-24 relative overflow-hidden bg-white/5 perspective-1200">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/20 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={scaleReveal}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            We don&apos;t replace your team. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#fda4af] to-[#e11d48]">We remove the mechanical work around them.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Software executes predictable steps. Your operators handle exceptions, negotiations, and high-value decisions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto items-center preserve-3d">

          {/* AI Side — Enters from LEFT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInLeft}
            className="glass-card p-8 rounded-3xl border border-white/10 relative group transition-all duration-300 hover:border-white/20 shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#881337]/20 to-transparent rounded-3xl pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />

            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#881337]/30 flex items-center justify-center mb-4 text-[#e11d48]">
                <BrainCircuit className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">What Software Handles</h3>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {AI_TASKS.map((task, idx) => (
                <motion.div
                  key={task}
                  initial={{ opacity: 0, scale: 0.82, y: 16 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.44,
                    delay: 0.12 + idx * 0.05,
                    ease: SPARTAN_EASE,
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-muted-foreground font-medium text-sm hover:bg-white/10 hover:text-white transition-colors cursor-default"
                >
                  {task}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Human Side — Enters from RIGHT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInRight}
            className="glass-card p-8 rounded-3xl border border-[#e11d48]/30 relative group transition-all duration-300 hover:border-[#e11d48]/60 shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#e11d48]/10 to-transparent rounded-3xl pointer-events-none transition-opacity group-hover:opacity-100 opacity-60" />

            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#e11d48]/10 flex items-center justify-center mb-4 text-[#ffffff]">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">What Your Team Handles</h3>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {HUMAN_TASKS.map((task, idx) => (
                <motion.div
                  key={task}
                  initial={{ opacity: 0, scale: 0.82, y: 16 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.44,
                    delay: 0.16 + idx * 0.05,
                    ease: SPARTAN_EASE,
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 rounded-full bg-[#e11d48]/10 border border-[#e11d48]/20 text-[#ffffff] font-medium text-sm hover:bg-[#e11d48]/20 hover:text-white transition-colors cursor-default shadow-[0_0_15px_rgba(225, 29, 72,0.08)]"
                >
                  {task}
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
