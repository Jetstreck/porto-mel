import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Sparkles, MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#1D1C19]/15"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[#1D1C19]/15 pb-4 font-mono text-[11px] text-[#755644] mb-12 sm:mb-16">
        <div className="flex items-center gap-2">
          <span className="text-[#A65338] font-bold">[01 // IDENTITY & ETHOS]</span>
          <span>EDITORIAL PROFILE</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#A65338]" />
          <span>MALANG, EAST JAVA — INDONESIA</span>
        </div>
      </div>

      {/* Asymmetric Editorial Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left Column: Monumental Statement (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#A65338] font-bold">
              PHILOSOPHY OF CRAFT
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif italic text-[#1D1C19] leading-tight">
              &ldquo;I&apos;m interested in creating digital products where engineering meets thoughtful design.&rdquo;
            </h2>
          </div>

          <div className="space-y-6 text-base sm:text-lg text-[#1D1C19]/85 font-sans leading-relaxed">
            <p>
              My approach combines technical problem-solving, visual exploration, and attention to the smallest details. Rather than treating code and aesthetics as separate disciplines, I view them as symbiotic extensions of the same architectural act.
            </p>
            <p className="text-sm sm:text-base text-[#755644]">
              Based in Malang, East Java, I work across the full stack—from high-concurrency Go services and relational MySQL schemas to fluid React client architectures and kinetic WebGL interactions. I build software designed to endure: fast, accessible, and dignified in its simplicity.
            </p>
          </div>

          {/* Three Pillars Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1D1C19]/15 font-mono text-xs">
            <div className="p-4 bg-[#E1D8CA]/50 border border-[#1D1C19]/10">
              <div className="text-[#A65338] font-bold">[01. ENGINEERING]</div>
              <div className="mt-2 text-[#1D1C19] font-sans text-sm font-semibold">Technical Rigor</div>
              <div className="mt-1 text-[11px] text-[#755644]">Typed contracts, resilient APIs, and zero compromise on reliability.</div>
            </div>

            <div className="p-4 bg-[#E1D8CA]/50 border border-[#1D1C19]/10">
              <div className="text-[#755644] font-bold">[02. AESTHETICS]</div>
              <div className="mt-2 text-[#1D1C19] font-sans text-sm font-semibold">Warm Brutalism</div>
              <div className="mt-1 text-[11px] text-[#755644]">Tactile textures, intentional negative space, and typographic gravity.</div>
            </div>

            <div className="p-4 bg-[#E1D8CA]/50 border border-[#1D1C19]/10">
              <div className="text-[#74705E] font-bold">[03. HUMANITY]</div>
              <div className="mt-2 text-[#1D1C19] font-sans text-sm font-semibold">Mindful Pacing</div>
              <div className="mt-1 text-[11px] text-[#755644]">Interfaces that respect human cognition and digital tranquility.</div>
            </div>
          </div>
        </div>

        {/* Right Column: Tactile Identity Plate (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Architectural Badge Card */}
          <div className="p-6 sm:p-8 bg-[#E1D8CA] border border-[#1D1C19]/20 shadow-md relative overflow-hidden">
            {/* Top Registration */}
            <div className="flex justify-between items-center text-[10px] font-mono text-[#755644] pb-4 border-b border-[#1D1C19]/15">
              <span>PERSONNEL RECORD // SPEC 2024</span>
              <span className="text-[#A65338] font-bold">STATUS: ACTIVE</span>
            </div>

            {/* Monogram & Portrait Stamp Visual */}
            <div className="my-6 flex items-center gap-5">
              <div className="w-20 h-20 bg-[#1D1C19] text-[#F1ECE3] flex items-center justify-center font-display font-bold text-3xl border border-[#1D1C19] shadow-sm shrink-0">
                M
              </div>
              <div>
                <div className="text-xl font-display font-bold text-[#1D1C19]">
                  {PERSONAL_INFO.name}
                </div>
                <div className="text-xs font-mono text-[#755644] mt-0.5">
                  FULLSTACK DEVELOPER
                </div>
                <div className="text-[11px] font-mono text-[#A65338] mt-1">
                  MALANG // EAST JAVA, ID
                </div>
              </div>
            </div>

            {/* Bio Metadata Table */}
            <div className="space-y-2.5 pt-4 border-t border-[#1D1C19]/15 font-mono text-xs">
              <div className="flex justify-between py-1 border-b border-[#1D1C19]/10">
                <span className="text-[#755644]">LOCATION:</span>
                <span className="font-bold text-[#1D1C19]">MALANG, INDONESIA</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1D1C19]/10">
                <span className="text-[#755644]">TIMEZONE:</span>
                <span className="font-bold text-[#1D1C19]">WIB (UTC+7)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1D1C19]/10">
                <span className="text-[#755644]">PRIMARY CORE:</span>
                <span className="font-bold text-[#1D1C19]">REACT / GO / TYPESCRIPT</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#755644]">DESIGN SYSTEM:</span>
                <span className="font-bold text-[#A65338]">WARM BRUTALISM</span>
              </div>
            </div>

            {/* Corner architectural crosses */}
            <div className="absolute top-2 left-2 text-[10px] font-mono text-[#755644]/40">+</div>
            <div className="absolute top-2 right-2 text-[10px] font-mono text-[#755644]/40">+</div>
            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-[#755644]/40">+</div>
            <div className="absolute bottom-2 right-2 text-[10px] font-mono text-[#755644]/40">+</div>
          </div>

          {/* Quick quote box */}
          <div className="p-5 bg-[#F1ECE3] border border-[#1D1C19]/15 text-xs font-mono text-[#755644] space-y-2">
            <div className="flex items-center gap-2 text-[#A65338] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE CRAFTSPERSON&apos;S OATH</span>
            </div>
            <p className="font-serif italic text-sm text-[#1D1C19] leading-snug">
              &ldquo;Software should feel like an analog instrument: heavy, reliable, and resonant with human intent.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
