"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { SpartanLogo } from "@/components/SpartanLogo";
import { InstagramIcon } from "@/components/InstagramIcon";

export function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/[0.08] pt-16 pb-10 font-sans">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-14">
          
          {/* Brand & Tagline (Col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-[#F6EFF5] flex items-center gap-2.5 inline-flex group select-none"
            >
              <SpartanLogo size={32} />
              <span className="font-bold tracking-tight text-[#F6EFF5]">SPARTAN</span>
            </Link>

            <p className="text-[#BAAEC0] text-sm leading-relaxed max-w-sm">
              Automation systems for businesses.
            </p>

            {/* Personality Line */}
            <p className="text-xs font-mono text-[#8E8295] pt-2 italic leading-relaxed">
              &ldquo;Built somewhere between &lsquo;this should be automated&rsquo; and &lsquo;why is this still manual?&rsquo;&rdquo;
            </p>
          </div>

          {/* Capabilities (Col 6-7) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#C9AEC6] mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-[#8E8295]">
              <li>
                <Link
                  href="/services#web"
                  className="hover:text-[#F6EFF5] transition-colors cursor-pointer"
                >
                  Web
                </Link>
              </li>
              <li>
                <Link
                  href="/services#backend"
                  className="hover:text-[#F6EFF5] transition-colors cursor-pointer"
                >
                  Backend
                </Link>
              </li>
              <li>
                <Link
                  href="/services#apis"
                  className="hover:text-[#F6EFF5] transition-colors cursor-pointer"
                >
                  APIs
                </Link>
              </li>
              <li>
                <Link
                  href="/services#automation"
                  className="hover:text-[#F6EFF5] transition-colors cursor-pointer"
                >
                  Automation
                </Link>
              </li>
              <li>
                <Link
                  href="/services#ai"
                  className="hover:text-[#F6EFF5] transition-colors cursor-pointer"
                >
                  AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation (Col 8-9) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#C9AEC6] mb-4">
              Index
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-[#8E8295]">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#F6EFF5] transition-colors cursor-pointer"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/work"
                  className="hover:text-[#F6EFF5] transition-colors cursor-pointer"
                >
                  Work
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#F6EFF5] transition-colors cursor-pointer"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#F6EFF5] transition-colors cursor-pointer"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#F6EFF5] transition-colors cursor-pointer"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact (Col 10-12) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#C9AEC6] mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-xs font-mono">
              <li>
                <a
                  href="mailto:sparten.tech26@gmail.com"
                  className="flex items-center gap-2 text-[#8E8295] hover:text-[#F6EFF5] transition-colors group"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C9AEC6] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate">Email Us</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/spartantech.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#8E8295] hover:text-[#F6EFF5] transition-colors group"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#8E8295] group-hover:text-[#C9AEC6] shrink-0 group-hover:scale-110 transition-transform" />
                  <span>@spartantech.ai</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#8E8295] gap-4">
          <p>© 2026 SPARTAN. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hover:text-[#C9AEC6] transition-colors"
            >
              Start an Assessment
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
