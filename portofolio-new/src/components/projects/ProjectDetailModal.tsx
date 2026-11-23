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
      className="fixed inset-0 z-[100] flex justify-end bg-[#141311]/70 backdrop-blur-sm transition-opacity duration-300 font-sans"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-3xl h-full bg-[#F1ECE3] text-[#1D1C19] overflow-y-auto no-scrollbar shadow-2xl flex flex-col justify-between border-l border-[#1D1C19]/15"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div>
          <div className="sticky top-0 z-20 bg-[#F1ECE3]/95 backdrop-blur-md px-6 sm:px-12 py-6 border-b border-[#1D1C19]/12 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[#A65338] uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-[#756B60] text-xs">/</span>
              <span className="text-xs text-[#514A41] font-medium">
                {project.year}
              </span>
            </div>

            <button
              onClick={onClose}
              className="group flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1D1C19] hover:text-[#A65338] transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <span>Close</span>
              <span className="text-sm font-bold transition-transform duration-200 group-hover:rotate-90">×</span>
            </button>
          </div>

          {/* Modal Main Body */}
          <div className="px-6 sm:px-12 py-10 space-y-10">
            {/* Title & Subtitle */}
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-[#1D1C19] leading-[1.05]">
                {project.title}
              </h2>
              <p className="text-base sm:text-lg font-sans text-[#514A41] leading-relaxed max-w-2xl">
                {project.subtitle}
              </p>
            </div>

            {/* Visual Showcase Frame */}
            <div className="border border-[#1D1C19]/15 overflow-hidden shadow-sm">
              <ProjectArtwork project={project} isHovered={true} />
            </div>

            {/* Editorial Metadata Matrix */}
            <div className="border-y border-[#1D1C19]/15 divide-y divide-[#1D1C19]/10 text-xs sm:text-sm">
              {[
                { label: 'Role', val: project.role },
                { label: 'Year', val: project.year },
                { label: 'Category', val: project.category },
                { label: 'Status', val: 'Shipped & Production Tested' },
              ].map((meta, idx) => (
                <div key={idx} className="flex items-baseline justify-between py-2.5">
                  <span className="text-[#756B60] font-medium text-xs">
                    {meta.label}
                  </span>
                  <span className="font-medium text-[#1D1C19] text-right">
                    {meta.val}
                  </span>
                </div>
              ))}
            </div>

            {/* Overview */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A65338]">
                Overview
              </h3>
              <p className="text-base leading-relaxed text-[#1D1C19] font-sans">
                {project.longDescription}
              </p>
            </div>

            {/* Challenge & Architecture Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-[#1D1C19]/12">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#A65338] uppercase tracking-wider">
                  Technical Challenge
                </div>
                <p className="text-sm text-[#514A41] leading-relaxed font-sans">
                  {project.overview.challenge}
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#756B60] uppercase tracking-wider">
                  Engineering Architecture
                </div>
                <p className="text-sm text-[#514A41] leading-relaxed font-sans">
                  {project.overview.architecture}
                </p>
              </div>
            </div>

            {/* Key Deliverables */}
            <div className="space-y-3 pt-4 border-t border-[#1D1C19]/12">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#A65338]">
                Key Deliverables
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-xs sm:text-sm text-[#1D1C19]">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-baseline gap-2.5 py-1 border-b border-[#1D1C19]/8">
                    <span className="text-[#A65338] font-bold">—</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="space-y-2 pt-4 border-t border-[#1D1C19]/12">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#756B60]">
                Technologies
              </h3>
              <div className="text-xs sm:text-sm text-[#1D1C19] font-medium leading-relaxed tracking-wide">
                {project.techStack.join('  ·  ')}
              </div>
            </div>

            {/* Measurable Benchmarks */}
            {project.stats && (
              <div className="pt-6 border-t border-[#1D1C19]/15 space-y-3">
                <div className="text-xs text-[#A65338] uppercase tracking-wider font-semibold">
                  Measurable Benchmarks
                </div>
                <div className="grid grid-cols-3 gap-6 pt-1">
                  {project.stats.map((st, i) => (
                    <div key={i} className="border-l border-[#1D1C19]/20 pl-4 space-y-0.5">
                      <div className="text-2xl sm:text-3xl font-display font-bold text-[#1D1C19]">
                        {st.value}
                      </div>
                      <div className="text-xs text-[#756B60] uppercase tracking-wide">
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
          <div className="text-xs text-[#756B60]">
            Mellino &bull; Portfolio Archive
          </div>
          <button
            onClick={onClose}
            className="group flex items-center gap-2 text-xs uppercase font-semibold text-[#1D1C19] hover:text-[#A65338] tracking-wider transition-colors"
          >
            <span>Return to Portfolio</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};