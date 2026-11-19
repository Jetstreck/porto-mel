import React, { useState } from 'react';
import { SELECTED_PROJECTS } from '../../data/portfolioData';
import type { Project } from '../../types';
import { ProjectArtwork } from '../projects/ProjectArtwork';
import { ProjectDetailModal } from '../projects/ProjectDetailModal';
import { ArrowUpRight, Compass } from 'lucide-react';

export const CuratedWorkSection: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project>(SELECTED_PROJECTS[0]);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  return (
    <section id="work" className="relative w-full bg-[#181714] text-[#F1ECE3] py-28 sm:py-40 select-none overflow-hidden">
      {/* Dynamic ambient backdrop responsive to active project accent */}
      <div
        className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: activeProject.accentColor }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#F1ECE3]/15 pb-8 mb-16 sm:mb-24">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#A65338] font-bold">
              [CURATED EXHIBITION // 02]
            </div>
            <h2 className="mt-3 text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-[#F1ECE3]">
              Selected Works.
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base font-serif italic text-[#E1D8CA]/80">
            Six deliberate digital systems spanning high-concurrency fintech, editorial gallery archives, and healthcare platforms.
          </p>
        </div>

        {/* ========================================================
            PART 1: INTERACTIVE CINEMATIC PROJECT DIRECTORY
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-32">
          {/* Left: Interactive Project List (7 cols) */}
          <div className="lg:col-span-7 space-y-1">
            {SELECTED_PROJECTS.map((proj) => {
              const isActive = activeProject.id === proj.id;
              return (
                <div
                  key={proj.id}
                  onMouseEnter={() => setActiveProject(proj)}
                  onClick={() => setSelectedCaseStudy(proj)}
                  className={`group cursor-pointer py-6 sm:py-7 border-b transition-all duration-300 flex items-center justify-between ${
                    isActive
                      ? 'border-[#A65338] pl-4 sm:pl-6 bg-[#211F1B]/60'
                      : 'border-[#F1ECE3]/10 hover:border-[#F1ECE3]/40'
                  }`}
                >
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span
                      className={`font-mono text-xs font-bold transition-colors ${
                        isActive ? 'text-[#A65338]' : 'text-[#F1ECE3]/40'
                      }`}
                    >
                      [{proj.number}]
                    </span>
                    <div>
                      <h3
                        className={`text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight transition-colors ${
                          isActive
                            ? 'text-white'
                            : 'text-[#F1ECE3]/60 group-hover:text-[#F1ECE3]'
                        }`}
                      >
                        {proj.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-3 font-mono text-xs text-[#E1D8CA]/50">
                        <span>{proj.category}</span>
                        <span>/</span>
                        <span>{proj.year}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline font-mono text-xs text-[#A65338] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                      Inspect
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                        isActive
                          ? 'border-[#A65338] bg-[#A65338] text-white'
                          : 'border-[#F1ECE3]/20 group-hover:border-[#F1ECE3]'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Dynamic Cinematic Projection Canvas (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <div className="border border-[#F1ECE3]/20 shadow-2xl bg-[#141311] overflow-hidden group">
              {/* Projection Frame Header */}
              <div className="px-4 py-2.5 bg-[#1F1E1B] border-b border-[#F1ECE3]/15 flex items-center justify-between font-mono text-[11px] text-[#F1ECE3]/60">
                <span className="flex items-center gap-2">
                  <Compass className="w-3 h-3 text-[#A65338]" />
                  <span>PREVIEW // {activeProject.number}</span>
                </span>
                <span className="text-[#A65338] font-bold">[ACTIVE VIEWPORT]</span>
              </div>

              {/* Live Artwork Component */}
              <div className="h-[280px] sm:h-[340px] overflow-hidden">
                <ProjectArtwork project={activeProject} isHovered={true} />
              </div>

              {/* Projection Footer & Trigger */}
              <div className="p-4 bg-[#1B1916] border-t border-[#F1ECE3]/15 flex items-center justify-between">
                <div>
                  <div className="text-xs font-display font-bold text-white">
                    {activeProject.title}
                  </div>
                  <div className="text-[10px] font-mono text-[#E1D8CA]/60">
                    {activeProject.role}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCaseStudy(activeProject)}
                  className="px-3.5 py-1.5 bg-[#A65338] hover:bg-[#8e452e] text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors"
                >
                  Full Case Study
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            PART 2: ART-DIRECTED CINEMATIC SHOWCASES (3 Major Spreads)
           ======================================================== */}
        <div className="space-y-36 sm:space-y-48">
          {/* SHOWCASE 1: KBR E-SPORT (21:9 Ultra-wide Monolith) */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t-2 border-[#A65338] pt-6">
              <div>
                <span className="font-mono text-xs text-[#A65338] font-bold uppercase tracking-widest">
                  CINEMATIC EXHIBITION 01
                </span>
                <h3 className="text-3xl sm:text-5xl font-display font-bold text-white mt-1">
                  KBR E-Sport Platform
                </h3>
              </div>
              <button
                onClick={() => setSelectedCaseStudy(SELECTED_PROJECTS[0])}
                className="px-5 py-2.5 bg-[#F1ECE3] text-[#141311] hover:bg-[#A65338] hover:text-white font-mono text-xs uppercase font-bold transition-all flex items-center gap-2 self-start sm:self-auto"
              >
                <span>Read Full Monograph</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div
              onClick={() => setSelectedCaseStudy(SELECTED_PROJECTS[0])}
              className="cursor-pointer border border-[#F1ECE3]/20 shadow-2xl overflow-hidden hover:border-[#A65338] transition-colors"
            >
              <ProjectArtwork project={SELECTED_PROJECTS[0]} isHovered={true} />
            </div>
          </div>

          {/* SHOWCASE 2: MENAWI ART STUDIO (Editorial Split Spread) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs text-[#755644] font-bold uppercase tracking-widest">
                CINEMATIC EXHIBITION 02
              </span>
              <h3 className="text-3xl sm:text-5xl font-display font-bold text-white">
                Menawi Art Studio
              </h3>
              <p className="text-lg font-serif italic text-[#E1D8CA]/90 leading-relaxed">
                &ldquo;A digital gallery space celebrating slow contemplation, unbleached paper materiality, and archival accession.&rdquo;
              </p>
              <p className="text-sm text-[#F1ECE3]/70 leading-relaxed">
                {SELECTED_PROJECTS[1].description}
              </p>

              <button
                onClick={() => setSelectedCaseStudy(SELECTED_PROJECTS[1])}
                className="px-5 py-2.5 border border-[#F1ECE3]/30 hover:border-[#A65338] hover:text-[#A65338] font-mono text-xs uppercase font-bold transition-colors flex items-center gap-2"
              >
                <span>Curatorial Dossier</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div
              onClick={() => setSelectedCaseStudy(SELECTED_PROJECTS[1])}
              className="lg:col-span-7 cursor-pointer border border-[#F1ECE3]/20 shadow-2xl overflow-hidden hover:border-[#A65338] transition-colors"
            >
              <ProjectArtwork project={SELECTED_PROJECTS[1]} isHovered={true} />
            </div>
          </div>

          {/* SHOWCASE 3: NOTA KITA (Technical Blueprint Spread) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div
              onClick={() => setSelectedCaseStudy(SELECTED_PROJECTS[2])}
              className="lg:col-span-7 cursor-pointer border border-[#F1ECE3]/20 shadow-2xl overflow-hidden hover:border-[#A65338] transition-colors order-2 lg:order-1"
            >
              <ProjectArtwork project={SELECTED_PROJECTS[2]} isHovered={true} />
            </div>

            <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
              <span className="font-mono text-xs text-[#74705E] font-bold uppercase tracking-widest">
                CINEMATIC EXHIBITION 03
              </span>
              <h3 className="text-3xl sm:text-5xl font-display font-bold text-white">
                Nota Kita Ledger Engine
              </h3>
              <p className="text-lg font-serif italic text-[#E1D8CA]/90 leading-relaxed">
                &ldquo;Financial architecture engineered in Go with sub-12ms API latency and ACID compliance.&rdquo;
              </p>
              <p className="text-sm text-[#F1ECE3]/70 leading-relaxed">
                {SELECTED_PROJECTS[2].description}
              </p>

              <button
                onClick={() => setSelectedCaseStudy(SELECTED_PROJECTS[2])}
                className="px-5 py-2.5 border border-[#F1ECE3]/30 hover:border-[#A65338] hover:text-[#A65338] font-mono text-xs uppercase font-bold transition-colors flex items-center gap-2"
              >
                <span>Technical Specifications</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Monograph Modal */}
      <ProjectDetailModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </section>
  );
};

