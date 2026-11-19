import React from 'react';
import { PERSONAL_FACETS } from '../../data/portfolioData';
import { Compass, BookOpen, Coffee, Cpu } from 'lucide-react';

export const PersonalSection: React.FC = () => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0: return <Compass className="w-4 h-4 text-[#A65338]" />;
      case 1: return <Cpu className="w-4 h-4 text-[#755644]" />;
      case 2: return <BookOpen className="w-4 h-4 text-[#74705E]" />;
      default: return <Coffee className="w-4 h-4 text-[#A65338]" />;
    }
  };

  return (
    <section
      id="personal"
      className="py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#1D1C19]/15"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[#1D1C19]/15 pb-4 font-mono text-[11px] text-[#755644] mb-12 sm:mb-16">
        <div className="flex items-center gap-2">
          <span className="text-[#A65338] font-bold">[05 // HUMAN CONTEXT]</span>
          <span>THE PERSON BEHIND THE SYSTEM</span>
        </div>
        <div className="font-mono text-xs text-[#755644]">
          INDONESIAN CRAFT HERITAGE
        </div>
      </div>

      {/* Editorial Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Personal Narrative (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-[#A65338] font-bold">
            HUMAN PERSPECTIVE
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#1D1C19] tracking-tight">
            Rooted in Malang. Oriented Globally.
          </h2>
          <p className="font-serif italic text-lg text-[#755644] leading-relaxed">
            &ldquo;In an era of hyper-accelerated automated slop, human intention and physical sensibility are the rarest commodities in software.&rdquo;
          </p>
          <p className="text-sm sm:text-base text-[#1D1C19]/80 font-sans leading-relaxed">
            Malang is celebrated for its historic colonial masonry, cool mountain climate, and enduring traditions of craftsmanship. Working here provides the mental clarity required to craft deliberate, calm digital systems that prioritize substance over vanity metrics.
          </p>

          <div className="p-4 bg-[#E1D8CA] border-l-2 border-[#A65338] font-mono text-xs text-[#1D1C19]">
            <span className="text-[#A65338] font-bold uppercase block mb-1">LOCAL SYNTHESIS</span>
            Merging Indonesian communal warmth with Swiss typographic discipline and modern fullstack architecture.
          </div>
        </div>

        {/* Right Column: 4 Personal Facets Matrix (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PERSONAL_FACETS.map((facet, idx) => (
            <div
              key={facet.title}
              className="p-6 bg-[#E1D8CA]/40 border border-[#1D1C19]/15 hover:border-[#A65338] transition-colors space-y-3"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#1D1C19]/10">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase text-[#755644] font-bold">
                  {getIcon(idx)}
                  <span>{facet.label}</span>
                </div>
                <span className="font-mono text-[10px] text-[#A65338] font-bold uppercase">
                  {facet.tag}
                </span>
              </div>

              <h3 className="text-xl font-display font-bold text-[#1D1C19]">
                {facet.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#1D1C19]/80 font-sans leading-relaxed">
                {facet.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

