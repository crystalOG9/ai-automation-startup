"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, ShieldAlert, ArrowRight } from "lucide-react";

export function HumanInTheLoop() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Automation doesn&apos;t mean giving AI <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">unlimited control.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground"
          >
            You decide which actions happen automatically, and which require human authorization.
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-6">
          
          {/* Automatic Level */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl border border-green-500/20 bg-green-950/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
              <h3 className="text-xl font-bold text-white tracking-tight">Automatic</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6 h-10">
              Low-risk, highly predictable repetitive tasks.
            </p>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-black/40 border border-white/5">
              <span className="font-medium text-brand-300">AI</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-green-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Execute
              </span>
            </div>
          </motion.div>

          {/* Review Level */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 rounded-2xl border border-yellow-500/20 bg-yellow-950/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.6)]" />
              <h3 className="text-xl font-bold text-white tracking-tight">Review</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6 h-10">
              Uncertain tasks that need a quick human glance.
            </p>
            <div className="flex flex-wrap items-center gap-2 p-3 rounded-lg bg-black/40 border border-white/5">
              <span className="font-medium text-brand-300">AI</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-yellow-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> Human Review
              </span>
            </div>
          </motion.div>

          {/* Approval Level */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 rounded-2xl border border-red-500/20 bg-red-950/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)] animate-pulse" />
              <h3 className="text-xl font-bold text-white tracking-tight">Approval Required</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6 h-10">
              High-risk actions involving money, security, or major updates.
            </p>
            <div className="flex flex-wrap items-center gap-2 p-3 rounded-lg bg-black/40 border border-white/5 text-sm">
              <span className="font-medium text-brand-300">AI Prepares</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-red-400 flex items-center gap-1">
                <ShieldAlert className="w-4 h-4" /> Human Approval
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-green-400">Execute</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
