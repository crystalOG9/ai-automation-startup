import Link from "next/link";
import { 
  Compass, 
  Code, 
  Megaphone, 
  ArrowRight, 
  Terminal, 
  Shield, 
  BrainCircuit, 
  HeartHandshake, 
  Zap,
  Check
} from "lucide-react";
import { PrecisionCard } from "@/components/PrecisionCard";

const PHILOSOPHIES = [
  {
    num: "01",
    title: "Understand the process first",
    desc: "Before writing a line of code or setting up a webhook, we map how your company currently handles the task. If a process is broken manually, automating it just accelerates chaos.",
    icon: Compass,
    creed: "Map first, code second.",
  },
  {
    num: "02",
    title: "Automate what actually makes sense",
    desc: "Not every task needs code. We only build automation where manual repetition is actively costing you engineering hours, causing customer churn, or bottlenecking sales.",
    icon: Terminal,
    creed: "High leverage only.",
  },
  {
    num: "03",
    title: "Integrate existing systems",
    desc: "We don't ask you to migrate away from the tools your staff already knows. We build clean glue between your existing databases, communication tools, and CRMs.",
    icon: Shield,
    creed: "Zero forced migrations.",
  },
  {
    num: "04",
    title: "Don't automate things just because AI exists",
    desc: "Generative AI is brilliant for qualitative ambiguity, but atrocious when you need deterministic mathematical precision. We deploy AI strictly where it makes genuine engineering sense.",
    icon: BrainCircuit,
    creed: "Pragmatism over hype.",
  },
  {
    num: "05",
    title: "Keep humans involved where decisions matter",
    desc: "Autonomous execution stops at sensitive thresholds. Any action with financial liability, irreversible deletion, or high-stakes customer impact waits for explicit human sign-off.",
    icon: HeartHandshake,
    creed: "Human-in-the-loop safeguards.",
  },
  {
    num: "06",
    title: "Relentless execution & bottom line",
    desc: "If a manual step breaks your team's flow, we fix the root cause. If an automation doesn't genuinely move the operational needle, we don't build it.",
    icon: Zap,
    creed: "Zero useless code.",
  },
];

const TEAM = [
  {
    id: "harshad",
    order: "MEMBER 01",
    name: "HARSHAD",
    initials: "H",
    role: "FOUNDER · AUTOMATION",
    roleTags: ["Founder", "Systems Design", "Automation Strategy", "Process Audits"],
    description: "Finds repetitive work, asks why humans are doing it, and then tries to automate it.",
    bio: "Focused on end-to-end workflow architecture. Spends his time studying operational bottlenecks in fast-moving teams and structuring pragmatic pipelines that eliminate administrative drag.",
    tools: ["n8n", "Workflow Design", "Client Systems", "Automation Strategy"],
    icon: Compass,
  },
  {
    id: "piyush",
    order: "MEMBER 02",
    name: "PIYUSH",
    initials: "P",
    role: "WEB · BACKEND · APIs · AUTOMATION",
    roleTags: ["Frontend Architecture", "Backend APIs", "PostgreSQL", "Automation"],
    description: "Frontend, backend, API integrations and automation systems. Basically, if two systems need to talk to each other, I'm usually somewhere in the middle.",
    bio: "Full-stack engineer obsessed with clean types, edge performance, and resilient data flows. Builds everything from the reactive Next.js client layers down to Supabase schemas and custom microservice connectors.",
    tools: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "REST APIs", "Resend"],
    icon: Code,
  },
  {
    id: "samar",
    order: "MEMBER 03",
    name: "SAMAR",
    initials: "S",
    role: "HR · MARKETING",
    roleTags: ["Operations", "Client Communication", "Growth", "Marketing"],
    description: "HR, marketing and the person making sure SPARTAN actually talks to people outside our laptops.",
    bio: "Bridges the gap between raw engineering specifications and actual human business requirements. Manages team talent, studio outreach, and client relationship cadences.",
    tools: ["Operations", "Client Scoping", "Communications", "Outreach"],
    icon: Megaphone,
  },
];

