"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Users } from "lucide-react";

const AI_TASKS = [
  "Extract & Parse Data",
  "Classify Inbound",
  "Cross-Reference ERP",
  "Sync Spreadsheets",
  "Draft Responses",
  "Validate Business Rules",
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
    <section id="core-message" className="py-24 relative overflow-hidden bg-[#0B0B0B]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={scaleReveal}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#F6EFF5] mb-6">
            We don&apos;t replace your team. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#EAD6E6] to-[#C9AEC6]">We remove the mechanical work around them.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#8E8295] leading-relaxed">
            Software executes predictable steps. Your operators handle exceptions, negotiations, and high-value decisions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto items-stretch">

          {/* AI Side — Enters from LEFT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInLeft}
            className="glass-card p-8 md:p-10 rounded-3xl border border-white/[0.06] bg-[#141414] relative group transition-all duration-300 hover:border-[#C9AEC6]/40 shadow-xl flex flex-col justify-between h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#C9AEC6]/[0.06] to-transparent rounded-3xl pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />

            <div className="flex flex-col items-center text-center mb-8 shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-[#C9AEC6]/10 flex items-center justify-center mb-4 text-[#C9AEC6]">
                <BrainCircuit className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#F6EFF5] tracking-tight">What Software Handles</h3>
            </div>

            <div className="flex flex-wrap justify-center content-center gap-3 flex-1">
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
                  className="px-4 py-2.5 rounded-full bg-[#1A1A1A] border border-white/[0.06] text-[#8E8295] font-medium text-sm hover:bg-white/10 hover:text-[#F6EFF5] transition-colors cursor-default"
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
            className="glass-card p-8 md:p-10 rounded-3xl border border-[#C9AEC6]/30 bg-[#161616] relative group transition-all duration-300 hover:border-[#C9AEC6]/60 shadow-xl flex flex-col justify-between h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#C9AEC6]/10 to-transparent rounded-3xl pointer-events-none transition-opacity group-hover:opacity-100 opacity-60" />

            <div className="flex flex-col items-center text-center mb-8 shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-[#C9AEC6]/15 flex items-center justify-center mb-4 text-[#C9AEC6]">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#F6EFF5] tracking-tight">What Your Team Handles</h3>
            </div>

            <div className="flex flex-wrap justify-center content-center gap-3 flex-1">
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
                  className="px-4 py-2.5 rounded-full bg-[#C9AEC6]/10 border border-[#C9AEC6]/30 text-[#F6EFF5] font-medium text-sm hover:bg-[#C9AEC6]/20 hover:text-white transition-colors cursor-default shadow-[0_0_15px_rgba(201,174,198,0.08)]"
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
