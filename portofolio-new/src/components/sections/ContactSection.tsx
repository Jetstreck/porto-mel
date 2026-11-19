import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Copy, Check, ArrowUpRight, Mail, ArrowUp } from 'lucide-react';

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

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="bg-[#1D1C19] text-[#F1ECE3] pt-24 sm:pt-36 pb-16 px-6 sm:px-10 border-t-2 border-[#1D1C19] relative overflow-hidden"
    >
      {/* Background architectural grid */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#F1ECE3_1px,transparent_1px),linear-gradient(to_bottom,#F1ECE3_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        {/* Section Top Header */}
        <div className="flex items-center justify-between border-b border-[#F1ECE3]/15 pb-4 font-mono text-[11px] text-[#F1ECE3]/60">
          <div className="flex items-center gap-2">
            <span className="text-[#A65338] font-bold">[06 // EPILOGUE & INQUIRY]</span>
            <span>COMMISSION DIALOGUE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#F1ECE3] uppercase font-bold">ACCEPTING NEW PROJECTS</span>
          </div>
        </div>

        {/* Closing Monumental Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#A65338] font-bold">
              LET&apos;S COLLABORATE
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-[#F1ECE3] leading-[1.05]">
              Have something meaningful in mind?
            </h2>
            <p className="text-2xl sm:text-3xl font-serif italic text-[#E1D8CA] leading-snug">
              &ldquo;Let&apos;s create something worth experiencing.&rdquo;
            </p>
            <p className="max-w-xl text-sm sm:text-base text-[#F1ECE3]/70 font-sans leading-relaxed">
              Whether you are architecting a high-concurrency SaaS product, a bespoke editorial gallery, or an interactive web experience with spatial depth, I am available for select commissions.
            </p>
          </div>

          {/* Interactive Direct Email Copy Box */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 bg-[#262420] border border-[#F1ECE3]/15 space-y-4">
              <div className="font-mono text-xs text-[#A65338] uppercase tracking-widest font-bold">
                DIRECT TRANSMISSION
              </div>
              <div className="font-mono text-sm sm:text-base text-white break-all font-semibold">
                {PERSONAL_INFO.email}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 px-4 py-2.5 bg-[#A65338] hover:bg-[#8e452e] text-white transition-colors font-mono text-xs uppercase font-bold flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="px-4 py-2.5 bg-[#F1ECE3] hover:bg-white text-[#1D1C19] transition-colors font-mono text-xs uppercase font-bold flex items-center justify-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Mail</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Links & Social Matrix */}
        <div className="pt-12 border-t border-[#F1ECE3]/15 grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 bg-[#262420] border border-[#F1ECE3]/10 hover:border-[#A65338] transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <GithubIcon className="w-4 h-4 text-[#A65338]" />
              <div>
                <div className="font-bold text-white uppercase">GitHub</div>
                <div className="text-[11px] text-[#F1ECE3]/50">@mellino // Code Repos</div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#F1ECE3]/40 group-hover:text-[#A65338] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 bg-[#262420] border border-[#F1ECE3]/10 hover:border-[#A65338] transition-colors flex items-center justify-between group"
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

          <div className="p-5 bg-[#262420] border border-[#F1ECE3]/10 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-[#A65338] uppercase font-bold">TIMEZONE BASE</div>
              <div className="font-bold text-white mt-1">MALANG // WIB (GMT+7)</div>
              <div className="text-[11px] text-[#F1ECE3]/50 mt-0.5">7.9797° S, 112.6304° E</div>
            </div>
            <button
              onClick={scrollToTop}
              className="p-3 bg-[#1D1C19] border border-[#F1ECE3]/20 hover:border-[#A65338] hover:bg-[#A65338] text-white transition-all"
              aria-label="Back to Top"
              title="Return to Top of Page"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Deliberate Editorial Colophon */}
        <div className="pt-12 border-t border-[#F1ECE3]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 font-mono text-[11px] text-[#F1ECE3]/50">
          <div>
            <span className="text-[#F1ECE3] font-bold">MELLINO</span> © {CURRENT_YEAR} — THE ART OF DIGITAL CRAFT. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span>TYPESET IN SPACE GROTESK, INTER & INSTRUMENT SERIF</span>
            <span className="text-[#A65338] font-bold">[ANTI AI SLOP ARCHITECTURE]</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
