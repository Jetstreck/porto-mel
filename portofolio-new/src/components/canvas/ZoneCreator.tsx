import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ZoneCreatorProps {
  progress: number;
}

// =========================================================================
// PROCEDURAL CANVAS TEXTURES: BLUEPRINT TRANSITION, MONITOR, TIMELINE
// =========================================================================

/**
 * Zone 02 Blueprint: Visual storytelling showing the transition from
 * Pendidikan Teknik Bangunan (Structural Statics, Truss Load Paths, Moments)
 * to Software Systems Architecture (Component Tree, Go APIs, Relational DBs).
 */
function generateTransitionBlueprintTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Vellum Drafting Paper Base
  ctx.fillStyle = '#EAE2D2';
  ctx.fillRect(0, 0, 1024, 640);

  // Precision Drafting Millimeter Grid
  ctx.strokeStyle = '#D2C7B1';
  ctx.lineWidth = 1;
  const step = 20;
  for (let x = 0; x < 1024; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 640);
    ctx.stroke();
  }
  for (let y = 0; y < 640; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  // Header Exhibition Block
  ctx.fillStyle = '#1D1C19';
  ctx.font = 'bold 15px "JetBrains Mono", monospace';
  ctx.fillText('DISCIPLINARY TRANSITION // FROM STRUCTURAL STATICS TO SOFTWARE ARCHITECTURE', 32, 40);

  ctx.fillStyle = '#A65338';
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillText('SOURCE: PENDIDIKAN TEKNIK BANGUNAN ➔ TARGET: FULLSTACK SYSTEMS ENGINEERING', 32, 60);

  // Central Dividing Transformation Axis
  ctx.strokeStyle = '#A65338';
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(512, 75);
  ctx.lineTo(512, 580);
  ctx.stroke();
  ctx.setLineDash([]);

  // =======================================================================
  // LEFT SIDE: PENDIDIKAN TEKNIK BANGUNAN (STRUCTURAL STATICS & CAD)
  // =======================================================================
  ctx.fillStyle = '#1D1C19';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText('01 // STRUCTURAL MECHANICS & STATICS', 40, 105);

  // Pratt Truss Load Path Diagram
  ctx.strokeStyle = '#1D1C19';
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 125, 430, 140);

  // Truss Geometry
  ctx.beginPath();
  ctx.moveTo(50, 245);
  ctx.lineTo(460, 245);
  ctx.lineTo(350, 145);
  ctx.lineTo(160, 145);
  ctx.closePath();
  ctx.stroke();

  // Truss Internal Web Members
  const webX = [160, 255, 350];
  webX.forEach((x) => {
    ctx.beginPath();
    ctx.moveTo(x, 145);
    ctx.lineTo(x, 245);
    ctx.stroke();
  });
  ctx.beginPath();
  ctx.moveTo(50, 245);
  ctx.lineTo(160, 145);
  ctx.lineTo(255, 245);
  ctx.lineTo(350, 145);
  ctx.lineTo(460, 245);
  ctx.stroke();

  // Load Vectors (Red force arrows)
  ctx.strokeStyle = '#A65338';
  ctx.fillStyle = '#A65338';
  ctx.lineWidth = 2;
  [160, 255, 350].forEach((x) => {
    ctx.beginPath();
    ctx.moveTo(x, 115);
    ctx.lineTo(x, 140);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - 4, 134);
    ctx.lineTo(x, 142);
    ctx.lineTo(x + 4, 134);
    ctx.fill();
    ctx.font = '9px "JetBrains Mono", monospace';
    ctx.fillText('P = 45 kN', x - 18, 110);
  });

  // Structural Notes
  ctx.fillStyle = '#444038';
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillText('• Bending Moment Equilibrium: ΣM = 0', 44, 290);
  ctx.fillText('• Column-Beam Rigid Frame Joinery (CAD)', 44, 310);
  ctx.fillText('• Finite Element Stress Distribution', 44, 330);

  // Column Section Detail Box
  ctx.strokeStyle = '#74705E';
  ctx.strokeRect(40, 360, 430, 180);
  ctx.fillStyle = '#74705E';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('REINFORCED CONCRETE CROSS-SECTION [400 × 400mm]', 52, 385);

  // Column Rebar Blueprint
  ctx.strokeRect(70, 405, 110, 110);
  ctx.beginPath();
  ctx.arc(85, 420, 6, 0, Math.PI * 2);
  ctx.arc(165, 420, 6, 0, Math.PI * 2);
  ctx.arc(85, 500, 6, 0, Math.PI * 2);
  ctx.arc(165, 500, 6, 0, Math.PI * 2);
  ctx.fillStyle = '#1D1C19';
  ctx.fill();

  ctx.fillStyle = '#444038';
  ctx.font = '10px "JetBrains Mono", monospace';
  ctx.fillText('Main Bars: 4D22', 200, 435);
  ctx.fillText('Stirrups: ⌀10 - 150', 200, 460);
  ctx.fillText('Characteristic f\'c = 30 MPa', 200, 485);
  ctx.fillText('Safety Factor γ = 1.5', 200, 510);

  // =======================================================================
  // RIGHT SIDE: SOFTWARE ENGINEERING (FULLSTACK SYSTEMS ARCHITECTURE)
  // =======================================================================
  ctx.fillStyle = '#1D1C19';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText('02 // SOFTWARE SYSTEMS & DIGITAL ARCHITECTURE', 540, 105);

  // Component Tree Topology Box
  ctx.strokeStyle = '#1D1C19';
  ctx.lineWidth = 2;
  ctx.strokeRect(540, 125, 444, 140);

  ctx.fillStyle = '#22201D';
  ctx.fillRect(540, 125, 444, 26);
  ctx.fillStyle = '#F1ECE3';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('CLIENT TOPOLOGY: REACT 19 / THREE.JS SPLINE CANVAS', 552, 143);

  ctx.fillStyle = '#3F3C36';
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillText('App.tsx (Root Provider)', 556, 175);
  ctx.fillText(' ├── DigitalAtelierScene (Canvas 60fps)', 556, 195);
  ctx.fillText(' │    ├── CameraRig (Catmull-Rom Continuous Path)', 556, 215);
  ctx.fillText(' │    └── ZoneCreator (Spatial Exhibition Isolation)', 556, 235);
  ctx.fillText(' └── SpatialHUD (In-Situ Cross-Fading Typography)', 556, 255);

  // Middle Transformation Callout
  ctx.fillStyle = '#A65338';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('CORE METAPHOR: Structural load paths ➔ Asynchronous event streams', 540, 290);
  ctx.fillText('Statics equilibrium ➔ Deterministic state normalization', 540, 310);
  ctx.fillText('Modularity in physical building ➔ Composable, type-safe services', 540, 330);

  // Backend Pipeline & Relational Schema Box
  ctx.strokeStyle = '#74705E';
  ctx.strokeRect(540, 360, 444, 180);
  ctx.fillStyle = '#74705E';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('BACKEND ARCHITECTURE: GOLANG REST/STREAM + MYSQL ACID', 552, 385);

  ctx.fillStyle = '#3F3C36';
  ctx.font = '10px "JetBrains Mono", monospace';
  ctx.fillText('type Project struct {', 556, 415);
  ctx.fillText('    ID          uuid.UUID  `gorm:"primaryKey"`', 556, 435);
  ctx.fillText('    Title       string     `gorm:"not null"`', 556, 455);
  ctx.fillText('    Performance float64    `gorm:"check:perf >= 60.0"`', 556, 475);
  ctx.fillText('    Discipline  string     `default:"Fullstack Engineering"`', 556, 495);
  ctx.fillText('}', 556, 515);

  // Bottom Approval Seal
  ctx.strokeStyle = '#A65338';
  ctx.lineWidth = 2;
  ctx.strokeRect(810, 560, 174, 52);
  ctx.fillStyle = '#A65338';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('MELLINO ATELIER', 835, 582);
  ctx.fillText('VERIFIED ARCHITECTURE', 820, 600);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

