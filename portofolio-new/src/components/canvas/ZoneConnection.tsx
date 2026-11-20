import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ZoneConnectionProps {
  progress: number;
}

// =========================================================================
// PROCEDURAL CANVAS TEXTURES: EDITORIAL ARCHITECTURAL ASSETS
// =========================================================================

/**
 * Architectural Sign Plaque Texture: Lintel Inscription
 * Clean typography in ivory & terracotta over dark honed basalt
 */
function generateLintelSignTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Background: Honed basalt stone
  ctx.fillStyle = '#181714';
  ctx.fillRect(0, 0, 1024, 160);

  // Subtle bronze architectural border
  ctx.strokeStyle = 'rgba(200, 162, 106, 0.45)';
  ctx.lineWidth = 3;
  ctx.strokeRect(12, 12, 1000, 136);

  // Inner framing accents
  ctx.strokeStyle = 'rgba(241, 236, 227, 0.15)';
  ctx.lineWidth = 1;
  ctx.strokeRect(20, 20, 984, 120);

  // Eyebrow label
  ctx.fillStyle = '#A65338';
  ctx.font = 'bold 15px "JetBrains Mono", monospace';
  ctx.letterSpacing = '6px';
  ctx.textAlign = 'center';
  ctx.fillText('CHAPTER 05 // THE CONNECTION LOUNGE', 512, 52);

  // Main inscription
  ctx.fillStyle = '#F1ECE3';
  ctx.font = 'bold 44px "Cinzel", "Playfair Display", Georgia, serif';
  ctx.letterSpacing = '8px';
  ctx.fillText("LET'S BUILD SOMETHING MEANINGFUL", 512, 104);

  // Bottom coordinates & seal
  ctx.fillStyle = 'rgba(225, 216, 202, 0.6)';
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.letterSpacing = '4px';
  ctx.fillText('STUDIO MELLINO • OPEN FOR COMMISSIONS • INDONESIA (WIB)', 512, 132);

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 4;
  return tex;
}

/**
 * Collaboration Tablet Screen Texture
 * Interface showing active correspondence protocol, status, and direct channels
 */
function generateTabletScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 340;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Slate background
  ctx.fillStyle = '#141311';
  ctx.fillRect(0, 0, 512, 340);

  // Subtle glowing display grid
  ctx.strokeStyle = 'rgba(241, 236, 227, 0.05)';
  ctx.lineWidth = 1;
  for (let x = 0; x < 512; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 340);
    ctx.stroke();
  }
  for (let y = 0; y < 340; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }

  // Header bar
  ctx.fillStyle = '#1E1D19';
  ctx.fillRect(0, 0, 512, 42);

  // Status indicator dot
  ctx.fillStyle = '#22C55E';
  ctx.beginPath();
  ctx.arc(24, 21, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#E1D8CA';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('COMMUNICATION PROTOCOL // ACTIVE', 40, 25);

  // Monogram box
  ctx.fillStyle = '#A65338';
  ctx.fillRect(40, 70, 48, 48);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 24px "Playfair Display", serif';
  ctx.textAlign = 'center';
  ctx.fillText('M', 64, 103);

  // Identity text
  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 18px "Inter", sans-serif';
  ctx.fillText('MELLINO', 104, 88);
  ctx.fillStyle = '#E1D8CA';
  ctx.font = '13px "Inter", sans-serif';
  ctx.fillText('Fullstack Developer & Creative Technologist', 104, 108);

  // Divider
  ctx.strokeStyle = 'rgba(241, 236, 227, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(40, 135);
  ctx.lineTo(472, 135);
  ctx.stroke();

  // Transmission cards preview
  const channels = [
    { name: 'EMAIL', val: 'contact.mellino@gmail.com', active: true },
    { name: 'LINKEDIN', val: 'linkedin.com/in/mellino', active: true },
    { name: 'GITHUB', val: 'github.com/mellino', active: true },
  ];

  channels.forEach((ch, idx) => {
    const yPos = 155 + idx * 52;
    ctx.fillStyle = '#1D1C19';
    ctx.fillRect(40, yPos, 432, 42);

    ctx.strokeStyle = 'rgba(166, 83, 56, 0.4)';
    ctx.strokeRect(40, yPos, 432, 42);

    ctx.fillStyle = '#A65338';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText(`[${ch.name}]`, 56, yPos + 26);

    ctx.fillStyle = '#F1ECE3';
    ctx.font = '13px "JetBrains Mono", monospace';
    ctx.fillText(ch.val, 140, yPos + 26);

    ctx.fillStyle = '#22C55E';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText('READY', 456, yPos + 26);
    ctx.textAlign = 'left';
  });

  // Footer status line
  ctx.fillStyle = 'rgba(225, 216, 202, 0.5)';
  ctx.font = '10px "JetBrains Mono", monospace';
  ctx.fillText('AWAITING INCOMING COMMISSIONS • INDONESIA (UTC+7)', 40, 324);

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 4;
  return tex;
}

