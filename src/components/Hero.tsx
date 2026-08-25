"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Mail, BrainCircuit, CheckCircle, Zap, UserCheck, Play } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const WORKFLOW_STEPS = [
  { id: 1, title: "Customer Email", icon: Mail, desc: '"Where is my order?"', color: "text-blue-400" },
  { id: 2, title: "AI Analysis", icon: BrainCircuit, desc: "Intent: Delivery Delay", color: "text-purple-400" },
  { id: 3, title: "System Check", icon: Zap, desc: "Status: Delayed", color: "text-amber-400" },
  { id: 4, title: "Human Approval", icon: UserCheck, desc: "Approved ✓", color: "text-green-400" },
  { id: 5, title: "Action", icon: CheckCircle, desc: "Send update", color: "text-brand-400" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Copy */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border-brand-500/30 text-brand-300 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
                B2B Workflow Automation
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                Your employees shouldn&apos;t spend their day doing work <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-200">computers can handle.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                We discover repetitive business workflows and build AI-powered automation around them — so your team can focus on decisions, customers, and growth.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-full text-base font-semibold transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] w-full sm:w-auto"
                >
                  Book a Workflow Assessment
                  <ArrowRight className="w-5 h-5" />
                </Link>
                
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-full text-base font-medium transition-all w-full sm:w-auto"
                >
                  See How It Works
                  <ArrowDown className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Workflow Visual */}
          <div className="relative w-full h-[600px] lg:h-[700px] flex items-center justify-center lg:justify-end">
            <div className="absolute w-[120%] lg:w-[150%] h-[120%] bg-gradient-to-b from-brand-900/20 to-transparent blur-3xl -z-10 rounded-full" />
            
            <div className="relative w-full max-w-md flex flex-col gap-4">
              {WORKFLOW_STEPS.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                  className="relative z-10"
                >
                  <div className="glass-card p-4 rounded-xl flex items-center gap-4 border-l-4 border-l-brand-500 hover:border-l-brand-400 transition-colors group">
                    <div className={cn("p-3 rounded-lg bg-white/5", step.color)}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-sm md:text-base">{step.title}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                    
                    {index === 3 && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs font-medium animate-pulse">
                        Required
                      </div>
                    )}
                  </div>
                  
                  {/* Connecting Line */}
                  {index < WORKFLOW_STEPS.length - 1 && (
                    <div className="absolute left-10 bottom-[-16px] w-[2px] h-4 bg-gradient-to-b from-brand-500/50 to-transparent" />
                  )}
                  {index < WORKFLOW_STEPS.length - 1 && (
                    <motion.div 
                      className="absolute left-[39px] bottom-[-12px] w-[4px] h-[4px] rounded-full bg-brand-400"
                      animate={{ y: [0, 16], opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                    />
                  )}
                </motion.div>
              ))}

              {/* Floating elements to make it feel alive */}
              <motion.div
                className="absolute -right-12 top-1/4 glass p-3 rounded-lg flex items-center gap-2 shadow-xl"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs font-medium">99.8% Accuracy</span>
              </motion.div>

              <motion.div
                className="absolute -left-8 bottom-1/4 glass p-3 rounded-lg flex items-center gap-2 shadow-xl"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="w-2 h-2 rounded-full bg-brand-400" />
                <span className="text-xs font-medium">120hrs Saved</span>
              </motion.div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
