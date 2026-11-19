import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const ManifestoSection: React.FC = () => {
  return (
    <section id="about" className="relative w-full bg-[#F1ECE3] text-[#1D1C19] overflow-hidden select-none">
      {/* Full-bleed Kinetic Typographic Marquee */}
      <div className="w-full bg-[#141311] text-[#F1ECE3] py-4 sm:py-5 overflow-hidden border-y border-[#F1ECE3]/20">
        <div className="animate-marquee whitespace-nowrap font-display font-extrabold text-sm sm:text-base tracking-[0.25em] uppercase flex items-center">
          <span className="mx-6 text-[#A65338]">✦</span>
          <span>THE ART OF DIGITAL CRAFT</span>
          <span className="mx-6 text-[#A65338]">✦</span>
          <span>CODE AS SPATIAL ARCHITECTURE</span>
          <span className="mx-6 text-[#A65338]">✦</span>
          <span>PURPOSE BEFORE DECORATION</span>
          <span className="mx-6 text-[#A65338]">✦</span>
          <span>FULLSTACK RIGOR &amp; REFINED TYPOGRAPHY</span>
          <span className="mx-6 text-[#A65338]">✦</span>
          <span>MALANG // INDONESIA</span>
          <span className="mx-6 text-[#A65338]">✦</span>
          <span>THE ART OF DIGITAL CRAFT</span>
          <span className="mx-6 text-[#A65338]">✦</span>
          <span>CODE AS SPATIAL ARCHITECTURE</span>
          <span className="mx-6 text-[#A65338]">✦</span>
          <span>PURPOSE BEFORE DECORATION</span>
          <span className="mx-6 text-[#A65338]">✦</span>
          <span>FULLSTACK RIGOR &amp; REFINED TYPOGRAPHY</span>
          <span className="mx-6 text-[#A65338]">✦</span>
          <span>MALANG // INDONESIA</span>
        </div>
      </div>

      {/* Main Editorial Scene — Asymmetrical Spread without Boxed Cards */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-28 sm:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Monumental Editorial Statement (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="font-mono text-xs uppercase tracking-widest text-[#A65338] font-bold">
              [MANIFESTO // 01]
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif italic text-[#1D1C19] leading-[1.12]">
              &ldquo;I&apos;m interested in creating digital products where engineering meets thoughtful design.&rdquo;
            </h2>

            <div className="space-y-6 text-base sm:text-xl text-[#1D1C19]/85 font-sans leading-relaxed pt-2">
              <p>
                {PERSONAL_INFO.editorialStatement}
              </p>
              <p className="text-sm sm:text-base text-[#755644] leading-relaxed">
                Rather than treating backend resilience and visual emotion as conflicting goals, I build systems where high-concurrency Go services, normalized database models, and buttery 60fps WebGL transitions reinforce each other with architectural coherence.
              </p>
            </div>
          </div>

          {/* Right Column: Architectural Margin Notes & Human Context (5 cols) */}
          <div className="lg:col-span-5 space-y-12 lg:pl-8 lg:border-l border-[#1D1C19]/15">
            {/* Margin Note 1 */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] text-[#A65338] uppercase tracking-widest font-bold">
                01. TECHNICAL INTEGRITY
              </span>
              <h3 className="text-lg font-display font-bold text-[#1D1C19]">
                Fullstack Craftsmanship
              </h3>
              <p className="text-xs sm:text-sm text-[#755644] leading-relaxed">
                From sub-12ms API latency in Go to type-safe client architectures in Next.js. Every layer is measured against real performance benchmarks.
              </p>
            </div>

            {/* Margin Note 2 */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] text-[#755644] uppercase tracking-widest font-bold">
                02. SPATIAL SENSIBILITY
              </span>
              <h3 className="text-lg font-display font-bold text-[#1D1C19]">
                Warm Brutalism
              </h3>
              <p className="text-xs sm:text-sm text-[#755644] leading-relaxed">
                Drawing inspiration from tangible materials, Japanese restraint, and raw concrete. Digital interfaces designed to age with dignity rather than follow transient trend cycles.
              </p>
            </div>

            {/* Margin Note 3 */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] text-[#74705E] uppercase tracking-widest font-bold">
                03. REGIONAL ROOTS
              </span>
              <h3 className="text-lg font-display font-bold text-[#1D1C19]">
                Malang, Indonesia
              </h3>
              <p className="text-xs sm:text-sm text-[#755644] leading-relaxed">
                Operating from the calm mountain climate of East Java. Grounded in the Indonesian philosophy of *Gotong Royong*—communal craft elevated to modern digital systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