/**
 * Open Monograph Magazine Spread Texture
 * Editorial graphic layout with typography and sketches on ivory rag paper
 */
function generateMonographTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Ivory textured paper background
  ctx.fillStyle = '#F1ECE3';
  ctx.fillRect(0, 0, 512, 360);

  // Spine shadow
  const grad = ctx.createLinearGradient(246, 0, 266, 0);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0.02)');
  grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.22)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0.02)');
  ctx.fillStyle = grad;
  ctx.fillRect(240, 0, 32, 360);

  // LEFT PAGE: Editorial Architecture & Floorplan
  ctx.fillStyle = '#A65338';
  ctx.font = 'bold 9px "JetBrains Mono", monospace';
  ctx.fillText('ARCHITECTURAL FOLIO // VOL. V', 32, 36);

  ctx.fillStyle = '#141311';
  ctx.font = 'bold 20px "Cinzel", "Playfair Display", Georgia, serif';
  ctx.fillText('SPATIAL CRAFT', 32, 66);

  ctx.fillStyle = '#755644';
  ctx.font = 'italic 11px Georgia, serif';
  ctx.fillText('A study in intentional digital environments.', 32, 84);

  // Stylized architectural floorplan diagram
  ctx.strokeStyle = '#755644';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(32, 105, 185, 130);
  ctx.strokeStyle = 'rgba(166, 83, 56, 0.4)';
  ctx.strokeRect(45, 118, 90, 65);
  ctx.strokeRect(145, 118, 60, 105);

  ctx.fillStyle = 'rgba(166, 83, 56, 0.15)';
  ctx.fillRect(45, 190, 90, 35);

  // Text paragraph lines
  ctx.fillStyle = '#1D1C19';
  for (let i = 0; i < 7; i++) {
    ctx.fillRect(32, 255 + i * 11, i === 6 ? 110 : 185, 2.5);
  }

  // RIGHT PAGE: Typographic Essay
  ctx.fillStyle = '#A65338';
  ctx.font = 'bold 9px "JetBrains Mono", monospace';
  ctx.fillText('ESSAY 02 // INTENTIONAL DESIGN', 285, 36);

  ctx.fillStyle = '#141311';
  ctx.font = 'bold 18px "Cinzel", "Playfair Display", Georgia, serif';
  ctx.fillText('THE DIGITAL LOUNGE', 285, 66);

  ctx.fillStyle = '#1D1C19';
  for (let i = 0; i < 16; i++) {
    ctx.fillRect(285, 95 + i * 13, i % 4 === 3 ? 120 : 190, 2.5);
  }

  // Bottom page numbers
  ctx.fillStyle = '#74705E';
  ctx.font = '10px "JetBrains Mono", monospace';
  ctx.fillText('148', 32, 340);
  ctx.fillText('149', 460, 340);

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 4;
  return tex;
}

/**
 * Dusk Horizon Gradient Texture for the panoramic opening
 */
function generateHorizonGradientTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  // Evening dusk into deep midnight blue-charcoal
  grad.addColorStop(0, '#0E0D0C');
  grad.addColorStop(0.35, '#1A1715');
  grad.addColorStop(0.65, '#2D1B15');
  grad.addColorStop(0.85, '#5C2D20');
  grad.addColorStop(1.0, '#A65338');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);

  // Subtle warm glowing horizon line
  ctx.fillStyle = 'rgba(255, 225, 190, 0.2)';
  ctx.fillRect(0, 240, 512, 16);

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// =========================================================================
// CHAPTER 05: THE CONNECTION LOUNGE 3D ENVIRONMENT
// =========================================================================

function createSeededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export const ZoneConnection: React.FC<ZoneConnectionProps> = ({ progress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const dustParticlesRef = useRef<THREE.Points>(null);

  // Generate memoized canvas textures
  const lintelSignTex = useMemo(() => generateLintelSignTexture(), []);
  const tabletScreenTex = useMemo(() => generateTabletScreenTexture(), []);
  const monographTex = useMemo(() => generateMonographTexture(), []);
  const horizonTex = useMemo(() => generateHorizonGradientTexture(), []);

  // Ambient Floating Dust Particles (38 motes in light cone) - Pure deterministic generation
  const [particlesGeo, particleData] = useMemo(() => {
    const rand = createSeededRandom(105);
    const count = 38;
    const positions = new Float32Array(count * 3);
    const data = [];

    for (let i = 0; i < count; i++) {
      const x = (rand() - 0.5) * 8.0;
      const y = 0.5 + rand() * 4.5;
      const z = -44.0 - rand() * 6.0;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      data.push({
        origY: y,
        origX: x,
        speed: 0.3 + rand() * 0.5,
        offset: rand() * Math.PI * 2,
      });
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return [geo, data];
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Visibility lifecycle: active from 0.84 onwards
    // Stationary continuous architecture - firmly rooted at y = 0
    const isVisible = progress >= 0.84;
    groupRef.current.visible = isVisible;
    if (!isVisible) return;

    groupRef.current.position.set(0, 0, 0);

    // Animate subtle floating dust particles
    if (dustParticlesRef.current) {
      const t = state.clock.getElapsedTime();
      const posAttr = dustParticlesRef.current.geometry.attributes.position;
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < particleData.length; i++) {
        const item = particleData[i];
        arr[i * 3 + 1] = item.origY + Math.sin(t * item.speed + item.offset) * 0.25;
        arr[i * 3] = item.origX + Math.cos(t * item.speed * 0.5 + item.offset) * 0.15;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ========================================================
          0. CONNECTING ARCHITECTURAL PASSAGE (PHASE C & D)
             Connecting Chapter 04 exit portal (z = -33.8) to
             The Connection Lounge platform (z = -39.8)
         ======================================================== */}
      {/* Passage Walkway Base Floor Slab */}
      <mesh position={[0, -1.65, -36.8]} receiveShadow>
        <boxGeometry args={[6.2, 0.35, 6.2]} />
        <meshStandardMaterial color="#181714" roughness={0.92} metalness={0.08} />
      </mesh>

      {/* Honed Basalt Corridor Runner */}
      <mesh position={[0, -1.46, -36.8]} receiveShadow>
        <boxGeometry args={[4.4, 0.04, 6.2]} />
        <meshStandardMaterial color="#1D1C19" roughness={0.88} metalness={0.1} />
      </mesh>

      {/* Brass Edge Detail Trims on Corridor Runner */}
      <mesh position={[-2.2, -1.43, -36.8]}>
        <boxGeometry args={[0.04, 0.02, 6.2]} />
        <meshStandardMaterial color="#C8A26A" roughness={0.35} metalness={0.8} />
      </mesh>
      <mesh position={[2.2, -1.43, -36.8]}>
        <boxGeometry args={[0.04, 0.02, 6.2]} />
        <meshStandardMaterial color="#C8A26A" roughness={0.35} metalness={0.8} />
      </mesh>

      {/* Stepped Architectural Threshold Risers (Gradual Rise to Lounge) */}
      {/* Step 1: z = -35.8, y = -1.45 */}
      <mesh position={[0, -1.48, -35.8]} receiveShadow>
        <boxGeometry args={[4.4, 0.12, 0.4]} />
        <meshStandardMaterial color="#E1D8CA" roughness={0.86} metalness={0.05} />
      </mesh>
      {/* Step 2: z = -37.8, y = -1.25 */}
      <mesh position={[0, -1.32, -37.8]} receiveShadow>
        <boxGeometry args={[4.4, 0.16, 0.4]} />
        <meshStandardMaterial color="#E1D8CA" roughness={0.86} metalness={0.05} />
      </mesh>
      {/* Step 3: Threshold Lintel into Lounge at z = -39.8 */}
      <mesh position={[0, -1.18, -39.8]} receiveShadow>
        <boxGeometry args={[6.2, 0.18, 0.4]} />
        <meshStandardMaterial color="#E1D8CA" roughness={0.86} metalness={0.05} />
      </mesh>

      {/* Left Corridor Flanking Wall */}
      <mesh position={[-3.1, 3.2, -36.8]} castShadow receiveShadow>
        <boxGeometry args={[0.4, 7.8, 6.2]} />
        <meshStandardMaterial color="#1A1916" roughness={0.9} metalness={0.08} />
      </mesh>
      {/* Left Wall Travertine Base Trim */}
      <mesh position={[-2.88, -1.25, -36.8]}>
        <boxGeometry args={[0.05, 0.25, 6.2]} />
        <meshStandardMaterial color="#E1D8CA" roughness={0.85} metalness={0.05} />
      </mesh>

      {/* Right Corridor Flanking Wall */}
      <mesh position={[3.1, 3.2, -36.8]} castShadow receiveShadow>
        <boxGeometry args={[0.4, 7.8, 6.2]} />
        <meshStandardMaterial color="#1A1916" roughness={0.9} metalness={0.08} />
      </mesh>
      {/* Right Wall Travertine Base Trim */}
      <mesh position={[2.88, -1.25, -36.8]}>
        <boxGeometry args={[0.05, 0.25, 6.2]} />
        <meshStandardMaterial color="#E1D8CA" roughness={0.85} metalness={0.05} />
      </mesh>

      {/* Overhead Walnut Timber Ceiling Transition Beams */}
      <mesh position={[0, 6.1, -35.5]} castShadow>
        <boxGeometry args={[6.2, 0.45, 0.35]} />
        <meshStandardMaterial color="#4A3528" roughness={0.75} metalness={0.04} />
      </mesh>
      <mesh position={[0, 6.1, -38.0]} castShadow>
        <boxGeometry args={[6.2, 0.45, 0.35]} />
        <meshStandardMaterial color="#4A3528" roughness={0.75} metalness={0.04} />
      </mesh>

      {/* Warm Indirect Corridor Downlight */}
      <pointLight
        position={[0, 4.8, -36.8]}
        color="#FFF2DC"
        intensity={2.2}
        distance={9.5}
        decay={2}
      />

      {/* Subtle Corridor Wall Sconces (Amber Architectural Glow) */}
      <mesh position={[-2.86, 2.2, -36.8]}>
        <boxGeometry args={[0.08, 0.35, 0.12]} />
        <meshStandardMaterial
          color="#FFF0D9"
          emissive="#A65338"
          emissiveIntensity={0.8}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[2.86, 2.2, -36.8]}>
        <boxGeometry args={[0.08, 0.35, 0.12]} />
        <meshStandardMaterial
          color="#FFF0D9"
          emissive="#A65338"
          emissiveIntensity={0.8}
          roughness={0.3}
        />
      </mesh>
      {/* ========================================================
          1. ARCHITECTURAL BASE & STEPPED TRAVERTINE PODIUM
         ======================================================== */}
      {/* Lower Basalt Base Slab */}
      <mesh position={[0, -1.35, -46.5]} receiveShadow>
        <boxGeometry args={[20.0, 0.3, 16.0]} />
        <meshStandardMaterial color="#1D1C19" roughness={0.92} metalness={0.08} />
      </mesh>

      {/* Main Travertine Limestone Lounge Platform */}
      <mesh position={[0, -1.05, -46.5]} receiveShadow>
        <boxGeometry args={[17.2, 0.3, 13.4]} />
        <meshStandardMaterial color="#E1D8CA" roughness={0.86} metalness={0.05} />
      </mesh>

      {/* Warm Perimeter Luminous LED Underglow Strip */}
      <mesh position={[0, -1.18, -46.5]}>
        <boxGeometry args={[17.4, 0.04, 13.6]} />
        <meshStandardMaterial
          color="#FFF0D9"
          emissive="#E1D8CA"
          emissiveIntensity={0.65}
          roughness={0.4}
        />
      </mesh>

      {/* Inset Honed Basalt Area Rug / Floor Inlay */}
      <mesh position={[-0.2, -0.89, -46.5]} receiveShadow>
        <boxGeometry args={[13.2, 0.02, 8.4]} />
        <meshStandardMaterial color="#181714" roughness={0.95} metalness={0.04} />
      </mesh>

      {/* Brass Edge Detail Trims on Inlay */}
      <mesh position={[-0.2, -0.875, -42.3]}>
        <boxGeometry args={[13.2, 0.015, 0.05]} />
        <meshStandardMaterial color="#C8A26A" roughness={0.35} metalness={0.8} />
      </mesh>
      <mesh position={[-0.2, -0.875, -50.7]}>
        <boxGeometry args={[13.2, 0.015, 0.05]} />
        <meshStandardMaterial color="#C8A26A" roughness={0.35} metalness={0.8} />
      </mesh>

      {/* ========================================================
          2. REAR ARCHITECTURAL WALL & PANORAMIC HORIZON APERTURE
         ======================================================== */}
      {/* Left Travertine Feature Wall Wing */}
      <mesh position={[-6.2, 2.6, -51.2]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 7.2, 0.9]} />
        <meshStandardMaterial color="#E1D8CA" roughness={0.88} metalness={0.04} />
      </mesh>

      {/* Right Travertine Feature Wall Wing */}
      <mesh position={[6.2, 2.6, -51.2]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 7.2, 0.9]} />
        <meshStandardMaterial color="#E1D8CA" roughness={0.88} metalness={0.04} />
      </mesh>

      {/* Flanking Aperture Inner Reveal Columns */}
      <mesh position={[-3.6, 2.6, -51.2]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 7.2, 1.1]} />
        <meshStandardMaterial color="#1D1C19" roughness={0.9} metalness={0.1} />
      </mesh>
      <mesh position={[3.6, 2.6, -51.2]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 7.2, 1.1]} />
        <meshStandardMaterial color="#1D1C19" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Low Stone Window Sill / Architectural Credenza Shelf */}
      <mesh position={[0, -0.4, -51.2]} castShadow receiveShadow>
        <boxGeometry args={[6.8, 0.6, 1.0]} />
        <meshStandardMaterial color="#755644" roughness={0.85} metalness={0.06} />
      </mesh>

      {/* Upper Monumental Transom Beam / Lintel */}
      <mesh position={[0, 5.8, -51.2]} castShadow receiveShadow>
        <boxGeometry args={[17.6, 1.1, 1.2]} />
        <meshStandardMaterial color="#E1D8CA" roughness={0.88} metalness={0.05} />
      </mesh>

      {/* Sculptural Bronze Sign Plaque Mounted on Lintel */}
      <mesh position={[0, 5.8, -50.56]}>
        <boxGeometry args={[6.2, 0.85, 0.04]} />
        <meshStandardMaterial
          map={lintelSignTex}
          roughness={0.65}
          metalness={0.25}
        />
      </mesh>

      {/* Warm Architectural Cove Wash on Wall */}
      <mesh position={[0, 5.18, -51.15]}>
        <boxGeometry args={[16.0, 0.05, 0.2]} />
        <meshStandardMaterial
          color="#FFF0D9"
          emissive="#A65338"
          emissiveIntensity={0.5}
          roughness={0.4}
        />
      </mesh>

      {/* Panoramic Dusk Sky Horizon Aperture Backdrop Plane */}
      <mesh position={[0, 2.6, -53.4]}>
        <planeGeometry args={[24.0, 12.0]} />
        <meshBasicMaterial map={horizonTex} />
      </mesh>

      {/* Distant Architectural Silhouette Accent */}
      <mesh position={[-1.2, 0.4, -53.0]}>
        <boxGeometry args={[1.6, 1.2, 0.1]} />
        <meshBasicMaterial color="#12100E" />
      </mesh>
      <mesh position={[1.8, 0.7, -53.0]}>
        <boxGeometry args={[2.2, 1.8, 0.1]} />
        <meshBasicMaterial color="#141210" />
      </mesh>

      {/* ========================================================
          3. CEILING TIMBER BEAMS & HANGING PENDANT LIGHT
         ======================================================== */}
      {/* Exposed Dark Walnut Overhead Architectural Beams */}
      {[-41.5, -43.8, -46.2, -48.5, -50.8].map((zPos, idx) => (
        <mesh key={`beam-${idx}`} position={[0, 6.1, zPos]} castShadow>
          <boxGeometry args={[17.4, 0.45, 0.35]} />
          <meshStandardMaterial color="#4A3528" roughness={0.75} metalness={0.04} />
        </mesh>
      ))}

      {/* Central Pendant Suspension Wire */}
      <mesh position={[0, 4.6, -46.2]}>
        <cylinderGeometry args={[0.008, 0.008, 3.0, 8]} />
        <meshStandardMaterial color="#1D1C19" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Spun Terracotta & Brass Pendant Lamp Cone */}
      <group position={[0, 3.1, -46.2]}>
        {/* Brass Top Mount Ring */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.08, 16]} />
          <meshStandardMaterial color="#C8A26A" roughness={0.3} metalness={0.85} />
        </mesh>
        {/* Terracotta Main Shade */}
        <mesh castShadow>
          <cylinderGeometry args={[0.12, 0.62, 0.38, 24]} />
          <meshStandardMaterial color="#A65338" roughness={0.62} metalness={0.12} />
        </mesh>
        {/* Brass Inner Reflector Ring */}
        <mesh position={[0, -0.19, 0]}>
          <cylinderGeometry args={[0.61, 0.61, 0.03, 24]} />
          <meshStandardMaterial color="#C8A26A" roughness={0.3} metalness={0.85} />
        </mesh>
      </group>

      {/* Warm Central Radial Pendant Light */}
      <pointLight
        position={[0, 2.7, -46.2]}
        color="#FFF2DC"
        intensity={3.2}
        distance={16}
        decay={2}
        castShadow
        shadow-bias={-0.001}
      />

      {/* ========================================================
          4. COLLABORATION COUNTER / WORKSTATION (LEFT SIDE)
             Position: x = -2.8, z = -46.0, rotY = 0.12
         ======================================================== */}
      <group position={[-2.8, 0, -46.0]} rotation={[0, 0.12, 0]}>
        {/* Solid Dark Walnut Pedestal Base */}
        <mesh position={[0, -0.42, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.95, 3.2]} />
          <meshStandardMaterial color="#4A3528" roughness={0.72} metalness={0.05} />
        </mesh>

        {/* Honed Black Basalt Stone Countertop */}
        <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.75, 0.08, 3.4]} />
          <meshStandardMaterial color="#1D1C19" roughness={0.78} metalness={0.15} />
        </mesh>

        {/* Brass Edge Trim on Table */}
        <mesh position={[0.88, 0.08, 0]}>
          <boxGeometry args={[0.015, 0.07, 3.4]} />
          <meshStandardMaterial color="#C8A26A" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* --- Brass Architectural Task Lamp --- */}
        <group position={[-0.45, 0.12, 0.9]}>
          {/* Circular Heavy Brass Base */}
          <mesh position={[0, 0.015, 0]} castShadow>
            <cylinderGeometry args={[0.13, 0.13, 0.03, 20]} />
            <meshStandardMaterial color="#C8A26A" roughness={0.3} metalness={0.85} />
          </mesh>
          {/* Slender Angled Stem */}
          <mesh position={[0.05, 0.28, -0.05]} rotation={[0.2, 0, -0.15]} castShadow>
            <cylinderGeometry args={[0.012, 0.012, 0.55, 12]} />
            <meshStandardMaterial color="#C8A26A" roughness={0.3} metalness={0.85} />
          </mesh>
          {/* Horizontal Arm */}
          <mesh position={[0.18, 0.52, -0.15]} rotation={[0, 0, 0.4]} castShadow>
            <cylinderGeometry args={[0.01, 0.01, 0.35, 12]} />
            <meshStandardMaterial color="#C8A26A" roughness={0.3} metalness={0.85} />
          </mesh>
          {/* Conical Lamp Shade */}
          <mesh position={[0.32, 0.48, -0.15]} rotation={[0, 0, -0.8]} castShadow>
            <cylinderGeometry args={[0.04, 0.11, 0.16, 16]} />
            <meshStandardMaterial color="#C8A26A" roughness={0.35} metalness={0.8} />
          </mesh>
          {/* Warm Desk Task Light Spot */}
          <pointLight
            position={[0.34, 0.42, -0.15]}
            color="#FFF6E5"
            intensity={2.0}
            distance={3.2}
            decay={2}
          />
        </group>

        {/* --- Minimalist Ceramic Japanese Mug / Cup --- */}
        <group position={[0.3, 0.12, 0.8]}>
          <mesh position={[0, 0.07, 0]} castShadow>
            <cylinderGeometry args={[0.065, 0.055, 0.14, 16]} />
            <meshStandardMaterial color="#E1D8CA" roughness={0.88} metalness={0.04} />
          </mesh>
          {/* Dark Tea / Coffee Liquid Surface */}
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.058, 0.058, 0.01, 16]} />
            <meshStandardMaterial color="#2E1C14" roughness={0.15} metalness={0.2} />
          </mesh>
        </group>

        {/* --- Collaboration Tablet Interface --- */}
        <group position={[0.15, 0.13, -0.15]} rotation={[-Math.PI / 2, 0, -0.08]}>
          {/* Matte Black Chassis */}
          <mesh castShadow>
            <boxGeometry args={[0.62, 0.42, 0.018]} />
            <meshStandardMaterial color="#1D1C19" roughness={0.7} metalness={0.3} />
          </mesh>
          {/* Luminous Display Face */}
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[0.59, 0.39]} />
            <meshStandardMaterial
              map={tabletScreenTex}
              roughness={0.35}
              metalness={0.1}
              emissive="#FFFFFF"
              emissiveIntensity={0.18}
            />
          </mesh>
        </group>

        {/* --- Stacked Architectural Hardcover Monographs --- */}
        <group position={[-0.25, 0.12, -0.95]} rotation={[0, -0.05, 0]}>
          {/* Bottom Book: Ivory Canvas Folio */}
          <mesh position={[0, 0.03, 0]} castShadow>
            <boxGeometry args={[0.65, 0.06, 0.85]} />
            <meshStandardMaterial color="#F1ECE3" roughness={0.92} metalness={0.02} />
          </mesh>
          {/* Terracotta Spine Accent */}
          <mesh position={[-0.32, 0.03, 0]}>
            <boxGeometry args={[0.02, 0.058, 0.85]} />
            <meshStandardMaterial color="#A65338" roughness={0.75} metalness={0.08} />
          </mesh>
          {/* Top Book: Dark Walnut Linen Folio */}
          <mesh position={[0.02, 0.08, -0.02]} rotation={[0, 0.08, 0]} castShadow>
            <boxGeometry args={[0.6, 0.045, 0.8]} />
            <meshStandardMaterial color="#755644" roughness={0.9} metalness={0.03} />
          </mesh>
        </group>

        {/* --- Two Minimalist Drafting Stools --- */}
        {[-0.6, 0.6].map((zOffset, sIdx) => (
          <group key={`stool-${sIdx}`} position={[-1.15, -0.42, zOffset]}>
            {/* Round Walnut Seat */}
            <mesh position={[0, 0.46, 0]} castShadow>
              <cylinderGeometry args={[0.26, 0.26, 0.05, 20]} />
              <meshStandardMaterial color="#5C4033" roughness={0.7} metalness={0.05} />
            </mesh>
            {/* Blackened Steel Central Stem & Tripod Legs */}
            <mesh position={[0, 0.22, 0]}>
              <cylinderGeometry args={[0.025, 0.025, 0.44, 12]} />
              <meshStandardMaterial color="#1D1C19" roughness={0.5} metalness={0.8} />
            </mesh>
            <mesh position={[0, 0.04, 0]}>
              <cylinderGeometry args={[0.22, 0.22, 0.03, 16]} />
              <meshStandardMaterial color="#1D1C19" roughness={0.5} metalness={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ========================================================
          5. LOUNGE SEATING CORNER & BOTANICALS (RIGHT SIDE)
             Position: x = 2.8, z = -46.5, rotY = -0.22
         ======================================================== */}
      <group position={[2.8, 0, -46.5]} rotation={[0, -0.22, 0]}>
        {/* --- Architectural Cantilever Armchair --- */}
        <group position={[0, 0, 0]}>
          {/* Blackened Steel Sled Frame Runners */}
          {[-0.62, 0.62].map((xOffset, fIdx) => (
            <group key={`sled-${fIdx}`} position={[xOffset, 0, 0]}>
              {/* Bottom Ground Rail */}
              <mesh position={[0, -0.84, 0]}>
                <boxGeometry args={[0.04, 0.04, 1.15]} />
                <meshStandardMaterial color="#1D1C19" roughness={0.4} metalness={0.8} />
              </mesh>
              {/* Front Vertical Support */}
              <mesh position={[0, -0.58, 0.54]}>
                <boxGeometry args={[0.04, 0.52, 0.04]} />
                <meshStandardMaterial color="#1D1C19" roughness={0.4} metalness={0.8} />
              </mesh>
              {/* Top Armrest Rail */}
              <mesh position={[0, -0.32, 0.05]}>
                <boxGeometry args={[0.04, 0.04, 1.05]} />
                <meshStandardMaterial color="#1D1C19" roughness={0.4} metalness={0.8} />
              </mesh>
              {/* Walnut Wood Armrest Cap */}
              <mesh position={[0, -0.29, 0.1]}>
                <boxGeometry args={[0.065, 0.025, 0.7]} />
                <meshStandardMaterial color="#4A3528" roughness={0.7} metalness={0.05} />
              </mesh>
            </group>
          ))}

          {/* Deep Cognac / Terracotta Leather Seat Cushion */}
          <mesh position={[0, -0.46, 0.08]} castShadow receiveShadow>
            <boxGeometry args={[1.2, 0.18, 1.05]} />
            <meshStandardMaterial color="#A65338" roughness={0.58} metalness={0.12} />
          </mesh>

          {/* Tufted Accent Stitch Seam */}
          <mesh position={[0, -0.365, 0.08]}>
            <boxGeometry args={[1.16, 0.015, 0.03]} />
            <meshStandardMaterial color="#755644" roughness={0.7} metalness={0.05} />
          </mesh>

          {/* Ergonomic Angled Leather Backrest */}
          <group position={[0, -0.05, -0.42]} rotation={[-0.18, 0, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.2, 0.82, 0.15]} />
              <meshStandardMaterial color="#A65338" roughness={0.58} metalness={0.12} />
            </mesh>
            {/* Top Headrest Cushion Band */}
            <mesh position={[0, 0.28, 0.04]}>
              <boxGeometry args={[1.15, 0.18, 0.06]} />
              <meshStandardMaterial color="#8E452E" roughness={0.62} metalness={0.1} />
            </mesh>
          </group>
        </group>

        {/* --- Fluted Dark Walnut Side Table --- */}
        <group position={[-1.25, -0.88, 0.4]}>
          {/* Fluted Cylindrical Base */}
          <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.38, 0.44, 0.64, 24]} />
            <meshStandardMaterial color="#5C4033" roughness={0.75} metalness={0.06} />
          </mesh>
          {/* Honed Stone Top Plate */}
          <mesh position={[0, 0.65, 0]} castShadow>
            <cylinderGeometry args={[0.42, 0.42, 0.03, 24]} />
            <meshStandardMaterial color="#1D1C19" roughness={0.8} metalness={0.1} />
          </mesh>

          {/* Open Monograph Publication on Table */}
          <mesh position={[0.02, 0.68, 0]} rotation={[-Math.PI / 2, 0, 0.25]} castShadow>
            <planeGeometry args={[0.48, 0.34]} />
            <meshStandardMaterial
              map={monographTex}
              roughness={0.9}
              metalness={0.02}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Minimalist Smoked Glass Paperweight Cylinder */}
          <mesh position={[0.18, 0.72, 0.08]} castShadow>
            <cylinderGeometry args={[0.045, 0.045, 0.08, 16]} />
            <meshPhysicalMaterial
              color="#1D1C19"
              roughness={0.1}
              transmission={0.85}
              thickness={0.5}
              transparent
              opacity={0.8}
            />
          </mesh>
        </group>

        {/* --- Sculptural Terracotta Planter & Olive Foliage (Botanical) --- */}
        <group position={[1.35, -0.88, -0.8]}>
          {/* Ribbed Cylindrical Terracotta Pot */}
          <mesh position={[0, 0.55, 0]} castShadow>
            <cylinderGeometry args={[0.55, 0.42, 1.1, 24]} />
            <meshStandardMaterial color="#A65338" roughness={0.7} metalness={0.1} />
          </mesh>
          {/* Pot Rim Lip */}
          <mesh position={[0, 1.11, 0]}>
            <cylinderGeometry args={[0.58, 0.55, 0.08, 24]} />
            <meshStandardMaterial color="#8E452E" roughness={0.68} metalness={0.1} />
          </mesh>
          {/* Dark Soil Bed */}
          <mesh position={[0, 1.05, 0]}>
            <cylinderGeometry args={[0.52, 0.52, 0.04, 16]} />
            <meshStandardMaterial color="#1A1815" roughness={0.95} metalness={0.02} />
          </mesh>

          {/* Central Trunk / Stem */}
          <mesh position={[0, 1.35, 0]}>
            <cylinderGeometry args={[0.03, 0.045, 0.65, 8]} />
            <meshStandardMaterial color="#4A3528" roughness={0.85} metalness={0.02} />
          </mesh>

          {/* Sculptural Broad Ficus / Monstera Leaves (Art-directed fan leaves) */}
          {[
            { pos: [-0.25, 1.5, 0.2] as const, rot: [0.35, -0.6, -0.3] as const, scale: [0.35, 0.65, 0.01] as const, col: '#74705E' },
            { pos: [0.3, 1.65, 0.15] as const, rot: [0.25, 0.8, 0.35] as const, scale: [0.38, 0.72, 0.01] as const, col: '#646654' },
            { pos: [-0.15, 1.85, -0.25] as const, rot: [-0.4, -0.2, 0.1] as const, scale: [0.32, 0.68, 0.01] as const, col: '#74705E' },
            { pos: [0.22, 1.95, -0.18] as const, rot: [-0.3, 0.9, -0.2] as const, scale: [0.36, 0.7, 0.01] as const, col: '#5A5949' },
            { pos: [0.0, 2.15, 0.05] as const, rot: [0.15, 0.1, 0.05] as const, scale: [0.3, 0.6, 0.01] as const, col: '#74705E' },
          ].map((leaf, lIdx) => (
            <mesh
              key={`leaf-${lIdx}`}
              position={leaf.pos}
              rotation={leaf.rot}
              scale={leaf.scale}
              castShadow
            >
              <sphereGeometry args={[1, 16, 12]} />
              <meshStandardMaterial
                color={leaf.col}
                roughness={0.72}
                metalness={0.06}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* ========================================================
          6. AMBIENT ATMOSPHERIC DUST MOTES (FLOATING PARTICLES)
         ======================================================== */}
      <points ref={dustParticlesRef} geometry={particlesGeo}>
        <pointsMaterial
          size={0.045}
          color="#FFF2DC"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};
