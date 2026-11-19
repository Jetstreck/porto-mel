import { useState, useEffect } from 'react';

export interface ScrollState {
  progress: number; // 0.0 to 1.0
  activeZone: 0 | 1 | 2 | 3;
  mouse: { x: number; y: number };
}

export function useScrollProgress(): [ScrollState, (zone: 0 | 1 | 2 | 3) => void] {
  const [progress, setProgress] = useState(0);
  const [activeZone, setActiveZone] = useState<0 | 1 | 2 | 3>(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          const p = totalHeight > 0 ? Math.min(Math.max(currentScroll / totalHeight, 0), 1) : 0;
          setProgress(p);

          // Update active zone based on scroll progression
          if (p < 0.22) {
            setActiveZone(0);
          } else if (p < 0.45) {
            setActiveZone(1);
          } else if (p < 0.80) {
            setActiveZone(2);
          } else {
            setActiveZone(3);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const scrollToZone = (zone: 0 | 1 | 2 | 3) => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetPercentages = [0, 0.28, 0.58, 0.95];
    const targetY = totalHeight * targetPercentages[zone];
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  return [{ progress, activeZone, mouse }, scrollToZone];
}

