import React from 'react';
import type { Project } from '../../types';

interface ProjectArtworkProps {
  project: Project;
  isHovered?: boolean;
}

export const ProjectArtwork: React.FC<ProjectArtworkProps> = ({ project, isHovered = false }) => {
  switch (project.id) {
    case 'kbr-esport':
      return (
        <div className="relative w-full h-full min-h-[320px] sm:min-h-[420px] bg-[#161513] text-[#F1ECE3] p-6 sm:p-8 flex flex-col justify-between overflow-hidden group">
          {/* Background grid */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#A65338_1px,transparent_1px)] [background-size:16px_16px]" />
          
          {/* Top HUD */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#F1ECE3]/15 pb-4 font-display text-xs tracking-wider">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 bg-[#A65338] animate-ping" />
              <span className="font-bold text-[#A65338]">KBR // PRO LEAGUE</span>
              <span className="text-[#F1ECE3]/40">SEASON 04</span>
            </div>
            <div className="font-mono text-[11px] text-[#F1ECE3]/60">
              FRAME BUDGET: 144FPS
            </div>
          </div>

          {/* Centerpiece: Kinetic Tournament Bracket & Telemetry */}
          <div className="relative z-10 my-6 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            {/* Match 1 */}
            <div className={`p-4 bg-[#201E1A] border transition-all duration-500 ${isHovered ? 'border-[#A65338] translate-y-[-2px]' : 'border-[#F1ECE3]/15'}`}>
              <div className="text-[10px] font-mono text-[#A65338] uppercase tracking-widest mb-1">UPPER BRACKET R1</div>
              <div className="flex justify-between items-center text-sm font-display font-bold py-1 border-b border-[#F1ECE3]/10">
                <span>KBR APEX</span>
                <span className="text-[#A65338]">2</span>
              </div>
              <div className="flex justify-between items-center text-sm font-display py-1 text-[#F1ECE3]/60">
                <span>VORTEX ID</span>
                <span>0</span>
              </div>
            </div>

            {/* Match 2 */}
            <div className={`p-4 bg-[#201E1A] border transition-all duration-500 delay-75 ${isHovered ? 'border-[#A65338] translate-y-[-2px]' : 'border-[#F1ECE3]/15'}`}>
              <div className="text-[10px] font-mono text-[#A65338] uppercase tracking-widest mb-1">UPPER BRACKET R1</div>
              <div className="flex justify-between items-center text-sm font-display font-bold py-1 border-b border-[#F1ECE3]/10">
                <span>ONIC PRIME</span>
                <span className="text-[#A65338]">2</span>
              </div>
              <div className="flex justify-between items-center text-sm font-display py-1 text-[#F1ECE3]/60">
                <span>AEGIS CLAN</span>
                <span>1</span>
              </div>
            </div>

            {/* Grand Finals Card */}
            <div className={`p-4 bg-[#2A231C] border border-[#A65338]/60 transition-all duration-500 delay-150 ${isHovered ? 'scale-[1.02]' : ''}`}>
              <div className="text-[10px] font-mono text-[#A65338] uppercase tracking-widest mb-1">CHAMPIONSHIP HUD</div>
              <div className="text-lg font-display font-bold tracking-tight text-[#F1ECE3]">
                MATCHDAY TELEMETRY
              </div>
              <div className="mt-2 flex items-center justify-between text-xs font-mono text-[#F1ECE3]/70">
                <span>WIN PROBABILITY</span>
                <span className="text-[#A65338] font-bold">78.4%</span>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between pt-4 border-t border-[#F1ECE3]/15 text-[11px] font-mono text-[#F1ECE3]/60">
            <div>NEXT.JS 14 / ISR / ZERO LAYOUT SHIFT</div>
            <div className="text-[#A65338] font-bold">[SPECTATE FEED LIVE]</div>
          </div>
        </div>
      );

    case 'menawi-art-studio':
      return (
        <div className="relative w-full h-full min-h-[340px] sm:min-h-[440px] bg-[#E1D8CA] text-[#1D1C19] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
          {/* Subtle archival watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[90px] sm:text-[140px] font-serif italic text-[#755644]/10 pointer-events-none select-none">
            Menawi
          </div>

          {/* Exhibition Catalog Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#1D1C19]/15 pb-4">
            <div>
              <div className="font-display text-[10px] tracking-extreme text-[#755644] uppercase">EXHIBITION ARCHIVE</div>
              <div className="font-serif italic text-lg sm:text-xl text-[#1D1C19]">Tumbuh Dalam Senyap</div>
            </div>
            <div className="font-mono text-xs text-[#755644]">
              CATALOGUE NO. 08/23
            </div>
          </div>

          {/* Centerpiece: Curated Artwork Grid Frame */}
          <div className="relative z-10 my-6 grid grid-cols-2 gap-4">
            <div className={`p-3 bg-[#F1ECE3] border border-[#1D1C19]/15 shadow-sm transition-transform duration-500 ${isHovered ? 'rotate-[-1deg]' : ''}`}>
              <div className="w-full h-28 sm:h-36 bg-[#2B2925] relative overflow-hidden flex items-center justify-center p-4">
                {/* Abstract geometric canvas art */}
                <div className="w-16 h-20 border border-[#E1D8CA]/40 rotate-12 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#A65338]/80" />
                </div>
              </div>
              <div className="mt-2 text-right font-serif italic text-xs text-[#1D1C19]">Kala Ruang // Oil on Canvas</div>
            </div>

            <div className={`p-3 bg-[#F1ECE3] border border-[#1D1C19]/15 shadow-sm transition-transform duration-500 delay-100 ${isHovered ? 'rotate-[1deg]' : ''}`}>
              <div className="w-full h-28 sm:h-36 bg-[#3B332B] relative overflow-hidden flex items-center justify-center p-4">
                {/* Abstract brutalist architecture sculpture */}
                <div className="w-12 h-16 bg-[#E1D8CA]/80 -skew-x-12 relative">
                  <div className="absolute top-0 right-0 w-4 h-full bg-[#755644]" />
                </div>
              </div>
              <div className="mt-2 text-right font-serif italic text-xs text-[#1D1C19]">Batu & Waktu // Sculptural Cast</div>
            </div>
          </div>

          {/* Footer details */}
          <div className="relative z-10 flex items-center justify-between pt-4 border-t border-[#1D1C19]/15 font-mono text-[11px] text-[#755644]">
            <div>SLOW SCROLLING & INTENTIONAL PACING</div>
            <div>[CURATED GALLERY ARCHIVE]</div>
          </div>
        </div>
      );

    case 'nota-kita':
      return (
        <div className="relative w-full h-full min-h-[320px] sm:min-h-[420px] bg-[#22211D] text-[#F1ECE3] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
          {/* Blueprint grid background */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#F1ECE3_1px,transparent_1px),linear-gradient(to_bottom,#F1ECE3_1px,transparent_1px)] [background-size:20px_20px]" />

          {/* Ledger Title */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#F1ECE3]/20 pb-4">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 bg-[#74705E] text-white font-mono text-[10px] uppercase tracking-wider">GO + MYSQL</span>
              <span className="font-display text-sm tracking-tight font-bold">NOTA KITA // BILLING ENGINE</span>
            </div>
            <div className="font-mono text-xs text-[#A65338] font-bold">
              [ACID COMPLIANT]
            </div>
          </div>

          {/* Ledger Record Card */}
          <div className="relative z-10 my-4 bg-[#191815] border border-[#F1ECE3]/20 p-4 font-mono text-xs">
            <div className="flex justify-between pb-2 border-b border-[#F1ECE3]/10 text-[#F1ECE3]/60 text-[10px]">
              <span>INVOICE REF: #NK-2024-089</span>
              <span>DATE: 12 NOV 2024</span>
            </div>

            <div className="py-3 space-y-2">
              <div className="flex justify-between items-center text-[#F1ECE3]">
                <span>Brand Identity & Design System</span>
                <span>IDR 12.500.000</span>
              </div>
              <div className="flex justify-between items-center text-[#F1ECE3]">
                <span>Fullstack Platform Implementation</span>
                <span>IDR 16.000.000</span>
              </div>
              <div className="flex justify-between items-center text-[#F1ECE3]/60 text-[11px]">
                <span>Subtotal (PPN 11% Included)</span>
                <span className="text-[#A65338] font-bold">IDR 31.635.000</span>
              </div>
            </div>

            {/* Settled Stamp */}
            <div className="pt-2 border-t border-[#F1ECE3]/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">SETTLED VIA QRIS</span>
              </div>
              <div className="text-[10px] text-[#F1ECE3]/50">HASH: 0x93b4f...e102</div>
            </div>
          </div>

          {/* Benchmark specs */}
          <div className="relative z-10 flex items-center justify-between pt-3 border-t border-[#F1ECE3]/20 font-mono text-[11px] text-[#F1ECE3]/60">
            <div>API CALCULATION LATENCY: &lt;12MS</div>
            <div className="text-[#A65338]">[PDF DISPATCH READY]</div>
          </div>
        </div>
      );

    case 'malang-reproductive-center':
      return (
        <div className="relative w-full h-full min-h-[320px] sm:min-h-[420px] bg-[#E8E1D5] text-[#1D1C19] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
          {/* Clinical layout header */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#1D1C19]/20 pb-4">
            <div>
              <div className="font-display text-[10px] tracking-widest text-[#A65338] uppercase font-bold">MEDICAL EDUCATION PORTAL</div>
              <div className="font-display font-bold text-base sm:text-lg text-[#1D1C19]">MRTC // SURGICAL WORKSHOP HUB</div>
            </div>
            <div className="px-2.5 py-1 border border-[#A65338] text-[#A65338] font-mono text-[10px] uppercase tracking-wider font-bold">
              ACCREDITED CME
            </div>
          </div>

          {/* Clinical Case Blueprint Visual */}
          <div className="relative z-10 my-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 bg-[#F1ECE3] border border-[#1D1C19]/15">
              <div className="text-[10px] font-mono text-[#755644] uppercase mb-1">CERTIFICATION VERIFIER</div>
              <div className="text-xs font-mono text-[#1D1C19] font-bold">
                DR. SP.OG SPECIALIST ID: #98421
              </div>
              <div className="mt-2 text-[11px] text-[#74705E] font-sans">
                Laparo-endoscopic masterclass module completed with distinction.
              </div>
              <div className="mt-3 flex items-center gap-2 text-[10px] font-mono text-emerald-800 font-bold">
                <span>[HASH_VALIDATED_2024]</span>
              </div>
            </div>

            <div className="p-4 bg-[#23211D] text-[#F1ECE3] border border-[#1D1C19]/15 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono text-[#A65338] uppercase mb-1">SIMULATION LAB</div>
                <div className="text-sm font-display font-bold">CLINICAL MEDIA VAULT</div>
              </div>
              <div className="mt-2 text-[11px] font-mono text-[#F1ECE3]/70">
                ENCRYPTED ENDOSCOPY FEED STREAMING // 1080P 60FPS
              </div>
            </div>
          </div>

          {/* Bottom regulatory note */}
          <div className="relative z-10 flex items-center justify-between pt-3 border-t border-[#1D1C19]/20 font-mono text-[11px] text-[#755644]">
            <div>500+ REGISTERED SPECIALISTS</div>
            <div>[STRICT ROLE-BASED ACCESS CONTROL]</div>
          </div>
        </div>
      );

    case 'insan-medika':
      return (
        <div className="relative w-full h-full min-h-[320px] sm:min-h-[420px] bg-[#1E1C19] text-[#F1ECE3] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
          {/* Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#F1ECE3]/20 pb-4">
            <div>
              <div className="font-display text-[10px] tracking-widest text-[#A65338] uppercase font-bold">ACADEMY & WORKFORCE PORTAL</div>
              <div className="font-display text-base sm:text-lg font-bold">INSAN MEDIKA ACADEMY</div>
            </div>
            <div className="font-mono text-xs text-[#E1D8CA]/60">
              NATIONAL COHORT 2024
            </div>
          </div>

          {/* Competency Tracking UI */}
          <div className="relative z-10 my-4 space-y-3">
            <div className="p-3 bg-[#2A2722] border border-[#F1ECE3]/15">
              <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                <span className="text-[#F1ECE3]">Geriatric Clinical Care Competency</span>
                <span className="text-[#A65338] font-bold">94% PASSED</span>
              </div>
              <div className="w-full bg-[#161513] h-1.5 overflow-hidden">
                <div className="bg-[#A65338] h-full transition-all duration-1000" style={{ width: '94%' }} />
              </div>
            </div>

            <div className="p-3 bg-[#2A2722] border border-[#F1ECE3]/15">
              <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                <span className="text-[#F1ECE3]">Pediatric Care & Nutrition Protocol</span>
                <span className="text-[#755644] font-bold">88% PASSED</span>
              </div>
              <div className="w-full bg-[#161513] h-1.5 overflow-hidden">
                <div className="bg-[#755644] h-full transition-all duration-1000" style={{ width: '88%' }} />
              </div>
            </div>
          </div>

          {/* Statistics summary */}
          <div className="relative z-10 flex items-center justify-between pt-3 border-t border-[#F1ECE3]/20 font-mono text-[11px] text-[#F1ECE3]/60">
            <div>1,200+ GRADUATED CAREGIVERS</div>
            <div className="text-[#A65338]">[EVALUATOR AUDIT PASS]</div>
          </div>
        </div>
      );

    case 'hospital-virtual-app':
      return (
        <div className="relative w-full h-full min-h-[320px] sm:min-h-[420px] bg-[#1A1A18] text-[#F1ECE3] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
          {/* Telemedicine Live HUD */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#F1ECE3]/20 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-display font-bold text-sm tracking-wide">VIRTUAL TRIAGE & TELECONSULT</span>
            </div>
            <div className="font-mono text-xs text-emerald-400">
              WEBRTC ENCRYPTED
            </div>
          </div>

          {/* Patient Journey Telemetry Visual */}
          <div className="relative z-10 my-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-[#24231E] border border-[#F1ECE3]/15">
              <div className="text-[10px] font-mono text-[#F1ECE3]/50 uppercase">QUEUE POSITION</div>
              <div className="text-2xl font-display font-bold text-white mt-1">#042</div>
              <div className="text-[10px] font-mono text-emerald-400 mt-1">EST: 6 MIN REMAINING</div>
            </div>

            <div className="p-3 bg-[#24231E] border border-[#F1ECE3]/15">
              <div className="text-[10px] font-mono text-[#F1ECE3]/50 uppercase">CONSULTING DOCTOR</div>
              <div className="text-xs font-display font-bold text-white mt-1">DR. HARIS, SP.PD</div>
              <div className="text-[10px] font-mono text-[#A65338] mt-1">ROOM READY // VIDEO IDLE</div>
            </div>

            <div className="p-3 bg-[#24231E] border border-[#F1ECE3]/15">
              <div className="text-[10px] font-mono text-[#F1ECE3]/50 uppercase">E-PRESCRIPTION</div>
              <div className="text-xs font-mono text-white mt-1">DIGITAL DISPATCH</div>
              <div className="text-[10px] font-mono text-[#74705E] mt-1">APOTEK PARTNER LINKED</div>
            </div>
          </div>

          {/* Heartbeat Waveform SVG */}
          <div className="relative z-10 py-2 border-y border-[#F1ECE3]/10">
            <svg viewBox="0 0 500 40" className="w-full h-8 stroke-emerald-400 fill-none opacity-80">
              <path d="M0,20 L120,20 L130,5 L140,35 L150,15 L160,25 L170,20 L320,20 L330,8 L340,32 L350,18 L360,20 L500,20" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Footer note */}
          <div className="relative z-10 flex items-center justify-between pt-3 font-mono text-[11px] text-[#F1ECE3]/60">
            <div>40% PHYSICAL QUEUE REDUCTION</div>
            <div className="text-emerald-400 font-bold">[ACCESSIBLE FOR ELDERLY]</div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
