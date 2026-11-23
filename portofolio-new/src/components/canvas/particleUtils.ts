import * as THREE from 'three';

// =========================================================================
// SHARED PROCEDURAL FEATHERED MOTE TEXTURE SINGLETON
// =========================================================================

let cachedMoteTexture: THREE.CanvasTexture | null = null;

export function getSharedMoteTexture(): THREE.CanvasTexture {
  if (cachedMoteTexture) return cachedMoteTexture;

  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.9)');
    gradient.addColorStop(0.45, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(0.75, 'rgba(255, 255, 255, 0.08)');
    gradient.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  cachedMoteTexture = texture;
  return texture;
}

// =========================================================================
// DETERMINISTIC PSEUDO-RANDOM GENERATOR
// =========================================================================

export function createSeededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// =========================================================================
// AMBIENT MOTE DATA STRUCTURE
// =========================================================================

export interface MoteItem {
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
