import React from 'react';
import { PERSONAL_FACETS } from '../../data/portfolioData';
import { Compass, BookOpen, Coffee, Cpu } from 'lucide-react';

export const CulturalScene: React.FC = () => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0: return <Compass className="w-4 h-4 text-[#A65338]" />;
      case 1: return <Cpu className="w-4 h-4 text-[#755644]" />;
      case 2: return <BookOpen className="w-4 h-4 text-[#74705E]" />;
      default: return <Coffee className="w-4 h-4 text-[#A65338]" />;
    }
  };

  return (
    <section id="personal" className="relative w-full bg-[#E1D8CA] text-[#1D1C19] py-28 sm:py-40 select-none">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#1D1C19]/15 pb-8 mb-20">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#A65338] font-bold">
              [HUMAN CONTEXT // 05]
            </div>
            <h2 className="mt-3 text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-[#1D1C19]">
              Cultural Grounding.
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base font-serif italic text-[#755644]">
            Rooted in the calm volcanic foothills of East Java, bringing analog sensibilities to high-performance software.
          </p>
        </div>

        {/* 4 Cultural Facets — Editorial Monograph Format */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {PERSONAL_FACETS.map((facet, idx) => (
            <div
              key={facet.title}
              className="space-y-4 border-t border-[#1D1C19]/15 pt-6 group"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2 text-[#755644] font-bold uppercase tracking-wider">
                  {getIcon(idx)}
                  <span>{facet.label}</span>
                </div>
                <span className="text-[#A65338] font-bold uppercase">
                  {facet.tag}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#1D1C19] group-hover:text-[#A65338] transition-colors">
                {facet.title}
              </h3>

              <p className="text-sm sm:text-base text-[#1D1C19]/80 font-sans leading-relaxed">
                {facet.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

