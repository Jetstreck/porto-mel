import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { ArrowUpRight, Copy, Check, Mail, ArrowUp } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

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

export const ContactScene: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative w-full bg-[#141311] text-[#F1ECE3] pt-28 sm:pt-40 pb-16 select-none overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 space-y-24">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#F1ECE3]/15 pb-6 font-mono text-xs text-[#F1ECE3]/60">
          <div className="flex items-center gap-2">
            <span className="text-[#A65338] font-bold">[06 // EPILOGUE]</span>
            <span>DIRECT INITIATION</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white uppercase font-bold">ACCEPTING NEW COMMISSIONS</span>
          </div>
        </div>

        {/* Monumental Closing Headline */}
        <div className="space-y-6">
          <h2 className="text-4xl sm:text-6xl lg:text-8xl font-display font-extrabold tracking-tight text-white leading-[0.95]">
            Have something meaningful in mind?
          </h2>
          <p className="text-2xl sm:text-4xl font-serif italic text-[#E1D8CA] leading-snug">
            &ldquo;Let&apos;s create something worth experiencing.&rdquo;
          </p>
        </div>

        {/* Direct Email Interaction Strip */}
        <div className="pt-4 border-t border-[#F1ECE3]/15 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <span className="font-mono text-xs uppercase text-[#A65338] font-bold tracking-widest block mb-2">
              DIRECT TRANSMISSION ADDRESS
            </span>
            <div className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-white break-all tracking-tight">
              {PERSONAL_INFO.email}
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleCopy}
              className="flex-1 px-6 py-4 bg-[#A65338] hover:bg-[#8e452e] text-white font-mono text-xs uppercase font-bold transition-all flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Address Copied</span>
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
              className="px-6 py-4 bg-[#F1ECE3] hover:bg-white text-[#141311] font-mono text-xs uppercase font-bold transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Launch Mail</span>
            </a>
          </div>
        </div>

        {/* Network Conduits */}
        <div className="pt-12 border-t border-[#F1ECE3]/15 grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-[#1D1C19] border border-[#F1ECE3]/10 hover:border-[#A65338] transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <GithubIcon className="w-4 h-4 text-[#A65338]" />
              <div>
                <div className="font-bold text-white uppercase">GitHub</div>
                <div className="text-[11px] text-[#F1ECE3]/50">@mellino // Open Source</div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#F1ECE3]/40 group-hover:text-[#A65338] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-[#1D1C19] border border-[#F1ECE3]/10 hover:border-[#A65338] transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <LinkedinIcon className="w-4 h-4 text-[#A65338]" />
              <div>
                <div className="font-bold text-white uppercase">LinkedIn</div>
                <div className="text-[11px] text-[#F1ECE3]/50">Professional Network</div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#F1ECE3]/40 group-hover:text-[#A65338] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <div className="p-6 bg-[#1D1C19] border border-[#F1ECE3]/10 flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] text-[#A65338] uppercase font-bold">
                STUDIO BASE
              </div>
              <div className="font-bold text-white mt-1">MALANG // WIB (GMT+7)</div>
              <div className="text-[11px] text-[#F1ECE3]/50">07°58′S, 112°37′E</div>
            </div>

            <button
              onClick={scrollToTop}
              className="p-3 bg-[#141311] border border-[#F1ECE3]/20 hover:border-[#A65338] hover:bg-[#A65338] text-white transition-all"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Minimal Colophon */}
        <div className="pt-12 border-t border-[#F1ECE3]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 font-mono text-xs text-[#F1ECE3]/40">
          <div>
            <span className="text-white font-bold">MELLINO</span> © {CURRENT_YEAR} — THE ART OF DIGITAL CRAFT.
          </div>
          <div>
            SPACE GROTESK / INTER / INSTRUMENT SERIF
          </div>
        </div>
      </div>
    </footer>
  );
};

