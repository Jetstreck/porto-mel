import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO, SELECTED_PROJECTS } from '../../data/portfolioData';
import type { Project } from '../../types';
import { ArrowDown, ArrowUpRight, Copy, Check, Mail, Compass, Layers, Code2, ArrowUp } from 'lucide-react';

interface AtelierOverlayProps {
  progress: number;
  activeZone: 0 | 1 | 2 | 3;
  onSelectProject: (p: Project) => void;
  hoveredProjectId: string | null;
  setHoveredProjectId: (id: string | null) => void;
  scrollToZone: (zone: 0 | 1 | 2 | 3) => void;
}

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const CURRENT_YEAR = new Date().getFullYear();

export const AtelierOverlay: React.FC<AtelierOverlayProps> = ({
  activeZone,
  onSelectProject,
  hoveredProjectId,
  setHoveredProjectId,
  scrollToZone,
}) => {
  const [timeStr, setTimeStr] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const str = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Jakarta',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTimeStr(`${str} WIB`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const navItems = [
    { label: '01 ENTRANCE', zone: 0 as const },
    { label: '02 CREATOR', zone: 1 as const },
    { label: '03 WORKSHOP', zone: 2 as const },
    { label: '04 CONNECTION', zone: 3 as const },
  ];

  return (
    <div className="relative z-10 w-full text-[#F1ECE3] pointer-events-none select-none">
      {/* ========================================================
          STICKY TOP NAVIGATION BAR (Always visible & interactive)
         ======================================================== */}
      <header className="fixed top-0 left-0 w-full z-50 p-6 sm:p-10 pointer-events-auto flex items-center justify-between">
        {/* Brand identity */}
        <button
          onClick={() => scrollToZone(0)}
          className="flex items-center gap-3.5 group focus:outline-none"
        >
          <div className="w-9 h-9 bg-[#F1ECE3] text-[#141311] font-display font-extrabold text-sm flex items-center justify-center tracking-tighter group-hover:bg-[#A65338] group-hover:text-white transition-colors">
            M
          </div>
          <div className="text-left">
            <div className="font-display font-bold text-sm tracking-wider uppercase text-white">
              MELLINO
            </div>
            <div className="font-mono text-[9px] text-[#A65338] tracking-widest uppercase">
              DIGITAL ATELIER
            </div>
          </div>
        </button>

        {/* Spatial Zone Jump Bar */}
        <nav className="hidden md:flex items-center gap-1 bg-[#1A1916]/80 backdrop-blur-md px-3 py-1.5 border border-[#F1ECE3]/15">
          {navItems.map((item) => {
            const isActive = activeZone === item.zone;
            return (
              <button
                key={item.zone}
                onClick={() => scrollToZone(item.zone)}
                className={`px-3 py-1 font-mono text-[11px] tracking-wider uppercase transition-all ${
                  isActive
                    ? 'bg-[#A65338] text-white font-bold'
                    : 'text-[#F1ECE3]/70 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Live Jakarta Time & Status */}
        <div className="flex items-center gap-4 font-mono text-xs">
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#F1ECE3]/60 uppercase text-[11px]">MALANG, ID</span>
            <span className="text-white font-bold">{timeStr || '19:00:00 WIB'}</span>
          </div>

          <button
            onClick={() => scrollToZone(3)}
            className="px-3.5 py-1.5 bg-[#A65338] hover:bg-[#8e452e] text-white font-display text-xs font-bold uppercase tracking-wider transition-colors"
          >
            INITIATE
          </button>
        </div>
      </header>

      {/* ========================================================
          ZONE 01: THE ENTRANCE (Scroll Height: 120vh)
         ======================================================== */}
      <section
        id="entrance"
        className="min-h-[120vh] w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-between pt-36 pb-20 pointer-events-none"
      >
        <div className="font-mono text-xs text-[#A65338] font-bold tracking-widest uppercase pointer-events-auto">
          [ZONE 01 // THE ENTRANCE]
        </div>

        {/* Monumental Hero Headline */}
        <div className="my-auto space-y-4 pointer-events-auto">
          <h1 className="font-display font-extrabold text-[16vw] sm:text-[17vw] leading-[0.8] tracking-tighter text-[#F1ECE3] uppercase">
            Mellino
          </h1>

          <div className="max-w-2xl space-y-3 pt-2">
            <p className="text-2xl sm:text-4xl lg:text-5xl font-serif italic text-[#E1D8CA] leading-snug">
              &ldquo;Building digital experiences with intention.&rdquo;
            </p>
            <p className="text-sm sm:text-base text-[#F1ECE3]/70 font-sans leading-relaxed">
              Fullstack developer exploring the intersection of technology, design, and meaningful digital experiences. Welcome to the Digital Atelier.
            </p>
          </div>
        </div>

        {/* Bottom Scroll Prompt */}
        <div className="flex items-center justify-between border-t border-[#F1ECE3]/15 pt-6 font-mono text-xs text-[#F1ECE3]/60 pointer-events-auto">
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-[#A65338]" />
            <span>INTERACTIVE 3D ENVIRONMENT // SCROLL TO JOURNEY</span>
          </div>
          <button
            onClick={() => scrollToZone(1)}
            className="group flex items-center gap-2 text-white hover:text-[#A65338] transition-colors uppercase"
          >
            <span>Proceed to Creator</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* ========================================================
          ZONE 02: THE CREATOR (Scroll Height: 120vh)
         ======================================================== */}
      <section
        id="creator"
        className="min-h-[120vh] w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-between py-24 pointer-events-none"
      >
        <div className="font-mono text-xs text-[#A65338] font-bold tracking-widest uppercase pointer-events-auto">
          [ZONE 02 // THE CREATOR & ETHOS]
        </div>

        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pointer-events-auto">
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif italic text-white leading-tight">
              &ldquo;I&apos;m interested in creating digital products where engineering meets thoughtful design.&rdquo;
            </h2>
            <p className="text-base sm:text-lg text-[#F1ECE3]/80 leading-relaxed font-sans max-w-xl">
              {PERSONAL_INFO.editorialStatement}
            </p>
          </div>

          <div className="lg:col-span-4 space-y-4 font-mono text-xs">
            <div className="p-5 bg-[#1B1A17]/85 border border-[#F1ECE3]/15 space-y-2 backdrop-blur-md">
              <div className="flex items-center gap-2 text-[#A65338] font-bold">
                <Code2 className="w-3.5 h-3.5" />
                <span>TECHNICAL RIGOR</span>
              </div>
              <p className="text-[#F1ECE3]/70 font-sans text-xs">
                Go APIs, MySQL relational schemas, React 19 and Next.js type-safe frontends with sub-second benchmarks.
              </p>
            </div>

            <div className="p-5 bg-[#1B1A17]/85 border border-[#F1ECE3]/15 space-y-2 backdrop-blur-md">
              <div className="flex items-center gap-2 text-[#755644] font-bold">
                <Layers className="w-3.5 h-3.5" />
                <span>SPATIAL AESTHETICS</span>
              </div>
              <p className="text-[#F1ECE3]/70 font-sans text-xs">
                Warm Brutalism, physically based lighting, and tactile paper grain that honors human emotion.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#F1ECE3]/15 pt-6 font-mono text-xs text-[#F1ECE3]/60 pointer-events-auto">
          <span>MALANG, EAST JAVA // 07°58′S 112°37′E</span>
          <button
            onClick={() => scrollToZone(2)}
            className="group flex items-center gap-2 text-white hover:text-[#A65338] transition-colors uppercase"
          >
            <span>Enter The Workshop</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* ========================================================
          ZONE 03: THE WORKSHOP (Scroll Height: 140vh)
         ======================================================== */}
      <section
        id="workshop"
        className="min-h-[140vh] w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-between py-24 pointer-events-none"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-auto">
          <div>
            <div className="font-mono text-xs text-[#A65338] font-bold tracking-widest uppercase">
              [ZONE 03 // THE WORKSHOP]
            </div>
            <h2 className="mt-2 text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight">
              Selected Commissions.
            </h2>
          </div>
          <div className="font-mono text-xs text-[#E1D8CA]/60">
            HOVER 3D PORTALS OR CLICK BELOW TO INSPECT DOSSIER
          </div>
        </div>

        {/* Interactive HTML Project Selector Sync Bar */}
        <div className="my-auto pointer-events-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SELECTED_PROJECTS.map((proj) => {
            const isHovered = hoveredProjectId === proj.id;
            return (
              <div
                key={proj.id}
                onMouseEnter={() => setHoveredProjectId(proj.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                onClick={() => onSelectProject(proj)}
                className={`p-4 bg-[#1B1A17]/80 backdrop-blur-md border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                  isHovered
                    ? 'border-[#A65338] bg-[#221F1B] translate-y-[-2px]'
                    : 'border-[#F1ECE3]/15 hover:border-[#F1ECE3]/40'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-[#A65338] font-bold">
                    <span>[{proj.number}]</span>
                    <span className="text-[#E1D8CA]/60 uppercase">{proj.category.split('/')[0]}</span>
                  </div>
                  <div className="text-base font-display font-bold text-white mt-0.5">
                    {proj.title}
                  </div>
                </div>

                <div className="w-7 h-7 rounded-full border border-[#F1ECE3]/20 flex items-center justify-center text-white shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-[#F1ECE3]/15 pt-6 font-mono text-xs text-[#F1ECE3]/60 pointer-events-auto">
          <span>06 VERIFIED PRODUCTION CASE STUDIES</span>
          <button
            onClick={() => scrollToZone(3)}
            className="group flex items-center gap-2 text-white hover:text-[#A65338] transition-colors uppercase"
          >
            <span>Proceed to Connection</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* ========================================================
          ZONE 04: THE CONNECTION (Scroll Height: 110vh)
         ======================================================== */}
      <section
        id="connection"
        className="min-h-[110vh] w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-between py-24 pointer-events-none"
      >
        <div className="font-mono text-xs text-[#A65338] font-bold tracking-widest uppercase pointer-events-auto">
          [ZONE 04 // THE CONNECTION]
        </div>

        {/* Grand Finale Editorial Closing */}
        <div className="my-auto space-y-8 pointer-events-auto">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[0.95]">
              Let&apos;s build something meaningful.
            </h2>
            <p className="text-2xl sm:text-3xl font-serif italic text-[#E1D8CA]">
              &ldquo;Available for select opportunities &amp; bespoke commissions.&rdquo;
            </p>
          </div>

          {/* Direct Copy Transmission Card */}
          <div className="p-6 sm:p-8 bg-[#1B1A17]/85 border border-[#F1ECE3]/15 backdrop-blur-md max-w-xl space-y-4">
            <span className="font-mono text-xs uppercase text-[#A65338] font-bold tracking-widest block">
              DIRECT TRANSMISSION
            </span>
            <div className="font-display font-bold text-2xl sm:text-3xl text-white break-all">
              {PERSONAL_INFO.email}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleCopyEmail}
                className="flex-1 px-5 py-3 bg-[#A65338] hover:bg-[#8e452e] text-white font-mono text-xs uppercase font-bold transition-all flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="px-5 py-3 bg-[#F1ECE3] hover:bg-white text-[#141311] font-mono text-xs uppercase font-bold transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Send Mail</span>
              </a>
            </div>
          </div>

          {/* Social Conduits */}
          <div className="flex items-center gap-6 font-mono text-xs">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#F1ECE3]/70 hover:text-white transition-colors"
            >
              <GithubIcon className="w-4 h-4 text-[#A65338]" />
              <span>GitHub</span>
            </a>
            <span className="text-[#F1ECE3]/20">/</span>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#F1ECE3]/70 hover:text-white transition-colors"
            >
              <LinkedinIcon className="w-4 h-4 text-[#A65338]" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Footer Return To Top */}
        <div className="flex items-center justify-between border-t border-[#F1ECE3]/15 pt-6 font-mono text-xs text-[#F1ECE3]/50 pointer-events-auto">
          <div>
            MELLINO © {CURRENT_YEAR} — THE DIGITAL ATELIER.
          </div>
          <button
            onClick={() => scrollToZone(0)}
            className="flex items-center gap-2 text-white hover:text-[#A65338] transition-colors uppercase"
          >
            <span>Return to Entrance</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
