import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface JourneyState {
  progress: number; // 0.0 to 1.0
  activeChapter: 0 | 1 | 2 | 3 | 4;
  mouse: { x: number; y: number };
}

export function useCameraJourney(): [
  JourneyState,
  (chapter: 0 | 1 | 2 | 3 | 4) => void,
  (targetP: number) => void
] {
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Master scroll trigger on the window / document
    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);

        // Determine active spatial chapter based on camera waypoint progress
        if (p < 0.18) {
          setActiveChapter(0); // Entrance
        } else if (p < 0.38) {
          setActiveChapter(1); // About
        } else if (p < 0.54) {
          setActiveChapter(2); // Expertise
        } else if (p < 0.935) {
          setActiveChapter(3); // Projects (covers all 6 projects, exit pull-back & corridor entrance)
        } else {
          setActiveChapter(4); // Contact (0.935 to 1.00)
        }
      },
    });

    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      trigger.kill();
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const flyToChapter = (chapter: 0 | 1 | 2 | 3 | 4) => {
    // Exact progress targets for each chapter
    // 0: Entrance, 1: About, 2: Expertise, 3: Projects (Archive Arrival Overview), 4: Contact
    const chapterTargets = [0.0, 0.26, 0.46, 0.57, 0.99];
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = totalScroll * chapterTargets[chapter];

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  const flyToProgress = (targetP: number) => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = totalScroll * Math.min(1, Math.max(0, targetP));

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  return [{ progress, activeChapter, mouse }, flyToChapter, flyToProgress];
}