const ANTI_AGENCY_VALUES = [
  {
    title: "Direct Engineer Access",
    desc: "No account executives or telephone games. You speak directly with the engineers architecting your software.",
  },
  {
    title: "Weeks, Not Quarters",
    desc: "We deploy working automation prototypes in days and production systems in weeks, not 6-month committee cycles.",
  },
  {
    title: "100% Code & Data Ownership",
    desc: "Everything runs in your own infrastructure or dedicated databases. Zero vendor lock-in, zero hostage data.",
  },
  {
    title: "Honest Scoping",
    desc: "If a workflow doesn't need custom code, we will tell you directly to use an off-the-shelf setting and save your budget.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative pt-32 pb-24 min-h-screen overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-[#C9AEC6]/[0.035] blur-[180px] rounded-full pointer-events-none" />

      {/* Subtle black transparent gradient overlay behind left-side text: strongest near left edge, smoothly fading to transparent toward the right */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-full sm:w-[90%] md:w-[78%] lg:w-[68%] xl:w-[60%] pointer-events-none select-none z-0"
        style={{
          background:
            "linear-gradient(to right, rgba(8, 8, 8, 0.82) 0%, rgba(8, 8, 8, 0.65) 30%, rgba(8, 8, 8, 0.32) 65%, rgba(8, 8, 8, 0) 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Page Hero Header — Styled identically to Main Page Hero */}
        <div className="max-w-5xl xl:max-w-6xl mb-16 md:mb-20">
          {/* Eyebrow with pulsing dot */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-xl bg-[#141414] border border-[#C9AEC6]/40 text-[#C9AEC6] text-xs sm:text-sm font-mono uppercase tracking-wider mb-8 shadow-[0_0_15px_rgba(201,174,198,0.12)] transition-colors hover:border-[#C9AEC6]/70">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9AEC6] opacity-70"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9AEC6]"></span>
            </span>
            <span>The Studio & Philosophy</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-bold tracking-tight text-[#F6EFF5] mb-8 leading-[1.04] max-w-5xl uppercase font-sans drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
            <span>Three people. A suspicious </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#EAD6E6] to-[#C9AEC6]">
              amount of work.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl md:text-2xl text-[#E2D5E3] mb-8 leading-relaxed max-w-3xl font-normal [text-shadow:_0_1px_2px_rgba(0,0,0,0.9),_0_2px_8px_rgba(0,0,0,0.6)]">
            A small technical team building custom automation systems for businesses that are tired of doing the same thing 500 times.
          </p>

          {/* Small Supporting Line with glowing dot */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-[#BFB2C6] mb-10 [text-shadow:_0_1px_2px_rgba(0,0,0,0.9)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9AEC6] shadow-[0_0_8px_rgba(201,174,198,0.5)]" />
            <span>No middle management. No telephone games. Just builders who write code.</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <Link
              href="/contact"
              className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-[#C9AEC6] hover:bg-[#EAD6E6] text-[#0B0B0B] px-8 py-4 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase border border-[#EAD6E6]/60 shadow-[0_0_20px_rgba(201,174,198,0.18)] hover:shadow-[0_0_25px_rgba(201,174,198,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 ease-out group font-mono cursor-pointer"
            >
              <span className="relative z-10">SHOW US YOUR WORKFLOW</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-150 text-[#0B0B0B]" />
            </Link>
            <a
              href="#team-members"
              className="inline-flex items-center justify-center gap-2.5 bg-[#141414] hover:bg-[#1A1A1A] border border-white/[0.08] hover:border-[#C9AEC6]/40 text-[#F6EFF5] hover:text-white px-8 py-4 rounded-xl text-xs sm:text-sm font-medium tracking-wider uppercase hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(201,174,198,0.08)] active:translate-y-0 transition-all duration-150 ease-out font-mono cursor-pointer"
            >
              <span>MEET THE TEAM</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C9AEC6] group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        <div id="team-members" className="pt-2"></div>

        {/* Studio Terminal Console */}
        <div className="max-w-3xl mx-auto mb-24">
          <div className="rounded-2xl border border-white/[0.1] bg-[#0F0F0F] shadow-2xl overflow-hidden font-mono text-xs">
            {/* Terminal Window Header */}
            <div className="px-4 py-3 bg-[#161616] border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                <span className="text-[#8E8295] text-[11px] ml-2">spartan-core@studio:~</span>
              </div>
              <div className="text-[10px] text-[#C9AEC6] uppercase tracking-wider font-bold">
                SYSTEM ONLINE
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-5 sm:p-6 space-y-3 text-[#BAAEC0]">
              <div className="text-[#F6EFF5]">
                <span className="text-[#C9AEC6] font-bold">$</span> spartan --whoami
              </div>
              <div className="pl-4 border-l-2 border-[#C9AEC6]/40 space-y-1.5 text-[11px] leading-relaxed">
                <div><span className="text-[#8E8295]">team_size:</span> 3 technical builders & operators</div>
                <div><span className="text-[#8E8295]">headquarters:</span> Between your APIs and your databases</div>
                <div><span className="text-[#8E8295]">specialty:</span> Custom automation, backend pipelines & responsive interfaces</div>
                <div><span className="text-[#8E8295]">stack:</span> Next.js, TypeScript, PostgreSQL, Supabase, Resend, n8n, Webhooks</div>
                <div><span className="text-[#8E8295]">creed:</span> &ldquo;If a human is repeating it every day, it&apos;s a bug in your operations.&rdquo;</div>
              </div>
              <div className="text-[#22C55E] text-[11px] pt-1">
                ✓ Ready to inspect repetitive workflows.
              </div>
            </div>
          </div>
        </div>

        {/* Section: TEAM PRESENTATION */}
        <div className="max-w-5xl mx-auto mb-28">
          <div className="text-center mb-16">
            <span className="font-mono text-xs font-bold text-[#C9AEC6] tracking-widest uppercase mb-2 block">
              Core Engineering Team
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#F6EFF5] uppercase font-sans mb-4">
              THREE PEOPLE. A SUSPICIOUS AMOUNT OF WORK.
            </h2>
            <p className="text-sm sm:text-base text-[#E2D5E3] max-w-lg mx-auto leading-relaxed [text-shadow:_0_1px_2px_rgba(0,0,0,0.8)]">
              No middle management. No runaround. Just builders who understand systems and execution.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TEAM.map((member) => {
              const Icon = member.icon;

              return (
                <PrecisionCard
                  key={member.id}
                  glowColor="rgba(201, 174, 198, 0.1)"
                  className="p-8 rounded-2xl border border-white/[0.08] bg-[#141414] hover:border-[#C9AEC6]/50 transition-all duration-300 shadow-2xl flex flex-col justify-between"
                >
                  <div>
                    {/* Top Identity Monogram Banner with Icon Badge */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-[#C9AEC6]/40 flex items-center justify-center text-[#F6EFF5] font-sans font-black text-2xl shadow-inner">
                          {member.initials}
                        </div>
                        <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-lg bg-[#141414] border border-[#C9AEC6]/40 flex items-center justify-center text-[#C9AEC6] shadow-sm">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-[11px] font-bold text-[#8E8295] tracking-widest uppercase block">
                          {member.order}
                        </span>
                        <span className="text-[10px] font-mono text-[#C9AEC6] uppercase tracking-wider font-semibold">
                          SPARTAN CORE
                        </span>
                      </div>
                    </div>

                    {/* Member Name */}
                    <h3 className="text-2xl font-black text-[#F6EFF5] uppercase font-sans tracking-wide mb-1.5">
                      {member.name}
                    </h3>

                    {/* Role Title */}
                    <p className="text-xs font-mono font-semibold text-[#C9AEC6] uppercase tracking-wider mb-5">
                      {member.role}
                    </p>

                    {/* Primary Quote / Description */}
                    <blockquote className="text-sm font-medium text-[#EAD6E6] mb-4 leading-relaxed bg-white/[0.025] p-3.5 rounded-xl border border-white/[0.05]">
                      &ldquo;{member.description}&rdquo;
                    </blockquote>

                    {/* Additional Bio */}
                    <p className="text-xs text-[#8E8295] leading-relaxed mb-6 font-normal">
                      {member.bio}
                    </p>
                  </div>

                  {/* Skills / Tools Stack Tags */}
                  <div className="pt-5 border-t border-white/[0.06]">
                    <div className="text-[10px] font-mono text-[#8E8295] uppercase mb-2">Specializations:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {member.tools.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono text-[#BAAEC0] px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </PrecisionCard>
              );
            })}
          </div>
        </div>

        {/* Section: HOW WE THINK */}
        <div className="max-w-5xl mx-auto mb-28">
          <div className="text-center mb-16">
            <span className="font-mono text-xs font-bold text-[#C9AEC6] tracking-widest uppercase mb-2 block">
              Our Core Creed
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#F6EFF5] uppercase font-sans mb-4">
              HOW WE THINK
            </h2>
            <p className="text-sm sm:text-base text-[#E2D5E3] max-w-xl mx-auto leading-relaxed [text-shadow:_0_1px_2px_rgba(0,0,0,0.8)]">
              Our engineering philosophy is rooted in pragmatism. We care about systems that stay up, not shiny buzzwords.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PHILOSOPHIES.map((phi) => {
              const Icon = phi.icon;
              return (
                <PrecisionCard
                  key={phi.num}
                  glowColor="rgba(201, 174, 198, 0.08)"
                  className="p-6 sm:p-7 rounded-2xl border border-white/[0.08] bg-[#141414] hover:border-[#C9AEC6]/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-[#8E8295]">
                        {phi.num}
                      </span>
                      <Icon className="w-4 h-4 text-[#C9AEC6]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#F6EFF5] mb-2.5">
                      {phi.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#BAAEC0] leading-relaxed mb-4">
                      {phi.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.05] text-[11px] font-mono text-[#C9AEC6]">
                    → {phi.creed}
                  </div>
                </PrecisionCard>
              );
            })}
          </div>
        </div>

        {/* Why SPARTAN: The Anti-Agency Advantage */}
        <div className="max-w-5xl mx-auto mb-24">
          <div className="text-center mb-14">
            <span className="font-mono text-xs font-bold text-[#C9AEC6] tracking-widest uppercase mb-2 block">
              The SPARTAN Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#F6EFF5] uppercase font-sans mb-3">
              WHY WORK WITH A 3-PERSON STUDIO?
            </h2>
            <p className="text-sm sm:text-base text-[#E2D5E3] max-w-xl mx-auto leading-relaxed [text-shadow:_0_1px_2px_rgba(0,0,0,0.8)]">
              We stripped away everything that makes working with traditional agencies painful.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {ANTI_AGENCY_VALUES.map((val, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-[#141414] border border-white/[0.08] hover:border-[#C9AEC6]/40 transition-colors flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-xl bg-[#C9AEC6]/10 border border-[#C9AEC6]/25 flex items-center justify-center text-[#C9AEC6] shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F6EFF5] mb-1.5">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#BAAEC0] leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Block */}
        <div className="max-w-3xl mx-auto text-center p-8 sm:p-12 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#141414] to-[#0D0D0D] relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-48 h-48 bg-[#C9AEC6]/10 blur-[90px] pointer-events-none" />

          <h3 className="text-2xl sm:text-3xl font-black text-[#F6EFF5] uppercase font-sans mb-3">
            WANT TO WORK TOGETHER?
          </h3>
          <p className="text-sm sm:text-base text-[#E2D5E3] max-w-lg mx-auto mb-6 leading-relaxed [text-shadow:_0_1px_2px_rgba(0,0,0,0.8)]">
            Tell us about your team&apos;s manual bottlenecks. We will tell you how we would engineer a solution.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-[#C9AEC6] hover:bg-[#EAD6E6] text-[#0B0B0B] text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 group cursor-pointer shadow-[0_0_20px_rgba(201,174,198,0.25)]"
          >
            <span>SHOW US YOUR WORKFLOW</span>
            <ArrowRight className="w-4 h-4 text-[#0B0B0B] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}
