"use client";

import { motion } from "framer-motion";
import { Search, Target, PenTool, Cpu, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    num: "01",
    title: "Discover",
    desc: "We visit or speak with your team and understand how work actually happens.",
    icon: Search,
  },
  {
    num: "02",
    title: "Identify",
    desc: "We find repetitive, expensive, time-consuming workflows.",
    icon: Target,
  },
  {
    num: "03",
    title: "Design",
    desc: "We design an automation specifically around your existing process.",
    icon: PenTool,
  },
  {
    num: "04",
    title: "Automate",
    desc: "AI + software + integrations handle the repetitive workload.",
    icon: Cpu,
  },
  {
    num: "05",
    title: "Optimize",
    desc: "We measure the results and continuously improve the workflow.",
    icon: LineChart,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="max-w-3xl mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
          >
            How it works
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[45px] left-[5%] right-[5%] h-[2px] bg-white/10 z-0" />
          <motion.div 
            className="hidden lg:block absolute top-[45px] left-[5%] h-[2px] bg-brand-500 z-0 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-4 justify-between relative z-10">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.2 }}
                className="flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center gap-6 lg:gap-8 flex-1 group"
              >
                {/* Node */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-full glass border-2 border-white/10 flex items-center justify-center relative z-10 group-hover:border-brand-500 transition-colors bg-background">
                    <step.icon className="w-6 h-6 text-muted-foreground group-hover:text-brand-400 transition-colors" />
                  </div>
                  <div className="absolute inset-0 bg-brand-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Mobile connecting line */}
                  {idx < STEPS.length - 1 && (
                    <div className="lg:hidden absolute top-16 bottom-[-32px] left-1/2 -translate-x-1/2 w-[2px] bg-white/10" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-2 lg:pt-0">
                  <div className="text-brand-400 font-mono text-sm mb-2">{step.num}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-[250px] mx-auto">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
