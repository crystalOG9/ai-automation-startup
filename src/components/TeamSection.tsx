"use client";

import { motion } from "framer-motion";
import { Users, Code, Megaphone, Compass, ArrowRight } from "lucide-react";
import { defaultViewport, scaleReveal, SPARTAN_EASE } from "@/lib/motion";
import Link from "next/link";
import { PrecisionCard } from "@/components/PrecisionCard";

interface TeamMember {
  name: string;
  initials: string;
  role: string;
  roleTags: string[];
  description: string;
  icon: typeof Code;
  accent: string;
}

const TEAM: TeamMember[] = [
  {
    name: "HARSHAD",
    initials: "H",
    role: "FOUNDER · AUTOMATION",
    roleTags: ["Founder", "Automation", "Architecture"],
    description: "Finds repetitive work, asks why humans are doing it, and then tries to automate it.",
    icon: Compass,
    accent: "#C9AEC6",
  },
  {
    name: "PIYUSH",
    initials: "P",
    role: "WEB · BACKEND · APIs · AUTOMATION",
    roleTags: ["Frontend", "Backend", "APIs", "Automation"],
    description: "Frontend, backend, API integrations and automation systems. Basically, if two systems need to talk to each other, I'm usually somewhere in the middle.",
    icon: Code,
    accent: "#C9AEC6",
  },
  {
    name: "SAMAR",
    initials: "S",
    role: "HR · MARKETING",
    roleTags: ["HR", "Marketing", "Outreach"],
    description: "HR, marketing and the person making sure SPARTAN actually talks to people outside our laptops.",
    icon: Megaphone,
    accent: "#EAD6E6",
  },
];

export function TeamSection() {
  return (
    <section id="team" className="py-24 relative overflow-hidden bg-[#0B0B0B] perspective-1200">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-80 bg-[#C9AEC6]/[0.025] blur-[170px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={scaleReveal}
          className="max-w-4xl mx-auto text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-[#C9AEC6]/30 text-[#C9AEC6] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <Users className="w-3.5 h-3.5 text-[#C9AEC6]" />
            <span>The Builders</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F6EFF5] uppercase font-sans mb-6">
            THREE PEOPLE. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#EAD6E6] to-[#C9AEC6]">
              A SUSPICIOUS AMOUNT OF WORK.
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-[#BAAEC0] max-w-2xl mx-auto leading-relaxed font-normal">
            No middle managers. When you talk to SPARTAN, you&apos;re speaking directly with the people writing the code and building the workflows.
          </p>
        </motion.div>

        {/* 3 Team Member Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {TEAM.map((member, idx) => {
            const Icon = member.icon;

            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 35, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={defaultViewport}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.1,
                  ease: SPARTAN_EASE,
                }}
                whileHover={{ y: -6 }}
                className="h-full"
              >
                <PrecisionCard
                  glowColor="rgba(201, 174, 198, 0.08)"
                  className="p-7 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414] hover:border-[#C9AEC6]/40 transition-all duration-300 h-full flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    {/* Card Top: Monogram & Icon */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      {/* Elegant Monogram Avatar */}
                      <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center font-sans font-black text-xl text-[#F6EFF5] group-hover:border-[#C9AEC6]/50 group-hover:text-white group-hover:scale-105 transition-all shadow-inner">
                        {member.initials}
                      </div>

                      <div className="w-9 h-9 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-[#8E8295] group-hover:text-[#C9AEC6] transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Member Name */}
                    <h3 className="text-2xl font-black text-[#F6EFF5] tracking-wide uppercase font-sans mb-1.5 group-hover:text-white transition-colors">
                      {member.name}
                    </h3>

                    {/* Role */}
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#C9AEC6] mb-4">
                      {member.role}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[#BAAEC0] leading-relaxed font-normal mb-6">
                      &ldquo;{member.description}&rdquo;
                    </p>
                  </div>

                  {/* Role Tags */}
                  <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                    {member.roleTags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-[#8E8295] px-2 py-0.5 rounded bg-white/[0.02] border border-white/[0.05]"
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

        {/* Action Link to /about */}
        <div className="text-center mt-12">
          <Link
            href="/about"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#141414] hover:bg-[#1A1A1A] border border-white/[0.1] hover:border-[#C9AEC6]/50 text-[#F6EFF5] hover:text-white text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 group cursor-pointer shadow-md"
          >
            <span>MEET THE TEAM & HOW WE THINK</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C9AEC6] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
