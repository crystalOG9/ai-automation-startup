import { Hero } from "@/components/Hero";
import { SpartanWhoWeAre } from "@/components/SpartanWhoWeAre";
import { StatsProof } from "@/components/StatsProof";
import { WhatWeBuild } from "@/components/WhatWeBuild";
import { HowSpartanWorks } from "@/components/HowSpartanWorks";
import { SelectedBuilds } from "@/components/SelectedBuilds";
import { HumanInTheLoop } from "@/components/HumanInTheLoop";
import { TeamSection } from "@/components/TeamSection";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <div className="relative flex flex-col">
      {/* 02. HERO */}
      <Hero />

      {/* 03. INTRO / WHO WE ARE */}
      <SpartanWhoWeAre />

      {/* 04. NUMBERS / PROOF */}
      <StatsProof />

      {/* 05. WHAT WE BUILD */}
      <WhatWeBuild />

      {/* 06. HOW SPARTAN WORKS */}
      <HowSpartanWorks />

      {/* 07. SELECTED BUILDS / PROJECTS */}
      <SelectedBuilds />

      {/* 08. HUMAN-IN-THE-LOOP */}
      <HumanInTheLoop />

      {/* 09. TEAM */}
      <TeamSection />

      {/* 10. FINAL CTA */}
      <CTA />
    </div>
  );
}
