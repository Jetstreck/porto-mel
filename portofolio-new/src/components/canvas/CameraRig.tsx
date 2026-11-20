import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraRigProps {
  progress: number;
  mouse: { x: number; y: number };
}

export interface CameraWaypoint {
  progress: number;
  pos: [number, number, number];
  look: [number, number, number];
  label: string;
}

/**
 * 12 Unified Waypoints governing the entire continuous 3D journey:
 * - Ch01 Entrance (p = 0.00)
 * - Ch02 About / The Maker's Exhibition (p = 0.26)
 * - Ch03 Expertise / The Engineering Lab (p = 0.46)
 * - Ch04 The Project Archive (All 6 Desktop Website Exhibitions in Wide Cinematic Framing):
 *     1. Archive Arrival Overview (p = 0.57) — High establishing panoramic view showing ALL 6 installations
 *     2. KBR E-Sport Website (p = 0.62) — Desktop tournament display, trophy, headset, plinth
 *     3. Menawi Art Studio Website (p = 0.67) — Desktop art studio display, easel study, oil palette, brush jar
 *     4. Nota Kita Website (p = 0.72) — Desktop invoice dashboard monitor, thermal printer, calculator, ledger
 *     5. Malang Reproductive Website (p = 0.77) — Desktop medical simulation monitor, surgical tray, microscope
 *     6. Insan Medika Website (p = 0.82) — Desktop training platform monitor, binders, graduation scroll
 *     7. Hospital Virtual Website (p = 0.86) — Desktop telemedicine web display, prescription tablet, token
 *     8. Archive Exit Transition (p = 0.90) — Center exit corridor looking toward horizon
 * - Ch05 Contact / Grand Portal Horizon (p = 0.98)
 */
const CAMERA_WAYPOINTS: CameraWaypoint[] = [
  // CHAPTER 01 — ENTRANCE / HERO (The Creative Workshop)
  {
    progress: 0.00,
    pos: [-1.2, 2.2, 11.0],
    look: [0.8, 1.2, 0.0],
    label: 'Chapter 01: Entrance Workshop',
  },
  // CHAPTER 02 — ABOUT (The Maker's Exhibition)
  {
    progress: 0.26,
    pos: [-4.5, 2.8, -4.5],
    look: [1.5, 1.7, -8.8],
    label: "Chapter 02: The Maker's Exhibition",
  },
  // CHAPTER 03 — EXPERTISE (The Engineering Lab)
  {
    progress: 0.46,
    pos: [4.5, 2.8, -14.0],
    look: [-2.2, 1.8, -19.5],
    label: 'Chapter 03: The Engineering Lab',
  },

  // =========================================================================
  // CHAPTER 04 — THE PROJECT ARCHIVE: WIDE CINEMATIC WEBSITE EXHIBITION
  // =========================================================================
  // Waypoint 1: Archive Arrival Overview (Stage 01 — Wide Establishing Panorama)
  // Elevated grand balcony vantage point: ALL SIX desktop website installations clearly visible
  {
    progress: 0.57,
    pos: [0.0, 5.2, -10.5],
    look: [0.0, 0.9, -28.5],
    label: 'Ch04 W1: Archive Arrival Overview (All 6 Visible)',
  },
  // Waypoint 2: KBR E-Sport Website (Stage 02 — Exhibition 01)
  // Wide: Desktop tournament monitor, bracket tree, trophy cup, headset, plinth & gallery floor
  {
    progress: 0.62,
    pos: [-4.7, 2.0, -20.7],
    look: [-7.0, 0.75, -26.5],
    label: 'Ch04 W2: Installation 01 (KBR E-Sport Website)',
  },
  // Waypoint 3: Menawi Art Studio Website (Stage 02 — Exhibition 02)
  // Wide: Desktop art studio monitor, easel with canvas study, oil palette, brush jar & plinth
  {
    progress: 0.67,
    pos: [-2.8, 2.0, -22.5],
    look: [-4.2, 0.75, -28.6],
    label: 'Ch04 W3: Installation 02 (Menawi Art Studio Website)',
  },
  // Waypoint 4: Nota Kita Website (Stage 03 — Exhibition 03)
  // Wide: Desktop invoice dashboard monitor, thermal receipt printer, calculator, ledger & desk
  {
    progress: 0.72,
    pos: [-1.0, 1.95, -23.8],
    look: [-1.45, 0.70, -29.8],
    label: 'Ch04 W4: Installation 03 (Nota Kita Website)',
  },
  // Waypoint 5: Malang Reproductive Training Center Website (Stage 03 — Exhibition 04)
  // Wide: Desktop medical simulation monitor, surgical tray, stethoscope, microscope & plinth
  {
    progress: 0.77,
    pos: [1.0, 1.95, -23.8],
    look: [1.45, 0.70, -29.8],
    label: 'Ch04 W5: Installation 04 (Malang Reproductive Website)',
  },
  // Waypoint 6: Insan Medika Training Center Website (Stage 04 — Exhibition 05)
  // Wide: Desktop training platform monitor, curriculum binders, credential scroll & study desk
  {
    progress: 0.82,
    pos: [2.8, 2.0, -22.5],
    look: [4.2, 0.75, -28.6],
    label: 'Ch04 W6: Installation 05 (Insan Medika Website)',
  },
  // Waypoint 7: Hospital Virtual Website (Stage 04 — Exhibition 06)
  // Wide: Desktop telemedicine web display, digital signature tablet, queue token & plinth
  {
    progress: 0.85,
    pos: [4.7, 2.0, -20.7],
    look: [7.0, 0.75, -26.5],
    label: 'Ch04 W7: Installation 06 (Hospital Virtual Website)',
  },
  // Waypoint 7b: Departure from Final Installation (Phase A)
  // Pull backward and step left, revealing Hospital Virtual plinth and surrounding gallery promenade
  {
    progress: 0.885,
    pos: [3.2, 2.15, -24.8],
    look: [5.2, 0.95, -29.2],
    label: 'Ch04 W7b: Leaving Final Installation & Gallery Promenade',
  },
  // Waypoint 8: Gallery Exit Portal Alignment (Phase B)
  // Align onto central gallery axis just before the grand exit portal
  {
    progress: 0.92,
    pos: [0.0, 2.25, -31.8],
    look: [0.0, 1.75, -42.5],
    label: 'Ch04 W8: Gallery Exit Portal Alignment',
  },
  // Waypoint 9: Traversing Connecting Passage (Phase C & D)
  // Gliding through the architectural corridor between the two environments
  {
    progress: 0.96,
    pos: [0.0, 2.20, -37.2],
    look: [0.0, 1.55, -46.5],
    label: 'Chapter 05: Traversing Connecting Passage',
  },
  // Waypoint 10: The Connection Lounge Arrival & Panorama (Phase E)
  // Settle into signature eye-level medium-wide architectural composition
  {
    progress: 1.00,
    pos: [0.0, 2.15, -41.2],
    look: [0.0, 1.45, -48.2],
    label: 'Chapter 05: The Connection Lounge Panorama',
  },
];

