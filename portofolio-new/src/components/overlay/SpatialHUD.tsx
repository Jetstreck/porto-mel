import React, { useState, useEffect, useMemo } from 'react';
import { PERSONAL_INFO, SELECTED_PROJECTS, CAPABILITIES } from '../../data/portfolioData';
import type { Project, Capability } from '../../types';
import { Copy, Check, Mail, ArrowUp, ExternalLink } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

interface SpatialHUDProps {
  progress: number;
  activeChapter: 0 | 1 | 2 | 3 | 4;
  onSelectProject: (p: Project) => void;
  hoveredProjectId: string | null;
  setHoveredProjectId: (id: string | null) => void;
  flyToChapter: (chapter: 0 | 1 | 2 | 3 | 4) => void;
  flyToProgress?: (targetP: number) => void;
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

export const SpatialHUD: React.FC<SpatialHUDProps> = ({
  progress,
  activeChapter,
  onSelectProject,
  hoveredProjectId,
  setHoveredProjectId,
  flyToChapter,
  flyToProgress,
}) => {
  const [timeStr, setTimeStr] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState<Capability>(CAPABILITIES[0]);

  // Chapter 04 5-Stage & Project State Machine
  const ch4Info = useMemo(() => {
    // If hovered explicitly, take precedence
    if (hoveredProjectId) {
      const proj = SELECTED_PROJECTS.find((p) => p.id === hoveredProjectId) || null;
      return {
        stageBadge: 'MANUAL INSPECTION',
        stageTitle: proj ? proj.title : 'Project Monograph',
        stageDesc: proj ? proj.subtitle : 'Direct 3D Workstation Inspection',
        activeProject: proj,
        isOverview: false,
        isClosing: false,
      };
    }

    if (progress < 0.59) {
      return {
        stageBadge: 'ARRIVAL / ARCHIVE PANORAMA',
        stageTitle: 'Establishing Overview: Six Commissions',
        stageDesc: 'All six installations visible along the curved amphitheater plinths.',
        activeProject: null,
        isOverview: true,
        isClosing: false,
      };
    } else if (progress < 0.64) {
      return {
        stageBadge: 'EXHIBITION 01/06',
        stageTitle: SELECTED_PROJECTS[0].title,
        stageDesc: SELECTED_PROJECTS[0].subtitle,
        activeProject: SELECTED_PROJECTS[0],
        isOverview: false,
        isClosing: false,
      };
    } else if (progress < 0.69) {
      return {
        stageBadge: 'EXHIBITION 02/06',
        stageTitle: SELECTED_PROJECTS[1].title,
        stageDesc: SELECTED_PROJECTS[1].subtitle,
        activeProject: SELECTED_PROJECTS[1],
        isOverview: false,
        isClosing: false,
      };
    } else if (progress < 0.74) {
      return {
        stageBadge: 'EXHIBITION 03/06',
        stageTitle: SELECTED_PROJECTS[2].title,
        stageDesc: SELECTED_PROJECTS[2].subtitle,
        activeProject: SELECTED_PROJECTS[2],
        isOverview: false,
        isClosing: false,
      };
    } else if (progress < 0.79) {
      return {
        stageBadge: 'EXHIBITION 04/06',
        stageTitle: SELECTED_PROJECTS[3].title,
        stageDesc: SELECTED_PROJECTS[3].subtitle,
        activeProject: SELECTED_PROJECTS[3],
        isOverview: false,
        isClosing: false,
      };
    } else if (progress < 0.84) {
      return {
        stageBadge: 'EXHIBITION 05/06',
        stageTitle: SELECTED_PROJECTS[4].title,
        stageDesc: SELECTED_PROJECTS[4].subtitle,
        activeProject: SELECTED_PROJECTS[4],
        isOverview: false,
        isClosing: false,
      };
    } else if (progress < 0.875) {
      return {
        stageBadge: 'EXHIBITION 06/06',
        stageTitle: SELECTED_PROJECTS[5].title,
        stageDesc: SELECTED_PROJECTS[5].subtitle,
        activeProject: SELECTED_PROJECTS[5],
        isOverview: false,
        isClosing: false,
      };
    } else {
      return {
        stageBadge: 'ARCHIVE EXIT TRANSITION',
        stageTitle: 'Leaving The Project Archive',
        stageDesc: 'Gliding along the gallery walkway toward the Connection Lounge.',
        activeProject: null,
        isOverview: false,
        isClosing: true,
      };
    }
  }, [progress, hoveredProjectId]);

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

  const chapters = [
    { label: '01 ENTRANCE', index: 0 as const },
    { label: '02 ABOUT', index: 1 as const },
    { label: '03 EXPERTISE', index: 2 as const },
    { label: '04 PROJECTS', index: 3 as const },
    { label: '05 CONTACT', index: 4 as const },
  ];

  // =========================================================================
  // STRICT CHAPTER ISOLATION & NON-OVERLAPPING OPACITY CURVES
  // =========================================================================
  const isCh0 = progress <= 0.18;
  const isCh1 = progress > 0.16 && progress <= 0.38;
  const isCh2 = progress > 0.36 && progress <= 0.56;
  const isCh3 = progress > 0.54 && progress <= 0.915;
  const isCh4 = progress > 0.935;

  // Smooth continuous cross-fading
  const op0 = progress <= 0.12 ? 1 : Math.max(0, 1 - (progress - 0.12) / 0.06);
  const op1 =
    progress < 0.18
      ? 0
      : progress <= 0.23
      ? (progress - 0.18) / 0.05
      : progress <= 0.33
      ? 1
      : Math.max(0, 1 - (progress - 0.33) / 0.05);
  const op2 =
    progress < 0.38
      ? 0
      : progress <= 0.43
      ? (progress - 0.38) / 0.05
      : progress <= 0.52
      ? 1
      : Math.max(0, 1 - (progress - 0.52) / 0.04);
  const op3 =
    progress < 0.54
      ? 0
      : progress <= 0.58
      ? (progress - 0.54) / 0.04
      : progress <= 0.875
      ? 1
      : Math.max(0, 1 - (progress - 0.875) / 0.03); // Fades completely by 0.905
  // Chapter 05 HUD emerges only after the camera traverses the corridor and enters the lounge
  const op4 = progress < 0.94 ? 0 : Math.min(1, (progress - 0.94) / 0.04);

  return (
    <div className="fixed inset-0 w-full h-full z-20 pointer-events-none select-none overflow-hidden">
      {/* ========================================================
          GLOBAL NAVBAR: REFINED EDITORIAL NAVIGATION
          No boxed toolbar, no pill buttons, pure architectural typography
         ======================================================== */}
      <header className="fixed top-0 left-0 w-full px-6 sm:px-12 lg:px-16 py-6 sm:py-8 pointer-events-auto flex items-center justify-between z-50">
        {/* Left: Editorial Wordmark + Descriptor */}
        <button
          onClick={() => flyToChapter(0)}
          className="group text-left flex items-baseline gap-3.5 focus:outline-none"
        >
          <span className="font-display font-black text-base sm:text-lg tracking-[0.16em] text-[#F1ECE3] uppercase group-hover:text-[#A65338] transition-colors">
            MELLINO
          </span>
          <span className="hidden sm:inline font-sans text-[11px] text-[#A65338] tracking-[0.2em] uppercase font-semibold">
            / FULLSTACK DEVELOPER
          </span>
        </button>

        {/* Center: Exhibition Chapter Index */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 font-sans text-xs tracking-wider">
          {chapters.map((ch) => {
            const isActive = activeChapter === ch.index;
            return (
              <button
                key={ch.index}
                onClick={() => flyToChapter(ch.index)}
                className="group relative py-1 focus:outline-none"
              >
                <span
                  className={`transition-all duration-300 block ${
                    isActive
                      ? 'text-[#A65338] font-bold tracking-widest'
                      : 'text-[#B0A596] hover:text-white'
                  }`}
                >
                  {ch.label}
                </span>
                {/* Subtle animated hairline indicator */}
                <span
                  className={`absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-[#A65338] transition-all duration-300 origin-left ${
                    isActive
                      ? 'opacity-100 scale-x-100'
                      : 'opacity-0 scale-x-0 group-hover:opacity-40 group-hover:scale-x-100'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Right: Live Geographic Status & Editorial Inquire Link */}
        <div className="flex items-center gap-5 sm:gap-7 font-sans text-xs">
          <div className="hidden lg:flex items-center gap-2 text-[#B0A596] text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A65338]" />
            <span>MALANG, ID</span>
            <span className="text-[#F1ECE3]/20">/</span>
            <span className="text-[#D1C8BB]">{timeStr}</span>
          </div>

          <button
            onClick={() => flyToChapter(4)}
            className="group relative flex items-center gap-1.5 font-sans font-semibold text-xs text-[#F1ECE3] hover:text-[#A65338] uppercase tracking-wider transition-colors"
          >
            <span>INQUIRE</span>
            <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
            <span className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-current opacity-30 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </header>

      {/* Global Scroll Journey Hairline Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-[1.5px] bg-[#F1ECE3]/10 z-50">
        <div
          className="h-full bg-[#A65338] transition-all duration-75 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* ========================================================
          CHAPTER 01: THE ENTRANCE (HERO)
          Composition: Asymmetrical left-aligned typography leaving right side open for 3D diorama
         ======================================================== */}
      {isCh0 && (
        <div
          className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-between pt-32 sm:pt-36 pb-12 sm:pb-16 transition-opacity duration-500"
          style={{
            opacity: op0,
            pointerEvents: op0 > 0.3 ? 'auto' : 'none',
            transform: `translate3d(0, ${(1 - op0) * -20}px, 0)`,
          }}
        >
          {/* Section Eyebrow with hairline rule */}
          <div className="flex items-center gap-3 font-mono text-xs text-[#A65338] font-bold tracking-widest uppercase">
            <span>01 // THE ENTRANCE</span>
            <span className="text-[#F1ECE3]/20">—</span>
            <span className="text-[#E1D8CA]/60 font-normal tracking-wider">THE CREATIVE WORKSHOP</span>
          </div>

          {/* Monumental Typographic Presentation */}
          <div className="my-auto max-w-2xl space-y-5">
            <h1 className="font-display font-black text-6xl sm:text-8xl lg:text-[116px] leading-[0.88] tracking-tighter text-[#F1ECE3] uppercase">
              Mellino
            </h1>

            <div className="space-y-3.5 pt-1">
              <p className="text-2xl sm:text-4xl lg:text-[42px] font-serif italic text-[#E1D8CA] leading-snug">
                &ldquo;Building digital experiences with intention.&rdquo;
              </p>
              <p className="text-sm sm:text-base text-[#D1C8BB] font-sans leading-relaxed max-w-xl">
                Fullstack developer exploring the intersection of modern software systems, tactile 3D environments, and intentional digital craft.
              </p>
            </div>
          </div>

          {/* Bottom Exhibition Direction Bar */}
          <div className="flex items-center justify-between border-t border-[#F1ECE3]/15 pt-6 font-mono text-xs text-[#F1ECE3]/60">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[#A65338]" />
              <span className="tracking-widest uppercase text-[11px]">SCROLL TO JOURNEY THROUGH 3D WORLD</span>
            </div>
            <button
              onClick={() => flyToChapter(1)}
              className="group flex items-center gap-2 text-white hover:text-[#A65338] transition-colors uppercase font-mono tracking-wider text-xs"
            >
              <span>Explore About 02</span>
              <span className="text-sm transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5">
                ↓
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          CHAPTER 02: ABOUT (THE MAKER'S EXHIBITION)
          Composition: Asymmetrical left-dominant editorial biography & tabular metadata
         ======================================================== */}
      {isCh1 && (
        <div
          className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-between pt-32 sm:pt-36 pb-12 sm:pb-16 transition-opacity duration-500"
          style={{
            opacity: op1,
            pointerEvents: op1 > 0.3 ? 'auto' : 'none',
            transform: `translate3d(0, ${(1 - op1) * 20}px, 0)`,
          }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 font-mono text-xs text-[#A65338] font-bold tracking-widest uppercase">
            <span>02 // THE MAKER&apos;S EXHIBITION</span>
            <span className="text-[#F1ECE3]/20">—</span>
            <span className="text-[#E1D8CA]/60 font-normal tracking-wider">CREATOR DOSSIER</span>
          </div>

          {/* Left-focused editorial layout */}
          <div className="my-auto max-w-xl space-y-6">
            <div className="space-y-2">
              <div className="font-mono text-[10px] tracking-[0.25em] text-[#A65338] uppercase font-bold">
                PHILOSOPHY &amp; BACKGROUND
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-serif italic text-white leading-[1.08] tracking-tight">
                From physical structures to software systems.
              </h2>
            </div>

            <div className="space-y-3 text-[#F1ECE3]/80 text-sm sm:text-base leading-relaxed font-sans">
              <p>
                I&apos;m Mellino, a Fullstack Developer who views software architecture through the lens of structural engineering—combining structural integrity with human usability.
              </p>
              <p>
                With a background in <span className="text-[#E1D8CA] font-medium">Pendidikan Teknik Bangunan</span>, my approach to code mirrors building design: load-bearing foundations, clean contracts, and expressive spatial experiences.
              </p>
            </div>

            {/* Swiss Tabular Metadata Matrix (Pure Typography, No Box Cards) */}
            <div className="pt-2 border-t border-[#F1ECE3]/15 space-y-2.5 font-mono text-xs">
              {[
                { idx: '01', label: 'DISCIPLINE', val: 'Fullstack Engineering & Creative Technology' },
                { idx: '02', label: 'FOUNDATION', val: 'Pendidikan Teknik Bangunan (Structural Systems)' },
                { idx: '03', label: 'METHODOLOGY', val: 'Rigor, Spatial Craft & Human Empathy' },
                { idx: '04', label: 'LOCATION', val: 'Malang, East Java, Indonesia (07°58′S, 112°37′E)' },
              ].map((row) => (
                <div key={row.idx} className="flex items-baseline justify-between py-1.5 border-b border-[#F1ECE3]/10 gap-4">
                  <div className="flex items-baseline gap-2.5 shrink-0">
                    <span className="text-[#A65338] text-[10px] font-bold">[{row.idx}]</span>
                    <span className="text-[#E1D8CA]/60 text-[11px] tracking-wider uppercase">{row.label}</span>
                  </div>
                  <span className="text-white font-medium text-xs sm:text-sm text-right truncate">
                    {row.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#F1ECE3]/15 pt-6 font-mono text-xs text-[#F1ECE3]/60">
            <span>MALANG, EAST JAVA // INDONESIA</span>
            <button
              onClick={() => flyToChapter(2)}
              className="group flex items-center gap-2 text-white hover:text-[#A65338] transition-colors uppercase font-mono tracking-wider text-xs"
            >
              <span>Proceed to Expertise 03</span>
              <span className="text-sm transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5">
                ↓
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          CHAPTER 03: EXPERTISE (THE ENGINEERING LAB)
          Composition: Right-aligned Architectural Technical Specimen Sheet
          Zero generic boxes; inline typographic technology architecture
         ======================================================== */}
      {isCh2 && (
        <div
          className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-between pt-32 sm:pt-36 pb-12 sm:pb-16 transition-opacity duration-500"
          style={{
            opacity: op2,
            pointerEvents: op2 > 0.3 ? 'auto' : 'none',
            transform: `translate3d(0, ${(1 - op2) * 20}px, 0)`,
          }}
        >
          {/* Section Header */}
          <div className="flex items-center justify-between border-b border-[#F1ECE3]/15 pb-3 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="text-[#A65338] font-bold tracking-widest uppercase">
                03 // THE ENGINEERING LAB
              </span>
              <span className="text-[#F1ECE3]/20">—</span>
              <span className="text-[#E1D8CA]/60 tracking-wider">TECHNICAL SPECIFICATIONS</span>
            </div>
            <span className="text-[#E1D8CA]/60 tracking-wider hidden sm:inline">
              4 CORE DISCIPLINES &bull; INTERFACE TO INFRASTRUCTURE
            </span>
          </div>

          {/* Right-aligned architectural specimen content */}
          <div className="my-auto flex justify-end">
            <div className="w-full max-w-xl space-y-6">
              <div>
                <span className="font-mono text-[10px] text-[#A65338] uppercase font-bold tracking-[0.25em] block">
                  TECHNICAL CRAFT &bull; ARCHITECTURE
                </span>
                <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight mt-1">
                  EXPERTISE
                </h2>
                <p className="text-base sm:text-lg text-[#E1D8CA]/90 font-serif italic mt-1 leading-snug">
                  Disciplined engineering from interface to infrastructure.
                </p>
              </div>

              {/* Typographic Discipline Switcher (No Boxed Buttons) */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 border-b border-[#F1ECE3]/15 pb-2 font-mono text-xs">
                {[
                  { id: 'frontend-architecture', label: '01 FRONTEND' },
                  { id: 'fullstack-systems', label: '02 BACKEND' },
                  { id: 'system-integration', label: '03 INTEGRATION' },
                  { id: 'tools-workflow', label: '04 WORKFLOW' },
                ].map((item) => {
                  const isSelected = selectedCapability.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        const found = CAPABILITIES.find((c) => c.id === item.id);
                        if (found) {
                          setSelectedCapability(found);
                        } else if (item.id === 'system-integration') {
                          setSelectedCapability({
                            id: 'system-integration',
                            number: '03',
                            name: 'System Integration',
                            tagline: 'Reliable communication between client and distributed services.',
                            description: 'Architecting secure data exchange pipelines, authentication handshakes, and streaming conduits. Connecting client experiences with backend infrastructure through clean API contracts.',
                            technologies: ['RESTful APIs', 'JWT / Auth', 'WebSockets', 'Data Pipelines'],
                            deliverables: ['OAuth / JWT Handshakes', 'API Contract Specs', 'Streaming Data Conduits', 'Service Proxies'],
                            architecturalFocus: 'Stateless authentication, latency optimization, and contract validation.',
                          });
                        } else if (item.id === 'tools-workflow') {
                          setSelectedCapability({
                            id: 'tools-workflow',
                            number: '04',
                            name: 'Tools & Workflow',
                            tagline: 'Systematic engineering practices from version control to automated testing.',
                            description: 'Disciplined developer workflows ensuring reproducibility and code health. Combining atomic Git commits, automated linting, test-driven endpoint validation, and structured documentation.',
                            technologies: ['Git', 'GitHub', 'VS Code', 'Postman'],
                            deliverables: ['Atomic Version Control', 'Automated Linting (Oxlint)', 'API Test Suites', 'Architecture Docs'],
                            architecturalFocus: 'Deterministic builds, zero lint debt, and test-driven contract adherence.',
                          });
                        }
                      }}
                      className="group relative pb-1 focus:outline-none"
                    >
                      <span
                        className={`transition-all duration-200 tracking-wider text-xs ${
                          isSelected
                            ? 'text-[#A65338] font-bold'
                            : 'text-[#F1ECE3]/50 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </span>
                      <span
                        className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[#A65338] transition-all duration-300 origin-left ${
                          isSelected ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-40'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Active Discipline Dossier Spec Sheet */}
              <div className="space-y-4">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                    {selectedCapability.name}
                  </h3>
                  <span className="font-mono text-xs text-[#A65338] font-bold shrink-0">
                    SPEC // {selectedCapability.number}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#F1ECE3]/80 font-sans leading-relaxed">
                  {selectedCapability.description}
                </p>

                {/* Technology Architecture: Typographic Inline List (NO PILL CHIPS) */}
                <div className="pt-2 border-t border-[#F1ECE3]/10 space-y-1">
                  <span className="text-[10px] font-mono text-[#A65338] uppercase font-bold tracking-widest block">
                    TECHNOLOGY MATRIX
                  </span>
                  <div className="font-mono text-xs text-[#E1D8CA] leading-relaxed tracking-wider">
                    {selectedCapability.technologies.join('  /  ')}
                  </div>
                </div>

                {/* Core Deliverables: Minimalist Typographic List */}
                <div className="pt-2 border-t border-[#F1ECE3]/10 space-y-2">
                  <span className="text-[10px] font-mono text-[#A65338] uppercase font-bold tracking-widest block">
                    VERIFIED DELIVERABLES
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs font-mono text-[#F1ECE3]/85">
                    {selectedCapability.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-baseline gap-2">
                        <span className="text-[#A65338] font-bold">—</span>
                        <span className="truncate">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Architectural Benchmark Focus */}
                <div className="pt-2 border-t border-[#F1ECE3]/10 flex items-baseline gap-2 font-mono text-xs">
                  <span className="text-[#A65338] text-[10px] font-bold tracking-widest uppercase shrink-0">
                    FOCUS:
                  </span>
                  <span className="text-[#E1D8CA]/80 italic font-serif text-sm">
                    {selectedCapability.architecturalFocus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#F1ECE3]/15 pt-6 font-mono text-xs text-[#F1ECE3]/60">
            <span>DISCIPLINED SYSTEMS &bull; SUB-SECOND LATENCY &bull; 60 FPS WEBGL</span>
            <button
              onClick={() => flyToChapter(3)}
              className="group flex items-center gap-2 text-white hover:text-[#A65338] transition-colors uppercase font-mono tracking-wider text-xs"
            >
              <span>Proceed to Projects 04</span>
              <span className="text-sm transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5">
                ↓
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          CHAPTER 04: PROJECTS (THE PROJECT ARCHIVE)
          Redesigned: Floating Editorial Monograph Callout + Exhibition Catalogue Index
         ======================================================== */}
      {isCh3 && (
        <div
          className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-between pt-32 sm:pt-36 pb-12 sm:pb-16 transition-opacity duration-500"
          style={{
            opacity: op3,
            pointerEvents: op3 > 0.3 ? 'auto' : 'none',
            transform: `translate3d(0, ${(1 - op3) * 20}px, 0)`,
          }}
        >
          {/* Top Curatorial Bar */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-[#F1ECE3]/15 pb-4">
            <div>
              <div className="font-mono text-xs text-[#A65338] font-bold tracking-widest uppercase">
                04 // THE PROJECT ARCHIVE &bull; {ch4Info.stageBadge}
              </div>
              <h2 className="mt-1 text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                {ch4Info.isOverview ? 'Selected Commissions.' : ch4Info.stageTitle}
              </h2>
            </div>
            <div className="font-mono text-xs text-[#E1D8CA]/70 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A65338]" />
              <span className="tracking-wider uppercase text-[11px]">{ch4Info.stageDesc}</span>
            </div>
          </div>

          {/* Floating Editorial Monograph Callout Plate (Top Right) */}
          <div className="min-h-24 flex items-center justify-end pointer-events-none mt-2">
            {ch4Info.isOverview && (
              <div className="max-w-md p-5 bg-[#181714]/85 backdrop-blur-md border border-[#F1ECE3]/15 shadow-xl space-y-1">
                <div className="font-mono text-[10px] text-[#A65338] font-bold uppercase tracking-widest">
                  STAGE 01 // ARRIVAL PANORAMA
                </div>
                <div className="font-display font-bold text-white text-base">
                  The Continuous Exhibition Amphitheater
                </div>
                <p className="font-mono text-xs text-[#E1D8CA]/70 leading-relaxed pt-1">
                  All six installations are physically present along the curved gallery. Scroll forward to begin the continuous tour from 01 to 06.
                </p>
              </div>
            )}

            {ch4Info.activeProject && (
              <div
                onClick={() => onSelectProject(ch4Info.activeProject!)}
                className="pointer-events-auto cursor-pointer max-w-lg p-5 sm:p-6 bg-[#181714]/90 backdrop-blur-md border border-[#A65338]/60 shadow-2xl transition-all hover:border-[#A65338] group space-y-3"
              >
                <div className="flex items-center justify-between gap-3 font-mono text-[10px]">
                  <div className="flex items-center gap-2 text-[#A65338] font-bold">
                    <span>PROJECT / {ch4Info.activeProject.number}</span>
                    <span className="text-[#F1ECE3]/30">&bull;</span>
                    <span className="text-[#E1D8CA]/80 uppercase">{ch4Info.activeProject.category}</span>
                  </div>
                  <span className="text-[#F1ECE3]/50">{ch4Info.activeProject.year}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-extrabold text-white text-lg sm:text-xl group-hover:text-[#A65338] transition-colors">
                    {ch4Info.activeProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E1D8CA]/80 line-clamp-2 leading-relaxed font-sans">
                    {ch4Info.activeProject.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F1ECE3]/10 flex items-center justify-between gap-3 font-mono text-xs">
                  <div className="text-[10px] text-[#F1ECE3]/60 truncate">
                    {ch4Info.activeProject.techStack.join('  /  ')}
                  </div>
                  <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-[#A65338] group-hover:translate-x-1 transition-transform">
                    <span>VIEW CASE STUDY</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            )}

            {ch4Info.isClosing && (
              <div className="max-w-md p-5 bg-[#181714]/85 backdrop-blur-md border border-[#A65338] shadow-xl space-y-1">
                <div className="font-mono text-[10px] text-[#A65338] font-bold uppercase tracking-widest">
                  STAGE 05 // ARCHIVE EXIT
                </div>
                <div className="font-display font-bold text-white text-base">
                  Leaving The Project Archive
                </div>
                <p className="font-mono text-xs text-[#E1D8CA]/70 leading-relaxed pt-1">
                  Proceeding forward through the portal into Chapter 05 // The Connection Lounge.
                </p>
              </div>
            )}
          </div>

          {/* Center viewport is 100% OPEN for the 3D installations */}
          <div className="my-auto pointer-events-none" />

          {/* Bottom Exhibition Index: Curated Horizontal Gallery Strip */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-y border-[#F1ECE3]/15 divide-y sm:divide-y-0 sm:divide-x divide-[#F1ECE3]/10 bg-[#161513]/80 backdrop-blur-md pointer-events-auto">
              {SELECTED_PROJECTS.map((proj, idx) => {
                const isHovered = hoveredProjectId === proj.id;
                const isCurrentActive = ch4Info.activeProject?.id === proj.id;
                const TARGET_PROGRESS = [0.62, 0.67, 0.72, 0.77, 0.82, 0.85];

                return (
                  <button
                    key={proj.id}
                    onMouseEnter={() => setHoveredProjectId(proj.id)}
                    onMouseLeave={() => setHoveredProjectId(null)}
                    onClick={() => {
                      if (flyToProgress) {
                        flyToProgress(TARGET_PROGRESS[idx]);
                      }
                      onSelectProject(proj);
                    }}
                    className={`relative p-3.5 sm:p-4 text-left transition-all duration-200 group focus:outline-none ${
                      isCurrentActive || isHovered
                        ? 'bg-[#1D1C19]'
                        : 'hover:bg-[#1A1916]'
                    }`}
                  >
                    {/* Top Active Indicator Line */}
                    <span
                      className={`absolute top-0 left-0 w-full h-[2px] bg-[#A65338] transition-all duration-200 ${
                        isCurrentActive || isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    />

                    <div className="flex items-baseline justify-between mb-1">
                      <span className="font-mono text-[10px] text-[#A65338] font-bold">
                        {proj.number}
                      </span>
                      <span className="font-mono text-[9px] text-[#F1ECE3]/40 group-hover:text-[#F1ECE3]/80 transition-colors uppercase">
                        {proj.category.split('/')[0]}
                      </span>
                    </div>

                    <div className="font-display font-bold text-xs sm:text-sm text-white truncate">
                      {proj.title.split('—')[0]}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-[#F1ECE3]/15 pt-4 font-mono text-xs text-[#F1ECE3]/60">
              <span>06 VERIFIED CASE STUDIES &bull; DESKTOP 16:10 WEB EXPERIENCES</span>
              <button
                onClick={() => flyToChapter(4)}
                className="group flex items-center gap-2 text-white hover:text-[#A65338] transition-colors uppercase pointer-events-auto font-mono text-xs"
              >
                <span>Proceed to Contact 05</span>
                <span className="text-sm transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5">
                  ↓
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          CHAPTER 05: THE CONNECTION LOUNGE (CONTACT)
          Composition: Architectural Editorial Two-Column Directory & Signature Footer
         ======================================================== */}
      {isCh4 && (
        <div
          className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-between pt-32 sm:pt-36 pb-12 sm:pb-16 transition-opacity duration-500 overflow-y-auto no-scrollbar pointer-events-none"
          style={{
            opacity: op4,
            pointerEvents: op4 > 0.3 ? 'auto' : 'none',
            transform: `translate3d(0, ${(1 - op4) * 20}px, 0)`,
          }}
        >
          {/* Eyebrow & Status Header */}
          <div className="flex items-center justify-between border-b border-[#F1ECE3]/15 pb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#A65338] font-bold tracking-widest uppercase">
                05 // THE CONNECTION LOUNGE
              </span>
              <span className="text-[#F1ECE3]/20">—</span>
              <span className="font-mono text-xs text-[#E1D8CA]/70 tracking-wider uppercase">
                COMMISSION INQUIRIES
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-[#22C55E]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="tracking-wider uppercase text-[11px] font-semibold">
                AVAILABLE FOR COMMISSIONS
              </span>
            </div>
          </div>

          {/* Balanced Two-Column Architectural Layout */}
          <div className="my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start pointer-events-auto">
            
            {/* LEFT COLUMN: Narrative, Identity Spec Table & Primary CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white leading-[1.02]">
                  Have an idea? Let&apos;s build something meaningful.
                </h2>
                <p className="text-base sm:text-lg font-serif italic text-[#E1D8CA]/90 leading-relaxed max-w-xl">
                  &ldquo;I&apos;m always open to discussing new projects, creative collaborations, and opportunities to build meaningful digital experiences.&rdquo;
                </p>
              </div>

              {/* Swiss Tabular Specifications (No Cards) */}
              <div className="border-y border-[#F1ECE3]/15 divide-y divide-[#F1ECE3]/10 font-mono text-xs">
                {[
                  { label: 'CREATOR', val: 'Mellino' },
                  { label: 'ROLE', val: 'Fullstack Developer & Creative Technologist' },
                  { label: 'ORIGIN', val: 'Indonesia (UTC+7 / WIB)' },
                  { label: 'STATUS', val: 'Open for Select Commissions' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-baseline justify-between py-2">
                    <span className="text-[#A65338] text-[10px] font-bold tracking-widest uppercase">
                      {item.label}
                    </span>
                    <span className="text-white text-right font-medium">
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Primary Call to Action Statement */}
              <div className="pt-2 space-y-3">
                <span className="font-mono text-xs uppercase text-[#A65338] font-bold tracking-widest block">
                  LET&apos;S CREATE WHAT&apos;S NEXT.
                </span>
                <p className="text-sm text-[#F1ECE3]/80 leading-relaxed max-w-xl">
                  Have an ambitious project, an inquiry, or an opportunity? I&apos;d love to hear about it.
                </p>

                <div className="pt-1">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="group inline-flex items-center gap-3 font-mono text-sm uppercase font-bold text-white tracking-wider relative pb-1 focus:outline-none"
                  >
                    <Mail className="w-4 h-4 text-[#A65338]" />
                    <span className="group-hover:text-[#A65338] transition-colors">START A CONVERSATION</span>
                    <span className="text-sm transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#A65338] transition-all origin-left" />
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: 3 Architectural Channel Entries (Editorial Directory) */}
            <div className="lg:col-span-5 border-t lg:border-t-0 border-[#F1ECE3]/15 divide-y divide-[#F1ECE3]/15">
              
              {/* Channel 01: LinkedIn */}
              <div className="py-5 space-y-1.5 group">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#A65338] font-bold tracking-widest uppercase">
                    01 // PROFESSIONAL NETWORK
                  </span>
                  <LinkedinIcon className="w-4 h-4 text-[#E1D8CA]/50 group-hover:text-[#A65338] transition-colors" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">LinkedIn</h3>
                <p className="font-mono text-xs text-[#F1ECE3]/60 leading-relaxed">
                  Professional monograph, career journey, and direct industry network.
                </p>
                <div className="pt-1">
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#F1ECE3] hover:text-[#A65338] uppercase tracking-wider transition-colors"
                  >
                    <span>Connect on LinkedIn</span>
                    <span className="text-xs">↗</span>
                  </a>
                </div>
              </div>

              {/* Channel 02: GitHub */}
              <div className="py-5 space-y-1.5 group">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#A65338] font-bold tracking-widest uppercase">
                    02 // SOURCE CODE & CRAFT
                  </span>
                  <GithubIcon className="w-4 h-4 text-[#E1D8CA]/50 group-hover:text-[#A65338] transition-colors" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">GitHub</h3>
                <p className="font-mono text-xs text-[#F1ECE3]/60 leading-relaxed">
                  Production repositories, architecture experiments, and commit logs.
                </p>
                <div className="pt-1">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#F1ECE3] hover:text-[#A65338] uppercase tracking-wider transition-colors"
                  >
                    <span>Explore GitHub</span>
                    <span className="text-xs">↗</span>
                  </a>
                </div>
              </div>

              {/* Channel 03: Direct Email */}
              <div className="py-5 space-y-1.5 group">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#A65338] font-bold tracking-widest uppercase">
                    03 // DIRECT TRANSMISSION
                  </span>
                  <Mail className="w-4 h-4 text-[#E1D8CA]/50 group-hover:text-[#A65338] transition-colors" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">Direct Correspondence</h3>
                <div className="font-mono text-xs text-[#E1D8CA] py-1 select-all break-all">
                  {PERSONAL_INFO.email}
                </div>
                <div className="flex items-center gap-4 pt-1">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="inline-flex items-center gap-1 font-mono text-xs uppercase font-bold text-white hover:text-[#A65338] transition-colors"
                  >
                    <span>Send Mail</span>
                    <span className="text-xs">↗</span>
                  </a>
                  <span className="text-[#F1ECE3]/20">/</span>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 font-mono text-xs uppercase text-[#E1D8CA]/80 hover:text-white transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                        <span className="text-[#22C55E] font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Signature Architectural Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#F1ECE3]/15 pt-5 gap-4 font-mono text-xs text-[#F1ECE3]/60 pointer-events-auto">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-center sm:text-left">
              <span className="font-bold text-white tracking-wider">MELLINO</span>
              <span className="text-[#F1ECE3]/30">•</span>
              <span className="tracking-wide">FULLSTACK DEVELOPER</span>
              <span className="text-[#F1ECE3]/30 hidden md:inline">•</span>
              <span className="text-[#E1D8CA]/60 hidden md:inline">&ldquo;Designed and developed with intention.&rdquo;</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden lg:flex items-center gap-2 text-[#F1ECE3]/40 text-[11px]">
                <span>MALANG, INDONESIA</span>
                <span>({timeStr})</span>
              </div>

              <div className="text-[#F1ECE3]/40">
                © {CURRENT_YEAR} MELLINO
              </div>

              <button
                onClick={() => flyToChapter(0)}
                className="group flex items-center gap-1.5 text-white hover:text-[#A65338] transition-colors uppercase font-bold text-xs pointer-events-auto"
              >
                <span>Return to Entrance</span>
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
