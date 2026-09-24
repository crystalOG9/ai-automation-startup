"use client";

import { motion } from "framer-motion";
import { Layout, Server, Cog, Network, Sparkles, ArrowRight } from "lucide-react";
import { defaultViewport, scaleReveal, SPARTAN_EASE } from "@/lib/motion";
import Link from "next/link";
import { PrecisionCard } from "@/components/PrecisionCard";

const CAPABILITIES = [
  {
    num: "01",
    name: "WEB",
    headline: "Interfaces and business websites built around how people actually use them.",
    tags: ["Next.js", "React", "Design Systems", "Dashboards"],
    icon: Layout,
  },
  {
    num: "02",
    name: "BACKEND",
    headline: "APIs, databases and systems that make everything actually work.",
    tags: ["APIs", "PostgreSQL", "Supabase", "Architecture"],
    icon: Server,
  },
  {
    num: "03",
    name: "AUTOMATION",
    headline: "Repetitive business processes turned into reliable workflows.",
    tags: ["Deterministic Rules", "Event Triggers", "Error Recovery"],
    icon: Cog,
  },
  {
    num: "04",
    name: "INTEGRATIONS",
    headline: "Email, WhatsApp, CRM, databases and APIs — connected to work together.",
    tags: ["WhatsApp Cloud", "Resend", "CRM APIs", "Webhooks"],
    icon: Network,
  },
  {
    num: "05",
    name: "AI",
    headline: "AI where it genuinely helps. Not where it just makes the pitch sound cooler.",
    tags: ["Document Parsing", "Triage Logic", "Human Review"],
    icon: Sparkles,
  },
];

export function WhatWeBuild() {
  return (
    <section id="capabilities" className="py-24 relative overflow-hidden bg-[#0B0B0B] perspective-1200">
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-1/3 right-0 w-[420px] h-[420px] bg-[#C9AEC6]/[0.025] blur-[180px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={scaleReveal}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-[#C9AEC6]/30 text-[#C9AEC6] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <span>Engineering Disciplines</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F6EFF5] uppercase font-sans mb-6 drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
            WHAT WE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#EAD6E6] to-[#C9AEC6]">BUILD.</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-[#E2D5E3] max-w-2xl mx-auto leading-relaxed font-normal [text-shadow:_0_1px_2px_rgba(0,0,0,0.9),_0_2px_8px_rgba(0,0,0,0.6)]">
            No cookie-cutter templates. We architect, write and deploy custom systems around the exact tools your team already uses.
          </p>
        </motion.div>

        {/* 5 Capability Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-14">
          {CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            const isWide = idx >= 3;

            return (
              <motion.div
                key={cap.num}
                initial={{ opacity: 0, y: 35, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={defaultViewport}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.08,
                  ease: SPARTAN_EASE,
                }}
                whileHover={{ y: -5 }}
                className={`h-full ${isWide ? "lg:col-span-3 xl:col-span-1" : ""}`}
              >
                <PrecisionCard
                  glowColor="rgba(201, 174, 198, 0.08)"
                  className="p-7 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414] hover:border-[#C9AEC6]/40 transition-all duration-300 h-full flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#C9AEC6] group-hover:scale-105 group-hover:border-[#C9AEC6]/40 transition-all">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#C9AEC6] px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06]">
                        {cap.num}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-black text-[#F6EFF5] tracking-wide uppercase font-sans mb-3 group-hover:text-white transition-colors">
                      {cap.num} — {cap.name}
                    </h3>

                    {/* Concise Copy */}
                    <p className="text-sm text-[#8E8295] leading-relaxed font-normal mb-6">
                      {cap.headline}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                    {cap.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-[#BAAEC0] px-2 py-0.5 rounded bg-white/[0.02] border border-white/[0.05]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </PrecisionCard>
              </motion.div>
            );
          })}
        </div>

        {/* Action Prompt */}
        <div className="text-center flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#C9AEC6] hover:bg-[#EAD6E6] text-[#0B0B0B] text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 group cursor-pointer shadow-[0_0_15px_rgba(201,174,198,0.2)]"
          >
            <span>SEE ALL CAPABILITIES</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0B0B0B] group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#141414] hover:bg-[#1A1A1A] border border-white/[0.1] hover:border-[#C9AEC6]/50 text-[#F6EFF5] hover:text-white text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 group cursor-pointer shadow-md"
          >
            <span>DISCUSS YOUR SYSTEM REQUIREMENTS</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C9AEC6] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
