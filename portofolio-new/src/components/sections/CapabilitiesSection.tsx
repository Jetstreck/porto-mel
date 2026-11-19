import React, { useState } from 'react';
import { CAPABILITIES, TECH_STACK } from '../../data/portfolioData';
import type { Capability } from '../../types';
import { ChevronRight, CheckSquare } from 'lucide-react';

export const CapabilitiesSection: React.FC = () => {
  const [selectedCapability, setSelectedCapability] = useState<Capability>(CAPABILITIES[0]);

  return (
    <section
      id="capabilities"
      className="py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#1D1C19]/15"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[#1D1C19]/15 pb-4 font-mono text-[11px] text-[#755644] mb-12 sm:mb-16">
        <div className="flex items-center gap-2">
          <span className="text-[#A65338] font-bold">[02 // CAPABILITIES & STACK]</span>
          <span>DISCIPLINE MATRIX</span>
        </div>
        <div className="font-mono text-xs text-[#755644]">
          6 CORE PRACTICES // FULL-CYCLE ENGINEERING
        </div>
      </div>

      {/* Editorial Headline */}
      <div className="max-w-3xl mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-[#A65338] font-bold">
          ENGINEERING ARCHITECTURE
        </span>
        <h2 className="mt-2 text-3xl sm:text-5xl font-display font-bold text-[#1D1C19] tracking-tight">
          Capabilities & Technical Rigor.
        </h2>
        <p className="mt-3 text-base sm:text-lg font-serif italic text-[#755644]">
          Bridging high-concurrency systems programming with refined digital art direction.
        </p>
      </div>

      {/* Main Interactive Index & Detail Spread (NOT a generic card grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Typographic Index List (6 cols) */}
        <div className="lg:col-span-6 border border-[#1D1C19]/15 divide-y divide-[#1D1C19]/15 bg-[#E1D8CA]/30">
          {CAPABILITIES.map((cap) => {
            const isSelected = selectedCapability.id === cap.id;
            return (
              <button
                key={cap.id}
                onClick={() => setSelectedCapability(cap)}
                className={`w-full text-left p-5 sm:p-6 transition-all duration-300 flex items-center justify-between group ${
                  isSelected
                    ? 'bg-[#1D1C19] text-[#F1ECE3] shadow-md pl-7'
                    : 'hover:bg-[#E1D8CA] text-[#1D1C19]'
                }`}
              >
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span
                    className={`font-mono text-xs sm:text-sm font-bold ${
                      isSelected ? 'text-[#A65338]' : 'text-[#755644]'
                    }`}
                  >
                    [{cap.number}]
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-xl tracking-tight">
                      {cap.name}
                    </h3>
                    <p
                      className={`text-xs mt-1 transition-colors ${
                        isSelected ? 'text-[#E1D8CA]/70' : 'text-[#755644]'
                      }`}
                    >
                      {cap.tagline}
                    </p>
                  </div>
                </div>

                <ChevronRight
                  className={`w-5 h-5 shrink-0 transition-transform ${
                    isSelected ? 'rotate-90 text-[#A65338]' : 'group-hover:translate-x-1 text-[#755644]'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right: Selected Capability Deep Dive Panel (6 cols) */}
        <div className="lg:col-span-6 bg-[#E1D8CA] border border-[#1D1C19]/20 p-6 sm:p-8 space-y-6 shadow-sm sticky top-28">
          <div className="flex items-center justify-between border-b border-[#1D1C19]/15 pb-4 font-mono text-xs">
            <span className="text-[#A65338] font-bold">
              SPECIFICATION // {selectedCapability.number}
            </span>
            <span className="text-[#755644] uppercase">TECHNICAL DOSSIER</span>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#1D1C19]">
              {selectedCapability.name}
            </h3>
            <p className="mt-3 text-sm sm:text-base text-[#1D1C19]/80 font-sans leading-relaxed">
              {selectedCapability.description}
            </p>
          </div>

          {/* Architectural Focus Box */}
          <div className="p-4 bg-[#F1ECE3] border-l-2 border-[#A65338] font-mono text-xs text-[#1D1C19]">
            <div className="text-[10px] text-[#A65338] uppercase font-bold tracking-wider mb-1">
              ARCHITECTURAL FOCUS
            </div>
            <p className="text-xs text-[#1D1C19]/90 font-sans leading-relaxed">
              {selectedCapability.architecturalFocus}
            </p>
          </div>

          {/* Deliverables Checklist */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#755644] mb-3 font-bold">
              CONCRETE DELIVERABLES
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedCapability.deliverables.map((deliv, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 bg-[#F1ECE3]/70 border border-[#1D1C19]/10 text-xs text-[#1D1C19]"
                >
                  <CheckSquare className="w-3.5 h-3.5 text-[#A65338] shrink-0" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Applied Technologies */}
          <div className="pt-2">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#755644] mb-2 font-bold">
              TOOLING MATRIX
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCapability.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 bg-[#1D1C19] text-[#F1ECE3] font-mono text-xs uppercase"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack Index Table */}
      <div className="mt-16 pt-12 border-t border-[#1D1C19]/15">
        <div className="flex items-center justify-between mb-6">
          <div className="font-mono text-xs uppercase tracking-widest text-[#A65338] font-bold">
            [PRIMARY TECHNOLOGY STACK]
          </div>
          <div className="font-mono text-xs text-[#755644]">
            VERIFIED PRODUCTION PROFICIENCY
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {TECH_STACK.map((tech) => (
            <div
              key={tech.name}
              className="p-4 bg-[#E1D8CA]/40 border border-[#1D1C19]/15 hover:border-[#A65338] transition-colors"
            >
              <div className="text-[10px] font-mono text-[#A65338] uppercase">
                {tech.category}
              </div>
              <div className="text-base font-display font-bold text-[#1D1C19] mt-1">
                {tech.name}
              </div>
              <div className="text-[11px] font-mono text-[#755644] mt-1">
                {tech.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