/**
 * Zone 03 Mindset: System Monitor showing component hierarchy & runtime metrics.
 */
function generateMindsetMonitorTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#141412';
  ctx.fillRect(0, 0, 512, 640);

  // Header Title Bar
  ctx.fillStyle = '#1E1D1A';
  ctx.fillRect(0, 0, 512, 38);

  const dots = ['#A65338', '#D4A373', '#74705E'];
  dots.forEach((col, i) => {
    ctx.beginPath();
    ctx.arc(20 + i * 16, 19, 4, 0, Math.PI * 2);
    ctx.fillStyle = col;
    ctx.fill();
  });

  ctx.fillStyle = '#E1D8CA';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('MINDSET // FULLSTACK DESIGN & ARCHITECTURE', 80, 24);

  // State Machine Diagram
  ctx.fillStyle = '#22C55E';
  ctx.fillText('● RUNTIME HEALTH: OPTIMAL (100% 60 FPS)', 24, 70);

  ctx.fillStyle = '#A65338';
  ctx.fillText('═'.repeat(38), 24, 90);

  const metrics = [
    { label: 'FRAME BUDGET', val: '16.6ms (100% met)', col: '#22C55E' },
    { label: 'API LATENCY', val: '7.8ms p95', col: '#60A5FA' },
    { label: 'TYPE RIGOR', val: 'TypeScript Strict', col: '#E1D8CA' },
    { label: 'DB POOL', val: 'ACID Guaranteed', col: '#E1D8CA' },
    { label: 'DESIGN SYSTEM', val: 'Warm Brutalist 8pt', col: '#F59E0B' },
  ];

  metrics.forEach((m, idx) => {
    const y = 120 + idx * 30;
    ctx.fillStyle = '#8C877D';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillText(m.label.padEnd(16, ' '), 24, y);
    ctx.fillStyle = m.col;
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText(m.val, 180, y);
  });

  // Sparkline Chart
  ctx.strokeStyle = '#22C55E';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(24, 320);
  ctx.lineTo(80, 290);
  ctx.lineTo(140, 310);
  ctx.lineTo(200, 270);
  ctx.lineTo(260, 280);
  ctx.lineTo(340, 240);
  ctx.lineTo(440, 250);
  ctx.stroke();

  ctx.fillStyle = '#74705E';
  ctx.font = '10px "JetBrains Mono", monospace';
  ctx.fillText('FRAME CONSISTENCY OVER TIME // ZERO STUTTER', 24, 345);

  // Design Tokens Swatch Bar
  ctx.fillStyle = '#1D1C19';
  ctx.fillRect(24, 375, 464, 90);
  ctx.strokeStyle = '#38342E';
  ctx.strokeRect(24, 375, 464, 90);

  ctx.fillStyle = '#E1D8CA';
  ctx.font = 'bold 10px "JetBrains Mono", monospace';
  ctx.fillText('ESTABLISHED ATELIER PALETTE TOKENS:', 36, 400);

  const swatches = [
    { name: 'IVORY', color: '#F1ECE3' },
    { name: 'BEIGE', color: '#E1D8CA' },
    { name: 'RUST', color: '#A65338' },
    { name: 'WALNUT', color: '#755644' },
    { name: 'OLIVE', color: '#74705E' },
    { name: 'CHARCOAL', color: '#1D1C19' },
  ];

  swatches.forEach((sw, idx) => {
    const x = 36 + idx * 72;
    ctx.fillStyle = sw.color;
    ctx.fillRect(x, 415, 60, 22);
    ctx.fillStyle = '#A39D91';
    ctx.font = '9px "JetBrains Mono", monospace';
    ctx.fillText(sw.name, x, 452);
  });

  // Active Terminal Command
  ctx.fillStyle = '#A65338';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText('mellino@atelier-mindset:~$', 24, 510);
  ctx.fillStyle = '#F1ECE3';
  ctx.fillText(' ./test-all-systems --strict', 220, 510);

  ctx.fillStyle = '#22C55E';
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillText('✓ 39/39 modules verified with 0 errors, 0 warnings', 24, 545);
  ctx.fillText('✓ Structural integrity validated across all viewports', 24, 570);
  ctx.fillText('✓ Disciplinary synthesis: Building Statics × Software Rigor', 24, 595);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

