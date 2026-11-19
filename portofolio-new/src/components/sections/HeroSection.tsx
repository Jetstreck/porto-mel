import React, { useState, useEffect } from 'react';
import { ArrowDown, Compass } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    // Live Jakarta Time WIB
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Jakarta',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTimeStr(`${formatted} WIB`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full bg-[#141311] text-[#F1ECE3] flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden select-none"
    >
      {/* Ambient kinetic atmospheric backdrop reacting subtly to cursor */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out opacity-25"
        style={{
          transform: `translate3d(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px, 0)`,
          background: 'radial-gradient(circle at 40% 45%, #A65338 0%, #755644 35%, transparent 70%)',
        }}
      />

      {/* Subtle architectural grid coordinates watermark */}
      <div className="absolute right-8 top-1/3 font-mono text-[10px] tracking-widest text-[#F1ECE3]/20 uppercase pointer-events-none hidden lg:block -rotate-90 origin-right">
        MALANG, EAST JAVA — 07°58′S 112°37′E // ELEVATION: 440M
      </div>

      {/* TOP BAR: Minimal Editorial Header */}
      <div className="relative z-20 flex items-center justify-between border-b border-[#F1ECE3]/15 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 bg-[#F1ECE3] text-[#141311] font-display font-extrabold text-sm flex items-center justify-center tracking-tighter">
            M
          </div>
          <div>
            <div className="font-display font-bold text-sm tracking-wider uppercase text-[#F1ECE3]">
              MELLINO
            </div>
            <div className="font-mono text-[10px] text-[#A65338] tracking-widest uppercase">
              DIGITAL CRAFT STUDIO
            </div>
          </div>
        </div>

        {/* Live Jakarta Time & Availability */}
        <div className="hidden sm:flex items-center gap-6 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#F1ECE3]/60 uppercase">AVAILABLE FOR Q1/Q2</span>
          </div>
          <span className="text-[#F1ECE3]/20">/</span>
          <div className="text-[#F1ECE3]">
            {timeStr || '18:30:00 WIB'}
          </div>
        </div>

        {/* Fast Anchor Navigation */}
        <nav className="flex items-center gap-5 sm:gap-8 font-display text-xs uppercase tracking-widest">
          <a href="#work" className="text-[#F1ECE3]/70 hover:text-[#A65338] transition-colors">
            WORK
          </a>
          <a href="#about" className="text-[#F1ECE3]/70 hover:text-[#A65338] transition-colors hidden md:inline">
            MANIFESTO
          </a>
          <a href="#expertise" className="text-[#F1ECE3]/70 hover:text-[#A65338] transition-colors hidden md:inline">
            CAPABILITIES
          </a>
          <a
            href="#contact"
            className="px-4 py-2 bg-[#F1ECE3] text-[#141311] hover:bg-[#A65338] hover:text-[#F1ECE3] transition-all font-bold"
          >
            COMMISSION
          </a>
        </nav>
      </div>

      {/* CENTERPIECE: Monumental Typography Visual Identity & Asymmetric Collision */}
      <div className="relative z-10 my-auto py-8 sm:py-12">
        {/* Monolithic Visual Identity Wordmark */}
        <div className="relative overflow-hidden">
          <div
            className="font-display font-extrabold text-[15vw] sm:text-[17vw] lg:text-[18vw] leading-[0.8] tracking-tighter text-[#F1ECE3] uppercase transition-transform duration-500 ease-out select-none whitespace-nowrap"
            style={{
              transform: `translate3d(${-mousePos.x * 0.4}px, 0, 0)`,
            }}
          >
            Mellino
          </div>
        </div>

        {/* Overlapping Asymmetrical Editorial Composition */}
        <div className="mt-4 sm:mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          {/* Poignant Serif Statement */}
          <div className="lg:col-span-8 space-y-3">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif italic text-[#E1D8CA] leading-tight">
              &ldquo;Building digital experiences with intention.&rdquo;
            </h1>
            <p className="max-w-xl text-sm sm:text-base text-[#F1ECE3]/70 font-sans leading-relaxed">
              Fullstack developer and creative technologist exploring the frontier where architectural brutalism, high-concurrency systems, and tactile digital craftsmanship converge.
            </p>
          </div>

          {/* Interactive Coordinates Stamp & Fast Reel */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end space-y-3 font-mono text-xs">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#F1ECE3]/20 bg-[#1D1C19]/60 backdrop-blur-md">
              <Compass className="w-3.5 h-3.5 text-[#A65338]" />
              <span className="text-[#F1ECE3]/80 uppercase tracking-widest text-[11px]">
                FULLSTACK & INTERACTION
              </span>
            </div>
            <div className="text-[11px] text-[#F1ECE3]/50 text-left lg:text-right">
              REACT / NEXT.JS / GO / MYSQL / GSAP / THREE.JS
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR: Dramatic Visual Navigation & Scroll Prompt */}
      <div className="relative z-20 pt-6 border-t border-[#F1ECE3]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-4 text-[#F1ECE3]/60">
          <span className="text-[#A65338] font-bold">06 SELECTED COMMISSIONS</span>
          <span className="text-[#F1ECE3]/20">/</span>
          <span>EST. 2023–2024</span>
          <span className="text-[#F1ECE3]/20 hidden md:inline">/</span>
          <span className="hidden md:inline text-[#F1ECE3]/50">MALANG, INDONESIA</span>
        </div>

        <a
          href="#work"
          className="group inline-flex items-center gap-3 text-xs uppercase tracking-widest text-[#F1ECE3] hover:text-[#A65338] transition-colors"
        >
          <span>ENTER CURATED ARCHIVE</span>
          <div className="w-8 h-8 rounded-full border border-[#F1ECE3]/30 flex items-center justify-center group-hover:border-[#A65338] transition-colors">
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </div>
        </a>
      </div>
    </section>
  );
};
