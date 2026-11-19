import React, { useEffect } from 'react';
import type { Project } from '../../types';
import { ProjectArtwork } from './ProjectArtwork';
import { X, ArrowUpRight, CheckCircle2, Cpu, Layers } from 'lucide-react';

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
      className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-3xl h-full bg-[#F1ECE3] text-[#1D1C19] overflow-y-auto shadow-2xl flex flex-col justify-between border-l border-[#1D1C19]/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div>
          <div className="sticky top-0 z-20 bg-[#F1ECE3]/90 backdrop-blur-md px-6 sm:px-10 py-5 border-b border-[#1D1C19]/15 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-[#A65338] tracking-widest">
                [PROJECT // {project.number}]
              </span>
              <span className="text-xs uppercase tracking-wider text-[#755644]">
                {project.category}
              </span>
            </div>

            <button
              onClick={onClose}
              className="group flex items-center gap-2 px-3 py-1.5 border border-[#1D1C19]/20 hover:border-[#1D1C19] hover:bg-[#1D1C19] hover:text-[#F1ECE3] transition-all text-xs font-mono uppercase tracking-wider"
              aria-label="Close modal"
            >
              <span>Close</span>
              <X className="w-3.5 h-3.5 transition-transform group-hover:rotate-90" />
            </button>
          </div>

          {/* Modal Main Body */}
          <div className="px-6 sm:px-10 py-8 space-y-10">
            {/* Title & Subtitle */}
            <div>
              <div className="font-mono text-xs text-[#755644] uppercase tracking-widest mb-2">
                CASE STUDY ARCHIVE // {project.year}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-[#1D1C19]">
                {project.title}
              </h2>
              <p className="mt-3 text-lg font-serif italic text-[#755644] leading-relaxed">
                {project.subtitle}
              </p>
            </div>

            {/* Visual Showcase Frame */}
            <div className="border border-[#1D1C19]/20 shadow-md overflow-hidden">
              <ProjectArtwork project={project} isHovered={true} />
            </div>

            {/* Quick Metadata Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#E1D8CA] border border-[#1D1C19]/15 font-mono text-xs">
              <div>
                <div className="text-[10px] text-[#755644] uppercase tracking-wider">ROLE</div>
                <div className="font-bold text-[#1D1C19] mt-1">{project.role}</div>
              </div>
              <div>
                <div className="text-[10px] text-[#755644] uppercase tracking-wider">YEAR</div>
                <div className="font-bold text-[#1D1C19] mt-1">{project.year}</div>
              </div>
              <div>
                <div className="text-[10px] text-[#755644] uppercase tracking-wider">DISCIPLINE</div>
                <div className="font-bold text-[#1D1C19] mt-1">{project.category.split('/')[0]}</div>
              </div>
              <div>
                <div className="text-[10px] text-[#755644] uppercase tracking-wider">STATUS</div>
                <div className="font-bold text-[#A65338] mt-1">SHIPPED & TESTED</div>
              </div>
            </div>

            {/* Overview / Story */}
            <div className="space-y-4">
              <h3 className="font-display text-sm uppercase tracking-widest text-[#755644] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#A65338]" />
                Executive Summary
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-[#1D1C19] font-sans">
                {project.longDescription}
              </p>
            </div>

            {/* Challenge & Architecture Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-[#E1D8CA]/60 border border-[#1D1C19]/15 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#A65338] uppercase tracking-wider">
                  <Cpu className="w-4 h-4" />
                  Technical Challenge
                </div>
                <p className="text-sm text-[#1D1C19]/90 leading-relaxed">
                  {project.overview.challenge}
                </p>
              </div>

              <div className="p-6 bg-[#E1D8CA]/60 border border-[#1D1C19]/15 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#755644] uppercase tracking-wider">
                  <Layers className="w-4 h-4" />
                  Engineering Architecture
                </div>
                <p className="text-sm text-[#1D1C19]/90 leading-relaxed">
                  {project.overview.architecture}
                </p>
              </div>
            </div>

            {/* Key Deliverables & Features */}
            <div className="space-y-4">
              <h3 className="font-display text-sm uppercase tracking-widest text-[#755644] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#A65338]" />
                Key Deliverables & Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 bg-white/50 border border-[#1D1C19]/10 text-xs sm:text-sm text-[#1D1C19]">
                    <CheckCircle2 className="w-4 h-4 text-[#A65338] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div className="space-y-3">
              <h3 className="font-display text-sm uppercase tracking-widest text-[#755644]">
                Technology Architecture
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-[#1D1C19] text-[#F1ECE3] font-mono text-xs uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Performance Stats */}
            {project.stats && (
              <div className="p-6 bg-[#1D1C19] text-[#F1ECE3] border border-[#1D1C19] space-y-4">
                <div className="font-mono text-xs text-[#A65338] uppercase tracking-widest">
                  MEASURABLE BENCHMARKS
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {project.stats.map((st, i) => (
                    <div key={i} className="border-l border-[#F1ECE3]/20 pl-3">
                      <div className="text-xl sm:text-2xl font-display font-bold text-white">
                        {st.value}
                      </div>
                      <div className="text-[10px] font-mono text-[#F1ECE3]/60 uppercase mt-0.5">
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
        <div className="sticky bottom-0 z-20 bg-[#F1ECE3] px-6 sm:px-10 py-4 border-t border-[#1D1C19]/15 flex items-center justify-between">
          <div className="font-mono text-xs text-[#755644]">
            [END OF CASE STUDY BRIEF]
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#1D1C19] text-[#F1ECE3] hover:bg-[#A65338] transition-colors font-display text-xs uppercase tracking-wider font-bold flex items-center gap-2"
          >
            <span>Return to Portfolio</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
