import React from 'react';
import { APPROACH_PRINCIPLES } from '../../data/portfolioData';

export const ApproachSection: React.FC = () => {
  return (
    <section
      id="approach"
      className="py-24 sm:py-36 px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#1D1C19]/15"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[#1D1C19]/15 pb-4 font-mono text-[11px] text-[#755644] mb-12 sm:mb-16">
        <div className="flex items-center gap-2">
          <span className="text-[#A65338] font-bold">[04 // METHODOLOGY]</span>
          <span>DESIGN & ENGINEERING APPROACH</span>
        </div>
        <div className="font-mono text-xs text-[#755644]">
          6 ARCHITECTURAL PILLARS
        </div>
      </div>

      {/* Editorial Headline */}
      <div className="max-w-3xl mb-16">
        <span className="font-mono text-xs uppercase tracking-widest text-[#A65338] font-bold">
          INTENTIONAL CRAFT
        </span>
        <h2 className="mt-2 text-4xl sm:text-6xl font-display font-bold text-[#1D1C19] tracking-tight">
          Engineering Philosophy.
        </h2>
        <p className="mt-3 text-lg font-serif italic text-[#755644]">
          A rigorous set of principles guiding every line of code, layout decision, and micro-interaction.
        </p>
      </div>

      {/* Editorial Architectural Manifesto Grid (NOT generic cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#1D1C19]/15 bg-[#E1D8CA]/20">
        {APPROACH_PRINCIPLES.map((principle) => (
          <div
            key={principle.number}
            className="p-8 sm:p-10 border-r border-b border-[#1D1C19]/15 hover:bg-[#E1D8CA]/50 transition-colors flex flex-col justify-between group space-y-6"
          >
            <div>
              {/* Pillar Number */}
              <div className="flex items-center justify-between pb-4 border-b border-[#1D1C19]/10">
                <span className="font-mono text-xs text-[#A65338] font-bold">
                  [{principle.number} // 06]
                </span>
                <span className="text-[10px] font-mono text-[#755644] uppercase">
                  TENET
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="mt-4 text-2xl font-display font-bold text-[#1D1C19] group-hover:text-[#A65338] transition-colors">
                {principle.title}
              </h3>
              <p className="mt-1 font-serif italic text-sm text-[#755644]">
                {principle.subtitle}
              </p>

              {/* Manifesto Text */}
              <p className="mt-4 text-sm text-[#1D1C19]/80 font-sans leading-relaxed">
                {principle.manifesto}
              </p>
            </div>

            {/* Practical Application Badge */}
            <div className="pt-4 border-t border-[#1D1C19]/10">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#A65338] font-bold mb-1">
                PRACTICAL REALIZATION
              </div>
              <p className="font-mono text-[11px] text-[#74705E] leading-normal">
                {principle.practicalApplication}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

