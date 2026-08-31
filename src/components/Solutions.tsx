"use client";

import { motion } from "framer-motion";
import {
  Mail,
  FileText,
  Headset,
  ShoppingCart,
  Database,
  TrendingUp,
  BarChart,
  Settings2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const SOLUTIONS = [
  {
    icon: Mail,
    title: "Email Operations",
    desc: "Understand, classify and route incoming emails automatically based on intent, sender status, and context.",
  },
  {
    icon: FileText,
    title: "Document Processing",
    desc: "Extract structured information from unstructured invoices, receipts, PDFs, and vendor forms with high precision.",
  },
  {
    icon: Headset,
    title: "Customer Support",
    desc: "Classify incoming tickets, retrieve contextual history from databases, and prepare accurate response drafts.",
  },
  {
    icon: ShoppingCart,
    title: "Order & Refund Operations",
    desc: "Identify refund requests, verify information, prepare the appropriate action and route it for human approval when required.",
    highlight: true,
  },
  {
    icon: Database,
    title: "Data Operations",
    desc: "Move information reliably between spreadsheets, databases, CRMs, and ERP systems without manual re-entry.",
  },
  {
    icon: TrendingUp,
    title: "Sales Operations",
    desc: "Qualify inbound leads, assign them to the right representatives, and prepare personalized initial outreach.",
  },
  {
    icon: BarChart,
    title: "Operational Reporting",
    desc: "Collect metrics across disparate operational systems and generate recurring summaries for leadership.",
  },
];

export function Solutions() {
  return (
    <section id="solutions" className="py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header with 5-step philosophy */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-brand-500/30 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            Capabilities
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 uppercase text-white"
          >
            WE AUTOMATE THE WORK UNIQUE TO <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-cyan-300 to-blue-200">
              YOUR BUSINESS.
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-2xl glass border border-white/10 text-xs text-muted-foreground font-mono"
          >
            <span>AI Identifies</span>
            <span className="text-brand-400">→</span>
            <span>AI Validates</span>
            <span className="text-brand-400">→</span>
            <span>AI Prepares</span>
            <span className="text-emerald-400 font-bold">→</span>
            <span className="text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">HUMAN APPROVES</span>
            <span className="text-brand-400">→</span>
            <span>SYSTEM EXECUTES</span>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOLUTIONS.map((sol, idx) => (
            <motion.div
              key={sol.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className={`glass-card p-6 rounded-2xl transition-all duration-300 border flex flex-col justify-between group cursor-default ${
                sol.highlight
                  ? "border-emerald-500/30 bg-emerald-950/10 hover:border-emerald-500/50"
                  : "border-white/5 hover:border-brand-500/30 hover:bg-white/5"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <sol.icon className={`w-8 h-8 ${sol.highlight ? "text-emerald-400" : "text-muted-foreground group-hover:text-brand-400"} transition-colors`} />
                  {sol.highlight && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                      <ShieldCheck className="w-3 h-3" /> Safe Action
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{sol.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {sol.desc}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Custom Workflow Card - Emphasized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: SOLUTIONS.length * 0.08 }}
            className="md:col-span-2 lg:col-span-4 glass-card p-8 rounded-2xl border border-brand-500/40 bg-brand-900/15 hover:bg-brand-900/25 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-[80px] rounded-full" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-5">
                <div className="p-3.5 rounded-xl bg-brand-500/20 text-brand-400 shrink-0">
                  <Settings2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Custom Proprietary Workflow</h3>
                  <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
                    If your operational process doesn&apos;t fit a predefined category, we build the automation specifically around your internal systems, spreadsheets, and unique business logic.
                  </p>
                </div>
              </div>
              <Link
                href="#contact"
                className="px-6 py-3.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] whitespace-nowrap inline-flex items-center gap-2 shrink-0"
              >
                SHOW US YOUR WORKFLOW
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
