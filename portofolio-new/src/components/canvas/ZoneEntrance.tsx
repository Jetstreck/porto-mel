import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ZoneEntranceProps {
  progress: number;
}

// =========================================================================
// PROCEDURAL CANVAS TEXTURES: AUTHENTIC CODE EDITOR & TABLET UI
// =========================================================================

function generateCodeEditorTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 576;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Background
  ctx.fillStyle = '#151412';
  ctx.fillRect(0, 0, 1024, 576);

  // Window titlebar
  ctx.fillStyle = '#1E1D19';
  ctx.fillRect(0, 0, 1024, 40);

  // Window control dots (muted portfolio tones)
  const dots = ['#A65338', '#D4A373', '#74705E'];
  dots.forEach((color, i) => {
    ctx.beginPath();
    ctx.arc(24 + i * 20, 20, 5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  });

  // Editor Tabs
  ctx.fillStyle = '#2A2824';
  ctx.fillRect(96, 6, 175, 34);
  ctx.fillStyle = '#F1ECE3';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText('AtelierStudio.tsx', 114, 28);

  ctx.fillStyle = '#1E1D19';
  ctx.fillRect(276, 6, 145, 34);
  ctx.fillStyle = '#8C877D';
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.fillText('cameraSpline.ts', 292, 28);

  // Left Sidebar: File Explorer
  ctx.fillStyle = '#11100E';
  ctx.fillRect(0, 40, 230, 496);

  ctx.fillStyle = '#A65338';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('EXPLORER // MELLINO-CORE', 18, 66);

  const fileTree = [
    { name: '▾ src', indent: 18, color: '#F1ECE3', bold: true },
    { name: '  ▾ atelier-3d', indent: 18, color: '#E1D8CA', bold: false },
    { name: '    ZoneEntrance.tsx', indent: 18, color: '#A65338', bold: true, active: true },
    { name: '    CameraRig.tsx', indent: 18, color: '#A39D91', bold: false },
    { name: '    SpatialHUD.tsx', indent: 18, color: '#A39D91', bold: false },
    { name: '  ▾ engineering', indent: 18, color: '#E1D8CA', bold: false },
    { name: '    threePipeline.ts', indent: 18, color: '#A39D91', bold: false },
    { name: '    materials.ts', indent: 18, color: '#A39D91', bold: false },
    { name: '  portfolio.config.ts', indent: 18, color: '#74705E', bold: false },
    { name: '  package.json', indent: 18, color: '#74705E', bold: false },
  ];

  fileTree.forEach((f, idx) => {
    const y = 92 + idx * 24;
    if (f.active) {
      ctx.fillStyle = '#262420';
      ctx.fillRect(0, y - 16, 230, 22);
      ctx.fillStyle = '#A65338';
      ctx.fillRect(0, y - 16, 3, 22);
    }
    ctx.fillStyle = f.color;
    ctx.font = `${f.bold ? 'bold ' : ''}12px "JetBrains Mono", monospace`;
    ctx.fillText(f.name, f.indent, y);
  });

  // Editor Code Gutter
  ctx.fillStyle = '#181715';
  ctx.fillRect(230, 40, 48, 496);

  // Syntax highlighted code lines
  const codeLines = [
    { num: '01', tokens: [{ text: 'import ', color: '#A65338' }, { text: '{ createAtelier } ', color: '#F1ECE3' }, { text: 'from ', color: '#A65338' }, { text: "'@mellino/core';", color: '#84A98C' }] },
    { num: '02', tokens: [{ text: 'import type ', color: '#D4A373' }, { text: '{ CreativeCraft } ', color: '#F1ECE3' }, { text: 'from ', color: '#A65338' }, { text: "'./types';", color: '#84A98C' }] },
    { num: '03', tokens: [] },
    { num: '04', tokens: [{ text: 'export const ', color: '#A65338' }, { text: 'CreativeWorkshop ', color: '#E1D8CA' }, { text: '= () => {', color: '#F1ECE3' }] },
    { num: '05', tokens: [{ text: '  const ', color: '#A65338' }, { text: 'studio ', color: '#E1D8CA' }, { text: '= ', color: '#F1ECE3' }, { text: 'useAtelier', color: '#D4A373' }, { text: '({', color: '#F1ECE3' }] },
    { num: '06', tokens: [{ text: '    aesthetic: ', color: '#A39D91' }, { text: "'Warm Brutalism'", color: '#84A98C' }, { text: ',', color: '#F1ECE3' }] },
    { num: '07', tokens: [{ text: '    discipline: ', color: '#A39D91' }, { text: "'Fullstack Engineering'", color: '#84A98C' }, { text: ',', color: '#F1ECE3' }] },
    { num: '08', tokens: [{ text: '    framerate: ', color: '#A39D91' }, { text: '60', color: '#D4A373' }, { text: ',', color: '#F1ECE3' }] },
    { num: '09', tokens: [{ text: '  });', color: '#F1ECE3' }] },
    { num: '10', tokens: [] },
    { num: '11', tokens: [{ text: '  return ', color: '#A65338' }, { text: '(', color: '#F1ECE3' }] },
    { num: '12', tokens: [{ text: '    <InteractiveWorld ', color: '#D4A373' }, { text: 'precision="editorial">', color: '#84A98C' }] },
    { num: '13', tokens: [{ text: '      <BespokeCraft ', color: '#D4A373' }, { text: 'intentional={true} />', color: '#A65338' }] },
    { num: '14', tokens: [{ text: '    </InteractiveWorld>', color: '#D4A373' }] },
    { num: '15', tokens: [{ text: '  );', color: '#F1ECE3' }] },
    { num: '16', tokens: [{ text: '};', color: '#F1ECE3' }] },
  ];

  codeLines.forEach((line, idx) => {
    const y = 72 + idx * 26;
    ctx.fillStyle = '#5A564F';
    ctx.font = '12px "JetBrains Mono", monospace';
    ctx.fillText(line.num, 244, y);

    let x = 294;
    line.tokens.forEach((tok) => {
      ctx.fillStyle = tok.color;
      ctx.font = '13px "JetBrains Mono", monospace';
      ctx.fillText(tok.text, x, y);
      x += ctx.measureText(tok.text).width;
    });
  });

  // Terminal Status Bar
  ctx.fillStyle = '#0F0E0D';
  ctx.fillRect(0, 536, 1024, 40);

  ctx.fillStyle = '#22C55E';
  ctx.beginPath();
  ctx.arc(22, 556, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#E1D8CA';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('ONLINE', 34, 560);

  ctx.fillStyle = '#74705E';
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillText('│  vite v5.4.1 ready in 184ms  │  0 errors  │  branch: main*', 92, 560);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

function generateTabletTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#181715';
  ctx.fillRect(0, 0, 512, 360);

  // App wireframe border
  ctx.strokeStyle = '#38342E';
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, 472, 320);

  // Brand header
  ctx.fillStyle = '#A65338';
  ctx.fillRect(34, 34, 110, 16);

  // Wireframe cards
  ctx.fillStyle = '#24221D';
  ctx.fillRect(34, 64, 210, 140);
  ctx.fillRect(260, 64, 218, 65);
  ctx.fillRect(260, 139, 218, 65);

  // Wireframe curve
  ctx.beginPath();
  ctx.moveTo(34, 275);
  ctx.bezierCurveTo(120, 210, 210, 310, 320, 230);
  ctx.lineTo(478, 260);
  ctx.strokeStyle = '#D4A373';
  ctx.lineWidth = 3;
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  return texture;
}

