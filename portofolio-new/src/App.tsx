import React, { useState, useEffect, useRef } from 'react';
import { useProgress } from '@react-three/drei';
import { CustomCursor } from './components/layout/CustomCursor';
import { DigitalAtelierScene } from './components/canvas/DigitalAtelierScene';
import { SpatialHUD } from './components/overlay/SpatialHUD';
import { CinematicIntroOverlay } from './components/overlay/CinematicIntroOverlay';
import { ProjectDetailModal } from './components/projects/ProjectDetailModal';
import { useCameraJourney } from './hooks/useCameraJourney';
import type { Project } from './types';

export const App: React.FC = () => {
  const { progress: assetProgress, active: assetActive } = useProgress();
  const [introProgress, setIntroProgress] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 1.0;
    }
    return 0.0;
  });
  const [isIntroActive, setIsIntroActive] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }
    return true;
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // GSAP ScrollTrigger Camera Journey Controller
  const [{ progress, activeChapter, mouse }, flyToChapter, flyToProgress] = useCameraJourney();

  const animFrameRef = useRef<number | null>(null);

  // =========================================================================
  // THE ATELIER AWAKENING: 4-SCENE CINEMATIC 3D ORCHESTRATION
  // Scene A: Darkness & Silhouettes
  // Scene B: Awakening (warm desk lamp & room illumination)
  // Scene C: Identity (Cinematic MELLINO title reveal)
  // Scene D: Entering the World (Dolly into Chapter 01 Entrance waypoint)
  // =========================================================================
  useEffect(() => {
    if (!isIntroActive) return;

    // Lock scroll to top during the opening cinematic experience
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    const TOTAL_INTRO_DURATION = 3800; // ~3.8s cinematic narrative arc

    const step = (now: number) => {
      const elapsed = now - startTime;
      const timeRatio = Math.min(1.0, elapsed / TOTAL_INTRO_DURATION);

      // Verify asset loading readiness before finishing Scene D
      const isAssetsReady = !assetActive || assetProgress >= 100;

      // Smooth progress calculation
      let currentP = timeRatio;
      if (!isAssetsReady && timeRatio > 0.72) {
        // Hold briefly at Scene C while assets finalize
        currentP = 0.72;
      }

      setIntroProgress(currentP);

      if (currentP >= 1.0 && isAssetsReady) {
        setIsIntroActive(false);
        document.body.style.overflow = '';
        window.scrollTo(0, 0);
      } else {
        animFrameRef.current = requestAnimationFrame(step);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      document.body.style.overflow = '';
    };
  }, [assetActive, assetProgress, isIntroActive]);

  return (
    <>
      {/* Paper grain subtle tactile overlay */}
      <div className="paper-grain" aria-hidden="true" />

      {/* Custom Crosshair Cursor */}
      <CustomCursor />

      {/* Cinematic 3D Opening Title Overlay (Scenes A, B, C, D) */}
      <CinematicIntroOverlay
        introProgress={introProgress}
        isIntroActive={isIntroActive}
        assetLoadingProgress={assetActive ? assetProgress : 100}
      />

      {/* Root Container */}
      <div className="relative min-h-screen bg-[#11100E] text-[#F1ECE3] selection:bg-[#A65338] selection:text-[#F1ECE3]">
        {/* 1. ONE Persistent WebGL Canvas — Live from the very first frame */}
        <DigitalAtelierScene
          progress={progress}
          introProgress={introProgress}
          mouse={mouse}
          onSelectProject={(p) => setSelectedProject(p)}
          hoveredProjectId={hoveredProjectId}
          setHoveredProjectId={setHoveredProjectId}
        />

        {/* 2. Spatial HUD & Chapter Overlays — Smoothly emerges after awakening */}
        <SpatialHUD
          progress={progress}
          activeChapter={activeChapter}
          onSelectProject={(p) => setSelectedProject(p)}
          hoveredProjectId={hoveredProjectId}
          setHoveredProjectId={setHoveredProjectId}
          flyToChapter={flyToChapter}
          flyToProgress={flyToProgress}
          isIntroActive={isIntroActive}
        />

        {/* 3. Dedicated Invisible Scroll Track Driving GSAP Camera Journey */}
        <div
          className="relative w-full h-[900vh] pointer-events-none"
          aria-hidden="true"
        />

        {/* 4. Deep Case Study Monograph Modal */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </>
  );
};

export default App;
