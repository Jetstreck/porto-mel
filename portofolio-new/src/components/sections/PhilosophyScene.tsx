import React from 'react';
import { APPROACH_PRINCIPLES } from '../../data/portfolioData';

export const PhilosophyScene: React.FC = () => {
  return (
    <section id="approach" className="relative w-full bg-[#141311] text-[#F1ECE3] py-28 sm:py-40 select-none">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#F1ECE3]/15 pb-8 mb-20 sm:mb-28">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#A65338] font-bold">
              [ENGINEERING TENETS // 04]
            </div>
            <h2 className="mt-3 text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white">
              Philosophy.
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base font-serif italic text-[#E1D8CA]/80">
            Six architectural convictions guiding every line of code, interaction velocity, and spatial boundary.
          </p>
        </div>

        {/* Avant-Garde Editorial Manifesto Spread */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {APPROACH_PRINCIPLES.map((principle) => (
            <div
              key={principle.number}
              className="space-y-6 group border-t border-[#F1ECE3]/15 pt-8 hover:border-[#A65338] transition-colors"
            >
              {/* Massive Typographic Number */}
              <div className="flex items-baseline justify-between">
                <span className="font-display font-bold text-5xl sm:text-6xl text-[#A65338] tracking-tighter">
                  {principle.number}
                </span>
                <span className="font-mono text-[10px] text-[#F1ECE3]/40 uppercase tracking-widest">
                  AXIOM
                </span>
              </div>

              {/* Title & Serif Subtitle */}
              <div>
                <h3 className="text-2xl font-display font-bold text-white group-hover:text-[#A65338] transition-colors">
                  {principle.title}
                </h3>
                <p className="mt-1 font-serif italic text-base text-[#E1D8CA]/80">
                  {principle.subtitle}
                </p>
              </div>

              {/* Manifesto Copy */}
              <p className="text-sm text-[#F1ECE3]/70 font-sans leading-relaxed">
                {principle.manifesto}
              </p>

              {/* Realization Note */}
              <div className="pt-4 border-t border-[#F1ECE3]/10 font-mono text-xs text-[#E1D8CA]/60">
                <span className="text-[#A65338] font-bold block mb-1">PRACTICE</span>
                {principle.practicalApplication}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

