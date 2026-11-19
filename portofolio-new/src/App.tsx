import React, { useState } from 'react';
import { Preloader } from './components/animations/Preloader';
import { CustomCursor } from './components/layout/CustomCursor';
import { DigitalAtelierScene } from './components/canvas/DigitalAtelierScene';
import { SpatialHUD } from './components/overlay/SpatialHUD';
import { ProjectDetailModal } from './components/projects/ProjectDetailModal';
import { useCameraJourney } from './hooks/useCameraJourney';
import type { Project } from './types';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // GSAP ScrollTrigger Camera Journey Controller
  const [{ progress, activeChapter, mouse }, flyToChapter, flyToProgress] = useCameraJourney();

  return (
    <>
      {/* Paper grain subtle tactile overlay */}
      <div className="paper-grain" aria-hidden="true" />

      {/* Custom Crosshair Cursor */}
      <CustomCursor />

      {/* Preloader */}
      {isLoading && (
        <Preloader onComplete={() => setIsLoading(false)} />
      )}

      {/* Root Container */}
      <div className="relative min-h-screen bg-[#11100E] text-[#F1ECE3] selection:bg-[#A65338] selection:text-[#F1ECE3]">
        {/* 1. ONE Persistent WebGL Canvas — The Primary Navigation & World */}
        <DigitalAtelierScene
          progress={progress}
          mouse={mouse}
          onSelectProject={(p) => setSelectedProject(p)}
          hoveredProjectId={hoveredProjectId}
          setHoveredProjectId={setHoveredProjectId}
        />

        {/* 2. Spatial HUD & Synchronized Chapter Overlays (In-situ, not stacked sections) */}
        <SpatialHUD
          progress={progress}
          activeChapter={activeChapter}
          onSelectProject={(p) => setSelectedProject(p)}
          hoveredProjectId={hoveredProjectId}
          setHoveredProjectId={setHoveredProjectId}
          flyToChapter={flyToChapter}
          flyToProgress={flyToProgress}
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