/**
 * Zone 04 Timeline Plaque Textures
 */
function generateTimelinePlaqueTexture(stage: 1 | 2 | 3): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 340;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#171614';
  ctx.fillRect(0, 0, 512, 340);

  // Border
  ctx.strokeStyle = '#38342E';
  ctx.lineWidth = 2;
  ctx.strokeRect(16, 16, 480, 308);

  // Brass header strip
  ctx.fillStyle = '#C58A5B';
  ctx.fillRect(16, 16, 480, 10);

  if (stage === 1) {
    ctx.fillStyle = '#A65338';
    ctx.font = 'bold 13px "JetBrains Mono", monospace';
    ctx.fillText('PHASE 01 // STRUCTURAL FOUNDATIONS', 36, 55);

    ctx.fillStyle = '#F1ECE3';
    ctx.font = 'bold 24px "Playfair Display", Georgia, serif';
    ctx.fillText('Pendidikan Teknik Bangunan', 36, 95);

    ctx.fillStyle = '#E1D8CA';
    ctx.font = '13px "Inter", sans-serif';
    ctx.fillText('Formal academic study in civil & building engineering.', 36, 135);
    ctx.fillText('Mastering structural mechanics, statics, CAD drafting,', 36, 160);
    ctx.fillText('and the rigor of load-bearing spatial proportions.', 36, 185);

    ctx.fillStyle = '#74705E';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillText('DISCIPLINES: STATICS • CAD • CONCRETE DYNAMICS', 36, 260);
  } else if (stage === 2) {
    ctx.fillStyle = '#A65338';
    ctx.font = 'bold 13px "JetBrains Mono", monospace';
    ctx.fillText('PHASE 02 // COMPUTATIONAL TRANSITION', 36, 55);

    ctx.fillStyle = '#F1ECE3';
    ctx.font = 'bold 24px "Playfair Display", Georgia, serif';
    ctx.fillText('Software Engineering', 36, 95);

    ctx.fillStyle = '#E1D8CA';
    ctx.font = '13px "Inter", sans-serif';
    ctx.fillText('Transitioning structural thinking into software systems.', 36, 135);
    ctx.fillText('Developing scalable Go backends, relational MySQL schemas,', 36, 160);
    ctx.fillText('and high-performance modular TypeScript frontends.', 36, 185);

    ctx.fillStyle = '#74705E';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillText('STACK: GOLANG • MYSQL • REACT • TYPESCRIPT', 36, 260);
  } else {
    ctx.fillStyle = '#A65338';
    ctx.font = 'bold 13px "JetBrains Mono", monospace';
    ctx.fillText('PHASE 03 // THE DIGITAL ATELIER', 36, 55);

    ctx.fillStyle = '#F1ECE3';
    ctx.font = 'bold 24px "Playfair Display", Georgia, serif';
    ctx.fillText('The Creative Technologist', 36, 95);

    ctx.fillStyle = '#E1D8CA';
    ctx.font = '13px "Inter", sans-serif';
    ctx.fillText('Harmonizing engineering precision with intentional craft.', 36, 135);
    ctx.fillText('Building immersive 3D WebGL experiences, editorial design,', 36, 160);
    ctx.fillText('and digital products that respect the human experience.', 36, 185);

    ctx.fillStyle = '#74705E';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillText('OUTPUT: BESPOKE DIGITAL CRAFT • 60 FPS WEBGL', 36, 260);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

// =========================================================================
// 3D DIMENSIONAL ARCHITECTURAL TYPOGRAPHY: M E L L I N O
// =========================================================================

const DimensionalLetter: React.FC<{
  char: 'M' | 'E' | 'L' | 'I' | 'N' | 'O';
  position: [number, number, number];
}> = ({ char, position }) => {
  const depth = 0.12;
  const basaltColor = '#1F1E1B';
  const brassColor = '#C58A5B';

  return (
    <group position={position}>
      {char === 'M' && (
        <group>
          {/* Left vertical */}
          <mesh position={[-0.14, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.07, 0.68, depth]} />
            <meshStandardMaterial color={basaltColor} roughness={0.7} />
          </mesh>
          <mesh position={[-0.14, 0, depth / 2 + 0.005]}>
            <boxGeometry args={[0.065, 0.67, 0.01]} />
            <meshStandardMaterial color={brassColor} metalness={0.88} roughness={0.22} />
          </mesh>
          {/* Right vertical */}
          <mesh position={[0.14, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.07, 0.68, depth]} />
            <meshStandardMaterial color={basaltColor} roughness={0.7} />
          </mesh>
          <mesh position={[0.14, 0, depth / 2 + 0.005]}>
            <boxGeometry args={[0.065, 0.67, 0.01]} />
            <meshStandardMaterial color={brassColor} metalness={0.88} roughness={0.22} />
          </mesh>
          {/* Left diagonal */}
          <mesh position={[-0.07, 0.08, 0]} rotation={[0, 0, -0.42]} castShadow>
            <boxGeometry args={[0.065, 0.42, depth]} />
            <meshStandardMaterial color={basaltColor} roughness={0.7} />
          </mesh>
          <mesh position={[-0.07, 0.08, depth / 2 + 0.005]} rotation={[0, 0, -0.42]}>
            <boxGeometry args={[0.06, 0.41, 0.01]} />
            <meshStandardMaterial color={brassColor} metalness={0.88} roughness={0.22} />
          </mesh>
          {/* Right diagonal */}
          <mesh position={[0.07, 0.08, 0]} rotation={[0, 0, 0.42]} castShadow>
            <boxGeometry args={[0.065, 0.42, depth]} />
            <meshStandardMaterial color={basaltColor} roughness={0.7} />
          </mesh>
          <mesh position={[0.07, 0.08, depth / 2 + 0.005]} rotation={[0, 0, 0.42]}>
            <boxGeometry args={[0.06, 0.41, 0.01]} />
            <meshStandardMaterial color={brassColor} metalness={0.88} roughness={0.22} />
          </mesh>
        </group>
      )}

      {char === 'E' && (
        <group>
          {/* Main vertical stem */}
          <mesh position={[-0.11, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.07, 0.68, depth]} />
            <meshStandardMaterial color={basaltColor} roughness={0.7} />
          </mesh>
          <mesh position={[-0.11, 0, depth / 2 + 0.005]}>
            <boxGeometry args={[0.065, 0.67, 0.01]} />
            <meshStandardMaterial color={brassColor} metalness={0.88} roughness={0.22} />
          </mesh>
          {/* Top arm */}
          <mesh position={[0.03, 0.3, 0]} castShadow>
            <boxGeometry args={[0.22, 0.07, depth]} />
            <meshStandardMaterial color={basaltColor} roughness={0.7} />
          </mesh>
          <mesh position={[0.03, 0.3, depth / 2 + 0.005]}>
            <boxGeometry args={[0.21, 0.065, 0.01]} />
            <meshStandardMaterial color={brassColor} metalness={0.88} roughness={0.22} />
          </mesh>
          {/* Middle arm */}
          <mesh position={[0.01, 0.0, 0]} castShadow>
            <boxGeometry args={[0.18, 0.065, depth]} />
            <meshStandardMaterial color={basaltColor} roughness={0.7} />
          </mesh>
          <mesh position={[0.01, 0.0, depth / 2 + 0.005]}>
            <boxGeometry args={[0.17, 0.06, 0.01]} />
            <meshStandardMaterial color={brassColor} metalness={0.88} roughness={0.22} />
          </mesh>
          {/* Bottom arm */}
          <mesh position={[0.03, -0.3, 0]} castShadow>
            <boxGeometry args={[0.22, 0.07, depth]} />
            <meshStandardMaterial color={basaltColor} roughness={0.7} />
          </mesh>
          <mesh position={[0.03, -0.3, depth / 2 + 0.005]}>
            <boxGeometry args={[0.21, 0.065, 0.01]} />
            <meshStandardMaterial color={brassColor} metalness={0.88} roughness={0.22} />
          </mesh>
        </group>
      )}

      {char === 'L' && (
        <group>
          {/* Main vertical stem */}
          <mesh position={[-0.11, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.07, 0.68, depth]} />
            <meshStandardMaterial color={basaltColor} roughness={0.7} />
          </mesh>
          <mesh position={[-0.11, 0, depth / 2 + 0.005]}>
            <boxGeometry args={[0.065, 0.67, 0.01]} />
            <meshStandardMaterial color={brassColor} metalness={0.88} roughness={0.22} />
          </mesh>
          {/* Bottom base foot */}
          <mesh position={[0.03, -0.3, 0]} castShadow>
            <boxGeometry args={[0.22, 0.07, depth]} />
            <meshStandardMaterial color={basaltColor} roughness={0.7} />
          </mesh>
          <mesh position={[0.03, -0.3, depth / 2 + 0.005]}>
            <boxGeometry args={[0.21, 0.065, 0.01]} />
            <meshStandardMaterial color={brassColor} metalness={0.88} roughness={0.22} />
          </mesh>
        </group>
      )}

      {char === 'I' && (
        <group>
          {/* Main vertical stem */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.07, 0.68, depth]} />
            <meshStandardMaterial color={basaltColor} roughness={0.7} />
          </mesh>
          <mesh position={[0, 0, depth / 2 + 0.005]}>
            <boxGeometry args={[0.065, 0.67, 0.01]} />
            <meshStandardMaterial color={brassColor} metalness={0.88} roughness={0.22} />
          </mesh>
        </group>
      )}

      {char === 'N' && (
        <group>
          {/* Left vertical */}
          <mesh position={[-0.13, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.07, 0.68, depth]} />
            <meshStandardMaterial color={basaltColor} roughness={0.7} />
          </mesh>
          <mesh position={[-0.13, 0, depth / 2 + 0.005]}>
            <boxGeometry args={[0.065, 0.67, 0.01]} />
            <meshStandardMaterial color={brassColor} metalness={0.88} roughness={0.22} />
          </mesh>
          {/* Right vertical */}
          <mesh position={[0.13, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.07, 0.68, depth]} />
            <meshStandardMaterial color={basaltColor} roughness={0.7} />
          </mesh>
          <mesh position={[0.13, 0, depth / 2 + 0.005]}>
            <boxGeometry args={[0.065, 0.67, 0.01]} />
            <meshStandardMaterial color={brassColor} metalness={0.88} roughness={0.22} />
          </mesh>
          {/* Diagonal */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, -0.44]} castShadow>
            <boxGeometry args={[0.065, 0.72, depth]} />
            <meshStandardMaterial color={basaltColor} roughness={0.7} />
          </mesh>
          <mesh position={[0, 0, depth / 2 + 0.005]} rotation={[0, 0, -0.44]}>
            <boxGeometry args={[0.06, 0.71, 0.01]} />
            <meshStandardMaterial color={brassColor} metalness={0.88} roughness={0.22} />
          </mesh>
        </group>
      )}

      {char === 'O' && (
        <group>
          {/* Left vertical */}
          <mesh position={[-0.13, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.07, 0.54, depth]} />
            <meshStandardMaterial color={basaltColor} roughness={0.7} />
          </mesh>
          <mesh position={[-0.13, 0, depth / 2 + 0.005]}>
            <boxGeometry args={[0.065, 0.53, 0.01]} />
            <meshStandardMaterial color={brassColor} metalness={0.88} roughness={0.22} />
          </mesh>
          {/* Right vertical */}
          <mesh position={[0.13, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.07, 0.54, depth]} />
            <meshStandardMaterial color={basaltColor} roughness={0.7} />
          </mesh>
          <mesh position={[0.13, 0, depth / 2 + 0.005]}>
            <boxGeometry args={[0.065, 0.53, 0.01]} />
            <meshStandardMaterial color={brassColor} metalness={0.88} roughness={0.22} />
          </mesh>
          {/* Top horizontal */}
          <mesh position={[0, 0.3, 0]} castShadow>
            <boxGeometry args={[0.22, 0.07, depth]} />
            <meshStandardMaterial color={basaltColor} roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.3, depth / 2 + 0.005]}>
            <boxGeometry args={[0.21, 0.065, 0.01]} />
            <meshStandardMaterial color={brassColor} metalness={0.88} roughness={0.22} />
          </mesh>
          {/* Bottom horizontal */}
          <mesh position={[0, -0.3, 0]} castShadow>
            <boxGeometry args={[0.22, 0.07, depth]} />
            <meshStandardMaterial color={basaltColor} roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.3, depth / 2 + 0.005]}>
            <boxGeometry args={[0.21, 0.065, 0.01]} />
            <meshStandardMaterial color={brassColor} metalness={0.88} roughness={0.22} />
          </mesh>
        </group>
      )}
    </group>
  );
};

