import React, { useState, useEffect, useMemo } from 'react';
import { PERSONAL_INFO, SELECTED_PROJECTS, CAPABILITIES } from '../../data/portfolioData';
import type { Project, Capability } from '../../types';
import { ArrowDown, Copy, Check, Mail, Compass, ArrowUp, CheckCircle2, ExternalLink } from 'lucide-react';

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
        stageBadge: '[MANUAL INSPECTION]',
        stageTitle: proj ? proj.title : 'Project Monograph',
        stageDesc: proj ? proj.subtitle : 'Direct 3D Workstation Inspection',
        activeProject: proj,
        isOverview: false,
        isClosing: false,
      };
    }

    if (progress < 0.59) {
      return {
        stageBadge: '[STAGE 01 // ARRIVAL: PROJECT ARCHIVE]',
        stageTitle: 'Establishing Overview: Six Commissions',
        stageDesc: 'All six installations visible along the curved amphitheater plinths.',
        activeProject: null,
        isOverview: true,
        isClosing: false,
      };
    } else if (progress < 0.64) {
      return {
        stageBadge: '[STAGE 02 // EXHIBITION 01/06]',
        stageTitle: SELECTED_PROJECTS[0].title,
        stageDesc: SELECTED_PROJECTS[0].subtitle,
        activeProject: SELECTED_PROJECTS[0],
        isOverview: false,
        isClosing: false,
      };
    } else if (progress < 0.69) {
      return {
        stageBadge: '[STAGE 02 // EXHIBITION 02/06]',
        stageTitle: SELECTED_PROJECTS[1].title,
        stageDesc: SELECTED_PROJECTS[1].subtitle,
        activeProject: SELECTED_PROJECTS[1],
        isOverview: false,
        isClosing: false,
      };
    } else if (progress < 0.74) {
      return {
        stageBadge: '[STAGE 03 // EXHIBITION 03/06]',
        stageTitle: SELECTED_PROJECTS[2].title,
        stageDesc: SELECTED_PROJECTS[2].subtitle,
        activeProject: SELECTED_PROJECTS[2],
        isOverview: false,
        isClosing: false,
      };
    } else if (progress < 0.79) {
      return {
        stageBadge: '[STAGE 03 // EXHIBITION 04/06]',
        stageTitle: SELECTED_PROJECTS[3].title,
        stageDesc: SELECTED_PROJECTS[3].subtitle,
        activeProject: SELECTED_PROJECTS[3],
        isOverview: false,
        isClosing: false,
      };
    } else if (progress < 0.84) {
      return {
        stageBadge: '[STAGE 04 // EXHIBITION 05/06]',
        stageTitle: SELECTED_PROJECTS[4].title,
        stageDesc: SELECTED_PROJECTS[4].subtitle,
        activeProject: SELECTED_PROJECTS[4],
        isOverview: false,
        isClosing: false,
      };
    } else if (progress < 0.88) {
      return {
        stageBadge: '[STAGE 04 // EXHIBITION 06/06]',
        stageTitle: SELECTED_PROJECTS[5].title,
        stageDesc: SELECTED_PROJECTS[5].subtitle,
        activeProject: SELECTED_PROJECTS[5],
        isOverview: false,
        isClosing: false,
      };
    } else {
      return {
        stageBadge: '[STAGE 05 // ARCHIVE EXIT TRANSITION]',
        stageTitle: 'Leaving The Project Archive',
        stageDesc: 'Transitioning forward to Chapter 05 // Connection & Inquiries.',
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
  const isCh3 = progress > 0.54 && progress <= 0.91;
  const isCh4 = progress > 0.88;

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
      : progress <= 0.88
      ? 1
      : Math.max(0, 1 - (progress - 0.88) / 0.03);
  const op4 = progress < 0.88 ? 0 : Math.min(1, (progress - 0.88) / 0.05);

  return (
    <div className="fixed inset-0 w-full h-full z-20 pointer-events-none select-none overflow-hidden">
      {/* ========================================================
          STICKY TOP NAVIGATION BAR (Always accessible)
         ======================================================== */}
      <header className="fixed top-0 left-0 w-full p-6 sm:p-10 pointer-events-auto flex items-center justify-between z-50">
        {/* Brand identity */}
        <button
          onClick={() => flyToChapter(0)}
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

        {/* Spatial Destination Navigation Track */}
        <nav className="hidden md:flex items-center gap-1 bg-[#181714]/85 backdrop-blur-md px-3 py-1.5 border border-[#F1ECE3]/15">
          {chapters.map((ch) => {
            const isActive = activeChapter === ch.index;
            return (
              <button
                key={ch.index}
                onClick={() => flyToChapter(ch.index)}
                className={`px-3 py-1 font-mono text-[11px] tracking-wider uppercase transition-all ${
                  isActive
                    ? 'bg-[#A65338] text-white font-bold'
                    : 'text-[#F1ECE3]/60 hover:text-white'
                }`}
              >
                {ch.label}
              </button>
            );
          })}
        </nav>

        {/* Live Jakarta Time & Status */}
        <div className="flex items-center gap-4 font-mono text-xs">
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#F1ECE3]/60 uppercase text-[11px]">MALANG, ID</span>
            <span className="text-white font-bold">{timeStr || '19:30:00 WIB'}</span>
          </div>

          <button
            onClick={() => flyToChapter(4)}
            className="px-3.5 py-1.5 bg-[#A65338] hover:bg-[#8e452e] text-white font-display text-xs font-bold uppercase tracking-wider transition-colors"
          >
            CONTACT
          </button>
        </div>
      </header>

      {/* Global Scroll Journey Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-[#F1ECE3]/10 z-50">
        <div
          className="h-full bg-[#A65338] transition-all duration-75 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* ========================================================
          CHAPTER 0: ENTRANCE HUD OVERLAY (p = 0.00 - 0.18)
          Composition: Left-aligned, leaving right side open for 3D sculpture
         ======================================================== */}
      {isCh0 && (
        <div
          className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-between pt-36 pb-16 transition-opacity duration-300"
          style={{
            opacity: op0,
            pointerEvents: op0 > 0.3 ? 'auto' : 'none',
            transform: `translate3d(0, ${(1 - op0) * -20}px, 0)`,
          }}
        >
          <div className="font-mono text-xs text-[#A65338] font-bold tracking-widest uppercase">
            [CHAPTER 01 // THE ENTRANCE]
          </div>

          <div className="my-auto max-w-2xl space-y-4">
            <h1 className="font-display font-extrabold text-[15vw] sm:text-[14vw] lg:text-[12vw] leading-[0.8] tracking-tighter text-[#F1ECE3] uppercase">
              Mellino
            </h1>

            <div className="space-y-3 pt-2">
              <p className="text-2xl sm:text-4xl lg:text-5xl font-serif italic text-[#E1D8CA] leading-snug">
                &ldquo;Building digital experiences with intention.&rdquo;
              </p>
              <p className="text-sm sm:text-base text-[#F1ECE3]/70 font-sans leading-relaxed">
                Fullstack developer exploring the intersection of technology, design, and meaningful digital experiences. Scroll down to journey through the Digital Atelier.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#F1ECE3]/15 pt-6 font-mono text-xs text-[#F1ECE3]/60">
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#A65338]" />
              <span>SCROLL TO JOURNEY THROUGH 3D WORLD</span>
            </div>
            <button
              onClick={() => flyToChapter(1)}
              className="group flex items-center gap-2 text-white hover:text-[#A65338] transition-colors uppercase"
            >
              <span>Fly to About</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          CHAPTER 1: ABOUT / CREATOR HUD OVERLAY (p = 0.18 - 0.38)
          Composition: Statement occupies left ~55% with ample negative space;
          3D exhibition space sits safely on the right (x > 0) without clashing!
         ======================================================== */}
      {isCh1 && (
        <div
          className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-between pt-32 sm:pt-36 pb-16 transition-opacity duration-300"
          style={{
            opacity: op1,
            pointerEvents: op1 > 0.3 ? 'auto' : 'none',
            transform: `translate3d(0, ${(1 - op1) * 20}px, 0)`,
          }}
        >
          {/* Eyebrow */}
          <div className="font-mono text-xs text-[#A65338] font-bold tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A65338]" />
            <span>THE MAKER&apos;S EXHIBITION // ABOUT ME</span>
          </div>

          {/* Left-focused editorial layout */}
          <div className="my-auto max-w-xl space-y-6">
            <div className="space-y-2">
              <div className="font-mono text-xs tracking-widest text-[#E1D8CA]/60 uppercase">
                IDENTITY &amp; ESSENCE
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-serif italic text-white leading-[1.14] tracking-tight">
                Building ideas into meaningful digital experiences.
              </h2>
            </div>

            <div className="space-y-3.5 text-[#F1ECE3]/85 text-sm sm:text-base leading-relaxed font-sans">
              <p>
                I&apos;m Mellino, a Fullstack Developer who enjoys transforming ideas into functional, thoughtful, and engaging digital experiences.
              </p>
              <p>
                I work across frontend and backend development, combining technical thinking with an interest in design, usability, and creative problem-solving.
              </p>
              <p className="text-[#E1D8CA] font-medium">
                I believe great digital products are not only about how they work, but also about how people experience them.
              </p>
            </div>

            {/* Editorial Information Metadata (Clean aligned list, not generic cards) */}
            <div className="pt-3.5 border-t border-[#F1ECE3]/15 grid grid-cols-2 gap-x-8 gap-y-3 font-mono text-xs">
              <div className="space-y-0.5">
                <span className="text-[#A65338] text-[10px] tracking-widest uppercase font-bold block">
                  ROLE
                </span>
                <span className="text-white font-medium text-xs sm:text-sm">
                  Fullstack Developer
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[#A65338] text-[10px] tracking-widest uppercase font-bold block">
                  FOCUS
                </span>
                <span className="text-white font-medium text-xs sm:text-sm">
                  Web Development
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[#A65338] text-[10px] tracking-widest uppercase font-bold block">
                  BASED IN
                </span>
                <span className="text-white font-medium text-xs sm:text-sm">
                  Indonesia
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[#A65338] text-[10px] tracking-widest uppercase font-bold block">
                  BACKGROUND
                </span>
                <span className="text-white font-medium text-xs sm:text-sm">
                  Pendidikan Teknik Bangunan
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#F1ECE3]/15 pt-6 font-mono text-xs text-[#F1ECE3]/60">
            <span>MALANG, EAST JAVA // 07°58′S 112°37′E</span>
            <button
              onClick={() => flyToChapter(2)}
              className="group flex items-center gap-2 text-white hover:text-[#A65338] transition-colors uppercase"
            >
              <span>Proceed to Expertise</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          CHAPTER 2: EXPERTISE HUD OVERLAY (p = 0.38 - 0.58)
          Composition: Positioned on the RIGHT side of the screen;
          3D Engineering Lab sits safely on the left (x < 0) with zero overlap!
         ======================================================== */}
      {isCh2 && (
        <div
          className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-between pt-32 sm:pt-36 pb-16 transition-opacity duration-300"
          style={{
            opacity: op2,
            pointerEvents: op2 > 0.3 ? 'auto' : 'none',
            transform: `translate3d(0, ${(1 - op2) * 20}px, 0)`,
          }}
        >
          {/* Eyebrow and Section Header */}
          <div className="flex items-center justify-between border-b border-[#F1ECE3]/15 pb-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A65338]" />
              <span className="text-[#A65338] font-bold tracking-widest uppercase">
                [CHAPTER 03 // THE ENGINEERING LAB]
              </span>
            </div>
            <span className="text-[#E1D8CA]/60 tracking-wider hidden sm:inline">
              4 CORE DISCIPLINES &bull; INTERFACE TO INFRASTRUCTURE
            </span>
          </div>

          {/* Right-aligned content block leaving left side 100% open for 3D Engineering Lab */}
          <div className="my-auto flex justify-end">
            <div className="w-full max-w-xl bg-[#161513]/90 border border-[#F1ECE3]/15 p-6 sm:p-8 backdrop-blur-md space-y-5 shadow-2xl">
              <div>
                <span className="font-mono text-xs text-[#A65338] uppercase font-bold tracking-widest block">
                  TECHNICAL CRAFT &bull; ARCHITECTURE
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif italic text-white leading-tight mt-1">
                  EXPERTISE
                </h2>
                <p className="text-sm sm:text-base text-[#E1D8CA]/90 font-sans mt-2 leading-relaxed">
                  Engineering thoughtful digital experiences, from interface to infrastructure.
                </p>
              </div>

              {/* Discipline Switcher Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
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
                      className={`px-2.5 py-1.5 font-mono text-[10px] tracking-wider uppercase transition-all border text-center ${
                        isSelected
                          ? 'border-[#A65338] bg-[#A65338] text-white font-bold'
                          : 'border-[#F1ECE3]/15 bg-[#11100E]/70 text-[#F1ECE3]/60 hover:text-white hover:border-[#F1ECE3]/30'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              {/* Active Discipline Dossier */}
              <div className="space-y-3.5 pt-2 border-t border-[#F1ECE3]/10">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-display font-bold text-white block">
                      {selectedCapability.name}
                    </span>
                    <span className="text-xs text-[#E1D8CA]/70 font-sans italic">
                      {selectedCapability.tagline}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#A65338] font-bold px-2 py-0.5 border border-[#A65338]/30 bg-[#A65338]/10">
                    SPEC // {selectedCapability.number}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#F1ECE3]/80 font-sans leading-relaxed">
                  {selectedCapability.description}
                </p>

                {/* Relevant Technology Badges */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-[#A65338] uppercase font-bold tracking-wider block">
                    RELEVANT TECHNOLOGIES
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCapability.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-[#1F1E1B] border border-[#F1ECE3]/15 font-mono text-[10px] text-[#F1ECE3]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Architectural Focus Bar */}
                <div className="p-3 bg-[#11100E] border-l-2 border-[#A65338] text-xs font-mono text-[#F1ECE3]">
                  <span className="text-[#A65338] uppercase font-bold block text-[10px] mb-0.5">
                    ARCHITECTURAL FOCUS
                  </span>
                  {selectedCapability.architecturalFocus}
                </div>

                {/* Deliverables Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  {selectedCapability.deliverables.slice(0, 4).map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-[#E1D8CA]/90">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A65338] shrink-0" />
                      <span className="truncate">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#F1ECE3]/15 pt-6 font-mono text-xs text-[#F1ECE3]/60">
            <span>DISCIPLINED SYSTEMS &bull; SUB-SECOND LATENCY &bull; 60 FPS WEBGL</span>
            <button
              onClick={() => flyToChapter(3)}
              className="group flex items-center gap-2 text-white hover:text-[#A65338] transition-colors uppercase"
            >
              <span>Proceed to Projects</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          CHAPTER 3: PROJECTS EXHIBITION HUD (p = 0.58 - 0.84)
          Composition: The 6 3D project portals are completely visible in the center!
          NO GIANT 6-CARD GRID OVER THEM!
          Instead, a sleek top header and bottom interactive dock!
         ======================================================== */}
      {isCh3 && (
        <div
          className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-between pt-36 pb-16 transition-opacity duration-300"
          style={{
            opacity: op3,
            pointerEvents: op3 > 0.3 ? 'auto' : 'none',
            transform: `translate3d(0, ${(1 - op3) * 20}px, 0)`,
          }}
        >
          {/* Top Curatorial Bar */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#F1ECE3]/15 pb-4">
            <div>
              <div className="font-mono text-xs text-[#A65338] font-bold tracking-widest uppercase">
                [CHAPTER 04 // {ch4Info.stageBadge}]
              </div>
              <h2 className="mt-1 text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                {ch4Info.isOverview ? 'Selected Commissions.' : ch4Info.stageTitle}
              </h2>
            </div>
            <div className="font-mono text-xs text-[#E1D8CA]/70 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A65338] animate-ping" />
              <span>{ch4Info.stageDesc.toUpperCase()}</span>
            </div>
          </div>

          {/* Curatorial Dossier Callout Card (Floating Top-Right without covering center 3D) */}
          <div className="min-h-24 flex items-center justify-end pointer-events-none mt-2">
            {ch4Info.isOverview && (
              <div className="max-w-md bg-[#181714]/90 backdrop-blur-md border border-[#F1ECE3]/20 px-5 py-3.5 shadow-2xl animate-fadeIn">
                <div className="font-mono text-[10px] text-[#A65338] font-bold uppercase tracking-wider">
                  [STAGE 01 // ARRIVAL PANORAMA]
                </div>
                <div className="font-display font-bold text-white text-sm mt-0.5">
                  The Continuous Exhibition Amphitheater
                </div>
                <div className="font-mono text-xs text-[#E1D8CA]/70 mt-1 leading-relaxed">
                  All 6 installations are physically present. Scroll forward to begin the continuous 3D tour from 01 to 06.
                </div>
              </div>
            )}

            {ch4Info.activeProject && (
              <div
                onClick={() => onSelectProject(ch4Info.activeProject!)}
                className="pointer-events-auto cursor-pointer max-w-md bg-[#181714]/95 backdrop-blur-md border border-[#A65338] p-4 shadow-2xl transition-all hover:bg-[#1D1C19] animate-fadeIn"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-[#A65338]">
                    <span className="font-bold">[{ch4Info.activeProject.number} / 06]</span>
                    <span className="text-[#F1ECE3]/40">&bull;</span>
                    <span className="uppercase text-[#E1D8CA]/80">{ch4Info.activeProject.category}</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#F1ECE3]/50">{ch4Info.activeProject.year}</span>
                </div>
                <div className="font-display font-extrabold text-white text-base mt-1">
                  {ch4Info.activeProject.title}
                </div>
                <p className="text-xs text-[#E1D8CA]/80 mt-1 line-clamp-2 leading-relaxed">
                  {ch4Info.activeProject.description}
                </p>
                <div className="mt-2.5 pt-2 border-t border-[#F1ECE3]/10 flex items-center justify-between gap-2">
                  <div className="font-mono text-[10px] text-[#F1ECE3]/60 truncate">
                    {ch4Info.activeProject.techStack.join(' • ')}
                  </div>
                  <div className="shrink-0 flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#A65338] bg-[#A65338]/15 px-2.5 py-1 border border-[#A65338]/40 hover:bg-[#A65338] hover:text-white transition-colors">
                    <span>INSPECT CASE STUDY</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            )}

            {ch4Info.isClosing && (
              <div className="max-w-md bg-[#181714]/90 backdrop-blur-md border border-[#A65338] px-5 py-3.5 shadow-2xl animate-fadeIn">
                <div className="font-mono text-[10px] text-[#A65338] font-bold uppercase tracking-wider">
                  [STAGE 05 // ARCHIVE EXIT]
                </div>
                <div className="font-display font-bold text-white text-sm mt-0.5">
                  Leaving The Project Archive
                </div>
                <div className="font-mono text-xs text-[#E1D8CA]/70 mt-1 leading-relaxed">
                  Proceeding forward through the portal toward Chapter 05 // Connection & Inquiries.
                </div>
              </div>
            )}
          </div>

          {/* Center viewport is 100% OPEN for the 3D portals! */}
          <div className="my-auto pointer-events-none" />

          {/* Bottom Project Selector Dock */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pointer-events-auto">
              {SELECTED_PROJECTS.map((proj, idx) => {
                const isHovered = hoveredProjectId === proj.id;
                const isCurrentActive = ch4Info.activeProject?.id === proj.id;
                const TARGET_PROGRESS = [0.62, 0.67, 0.72, 0.77, 0.82, 0.86];

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
                    className={`p-3 bg-[#181714]/90 backdrop-blur-md border text-left transition-all ${
                      isCurrentActive || isHovered
                        ? 'border-[#A65338] bg-[#A65338]/25 -translate-y-1 text-white shadow-xl ring-1 ring-[#A65338]'
                        : 'border-[#F1ECE3]/15 text-[#F1ECE3]/70 hover:border-[#F1ECE3]/40 hover:text-white'
                    }`}
                  >
                    <div className="font-mono text-[10px] text-[#A65338] font-bold">
                      [{proj.number}]
                    </div>
                    <div className="font-display font-bold text-xs truncate mt-0.5">
                      {proj.title.split('—')[0]}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-[#F1ECE3]/15 pt-4 font-mono text-xs text-[#F1ECE3]/60">
              <span>06 VERIFIED PRODUCTION CASE STUDIES</span>
              <button
                onClick={() => flyToChapter(4)}
                className="group flex items-center gap-2 text-white hover:text-[#A65338] transition-colors uppercase pointer-events-auto"
              >
                <span>Proceed to Contact</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          CHAPTER 4: CONTACT / CONNECTION HUD (p = 0.84 - 1.00)
          Composition: Framed neatly between the grand gateway pylons
         ======================================================== */}
      {isCh4 && (
        <div
          className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-between pt-36 pb-16 transition-opacity duration-300"
          style={{
            opacity: op4,
            pointerEvents: op4 > 0.3 ? 'auto' : 'none',
            transform: `translate3d(0, ${(1 - op4) * 20}px, 0)`,
          }}
        >
          <div className="font-mono text-xs text-[#A65338] font-bold tracking-widest uppercase">
            [CHAPTER 05 // THE CONNECTION]
          </div>

          <div className="my-auto space-y-6 max-w-2xl">
            <div className="space-y-3">
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[0.95]">
                Let&apos;s build something meaningful.
              </h2>
              <p className="text-xl sm:text-2xl font-serif italic text-[#E1D8CA]">
                &ldquo;Available for select opportunities &amp; bespoke commissions.&rdquo;
              </p>
            </div>

            {/* Direct Copy Transmission Card */}
            <div className="p-6 bg-[#181714]/85 border border-[#F1ECE3]/15 backdrop-blur-md space-y-4">
              <span className="font-mono text-xs uppercase text-[#A65338] font-bold tracking-widest block">
                DIRECT TRANSMISSION ADDRESS
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
              <span className="text-[#F1ECE3]/20">/</span>
              <span className="text-[#F1ECE3]/50">MALANG, ID (07°58′S, 112°37′E)</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#F1ECE3]/15 pt-6 font-mono text-xs text-[#F1ECE3]/50">
            <div>
              MELLINO © {CURRENT_YEAR} — THE DIGITAL ATELIER.
            </div>
            <button
              onClick={() => flyToChapter(0)}
              className="flex items-center gap-2 text-white hover:text-[#A65338] transition-colors uppercase pointer-events-auto"
            >
              <span>Return to Entrance</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
