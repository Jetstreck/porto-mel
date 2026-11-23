import React, { useState, useEffect, useRef } from 'react';
import { useProgress } from '@react-three/drei';

interface FirstImpressionPreloaderProps {
  onComplete: () => void;
}

export const FirstImpressionPreloader: React.FC<FirstImpressionPreloaderProps> = ({ onComplete }) => {
  const { progress: assetProgress, active: assetActive } = useProgress();

  const [showIdentity, setShowIdentity] = useState(false);
  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [showPreparation, setShowPreparation] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Respect reduced-motion preferences
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    // Step 1: MELLINO identity reveal
    const identityTimer = setTimeout(() => {
      setShowIdentity(true);
    }, 60);

    // Step 2: "Ideas" reveal (begins at 1000ms, 1.4s smooth masked reveal)
    const line1Timer = setTimeout(() => {
      setShowLine1(true);
    }, 1000);

    // Step 3: "take form." reveal (begins at 1400ms, 400ms deliberate stagger, 1.4s smooth reveal)
    const line2Timer = setTimeout(() => {
      setShowLine2(true);
    }, 1400);

    // Step 4: Reading pause holds from ~2800ms to ~4200ms (~1.4s reading pause)
    // Step 5: Transition naturally to loading phase (Act III)
    const prepTimer = setTimeout(() => {
      setShowPreparation(true);
    }, 3800);

    // Coordinate loading timeline:
    // Ensures opening animation and reading pause finish before completing
    const startTime = performance.now();
    const MIN_READING_DURATION = 4200; // Guarantees full statement read time

    let current = 0;
    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const timeRatio = Math.min(1.0, elapsed / MIN_READING_DURATION);

      // Truthful resource loading from Three.js DefaultLoadingManager
      const targetReal = assetActive ? assetProgress : 100;
      const target = Math.max(timeRatio * 92, targetReal);

      current += (target - current) * 0.18 + 0.9;

      const isResourcesReady = !assetActive || assetProgress >= 100;

      if (current >= 100 && elapsed >= MIN_READING_DURATION && isResourcesReady) {
        current = 100;
        setDisplayProgress(100);
        clearInterval(interval);

        // Step 8: Hold the completed composition for approximately 2 seconds
        exitTimerRef.current = setTimeout(() => {
          setIsExiting(true);

          // Step 9 & 10: Smooth architectural exit and entrance reveal
          completeTimerRef.current = setTimeout(() => {
            onComplete();
          }, 800);
        }, 2000);
      } else {
        setDisplayProgress(Math.min(99, Math.round(current)));
      }
    }, 35);

    return () => {
      clearTimeout(identityTimer);
      clearTimeout(line1Timer);
      clearTimeout(line2Timer);
      clearTimeout(prepTimer);
      clearInterval(interval);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    };
  }, [assetActive, assetProgress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#1D1C19] text-[#F1ECE3] flex flex-col justify-between p-8 sm:p-14 lg:p-20 select-none font-sans overflow-hidden transition-transform duration-800 ease-brutal ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Top Editorial Folio Header */}
      <header className="flex items-center justify-between text-xs tracking-widest uppercase">
        <div className="flex items-baseline gap-3">
          <span className="font-display font-bold text-sm tracking-[0.14em] text-[#F1ECE3]">
            MELLINO
          </span>
          <span className="text-[#A65338] font-semibold hidden sm:inline">
            / FOLIO 2025
          </span>
        </div>
        <div className="text-[#B0A596] font-medium tracking-wide">
          MALANG, ID <span className="text-[#F1ECE3]/20 mx-1">/</span> INDEPENDENT STUDIO
        </div>
      </header>

      {/* Main Asymmetric Canvas: Act I & Act II */}
      <main className="my-auto py-12 flex flex-col justify-center max-w-6xl space-y-12 sm:space-y-16">
        {/* ACT I — IDENTITY */}
        <div className="space-y-3">
          {/* Masked reveal container for MELLINO */}
          <div className="overflow-hidden">
            <h1
              className={`font-display font-bold text-6xl sm:text-8xl lg:text-[130px] tracking-[-0.03em] text-[#F1ECE3] leading-[0.88] transform transition-all duration-[1200ms] ease-brutal ${
                showIdentity ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
            >
              MELLINO
            </h1>
          </div>

          {/* Supporting statement */}
          <div className="overflow-hidden pt-1">
            <p
              className={`text-xs sm:text-sm font-sans tracking-[0.25em] text-[#A65338] uppercase font-semibold transform transition-all duration-[1000ms] delay-200 ease-brutal ${
                showIdentity ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
            >
              INDEPENDENT DIGITAL CRAFT
            </p>
          </div>
        </div>

        {/* ACT II — STATEMENT: "Ideas take form." */}
        <div className="space-y-1 sm:space-y-2">
          {/* Staggered Line 1: Ideas (1.4s smooth masked reveal) */}
          <div className="overflow-hidden">
            <span
              className={`block font-display font-bold text-4xl sm:text-6xl lg:text-[84px] text-[#F1ECE3] leading-[0.94] tracking-tight transform transition-all duration-[1400ms] ease-brutal ${
                showLine1 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
            >
              Ideas
            </span>
          </div>

          {/* Staggered Line 2: take form. (1.4s smooth masked reveal with 400ms stagger) */}
          <div className="overflow-hidden pl-6 sm:pl-16 lg:pl-24">
            <span
              className={`block font-display font-bold text-4xl sm:text-6xl lg:text-[84px] text-[#E1D8CA] leading-[0.94] tracking-tight transform transition-all duration-[1400ms] ease-brutal ${
                showLine2 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
            >
              take form<span className="text-[#A65338]">.</span>
            </span>
          </div>
        </div>
      </main>

      {/* ACT III — PREPARATION */}
      <footer
        className={`border-t border-[#F1ECE3]/12 pt-5 transition-opacity duration-700 ease-out ${
          showPreparation ? 'opacity-100' : 'opacity-25'
        }`}
      >
        <div className="flex items-center justify-between text-xs">
          {/* Status Descriptor */}
          <div className="flex items-center gap-2.5 font-sans font-medium text-[#A65338] tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A65338] animate-pulse" />
            <span>PREPARING DIGITAL ENVIRONMENT</span>
          </div>

          {/* Numerical Percentage */}
          <div className="font-mono text-xs font-semibold text-[#B0A596]">
            {displayProgress}%
          </div>
        </div>

        {/* Refined Progress Line */}
        <div className="w-full h-[2px] bg-[#F1ECE3]/10 overflow-hidden mt-3 rounded-full">
          <div
            className="h-full bg-[#A65338] transition-all duration-150 ease-out"
            style={{ width: `${displayProgress}%` }}
          />
        </div>

        {/* Bottom Editorial Footnote */}
        <div className="flex items-center justify-between pt-3 text-[11px] font-sans text-[#756B60]">
          <span className="tracking-wider uppercase">ARCHITECTURAL SYSTEMS &bull; SPATIAL 3D &bull; FULLSTACK</span>
          <span className="tracking-wider uppercase hidden sm:inline">STANDBY FOR EXHIBITION</span>
        </div>
      </footer>
    </div>
  );
};
