import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/layout/CustomCursor';
import { DigitalAtelierScene } from './components/canvas/DigitalAtelierScene';
import { SpatialHUD } from './components/overlay/SpatialHUD';
import { FirstImpressionPreloader } from './components/animations/FirstImpressionPreloader';
import { ProjectDetailModal } from './components/projects/ProjectDetailModal';
import { useCameraJourney } from './hooks/useCameraJourney';
import type { Project } from './types';

export const App: React.FC = () => {
  const [isPreloading, setIsPreloading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // GSAP ScrollTrigger Camera Journey Controller
  const [{ progress, activeChapter, mouse }, flyToChapter, flyToProgress] = useCameraJourney();

  // Keep scroll locked at 0 during preloader sequence
  useEffect(() => {
    if (isPreloading) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPreloading]);

  return (
    <>
      {/* Paper grain subtle tactile overlay */}
      <div className="paper-grain" aria-hidden="true" />

      {/* Custom Crosshair Cursor */}
      <CustomCursor />

      {/* Independent Full-Screen Opening Sequence: The First Impression */}
      {isPreloading && (
        <FirstImpressionPreloader onComplete={() => setIsPreloading(false)} />
      )}

      {/* Root Container */}
      <div className="relative min-h-screen bg-[#11100E] text-[#F1ECE3] selection:bg-[#A65338] selection:text-[#F1ECE3]">
        {/* 1. ONE Persistent WebGL Canvas — Initializes assets underneath */}
        <DigitalAtelierScene
          progress={progress}
          mouse={mouse}
          onSelectProject={(p) => setSelectedProject(p)}
          hoveredProjectId={hoveredProjectId}
          setHoveredProjectId={setHoveredProjectId}
        />

        {/* 2. Spatial HUD & Chapter Overlays — Revealed after preloader lifts */}
        <SpatialHUD
          progress={progress}
          activeChapter={activeChapter}
          onSelectProject={(p) => setSelectedProject(p)}
          hoveredProjectId={hoveredProjectId}
          setHoveredProjectId={setHoveredProjectId}
          flyToChapter={flyToChapter}
          flyToProgress={flyToProgress}
          isIntroActive={isPreloading}
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
