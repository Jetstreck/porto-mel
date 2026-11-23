import React from 'react';

interface CinematicIntroOverlayProps {
  introProgress: number; // 0.0 to 1.0
  isIntroActive: boolean;
  assetLoadingProgress: number;
}

export const CinematicIntroOverlay: React.FC<CinematicIntroOverlayProps> = ({
  introProgress,
  isIntroActive,
  assetLoadingProgress,
}) => {
  if (!isIntroActive && introProgress >= 1) return null;

  // Scene C (Identity): fades in around introProgress 0.35, peaks 0.5 - 0.75, fades out by 0.92
  let titleOpacity = 0;
  if (introProgress >= 0.3 && introProgress <= 0.75) {
    titleOpacity = Math.min(1, (introProgress - 0.3) / 0.15);
  } else if (introProgress > 0.75) {
    titleOpacity = Math.max(0, 1 - (introProgress - 0.75) / 0.17);
  }

  // Subtle translateY for cinematic film title emergence
  const translateY = (1 - titleOpacity) * 12;

  return (
    <div
      className="fixed inset-0 z-40 pointer-events-none flex flex-col justify-between p-8 sm:p-14 lg:p-20 select-none transition-opacity duration-500"
      style={{
        opacity: introProgress >= 0.98 ? 0 : 1,
      }}
      aria-hidden={!isIntroActive}
    >
      {/* Top subtle studio mark */}
      <div
        className="flex items-center justify-between text-xs font-sans tracking-widest uppercase transition-opacity duration-700"
        style={{ opacity: titleOpacity * 0.7 }}
      >
        <span className="text-[#E1D8CA]/60">Studio Mellino &bull; 2025</span>
        <span className="text-[#E1D8CA]/40 hidden sm:inline">Chapter 01 &bull; The Creative Workshop</span>
      </div>

      {/* Center: Cinematic Title Sequence (Clean Manrope + DM Sans, no cards, no boxes) */}
      <div
        className="my-auto max-w-3xl space-y-4 transition-transform duration-700 ease-out"
        style={{
          opacity: titleOpacity,
          transform: `translate3d(0, ${translateY}px, 0)`,
        }}
      >
        <h1 className="font-display font-bold text-5xl sm:text-7xl lg:text-[96px] tracking-[0.16em] text-[#F1ECE3] uppercase leading-[0.92]">
          MELLINO
        </h1>

        <p className="font-sans text-base sm:text-xl lg:text-2xl text-[#D1C8BB] font-normal tracking-wide leading-relaxed max-w-xl">
          Building digital experiences with intention.
        </p>

        {/* Minimalist ambient indicator during initial resource preparation */}
        {assetLoadingProgress < 100 && (
          <div className="pt-4 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A65338] animate-pulse" />
            <span className="text-[11px] font-sans text-[#B0A596] tracking-wider uppercase">
              Preparing environment &bull; {Math.round(assetLoadingProgress)}%
            </span>
          </div>
        )}
      </div>

      {/* Bottom subtle cinematic letterbox cue */}
      <div
        className="flex items-center justify-between text-[11px] font-sans text-[#E1D8CA]/40 tracking-wider uppercase transition-opacity duration-700"
        style={{ opacity: titleOpacity * 0.6 }}
      >
        <span>Architectural Systems</span>
        <span>Entering Atelier</span>
      </div>
    </div>
  );
};
