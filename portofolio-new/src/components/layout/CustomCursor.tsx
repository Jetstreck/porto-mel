import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.closest('article') ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible, isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9998] transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        left: 0,
        top: 0,
      }}
    >
      {/* Precision Crosshair Center */}
      <div
        className={`-translate-x-1/2 -translate-y-1/2 transition-all duration-200 flex items-center justify-center ${
          isHovering
            ? 'w-10 h-10 border border-[#A65338] bg-[#A65338]/10'
            : 'w-4 h-4 border border-[#1D1C19]/40'
        }`}
      >
        <div className="w-1 h-1 bg-[#A65338]" />
      </div>

      {/* Coordinate & Mode Stamp when Hovering */}
      {isHovering && (
        <div className="absolute left-6 top-6 px-1.5 py-0.5 bg-[#1D1C19] text-[#F1ECE3] font-mono text-[9px] uppercase tracking-wider whitespace-nowrap shadow-sm">
          [INTERACT]
        </div>
      )}
    </div>
  );
};