/**
 * Evaluates smooth C1 continuous non-uniform cubic Hermite spline interpolation
 */
function interpolateWaypoints(
  p: number,
  waypoints: CameraWaypoint[]
): { pos: THREE.Vector3; look: THREE.Vector3 } {
  const n = waypoints.length;
  if (p <= waypoints[0].progress) {
    const w = waypoints[0];
    return {
      pos: new THREE.Vector3(...w.pos),
      look: new THREE.Vector3(...w.look),
    };
  }
  if (p >= waypoints[n - 1].progress) {
    const w = waypoints[n - 1];
    return {
      pos: new THREE.Vector3(...w.pos),
      look: new THREE.Vector3(...w.look),
    };
  }

  // Find active interval
  let i = 0;
  for (let idx = 0; idx < n - 1; idx++) {
    if (p >= waypoints[idx].progress && p <= waypoints[idx + 1].progress) {
      i = idx;
      break;
    }
  }

  const p0 = waypoints[Math.max(0, i - 1)];
  const p1 = waypoints[i];
  const p2 = waypoints[i + 1];
  const p3 = waypoints[Math.min(n - 1, i + 2)];

  const span = p2.progress - p1.progress;
  const t = span > 0 ? (p - p1.progress) / span : 0;

  // Cubic Hermite basis
  const t2 = t * t;
  const t3 = t2 * t;
  const h00 = 2 * t3 - 3 * t2 + 1;
  const h10 = t3 - 2 * t2 + t;
  const h01 = -2 * t3 + 3 * t2;
  const h11 = t3 - t2;

  // Non-uniform scaling factors to prevent tangent overshoot across varying progress intervals
  const spanPrev = p1.progress - p0.progress || span;
  const spanNext = p3.progress - p2.progress || span;
  const scalePrev = (2 * span) / (spanPrev + span);
  const scaleNext = (2 * span) / (span + spanNext);

  const calcSpline = (c0: number, c1: number, c2: number, c3: number): number => {
    let m1 = (c2 - c0) * 0.5 * scalePrev;
    let m2 = (c3 - c1) * 0.5 * scaleNext;
    // Flat segment monotonicity clamping: if both endpoints are identical, prevent overshoot
    if (c1 === c2) {
      m1 = 0;
      m2 = 0;
    }
    return h00 * c1 + h10 * m1 + h01 * c2 + h11 * m2;
  };

  const pos = new THREE.Vector3(
    calcSpline(p0.pos[0], p1.pos[0], p2.pos[0], p3.pos[0]),
    calcSpline(p0.pos[1], p1.pos[1], p2.pos[1], p3.pos[1]),
    calcSpline(p0.pos[2], p1.pos[2], p2.pos[2], p3.pos[2])
  );

  const look = new THREE.Vector3(
    calcSpline(p0.look[0], p1.look[0], p2.look[0], p3.look[0]),
    calcSpline(p0.look[1], p1.look[1], p2.look[1], p3.look[1]),
    calcSpline(p0.look[2], p1.look[2], p2.look[2], p3.look[2])
  );

  return { pos, look };
}

export const CameraRig: React.FC<CameraRigProps> = ({ progress, mouse }) => {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(-1.2, 2.2, 11.0));
  const currentLookAt = useRef(new THREE.Vector3(0.8, 1.2, 0));

  useFrame((_, delta) => {
    // Clamp progress between 0 and 1
    const clampedProgress = Math.min(Math.max(progress, 0.0001), 0.9999);

    // Compute continuous spline interpolated targets
    const { pos: targetPos, look: targetLook } = interpolateWaypoints(
      clampedProgress,
      CAMERA_WAYPOINTS
    );

    // Apply subtle pointer parallax (constrained so camera never clips into objects)
    targetPos.x += mouse.x * 0.35;
    targetPos.y += mouse.y * 0.18;

    // Smooth cinematic dampening
    const damp = Math.min(delta * 4.0, 0.2);
    currentPos.current.lerp(targetPos, damp);
    currentLookAt.current.lerp(targetLook, damp);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};
