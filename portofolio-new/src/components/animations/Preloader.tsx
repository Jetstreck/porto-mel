import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const { progress: dreiProgress, active: dreiActive } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 100;
    }
    return 0;
  });
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Respect reduced-motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onComplete, 300);
      }, 500);
      return () => clearTimeout(timer);
    }

    let current = 0;
    const startTime = performance.now();
    const MIN_LOAD_TIME = 1400; // Refined entrance duration to absorb initialization cleanly

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const timeRatio = Math.min(1, elapsed / MIN_LOAD_TIME);

      // Blend real asset loading progress with smooth temporal progress
      const targetReal = dreiActive ? dreiProgress : 100;
      const targetProgress = Math.max(timeRatio * 95, targetReal);

      current += (targetProgress - current) * 0.22 + 1.2;

      if (current >= 100 && elapsed >= MIN_LOAD_TIME) {
        current = 100;
        setDisplayProgress(100);
        clearInterval(interval);

        // Graceful cinematic exit transition
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 650);
        }, 250);
      } else {
        setDisplayProgress(Math.min(99, Math.round(current)));
      }
    }, 35);

    return () => clearInterval(interval);
  }, [dreiProgress, dreiActive, onComplete]);

  // Truthful status mapping based on loading phases
  const getStatusMessage = (p: number) => {
    if (p < 30) return 'Preparing the experience';
    if (p < 70) return 'Loading environments';
    if (p < 95) return 'Initializing the exhibition';
    return 'Entering the atelier';
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#161513] text-[#F1ECE3] flex flex-col justify-between p-6 sm:p-12 lg:p-16 select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] font-sans ${
        isExiting ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
    >
      {/* Background architectural warmth & radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 65% 45%, rgba(166, 83, 58, 0.16), rgba(22, 21, 19, 0) 65%)',
        }}
      />

      {/* Architectural Corner Registration Marks */}
      <div className="absolute top-6 left-6 text-[#F1ECE3]/20 font-mono text-xs hidden sm:block">+</div>
      <div className="absolute top-6 right-6 text-[#F1ECE3]/20 font-mono text-xs hidden sm:block">+</div>
      <div className="absolute bottom-6 left-6 text-[#F1ECE3]/20 font-mono text-xs hidden sm:block">+</div>
      <div className="absolute bottom-6 right-6 text-[#F1ECE3]/20 font-mono text-xs hidden sm:block">+</div>

      {/* Header: Studio Monograph & Location */}
      <header className="relative z-10 flex items-center justify-between border-b border-[#F1ECE3]/12 pb-5">
        <div className="flex items-baseline gap-3">
          <span className="font-display font-bold text-sm tracking-[0.16em] text-[#F1ECE3] uppercase">
            MELLINO
          </span>
          <span className="hidden sm:inline font-sans text-xs text-[#A65338] tracking-wider uppercase font-semibold">
            / The Digital Atelier
          </span>
        </div>
        <div className="text-xs text-[#B0A596] font-medium tracking-wide">
          MALANG, ID <span className="text-[#F1ECE3]/20 mx-1">/</span> 07°58′S, 112°37′E
        </div>
      </header>

      {/* Centerpiece: Asymmetric Composition with Chapter 01 Workshop Preview */}
      <main className="relative z-10 my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Typographic Presentation */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#A65338] tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A65338]" />
            <span>Exhibition Entrance &bull; Chapter 01</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight text-[#F1ECE3] leading-[1.04]">
              Crafting digital experiences.
            </h1>
            <p className="text-lg sm:text-xl font-sans text-[#E1D8CA] font-medium leading-relaxed">
              An immersive portfolio by Mellino.
            </p>
          </div>

          <p className="text-sm text-[#B0A596] font-sans max-w-lg leading-relaxed pt-1">
            An architectural journey exploring fullstack software systems, tactile 3D environments, and intentional digital craft.
          </p>
        </div>

        {/* Right Column: Visual Preview of Chapter 01 Creative Workshop */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md aspect-[4/3] bg-[#1C1B18] border border-[#F1ECE3]/15 rounded-sm p-5 shadow-2xl overflow-hidden flex flex-col justify-between">
            {/* Top window bar of the workshop workstation */}
            <div className="flex items-center justify-between border-b border-[#F1ECE3]/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#A65338]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#755644]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#74705E]" />
              </div>
              <span className="text-[11px] font-mono text-[#B0A596] tracking-wider">
                WorkshopAtelier.3d
              </span>
            </div>

            {/* Stylized Architectural Workstation Silhouette */}
            <div className="relative my-auto flex items-center justify-center py-4">
              <svg
                viewBox="0 0 320 180"
                className="w-full h-auto max-w-[280px] text-[#E1D8CA]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Desk Lamp Warm Radial Glow */}
                <circle cx="230" cy="50" r="60" fill="url(#warmLampGlow)" opacity="0.6" />

                {/* Desk Plinth / Surface */}
                <polygon
                  points="20,135 300,135 270,150 50,150"
                  fill="#2A2824"
                  stroke="#755644"
                  strokeWidth="1.5"
                />
                {/* Desk Legs */}
                <line x1="60" y1="150" x2="60" y2="175" stroke="#755644" strokeWidth="2.5" />
                <line x1="260" y1="150" x2="260" y2="175" stroke="#755644" strokeWidth="2.5" />

                {/* Ultra-wide Monitor Screen (Chapter 01 Workstation) */}
                <rect
                  x="70"
                  y="45"
                  width="180"
                  height="82"
                  rx="3"
                  fill="#151412"
                  stroke="#A65338"
                  strokeWidth="1.5"
                />
                <rect x="75" y="50" width="170" height="72" rx="2" fill="#1C1B18" />

                {/* Monitor Stand */}
                <rect x="155" y="127" width="10" height="9" fill="#755644" />
                <polygon points="140,136 180,136 175,138 145,138" fill="#A65338" />

                {/* Code Lines inside Workstation Screen */}
                <line x1="85" y1="62" x2="135" y2="62" stroke="#A65338" strokeWidth="2" strokeLinecap="round" />
                <line x1="142" y1="62" x2="185" y2="62" stroke="#E1D8CA" strokeWidth="2" strokeLinecap="round" />
                <line x1="85" y1="72" x2="120" y2="72" stroke="#74705E" strokeWidth="2" strokeLinecap="round" />
                <line x1="126" y1="72" x2="170" y2="72" stroke="#B0A596" strokeWidth="2" strokeLinecap="round" />
                <line x1="85" y1="82" x2="155" y2="82" stroke="#F1ECE3" strokeWidth="2" strokeLinecap="round" />
                <line x1="85" y1="92" x2="110" y2="92" stroke="#A65338" strokeWidth="2" strokeLinecap="round" />
                <line x1="116" y1="92" x2="160" y2="92" stroke="#E1D8CA" strokeWidth="2" strokeLinecap="round" />
                <line x1="85" y1="102" x2="140" y2="102" stroke="#74705E" strokeWidth="2" strokeLinecap="round" />

                {/* Interactive Waveform / 3D Grid Indicator on Screen */}
                <path
                  d="M190 75 Q 205 60, 220 75 T 240 75"
                  stroke="#A65338"
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle cx="215" cy="75" r="2.5" fill="#E1D8CA" />

                {/* Desk Lamp Arm & Hood */}
                <path
                  d="M245 135 L 245 70 L 225 45"
                  stroke="#A65338"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <polygon points="215,40 232,48 220,56" fill="#D4A373" />

                <defs>
                  <radialGradient id="warmLampGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#A65338" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#A65338" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#1C1B18" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            {/* Bottom preview metadata */}
            <div className="flex items-center justify-between border-t border-[#F1ECE3]/10 pt-2 text-[10px] font-mono text-[#B0A596]">
              <span>CREATIVE WORKSHOP // 3D SCENE</span>
              <span className="text-[#A65338] font-bold">READY TO INITIALIZE</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer: Refined Progress System */}
      <footer className="relative z-10 border-t border-[#F1ECE3]/12 pt-5">
        <div className="flex items-center justify-between text-xs">
          {/* Truthful status message */}
          <div className="flex items-center gap-2.5 font-sans font-medium text-[#E1D8CA]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A65338] animate-pulse" />
            <span>{getStatusMessage(displayProgress)}</span>
          </div>

          {/* Subtle percentage counter */}
          <div className="font-mono text-xs font-semibold text-[#B0A596]">
            {displayProgress}%
          </div>
        </div>

        {/* Thin Architectural Progress Indicator */}
        <div className="w-full h-[2px] bg-[#F1ECE3]/10 overflow-hidden mt-3 rounded-full">
          <div
            className="h-full bg-[#A65338] transition-all duration-150 ease-out"
            style={{ width: `${displayProgress}%` }}
          />
        </div>

        {/* Bottom micro-descriptors */}
        <div className="flex items-center justify-between pt-3 text-[11px] font-sans text-[#B0A596]">
          <span className="tracking-wider uppercase">Creative Technologist &bull; Fullstack Developer</span>
          <span className="tracking-wider uppercase hidden sm:inline">WebGL &bull; React Three Fiber &bull; GSAP</span>
        </div>
      </footer>
    </div>
  );
};