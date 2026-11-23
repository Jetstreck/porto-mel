import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getSharedMoteTexture, type MoteItem } from './particleUtils';

export interface AmbientParticlesProps {
  progress: number;
  activeRange: [number, number];
  fadeInRange?: [number, number];
  fadeOutRange?: [number, number];
  motesData: MoteItem[];
  baseOpacity?: number;
  size?: number;
}

export const AmbientParticles: React.FC<AmbientParticlesProps> = ({
  progress,
  activeRange,
  fadeInRange,
  fadeOutRange,
  motesData,
  baseOpacity = 0.76,
  size = 0.046,
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const texture = useMemo(() => getSharedMoteTexture(), []);

  const { positions, colors } = useMemo(() => {
    const count = motesData.length;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const m = motesData[i];
      pos[i * 3 + 0] = m.baseX;
      pos[i * 3 + 1] = m.baseY;
      pos[i * 3 + 2] = m.baseZ;

      col[i * 3 + 0] = m.baseR;
      col[i * 3 + 1] = m.baseG;
      col[i * 3 + 2] = m.baseB;
    }

    return { positions: pos, colors: col };
  }, [motesData]);

  useFrame(({ clock }) => {
    if (!pointsRef.current || !materialRef.current) return;

    // Check strict active range
    const isVisible = progress >= activeRange[0] && progress <= activeRange[1];
    pointsRef.current.visible = isVisible;
    if (!isVisible) return;

    const t = clock.getElapsedTime();
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Calculate transition fade factor
    let fade = 1.0;
    if (fadeInRange && progress < fadeInRange[1]) {
      const span = Math.max(0.001, fadeInRange[1] - fadeInRange[0]);
      fade = Math.max(0, Math.min(1, (progress - fadeInRange[0]) / span));
    } else if (fadeOutRange && progress > fadeOutRange[0]) {
      const span = Math.max(0.001, fadeOutRange[1] - fadeOutRange[0]);
      fade = Math.max(0, Math.min(1, 1 - (progress - fadeOutRange[0]) / span));
    }

    materialRef.current.opacity = baseOpacity * fade;

    if (!prefersReducedMotion) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      const colAttr = pointsRef.current.geometry.attributes.color;
      const posArray = posAttr.array as Float32Array;
      const colArray = colAttr.array as Float32Array;

      for (let i = 0; i < motesData.length; i++) {
        const m = motesData[i];
        posArray[i * 3 + 0] = m.baseX + Math.sin(t * m.speedX + m.phaseX) * m.ampX;
        posArray[i * 3 + 1] = m.baseY + Math.sin(t * m.speedY + m.phaseY) * m.ampY;
        posArray[i * 3 + 2] = m.baseZ + Math.cos(t * m.speedZ + m.phaseZ) * m.ampZ;

        // Individual asynchronous twinkling
        const tw = 0.74 + 0.26 * Math.sin(t * m.twinkleSpeed + m.twinklePhase);
        colArray[i * 3 + 0] = m.baseR * tw;
        colArray[i * 3 + 1] = m.baseG * tw;
        colArray[i * 3 + 2] = m.baseB * tw;
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={size}
        sizeAttenuation={true}
        map={texture}
        transparent={true}
        opacity={baseOpacity}
        vertexColors={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
