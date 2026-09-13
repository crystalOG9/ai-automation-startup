"use client";

import { motion } from "framer-motion";

const INDUSTRIES = [
  "E-commerce",
  "Logistics",
  "Manufacturing",
  "Accounting",
  "Real Estate",
  "Customer Support",
  "Education",
  "Professional Services",
];

import {
  scaleReveal,
  defaultViewport,
  SPARTAN_EASE,
} from "@/lib/motion";

export function Industries() {
  return (
    <section id="industries" className="py-24 relative border-t border-white/[0.06] perspective-1200">
      <div className="container mx-auto px-4 md:px-6">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={scaleReveal}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-[#F6EFF5]">
            Built for operations heavy in <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#EAD6E6] to-[#C9AEC6]">
              daily data handoffs.
            </span>
          </h2>
          <p className="text-base md:text-lg text-[#8E8295] max-w-2xl mx-auto leading-relaxed">
            Any business managing high-volume email intake, document parsing, or cross-system updates can eliminate hours of manual entry.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto preserve-3d">
          {INDUSTRIES.map((industry, idx) => (
            <motion.div
              key={industry}
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: idx * 0.05,
                ease: SPARTAN_EASE,
              }}
              whileHover={{ y: -3, scale: 1.02 }}
              className="px-6 py-3 rounded-xl glass-card border border-white/[0.06] hover:border-[#C9AEC6]/40 hover:text-[#F6EFF5] hover:bg-[#161616] hover:shadow-[0_0_15px_rgba(201,174,198,0.08)] transition-all cursor-default text-[#BAAEC0] font-medium shadow-md bg-[#141414]"
            >
              {industry}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
