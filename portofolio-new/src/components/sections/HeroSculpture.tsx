import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroSculpture: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera with architectural orthographic-like perspective
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Renderer with antialias and transparent background
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Architectural sculpture group
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Materials reflecting Warm Brutalism
    // Matte warm sandstone
    const sandstoneMat = new THREE.MeshStandardMaterial({
      color: 0xE1D8CA,
      roughness: 0.88,
      metalness: 0.05,
      flatShading: false,
    });

    // Dark charcoal architectural stone
    const charcoalMat = new THREE.MeshStandardMaterial({
      color: 0x24221E,
      roughness: 0.92,
      metalness: 0.08,
      flatShading: true,
    });

    // Terracotta accent slab
    const terracottaMat = new THREE.MeshStandardMaterial({
      color: 0xA65338,
      roughness: 0.75,
      metalness: 0.12,
    });

    // Raw umber structural block
    const umberMat = new THREE.MeshStandardMaterial({
      color: 0x755644,
      roughness: 0.85,
      metalness: 0.06,
    });

    // Wireframe geometric contour
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x1D1C19,
      transparent: true,
      opacity: 0.22,
    });

    // Geometries composing the architectural monolith:
    // 1. Primary cantilevered rectangular prism (Sandstone)
    const slab1Geo = new THREE.BoxGeometry(2.4, 0.45, 1.2);
    const slab1 = new THREE.Mesh(slab1Geo, sandstoneMat);
    slab1.position.set(-0.2, 0.4, 0);
    slab1.rotation.set(0.1, -0.3, 0.05);
    slab1.castShadow = true;
    slab1.receiveShadow = true;
    sculptureGroup.add(slab1);

    // Architectural wireframe edge for slab1
    const edges1 = new THREE.EdgesGeometry(slab1Geo);
    const wire1 = new THREE.LineSegments(edges1, wireMat);
    slab1.add(wire1);

    // 2. Vertical monolithic pylon (Charcoal)
    const pylonGeo = new THREE.BoxGeometry(0.55, 3.2, 0.7);
    const pylon = new THREE.Mesh(pylonGeo, charcoalMat);
    pylon.position.set(0.65, -0.1, -0.2);
    pylon.rotation.set(-0.05, 0.25, -0.08);
    pylon.castShadow = true;
    pylon.receiveShadow = true;
    sculptureGroup.add(pylon);

    const edges2 = new THREE.EdgesGeometry(pylonGeo);
    const wire2 = new THREE.LineSegments(edges2, wireMat);
    pylon.add(wire2);

    // 3. Offset terracotta accent block (Precision counterweight)
    const terraGeo = new THREE.BoxGeometry(0.85, 0.85, 0.85);
    const terraBlock = new THREE.Mesh(terraGeo, terracottaMat);
    terraBlock.position.set(-0.95, -0.75, 0.45);
    terraBlock.rotation.set(0.2, 0.5, 0.1);
    terraBlock.castShadow = true;
    terraBlock.receiveShadow = true;
    sculptureGroup.add(terraBlock);

    // 4. Grounding stepped platform (Umber)
    const baseGeo = new THREE.BoxGeometry(2.2, 0.28, 1.5);
    const baseBlock = new THREE.Mesh(baseGeo, umberMat);
    baseBlock.position.set(0.1, -1.35, 0.1);
    baseBlock.rotation.set(0.02, -0.15, 0);
    baseBlock.castShadow = true;
    baseBlock.receiveShadow = true;
    sculptureGroup.add(baseBlock);

    // 5. Delicate kinetic floating ring / disk (brass / bronze minimal ring)
    const ringGeo = new THREE.TorusGeometry(1.4, 0.02, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x755644,
      roughness: 0.4,
      metalness: 0.6,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.set(Math.PI / 3, 0.2, 0);
    ringMesh.position.set(0.1, 0.1, 0);
    sculptureGroup.add(ringMesh);

    // Lighting: directional architectural sunlight + ambient bounce
    const ambientLight = new THREE.AmbientLight(0xF1ECE3, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xFFF9EE, 2.2);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 25;
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0xA65338, 1.2);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    // Cursor tracking with smooth lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 1.5;
      mouseY = y * 1.2;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Responsive resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // IntersectionObserver so Three.js renders ONLY when visible in viewport
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Slow contemplative breathing rotation
      targetRotationY = mouseX * 0.45 + Math.sin(elapsedTime * 0.35) * 0.08;
      targetRotationX = -mouseY * 0.35 + Math.cos(elapsedTime * 0.28) * 0.06;

      sculptureGroup.rotation.y += (targetRotationY - sculptureGroup.rotation.y) * 0.05;
      sculptureGroup.rotation.x += (targetRotationX - sculptureGroup.rotation.x) * 0.05;

      // Subtle counter-oscillation of ring and accent
      ringMesh.rotation.z = elapsedTime * 0.12;
      terraBlock.rotation.y = elapsedTime * 0.18;

      renderer.render(scene, camera);
    };

    animate();

    // Clean lifecycle disposal
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries & materials
      slab1Geo.dispose();
      pylonGeo.dispose();
      terraGeo.dispose();
      baseGeo.dispose();
      ringGeo.dispose();
      edges1.dispose();
      edges2.dispose();

      sandstoneMat.dispose();
      charcoalMat.dispose();
      terracottaMat.dispose();
      umberMat.dispose();
      wireMat.dispose();
      ringMat.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[580px] relative pointer-events-none select-none flex items-center justify-center"
      aria-label="Interactive 3D Architectural Sculpture"
    >
      {/* Registration stamp overlay on the 3D canvas */}
      <div className="absolute top-4 left-4 font-display text-[10px] tracking-widest text-[#755644] uppercase pointer-events-none opacity-60">
        [MONOLITH // SPEC_3D.KINETIC]
      </div>
      <div className="absolute bottom-4 right-4 font-display text-[10px] tracking-widest text-[#755644] uppercase pointer-events-none opacity-60">
        [COORD: 7.9797°S 112.6304°E]
      </div>
      <div className="absolute top-4 right-4 text-xs font-mono text-[#A65338] pointer-events-none opacity-70">
        +
      </div>
      <div className="absolute bottom-4 left-4 text-xs font-mono text-[#A65338] pointer-events-none opacity-70">
        +
      </div>
    </div>
  );
};

