"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, ShieldCheck, Database, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { WorkflowNetwork } from "./WorkflowNetwork";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-brand-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Copy */}
          <div className="lg:col-span-6 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-brand-500/30 text-brand-300 text-xs md:text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
                Business Process & Workflow Automation
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.15] uppercase">
                YOUR EMPLOYEES SHOULDN&apos;T SPEND THEIR DAY DOING WORK <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-blue-300 to-indigo-200">COMPUTERS CAN HANDLE.</span>
              </h1>
              
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                We discover repetitive business workflows and build AI-powered automation around the way your company actually works — so your team can focus on decisions, customers and growth.
              </p>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2.5 bg-brand-600 hover:bg-brand-500 text-white px-7 py-4 rounded-full text-sm md:text-base font-semibold transition-all hover:shadow-[0_0_25px_rgba(37,99,235,0.45)] group"
                >
                  SHOW US YOUR WORKFLOW
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-7 py-4 rounded-full text-sm md:text-base font-medium transition-all"
                >
                  SEE HOW IT WORKS
                  <ArrowDown className="w-4 h-4 text-brand-400" />
                </Link>
              </div>

              {/* Core Workflow Pillars replacing unsupported claims */}
              <div className="pt-6 border-t border-white/5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Human-Controlled</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Database className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>System-Integrated</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>Workflow-Specific</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Dynamic Signature Business Workflow Network Tree */}
          <div className="lg:col-span-6 relative w-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full relative"
            >
              <WorkflowNetwork />
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

