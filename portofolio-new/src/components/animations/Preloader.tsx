import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING ARCHITECTURE');
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const statuses = [
      'INITIALIZING ARCHITECTURAL GRID',
      'CALIBRATING WARM BRUTALIST TOKENS',
      'LOADING EDITORIAL TYPOGRAPHY',
      'SYNCHRONIZING EXPERIENCES',
      'THE ART OF DIGITAL CRAFT: READY',
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        setStatusText(statuses[4]);
        clearInterval(interval);

        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 650);
        }, 300);
      } else {
        setProgress(current);
        const idx = Math.min(Math.floor((current / 100) * statuses.length), statuses.length - 1);
        setStatusText(statuses[idx]);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#1D1C19] text-[#F1ECE3] flex flex-col justify-between p-6 sm:p-12 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Top Header metadata */}
      <div className="flex items-center justify-between border-b border-[#F1ECE3]/15 pb-4">
        <div className="flex items-center gap-3 font-display text-xs tracking-widest uppercase">
          <span className="w-2 h-2 bg-[#A65338]" />
          <span>MELLINO // DIGITAL CRAFT</span>
        </div>
        <div className="font-mono text-xs text-[#F1ECE3]/60 tracking-wider">
          MALANG, ID // 7.9797°S 112.6304°E
        </div>
      </div>

      {/* Centerpiece: Percentage & Editorial Identity */}
      <div className="my-auto max-w-4xl">
        <div className="text-xs font-semibold text-[#A65338] tracking-wider uppercase mb-4">
          MELLINO &bull; DIGITAL PORTFOLIO
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-8">
          <span className="font-display text-7xl sm:text-9xl lg:text-[130px] font-bold tracking-tighter leading-none text-[#F1ECE3]">
            {progress.toString().padStart(3, '0')}
            <span className="text-3xl sm:text-5xl lg:text-6xl text-[#A65338] ml-2">%</span>
          </span>

          <div className="max-w-md">
            <h1 className="text-xl sm:text-2xl font-display font-semibold text-[#F1ECE3] leading-snug">
              Building digital experiences with intention.
            </h1>
            <p className="mt-2 text-xs font-sans text-[#B0A596] tracking-wider uppercase">
              Fullstack Engineering &bull; Creative Technology
            </p>
          </div>
        </div>

        {/* Hairline brutalist progress track */}
        <div className="mt-8 w-full bg-[#F1ECE3]/15 h-[2px] overflow-hidden">
          <div
            className="h-full bg-[#A65338] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Status & Diagnostic */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-[#F1ECE3]/15 text-xs text-[#B0A596] gap-2 font-sans">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 bg-[#A65338] animate-ping" />
          <span className="text-[#F1ECE3] uppercase tracking-wider">{statusText}</span>
        </div>
        <div className="text-xs tracking-wider uppercase">
          MALANG, INDONESIA
        </div>
      </div>
    </div>
  );
};

