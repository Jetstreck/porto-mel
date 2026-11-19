import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ZoneConnectionProps {
  progress: number;
}

export const ZoneConnection: React.FC<ZoneConnectionProps> = ({ progress }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;

    // Visibility lifecycle: active from 0.88 onwards (Stage 05 closing & Chapter 05 Contact)
    const isVisible = progress >= 0.88;
    groupRef.current.visible = isVisible;
    if (!isVisible) return;

    // Smooth transition in (0.88 to 0.94)
    const factor = Math.min(1, Math.max(0, (progress - 0.88) / 0.06));
    groupRef.current.position.y = (1 - factor) * -4.0;
  });

  return (
    // Positioned at z = -48, framing the horizon
    <group ref={groupRef} position={[0, 0, -48]}>
      {/* Central Grand Architectural Portal Gateway */}
      {/* Left Monolith Pylon (shifted outward to x = -4.8 to keep center completely open for text) */}
      <mesh position={[-4.8, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 9.5, 1.6]} />
        <meshStandardMaterial color="#1E1D19" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Right Monolith Pylon (shifted outward to x = +4.8) */}
      <mesh position={[4.8, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 9.5, 1.6]} />
        <meshStandardMaterial color="#1E1D19" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Massive Cross Lintel */}
      <mesh position={[0, 8.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[12.0, 1.0, 1.8]} />
        <meshStandardMaterial color="#E1D8CA" roughness={0.88} metalness={0.05} />
      </mesh>

      {/* Stepped Limestone Platform */}
      <mesh position={[0, -1.2, 0]} receiveShadow>
        <boxGeometry args={[14, 0.4, 7]} />
        <meshStandardMaterial color="#755644" roughness={0.85} metalness={0.06} />
      </mesh>

      {/* Central Terracotta Luminous Monolith Base (low in the scene, not blocking text) */}
      <mesh position={[0, 0.5, -3.0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 2.8, 1.0]} />
        <meshStandardMaterial
          color="#A65338"
          roughness={0.65}
          metalness={0.2}
          emissive="#A65338"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
};
