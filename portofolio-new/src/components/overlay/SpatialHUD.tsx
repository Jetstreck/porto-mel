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

  // Chapter 04 State Machine
  const ch4Info = useMemo(() => {
    if (hoveredProjectId) {
      const proj = SELECTED_PROJECTS.find((p) => p.id === hoveredProjectId) || null;
      return {
        stageTitle: proj ? proj.title : 'Project Monograph',
        stageDesc: proj ? proj.subtitle : 'Direct inspection',
        activeProject: proj,
        isOverview: false,
        isClosing: false,
      };
    }

    if (progress < 0.59) {
      return {
        stageTitle: 'Selected Commissions',
        stageDesc: 'Six continuous gallery installations',
        activeProject: null,
        isOverview: true,
        isClosing: false,
      };
    } else if (progress < 0.64) {
      return {
        stageTitle: SELECTED_PROJECTS[0].title,
        stageDesc: SELECTED_PROJECTS[0].subtitle,
        activeProject: SELECTED_PROJECTS[0],
        isOverview: false,
        isClosing: false,
      };
    } else if (progress < 0.69) {
      return {
        stageTitle: SELECTED_PROJECTS[1].title,
        stageDesc: SELECTED_PROJECTS[1].subtitle,
        activeProject: SELECTED_PROJECTS[1],
        isOverview: false,
        isClosing: false,
      };
    } else if (progress < 0.74) {
      return {
        stageTitle: SELECTED_PROJECTS[2].title,
        stageDesc: SELECTED_PROJECTS[2].subtitle,
        activeProject: SELECTED_PROJECTS[2],
        isOverview: false,
        isClosing: false,
      };
    } else if (progress < 0.79) {
      return {
        stageTitle: SELECTED_PROJECTS[3].title,
        stageDesc: SELECTED_PROJECTS[3].subtitle,
        activeProject: SELECTED_PROJECTS[3],
        isOverview: false,
        isClosing: false,
      };
    } else if (progress < 0.84) {
      return {
        stageTitle: SELECTED_PROJECTS[4].title,
        stageDesc: SELECTED_PROJECTS[4].subtitle,
        activeProject: SELECTED_PROJECTS[4],
        isOverview: false,
        isClosing: false,
      };
    } else if (progress < 0.875) {
      return {
        stageTitle: SELECTED_PROJECTS[5].title,
        stageDesc: SELECTED_PROJECTS[5].subtitle,
        activeProject: SELECTED_PROJECTS[5],
        isOverview: false,
        isClosing: false,
      };
    } else {
      return {
        stageTitle: 'Project Archive',
        stageDesc: 'Moving to Connection Lounge',
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

  // Clean editorial navigation without chapter numbers
  const chapters = [
    { label: 'ENTRANCE', index: 0 as const },
    { label: 'ABOUT', index: 1 as const },
    { label: 'EXPERTISE', index: 2 as const },
    { label: 'PROJECTS', index: 3 as const },
    { label: 'CONTACT', index: 4 as const },
  ];

  // Chapter display conditions and non-overlapping opacity curves
  const isCh0 = progress <= 0.18;
  const isCh1 = progress > 0.16 && progress <= 0.38;
  const isCh2 = progress > 0.36 && progress <= 0.56;
  const isCh3 = progress > 0.54 && progress <= 0.915;
  const isCh4 = progress > 0.935;

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
      : Math.max(0, 1 - (progress - 0.875) / 0.03);
  const op4 = progress < 0.94 ? 0 : Math.min(1, (progress - 0.94) / 0.04);

  return (
    <div className="fixed inset-0 w-full h-full z-20 pointer-events-none select-none overflow-hidden font-sans">
      {/* ========================================================
          GLOBAL NAVBAR: REFINED EDITORIAL NAVIGATION
          Clean editorial labels (no numbers), subtle active underline,
          no box cards or pill buttons.
         ======================================================== */}
      <header className="fixed top-0 left-0 w-full px-6 sm:px-12 lg:px-16 py-6 sm:py-8 pointer-events-auto flex items-center justify-between z-50">
        {/* Left: Wordmark + Descriptor */}
        <button
          onClick={() => flyToChapter(0)}
          className="group text-left flex items-baseline gap-3 focus:outline-none"
        >
          <span className="font-display font-bold text-base sm:text-lg tracking-[0.12em] text-[#F1ECE3] uppercase group-hover:text-[#C47B60] transition-colors">
            MELLINO
          </span>
          <span className="hidden sm:inline font-sans text-xs text-[#B0A596] tracking-wider uppercase font-medium">
            / Fullstack Developer
          </span>
        </button>

        {/* Center: Editorial Chapter Navigation */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-xs tracking-wider font-medium">
          {chapters.map((ch) => {
            const isActive = activeChapter === ch.index;
            return (
              <button
                key={ch.index}
                onClick={() => flyToChapter(ch.index)}
                className="group relative py-1 focus:outline-none"
              >
                <span
                  className={`transition-all duration-200 block ${
                    isActive
                      ? 'text-[#C47B60] font-semibold'
                      : 'text-[#B0A596] hover:text-[#F1ECE3]'
                  }`}
                >
                  {ch.label}
                </span>
                {/* Subtle active underline marker */}
                <span
                  className={`absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-[#C47B60] transition-all duration-300 origin-left ${
                    isActive
                      ? 'opacity-100 scale-x-100'
                      : 'opacity-0 scale-x-0 group-hover:opacity-40 group-hover:scale-x-100'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Right: Geographic Status & Inquire Action */}
        <div className="flex items-center gap-5 sm:gap-7 text-xs">
          <div className="hidden lg:flex items-center gap-2 text-[#B0A596]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C47B60]" />
            <span>MALANG, ID</span>
            <span className="text-[#F1ECE3]/20">/</span>
            <span className="text-[#D1C8BB]">{timeStr}</span>
          </div>

          <button
            onClick={() => flyToChapter(4)}
            className="group relative flex items-center gap-1.5 font-sans font-medium text-xs text-[#F1ECE3] hover:text-[#C47B60] uppercase tracking-wider transition-colors"
          >
            <span>INQUIRE</span>
            <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
            <span className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-current opacity-30 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </header>

      {/* Global Scroll Journey Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-[1.5px] bg-[#F1ECE3]/10 z-50">
        <div
          className="h-full bg-[#C47B60] transition-all duration-75 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* ========================================================
          CHAPTER 01: ENTRANCE
          Clean Manrope display headline, restrained typography,
          free from arbitrary numbering or artificial tags.
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
          {/* Eyebrow */}
          <div className="flex items-center gap-3 text-xs text-[#C47B60] font-semibold tracking-wider uppercase">
            <span>Creative Technologist &bull; Fullstack Developer</span>
          </div>

          {/* Hero Presentation */}
          <div className="my-auto max-w-2xl space-y-6">
            <h1 className="font-display font-bold text-6xl sm:text-8xl lg:text-[108px] leading-[0.9] tracking-tight text-[#F1ECE3]">
              Mellino
            </h1>

            <div className="space-y-4">
              <p className="text-2xl sm:text-3xl lg:text-[36px] font-display font-semibold text-[#F1ECE3] leading-snug tracking-tight">
                Building digital experiences with intention.
              </p>
              <p className="text-sm sm:text-base text-[#D1C8BB] font-sans leading-relaxed max-w-xl">
                Fullstack developer exploring the intersection of modern software systems, tactile 3D environments, and intentional digital craft.
              </p>
            </div>
          </div>

          {/* Bottom Navigation Cue */}
          <div className="flex items-center justify-between border-t border-[#F1ECE3]/15 pt-6 text-xs text-[#B0A596]">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[#C47B60]" />
              <span className="tracking-wider uppercase text-[11px]">Scroll to journey through gallery</span>
            </div>
            <button
              onClick={() => flyToChapter(1)}
              className="group flex items-center gap-2 text-[#F1ECE3] hover:text-[#C47B60] transition-colors uppercase tracking-wider text-xs font-medium"
            >
              <span>Explore About</span>
              <span className="text-sm transition-transform duration-200 group-hover:translate-y-0.5">
                ↓
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          CHAPTER 02: ABOUT
          Bold Manrope headline, balanced editorial biography,
          guaranteed contrast against 3D objects with subtle local gradient.
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
          <div className="flex items-center gap-3 text-xs text-[#C47B60] font-semibold tracking-wider uppercase">
            <span>Background &bull; Philosophy</span>
          </div>

          {/* Left-dominant editorial biography with restrained backdrop protection */}
          <div className="my-auto max-w-xl space-y-6 bg-gradient-to-r from-[#141311]/90 via-[#141311]/70 to-transparent p-6 sm:p-8 -ml-6 sm:-ml-8 rounded-sm backdrop-blur-[2px]">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-display font-bold text-[#F1ECE3] leading-[1.12] tracking-tight">
              From physical structures to software systems.
            </h2>

            <div className="space-y-4 text-[#D1C8BB] text-sm sm:text-base leading-relaxed font-sans">
              <p>
                I&apos;m Mellino, a Fullstack Developer who views software architecture through the lens of structural engineering—combining structural integrity with human usability.
              </p>
              <p>
                With a background in <span className="text-[#F1ECE3] font-medium">Pendidikan Teknik Bangunan</span>, my approach to code mirrors building design: load-bearing foundations, clean contracts, and expressive spatial experiences.
              </p>
            </div>

            {/* Clean Editorial Metadata (No arbitrary [01], [02] numbers) */}
            <div className="pt-4 border-t border-[#F1ECE3]/15 space-y-3 font-sans text-xs sm:text-sm">
              {[
                { label: 'Discipline', val: 'Fullstack Engineering & Creative Technology' },
                { label: 'Foundation', val: 'Pendidikan Teknik Bangunan (Structural Systems)' },
                { label: 'Methodology', val: 'Rigor, Spatial Craft & Human Empathy' },
                { label: 'Location', val: 'Malang, East Java, Indonesia' },
              ].map((row) => (
                <div key={row.label} className="flex items-baseline justify-between py-1.5 border-b border-[#F1ECE3]/10 gap-4">
                  <span className="text-[#B0A596] font-medium text-xs shrink-0">{row.label}</span>
                  <span className="text-[#F1ECE3] font-medium text-right truncate">
                    {row.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#F1ECE3]/15 pt-6 text-xs text-[#B0A596]">
            <span>Malang, East Java, Indonesia</span>
            <button
              onClick={() => flyToChapter(2)}
              className="group flex items-center gap-2 text-[#F1ECE3] hover:text-[#C47B60] transition-colors uppercase tracking-wider text-xs font-medium"
            >
              <span>Proceed to Expertise</span>
              <span className="text-sm transition-transform duration-200 group-hover:translate-y-0.5">
                ↓
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          CHAPTER 03: EXPERTISE
          Natural presentation of technical capabilities.
          Zero artificial numbers, no "4 CORE DISCIPLINES" badge.
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
          <div className="flex items-center justify-between border-b border-[#F1ECE3]/15 pb-3 text-xs">
            <span className="text-[#C47B60] font-semibold tracking-wider uppercase">
              Engineering Architecture
            </span>
            <span className="text-[#B0A596] tracking-wider hidden sm:inline">
              Interface to Infrastructure
            </span>
          </div>

          {/* Right-aligned Technical Specification */}
          <div className="my-auto flex justify-end">
            <div className="w-full max-w-xl space-y-6 bg-gradient-to-l from-[#141311]/90 via-[#141311]/70 to-transparent p-6 sm:p-8 -mr-6 sm:-mr-8 rounded-sm backdrop-blur-[2px]">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-display font-bold text-[#F1ECE3] tracking-tight">
                  Expertise
                </h2>
                <p className="text-sm sm:text-base text-[#D1C8BB] font-sans mt-1">
                  Disciplined engineering from interface to infrastructure.
                </p>
              </div>

              {/* Clean Discipline Switcher */}
              <div className="flex flex-wrap items-center gap-5 sm:gap-7 border-b border-[#F1ECE3]/15 pb-2 text-xs font-medium">
                {[
                  { id: 'frontend-architecture', label: 'Frontend' },
                  { id: 'fullstack-systems', label: 'Backend' },
                  { id: 'system-integration', label: 'System Integration' },
                  { id: 'tools-workflow', label: 'Tools & Workflow' },
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
                            ? 'text-[#C47B60] font-semibold'
                            : 'text-[#B0A596] hover:text-[#F1ECE3]'
                        }`}
                      >
                        {item.label}
                      </span>
                      <span
                        className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C47B60] transition-all duration-300 origin-left ${
                          isSelected ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-40'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Active Discipline Spec */}
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#F1ECE3]">
                  {selectedCapability.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#D1C8BB] font-sans leading-relaxed">
                  {selectedCapability.description}
                </p>

                {/* Technologies List */}
                <div className="pt-2 border-t border-[#F1ECE3]/10 space-y-1">
                  <span className="text-xs text-[#C47B60] font-semibold tracking-wider uppercase block">
                    Core Technologies
                  </span>
                  <div className="text-xs sm:text-sm text-[#F1ECE3] font-medium leading-relaxed">
                    {selectedCapability.technologies.join('  ·  ')}
                  </div>
                </div>

                {/* Verified Deliverables */}
                <div className="pt-2 border-t border-[#F1ECE3]/10 space-y-2">
                  <span className="text-xs text-[#C47B60] font-semibold tracking-wider uppercase block">
                    Key Deliverables
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-[#D1C8BB]">
                    {selectedCapability.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-baseline gap-2">
                        <span className="text-[#C47B60] font-bold">—</span>
                        <span className="truncate">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Architectural Focus */}
                <div className="pt-2 border-t border-[#F1ECE3]/10 flex items-baseline gap-2 text-xs">
                  <span className="text-[#B0A596] font-medium shrink-0">
                    Focus:
                  </span>
                  <span className="text-[#D1C8BB] font-sans text-xs sm:text-sm">
                    {selectedCapability.architecturalFocus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#F1ECE3]/15 pt-6 text-xs text-[#B0A596]">
            <span>Sub-second latency &bull; 60 FPS WebGL</span>
            <button
              onClick={() => flyToChapter(3)}
              className="group flex items-center gap-2 text-[#F1ECE3] hover:text-[#C47B60] transition-colors uppercase tracking-wider text-xs font-medium"
            >
              <span>Proceed to Projects</span>
              <span className="text-sm transition-transform duration-200 group-hover:translate-y-0.5">
                ↓
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          CHAPTER 04: PROJECTS (PROJECT ARCHIVE)
          Clean monograph callout and exhibition catalogue strip.
          No artificial STAGE badges or redundant numbering.
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
              <div className="text-xs text-[#C47B60] font-semibold tracking-wider uppercase">
                Exhibition Gallery
              </div>
              <h2 className="mt-1 text-2xl sm:text-4xl font-display font-bold text-[#F1ECE3] tracking-tight">
                {ch4Info.isOverview ? 'Selected Commissions' : ch4Info.stageTitle}
              </h2>
            </div>
            <div className="text-xs text-[#B0A596] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C47B60]" />
              <span className="tracking-wider uppercase text-[11px]">{ch4Info.stageDesc}</span>
            </div>
          </div>

          {/* Floating Editorial Monograph Callout Plate (Top Right) */}
          <div className="min-h-24 flex items-center justify-end pointer-events-none mt-2">
            {ch4Info.isOverview && (
              <div className="max-w-md p-5 bg-[#181714]/85 backdrop-blur-md border border-[#F1ECE3]/15 shadow-xl space-y-1.5">
                <div className="font-display font-bold text-[#F1ECE3] text-base">
                  The Continuous Exhibition Amphitheater
                </div>
                <p className="text-xs text-[#D1C8BB] leading-relaxed font-sans">
                  All six installations are physically present along the curved gallery. Scroll forward to begin the continuous tour.
                </p>
              </div>
            )}

            {ch4Info.activeProject && (
              <div
                onClick={() => onSelectProject(ch4Info.activeProject!)}
                className="pointer-events-auto cursor-pointer max-w-lg p-5 sm:p-6 bg-[#181714]/90 backdrop-blur-md border border-[#C47B60]/50 shadow-2xl transition-all hover:border-[#C47B60] group space-y-3"
              >
                <div className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-[#C47B60] font-medium">
                    <span className="uppercase tracking-wide">{ch4Info.activeProject.category}</span>
                  </div>
                  <span className="text-[#B0A596]">{ch4Info.activeProject.year}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-bold text-[#F1ECE3] text-lg sm:text-xl group-hover:text-[#C47B60] transition-colors">
                    {ch4Info.activeProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D1C8BB] line-clamp-2 leading-relaxed font-sans">
                    {ch4Info.activeProject.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F1ECE3]/10 flex items-center justify-between gap-3 text-xs">
                  <div className="text-xs text-[#B0A596] truncate">
                    {ch4Info.activeProject.techStack.join('  ·  ')}
                  </div>
                  <div className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-[#C47B60] group-hover:translate-x-1 transition-transform">
                    <span>View Case Study</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            )}

            {ch4Info.isClosing && (
              <div className="max-w-md p-5 bg-[#181714]/85 backdrop-blur-md border border-[#C47B60] shadow-xl space-y-1.5">
                <div className="font-display font-bold text-[#F1ECE3] text-base">
                  Leaving The Project Archive
                </div>
                <p className="text-xs text-[#D1C8BB] leading-relaxed font-sans">
                  Proceeding forward through the portal into the Connection Lounge.
                </p>
              </div>
            )}
          </div>

          {/* Center viewport remains 100% OPEN for the 3D installations */}
          <div className="my-auto pointer-events-none" />

          {/* Bottom Exhibition Index */}
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
                      className={`absolute top-0 left-0 w-full h-[2px] bg-[#C47B60] transition-all duration-200 ${
                        isCurrentActive || isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    />

                    <div className="mb-1">
                      <span className="font-sans text-[11px] text-[#B0A596] group-hover:text-[#F1ECE3] transition-colors uppercase tracking-wider block truncate">
                        {proj.category.split('/')[0]}
                      </span>
                    </div>

                    <div className="font-display font-semibold text-xs sm:text-sm text-[#F1ECE3] truncate">
                      {proj.title.split('—')[0]}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-[#F1ECE3]/15 pt-4 text-xs text-[#B0A596]">
              <span>Six verified case studies &bull; Desktop web experiences</span>
              <button
                onClick={() => flyToChapter(4)}
                className="group flex items-center gap-2 text-[#F1ECE3] hover:text-[#C47B60] transition-colors uppercase pointer-events-auto text-xs font-medium tracking-wide"
              >
                <span>Proceed to Contact</span>
                <span className="text-sm transition-transform duration-200 group-hover:translate-y-0.5">
                  ↓
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          CHAPTER 05: CONTACT (CONNECTION LOUNGE)
          Clean architectural directory, direct channels,
          no decorative badges or numbered section counters.
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
            <span className="text-xs text-[#C47B60] font-semibold tracking-wider uppercase">
              Get In Touch
            </span>

            <div className="hidden sm:flex items-center gap-2 text-xs text-[#22C55E]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              <span className="tracking-wide uppercase text-[11px] font-medium">
                Available for select commissions
              </span>
            </div>
          </div>

          {/* Two-Column Editorial Layout */}
          <div className="my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start pointer-events-auto">
            
            {/* LEFT COLUMN: Narrative & Primary CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-[#F1ECE3] leading-[1.08]">
                  Have an idea? Let&apos;s build something meaningful.
                </h2>
                <p className="text-sm sm:text-base text-[#D1C8BB] leading-relaxed max-w-xl font-sans">
                  I&apos;m always open to discussing new projects, creative collaborations, and opportunities to build thoughtful digital experiences.
                </p>
              </div>

              {/* Clean Editorial Metadata Table */}
              <div className="border-y border-[#F1ECE3]/15 divide-y divide-[#F1ECE3]/10 text-xs sm:text-sm">
                {[
                  { label: 'Creator', val: 'Mellino' },
                  { label: 'Role', val: 'Fullstack Developer & Creative Technologist' },
                  { label: 'Origin', val: 'Indonesia (UTC+7 / WIB)' },
                  { label: 'Availability', val: 'Open for Select Commissions' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-baseline justify-between py-2.5">
                    <span className="text-[#B0A596] text-xs font-medium tracking-wide">
                      {item.label}
                    </span>
                    <span className="text-[#F1ECE3] text-right font-medium">
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Primary Call to Action */}
              <div className="pt-2 space-y-3">
                <div className="pt-1">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="group inline-flex items-center gap-3 text-sm font-semibold text-[#F1ECE3] hover:text-[#C47B60] tracking-wide relative pb-1 focus:outline-none transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#C47B60]" />
                    <span>START A CONVERSATION</span>
                    <span className="text-sm transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C47B60] transition-all origin-left" />
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Direct Communication Channels */}
            <div className="lg:col-span-5 border-t lg:border-t-0 border-[#F1ECE3]/15 divide-y divide-[#F1ECE3]/15">
              
              {/* Channel: LinkedIn */}
              <div className="py-5 space-y-1.5 group">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#B0A596] font-medium tracking-wide">
                    Professional Network
                  </span>
                  <LinkedinIcon className="w-4 h-4 text-[#B0A596] group-hover:text-[#C47B60] transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-lg text-[#F1ECE3]">LinkedIn</h3>
                <p className="text-xs text-[#D1C8BB] leading-relaxed">
                  Professional monograph, career journey, and direct industry network.
                </p>
                <div className="pt-1">
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F1ECE3] hover:text-[#C47B60] uppercase tracking-wider transition-colors"
                  >
                    <span>Connect on LinkedIn</span>
                    <span className="text-xs">↗</span>
                  </a>
                </div>
              </div>

              {/* Channel: GitHub */}
              <div className="py-5 space-y-1.5 group">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#B0A596] font-medium tracking-wide">
                    Source Code &amp; Craft
                  </span>
                  <GithubIcon className="w-4 h-4 text-[#B0A596] group-hover:text-[#C47B60] transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-lg text-[#F1ECE3]">GitHub</h3>
                <p className="text-xs text-[#D1C8BB] leading-relaxed">
                  Production repositories, architecture experiments, and commit logs.
                </p>
                <div className="pt-1">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F1ECE3] hover:text-[#C47B60] uppercase tracking-wider transition-colors"
                  >
                    <span>Explore GitHub</span>
                    <span className="text-xs">↗</span>
                  </a>
                </div>
              </div>

              {/* Channel: Direct Email */}
              <div className="py-5 space-y-1.5 group">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#B0A596] font-medium tracking-wide">
                    Direct Transmission
                  </span>
                  <Mail className="w-4 h-4 text-[#B0A596] group-hover:text-[#C47B60] transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-lg text-[#F1ECE3]">Direct Correspondence</h3>
                <div className="text-xs text-[#D1C8BB] py-1 select-all break-all font-mono">
                  {PERSONAL_INFO.email}
                </div>
                <div className="flex items-center gap-4 pt-1">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="inline-flex items-center gap-1 text-xs uppercase font-semibold text-[#F1ECE3] hover:text-[#C47B60] transition-colors"
                  >
                    <span>Send Mail</span>
                    <span className="text-xs">↗</span>
                  </a>
                  <span className="text-[#F1ECE3]/20">/</span>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 text-xs uppercase text-[#D1C8BB] hover:text-[#F1ECE3] transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                        <span className="text-[#22C55E] font-medium">Copied</span>
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

          {/* Signature Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#F1ECE3]/15 pt-5 gap-4 text-xs text-[#B0A596] pointer-events-auto">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-center sm:text-left">
              <span className="font-semibold text-[#F1ECE3] tracking-wider">MELLINO</span>
              <span className="text-[#F1ECE3]/30">•</span>
              <span className="tracking-wide">FULLSTACK DEVELOPER</span>
              <span className="text-[#F1ECE3]/30 hidden md:inline">•</span>
              <span className="text-[#D1C8BB] hidden md:inline">Designed and developed with intention.</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden lg:flex items-center gap-2 text-[#B0A596] text-[11px]">
                <span>MALANG, INDONESIA</span>
                <span>({timeStr})</span>
              </div>

              <div className="text-[#B0A596]">
                © {CURRENT_YEAR} MELLINO
              </div>

              <button
                onClick={() => flyToChapter(0)}
                className="group flex items-center gap-1.5 text-[#F1ECE3] hover:text-[#C47B60] transition-colors uppercase font-medium text-xs pointer-events-auto"
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