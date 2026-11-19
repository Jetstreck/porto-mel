import React, { useState } from 'react';
import { CAPABILITIES, TECH_STACK } from '../../data/portfolioData';
import type { Capability } from '../../types';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const ExpertiseScene: React.FC = () => {
  const [activeCap, setActiveCap] = useState<Capability>(CAPABILITIES[0]);

  return (
    <section id="expertise" className="relative w-full bg-[#F1ECE3] text-[#1D1C19] py-28 sm:py-40 select-none">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#1D1C19]/15 pb-8 mb-16 sm:mb-24">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#A65338] font-bold">
              [DISCIPLINE MATRIX // 03]
            </div>
            <h2 className="mt-3 text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-[#1D1C19]">
              Capabilities.
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base font-serif italic text-[#755644]">
            An end-to-end engineering methodology combining strict backend contracts with fluid, tactile interaction design.
          </p>
        </div>

        {/* Interactive Discipline Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Typographic Selector (5 cols) */}
          <div className="lg:col-span-5 space-y-2">
            {CAPABILITIES.map((cap) => {
              const isSelected = activeCap.id === cap.id;
              return (
                <button
                  key={cap.id}
                  onClick={() => setActiveCap(cap)}
                  className={`w-full text-left py-4 sm:py-5 px-4 transition-all duration-300 flex items-center justify-between border-b ${
                    isSelected
                      ? 'border-[#A65338] bg-[#E1D8CA] pl-6'
                      : 'border-[#1D1C19]/10 hover:border-[#1D1C19]/30 text-[#1D1C19]/60 hover:text-[#1D1C19]'
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className={`font-mono text-xs font-bold ${
                        isSelected ? 'text-[#A65338]' : 'text-[#755644]'
                      }`}
                    >
                      {cap.number}
                    </span>
                    <span
                      className={`font-display font-bold text-lg sm:text-xl tracking-tight ${
                        isSelected ? 'text-[#1D1C19]' : ''
                      }`}
                    >
                      {cap.name}
                    </span>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-[#A65338] translate-x-1' : 'opacity-0'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Architectural Dossier (7 cols) */}
          <div className="lg:col-span-7 bg-[#E1D8CA]/60 p-8 sm:p-12 border border-[#1D1C19]/15 space-y-8 sticky top-28">
            <div className="flex items-center justify-between border-b border-[#1D1C19]/15 pb-4">
              <span className="font-mono text-xs font-bold text-[#A65338]">
                DISCIPLINE SPEC // {activeCap.number}
              </span>
              <span className="font-mono text-xs text-[#755644] uppercase">
                PRODUCTION METHODOLOGY
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-4xl font-display font-bold text-[#1D1C19]">
                {activeCap.name}
              </h3>
              <p className="mt-3 text-base sm:text-lg font-serif italic text-[#755644]">
                &ldquo;{activeCap.tagline}&rdquo;
              </p>
              <p className="mt-4 text-sm sm:text-base text-[#1D1C19]/80 font-sans leading-relaxed">
                {activeCap.description}
              </p>
            </div>

            {/* Architectural Focus */}
            <div className="p-4 bg-[#F1ECE3] border-l-2 border-[#A65338] space-y-1">
              <div className="font-mono text-[10px] text-[#A65338] uppercase font-bold tracking-wider">
                CORE ARCHITECTURAL FOCUS
              </div>
              <p className="text-xs sm:text-sm text-[#1D1C19]/90 font-sans">
                {activeCap.architecturalFocus}
              </p>
            </div>

            {/* Concrete Deliverables */}
            <div className="space-y-3">
              <div className="font-mono text-xs text-[#755644] uppercase tracking-wider font-bold">
                KEY DELIVERABLES
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeCap.deliverables.map((d, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-[#1D1C19]">
                    <CheckCircle2 className="w-4 h-4 text-[#A65338] shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tooling Tags */}
            <div className="pt-2 border-t border-[#1D1C19]/15 flex flex-wrap gap-2">
              {activeCap.technologies.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-[#1D1C19] text-[#F1ECE3] font-mono text-xs uppercase"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Global Tech Stack Architectural Strip */}
        <div className="mt-24 pt-12 border-t border-[#1D1C19]/15">
          <div className="flex items-center justify-between mb-8 font-mono text-xs">
            <span className="text-[#A65338] font-bold uppercase tracking-wider">
              [SYSTEMS & TOOLING ECOSYSTEM]
            </span>
            <span className="text-[#755644]">
              STRICT TYPE SAFETY & PRODUCTION PROFICIENCY
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="p-4 bg-[#E1D8CA]/40 border border-[#1D1C19]/10 hover:border-[#A65338] transition-colors"
              >
                <div className="font-mono text-[10px] text-[#A65338] uppercase font-bold">
                  {tech.category}
                </div>
                <div className="text-base font-display font-bold text-[#1D1C19] mt-1">
                  {tech.name}
                </div>
                <div className="text-xs font-mono text-[#755644] mt-0.5">
                  {tech.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

