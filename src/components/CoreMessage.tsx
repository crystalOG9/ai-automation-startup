"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const AI_TASKS = [
  "Read",
  "Classify",
  "Extract",
  "Compare",
  "Organize",
  "Draft",
  "Update",
];

const HUMAN_TASKS = [
  "Decide",
  "Approve",
  "Solve",
  "Negotiate",
  "Create",
  "Lead",
];

export function CoreMessage() {
  return (
    <section id="core-message" className="py-24 relative overflow-hidden bg-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/20 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6"
          >
            We don&apos;t replace your employees. <br className="hidden md:block" />
            <span className="text-brand-400">We remove the repetitive work around them.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground"
          >
            AI handles the predictable work. Humans handle the exceptions, the relationships, and the strategy.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto items-center">
          
          {/* AI Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-3xl border border-brand-500/20 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-transparent rounded-3xl pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />
            
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-4 text-brand-400">
                <BrainCircuit className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">AI Handles</h3>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {AI_TASKS.map((task, idx) => (
                <motion.div
                  key={task}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-muted-foreground font-medium text-sm hover:bg-white/10 hover:text-white transition-colors cursor-default"
                >
                  {task}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Human Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-3xl border border-blue-500/20 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-3xl pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />
            
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 text-blue-400">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Humans Focus On</h3>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {HUMAN_TASKS.map((task, idx) => (
                <motion.div
                  key={task}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-200 font-medium text-sm hover:bg-blue-500/20 hover:text-white transition-colors cursor-default shadow-[0_0_15px_rgba(59,130,246,0.1)]"
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
