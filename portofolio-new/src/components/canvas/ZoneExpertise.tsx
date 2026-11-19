import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ZoneExpertiseProps {
  progress: number;
}

// =========================================================================
// PROCEDURAL CANVAS TEXTURES: 4 DISTINCT EXPERTISE INSTALLATIONS
// =========================================================================

/**
 * Installation 01: Frontend Engineering
 * A sophisticated website interface preview (NOT random code), complete with
 * browser chrome, hero typography, UI card grid, inspection boxes, and tech badges.
 */
function generateFrontendScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Background
  ctx.fillStyle = '#141311';
  ctx.fillRect(0, 0, 1024, 640);

  // Browser Chrome Header
  ctx.fillStyle = '#1F1E1B';
  ctx.fillRect(0, 0, 1024, 44);

  // Window Dots (Portfolio Palette)
  const dots = ['#A65338', '#D4A373', '#74705E'];
  dots.forEach((col, i) => {
    ctx.beginPath();
    ctx.arc(24 + i * 18, 22, 5, 0, Math.PI * 2);
    ctx.fillStyle = col;
    ctx.fill();
  });

  // URL Omnibox
  ctx.fillStyle = '#141311';
  ctx.fillRect(100, 8, 480, 28);
  ctx.strokeStyle = '#38342E';
  ctx.lineWidth = 1;
  ctx.strokeRect(100, 8, 480, 28);

  ctx.fillStyle = '#22C55E';
  ctx.beginPath();
  ctx.arc(116, 22, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#E1D8CA';
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillText('https://mellino.studio/atelier/spatial-craft', 128, 26);

  // Viewport Tab Header
  ctx.fillStyle = '#2A2824';
  ctx.fillRect(600, 8, 160, 28);
  ctx.fillStyle = '#F1ECE3';
  ctx.fillText('Mellino Atelier UI', 616, 26);

  // --- WEBSITE PREVIEW CANVAS ---
  // Top Navigation Bar
  ctx.fillStyle = '#1A1916';
  ctx.fillRect(0, 44, 1024, 52);
  ctx.strokeStyle = '#2B2823';
  ctx.beginPath();
  ctx.moveTo(0, 96);
  ctx.lineTo(1024, 96);
  ctx.stroke();

  // Brand Monogram
  ctx.fillStyle = '#F1ECE3';
  ctx.fillRect(36, 56, 28, 28);
  ctx.fillStyle = '#141311';
  ctx.font = 'bold 16px "Playfair Display", Georgia, serif';
  ctx.fillText('M', 43, 76);

  ctx.fillStyle = '#F1ECE3';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText('MELLINO', 76, 74);

  // Nav Links
  const navLinks = ['01 ENTRANCE', '02 ABOUT', '03 EXPERTISE', '04 PROJECTS'];
  navLinks.forEach((nav, idx) => {
    ctx.fillStyle = idx === 2 ? '#A65338' : '#A39D91';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillText(nav, 560 + idx * 110, 74);
  });

  // Hero Section Layout
  ctx.fillStyle = '#A65338';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('FRONTEND ARCHITECTURE // COMPONENT RESILIENCE', 40, 140);

  ctx.fillStyle = '#F1ECE3';
  ctx.font = 'bold 44px "Playfair Display", Georgia, serif';
  ctx.fillText('The Art of Digital Craft', 40, 195);

  ctx.fillStyle = '#C8C1B4';
  ctx.font = '15px "Inter", sans-serif';
  ctx.fillText('Translating architectural thinking into modular, accessible, and sub-second web interfaces.', 40, 230);

  // Call-To-Action Button
  ctx.fillStyle = '#A65338';
  ctx.fillRect(40, 260, 180, 42);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText('EXPLORE ATELIER →', 62, 286);

  // Secondary Button
  ctx.strokeStyle = '#E1D8CA';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(235, 260, 140, 42);
  ctx.fillStyle = '#E1D8CA';
  ctx.fillText('VIEW SYSTEM', 258, 286);

  // Three Architectural Cards Grid
  const cardTitles = [
    { cat: 'COMPONENT DESIGN', title: 'Modular Design Tokens', tag: '8pt Grid' },
    { cat: 'PERFORMANCE', title: '60 FPS Frame Budget', tag: '<16.6ms' },
    { cat: 'TYPOGRAPHY', title: 'Fluid Editorial Scale', tag: 'Responsive' },
  ];

  cardTitles.forEach((c, idx) => {
    const x = 40 + idx * 315;
    const y = 335;
    ctx.fillStyle = '#1D1C19';
    ctx.fillRect(x, y, 300, 180);
    ctx.strokeStyle = '#38342E';
    ctx.strokeRect(x, y, 300, 180);

    // Card Tag
    ctx.fillStyle = '#A65338';
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.fillText(c.cat, x + 20, y + 34);

    // Card Title
    ctx.fillStyle = '#F1ECE3';
    ctx.font = 'bold 18px "Playfair Display", serif';
    ctx.fillText(c.title, x + 20, y + 68);

    // Card Wireframe lines
    ctx.fillStyle = '#2B2823';
    ctx.fillRect(x + 20, y + 90, 260, 8);
    ctx.fillRect(x + 20, y + 106, 210, 8);
    ctx.fillRect(x + 20, y + 122, 160, 8);

    // Badge
    ctx.fillStyle = '#2E2B25';
    ctx.fillRect(x + 20, y + 145, 80, 20);
    ctx.fillStyle = '#D4A373';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText(c.tag, x + 30, y + 159);
  });

  // UI Inspector Overlay (Bounding Box Dimensions & Padding Tokens)
  ctx.strokeStyle = '#60A5FA';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.strokeRect(36, 115, 952, 200);
  ctx.setLineDash([]);

  ctx.fillStyle = '#60A5FA';
  ctx.font = '10px "JetBrains Mono", monospace';
  ctx.fillText('<HeroSection padding="24px" layout="flex" /> [952 × 200]', 40, 110);

  // Bottom Tech Bar
  ctx.fillStyle = '#100F0E';
  ctx.fillRect(0, 580, 1024, 60);

  const techs = ['REACT 19', 'NEXT.JS 15', 'HTML5 SEMANTICS', 'CSS3 / TAILWIND', 'TYPESCRIPT'];
  techs.forEach((tech, idx) => {
    ctx.fillStyle = '#A65338';
    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    ctx.fillText('◆', 40 + idx * 190, 615);
    ctx.fillStyle = '#E1D8CA';
    ctx.fillText(tech, 60 + idx * 190, 615);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

/**
 * Installation 01: Secondary Mobile/Tablet Simulator Display
 */
function generateMobilePreviewTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 680;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#141311';
  ctx.fillRect(0, 0, 400, 680);

  // Phone Header / Status Bar
  ctx.fillStyle = '#1E1D19';
  ctx.fillRect(0, 0, 400, 32);

  ctx.fillStyle = '#E1D8CA';
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillText('9:41', 24, 20);
  ctx.fillText('100% 5G', 320, 20);

  // Mobile App Header
  ctx.fillStyle = '#1D1C19';
  ctx.fillRect(0, 32, 400, 52);
  ctx.fillStyle = '#F1ECE3';
  ctx.font = 'bold 14px "JetBrains Mono", monospace';
  ctx.fillText('MELLINO // MOBILE', 24, 64);

  // Responsive Recomposed Stack
  ctx.fillStyle = '#A65338';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('ADAPTIVE VIEWPORT', 24, 120);

  ctx.fillStyle = '#F1ECE3';
  ctx.font = 'bold 24px "Playfair Display", serif';
  ctx.fillText('Digital Atelier', 24, 155);

  ctx.fillStyle = '#A39D91';
  ctx.font = '12px "Inter", sans-serif';
  ctx.fillText('Fluid layouts crafted for touch.', 24, 185);

  // Mobile Stack Cards
  [1, 2, 3].forEach((_, i) => {
    const y = 220 + i * 135;
    ctx.fillStyle = '#1E1D19';
    ctx.fillRect(24, y, 352, 115);
    ctx.strokeStyle = '#38342E';
    ctx.strokeRect(24, y, 352, 115);

    ctx.fillStyle = '#A65338';
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.fillText(`MODULE 0${i + 1}`, 40, y + 30);

    ctx.fillStyle = '#E1D8CA';
    ctx.font = '13px "Inter", sans-serif';
    ctx.fillText(`Responsive Touch Surface ${i + 1}`, 40, y + 60);

    ctx.fillStyle = '#2E2B25';
    ctx.fillRect(40, y + 80, 160, 6);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  return texture;
}

/**
 * Installation 02: Backend Engineering
 * Relational MySQL Schema ERD Diagram + Golang Runtime Concurrency Metrics.
 */
function generateBackendScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#131311';
  ctx.fillRect(0, 0, 768, 640);

  // Title Bar
  ctx.fillStyle = '#1E1D1A';
  ctx.fillRect(0, 0, 768, 40);

  ctx.fillStyle = '#22C55E';
  ctx.beginPath();
  ctx.arc(24, 20, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#F1ECE3';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText('MYSQL RELATIONAL SCHEMA & GOLANG CONCURRENCY TELEMETRY', 40, 24);

  // Relational Tables (ERD)
  // Table 1: users
  ctx.strokeStyle = '#38342E';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(40, 65, 310, 155);
  ctx.fillStyle = '#1D1C19';
  ctx.fillRect(40, 65, 310, 30);
  ctx.fillStyle = '#A65338';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('TABLE: users (Primary Entity)', 52, 85);

  const userFields = ['id: uuid [PK]', 'email: varchar(255) [UNIQUE]', 'role: enum [admin, client]', 'created_at: timestamp'];
  userFields.forEach((f, idx) => {
    ctx.fillStyle = idx === 0 ? '#E1D8CA' : '#A39D91';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillText(f, 56, 120 + idx * 24);
  });

  // Table 2: projects
  ctx.strokeRect(410, 65, 318, 155);
  ctx.fillStyle = '#1D1C19';
  ctx.fillRect(410, 65, 318, 30);
  ctx.fillStyle = '#A65338';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('TABLE: projects (Indexed Cluster)', 422, 85);

  const projFields = ['id: uuid [PK]', 'user_id: uuid [FK -> users.id]', 'slug: varchar(120) [INDEX]', 'performance_fps: float64'];
  projFields.forEach((f, idx) => {
    ctx.fillStyle = idx === 0 || idx === 1 ? '#E1D8CA' : '#A39D91';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillText(f, 426, 120 + idx * 24);
  });

  // Relation Line between users and projects
  ctx.strokeStyle = '#A65338';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(350, 140);
  ctx.lineTo(410, 140);
  ctx.stroke();
  ctx.fillStyle = '#A65338';
  ctx.fillText('1:N', 368, 134);

  // Lower Section: Golang Runtime & Transaction Metrics
  ctx.fillStyle = '#1A1916';
  ctx.fillRect(40, 250, 688, 350);
  ctx.strokeStyle = '#38342E';
  ctx.strokeRect(40, 250, 688, 350);

  ctx.fillStyle = '#22C55E';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText('● GOLANG RUNTIME // HIGH CONCURRENCY WORKER POOLS', 60, 285);

  const stats = [
    { label: 'ACTIVE GOROUTINES', val: '32 workers pooled', col: '#22C55E' },
    { label: 'ACID TX COMMIT RATE', val: '99.998% success', col: '#22C55E' },
    { label: 'QUERY LATENCY P50', val: '1.8ms (indexed)', col: '#60A5FA' },
    { label: 'QUERY LATENCY P99', val: '7.4ms (stress test)', col: '#60A5FA' },
    { label: 'HEAP ALLOC', val: '28.4 MB (0 memory leaks)', col: '#D4A373' },
    { label: 'MYSQL CONN POOL', val: '16/32 connections active', col: '#D4A373' },
  ];

  stats.forEach((st, idx) => {
    const x = idx % 2 === 0 ? 60 : 400;
    const y = 325 + Math.floor(idx / 2) * 55;
    ctx.fillStyle = '#8C877D';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText(st.label, x, y);
    ctx.fillStyle = st.col;
    ctx.font = 'bold 13px "JetBrains Mono", monospace';
    ctx.fillText(st.val, x, y + 20);
  });

  // Query Execution Log Stream
  ctx.fillStyle = '#100F0E';
  ctx.fillRect(60, 480, 648, 100);
  ctx.strokeStyle = '#282622';
  ctx.strokeRect(60, 480, 648, 100);

  ctx.fillStyle = '#74705E';
  ctx.font = '10px "JetBrains Mono", monospace';
  ctx.fillText('LIVE TRANSACTION STREAM (ISOLATION: REPEATABLE READ)', 76, 505);
  ctx.fillStyle = '#22C55E';
  ctx.fillText('➜ [0.8ms] SELECT * FROM projects WHERE status = \'published\';', 76, 530);
  ctx.fillStyle = '#A65338';
  ctx.fillText('➜ [1.2ms] INSERT INTO telemetry_sessions (id, latency) VALUES ($1, $2);', 76, 555);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

/**
 * Installation 03: System Integration
 * API Gateway routing, JWT Auth verification, WebSockets, and data flow.
 */
function generateIntegrationScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#141412';
  ctx.fillRect(0, 0, 1024, 640);

  // Header Title
  ctx.fillStyle = '#1E1D1A';
  ctx.fillRect(0, 0, 1024, 44);

  ctx.fillStyle = '#A65338';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText('SYSTEM INTEGRATION // CENTRAL API GATEWAY & AUTH PIPELINE', 36, 28);

  // System Flow Diagram: CLIENT ➔ GATEWAY ➔ SERVICES ➔ DATABASE
  const nodes = [
    { title: 'CLIENT LAYER', sub: 'React / Next.js', x: 40, col: '#1E1D1A' },
    { title: 'API GATEWAY', sub: 'Go Reverse Proxy', x: 280, col: '#A65338' },
    { title: 'AUTH PIPELINE', sub: 'JWT Token Verify', x: 530, col: '#74705E' },
    { title: 'DATA STORE', sub: 'MySQL ACID Cluster', x: 770, col: '#1E1D1A' },
  ];

  nodes.forEach((n) => {
    ctx.strokeStyle = '#38342E';
    ctx.lineWidth = 2;
    ctx.strokeRect(n.x, 80, 210, 110);
    ctx.fillStyle = n.col;
    ctx.fillRect(n.x, 80, 210, 32);

    ctx.fillStyle = '#F1ECE3';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText(n.title, n.x + 16, 102);

    ctx.fillStyle = '#E1D8CA';
    ctx.font = '12px "Inter", sans-serif';
    ctx.fillText(n.sub, n.x + 16, 145);

    ctx.fillStyle = '#22C55E';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText('● CONNECTED', n.x + 16, 170);
  });

  // Connecting Data Flow Conduits (Arrows)
  ctx.strokeStyle = '#A65338';
  ctx.lineWidth = 3;
  [250, 490, 740].forEach((arrowX) => {
    ctx.beginPath();
    ctx.moveTo(arrowX, 135);
    ctx.lineTo(arrowX + 30, 135);
    ctx.stroke();
  });

  // Live API Requests Table
  ctx.fillStyle = '#1B1A17';
  ctx.fillRect(40, 230, 944, 370);
  ctx.strokeStyle = '#38342E';
  ctx.strokeRect(40, 230, 944, 370);

  ctx.fillStyle = '#A65338';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText('LIVE ENDPOINT INTERCEPTOR // REST & STREAMING PIPELINES', 60, 265);

  const endpoints = [
    { method: 'POST', path: '/api/v1/auth/verify', status: '200 OK', time: '12ms', desc: 'Bearer JWT Handshake' },
    { method: 'GET', path: '/api/v1/projects?category=all', status: '200 OK', time: '6ms', desc: 'Normalized JSON Response' },
    { method: 'GET', path: '/api/v1/capabilities/manifest', status: '200 OK', time: '4ms', desc: 'In-Memory Cache Hit' },
    { method: 'WS', path: '/stream/spatial-telemetry', status: '101 SWITCH', time: '0ms', desc: '60 FPS Full-Duplex Concurrency' },
  ];

  endpoints.forEach((ep, idx) => {
    const y = 310 + idx * 65;
    ctx.fillStyle = '#141311';
    ctx.fillRect(60, y - 20, 904, 50);
    ctx.strokeStyle = '#282622';
    ctx.strokeRect(60, y - 20, 904, 50);

    // Method Badge
    ctx.fillStyle = ep.method === 'POST' ? '#A65338' : ep.method === 'WS' ? '#D4A373' : '#22C55E';
    ctx.fillRect(76, y - 10, 56, 28);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText(ep.method, 88, y + 8);

    // Path
    ctx.fillStyle = '#F1ECE3';
    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    ctx.fillText(ep.path, 150, y + 8);

    // Status
    ctx.fillStyle = '#22C55E';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText(ep.status, 520, y + 8);

    // Latency
    ctx.fillStyle = '#60A5FA';
    ctx.fillText(ep.time, 650, y + 8);

    // Description
    ctx.fillStyle = '#8C877D';
    ctx.fillText(ep.desc, 730, y + 8);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

/**
 * Installation 04: Tools & Workflow
 * Git commit tree branch graph, VS Code editor, and Postman test suite.
 */
function generateWorkflowScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#141311';
  ctx.fillRect(0, 0, 640, 800);

  // VS Code Title Bar
  ctx.fillStyle = '#1E1D19';
  ctx.fillRect(0, 0, 640, 40);

  ctx.fillStyle = '#F1ECE3';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText('VS CODE // GIT VERSION CONTROL & TEST SUITE', 24, 25);

  // Top Tabs
  ctx.fillStyle = '#2A2824';
  ctx.fillRect(24, 48, 160, 30);
  ctx.fillStyle = '#F1ECE3';
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillText('ZoneExpertise.tsx', 36, 68);

  ctx.fillStyle = '#1A1916';
  ctx.fillRect(188, 48, 140, 30);
  ctx.fillStyle = '#74705E';
  ctx.fillText('api_test.go', 200, 68);

  // Section 1: Git Commit Tree Branch Graph
  ctx.fillStyle = '#1D1C19';
  ctx.fillRect(24, 95, 592, 280);
  ctx.strokeStyle = '#38342E';
  ctx.strokeRect(24, 95, 592, 280);

  ctx.fillStyle = '#A65338';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('GIT COMMIT GRAPH // PRODUCTION INTEGRATION', 44, 125);

  // Draw Commit Lines
  ctx.strokeStyle = '#22C55E'; // main
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(50, 150);
  ctx.lineTo(50, 340);
  ctx.stroke();

  ctx.strokeStyle = '#A65338'; // feature
  ctx.beginPath();
  ctx.moveTo(50, 200);
  ctx.bezierCurveTo(90, 200, 90, 250, 90, 290);
  ctx.lineTo(50, 340);
  ctx.stroke();

  // Commit Nodes and Labels
  const commits = [
    { hash: '7e89ab1', msg: 'feat(expertise): 4 lab installations implemented', tag: 'main' },
    { hash: '4a3c209', msg: 'perf(webgl): cull inactive chapter geometries', tag: 'perf' },
    { hash: '12f8a44', msg: 'test(api): 18/18 integration tests passed', tag: 'tested' },
    { hash: '90b5c12', msg: 'chore: zero warnings in oxlint & tsc', tag: 'clean' },
  ];

  commits.forEach((cm, idx) => {
    const y = 160 + idx * 52;
    ctx.beginPath();
    ctx.arc(50, y, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#22C55E';
    ctx.fill();

    ctx.fillStyle = '#A65338';
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.fillText(cm.hash, 110, y + 4);

    ctx.fillStyle = '#F1ECE3';
    ctx.font = '11px "Inter", sans-serif';
    ctx.fillText(cm.msg, 180, y + 4);
  });

  // Section 2: Postman API Test Suite Console
  ctx.fillStyle = '#1D1C19';
  ctx.fillRect(24, 400, 592, 360);
  ctx.strokeStyle = '#38342E';
  ctx.strokeRect(24, 400, 592, 360);

  ctx.fillStyle = '#A65338';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('POSTMAN TEST SUITE // ATELIER AUTOMATION RUNNER', 44, 435);

  const tests = [
    { name: 'GET /healthz ➔ Status 200 (Latency: 2ms)', pass: true },
    { name: 'POST /v1/auth ➔ Valid JWT Signature', pass: true },
    { name: 'GET /v1/capabilities ➔ JSON Schema Valid', pass: true },
    { name: 'WS /stream ➔ Handshake 101 Switching Protocols', pass: true },
    { name: 'STRICT LINT ➔ Oxlint 0 warnings, 0 errors', pass: true },
    { name: 'TYPE INTEGRITY ➔ TypeScript Strict Compilation', pass: true },
  ];

  tests.forEach((t, idx) => {
    const y = 475 + idx * 42;
    ctx.fillStyle = '#22C55E';
    ctx.beginPath();
    ctx.arc(48, y, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#E1D8CA';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillText('PASS', 62, y + 4);

    ctx.fillStyle = '#F1ECE3';
    ctx.fillText(t.name, 110, y + 4);
  });

  // Bottom Summary Bar
  ctx.fillStyle = '#100F0E';
  ctx.fillRect(44, 715, 552, 32);
  ctx.fillStyle = '#22C55E';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('TESTS: 6/6 PASSED (100%)  │  TIME: 24ms  │  ENVIRONMENT: PROD', 56, 735);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

// =========================================================================
// MAIN ZONE EXPERTISE: THE ENGINEERING LAB
// =========================================================================

export const ZoneExpertise: React.FC<ZoneExpertiseProps> = ({ progress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const serverLedsRef = useRef<THREE.Group>(null);
  const spotLightRef = useRef<THREE.SpotLight>(null);

  // Procedural Screen Textures
  const frontendScreenTexture = useMemo(() => generateFrontendScreenTexture(), []);
  const mobilePreviewTexture = useMemo(() => generateMobilePreviewTexture(), []);
  const backendScreenTexture = useMemo(() => generateBackendScreenTexture(), []);
  const integrationScreenTexture = useMemo(() => generateIntegrationScreenTexture(), []);
  const workflowScreenTexture = useMemo(() => generateWorkflowScreenTexture(), []);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;

    // Strict Visibility Lifecycle: active between 0.32 and 0.62
    const isVisible = progress >= 0.32 && progress <= 0.62;
    groupRef.current.visible = isVisible;
    if (!isVisible) return;

    // Smooth transition in (0.32 to 0.40) and out (0.54 to 0.62)
    let factor = 1.0;
    if (progress < 0.40) {
      factor = Math.max(0, (progress - 0.32) / 0.08);
    } else if (progress > 0.54) {
      factor = Math.max(0, 1 - (progress - 0.54) / 0.08);
    }
    groupRef.current.position.y = -0.6 - (1 - factor) * 4.0;

    const t = clock.getElapsedTime();

    // Subtle pointer parallax
    groupRef.current.rotation.y = 0.92 + pointer.x * 0.025;
    groupRef.current.rotation.x = -pointer.y * 0.012;

    // Gentle pulse on main spotlight
    if (spotLightRef.current) {
      spotLightRef.current.intensity = 2.6 + Math.sin(t * 1.5) * 0.15;
    }

    // Blinking Server LEDs
    if (serverLedsRef.current) {
      serverLedsRef.current.children.forEach((child, idx) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          const blink = Math.sin(t * 10.0 + idx * 1.8) > 0.2 ? 1.0 : 0.2;
          child.material.emissiveIntensity = blink;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[-2.8, -0.6, -19.5]} rotation={[0, 0.92, 0]}>
      {/* ========================================================
          1. GRAND LABORATORY FLOOR & CIRCULATION PLINTH
         ======================================================== */}
      {/* Lower Volcanic Basalt Plinth */}
      <mesh position={[0.0, -0.16, 0.0]} receiveShadow>
        <boxGeometry args={[9.4, 0.32, 7.0]} />
        <meshStandardMaterial color="#161513" roughness={0.92} metalness={0.08} />
      </mesh>

      {/* Recessed Shadow Joint */}
      <mesh position={[0.0, -0.01, 0.0]}>
        <boxGeometry args={[9.1, 0.04, 6.7]} />
        <meshStandardMaterial color="#0B0A09" roughness={1.0} />
      </mesh>

      {/* Honed Travertine Lab Floor Inlay */}
      <mesh position={[0.0, 0.02, 0.0]} receiveShadow>
        <boxGeometry args={[8.8, 0.02, 6.4]} />
        <meshStandardMaterial color="#DDD6C9" roughness={0.9} metalness={0.04} />
      </mesh>

      {/* Brass Conduit Channels on Floor connecting the 4 installations */}
      {/* Horizontal Main Conduit */}
      <mesh position={[0.0, 0.032, 0.0]}>
        <boxGeometry args={[7.8, 0.006, 0.03]} />
        <meshStandardMaterial color="#C58A5B" metalness={0.88} roughness={0.22} />
      </mesh>
      {/* Vertical Cross Conduit */}
      <mesh position={[0.0, 0.032, 0.0]}>
        <boxGeometry args={[0.03, 0.006, 5.6]} />
        <meshStandardMaterial color="#C58A5B" metalness={0.88} roughness={0.22} />
      </mesh>
      {/* Central Brass Junction Node Emblem */}
      <mesh position={[0.0, 0.034, 0.0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.18, 0.22, 32]} />
        <meshStandardMaterial color="#C58A5B" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Overhead Architectural Steel Gantry / Lintel Beam */}
      <mesh position={[0.0, 4.4, 0.0]} castShadow>
        <boxGeometry args={[9.4, 0.12, 0.3]} />
        <meshStandardMaterial color="#1E1D1B" roughness={0.7} metalness={0.4} />
      </mesh>

      {/* ========================================================
          INSTALLATION 01 — FRONTEND ENGINEERING (LEFT-FRONT)
          27" Desktop Monitor, Portrait Simulator, UI Component Blocks,
          Keyboard, Mouse, and Brass Exhibition Plaque.
         ======================================================== */}
      <group position={[-2.6, 0.0, 1.4]}>
        {/* Raised Display Console Platform */}
        <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 0.84, 1.4]} />
          <meshStandardMaterial color="#6B4B3C" roughness={0.65} metalness={0.04} />
        </mesh>
        {/* Brass Console Trim */}
        <mesh position={[0, 0.845, 0]}>
          <boxGeometry args={[2.54, 0.015, 1.44]} />
          <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* --- A. 27" DESKTOP WIDESCREEN DISPLAY --- */}
        <group position={[-0.2, 0.86, -0.15]}>
          {/* Aluminum Monitor Stand */}
          <mesh position={[0, 0.01, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.38, 0.02, 0.24]} />
            <meshStandardMaterial color="#22201D" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.36, -0.04]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 0.72, 16]} />
            <meshStandardMaterial color="#22201D" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Monitor Screen Housing */}
          <group position={[0, 0.76, 0.02]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.56, 0.98, 0.04]} />
              <meshStandardMaterial color="#181715" roughness={0.6} metalness={0.5} />
            </mesh>
            {/* High-Fidelity Website Preview Screen */}
            <mesh position={[0, 0, 0.022]}>
              <planeGeometry args={[1.5, 0.92]} />
              <meshStandardMaterial
                map={frontendScreenTexture}
                emissive="#385263"
                emissiveMap={frontendScreenTexture}
                emissiveIntensity={0.25}
                roughness={0.2}
              />
            </mesh>
            {/* Screen Glow */}
            <pointLight position={[0, 0, 0.4]} intensity={0.85} distance={2.4} color="#60A5FA" />
          </group>
        </group>

        {/* --- B. SECONDARY RESPONSIVE PORTRAIT DISPLAY --- */}
        <group position={[0.88, 0.86, -0.05]} rotation={[0, -0.25, 0]}>
          <mesh position={[0, 0.24, 0]} castShadow>
            <cylinderGeometry args={[0.018, 0.018, 0.48, 16]} />
            <meshStandardMaterial color="#22201D" metalness={0.7} roughness={0.3} />
          </mesh>
          <group position={[0, 0.52, 0.01]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.48, 0.76, 0.03]} />
              <meshStandardMaterial color="#181715" roughness={0.6} />
            </mesh>
            <mesh position={[0, 0, 0.017]}>
              <planeGeometry args={[0.44, 0.72]} />
              <meshStandardMaterial
                map={mobilePreviewTexture}
                emissive="#385263"
                emissiveMap={mobilePreviewTexture}
                emissiveIntensity={0.22}
                roughness={0.25}
              />
            </mesh>
          </group>
        </group>

        {/* --- C. MODULAR UI COMPONENT SAMPLE TRAY --- */}
        <group position={[-0.2, 0.87, 0.45]}>
          <mesh receiveShadow>
            <boxGeometry args={[1.1, 0.02, 0.32]} />
            <meshStandardMaterial color="#1E1D19" roughness={0.7} />
          </mesh>
          {/* Physical UI Component Blocks */}
          {/* Button Tile */}
          <mesh position={[-0.38, 0.02, 0]} castShadow>
            <boxGeometry args={[0.22, 0.02, 0.12]} />
            <meshStandardMaterial color="#A65338" roughness={0.5} />
          </mesh>
          {/* Card Tile */}
          <mesh position={[-0.12, 0.02, 0]} castShadow>
            <boxGeometry args={[0.24, 0.02, 0.18]} />
            <meshStandardMaterial color="#F1ECE3" roughness={0.6} />
          </mesh>
          {/* Input Tile */}
          <mesh position={[0.16, 0.02, 0]} castShadow>
            <boxGeometry args={[0.24, 0.02, 0.1]} />
            <meshStandardMaterial color="#2E2B25" roughness={0.8} />
          </mesh>
          {/* Badge Tile */}
          <mesh position={[0.38, 0.02, 0]} castShadow>
            <boxGeometry args={[0.14, 0.02, 0.08]} />
            <meshStandardMaterial color="#74705E" roughness={0.6} />
          </mesh>
        </group>

        {/* --- D. INPUT PERIPHERALS: KEYBOARD & MOUSE --- */}
        <group position={[-0.2, 0.865, 0.18]}>
          {/* Keyboard Chassis */}
          <mesh position={[-0.12, 0.015, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.62, 0.025, 0.22]} />
            <meshStandardMaterial color="#181715" roughness={0.6} metalness={0.5} />
          </mesh>
          {/* Mouse */}
          <mesh position={[0.32, 0.02, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.11, 0.035, 0.18]} />
            <meshStandardMaterial color="#24221F" roughness={0.6} />
          </mesh>
        </group>

        {/* Engraved Brass Exhibition Plaque */}
        <mesh position={[0, 0.45, 0.71]} castShadow>
          <boxGeometry args={[1.8, 0.14, 0.015]} />
          <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>

      {/* ========================================================
          INSTALLATION 02 — BACKEND ENGINEERING (LEFT-REAR)
          8U Server Rack Tower, NVMe Array, Database ERD Display,
          Cable Harnesses, and Concurrency Telemetry.
         ======================================================== */}
      <group position={[-2.6, 0.0, -1.8]}>
        {/* Server Enclosure Base Platform */}
        <mesh position={[0, 0.1, 0]} receiveShadow>
          <boxGeometry args={[2.0, 0.2, 1.4]} />
          <meshStandardMaterial color="#181715" roughness={0.9} />
        </mesh>

        {/* --- A. 8U SERVER RACK UNIT TOWER --- */}
        <group position={[-0.35, 0.2, 0]}>
          {/* Main Server Rack Chassis */}
          <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.05, 1.7, 0.75]} />
            <meshStandardMaterial color="#181715" roughness={0.6} metalness={0.6} />
          </mesh>
          {/* Glass Door with Steel Mesh Frame */}
          <mesh position={[0, 0.85, 0.38]}>
            <boxGeometry args={[0.98, 1.62, 0.01]} />
            <meshPhysicalMaterial roughness={0.1} transmission={0.75} transparent opacity={0.4} />
          </mesh>

          {/* 4 Modular Blade Units */}
          {[0, 1, 2, 3].map((bIdx) => (
            <group key={bIdx} position={[0, 0.35 + bIdx * 0.36, 0.1]}>
              {/* Blade Faceplate */}
              <mesh position={[0, 0, 0.26]} castShadow>
                <boxGeometry args={[0.94, 0.28, 0.02]} />
                <meshStandardMaterial color="#22201D" roughness={0.5} metalness={0.7} />
              </mesh>
              {/* Drive Bay Sleds */}
              <mesh position={[-0.18, 0, 0.275]}>
                <boxGeometry args={[0.5, 0.2, 0.008]} />
                <meshStandardMaterial color="#141311" roughness={0.9} />
              </mesh>
              {/* Brass Extraction Latches */}
              <mesh position={[0.34, 0, 0.275]} castShadow>
                <boxGeometry args={[0.12, 0.12, 0.012]} />
                <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
              </mesh>
            </group>
          ))}

          {/* Status LED Matrix on Server Blades */}
          <group ref={serverLedsRef} position={[-0.45, 0.2, 0.38]}>
            {Array.from({ length: 12 }).map((_, idx) => (
              <mesh key={idx} position={[0.1 + (idx % 4) * 0.06, 0.2 + Math.floor(idx / 4) * 0.36, 0]}>
                <sphereGeometry args={[0.009, 12, 12]} />
                <meshStandardMaterial
                  color={idx % 3 === 0 ? '#22C55E' : idx % 3 === 1 ? '#F59E0B' : '#60A5FA'}
                  emissive={idx % 3 === 0 ? '#22C55E' : idx % 3 === 1 ? '#F59E0B' : '#60A5FA'}
                  emissiveIntensity={1.0}
                />
              </mesh>
            ))}
          </group>
        </group>

        {/* --- B. DATABASE VISUALIZATION & TELEMETRY MONITOR --- */}
        <group position={[0.65, 0.95, 0.1]} rotation={[0, -0.35, 0]}>
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.6, 16]} />
            <meshStandardMaterial color="#22201D" metalness={0.7} roughness={0.3} />
          </mesh>
          <group position={[0, 0.45, 0.02]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.05, 0.88, 0.04]} />
              <meshStandardMaterial color="#181715" roughness={0.6} metalness={0.5} />
            </mesh>
            <mesh position={[0, 0, 0.022]}>
              <planeGeometry args={[1.0, 0.84]} />
              <meshStandardMaterial
                map={backendScreenTexture}
                emissive="#385263"
                emissiveMap={backendScreenTexture}
                emissiveIntensity={0.25}
                roughness={0.2}
              />
            </mesh>
          </group>
        </group>

        {/* --- C. PHYSICAL NETWORK CABLE BUNDLES (BLUE & FIBER OPTIC) --- */}
        <group position={[-0.35, 0.25, 0.4]}>
          {/* Blue Cat6 Bundle */}
          <mesh position={[-0.15, 0.45, 0]} rotation={[0, 0, 0.05]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 0.9, 12]} />
            <meshStandardMaterial color="#2563EB" roughness={0.7} />
          </mesh>
          {/* Yellow Fiber Bundle */}
          <mesh position={[0.15, 0.45, 0]} rotation={[0, 0, -0.05]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.9, 12]} />
            <meshStandardMaterial color="#EAB308" roughness={0.7} />
          </mesh>
        </group>

        {/* Engraved Brass Exhibition Plaque */}
        <mesh position={[0, 0.12, 0.71]} castShadow>
          <boxGeometry args={[1.8, 0.14, 0.015]} />
          <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>

      {/* ========================================================
          INSTALLATION 03 — SYSTEM INTEGRATION (RIGHT-REAR)
          Central API Gateway Routing Console, Auth Handshake Display,
          Conduits to Backend/Frontend.
         ======================================================== */}
      <group position={[1.4, 0.0, -1.8]}>
        {/* Console Plinth Base */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.9, 1.2]} />
          <meshStandardMaterial color="#1F1E1B" roughness={0.8} metalness={0.15} />
        </mesh>
        {/* Brass Plinth Crown */}
        <mesh position={[0, 0.905, 0]}>
          <boxGeometry args={[2.24, 0.015, 1.24]} />
          <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Central Gateway Routing Tower */}
        <mesh position={[-0.6, 1.2, 0]} castShadow>
          <boxGeometry args={[0.45, 0.6, 0.45]} />
          <meshStandardMaterial color="#161513" roughness={0.6} metalness={0.6} />
        </mesh>
        <mesh position={[-0.6, 1.52, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.04, 24]} />
          <meshStandardMaterial color="#A65338" emissive="#A65338" emissiveIntensity={0.6} />
        </mesh>

        {/* --- SYSTEM INTEGRATION & AUTH FLOW MONITOR --- */}
        <group position={[0.3, 1.15, 0.05]} rotation={[-0.1, 0.15, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.45, 0.96, 0.04]} />
            <meshStandardMaterial color="#181715" roughness={0.6} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0, 0.022]}>
            <planeGeometry args={[1.4, 0.92]} />
            <meshStandardMaterial
              map={integrationScreenTexture}
              emissive="#385263"
              emissiveMap={integrationScreenTexture}
              emissiveIntensity={0.25}
              roughness={0.2}
            />
          </mesh>
          <pointLight position={[0, 0, 0.4]} intensity={0.85} distance={2.4} color="#D4A373" />
        </group>

        {/* Polished Brass Physical Conduit Tubes Running from Gateway */}
        <group position={[-0.6, 0.92, 0]}>
          <mesh position={[-0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.014, 0.014, 0.8, 16]} />
            <meshStandardMaterial color="#C58A5B" metalness={0.88} roughness={0.22} />
          </mesh>
          <mesh position={[0, 0, 0.4]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.014, 0.014, 0.8, 16]} />
            <meshStandardMaterial color="#C58A5B" metalness={0.88} roughness={0.22} />
          </mesh>
        </group>

        {/* Engraved Brass Exhibition Plaque */}
        <mesh position={[0, 0.48, 0.61]} castShadow>
          <boxGeometry args={[1.8, 0.14, 0.015]} />
          <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>

      {/* ========================================================
          INSTALLATION 04 — TOOLS & WORKFLOW (RIGHT-FRONT)
          Developer Workstation Desk, Unibody Laptop running Git CLI,
          Vertical Commit Tree / VS Code Screen, Postman Test Suite,
          and Documentation Manual.
         ======================================================== */}
      <group position={[1.8, 0.0, 1.4]}>
        {/* Developer Desk in Warm Walnut */}
        <group position={[0, 0.85, 0]}>
          {/* Desktop Surface */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.2, 0.08, 1.2]} />
            <meshStandardMaterial color="#6B4B3C" roughness={0.62} metalness={0.04} />
          </mesh>
          {/* Steel Trestle Legs */}
          <mesh position={[-0.9, -0.45, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.06, 0.82, 1.0]} />
            <meshStandardMaterial color="#1E1D1B" roughness={0.8} metalness={0.3} />
          </mesh>
          <mesh position={[0.9, -0.45, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.06, 0.82, 1.0]} />
            <meshStandardMaterial color="#1E1D1B" roughness={0.8} metalness={0.3} />
          </mesh>
        </group>

        {/* --- A. UNIBODY DEVELOPER LAPTOP (OPEN 16" LAPTOP) --- */}
        <group position={[-0.35, 0.9, 0.15]} rotation={[0, 0.15, 0]}>
          {/* Base Chassis with Keyboard */}
          <mesh position={[0, 0.008, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.42, 0.016, 0.28]} />
            <meshStandardMaterial color="#262422" roughness={0.5} metalness={0.6} />
          </mesh>
          {/* Keyboard Inset */}
          <mesh position={[0, 0.017, -0.04]}>
            <boxGeometry args={[0.36, 0.004, 0.14]} />
            <meshStandardMaterial color="#181715" roughness={0.7} />
          </mesh>
          {/* Trackpad */}
          <mesh position={[0, 0.017, 0.08]}>
            <boxGeometry args={[0.16, 0.002, 0.1]} />
            <meshStandardMaterial color="#201E1C" roughness={0.6} />
          </mesh>
          {/* Display Lid Angled Back 115 degrees */}
          <group position={[0, 0.016, -0.14]} rotation={[-0.42, 0, 0]}>
            <mesh position={[0, 0.14, 0]} castShadow>
              <boxGeometry args={[0.42, 0.28, 0.012]} />
              <meshStandardMaterial color="#262422" roughness={0.5} metalness={0.6} />
            </mesh>
            {/* Screen Panel */}
            <mesh position={[0, 0.14, 0.007]}>
              <planeGeometry args={[0.4, 0.26]} />
              <meshStandardMaterial color="#131311" roughness={0.4} />
            </mesh>
          </group>
        </group>

        {/* --- B. 24" VERTICAL MONITOR (GIT COMMIT TREE & POSTMAN) --- */}
        <group position={[0.55, 0.9, -0.15]} rotation={[0, -0.2, 0]}>
          <mesh position={[0, 0.22, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.44, 16]} />
            <meshStandardMaterial color="#22201D" metalness={0.7} roughness={0.3} />
          </mesh>
          <group position={[0, 0.62, 0.02]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.82, 1.15, 0.04]} />
              <meshStandardMaterial color="#181715" roughness={0.6} metalness={0.5} />
            </mesh>
            <mesh position={[0, 0, 0.022]}>
              <planeGeometry args={[0.78, 1.1]} />
              <meshStandardMaterial
                map={workflowScreenTexture}
                emissive="#385263"
                emissiveMap={workflowScreenTexture}
                emissiveIntensity={0.25}
                roughness={0.2}
              />
            </mesh>
          </group>
        </group>

        {/* --- C. HARDCOVER ARCHITECTURE MANUAL & DRAFTING NOTES --- */}
        <group position={[-0.35, 0.9, -0.28]} rotation={[0, -0.1, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.34, 0.05, 0.26]} />
            <meshStandardMaterial color="#A65338" roughness={0.65} />
          </mesh>
          {/* Ivory Bookmark Ribbon */}
          <mesh position={[0, 0.027, 0.14]} rotation={[0, 0.1, 0]}>
            <boxGeometry args={[0.02, 0.002, 0.12]} />
            <meshStandardMaterial color="#F1ECE3" roughness={0.6} />
          </mesh>
        </group>

        {/* Engraved Brass Exhibition Plaque */}
        <mesh position={[0, 0.45, 0.61]} castShadow>
          <boxGeometry args={[1.8, 0.14, 0.015]} />
          <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>

      {/* ========================================================
          MASTER GALLERY LIGHTING (COORDINATED 4-SPOT RIG)
         ======================================================== */}
      {/* Main Center Gallery Wash */}
      <spotLight
        ref={spotLightRef}
        position={[0.0, 6.0, 1.0]}
        target-position={[0.0, 1.2, 0.0]}
        angle={0.65}
        penumbra={0.7}
        intensity={2.6}
        color="#FFF6E8"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Spotlight 01: Frontend Installation */}
      <spotLight
        position={[-2.6, 5.5, 2.4]}
        target-position={[-2.6, 1.0, 1.4]}
        angle={0.55}
        penumbra={0.7}
        intensity={2.4}
        color="#FFF4DD"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Spotlight 02: Backend Installation */}
      <spotLight
        position={[-2.6, 5.5, -0.6]}
        target-position={[-2.6, 1.2, -1.8]}
        angle={0.55}
        penumbra={0.7}
        intensity={2.2}
        color="#E8F0FE"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Spotlight 03: System Integration */}
      <spotLight
        position={[1.4, 5.5, -0.6]}
        target-position={[1.4, 1.2, -1.8]}
        angle={0.55}
        penumbra={0.7}
        intensity={2.4}
        color="#FFE8D0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Spotlight 04: Tools & Workflow */}
      <spotLight
        position={[1.8, 5.5, 2.4]}
        target-position={[1.8, 1.0, 1.4]}
        angle={0.55}
        penumbra={0.7}
        intensity={2.2}
        color="#FFF6E8"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Warm Terracotta Ambient Rim Light */}
      <pointLight position={[4.5, 1.5, -1.0]} intensity={1.4} distance={5.5} color="#A65338" />

      {/* Subtle Plinth Bottom Edge Glow */}
      <pointLight position={[0.0, -0.3, 0.5]} intensity={0.6} distance={4.0} color="#E1D8CA" />
    </group>
  );
};
