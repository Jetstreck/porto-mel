import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraRig } from './CameraRig';
import { Atmosphere } from './Atmosphere';
import { ZoneEntrance } from './ZoneEntrance';
import { ZoneCreator } from './ZoneCreator';
import { ZoneExpertise } from './ZoneExpertise';
import { ZoneWorkshop } from './ZoneWorkshop';
import { ZoneConnection } from './ZoneConnection';
import type { Project } from '../../types';

interface DigitalAtelierSceneProps {
  progress: number;
  mouse: { x: number; y: number };
  onSelectProject: (project: Project) => void;
  hoveredProjectId: string | null;
  setHoveredProjectId: (id: string | null) => void;
}

export const DigitalAtelierScene: React.FC<DigitalAtelierSceneProps> = ({
  progress,
  mouse,
  onSelectProject,
  hoveredProjectId,
  setHoveredProjectId,
}) => {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-auto">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        camera={{
          position: [-1.2, 2.2, 11.0],
          fov: 40,
          near: 0.1,
          far: 110,
        }}
      >
        <Suspense fallback={null}>
          <CameraRig progress={progress} mouse={mouse} />
          <Atmosphere />

          {/* Spatial Zone 01: The Entrance (active 0.0 - 0.22) */}
          <ZoneEntrance progress={progress} />

          {/* Spatial Zone 02: The Creator Colonnade (active 0.12 - 0.42) */}
          <ZoneCreator progress={progress} />

          {/* Spatial Zone 03: The Expertise Pavilion (active 0.32 - 0.62) */}
          <ZoneExpertise progress={progress} />

          {/* Spatial Zone 04: The Workshop & 6 Interactive Portals (active 0.54 - 0.88) */}
          <ZoneWorkshop
            progress={progress}
            onSelectProject={onSelectProject}
            hoveredProjectId={hoveredProjectId}
            setHoveredProjectId={setHoveredProjectId}
          />

          {/* Spatial Zone 05: The Connection Gateway (active 0.80 - 1.00) */}
          <ZoneConnection progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
};