// =========================================================================
// SUBTLE AMBIENT WORKSHOP MOTES (ILLUMINATED DUST PARTICLES)
// =========================================================================

function generateMoteTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
    gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.85)');
    gradient.addColorStop(0.55, 'rgba(255, 255, 255, 0.35)');
    gradient.addColorStop(0.85, 'rgba(255, 255, 255, 0.08)');
    gradient.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

interface MoteItem {
  baseX: number;
  baseY: number;
  baseZ: number;
  ampX: number;
  ampY: number;
  ampZ: number;
  speedX: number;
  speedY: number;
  speedZ: number;
  phaseX: number;
  phaseY: number;
  phaseZ: number;
  twinkleSpeed: number;
  twinklePhase: number;
  baseR: number;
  baseG: number;
  baseB: number;
}

function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const WorkshopAmbientMotes: React.FC<{ progress: number }> = ({ progress }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const moteTexture = useMemo(() => generateMoteTexture(), []);

  const { motesData, positions, colors } = useMemo(() => {
    const rand = seededRandom(1042);
    const motes: MoteItem[] = [];
    const count = 180; // 100 Background + 60 Midground + 20 Foreground
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const warmIvory = new THREE.Color('#FFF8EB');
    const champagneWhite = new THREE.Color('#F4EFE6');
    const goldenLinen = new THREE.Color('#E6DDD0');
    const subtleRust = new THREE.Color('#C47B60');

    for (let i = 0; i < count; i++) {
      let bx = 0;
      let by = 0;
      let bz = 0;

      let ampX = 0;
      let ampY = 0;
      let ampZ = 0;
      let speedX = 0;
      let speedY = 0;
      let speedZ = 0;

      if (i < 100) {
        // =====================================================================
        // LAYER 1: DISTANT BACKGROUND & WIDE ATMOSPHERE (100 particles)
        // Spans the entire visible camera view: left edge, right edge, high ceiling,
        // and deep behind the diorama plinth.
        // =====================================================================
        bx = (rand() - 0.5) * 15.0; // [-7.5, 7.5] widescreen coverage
        by = 0.2 + rand() * 5.6;    // [0.2, 5.8] from floor up to high overhead space
        bz = -1.6 - rand() * 4.6;   // [-1.6, -6.2] deep atmospheric background

        ampX = 0.02 + rand() * 0.035;
        ampY = 0.035 + rand() * 0.06;
        ampZ = 0.02 + rand() * 0.03;

        speedX = 0.15 + rand() * 0.25;
        speedY = 0.25 + rand() * 0.35;
        speedZ = 0.15 + rand() * 0.25;
      } else if (i < 160) {
        // =====================================================================
        // LAYER 2: MIDGROUND WORKSHOP ATMOSPHERE (60 particles)
        // Wraps organically around the active creative workshop: monitor, desk,
        // chair, bookshelf, and lateral studio flanks.
        // =====================================================================
        const midIndex = i - 100;
        if (midIndex < 24) {
          // Sub-zone A: Behind PC setup and monitor top
          bx = (rand() - 0.5) * 2.6; // [-1.3, 1.3]
          by = 1.45 + rand() * 1.65; // [1.45, 3.1]
          bz = -0.65 - rand() * 0.85;// [-0.65, -1.5]
        } else if (midIndex < 38) {
          // Sub-zone B: Left workshop wing and task lamp aura
          bx = -1.2 - rand() * 2.3;  // [-3.5, -1.2]
          by = 0.8 + rand() * 2.2;   // [0.8, 3.0]
          bz = -0.8 + rand() * 1.5;  // [-0.8, 0.7]
        } else if (midIndex < 52) {
          // Sub-zone C: Right workshop wing, bookshelf silhouette & upper books
          bx = 1.3 + rand() * 2.4;   // [1.3, 3.7]
          by = 0.8 + rand() * 2.4;   // [0.8, 3.2]
          bz = -0.8 + rand() * 1.5;  // [-0.8, 0.7]
        } else {
          // Sub-zone D: Peripheral workshop plinth flanks
          const side = rand() > 0.5 ? 1 : -1;
          bx = side * (1.2 + rand() * 1.2);
          by = 0.4 + rand() * 1.4;
          bz = 0.3 + rand() * 1.0;
        }

        ampX = 0.015 + rand() * 0.03;
        ampY = 0.03 + rand() * 0.05;
        ampZ = 0.015 + rand() * 0.025;

        speedX = 0.2 + rand() * 0.3;
        speedY = 0.3 + rand() * 0.4;
        speedZ = 0.2 + rand() * 0.25;
      } else {
        // =====================================================================
        // LAYER 3: FOREGROUND ATMOSPHERIC DEPTH (20 particles)
        // Subtle, sparse floating motes in front of the workshop adding genuine 3D
        // depth. Strictly placed away from the monitor screen to protect UI readability.
        // =====================================================================
        const fgIndex = i - 160;
        if (fgIndex < 8) {
          // Left foreground
          bx = -1.3 - rand() * 2.2;  // [-3.5, -1.3]
          by = 0.8 + rand() * 2.8;   // [0.8, 3.6]
          bz = 1.6 + rand() * 2.2;   // [1.6, 3.8]
        } else if (fgIndex < 16) {
          // Right foreground
          bx = 1.3 + rand() * 2.2;   // [1.3, 3.5]
          by = 0.8 + rand() * 2.8;   // [0.8, 3.6]
          bz = 1.6 + rand() * 2.2;   // [1.6, 3.8]
        } else {
          // High upper foreground canopy (well above the monitor)
          bx = (rand() - 0.5) * 3.0; // [-1.5, 1.5]
          by = 3.3 + rand() * 1.3;   // [3.3, 4.6]
          bz = 1.5 + rand() * 1.8;   // [1.5, 3.3]
        }

        ampX = 0.02 + rand() * 0.035;
        ampY = 0.04 + rand() * 0.055;
        ampZ = 0.02 + rand() * 0.03;

        speedX = 0.18 + rand() * 0.25;
        speedY = 0.28 + rand() * 0.35;
        speedZ = 0.18 + rand() * 0.22;
      }

      // Elegant editorial palette distribution:
      // ~60% Warm Ivory, ~25% Champagne White, ~10% Golden Linen, ~5% Subtle Rust
      let c = warmIvory;
      const colRand = rand();
      if (colRand < 0.07) {
        c = subtleRust;
      } else if (colRand < 0.20) {
        c = goldenLinen;
      } else if (colRand < 0.45) {
        c = champagneWhite;
      }

      const mote: MoteItem = {
        baseX: bx,
        baseY: by,
        baseZ: bz,
        ampX,
        ampY,
        ampZ,
        speedX,
        speedY,
        speedZ,
        phaseX: rand() * Math.PI * 2,
        phaseY: rand() * Math.PI * 2,
        phaseZ: rand() * Math.PI * 2,
        twinkleSpeed: 0.8 + rand() * 1.6,
        twinklePhase: rand() * Math.PI * 2,
        baseR: c.r,
        baseG: c.g,
        baseB: c.b,
      };
      motes.push(mote);

      pos[i * 3 + 0] = bx;
      pos[i * 3 + 1] = by;
      pos[i * 3 + 2] = bz;

      col[i * 3 + 0] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { motesData: motes, positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current || !materialRef.current) return;
    if (progress > 0.22) return;

    const t = clock.getElapsedTime();
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Smooth exit fade tied to Chapter 01 transition
    let fade = 1.0;
    if (progress > 0.12) {
      fade = Math.max(0, 1 - (progress - 0.12) / 0.1);
    }
    materialRef.current.opacity = 0.76 * fade;

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

        // Individual asynchronous twinkling with unique frequency & phase
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
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.046}
        sizeAttenuation={true}
        map={moteTexture}
        transparent={true}
        opacity={0.76}
        vertexColors={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// =========================================================================
// ZONE ENTRANCE: THE CREATIVE WORKSHOP DIORAMA
// =========================================================================

export const ZoneEntrance: React.FC<ZoneEntranceProps> = ({ progress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const chairRef = useRef<THREE.Group>(null);
  const lampLightRef = useRef<THREE.SpotLight>(null);

  // Procedural Screen Textures
  const codeEditorTexture = useMemo(() => generateCodeEditorTexture(), []);
  const tabletTexture = useMemo(() => generateTabletTexture(), []);

  // Bookshelf books configuration
  const books = useMemo(
    () => [
      { color: '#A65338', width: 0.05, height: 0.32, depth: 0.24, title: 'CRAFT' },
      { color: '#1E1D1A', width: 0.045, height: 0.28, depth: 0.22, title: 'SYSTEMS' },
      { color: '#74705E', width: 0.06, height: 0.35, depth: 0.25, title: 'DESIGN' },
      { color: '#F1ECE3', width: 0.038, height: 0.3, depth: 0.23, title: 'CODE' },
      { color: '#755644', width: 0.052, height: 0.31, depth: 0.24, title: 'ARCH' },
    ],
    []
  );

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;

    // Strict Visibility Lifecycle: active 0.0 -> 0.22
    const isVisible = progress <= 0.22;
    groupRef.current.visible = isVisible;
    if (!isVisible) return;

    // Smooth exit downward slide and fade between 0.14 and 0.22
    if (progress > 0.14) {
      const exitFactor = Math.max(0, 1 - (progress - 0.14) / 0.08);
      groupRef.current.position.y = -0.5 - (1 - exitFactor) * 3.5;
    } else {
      groupRef.current.position.y = -0.5;
    }

    const t = clock.getElapsedTime();

    // Subtle interactive pointer parallax
    groupRef.current.rotation.y = pointer.x * 0.03;
    groupRef.current.rotation.x = -pointer.y * 0.015;

    // Subtle breathing / idle motion on office chair
    if (chairRef.current) {
      chairRef.current.rotation.y = 0.26 + Math.sin(t * 0.6) * 0.025;
    }

    // Subtle gentle pulse on desk lamp intensity
    if (lampLightRef.current) {
      lampLightRef.current.intensity = 3.2 + Math.sin(t * 2.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0.9, -0.5, 0]}>
      {/* ========================================================
          1. ARCHITECTURAL PLINTH & WOVEN STUDIO FLOOR RUG
         ======================================================== */}
      {/* Honed Basalt Plinth */}
      <mesh position={[0.0, -0.15, 0.2]} receiveShadow>
        <boxGeometry args={[5.8, 0.24, 4.6]} />
        <meshStandardMaterial color="#181715" roughness={0.92} metalness={0.08} />
      </mesh>

      {/* Recessed Negative Shadow Gap */}
      <mesh position={[0.0, -0.01, 0.2]}>
        <boxGeometry args={[5.5, 0.04, 4.3]} />
        <meshStandardMaterial color="#0B0A09" roughness={1.0} />
      </mesh>

      {/* Herringbone Woven Studio Rug */}
      <mesh position={[0.0, 0.02, 0.3]} receiveShadow>
        <boxGeometry args={[4.4, 0.02, 3.4]} />
        <meshStandardMaterial color="#D8D1C4" roughness={0.96} metalness={0.02} />
      </mesh>

      {/* Rug Charcoal Border Trim */}
      <mesh position={[0.0, 0.032, 0.3]}>
        <boxGeometry args={[4.44, 0.008, 0.04]} />
        <meshStandardMaterial color="#211F1C" roughness={0.9} />
      </mesh>
      <mesh position={[0.0, 0.032, -1.38]}>
        <boxGeometry args={[4.44, 0.008, 0.04]} />
        <meshStandardMaterial color="#211F1C" roughness={0.9} />
      </mesh>
      <mesh position={[-2.18, 0.032, 0.3]}>
        <boxGeometry args={[0.04, 0.008, 3.4]} />
        <meshStandardMaterial color="#211F1C" roughness={0.9} />
      </mesh>
      <mesh position={[2.18, 0.032, 0.3]}>
        <boxGeometry args={[0.04, 0.008, 3.4]} />
        <meshStandardMaterial color="#211F1C" roughness={0.9} />
      </mesh>

      {/* ========================================================
          2. SOLID WALNUT WORKSTATION DESK
         ======================================================== */}
      <group position={[0.0, 0, 0.0]}>
        {/* Walnut Solid Desk Top */}
        <mesh position={[0.0, 1.12, 0.0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.09, 1.6]} />
          <meshStandardMaterial color="#6B4B3C" roughness={0.62} metalness={0.04} />
        </mesh>

        {/* Chamfered Edge Underside Trim */}
        <mesh position={[0.0, 1.06, 0.0]} receiveShadow>
          <boxGeometry args={[3.12, 0.03, 1.52]} />
          <meshStandardMaterial color="#55392C" roughness={0.7} />
        </mesh>

        {/* Brass Cable Pass-Through Grommet */}
        <mesh position={[1.1, 1.17, -0.6]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.02, 24]} />
          <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Charcoal Cable Opening inside Grommet */}
        <mesh position={[1.1, 1.175, -0.6]}>
          <cylinderGeometry args={[0.022, 0.022, 0.022, 16]} />
          <meshStandardMaterial color="#161513" roughness={0.95} />
        </mesh>

        {/* --- LEFT STEEL TRESTLE LEG --- */}
        <group position={[-1.3, 0.55, 0.0]}>
          {/* Front Upright */}
          <mesh position={[0, 0, 0.55]} castShadow receiveShadow>
            <boxGeometry args={[0.06, 1.05, 0.06]} />
            <meshStandardMaterial color="#1E1D1A" roughness={0.85} metalness={0.2} />
          </mesh>
          {/* Rear Upright */}
          <mesh position={[0, 0, -0.55]} castShadow receiveShadow>
            <boxGeometry args={[0.06, 1.05, 0.06]} />
            <meshStandardMaterial color="#1E1D1A" roughness={0.85} metalness={0.2} />
          </mesh>
          {/* Bottom Foot Rail */}
          <mesh position={[0, -0.51, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.08, 0.06, 1.4]} />
            <meshStandardMaterial color="#181715" roughness={0.85} metalness={0.2} />
          </mesh>
          {/* Top Mounting Rail */}
          <mesh position={[0, 0.51, 0]}>
            <boxGeometry args={[0.08, 0.05, 1.4]} />
            <meshStandardMaterial color="#181715" roughness={0.85} metalness={0.2} />
          </mesh>
          {/* Diagonal Cross Strut */}
          <mesh position={[0, 0, 0]} rotation={[0.78, 0, 0]} castShadow>
            <boxGeometry args={[0.04, 1.25, 0.04]} />
            <meshStandardMaterial color="#24221F" roughness={0.85} metalness={0.2} />
          </mesh>
        </group>

        {/* --- RIGHT STEEL TRESTLE LEG --- */}
        <group position={[1.3, 0.55, 0.0]}>
          <mesh position={[0, 0, 0.55]} castShadow receiveShadow>
            <boxGeometry args={[0.06, 1.05, 0.06]} />
            <meshStandardMaterial color="#1E1D1A" roughness={0.85} metalness={0.2} />
          </mesh>
          <mesh position={[0, 0, -0.55]} castShadow receiveShadow>
            <boxGeometry args={[0.06, 1.05, 0.06]} />
            <meshStandardMaterial color="#1E1D1A" roughness={0.85} metalness={0.2} />
          </mesh>
          <mesh position={[0, -0.51, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.08, 0.06, 1.4]} />
            <meshStandardMaterial color="#181715" roughness={0.85} metalness={0.2} />
          </mesh>
          <mesh position={[0, 0.51, 0]}>
            <boxGeometry args={[0.08, 0.05, 1.4]} />
            <meshStandardMaterial color="#181715" roughness={0.85} metalness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[-0.78, 0, 0]} castShadow>
            <boxGeometry args={[0.04, 1.25, 0.04]} />
            <meshStandardMaterial color="#24221F" roughness={0.85} metalness={0.2} />
          </mesh>
        </group>

        {/* Under-Desk Tie Stretcher Rail */}
        <mesh position={[0.0, 0.28, -0.2]} castShadow receiveShadow>
          <boxGeometry args={[2.54, 0.04, 0.04]} />
          <meshStandardMaterial color="#1C1B18" roughness={0.85} metalness={0.2} />
        </mesh>

        {/* Suspended 2-Drawer Storage Unit under right desk */}
        <group position={[0.85, 0.76, 0.0]}>
          {/* Cabinet Shell */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.62, 0.52, 1.1]} />
            <meshStandardMaterial color="#5C3F32" roughness={0.7} metalness={0.04} />
          </mesh>
          {/* Top Drawer Front */}
          <mesh position={[0, 0.13, 0.56]} castShadow>
            <boxGeometry args={[0.56, 0.22, 0.02]} />
            <meshStandardMaterial color="#6B4B3C" roughness={0.65} />
          </mesh>
          {/* Top Drawer Brass Handle */}
          <mesh position={[0, 0.13, 0.58]} castShadow>
            <boxGeometry args={[0.16, 0.02, 0.025]} />
            <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
          </mesh>
          {/* Bottom Drawer Front */}
          <mesh position={[0, -0.13, 0.56]} castShadow>
            <boxGeometry args={[0.56, 0.22, 0.02]} />
            <meshStandardMaterial color="#6B4B3C" roughness={0.65} />
          </mesh>
          {/* Bottom Drawer Brass Handle */}
          <mesh position={[0, -0.13, 0.58]} castShadow>
            <boxGeometry args={[0.16, 0.02, 0.025]} />
            <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
          </mesh>
        </group>

        {/* Charcoal Leather Desk Pad with Rust Stitch Accent */}
        <group position={[0.0, 1.17, 0.06]}>
          <mesh receiveShadow>
            <boxGeometry args={[2.0, 0.012, 0.84]} />
            <meshStandardMaterial color="#201E1C" roughness={0.88} />
          </mesh>
          {/* Perimeter Rust Accent Strip */}
          <mesh position={[0, 0.007, 0.415]}>
            <boxGeometry args={[1.98, 0.002, 0.01]} />
            <meshStandardMaterial color="#A65338" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.007, -0.415]}>
            <boxGeometry args={[1.98, 0.002, 0.01]} />
            <meshStandardMaterial color="#A65338" roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* ========================================================
          3. DESKTOP COMPUTER MONITOR & CODE EDITOR SCREEN
         ======================================================== */}
      <group position={[0.0, 1.17, -0.36]}>
        {/* Heavy Aluminum Base Stand */}
        <mesh position={[0.0, 0.01, 0.0]} castShadow receiveShadow>
          <boxGeometry args={[0.42, 0.02, 0.26]} />
          <meshStandardMaterial color="#262421" roughness={0.4} metalness={0.7} />
        </mesh>

        {/* Vertical Ergonomic Monitor Pillar */}
        <mesh position={[0.0, 0.36, -0.06]} castShadow>
          <boxGeometry args={[0.07, 0.72, 0.06]} />
          <meshStandardMaterial color="#262421" roughness={0.4} metalness={0.7} />
        </mesh>

        {/* Articulated Monitor Tilt Pivot Hinge */}
        <mesh position={[0.0, 0.68, -0.02]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.08, 16]} />
          <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Monitor Casing Group */}
        <group position={[0.0, 0.74, 0.02]}>
          {/* Main Monitor Rear Housing */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.14, 1.22, 0.05]} />
            <meshStandardMaterial color="#1B1A18" roughness={0.6} metalness={0.5} />
          </mesh>

          {/* Ultra-Thin Bezel Frame */}
          <mesh position={[0, 0, 0.026]}>
            <boxGeometry args={[2.12, 1.2, 0.008]} />
            <meshStandardMaterial color="#121110" roughness={0.8} />
          </mesh>

          {/* Glowing Code Editor Screen Panel */}
          <mesh position={[0, 0, 0.031]}>
            <planeGeometry args={[2.04, 1.12]} />
            <meshStandardMaterial
              map={codeEditorTexture}
              emissive="#385263"
              emissiveMap={codeEditorTexture}
              emissiveIntensity={0.2}
              roughness={0.25}
              metalness={0.05}
            />
          </mesh>

          {/* Soft Screen Ambient Light Casting onto Desk */}
          <pointLight
            position={[0, 0, 0.4]}
            intensity={1.2}
            distance={2.4}
            color="#C6DCFF"
          />
        </group>
      </group>

      {/* ========================================================
          4. AUDIO REFERENCE MONITORS (STUDIO SPEAKERS)
         ======================================================== */}
      {/* Left Studio Speaker */}
      <group position={[-1.25, 1.17, -0.42]} rotation={[0, 0.28, 0]}>
        {/* Isolation Foam Base Wedge */}
        <mesh position={[0, 0.015, 0]} receiveShadow>
          <boxGeometry args={[0.3, 0.03, 0.3]} />
          <meshStandardMaterial color="#141312" roughness={0.95} />
        </mesh>
        {/* Speaker Wood Cabinet */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.28, 0.44, 0.28]} />
          <meshStandardMaterial color="#1E1D1A" roughness={0.7} metalness={0.15} />
        </mesh>
        {/* Tweeter Dome */}
        <mesh position={[0, 0.36, 0.145]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.032, 0.032, 0.015, 24]} />
          <meshStandardMaterial color="#C58A5B" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Woofer Cone Outer Rim */}
        <mesh position={[0, 0.18, 0.143]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.082, 0.082, 0.01, 32]} />
          <meshStandardMaterial color="#2E2C28" roughness={0.6} />
        </mesh>
        {/* Woofer Center Cone Dustcap */}
        <mesh position={[0, 0.18, 0.15]}>
          <sphereGeometry args={[0.032, 16, 16]} />
          <meshStandardMaterial color="#F1ECE3" roughness={0.4} />
        </mesh>
      </group>

      {/* Right Studio Speaker */}
      <group position={[1.25, 1.17, -0.42]} rotation={[0, -0.28, 0]}>
        {/* Isolation Foam Base Wedge */}
        <mesh position={[0, 0.015, 0]} receiveShadow>
          <boxGeometry args={[0.3, 0.03, 0.3]} />
          <meshStandardMaterial color="#141312" roughness={0.95} />
        </mesh>
        {/* Speaker Wood Cabinet */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.28, 0.44, 0.28]} />
          <meshStandardMaterial color="#1E1D1A" roughness={0.7} metalness={0.15} />
        </mesh>
        {/* Tweeter Dome */}
        <mesh position={[0, 0.36, 0.145]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.032, 0.032, 0.015, 24]} />
          <meshStandardMaterial color="#C58A5B" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Woofer Cone Outer Rim */}
        <mesh position={[0, 0.18, 0.143]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.082, 0.082, 0.01, 32]} />
          <meshStandardMaterial color="#2E2C28" roughness={0.6} />
        </mesh>
        {/* Woofer Center Cone Dustcap */}
        <mesh position={[0, 0.18, 0.15]}>
          <sphereGeometry args={[0.032, 16, 16]} />
          <meshStandardMaterial color="#F1ECE3" roughness={0.4} />
        </mesh>
      </group>

      {/* ========================================================
          5. MECHANICAL KEYBOARD & ERGONOMIC MOUSE
         ======================================================== */}
      {/* Custom Mechanical Keyboard */}
      <group position={[-0.14, 1.18, 0.14]} rotation={[0, 0.03, 0]}>
        {/* Angled CNC Aluminum Chassis */}
        <mesh position={[0, 0.015, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.72, 0.032, 0.26]} />
          <meshStandardMaterial color="#1A1917" roughness={0.5} metalness={0.6} />
        </mesh>

        {/* Brass Weight Inset on Bottom */}
        <mesh position={[0, 0.005, 0]}>
          <boxGeometry args={[0.5, 0.01, 0.14]} />
          <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Keycaps: Ivory Alphas Cluster */}
        <mesh position={[0.0, 0.035, 0.01]} castShadow>
          <boxGeometry args={[0.54, 0.018, 0.18]} />
          <meshStandardMaterial color="#EAE4D8" roughness={0.65} />
        </mesh>

        {/* Keycaps: Charcoal Modifiers Left */}
        <mesh position={[-0.31, 0.035, 0.01]} castShadow>
          <boxGeometry args={[0.065, 0.018, 0.18]} />
          <meshStandardMaterial color="#282622" roughness={0.7} />
        </mesh>

        {/* Keycaps: Charcoal Modifiers Right */}
        <mesh position={[0.31, 0.035, 0.01]} castShadow>
          <boxGeometry args={[0.065, 0.018, 0.18]} />
          <meshStandardMaterial color="#282622" roughness={0.7} />
        </mesh>

        {/* Accent Key: Rust ESC (Top Left) */}
        <mesh position={[-0.31, 0.04, -0.08]} castShadow>
          <boxGeometry args={[0.045, 0.02, 0.038]} />
          <meshStandardMaterial color="#A65338" roughness={0.5} />
        </mesh>

        {/* Accent Key: Rust Enter (Middle Right) */}
        <mesh position={[0.31, 0.04, 0.01]} castShadow>
          <boxGeometry args={[0.055, 0.02, 0.045]} />
          <meshStandardMaterial color="#A65338" roughness={0.5} />
        </mesh>

        {/* Aviator Coiled Cable */}
        <group position={[-0.28, 0.01, -0.15]}>
          <mesh position={[0, 0, -0.06]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.016, 0.016, 0.14, 16]} />
            <meshStandardMaterial color="#262421" roughness={0.8} />
          </mesh>
          {/* Aviator Metal Barrel Connector */}
          <mesh position={[0, 0, -0.16]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.022, 0.022, 0.06, 16]} />
            <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
          </mesh>
        </group>
      </group>

      {/* Precision Ergonomic Designer Mouse */}
      <group position={[0.48, 1.18, 0.16]} rotation={[0, -0.06, 0]}>
        {/* Sculpted Mouse Body */}
        <mesh position={[0, 0.022, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.13, 0.042, 0.22]} />
          <meshStandardMaterial color="#24221F" roughness={0.65} metalness={0.2} />
        </mesh>

        {/* Tactile Brass Scroll Wheel */}
        <mesh position={[0, 0.044, -0.04]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.016, 0.016, 0.018, 16]} />
          <meshStandardMaterial color="#C58A5B" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Center Seam Groove */}
        <mesh position={[0, 0.044, -0.02]}>
          <boxGeometry args={[0.004, 0.004, 0.12]} />
          <meshStandardMaterial color="#161513" roughness={0.9} />
        </mesh>
      </group>

      {/* ========================================================
          6. ERGONOMIC STUDIO OFFICE CHAIR
         ======================================================== */}
      <group ref={chairRef} position={[0.0, 0.0, 1.05]} rotation={[0, 0.26, 0]}>
        {/* 5-Star Roller Base Hub */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
          <meshStandardMaterial color="#1E1D1A" roughness={0.6} metalness={0.6} />
        </mesh>

        {/* 5 Radiating Wheel Legs */}
        {[0, 72, 144, 216, 288].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          const legLen = 0.36;
          return (
            <group key={idx} rotation={[0, rad, 0]}>
              <mesh position={[0, 0.09, legLen / 2]} rotation={[0.08, 0, 0]} castShadow>
                <boxGeometry args={[0.04, 0.035, legLen]} />
                <meshStandardMaterial color="#1E1D1A" roughness={0.6} metalness={0.6} />
              </mesh>
              {/* Dual Castor Wheel */}
              <mesh position={[0, 0.04, legLen]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.035, 0.035, 0.03, 16]} />
                <meshStandardMaterial color="#121110" roughness={0.9} />
              </mesh>
            </group>
          );
        })}

        {/* Chrome Hydraulic Gas Lift Piston */}
        <mesh position={[0, 0.38, 0]} castShadow>
          <cylinderGeometry args={[0.038, 0.038, 0.42, 24]} />
          <meshStandardMaterial color="#D1CDC4" metalness={0.88} roughness={0.2} />
        </mesh>

        {/* Seat Tilting Mechanism Box */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[0.26, 0.08, 0.28]} />
          <meshStandardMaterial color="#1C1B18" roughness={0.7} metalness={0.4} />
        </mesh>

        {/* Recline Control Lever */}
        <mesh position={[0.18, 0.58, -0.05]} rotation={[0, 0, -0.4]}>
          <cylinderGeometry args={[0.01, 0.01, 0.14, 12]} />
          <meshStandardMaterial color="#C58A5B" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Ergonomic Waterfall Seat Cushion */}
        <mesh position={[0, 0.68, -0.04]} castShadow receiveShadow>
          <boxGeometry args={[0.66, 0.1, 0.62]} />
          <meshStandardMaterial color="#23211E" roughness={0.88} metalness={0.05} />
        </mesh>

        {/* Lumbar Curved Backrest Spine */}
        <mesh position={[0, 1.05, -0.32]} castShadow>
          <boxGeometry args={[0.08, 0.72, 0.06]} />
          <meshStandardMaterial color="#1C1B18" roughness={0.6} metalness={0.5} />
        </mesh>

        {/* High-Back Contoured Lumbar Mesh Backrest */}
        <group position={[0, 1.12, -0.28]}>
          {/* Main Back Cushion */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.56, 0.74, 0.07]} />
            <meshStandardMaterial color="#282622" roughness={0.85} metalness={0.08} />
          </mesh>
          {/* Defined Lumbar Support Cushion */}
          <mesh position={[0, -0.15, 0.04]} castShadow>
            <boxGeometry args={[0.46, 0.18, 0.04]} />
            <meshStandardMaterial color="#1E1D1A" roughness={0.9} />
          </mesh>
          {/* Sculpted Headrest */}
          <mesh position={[0, 0.44, 0.03]} castShadow>
            <boxGeometry args={[0.3, 0.16, 0.08]} />
            <meshStandardMaterial color="#23211E" roughness={0.88} />
          </mesh>
        </group>

        {/* Left 3D Armrest */}
        <group position={[-0.34, 0.88, -0.05]}>
          {/* Upright Support */}
          <mesh position={[0, -0.08, 0]} castShadow>
            <boxGeometry args={[0.04, 0.28, 0.06]} />
            <meshStandardMaterial color="#1C1B18" roughness={0.6} metalness={0.5} />
          </mesh>
          {/* Arm Cushion */}
          <mesh position={[0, 0.06, 0.05]} castShadow>
            <boxGeometry args={[0.09, 0.03, 0.32]} />
            <meshStandardMaterial color="#1A1917" roughness={0.85} />
          </mesh>
        </group>

        {/* Right 3D Armrest */}
        <group position={[0.34, 0.88, -0.05]}>
          <mesh position={[0, -0.08, 0]} castShadow>
            <boxGeometry args={[0.04, 0.28, 0.06]} />
            <meshStandardMaterial color="#1C1B18" roughness={0.6} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0.06, 0.05]} castShadow>
            <boxGeometry args={[0.09, 0.03, 0.32]} />
            <meshStandardMaterial color="#1A1917" roughness={0.85} />
          </mesh>
        </group>
      </group>

      {/* ========================================================
          7. ARTICULATED ARCHITECTURAL TASK LAMP (WITH LIGHT BEAM)
         ======================================================== */}
      <group position={[-1.08, 1.17, 0.24]}>
        {/* Weighted Circular Base */}
        <mesh position={[0, 0.016, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.11, 0.11, 0.032, 24]} />
          <meshStandardMaterial color="#1E1D1A" roughness={0.6} metalness={0.4} />
        </mesh>

        {/* Brass Rotary Toggle Switch */}
        <mesh position={[0.05, 0.038, 0.04]} castShadow>
          <cylinderGeometry args={[0.012, 0.012, 0.02, 12]} />
          <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Lower Arm Pivot Hub */}
        <mesh position={[0, 0.05, 0]} castShadow>
          <cylinderGeometry args={[0.024, 0.024, 0.04, 16]} />
          <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Lower Articulated Arm (Terracotta Rust) */}
        <group position={[0, 0.06, 0]} rotation={[0.42, 0.22, -0.15]}>
          <mesh position={[0, 0.26, 0]} castShadow>
            <cylinderGeometry args={[0.014, 0.014, 0.52, 16]} />
            <meshStandardMaterial color="#A65338" roughness={0.45} metalness={0.3} />
          </mesh>

          {/* Elbow Joint Knurled Thumbscrew */}
          <group position={[0, 0.52, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.028, 0.028, 0.05, 16]} />
              <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
            </mesh>

            {/* Upper Articulated Arm */}
            <group rotation={[-1.15, 0.1, 0.2]}>
              <mesh position={[0, 0.24, 0]} castShadow>
                <cylinderGeometry args={[0.014, 0.014, 0.48, 16]} />
                <meshStandardMaterial color="#A65338" roughness={0.45} metalness={0.3} />
              </mesh>

              {/* Lamp Head Joint & Conical Shade */}
              <group position={[0, 0.48, 0]} rotation={[0.85, 0, 0]}>
                <mesh position={[0, 0.05, 0]} castShadow>
                  <coneGeometry args={[0.12, 0.18, 24, 1, true]} />
                  <meshStandardMaterial color="#A65338" roughness={0.4} metalness={0.2} />
                </mesh>
                {/* Interior Reflector */}
                <mesh position={[0, 0.02, 0]}>
                  <coneGeometry args={[0.11, 0.14, 24]} />
                  <meshStandardMaterial color="#FFF8EB" roughness={0.2} />
                </mesh>

                {/* REAL-TIME WARM TASK SPOTLIGHT CASTING DOWN ON WORKSPACE */}
                <spotLight
                  ref={lampLightRef}
                  position={[0, -0.05, 0]}
                  target-position={[0.7, -1.2, 0.3]}
                  angle={0.62}
                  penumbra={0.75}
                  intensity={3.2}
                  color="#FFF4DD"
                  castShadow
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                  shadow-bias={-0.0001}
                />
              </group>
            </group>
          </group>
        </group>
      </group>

      {/* ========================================================
          8. JAPANESE STONEWARE COFFEE MUG & WALNUT COASTER
         ======================================================== */}
      <group position={[0.74, 1.17, 0.26]}>
        {/* Turned Walnut Wood Coaster */}
        <mesh position={[0, 0.007, 0]} receiveShadow>
          <cylinderGeometry args={[0.076, 0.076, 0.014, 24]} />
          <meshStandardMaterial color="#6B4B3C" roughness={0.6} />
        </mesh>

        {/* Handcrafted Ceramic Mug Body */}
        <group position={[0, 0.014, 0]}>
          {/* Ceramic Glazed Upper Half */}
          <mesh position={[0, 0.058, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.052, 0.05, 0.09, 24]} />
            <meshStandardMaterial color="#E1D8CA" roughness={0.7} metalness={0.04} />
          </mesh>

          {/* Raw Terracotta Unglazed Base Ring */}
          <mesh position={[0, 0.018, 0]} castShadow>
            <cylinderGeometry args={[0.0505, 0.048, 0.035, 24]} />
            <meshStandardMaterial color="#A65338" roughness={0.88} />
          </mesh>

          {/* Ceramic Loop Handle */}
          <mesh position={[0.058, 0.058, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <torusGeometry args={[0.026, 0.009, 12, 24]} />
            <meshStandardMaterial color="#E1D8CA" roughness={0.7} />
          </mesh>

          {/* Steaming Dark Roast Coffee Surface */}
          <mesh position={[0, 0.096, 0]}>
            <cylinderGeometry args={[0.046, 0.046, 0.005, 24]} />
            <meshStandardMaterial color="#2B1A12" roughness={0.2} metalness={0.1} />
          </mesh>
        </group>
      </group>

      {/* ========================================================
          9. POTTED BOTANICAL STUDIO PLANT (TERRACOTTA PLANTER)
         ======================================================== */}
      <group position={[-1.28, 1.17, -0.06]}>
        {/* Raw Terracotta Cylindrical Planter */}
        <mesh position={[0, 0.09, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.115, 0.085, 0.18, 24]} />
          <meshStandardMaterial color="#A65338" roughness={0.84} metalness={0.06} />
        </mesh>

        {/* Inset Dark Soil Bed */}
        <mesh position={[0, 0.17, 0]}>
          <cylinderGeometry args={[0.108, 0.108, 0.015, 24]} />
          <meshStandardMaterial color="#1E1915" roughness={0.95} />
        </mesh>

        {/* Sculpted Botanical Leaves */}
        {[
          { rot: [0.35, 0.4, 0.2], pos: [0.04, 0.28, 0.04], scale: 1.0 },
          { rot: [-0.4, 1.6, -0.25], pos: [-0.05, 0.31, 0.05], scale: 1.1 },
          { rot: [0.25, 2.8, 0.35], pos: [-0.06, 0.27, -0.04], scale: 0.9 },
          { rot: [-0.3, -1.2, 0.3], pos: [0.06, 0.33, -0.05], scale: 1.15 },
          { rot: [0.05, 0.1, -0.4], pos: [0.02, 0.37, 0.0], scale: 1.05 },
        ].map((leaf, idx) => (
          <group
            key={idx}
            position={leaf.pos as [number, number, number]}
            rotation={leaf.rot as [number, number, number]}
            scale={leaf.scale}
          >
            {/* Stem */}
            <mesh position={[0, -0.06, 0]} castShadow>
              <cylinderGeometry args={[0.007, 0.009, 0.14, 12]} />
              <meshStandardMaterial color="#556346" roughness={0.8} />
            </mesh>
            {/* Broad Sculpted Leaf */}
            <mesh position={[0, 0.07, 0]} rotation={[0.2, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.14, 0.18, 0.008]} />
              <meshStandardMaterial color={idx % 2 === 0 ? '#74705E' : '#5A6B48'} roughness={0.65} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ========================================================
          10. DESIGN & ARCHITECTURE BOOKSHELF UNIT
         ======================================================== */}
      <group position={[1.88, 0.0, -0.1]} rotation={[0, -0.18, 0]}>
        {/* 4 Charcoal Steel Frame Uprights */}
        {[
          [-0.24, -0.28],
          [-0.24, 0.28],
          [0.24, -0.28],
          [0.24, 0.28],
        ].map(([x, z], idx) => (
          <mesh key={idx} position={[x, 0.95, z]} castShadow receiveShadow>
            <boxGeometry args={[0.038, 1.9, 0.038]} />
            <meshStandardMaterial color="#1E1D1B" roughness={0.8} metalness={0.3} />
          </mesh>
        ))}

        {/* Shelf 1 (Lower) */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.54, 0.035, 0.62]} />
          <meshStandardMaterial color="#6B4B3C" roughness={0.65} />
        </mesh>

        {/* Shelf 2 (Middle - Desk Height) */}
        <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.54, 0.035, 0.62]} />
          <meshStandardMaterial color="#6B4B3C" roughness={0.65} />
        </mesh>

        {/* Shelf 3 (Top) */}
        <mesh position={[0, 1.55, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.54, 0.035, 0.62]} />
          <meshStandardMaterial color="#6B4B3C" roughness={0.65} />
        </mesh>

        {/* --- MIDDLE SHELF: CURATED BOOKS --- */}
        <group position={[0, 0.97, 0]}>
          {books.map((b, idx) => (
            <mesh
              key={idx}
              position={[-0.14 + idx * 0.065, b.height / 2, 0.02]}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[b.width, b.height, b.depth]} />
              <meshStandardMaterial color={b.color} roughness={0.7} />
            </mesh>
          ))}

          {/* Leaning Book resting against the row */}
          <mesh
            position={[0.18, 0.14, 0.02]}
            rotation={[0, 0, -0.34]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[0.045, 0.32, 0.23]} />
            <meshStandardMaterial color="#A65338" roughness={0.65} />
          </mesh>
        </group>

        {/* --- TOP SHELF: ARCHITECTURAL ARTIFACT & MINI POT --- */}
        <group position={[0, 1.57, 0]}>
          {/* Brutalist Arch Model (Travertine Stone) */}
          <mesh position={[-0.08, 0.14, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.18, 0.26, 0.16]} />
            <meshStandardMaterial color="#E1D8CA" roughness={0.88} />
          </mesh>
          {/* Arch aperture cutout */}
          <mesh position={[-0.08, 0.09, 0]}>
            <boxGeometry args={[0.1, 0.16, 0.18]} />
            <meshStandardMaterial color="#1E1D1B" roughness={0.9} />
          </mesh>

          {/* Miniature Trailing Pot */}
          <mesh position={[0.12, 0.06, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.04, 0.09, 16]} />
            <meshStandardMaterial color="#24221F" roughness={0.8} />
          </mesh>
          <mesh position={[0.12, 0.1, 0.04]} rotation={[0.4, 0, 0]} castShadow>
            <boxGeometry args={[0.07, 0.09, 0.01]} />
            <meshStandardMaterial color="#74705E" roughness={0.7} />
          </mesh>
        </group>

        {/* --- BOTTOM SHELF: ARCHIVAL BOX & NOTEBOOKS --- */}
        <group position={[0, 0.37, 0]}>
          {/* Archival Project Storage Box */}
          <mesh position={[0, 0.13, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.38, 0.24, 0.46]} />
            <meshStandardMaterial color="#1B1A17" roughness={0.85} />
          </mesh>
          {/* Brass Nameplate Handle on Box Front */}
          <mesh position={[0, 0.14, 0.235]} castShadow>
            <boxGeometry args={[0.12, 0.035, 0.012]} />
            <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
          </mesh>
        </group>
      </group>

      {/* ========================================================
          11. CREATIVE TOOLS: TABLET WITH WIREFRAME & STYLUS PEN
         ======================================================== */}
      <group position={[-0.64, 1.18, 0.26]} rotation={[0, 0.14, 0]}>
        {/* Tablet CNC Slate Chassis */}
        <mesh position={[0, 0.007, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.012, 0.26]} />
          <meshStandardMaterial color="#242220" roughness={0.5} metalness={0.6} />
        </mesh>
        {/* Tablet Screen with UI Wireframe */}
        <mesh position={[0, 0.014, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.31, 0.23]} />
          <meshStandardMaterial
            map={tabletTexture}
            emissive="#A65338"
            emissiveIntensity={0.08}
            roughness={0.3}
          />
        </mesh>
        {/* Digital Stylus Pen */}
        <mesh
          position={[0.14, 0.018, -0.02]}
          rotation={[0, 0.35, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[0.007, 0.007, 0.22, 16]} />
          <meshStandardMaterial color="#F1ECE3" roughness={0.4} metalness={0.2} />
        </mesh>
      </group>

      {/* Machined Precision Brass Scale Ruler */}
      <mesh
        position={[-0.2, 1.18, 0.38]}
        rotation={[0, -0.4, 0]}
        castShadow
      >
        <boxGeometry args={[0.45, 0.006, 0.032]} />
        <meshStandardMaterial color="#C58A5B" metalness={0.88} roughness={0.22} />
      </mesh>

      {/* ========================================================
          12. DEDICATED ATELIER GALLERY & SCENE LIGHTING
         ======================================================== */}
      {/* Warm Gallery Key Light illuminating the miniature workshop */}
      <spotLight
        position={[4.2, 7.8, 4.6]}
        target-position={[0.0, 1.0, 0]}
        angle={0.55}
        penumbra={0.7}
        intensity={2.6}
        color="#FFF6E8"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Warm Terracotta Ambient Bounce from under the desk */}
      <pointLight
        position={[-1.2, 0.5, 1.1]}
        intensity={1.2}
        distance={4.5}
        color="#A65338"
      />

      {/* Subtle Plinth Bottom Edge Glow */}
      <pointLight
        position={[0.0, -0.3, 0.5]}
        intensity={0.5}
        distance={3.0}
        color="#E1D8CA"
      />

      {/* ========================================================
          13. SUBTLE AMBIENT WORKSHOP LIGHT PARTICLES (MOTES)
         ======================================================== */}
      <WorkshopAmbientMotes progress={progress} />
    </group>
  );
};
