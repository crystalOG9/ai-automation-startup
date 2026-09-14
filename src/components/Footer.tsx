"use client";

import Link from "next/link";
import { Globe, Mail } from "lucide-react";
import { SpartanLogo } from "@/components/SpartanLogo";
import { InstagramIcon } from "@/components/InstagramIcon";
import { scrollToSection } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/[0.06] pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-1">
            <Link
              href="/"
              onClick={(e) => scrollToSection("#hero", e)}
              className="text-2xl font-bold tracking-tighter text-[#F6EFF5] flex items-center gap-2.5 mb-4 inline-flex group"
            >
              <SpartanLogo size={36} />
              <span className="font-bold tracking-tight text-[#F6EFF5]">SPARTAN</span>
            </Link>
            <p className="text-[#8E8295] text-sm leading-relaxed">
              Custom workflow automation built around your existing software and business rules.
            </p>
          </div>

          <div>
            <h4 className="text-[#F6EFF5] font-semibold mb-4 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-3">
              <li><a href="#how-it-works" onClick={(e) => scrollToSection("#how-it-works", e)} className="text-[#8E8295] hover:text-[#C9AEC6] transition-colors text-sm cursor-pointer">How It Works</a></li>
              <li><a href="#workflow-demo" onClick={(e) => scrollToSection("#workflow-demo", e)} className="text-[#8E8295] hover:text-[#C9AEC6] transition-colors text-sm cursor-pointer">Workflow Demo</a></li>
              <li><a href="#solutions" onClick={(e) => scrollToSection("#solutions", e)} className="text-[#8E8295] hover:text-[#C9AEC6] transition-colors text-sm cursor-pointer">Solutions</a></li>
              <li><a href="#industries" onClick={(e) => scrollToSection("#industries", e)} className="text-[#8E8295] hover:text-[#C9AEC6] transition-colors text-sm cursor-pointer">Industries</a></li>
              <li><a href="#why-us" onClick={(e) => scrollToSection("#why-us", e)} className="text-[#8E8295] hover:text-[#C9AEC6] transition-colors text-sm cursor-pointer">Why Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#F6EFF5] font-semibold mb-4 text-sm uppercase tracking-wider">Assessment & Method</h4>
            <ul className="space-y-3">
              <li><a href="#contact" onClick={(e) => scrollToSection("#contact", e)} className="text-[#8E8295] hover:text-[#C9AEC6] transition-colors text-sm cursor-pointer">Request Assessment</a></li>
              <li><a href="#differentiator" onClick={(e) => scrollToSection("#differentiator", e)} className="text-[#8E8295] hover:text-[#C9AEC6] transition-colors text-sm cursor-pointer">Engineering Method</a></li>
              <li><a href="#contact" onClick={(e) => scrollToSection("#contact", e)} className="text-[#8E8295] hover:text-[#C9AEC6] transition-colors text-sm cursor-pointer">Start With One Workflow</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#F6EFF5] font-semibold mb-4 text-sm uppercase tracking-wider">Contact & Connect</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:sparten.tech26@gmail.com"
                  className="flex items-center gap-2.5 text-[#8E8295] hover:text-[#C9AEC6] transition-colors text-sm group"
                >
                  <Mail className="w-4 h-4 text-[#C9AEC6] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="break-all">sparten.tech26@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/spartantech.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[#8E8295] hover:text-[#C9AEC6] transition-colors text-sm group"
                >
                  <InstagramIcon className="w-4 h-4 text-[#8E8295] group-hover:text-[#C9AEC6] shrink-0 group-hover:scale-110 transition-transform" />
                  <span>@spartantech.ai</span>
                </a>
              </li>
            </ul>
            <p className="text-xs text-[#8E8295] mt-4 leading-relaxed">
              Custom workflow automation engineering.
            </p>
          </div>
          
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/[0.06] text-xs text-[#8E8295] gap-4">
          <p>© 2026 SPARTAN. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[#C9AEC6] transition-colors" aria-label="Website">
              <Globe className="w-4 h-4" />
            </Link>
            <a
              href="mailto:sparten.tech26@gmail.com"
              className="hover:text-[#C9AEC6] transition-colors"
              aria-label="Email SPARTAN"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/spartantech.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C9AEC6] transition-colors"
              aria-label="SPARTAN Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
