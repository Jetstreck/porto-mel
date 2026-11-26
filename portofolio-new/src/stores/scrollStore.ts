/**
 * High-performance mutable scroll store.
 * Decouples continuous scroll progress (0.0 to 1.0) from React state reconciliation.
 * Enables 3D canvas components and render loops to read the latest progress
 * inside useFrame at 60/120 FPS with 0 React virtual DOM diffing.
 */
export const scrollStore = {
  progress: 0,
};

export function getScrollProgress(): number {
  return scrollStore.progress;
}

export function setScrollProgress(value: number): void {
  scrollStore.progress = value;
}
