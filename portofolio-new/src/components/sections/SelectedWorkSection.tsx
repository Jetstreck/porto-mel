import React, { useState } from 'react';
import { SELECTED_PROJECTS } from '../../data/portfolioData';
import type { Project } from '../../types';
import { ProjectArtwork } from '../projects/ProjectArtwork';
import { ProjectDetailModal } from '../projects/ProjectDetailModal';
import { ArrowUpRight } from 'lucide-react';

export const SelectedWorkSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  return (
    <section
      id="work"
      className="py-24 sm:py-36 px-6 sm:px-10 max-w-7xl mx-auto border-t border-[#1D1C19]/15"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[#1D1C19]/15 pb-4 font-mono text-[11px] text-[#755644] mb-12 sm:mb-16">
        <div className="flex items-center gap-2">
          <span className="text-[#A65338] font-bold">[03 // SELECTED COMMISSIONS]</span>
          <span>CURATED WORK ARCHIVE</span>
        </div>
        <div className="font-mono text-xs text-[#755644]">
          06 CASE STUDIES // 2023–2024
        </div>
      </div>

      {/* Editorial Title */}
      <div className="max-w-3xl mb-16 sm:mb-24">
        <span className="font-mono text-xs uppercase tracking-widest text-[#A65338] font-bold">
          PORTFOLIO ARCHIVE
        </span>
        <h2 className="mt-2 text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-[#1D1C19] tracking-tight">
          Selected Works.
        </h2>
        <p className="mt-4 text-lg sm:text-xl font-serif italic text-[#755644]">
          Architectural systems, high-concurrency applications, and bespoke interactive platforms.
        </p>
      </div>

      {/* Distinct Bespoke Project Compositions */}
      <div className="space-y-24 sm:space-y-36">
        {/* ========================================================
            PROJECT 01: KBR E-SPORT (Full-width Monolithic Showcase)
           ======================================================== */}
        {(() => {
          const project = SELECTED_PROJECTS[0];
          const isHovered = hoveredProjectId === project.id;
          return (
            <article
              key={project.id}
              className="border-t-2 border-[#1D1C19] pt-8 group cursor-pointer"
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setHoveredProjectId(project.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
            >
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-3 font-mono text-xs text-[#A65338] uppercase tracking-widest font-bold">
                    <span>[{project.number} // 06]</span>
                    <span className="text-[#755644]">{project.category}</span>
                    <span className="text-[#1D1C19]/40">/</span>
                    <span className="text-[#755644]">{project.year}</span>
                  </div>
                  <h3 className="mt-2 text-3xl sm:text-5xl font-display font-bold text-[#1D1C19] group-hover:text-[#A65338] transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base font-serif italic text-[#755644]">
                    {project.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((t) => (
                      <span key={t} className="px-2.5 py-1 bg-[#E1D8CA] border border-[#1D1C19]/15 text-xs font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                  <button className="px-4 py-2 bg-[#1D1C19] text-[#F1ECE3] group-hover:bg-[#A65338] transition-colors font-mono text-xs uppercase flex items-center gap-1.5 shrink-0">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Viewport Frame */}
              <div className="border border-[#1D1C19]/25 shadow-lg overflow-hidden transition-all duration-500 group-hover:shadow-2xl">
                <ProjectArtwork project={project} isHovered={isHovered} />
              </div>
            </article>
          );
        })()}

        {/* ========================================================
            PROJECT 02: MENAWI ART STUDIO (Editorial Split Layout)
           ======================================================== */}
        {(() => {
          const project = SELECTED_PROJECTS[1];
          const isHovered = hoveredProjectId === project.id;
          return (
            <article
              key={project.id}
              className="border-t border-[#1D1C19]/20 pt-8 group cursor-pointer"
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setHoveredProjectId(project.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left: Text & Curatorial Notes (5 cols) */}
                <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
                  <div className="flex items-center gap-3 font-mono text-xs text-[#755644] uppercase tracking-widest font-bold">
                    <span className="text-[#A65338]">[{project.number} // 06]</span>
                    <span>{project.category}</span>
                  </div>

                  <h3 className="text-3xl sm:text-5xl font-display font-bold text-[#1D1C19] group-hover:text-[#A65338] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-base sm:text-lg font-serif italic text-[#755644] leading-relaxed">
                    &ldquo;{project.subtitle}&rdquo;
                  </p>

                  <p className="text-sm text-[#1D1C19]/80 font-sans leading-relaxed border-l-2 border-[#755644] pl-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.techStack.map((t) => (
                      <span key={t} className="px-2.5 py-1 bg-[#E1D8CA] text-xs font-mono text-[#1D1C19]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4">
                    <button className="px-5 py-2.5 bg-[#1D1C19] text-[#F1ECE3] group-hover:bg-[#A65338] transition-colors font-mono text-xs uppercase flex items-center gap-2">
                      <span>View Curatorial Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right: Artwork Frame (7 cols) */}
                <div className="lg:col-span-7 order-1 lg:order-2 border border-[#1D1C19]/20 shadow-md overflow-hidden transition-all duration-500 group-hover:shadow-xl">
                  <ProjectArtwork project={project} isHovered={isHovered} />
                </div>
              </div>
            </article>
          );
        })()}

        {/* ========================================================
            PROJECT 03: NOTA KITA (Financial Blueprint / Technical Ledger)
           ======================================================== */}
        {(() => {
          const project = SELECTED_PROJECTS[2];
          const isHovered = hoveredProjectId === project.id;
          return (
            <article
              key={project.id}
              className="border-t border-[#1D1C19]/20 pt-8 group cursor-pointer"
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setHoveredProjectId(project.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left: Interactive Ledger Canvas (7 cols) */}
                <div className="lg:col-span-7 border border-[#1D1C19]/25 shadow-md overflow-hidden transition-all duration-500 group-hover:shadow-xl">
                  <ProjectArtwork project={project} isHovered={isHovered} />
                </div>

                {/* Right: Architecture & Financial Specs (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="flex items-center gap-3 font-mono text-xs text-[#755644] uppercase tracking-widest font-bold">
                    <span className="text-[#A65338]">[{project.number} // 06]</span>
                    <span>FINANCIAL ARCHITECTURE</span>
                  </div>

                  <h3 className="text-3xl sm:text-5xl font-display font-bold text-[#1D1C19] group-hover:text-[#A65338] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm sm:text-base font-serif italic text-[#755644]">
                    {project.subtitle}
                  </p>

                  <div className="p-4 bg-[#E1D8CA] border-l-2 border-[#74705E] font-mono text-xs text-[#1D1C19] space-y-2">
                    <div className="text-[10px] uppercase font-bold text-[#A65338]">BACKEND HIGHLIGHT</div>
                    <div>High-concurrency Go ledger engine with sub-12ms transactional guarantees and automated PDF generation.</div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((t) => (
                      <span key={t} className="px-2.5 py-1 bg-[#1D1C19] text-[#F1ECE3] text-xs font-mono">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button className="px-5 py-2.5 bg-[#1D1C19] text-[#F1ECE3] group-hover:bg-[#A65338] transition-colors font-mono text-xs uppercase flex items-center gap-2">
                    <span>Inspect Ledger Architecture</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          );
        })()}

        {/* ========================================================
            PROJECT 04: MALANG REPRODUCTIVE TRAINING CENTER (Clinical Slab)
           ======================================================== */}
        {(() => {
          const project = SELECTED_PROJECTS[3];
          const isHovered = hoveredProjectId === project.id;
          return (
            <article
              key={project.id}
              className="border-t border-[#1D1C19]/20 pt-8 group cursor-pointer"
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setHoveredProjectId(project.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
            >
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-3 font-mono text-xs text-[#A65338] uppercase tracking-widest font-bold">
                    <span>[{project.number} // 06]</span>
                    <span className="text-[#755644]">{project.category}</span>
                  </div>
                  <h3 className="mt-2 text-3xl sm:text-5xl font-display font-bold text-[#1D1C19] group-hover:text-[#A65338] transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base font-serif italic text-[#755644]">
                    {project.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-[#A65338]/15 text-[#A65338] border border-[#A65338] font-mono text-xs font-bold uppercase">
                    500+ DOCTORS TRAINED
                  </span>
                  <button className="px-4 py-2 bg-[#1D1C19] text-[#F1ECE3] group-hover:bg-[#A65338] transition-colors font-mono text-xs uppercase flex items-center gap-1.5 shrink-0">
                    <span>Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Viewport Frame */}
              <div className="border border-[#1D1C19]/25 shadow-lg overflow-hidden transition-all duration-500 group-hover:shadow-2xl">
                <ProjectArtwork project={project} isHovered={isHovered} />
              </div>
            </article>
          );
        })()}

        {/* ========================================================
            PROJECT 05: INSAN MEDIKA TRAINING CENTER (Magazine Spread)
           ======================================================== */}
        {(() => {
          const project = SELECTED_PROJECTS[4];
          const isHovered = hoveredProjectId === project.id;
          return (
            <article
              key={project.id}
              className="border-t border-[#1D1C19]/20 pt-8 group cursor-pointer"
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setHoveredProjectId(project.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left: Text & Academy Narrative (5 cols) */}
                <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
                  <div className="flex items-center gap-3 font-mono text-xs text-[#755644] uppercase tracking-widest font-bold">
                    <span className="text-[#A65338]">[{project.number} // 06]</span>
                    <span>WORKFORCE ACADEMY</span>
                  </div>

                  <h3 className="text-3xl sm:text-5xl font-display font-bold text-[#1D1C19] group-hover:text-[#A65338] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-base font-serif italic text-[#755644]">
                    {project.subtitle}
                  </p>

                  <p className="text-sm text-[#1D1C19]/80 font-sans leading-relaxed">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                    <div className="p-3 bg-[#E1D8CA] border border-[#1D1C19]/15">
                      <div className="text-[#A65338] font-bold">1,200+</div>
                      <div className="text-[10px] text-[#755644] uppercase">GRADUATES</div>
                    </div>
                    <div className="p-3 bg-[#E1D8CA] border border-[#1D1C19]/15">
                      <div className="text-[#1D1C19] font-bold">+55%</div>
                      <div className="text-[10px] text-[#755644] uppercase">PROCESSING SPEED</div>
                    </div>
                  </div>

                  <button className="px-5 py-2.5 bg-[#1D1C19] text-[#F1ECE3] group-hover:bg-[#A65338] transition-colors font-mono text-xs uppercase flex items-center gap-2">
                    <span>Inspect Academy System</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Right: Artwork Frame (7 cols) */}
                <div className="lg:col-span-7 order-1 lg:order-2 border border-[#1D1C19]/20 shadow-md overflow-hidden transition-all duration-500 group-hover:shadow-xl">
                  <ProjectArtwork project={project} isHovered={isHovered} />
                </div>
              </div>
            </article>
          );
        })()}

        {/* ========================================================
            PROJECT 06: HOSPITAL VIRTUAL APP (Digital Telemetry Station)
           ======================================================== */}
        {(() => {
          const project = SELECTED_PROJECTS[5];
          const isHovered = hoveredProjectId === project.id;
          return (
            <article
              key={project.id}
              className="border-t border-[#1D1C19]/20 pt-8 group cursor-pointer"
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setHoveredProjectId(project.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left: Viewport (7 cols) */}
                <div className="lg:col-span-7 border border-[#1D1C19]/25 shadow-md overflow-hidden transition-all duration-500 group-hover:shadow-xl">
                  <ProjectArtwork project={project} isHovered={isHovered} />
                </div>

                {/* Right: Specs (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="flex items-center gap-3 font-mono text-xs text-[#755644] uppercase tracking-widest font-bold">
                    <span className="text-[#A65338]">[{project.number} // 06]</span>
                    <span>TELEMEDICINE & TRIAGE</span>
                  </div>

                  <h3 className="text-3xl sm:text-5xl font-display font-bold text-[#1D1C19] group-hover:text-[#A65338] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-base font-serif italic text-[#755644]">
                    {project.subtitle}
                  </p>

                  <p className="text-sm text-[#1D1C19]/80 font-sans leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((t) => (
                      <span key={t} className="px-2.5 py-1 bg-[#1D1C19] text-[#F1ECE3] text-xs font-mono">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button className="px-5 py-2.5 bg-[#1D1C19] text-[#F1ECE3] group-hover:bg-[#A65338] transition-colors font-mono text-xs uppercase flex items-center gap-2">
                    <span>Inspect Triage Architecture</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          );
        })()}
      </div>

      {/* Case Study Modal Drawer */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
