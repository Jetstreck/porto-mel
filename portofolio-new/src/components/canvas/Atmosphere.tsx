import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 180;
const PARTICLE_POSITIONS = new Float32Array(PARTICLE_COUNT * 3);

// Deterministic particle distribution at module level
for (let i = 0; i < PARTICLE_COUNT; i++) {
  // Simple deterministic distribution
  const angle = (i / PARTICLE_COUNT) * Math.PI * 2 * 7;
  const radius = ((i * 13) % 18) + 1;
  PARTICLE_POSITIONS[i * 3] = Math.cos(angle) * radius;
  PARTICLE_POSITIONS[i * 3 + 1] = ((i * 7) % 14) - 1;
  PARTICLE_POSITIONS[i * 3 + 2] = -((i * 17) % 55);
}

interface AtmosphereProps {
  introProgress?: number;
}

export const Atmosphere: React.FC<AtmosphereProps> = ({ introProgress = 1.0 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
    }

    // Dynamic light awakening based on introProgress
    const t = Math.min(1.0, Math.max(0.0, introProgress));
    // Scene A (0.0 - 0.25): dark silhouette with rim lighting
    // Scene B (0.25 - 0.75): smooth awakening bloom to full daylight
    const awakenFactor = t < 0.2 ? 0.1 : Math.min(1.0, (t - 0.2) / 0.6);

    if (dirLightRef.current) {
      dirLightRef.current.intensity = THREE.MathUtils.lerp(0.3, 2.4, awakenFactor);
    }
    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = THREE.MathUtils.lerp(0.12, 0.9, awakenFactor);
    }
  });

  return (
    <>
      {/* Deep charcoal architectural fog */}
      <color attach="background" args={['#11100E']} />
      <fog attach="fog" args={['#11100E', 10, 58]} />

      {/* Main Directional Architectural Sunlight */}
      <directionalLight
        ref={dirLightRef}
        position={[14, 22, 12]}
        intensity={2.4}
        color="#FFF6E8"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={65}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0001}
      />

      {/* Warm limestone ambient fill */}
      <ambientLight ref={ambientLightRef} intensity={0.9} color="#E1D8CA" />

      {/* Secondary Terracotta Rim Light */}
      <directionalLight
        position={[-15, -6, -25]}
        intensity={1.6}
        color="#A65338"
      />

      {/* Ground Architectural Plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.8, -25]}
        receiveShadow
      >
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial
          color="#161513"
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>

      {/* Subtle Dust Particles in the Air */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[PARTICLE_POSITIONS, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          color="#E1D8CA"
          transparent
          opacity={0.35}
          sizeAttenuation
        />
      </points>
    </>
  );
};