// =========================================================================
// MAIN ZONE CREATOR: THE MAKER'S EXHIBITION (4 CONNECTED ZONES)
// =========================================================================

export const ZoneCreator: React.FC<ZoneCreatorProps> = ({ progress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const gallerySpotlightRef = useRef<THREE.SpotLight>(null);
  const serverLedGroupRef = useRef<THREE.Group>(null);

  // Procedural Canvas Textures
  const transitionBlueprintTexture = useMemo(() => generateTransitionBlueprintTexture(), []);
  const mindsetMonitorTexture = useMemo(() => generateMindsetMonitorTexture(), []);
  const timelinePlaque1 = useMemo(() => generateTimelinePlaqueTexture(1), []);
  const timelinePlaque2 = useMemo(() => generateTimelinePlaqueTexture(2), []);
  const timelinePlaque3 = useMemo(() => generateTimelinePlaqueTexture(3), []);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;

    // Strict Visibility Lifecycle: active between 0.12 and 0.42
    const isVisible = progress >= 0.12 && progress <= 0.42;
    groupRef.current.visible = isVisible;
    if (!isVisible) return;

    // Smooth transition in (0.12 to 0.20) and out (0.34 to 0.42)
    let factor = 1.0;
    if (progress < 0.20) {
      factor = Math.max(0, (progress - 0.12) / 0.08);
    } else if (progress > 0.34) {
      factor = Math.max(0, 1 - (progress - 0.34) / 0.08);
    }
    groupRef.current.position.y = -0.6 - (1 - factor) * 4.0;

    const t = clock.getElapsedTime();

    // Subtle pointer parallax: entire exhibition room gently rotates
    groupRef.current.rotation.y = -0.68 + pointer.x * 0.025;
    groupRef.current.rotation.x = -pointer.y * 0.012;

    // Gentle pulse on main gallery spotlight
    if (gallerySpotlightRef.current) {
      gallerySpotlightRef.current.intensity = 2.8 + Math.sin(t * 1.8) * 0.15;
    }

    // Blinking Server Blade Status LEDs
    if (serverLedGroupRef.current) {
      serverLedGroupRef.current.children.forEach((child, idx) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          const blink = Math.sin(t * 8.0 + idx * 2.5) > 0.1 ? 1.0 : 0.2;
          child.material.emissiveIntensity = blink;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[2.2, -0.6, -8.8]} rotation={[0, -0.68, 0]}>
      {/* ========================================================
          1. EXHIBITION HALL PLINTH & TRAVERTINE PARQUET FLOOR
         ======================================================== */}
      {/* Lower Basalt Exhibition Plinth */}
      <mesh position={[0.0, -0.16, 0.2]} receiveShadow>
        <boxGeometry args={[8.8, 0.32, 6.4]} />
        <meshStandardMaterial color="#171614" roughness={0.92} metalness={0.08} />
      </mesh>

      {/* Recessed Negative Shadow Joint */}
      <mesh position={[0.0, -0.01, 0.2]}>
        <boxGeometry args={[8.5, 0.04, 6.1]} />
        <meshStandardMaterial color="#0B0A09" roughness={1.0} />
      </mesh>

      {/* Honed Travertine Gallery Floor Inlay */}
      <mesh position={[0.0, 0.02, 0.2]} receiveShadow>
        <boxGeometry args={[8.2, 0.02, 5.8]} />
        <meshStandardMaterial color="#DDD6C9" roughness={0.9} metalness={0.04} />
      </mesh>

      {/* Continuous Brass Storyline Floor Inlay Guide connecting Zones 2, 3, 4 */}
      <mesh position={[0.0, 0.032, 0.8]}>
        <boxGeometry args={[7.2, 0.006, 0.03]} />
        <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Floor Circular Brass Compass Rose / Meridian Marker */}
      <mesh position={[0.0, 0.032, 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.22, 0.25, 32]} />
        <meshStandardMaterial color="#C58A5B" metalness={0.88} roughness={0.22} />
      </mesh>

      {/* ========================================================
          ZONE 01: MONUMENTAL IDENTITY INSTALLATION (M E L L I N O)
         ======================================================== */}
      {/* Grand Architectural Partition Wall in Warm Travertine */}
      <group position={[0.0, 2.0, -1.8]}>
        {/* Main Wall Slab */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[8.2, 4.0, 0.26]} />
          <meshStandardMaterial color="#DDD6C9" roughness={0.88} metalness={0.04} />
        </mesh>

        {/* Charcoal Steel Lintel Cap Beam */}
        <mesh position={[0, 2.05, 0]} castShadow>
          <boxGeometry args={[8.26, 0.1, 0.32]} />
          <meshStandardMaterial color="#1E1D1B" roughness={0.7} metalness={0.3} />
        </mesh>

        {/* Fluted Dark Basalt Left Pilaster Column */}
        <mesh position={[-4.0, 0, 0.05]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 4.0, 0.2]} />
          <meshStandardMaterial color="#1D1C19" roughness={0.85} />
        </mesh>

        {/* Fluted Dark Basalt Right Pilaster Column */}
        <mesh position={[4.0, 0, 0.05]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 4.0, 0.2]} />
          <meshStandardMaterial color="#1D1C19" roughness={0.85} />
        </mesh>

        {/* Recessed Stepped Display Niche */}
        <mesh position={[0, 0.45, 0.14]}>
          <boxGeometry args={[4.4, 1.25, 0.04]} />
          <meshStandardMaterial color="#191816" roughness={0.9} />
        </mesh>

        {/* 3D DIMENSIONAL ARCHITECTURAL LETTERS: M E L L I N O */}
        <group position={[0, 0.45, 0.18]}>
          <DimensionalLetter char="M" position={[-1.48, 0, 0]} />
          <DimensionalLetter char="E" position={[-0.98, 0, 0]} />
          <DimensionalLetter char="L" position={[-0.49, 0, 0]} />
          <DimensionalLetter char="L" position={[0.0, 0, 0]} />
          <DimensionalLetter char="I" position={[0.42, 0, 0]} />
          <DimensionalLetter char="N" position={[0.88, 0, 0]} />
          <DimensionalLetter char="O" position={[1.42, 0, 0]} />
        </group>

        {/* Inscription Identification Plaque Under Letters */}
        <group position={[0, -0.32, 0.16]}>
          <mesh castShadow>
            <boxGeometry args={[3.8, 0.18, 0.02]} />
            <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
          </mesh>
          {/* Dark Inset Trim */}
          <mesh position={[0, 0, 0.012]}>
            <boxGeometry args={[3.72, 0.14, 0.005]} />
            <meshStandardMaterial color="#1A1917" roughness={0.8} />
          </mesh>
        </group>

        {/* Overhead Brass Gallery Light Fixture for MELLINO */}
        <group position={[0, 1.25, 0.35]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 3.6, 16]} />
            <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
          </mesh>
          {/* Dual Cantilever Arms */}
          <mesh position={[-1.2, -0.05, -0.15]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.32, 12]} />
            <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[1.2, -0.05, -0.15]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.32, 12]} />
            <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
          </mesh>

          {/* REAL-TIME ARTWORK WASHLIGHT */}
          <spotLight
            ref={gallerySpotlightRef}
            position={[0, 0.05, 0]}
            target-position={[0, -0.8, -0.2]}
            angle={0.68}
            penumbra={0.7}
            intensity={2.8}
            color="#FFF6E4"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-bias={-0.0001}
          />
        </group>
      </group>

      {/* ========================================================
          ZONE 02: THE BACKGROUND (TEKNIK BANGUNAN ➔ SOFTWARE TRANSITION)
         ======================================================== */}
      <group position={[-2.4, 0.0, -0.1]}>
        {/* Exhibition Station Header Plaque */}
        <mesh position={[0, 2.3, -1.6]} castShadow>
          <boxGeometry args={[2.2, 0.22, 0.02]} />
          <meshStandardMaterial color="#1E1D1B" roughness={0.8} />
        </mesh>
        <mesh position={[0, 2.3, -1.58]}>
          <boxGeometry args={[2.14, 0.02, 0.005]} />
          <meshStandardMaterial color="#A65338" roughness={0.5} />
        </mesh>

        {/* Heavy Walnut & Cast Iron Drafting Table */}
        <group position={[0, 0.85, 0]}>
          {/* Angled Table Top Surface (15 degrees incline) */}
          <group rotation={[-0.26, 0, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[2.1, 0.08, 1.3]} />
              <meshStandardMaterial color="#654637" roughness={0.62} metalness={0.04} />
            </mesh>

            {/* Transition Blueprint Sheet Lying on Table */}
            <mesh position={[0, 0.045, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[1.96, 1.18]} />
              <meshStandardMaterial map={transitionBlueprintTexture} roughness={0.75} />
            </mesh>

            {/* Parallel Motion Drafting Ruler Clamp */}
            <mesh position={[0, 0.055, -0.2]} castShadow>
              <boxGeometry args={[2.0, 0.015, 0.06]} />
              <meshStandardMaterial color="#22201D" roughness={0.6} metalness={0.6} />
            </mesh>

            {/* Turned Brass Caliper / Divider */}
            <group position={[0.65, 0.055, 0.3]} rotation={[0, 0.3, 0]}>
              <mesh position={[-0.04, 0, 0]} rotation={[0, 0, 0.2]} castShadow>
                <cylinderGeometry args={[0.004, 0.002, 0.24, 12]} />
                <meshStandardMaterial color="#C58A5B" metalness={0.88} roughness={0.22} />
              </mesh>
              <mesh position={[0.04, 0, 0]} rotation={[0, 0, -0.2]} castShadow>
                <cylinderGeometry args={[0.004, 0.002, 0.24, 12]} />
                <meshStandardMaterial color="#C58A5B" metalness={0.88} roughness={0.22} />
              </mesh>
              <mesh position={[0, 0.11, 0]} castShadow>
                <cylinderGeometry args={[0.01, 0.01, 0.02, 12]} />
                <meshStandardMaterial color="#C58A5B" metalness={0.88} roughness={0.22} />
              </mesh>
            </group>

            {/* Maple 45-degree Drafting Triangle */}
            <mesh position={[-0.65, 0.052, 0.2]} rotation={[-Math.PI / 2, 0, -0.4]} castShadow>
              <ringGeometry args={[0.06, 0.18, 3]} />
              <meshStandardMaterial color="#D7C29E" roughness={0.65} />
            </mesh>

            {/* Triangular Architectural Scale Ruler */}
            <mesh position={[0, 0.052, 0.45]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.01, 0.01, 0.45, 3]} />
              <meshStandardMaterial color="#E1D8CA" roughness={0.5} />
            </mesh>
          </group>

          {/* Cast Iron Trestle Table Legs with Brass Handwheels */}
          <group position={[-0.85, -0.45, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.08, 0.82, 0.8]} />
              <meshStandardMaterial color="#1C1B18" roughness={0.85} metalness={0.3} />
            </mesh>
            <mesh position={[0, 0.1, 0.42]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <torusGeometry args={[0.06, 0.012, 12, 24]} />
              <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
            </mesh>
          </group>
          <group position={[0.85, -0.45, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.08, 0.82, 0.8]} />
              <meshStandardMaterial color="#1C1B18" roughness={0.85} metalness={0.3} />
            </mesh>
            <mesh position={[0, 0.1, 0.42]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <torusGeometry args={[0.06, 0.012, 12, 24]} />
              <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
            </mesh>
          </group>
        </group>

        {/* Physical Structural Space-Frame Truss Model on Dedicated Pedestal */}
        <group position={[-1.3, 0, 0.7]}>
          {/* Travertine Pedestal Cube */}
          <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.8, 0.5]} />
            <meshStandardMaterial color="#DDD6C9" roughness={0.88} />
          </mesh>
          {/* Miniature Balsa/Steel Pratt Truss Model */}
          <group position={[0, 0.85, 0]}>
            <mesh position={[0, 0.15, 0]} castShadow>
              <boxGeometry args={[0.42, 0.28, 0.16]} />
              <meshStandardMaterial color="#8C6D58" roughness={0.7} wireframe />
            </mesh>
            {/* Brass Corner Connection Pins */}
            {[-0.2, 0.2].map((x, i) =>
              [-0.12, 0.12].map((y, j) => (
                <mesh key={`${i}-${j}`} position={[x, y + 0.15, 0]} castShadow>
                  <sphereGeometry args={[0.014, 12, 12]} />
                  <meshStandardMaterial color="#C58A5B" metalness={0.9} roughness={0.2} />
                </mesh>
              ))
            )}
          </group>
        </group>
      </group>

      {/* ========================================================
          ZONE 03: THE MINDSET (ENGINEERING RIGOR × INTENTIONAL CRAFT)
         ======================================================== */}
      <group position={[0.0, 0.0, 0.5]}>
        {/* Exhibition Station Header Plaque */}
        <mesh position={[0, 2.3, -2.2]} castShadow>
          <boxGeometry args={[2.4, 0.22, 0.02]} />
          <meshStandardMaterial color="#1E1D1B" roughness={0.8} />
        </mesh>
        <mesh position={[0, 2.3, -2.18]}>
          <boxGeometry args={[2.34, 0.02, 0.005]} />
          <meshStandardMaterial color="#A65338" roughness={0.5} />
        </mesh>

        {/* Center Plinth Console */}
        <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.76, 0.9]} />
          <meshStandardMaterial color="#1F1E1B" roughness={0.8} metalness={0.15} />
        </mesh>

        {/* Polished Brass Top Accent Lip */}
        <mesh position={[0, 0.77, 0]}>
          <boxGeometry args={[2.04, 0.02, 0.94]} />
          <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* --- A. PHYSICAL SERVER BLADE UNIT (BACKEND ARCHITECTURE) --- */}
        <group position={[-0.45, 0.9, 0.0]}>
          {/* 2U Rack Chassis */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.82, 0.2, 0.65]} />
            <meshStandardMaterial color="#141311" roughness={0.6} metalness={0.6} />
          </mesh>
          {/* Faceplate */}
          <mesh position={[0, 0, 0.33]} castShadow>
            <boxGeometry args={[0.8, 0.18, 0.02]} />
            <meshStandardMaterial color="#22201D" roughness={0.5} metalness={0.7} />
          </mesh>
          {/* Drive Bay Slots */}
          <mesh position={[-0.15, 0, 0.342]}>
            <boxGeometry args={[0.42, 0.12, 0.008]} />
            <meshStandardMaterial color="#151412" roughness={0.9} />
          </mesh>
          {/* Blinking Status LED Array */}
          <group ref={serverLedGroupRef} position={[-0.15, 0, 0.35]}>
            {Array.from({ length: 6 }).map((_, idx) => (
              <mesh key={idx} position={[-0.18 + idx * 0.07, 0, 0]}>
                <sphereGeometry args={[0.008, 12, 12]} />
                <meshStandardMaterial
                  color={idx % 2 === 0 ? '#22C55E' : '#F59E0B'}
                  emissive={idx % 2 === 0 ? '#22C55E' : '#F59E0B'}
                  emissiveIntensity={1.0}
                />
              </mesh>
            ))}
          </group>
          {/* Cable Routing Combs */}
          <mesh position={[0.28, 0, 0.34]} castShadow>
            <boxGeometry args={[0.14, 0.14, 0.015]} />
            <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
          </mesh>
        </group>

        {/* --- B. SYSTEM MONITOR (FRONTEND ARCHITECTURE & METRICS) --- */}
        <group position={[0.5, 0.8, 0.0]} rotation={[0, -0.32, 0]}>
          {/* Articulated Stand */}
          <mesh position={[0, 0.15, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.3, 16]} />
            <meshStandardMaterial color="#1E1D1A" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Angled Monitor Screen */}
          <group position={[0, 0.45, 0]} rotation={[-0.12, 0, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.82, 1.05, 0.04]} />
              <meshStandardMaterial color="#181715" roughness={0.6} metalness={0.5} />
            </mesh>
            {/* Monitor Screen with Texture */}
            <mesh position={[0, 0, 0.022]}>
              <planeGeometry args={[0.78, 1.0]} />
              <meshStandardMaterial
                map={mindsetMonitorTexture}
                emissive="#385263"
                emissiveMap={mindsetMonitorTexture}
                emissiveIntensity={0.25}
                roughness={0.2}
              />
            </mesh>
            {/* Screen Soft Glow */}
            <pointLight position={[0, 0, 0.3]} intensity={0.9} distance={2.4} color="#93C5FD" />
          </group>
        </group>

        {/* Structured Development Kanban / System Board Standing Behind */}
        <group position={[0, 1.6, -0.8]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.0, 1.1, 0.04]} />
            <meshStandardMaterial color="#554439" roughness={0.8} />
          </mesh>
          {/* Pinned Wireframe Cards */}
          {[-0.6, 0.0, 0.6].map((x, idx) => (
            <group key={idx} position={[x, 0, 0.025]}>
              <mesh receiveShadow castShadow>
                <boxGeometry args={[0.48, 0.75, 0.008]} />
                <meshStandardMaterial color={idx === 1 ? '#E1D8CA' : '#F1ECE3'} roughness={0.7} />
              </mesh>
              {/* Brass Pushpin */}
              <mesh position={[0, 0.34, 0.01]} castShadow>
                <sphereGeometry args={[0.012, 12, 12]} />
                <meshStandardMaterial color="#C58A5B" metalness={0.9} roughness={0.2} />
              </mesh>
            </group>
          ))}
        </group>
      </group>

      {/* ========================================================
          ZONE 04: PERSONAL JOURNEY (PHYSICAL TIMELINE INSTALLATION)
         ======================================================== */}
      <group position={[2.5, 0.0, -0.1]}>
        {/* Exhibition Station Header Plaque */}
        <mesh position={[0, 2.3, -1.6]} castShadow>
          <boxGeometry args={[2.4, 0.22, 0.02]} />
          <meshStandardMaterial color="#1E1D1B" roughness={0.8} />
        </mesh>
        <mesh position={[0, 2.3, -1.58]}>
          <boxGeometry args={[2.34, 0.02, 0.005]} />
          <meshStandardMaterial color="#A65338" roughness={0.5} />
        </mesh>

        {/* Long Basalt & Walnut Timeline Console Plinth */}
        <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.84, 0.85]} />
          <meshStandardMaterial color="#6B4B3C" roughness={0.65} metalness={0.04} />
        </mesh>

        {/* Continuous Etched Brass Timeline Rail Along Surface */}
        <mesh position={[0, 0.85, 0]}>
          <boxGeometry args={[2.54, 0.015, 0.8]} />
          <meshStandardMaterial color="#C58A5B" metalness={0.88} roughness={0.22} />
        </mesh>

        {/* Three Illuminated Chronological Milestone Stanchions */}
        {/* Milestone 01: Structural Foundations */}
        <group position={[-0.8, 0.86, 0]} rotation={[-0.2, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.68, 0.45, 0.02]} />
            <meshStandardMaterial map={timelinePlaque1} roughness={0.4} />
          </mesh>
        </group>

        {/* Milestone 02: Software Engineering Transition */}
        <group position={[0.0, 0.86, 0]} rotation={[-0.2, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.68, 0.45, 0.02]} />
            <meshStandardMaterial map={timelinePlaque2} roughness={0.4} />
          </mesh>
        </group>

        {/* Milestone 03: The Digital Atelier */}
        <group position={[0.8, 0.86, 0]} rotation={[-0.2, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.68, 0.45, 0.02]} />
            <meshStandardMaterial map={timelinePlaque3} roughness={0.4} />
          </mesh>
        </group>

        {/* Museum Beveled Acrylic Protective Vitrine Hood */}
        <mesh position={[0, 1.15, 0]} castShadow>
          <boxGeometry args={[2.52, 0.55, 0.78]} />
          <meshPhysicalMaterial
            roughness={0.08}
            transmission={0.92}
            transparent
            opacity={0.3}
            ior={1.52}
          />
        </mesh>

        {/* Botanical Touch: Architectural Ficus Planter Beside Timeline */}
        <group position={[1.45, 0.0, 0.4]} rotation={[0, -0.4, 0]}>
          <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.26, 0.2, 0.64, 24]} />
            <meshStandardMaterial color="#DDD6C9" roughness={0.9} metalness={0.02} />
          </mesh>
          <mesh position={[0, 0.62, 0]}>
            <cylinderGeometry args={[0.24, 0.24, 0.02, 24]} />
            <meshStandardMaterial color="#1E1A16" roughness={0.95} />
          </mesh>
          {/* Trunk & Broad Leaves */}
          <mesh position={[0, 0.95, 0]} castShadow>
            <cylinderGeometry args={[0.025, 0.038, 0.65, 12]} />
            <meshStandardMaterial color="#4A3D34" roughness={0.85} />
          </mesh>
          {[
            { pos: [0.15, 1.3, 0.1], rot: [0.35, 0.5, 0.2], col: '#74705E' },
            { pos: [-0.14, 1.35, -0.08], rot: [-0.3, -0.7, -0.2], col: '#5E664E' },
            { pos: [0.04, 1.48, -0.12], rot: [-0.35, 0.2, 0.3], col: '#74705E' },
            { pos: [-0.1, 1.52, 0.1], rot: [0.2, -0.3, -0.3], col: '#5E664E' },
          ].map((leaf, idx) => (
            <mesh
              key={idx}
              position={leaf.pos as [number, number, number]}
              rotation={leaf.rot as [number, number, number]}
              castShadow
            >
              <boxGeometry args={[0.22, 0.32, 0.008]} />
              <meshStandardMaterial color={leaf.col} roughness={0.65} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ========================================================
          7. MASTER GALLERY LIGHTING
         ======================================================== */}
      {/* Zone 02 Task Spotlight (Drafting Table) */}
      <spotLight
        position={[-2.4, 5.0, 1.4]}
        target-position={[-2.4, 0.8, -0.1]}
        angle={0.6}
        penumbra={0.7}
        intensity={2.4}
        color="#FFF2DC"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Zone 03 Telemetry Spotlight (Server & Monitor) */}
      <spotLight
        position={[0.0, 5.0, 2.0]}
        target-position={[0.0, 0.8, 0.5]}
        angle={0.6}
        penumbra={0.7}
        intensity={2.2}
        color="#E8F0FE"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Zone 04 Vitrine Spotlight (Timeline Installation) */}
      <spotLight
        position={[2.5, 5.0, 1.4]}
        target-position={[2.5, 0.8, -0.1]}
        angle={0.6}
        penumbra={0.7}
        intensity={2.4}
        color="#FFF6E4"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Warm Terracotta Ambient Side Fill */}
      <pointLight position={[3.8, 1.2, -0.6]} intensity={1.5} distance={5.5} color="#A65338" />

      {/* Under-Plinth Warm Floor Ambient Glow */}
      <pointLight position={[0.0, -0.3, 0.6]} intensity={0.6} distance={4.0} color="#E1D8CA" />
    </group>
  );
};
