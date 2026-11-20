import React, { useEffect } from 'react';
import type { Project } from '../../types';
import { ProjectArtwork } from './ProjectArtwork';
import { ArrowUpRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end bg-[#141311]/70 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-3xl h-full bg-[#F1ECE3] text-[#1D1C19] overflow-y-auto no-scrollbar shadow-2xl flex flex-col justify-between border-l border-[#1D1C19]/15"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header: Editorial Monograph Header */}
        <div>
          <div className="sticky top-0 z-20 bg-[#F1ECE3]/95 backdrop-blur-md px-6 sm:px-12 py-6 border-b border-[#1D1C19]/12 flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs font-bold text-[#A65338] tracking-widest">
                PROJECT // {project.number}
              </span>
              <span className="text-[#1D1C19]/30 font-mono text-xs">/</span>
              <span className="font-mono text-xs uppercase tracking-wider text-[#755644]">
                {project.category}
              </span>
            </div>

            <button
              onClick={onClose}
              className="group flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#1D1C19] hover:text-[#A65338] transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <span>CLOSE</span>
              <span className="text-sm font-bold transition-transform duration-200 group-hover:rotate-90">×</span>
            </button>
          </div>

          {/* Modal Main Body */}
          <div className="px-6 sm:px-12 py-10 space-y-12">
            {/* Title & Subtitle */}
            <div className="space-y-3">
              <div className="font-mono text-[10px] text-[#A65338] uppercase font-bold tracking-[0.25em]">
                CASE STUDY MONOGRAPH // {project.year}
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-[#1D1C19] leading-[1.02]">
                {project.title}
              </h2>
              <p className="text-lg sm:text-xl font-serif italic text-[#755644] leading-relaxed max-w-2xl pt-1">
                &ldquo;{project.subtitle}&rdquo;
              </p>
            </div>

            {/* Visual Showcase Frame */}
            <div className="border border-[#1D1C19]/15 overflow-hidden shadow-sm">
              <ProjectArtwork project={project} isHovered={true} />
            </div>

            {/* Swiss Tabular Metadata Matrix (No Bulky Box) */}
            <div className="border-y border-[#1D1C19]/15 divide-y divide-[#1D1C19]/10 font-mono text-xs">
              {[
                { label: 'ROLE', val: project.role },
                { label: 'YEAR', val: project.year },
                { label: 'DISCIPLINE', val: project.category },
                { label: 'VERIFICATION', val: 'Shipped & Production Tested' },
              ].map((meta, idx) => (
                <div key={idx} className="flex items-baseline justify-between py-2.5">
                  <span className="text-[10px] text-[#A65338] uppercase font-bold tracking-widest">
                    {meta.label}
                  </span>
                  <span className="font-medium text-[#1D1C19] text-right">
                    {meta.val}
                  </span>
                </div>
              ))}
            </div>

            {/* Overview / Story */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#A65338] flex items-center gap-2">
                <span>01 // EXECUTIVE SUMMARY</span>
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-[#1D1C19] font-sans">
                {project.longDescription}
              </p>
            </div>

            {/* Challenge & Architecture Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-[#1D1C19]/12">
              <div className="space-y-2.5">
                <div className="font-mono text-xs font-bold text-[#A65338] uppercase tracking-wider">
                  02 // TECHNICAL CHALLENGE
                </div>
                <p className="text-sm text-[#1D1C19]/85 leading-relaxed font-sans">
                  {project.overview.challenge}
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="font-mono text-xs font-bold text-[#755644] uppercase tracking-wider">
                  03 // ENGINEERING ARCHITECTURE
                </div>
                <p className="text-sm text-[#1D1C19]/85 leading-relaxed font-sans">
                  {project.overview.architecture}
                </p>
              </div>
            </div>

            {/* Key Deliverables & Specifications */}
            <div className="space-y-3.5 pt-4 border-t border-[#1D1C19]/12">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#A65338]">
                04 // KEY DELIVERABLES &amp; SPECIFICATIONS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 font-mono text-xs text-[#1D1C19]/90">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-baseline gap-2.5 py-1 border-b border-[#1D1C19]/8">
                    <span className="text-[#A65338] font-bold">—</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Architecture: Slashed Typographic String */}
            <div className="space-y-2.5 pt-4 border-t border-[#1D1C19]/12">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#755644]">
                05 // TECHNOLOGY ARCHITECTURE
              </h3>
              <div className="font-mono text-xs sm:text-sm text-[#1D1C19] leading-relaxed tracking-wider">
                {project.techStack.join('  /  ')}
              </div>
            </div>

            {/* Performance Stats: Minimalist Metrics Row */}
            {project.stats && (
              <div className="pt-6 border-t border-[#1D1C19]/15 space-y-3">
                <div className="font-mono text-xs text-[#A65338] uppercase tracking-widest font-bold">
                  06 // MEASURABLE BENCHMARKS
                </div>
                <div className="grid grid-cols-3 gap-6 pt-1">
                  {project.stats.map((st, i) => (
                    <div key={i} className="border-l border-[#1D1C19]/20 pl-4 space-y-0.5">
                      <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#1D1C19]">
                        {st.value}
                      </div>
                      <div className="text-[10px] font-mono text-[#755644] uppercase tracking-wider">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="sticky bottom-0 z-20 bg-[#F1ECE3] px-6 sm:px-12 py-5 border-t border-[#1D1C19]/12 flex items-center justify-between">
          <div className="font-mono text-xs text-[#755644]">
            STUDIO MELLINO // CASE STUDY ARCHIVE
          </div>
          <button
            onClick={onClose}
            className="group flex items-center gap-2 font-mono text-xs uppercase font-bold text-[#1D1C19] hover:text-[#A65338] tracking-wider transition-colors"
          >
            <span>RETURN TO PORTFOLIO</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
