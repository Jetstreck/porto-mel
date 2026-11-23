import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SELECTED_PROJECTS } from '../../data/portfolioData';
import type { Project } from '../../types';
import { AmbientParticles } from './AmbientParticles';
import { createSeededRandom, type MoteItem } from './particleUtils';

interface ZoneWorkshopProps {
  progress: number;
  onSelectProject: (project: Project) => void;
  hoveredProjectId: string | null;
  setHoveredProjectId: (id: string | null) => void;
}

// =========================================================================
// PROCEDURAL CANVAS TEXTURES: 16:10 DESKTOP WEBSITE BROWSER INTERFACES
// Resolution: 1024 x 640 (Realistic Landscape Desktop Viewport)
// =========================================================================

/** Helper to draw standard macOS/Chrome desktop browser chrome at top of texture */
function drawBrowserChrome(
  ctx: CanvasRenderingContext2D,
  title: string,
  url: string,
  accentColor: string
) {
  // Top Title Bar
  ctx.fillStyle = '#1A1917';
  ctx.fillRect(0, 0, 1024, 46);

  // Traffic Light Window Controls
  ctx.fillStyle = '#EF4444';
  ctx.beginPath();
  ctx.arc(24, 23, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#F59E0B';
  ctx.beginPath();
  ctx.arc(44, 23, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#10B981';
  ctx.beginPath();
  ctx.arc(64, 23, 6, 0, Math.PI * 2);
  ctx.fill();

  // Active Browser Tab
  ctx.fillStyle = '#242320';
  ctx.fillRect(96, 8, 220, 38);
  ctx.strokeStyle = '#38342E';
  ctx.lineWidth = 1;
  ctx.strokeRect(96, 8, 220, 38);

  ctx.fillStyle = accentColor;
  ctx.beginPath();
  ctx.arc(114, 27, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#F1ECE3';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText(title, 126, 31);

  // Address Bar Pill
  ctx.fillStyle = '#141311';
  ctx.fillRect(340, 10, 480, 26);
  ctx.strokeStyle = '#38342E';
  ctx.lineWidth = 1;
  ctx.strokeRect(340, 10, 480, 26);

  // SSL Green Padlock
  ctx.fillStyle = '#22C55E';
  ctx.font = 'bold 10px "JetBrains Mono", monospace';
  ctx.fillText('🔒', 352, 27);

  ctx.fillStyle = '#A39D91';
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillText(url, 374, 27);

  // User Profile Pill
  ctx.fillStyle = '#2A2824';
  ctx.fillRect(840, 10, 160, 26);
  ctx.fillStyle = '#F1ECE3';
  ctx.font = 'bold 10px "JetBrains Mono", monospace';
  ctx.fillText('MELLINO // DEV', 856, 27);
}

/** Project 01: KBR E-Sport Website (Desktop Tournament & Bracket Portal) */
function generateKbrEsportTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Background
  ctx.fillStyle = '#11100E';
  ctx.fillRect(0, 0, 1024, 640);

  // Browser Chrome
  drawBrowserChrome(
    ctx,
    'KBR E-Sport Official',
    'https://kbr-esport.gg/tournaments/pro-bracket',
    '#A65338'
  );

  // Website Navbar
  ctx.fillStyle = '#181715';
  ctx.fillRect(0, 46, 1024, 52);
  ctx.strokeStyle = '#2A2824';
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 46, 1024, 52);

  ctx.fillStyle = '#F1ECE3';
  ctx.font = 'bold 16px "Space Grotesk", sans-serif';
  ctx.fillText('KBR ESPORTS', 32, 78);

  const navLinks = ['TOURNAMENTS', 'ROSTER', 'SCHEDULE', 'MEDIA', 'STANDINGS'];
  navLinks.forEach((link, idx) => {
    ctx.fillStyle = idx === 0 ? '#A65338' : '#A39D91';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText(link, 200 + idx * 115, 76);
  });

  // Live Match Score Banner
  ctx.fillStyle = '#1D1C19';
  ctx.fillRect(32, 114, 960, 95);
  ctx.strokeStyle = '#A65338';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(32, 114, 960, 95);

  ctx.fillStyle = '#EF4444';
  ctx.beginPath();
  ctx.arc(60, 142, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#EF4444';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('LIVE MATCHDAY TELEMETRY // GRAND FINALS', 74, 146);

  ctx.fillStyle = '#F1ECE3';
  ctx.font = 'bold 26px "Space Grotesk", sans-serif';
  ctx.fillText('KBR ESPORTS', 60, 185);
  ctx.fillStyle = '#A65338';
  ctx.fillText('2  —  1', 460, 185);
  ctx.fillStyle = '#A39D91';
  ctx.fillText('TEAM TITAN', 720, 185);

  // Left Column: Tournament Bracket
  ctx.fillStyle = '#161513';
  ctx.fillRect(32, 224, 580, 385);
  ctx.strokeStyle = '#2A2824';
  ctx.lineWidth = 1;
  ctx.strokeRect(32, 224, 580, 385);

  ctx.fillStyle = '#A65338';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText('DOUBLE ELIMINATION PLAYOFF BRACKET', 52, 255);

  const bracketMatches = [
    { t1: 'KBR Esports', t2: 'Apex Wolves', sc: '2-0', x: 52, y: 275 },
    { t1: 'Team Titan', t2: 'Vanguard X', sc: '2-1', x: 52, y: 385 },
    { t1: 'KBR Esports', t2: 'Team Titan', sc: '2-1', x: 330, y: 330 },
  ];

  bracketMatches.forEach((m) => {
    ctx.fillStyle = '#22201D';
    ctx.fillRect(m.x, m.y, 220, 75);
    ctx.strokeStyle = '#A65338';
    ctx.strokeRect(m.x, m.y, 220, 75);
    ctx.fillStyle = '#F1ECE3';
    ctx.font = 'bold 12px "Space Grotesk", sans-serif';
    ctx.fillText(m.t1, m.x + 14, m.y + 30);
    ctx.fillStyle = '#A39D91';
    ctx.fillText(m.t2, m.x + 14, m.y + 55);
    ctx.fillStyle = '#A65338';
    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    ctx.fillText(m.sc, m.x + 175, m.y + 42);
  });

  // Connecting Bracket Lines
  ctx.strokeStyle = '#A65338';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(272, 312);
  ctx.lineTo(300, 312);
  ctx.lineTo(300, 368);
  ctx.lineTo(330, 368);
  ctx.moveTo(272, 422);
  ctx.lineTo(300, 422);
  ctx.lineTo(300, 368);
  ctx.stroke();

  // Right Column: Active Roster Line-up
  ctx.fillStyle = '#161513';
  ctx.fillRect(628, 224, 364, 385);
  ctx.strokeStyle = '#2A2824';
  ctx.strokeRect(628, 224, 364, 385);

  ctx.fillStyle = '#F1ECE3';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText('PRO ROSTER TELEMETRY', 648, 255);

  const players = [
    { handle: 'Valkyrie', role: 'Duelist / Entry', kd: '1.42', ping: '12ms' },
    { handle: 'Cipher_K', role: 'Sentinel / IGL', kd: '1.18', ping: '10ms' },
    { handle: 'ShadowByte', role: 'Initiator / Recon', kd: '1.25', ping: '14ms' },
    { handle: 'Chronos', role: 'Controller / Smokes', kd: '1.09', ping: '11ms' },
  ];

  players.forEach((p, idx) => {
    const py = 275 + idx * 78;
    ctx.fillStyle = '#201E1A';
    ctx.fillRect(648, py, 324, 66);
    ctx.fillStyle = '#A65338';
    ctx.font = 'bold 13px "Space Grotesk", sans-serif';
    ctx.fillText(p.handle, 664, py + 26);
    ctx.fillStyle = '#A39D91';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText(p.role, 664, py + 48);
    ctx.fillStyle = '#22C55E';
    ctx.fillText(`K/D: ${p.kd} • ${p.ping}`, 870, py + 38);
  });

  return new THREE.CanvasTexture(canvas);
}

/** Project 02: Menawi Art Studio Website (Editorial Art Catalog & Residency Archive) */
function generateMenawiArtTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#161513';
  ctx.fillRect(0, 0, 1024, 640);

  drawBrowserChrome(
    ctx,
    'Menawi Art Studio | Archive',
    'https://menawi.studio/archive/exhibitions',
    '#C58A5B'
  );

  // Header Banner
  ctx.fillStyle = '#1E1D19';
  ctx.fillRect(0, 46, 1024, 52);
  ctx.strokeStyle = '#2A2824';
  ctx.strokeRect(0, 46, 1024, 52);

  ctx.fillStyle = '#EDE6D8';
  ctx.font = 'bold 16px "Space Grotesk", sans-serif';
  ctx.fillText('MENAWI ART STUDIO', 32, 78);

  const navLinks = ['EXHIBITIONS', 'RESIDENCIES', 'MONOGRAPHS', 'ARCHIVE', 'ABOUT'];
  navLinks.forEach((link, idx) => {
    ctx.fillStyle = idx === 0 ? '#C58A5B' : '#A39D91';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText(link, 230 + idx * 115, 76);
  });

  // Editorial Hero
  ctx.fillStyle = '#22201D';
  ctx.fillRect(32, 114, 960, 110);
  ctx.strokeStyle = '#38342E';
  ctx.strokeRect(32, 114, 960, 110);

  ctx.fillStyle = '#C58A5B';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('CURATORIAL ARCHIVE // RESIDENCY COHORT IV', 52, 142);
  ctx.fillStyle = '#EDE6D8';
  ctx.font = 'bold 24px "Space Grotesk", sans-serif';
  ctx.fillText('Materiality, Soil & Vernacular Form: The Contemporary Atelier', 52, 175);
  ctx.fillStyle = '#A39D91';
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.fillText('Retrospective Exhibition: 48 Physical Works • Malang Residency • Curated by Mellino Studio', 52, 202);

  // 3-Column Artwork Catalog
  const artworks = [
    { title: 'Vernacular Earth 01', medium: 'Raw Clay & Terracotta on Linen', artist: 'Agus W.', year: '2023', color: '#8C6747' },
    { title: 'Brutalist Monolith II', medium: 'Volcanic Ash & Acrylic Binder', artist: 'Dewi R.', year: '2024', color: '#554439' },
    { title: 'Somatic Cartography', medium: 'Natural Indigo & Cotton Fiber', artist: 'Bambang S.', year: '2023', color: '#3A4856' },
  ];

  artworks.forEach((art, idx) => {
    const ax = 32 + idx * 326;
    ctx.fillStyle = '#1A1917';
    ctx.fillRect(ax, 240, 308, 365);
    ctx.strokeStyle = '#38342E';
    ctx.strokeRect(ax, 240, 308, 365);

    // Artwork Thumbnail Mockup
    ctx.fillStyle = art.color;
    ctx.fillRect(ax + 16, 256, 276, 200);

    // Artwork Label
    ctx.fillStyle = '#EDE6D8';
    ctx.font = 'bold 15px "Space Grotesk", sans-serif';
    ctx.fillText(art.title, ax + 16, 482);
    ctx.fillStyle = '#C58A5B';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillText(art.medium, ax + 16, 508);
    ctx.fillStyle = '#A39D91';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillText(`${art.artist} • ${art.year}`, ax + 16, 532);

    // View Monograph Button
    ctx.fillStyle = '#262420';
    ctx.fillRect(ax + 16, 550, 276, 36);
    ctx.strokeStyle = '#C58A5B';
    ctx.strokeRect(ax + 16, 550, 276, 36);
    ctx.fillStyle = '#EDE6D8';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText('INSPECT MONOGRAPH  →', ax + 72, 572);
  });

  return new THREE.CanvasTexture(canvas);
}

/** Project 03: Nota Kita Website (Invoice & Payment Management Platform) */
function generateNotaKitaTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#121316';
  ctx.fillRect(0, 0, 1024, 640);

  drawBrowserChrome(
    ctx,
    'Nota Kita — Dashboard',
    'https://notakita.id/app/dashboard/invoices',
    '#74705E'
  );

  // Top Nav
  ctx.fillStyle = '#1A1C22';
  ctx.fillRect(0, 46, 1024, 52);
  ctx.strokeStyle = '#2A2E38';
  ctx.strokeRect(0, 46, 1024, 52);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = 'bold 16px "Space Grotesk", sans-serif';
  ctx.fillText('NOTA KITA', 32, 78);

  const tabs = ['INVOICES', 'CLIENTS', 'PAYMENTS', 'EXPENSES', 'TAX REPORTS'];
  tabs.forEach((t, i) => {
    ctx.fillStyle = i === 0 ? '#38BDF8' : '#94A3B8';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText(t, 180 + i * 115, 76);
  });

  // Action Button
  ctx.fillStyle = '#0284C7';
  ctx.fillRect(860, 56, 132, 32);
  ctx.fillStyle = '#F8FAFC';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('+ NEW INVOICE', 880, 77);

  // 4 Top Metric Cards
  const metrics = [
    { label: 'TOTAL INVOICED', val: 'Rp 148.500.000', change: '+18.4% vs last mo', color: '#38BDF8' },
    { label: 'SETTLED REVENUE', val: 'Rp 132.200.000', change: '94% Collection Rate', color: '#22C55E' },
    { label: 'PENDING ESCROW', val: 'Rp 16.300.000', change: '3 Invoices Due', color: '#F59E0B' },
    { label: 'AVG SETTLEMENT', val: '1.8 DAYS', change: 'Automated Reminders', color: '#A855F7' },
  ];

  metrics.forEach((m, idx) => {
    const mx = 32 + idx * 245;
    ctx.fillStyle = '#181B22';
    ctx.fillRect(mx, 114, 230, 95);
    ctx.strokeStyle = '#2A2E38';
    ctx.strokeRect(mx, 114, 230, 95);

    ctx.fillStyle = '#94A3B8';
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.fillText(m.label, mx + 16, 138);

    ctx.fillStyle = '#F8FAFC';
    ctx.font = 'bold 18px "Space Grotesk", sans-serif';
    ctx.fillText(m.val, mx + 16, 168);

    ctx.fillStyle = m.color;
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText(m.change, mx + 16, 192);
  });

  // Invoices Table Card
  ctx.fillStyle = '#181B22';
  ctx.fillRect(32, 225, 960, 385);
  ctx.strokeStyle = '#2A2E38';
  ctx.strokeRect(32, 225, 960, 385);

  // Table Header
  ctx.fillStyle = '#20242E';
  ctx.fillRect(32, 225, 960, 42);
  ctx.fillStyle = '#94A3B8';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('INVOICE ID', 56, 251);
  ctx.fillText('CLIENT NAME', 220, 251);
  ctx.fillText('ISSUE DATE', 440, 251);
  ctx.fillText('DUE DATE', 580, 251);
  ctx.fillText('AMOUNT', 740, 251);
  ctx.fillText('STATUS', 880, 251);

  // Table Rows
  const invoices = [
    { id: 'INV-2024-089', client: 'PT Nusantara Digital Pratama', date: '14 Nov 2024', due: '28 Nov 2024', amt: 'Rp 48.500.000', status: 'PAID', stCol: '#22C55E' },
    { id: 'INV-2024-090', client: 'Malang Creative Lab Studio', date: '16 Nov 2024', due: '30 Nov 2024', amt: 'Rp 18.250.000', status: 'PAID', stCol: '#22C55E' },
    { id: 'INV-2024-091', client: 'Vanguard Systems International', date: '18 Nov 2024', due: '02 Dec 2024', amt: 'Rp 62.000.000', status: 'PENDING', stCol: '#F59E0B' },
    { id: 'INV-2024-092', client: 'Batu Agro Mandiri Tech', date: '19 Nov 2024', due: '03 Dec 2024', amt: 'Rp 19.750.000', status: 'OVERDUE', stCol: '#EF4444' },
  ];

  invoices.forEach((inv, i) => {
    const iy = 267 + i * 80;
    ctx.fillStyle = i % 2 === 0 ? '#181B22' : '#1D212A';
    ctx.fillRect(32, iy, 960, 78);
    ctx.strokeStyle = '#222630';
    ctx.strokeRect(32, iy, 960, 78);

    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 12px "JetBrains Mono", monospace';
    ctx.fillText(inv.id, 56, iy + 44);

    ctx.fillStyle = '#F8FAFC';
    ctx.font = 'bold 13px "Space Grotesk", sans-serif';
    ctx.fillText(inv.client, 220, iy + 44);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillText(inv.date, 440, iy + 44);
    ctx.fillText(inv.due, 580, iy + 44);

    ctx.fillStyle = '#F8FAFC';
    ctx.font = 'bold 13px "Space Grotesk", sans-serif';
    ctx.fillText(inv.amt, 740, iy + 44);

    // Status Pill
    ctx.fillStyle = `${inv.stCol}22`;
    ctx.fillRect(870, iy + 26, 92, 28);
    ctx.strokeStyle = inv.stCol;
    ctx.strokeRect(870, iy + 26, 92, 28);
    ctx.fillStyle = inv.stCol;
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.fillText(inv.status, 898, iy + 44);
  });

  return new THREE.CanvasTexture(canvas);
}

/** Project 04: Malang Reproductive Training Center Website (Healthcare Training Web Platform) */
function generateMalangReproductiveTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, 1024, 640);

  drawBrowserChrome(
    ctx,
    'Malang Reproductive Training Center',
    'https://malangrepro.org/clinical-simulation',
    '#38BDF8'
  );

  // Top Nav
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(0, 46, 1024, 52);
  ctx.strokeStyle = '#334155';
  ctx.strokeRect(0, 46, 1024, 52);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = 'bold 15px "Space Grotesk", sans-serif';
  ctx.fillText('MALANG REPRODUCTIVE TRAINING CENTER', 32, 78);

  const nav = ['SIMULATION LAB', 'ULTRASOUND MODULES', 'SURGICAL WORKSHOPS', 'CERTIFICATIONS', 'FACULTY'];
  nav.forEach((l, idx) => {
    ctx.fillStyle = idx === 0 ? '#38BDF8' : '#94A3B8';
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.fillText(l, 380 + idx * 122, 76);
  });

  // Healthcare Education Hero
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(32, 114, 960, 105);
  ctx.strokeStyle = '#334155';
  ctx.strokeRect(32, 114, 960, 105);

  ctx.fillStyle = '#38BDF8';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('ACCREDITED CLINICAL SIMULATION // OBSTETRICS & GYNECOLOGY', 52, 142);
  ctx.fillStyle = '#F8FAFC';
  ctx.font = 'bold 22px "Space Grotesk", sans-serif';
  ctx.fillText('Hands-On Obstetric Ultrasound & Laparoscopic Simulation Training', 52, 172);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.fillText('National Specialist Accreditation: 32 SKP IDI • 14 Hands-On Workstations • ISO Certified', 52, 198);

  // Left: Clinical Ultrasound Diagnostic Simulation Telemetry
  ctx.fillStyle = '#162032';
  ctx.fillRect(32, 235, 580, 375);
  ctx.strokeStyle = '#334155';
  ctx.strokeRect(32, 235, 580, 375);

  ctx.fillStyle = '#38BDF8';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText('LIVE CLINICAL ULTRASOUND TELEMETRY // DOPPLER WAVEFORM', 52, 265);

  // Simulated Doppler Waveform Curve
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(52, 360);
  for (let x = 52; x <= 590; x += 10) {
    const y = 360 - Math.sin((x - 52) * 0.08) * 45 - Math.sin((x - 52) * 0.16) * 20;
    ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Biometric Parameter Cards
  const params = [
    { label: 'BPD (Biparietal)', val: '84.2 mm', norm: 'Normal GA 32w' },
    { label: 'FL (Femur Length)', val: '64.8 mm', norm: 'Normal GA 32w' },
    { label: 'FHR (Fetal Heart Rate)', val: '142 BPM', norm: 'Steady Sinus' },
    { label: 'AFI (Amniotic Index)', val: '14.6 cm', norm: 'Adequate Fluid' },
  ];

  params.forEach((p, i) => {
    const px = 52 + i * 135;
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(px, 440, 126, 75);
    ctx.strokeStyle = '#334155';
    ctx.strokeRect(px, 440, 126, 75);
    ctx.fillStyle = '#94A3B8';
    ctx.font = 'bold 9px "JetBrains Mono", monospace';
    ctx.fillText(p.label, px + 8, 460);
    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 15px "Space Grotesk", sans-serif';
    ctx.fillText(p.val, px + 8, 485);
    ctx.fillStyle = '#22C55E';
    ctx.font = '9px "JetBrains Mono", monospace';
    ctx.fillText(p.norm, px + 8, 504);
  });

  // Right: Training Program Modules
  ctx.fillStyle = '#162032';
  ctx.fillRect(628, 235, 364, 375);
  ctx.strokeStyle = '#334155';
  ctx.strokeRect(628, 235, 364, 375);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText('CURRICULUM MODULES', 648, 265);

  const modules = [
    { name: 'Mod 01: Fetal Doppler & Hemodynamics', date: 'Batch 12 • 28 Nov 2024', seats: '3 Seats Left' },
    { name: 'Mod 02: 3D/4D Fetal Anomaly Scan', date: 'Batch 13 • 05 Dec 2024', seats: 'Full' },
    { name: 'Mod 03: Basic Operative Laparoscopy', date: 'Batch 14 • 12 Dec 2024', seats: '5 Seats Left' },
  ];

  modules.forEach((mod, idx) => {
    const my = 285 + idx * 100;
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(648, my, 324, 85);
    ctx.strokeStyle = '#334155';
    ctx.strokeRect(648, my, 324, 85);

    ctx.fillStyle = '#F8FAFC';
    ctx.font = 'bold 13px "Space Grotesk", sans-serif';
    ctx.fillText(mod.name, 664, my + 30);
    ctx.fillStyle = '#94A3B8';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText(mod.date, 664, my + 52);
    ctx.fillStyle = mod.seats === 'Full' ? '#EF4444' : '#22C55E';
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.fillText(mod.seats, 664, my + 70);
  });

  return new THREE.CanvasTexture(canvas);
}

/** Project 05: Insan Medika Training Center Website (Medical Caregiver Academy Website) */
function generateInsanMedikaTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#1C1917';
  ctx.fillRect(0, 0, 1024, 640);

  drawBrowserChrome(
    ctx,
    'Insan Medika Training Center',
    'https://insanmedika.ac.id/training-curriculum',
    '#EA580C'
  );

  // Top Nav
  ctx.fillStyle = '#292524';
  ctx.fillRect(0, 46, 1024, 52);
  ctx.strokeStyle = '#44403C';
  ctx.strokeRect(0, 46, 1024, 52);

  ctx.fillStyle = '#F5F5F4';
  ctx.font = 'bold 16px "Space Grotesk", sans-serif';
  ctx.fillText('INSAN MEDIKA ACADEMY', 32, 78);

  const nav = ['PROGRAMS', 'CURRICULUM', 'CLINICAL AFFILIATIONS', 'ALUMNI CAREERS', 'ENROLL'];
  nav.forEach((l, i) => {
    ctx.fillStyle = i === 1 ? '#EA580C' : '#A8A29E';
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.fillText(l, 300 + i * 135, 76);
  });

  // Hero Card
  ctx.fillStyle = '#292524';
  ctx.fillRect(32, 114, 960, 105);
  ctx.strokeStyle = '#44403C';
  ctx.strokeRect(32, 114, 960, 105);

  ctx.fillStyle = '#EA580C';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('VOCATIONAL HEALTHCARE EDUCATION // MALANG CAMPUS', 52, 142);
  ctx.fillStyle = '#F5F5F4';
  ctx.font = 'bold 22px "Space Grotesk", sans-serif';
  ctx.fillText('Certified Professional Caregiver & Clinical Nursing Assistant Academy', 52, 172);
  ctx.fillStyle = '#A8A29E';
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.fillText('BNSP Certified • 94% National Licensure Pass Rate • Over 1,200 Certified Graduates', 52, 198);

  // 3-Column Vocational Curriculum Cards
  const tracks = [
    { name: 'Geriatric Caregiving', duration: '6 Months Intensive', cert: 'BNSP Level III Certified', modules: '12 Clinical Modules', col: '#EA580C' },
    { name: 'Pediatric Care & Special Needs', duration: '4 Months Intensive', cert: 'National Pediatric Standard', modules: '8 Clinical Modules', col: '#0284C7' },
    { name: 'Post-Operative Recovery', duration: '6 Months Clinical', cert: 'Hospital Affiliate Certified', modules: '14 Clinical Modules', col: '#16A34A' },
  ];

  tracks.forEach((tr, idx) => {
    const tx = 32 + idx * 326;
    ctx.fillStyle = '#201D1A';
    ctx.fillRect(tx, 235, 308, 375);
    ctx.strokeStyle = '#44403C';
    ctx.strokeRect(tx, 235, 308, 375);

    // Accent Pill
    ctx.fillStyle = `${tr.col}22`;
    ctx.fillRect(tx + 16, 255, 276, 28);
    ctx.fillStyle = tr.col;
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.fillText(tr.duration.toUpperCase(), tx + 24, 273);

    ctx.fillStyle = '#F5F5F4';
    ctx.font = 'bold 17px "Space Grotesk", sans-serif';
    ctx.fillText(tr.name, tx + 16, 315);

    ctx.fillStyle = '#A8A29E';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillText(`Accreditation: ${tr.cert}`, tx + 16, 345);
    ctx.fillText(`Curriculum: ${tr.modules}`, tx + 16, 370);

    // Curriculum Highlights Checklist
    const topics = ['Vital Signs & Telemetry Monitoring', 'Infection Control & Sterilization', 'Pharmacology & Medication Protocol', 'Emergency Basic Life Support (BLS)'];
    topics.forEach((top, ti) => {
      ctx.fillStyle = '#22C55E';
      ctx.font = 'bold 11px "JetBrains Mono", monospace';
      ctx.fillText('✓', tx + 16, 415 + ti * 28);
      ctx.fillStyle = '#D6D3D1';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillText(top, tx + 34, 415 + ti * 28);
    });

    // Syllabus Button
    ctx.fillStyle = '#292524';
    ctx.fillRect(tx + 16, 540, 276, 40);
    ctx.strokeStyle = tr.col;
    ctx.strokeRect(tx + 16, 540, 276, 40);
    ctx.fillStyle = '#F5F5F4';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText('DOWNLOAD FULL SYLLABUS →', tx + 48, 565);
  });

  return new THREE.CanvasTexture(canvas);
}

/** Project 06: Hospital Virtual Website (DESKTOP Telemedicine & Healthcare Web Portal — NO MOBILE PHONE!) */
function generateHospitalVirtualTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#064E3B';
  ctx.fillRect(0, 0, 1024, 640);

  // Deep Emerald Slate Background
  ctx.fillStyle = '#06281E';
  ctx.fillRect(0, 0, 1024, 640);

  drawBrowserChrome(
    ctx,
    'Hospital Virtual — Telehealth Portal',
    'https://hospitalvirtual.id/telehealth/portal',
    '#10B981'
  );

  // Top Nav
  ctx.fillStyle = '#0B3B2D';
  ctx.fillRect(0, 46, 1024, 52);
  ctx.strokeStyle = '#135642';
  ctx.strokeRect(0, 46, 1024, 52);

  ctx.fillStyle = '#ECFDF5';
  ctx.font = 'bold 16px "Space Grotesk", sans-serif';
  ctx.fillText('HOSPITAL VIRTUAL // TELEHEALTH', 32, 78);

  const nav = ['TELEMEDICINE', 'CLINIC QUEUE', 'DOCTORS DIRECTORY', 'DIGITAL PHARMACY', 'LAB RESULTS'];
  nav.forEach((l, i) => {
    ctx.fillStyle = i === 0 ? '#34D399' : '#A7F3D0';
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.fillText(l, 330 + i * 135, 76);
  });

  // Top Telehealth Status Strip
  ctx.fillStyle = '#083327';
  ctx.fillRect(32, 114, 960, 100);
  ctx.strokeStyle = '#10B981';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(32, 114, 960, 100);

  ctx.fillStyle = '#10B981';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('ENCRYPTED TELEMEDICINE GATEWAY // END-TO-END VERIFIED', 52, 140);

  ctx.fillStyle = '#ECFDF5';
  ctx.font = 'bold 22px "Space Grotesk", sans-serif';
  ctx.fillText('Outpatient Digital Consultation & Real-time Queue Management', 52, 170);

  ctx.fillStyle = '#A7F3D0';
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillText('Emergency Specialist Response: < 3 Minutes • 42 Online Physicians • Integrated Electronic Prescriptions', 52, 195);

  // Left Column: Specialist Video Consultation Active Lobby (Width 580)
  ctx.fillStyle = '#093629';
  ctx.fillRect(32, 230, 580, 380);
  ctx.strokeStyle = '#135642';
  ctx.strokeRect(32, 230, 580, 380);

  ctx.fillStyle = '#34D399';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText('DOCTOR VIDEO CONSULTATION LOBBY', 52, 260);

  // Doctor Video Mockup Box
  ctx.fillStyle = '#06241B';
  ctx.fillRect(52, 275, 540, 220);
  ctx.strokeStyle = '#10B981';
  ctx.lineWidth = 1;
  ctx.strokeRect(52, 275, 540, 220);

  // Doctor Info Inside Video Feed
  ctx.fillStyle = '#10B981';
  ctx.beginPath();
  ctx.arc(74, 300, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ECFDF5';
  ctx.font = 'bold 13px "Space Grotesk", sans-serif';
  ctx.fillText('dr. Sarah Alamsyah, Sp.A (Pediatric Specialist)', 90, 304);

  ctx.fillStyle = '#A7F3D0';
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillText('SIP: 449.1/089/DS/2024 • RS Hermina & Hospital Virtual Affiliated', 90, 324);

  // Patient Clinical Telemetry Badges
  const vitals = [
    { name: 'Heart Rate', val: '74 BPM', col: '#10B981' },
    { name: 'Oxygen SpO2', val: '99%', col: '#10B981' },
    { name: 'Blood Pressure', val: '120/80 mmHg', col: '#10B981' },
  ];
  vitals.forEach((v, vi) => {
    const vx = 74 + vi * 160;
    ctx.fillStyle = '#0B3B2D';
    ctx.fillRect(vx, 355, 140, 55);
    ctx.strokeStyle = '#10B981';
    ctx.strokeRect(vx, 355, 140, 55);
    ctx.fillStyle = '#A7F3D0';
    ctx.font = 'bold 9px "JetBrains Mono", monospace';
    ctx.fillText(v.name, vx + 10, 374);
    ctx.fillStyle = '#ECFDF5';
    ctx.font = 'bold 15px "Space Grotesk", sans-serif';
    ctx.fillText(v.val, vx + 10, 397);
  });

  // Call Controls Bar
  ctx.fillStyle = '#083327';
  ctx.fillRect(52, 515, 540, 75);
  ctx.strokeStyle = '#135642';
  ctx.strokeRect(52, 515, 540, 75);

  ctx.fillStyle = '#10B981';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('AUDIO/VIDEO: ACTIVE • LATENCY: 24MS • RESOLUTION: 1080P 60FPS', 74, 542);

  ctx.fillStyle = '#047857';
  ctx.fillRect(74, 552, 160, 26);
  ctx.fillStyle = '#ECFDF5';
  ctx.font = 'bold 10px "JetBrains Mono", monospace';
  ctx.fillText('ISSUE E-PRESCRIPTION', 86, 569);

  // Right Column: Clinic Queue Tracker & Pharmacy Integration (Width 364)
  ctx.fillStyle = '#093629';
  ctx.fillRect(628, 230, 364, 380);
  ctx.strokeStyle = '#135642';
  ctx.strokeRect(628, 230, 364, 380);

  ctx.fillStyle = '#34D399';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText('CLINIC OUTPATIENT QUEUE', 648, 260);

  // Big Queue Ticket Card
  ctx.fillStyle = '#083327';
  ctx.fillRect(648, 275, 324, 110);
  ctx.strokeStyle = '#10B981';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(648, 275, 324, 110);

  ctx.fillStyle = '#A7F3D0';
  ctx.font = '10px "JetBrains Mono", monospace';
  ctx.fillText('YOUR DIGITAL QUEUE NUMBER', 668, 302);

  ctx.fillStyle = '#34D399';
  ctx.font = 'bold 36px "Space Grotesk", sans-serif';
  ctx.fillText('#042', 668, 345);

  ctx.fillStyle = '#ECFDF5';
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillText('ESTIMATED WAIT: 8 MINS • ROOM 3B', 668, 370);

  // Integrated Pharmacy Module
  ctx.fillStyle = '#083327';
  ctx.fillRect(648, 400, 324, 190);
  ctx.strokeStyle = '#135642';
  ctx.strokeRect(648, 400, 324, 190);

  ctx.fillStyle = '#34D399';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText('DIGITAL PRESCRIPTION INTEGRATION', 668, 425);

  const meds = [
    { name: 'Amoxicillin Trihydrate 500mg', dose: '3x1 Capsule Post-Meal', status: 'Ready at Pharmacy' },
    { name: 'Paracetamol 500mg Tab', dose: 'Prn Fever > 38.5C', status: 'Dispensed' },
  ];

  meds.forEach((m, mi) => {
    const my = 440 + mi * 65;
    ctx.fillStyle = '#0B3B2D';
    ctx.fillRect(668, my, 284, 52);
    ctx.fillStyle = '#ECFDF5';
    ctx.font = 'bold 12px "Space Grotesk", sans-serif';
    ctx.fillText(m.name, 680, my + 22);
    ctx.fillStyle = '#A7F3D0';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText(`${m.dose} • ${m.status}`, 680, my + 40);
  });

  return new THREE.CanvasTexture(canvas);
}

// =========================================================================
// REUSABLE 3D DESKTOP WEBSITE DISPLAY COMPONENT
// =========================================================================
interface DesktopWebsiteDisplayProps {
  texture: THREE.CanvasTexture;
  accentColor: string;
  isHovered: boolean;
}

const DesktopWebsiteDisplay: React.FC<DesktopWebsiteDisplayProps> = ({
  texture,
  accentColor,
  isHovered,
}) => {
  return (
    <group position={[0, 0.95, 0]}>
      {/* 27" Desktop Monitor Chassis (Width: 2.45m, Height: 1.45m, Depth: 0.08m) */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.45, 1.45, 0.08]} />
        <meshStandardMaterial
          color="#16181D"
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      {/* Thin Display Bezel Border Accent */}
      <mesh position={[0, 0, 0.041]}>
        <planeGeometry args={[2.42, 1.42]} />
        <meshStandardMaterial color="#0A0B0E" roughness={0.9} />
      </mesh>

      {/* Active Desktop Website Screen Plane (16:10 Desktop Landscape Viewport) */}
      <mesh position={[0, 0, 0.043]}>
        <planeGeometry args={[2.36, 1.36]} />
        <meshStandardMaterial
          map={texture}
          emissive={accentColor}
          emissiveIntensity={isHovered ? 0.35 : 0.12}
          roughness={0.2}
        />
      </mesh>

      {/* Monitor Stand Mounting Bracket (Rear) */}
      <mesh position={[0, 0, -0.06]} castShadow>
        <boxGeometry args={[0.22, 0.22, 0.04]} />
        <meshStandardMaterial color="#22252C" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Articulated Monitor Stand Column */}
      <mesh position={[0, -0.45, -0.1]} rotation={[0.1, 0, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.045, 0.85, 16]} />
        <meshStandardMaterial color="#2E333D" metalness={0.92} roughness={0.18} />
      </mesh>

      {/* Monitor Heavy Aluminum Desk Base Plate */}
      <mesh position={[0, -0.85, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.65, 0.025, 0.35]} />
        <meshStandardMaterial color="#22252C" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
};

// =========================================================================
// CHAPTER 04: THE PROJECT ARCHIVE AMBIENT STAR PARTICLES
// =========================================================================

const WorkshopArchiveParticles: React.FC<{ progress: number }> = ({ progress }) => {
  const motesData = useMemo(() => {
    const rand = createSeededRandom(4042);
    const motes: MoteItem[] = [];
    const count = 220; // 110 Gallery Airspace + 80 Installation Atmosphere + 30 Promenade/Exit

    const warmIvory = new THREE.Color('#FFF8EB');
    const champagneWhite = new THREE.Color('#F4EFE6');
    const goldenLinen = new THREE.Color('#E6DDD0');
    const subtleRust = new THREE.Color('#C47B60');

    // 6 Installation anchor centers in world coordinates:
    const anchors = [
      { x: -6.8, z: -26.5 },
      { x: -4.2, z: -28.6 },
      { x: -1.45, z: -29.8 },
      { x: 1.45, z: -29.8 },
      { x: 4.2, z: -28.6 },
      { x: 6.8, z: -26.5 },
    ];

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

      if (i < 110) {
        // Layer 1: Grand Gallery Airspace & Upper Ceiling (110 particles)
        bx = (rand() - 0.5) * 21.0;   // [-10.5, 10.5]
        by = 1.2 + rand() * 6.0;      // [1.2, 7.2]
        bz = -12.0 - rand() * 22.0;   // [-12.0, -34.0]
        ampX = 0.02 + rand() * 0.035;
        ampY = 0.035 + rand() * 0.06;
        ampZ = 0.02 + rand() * 0.03;
        speedX = 0.15 + rand() * 0.25;
        speedY = 0.25 + rand() * 0.35;
        speedZ = 0.15 + rand() * 0.25;
      } else if (i < 190) {
        // Layer 2: Surrounding the 6 Project Installations (80 particles)
        const anchorIdx = (i - 110) % 6;
        const anchor = anchors[anchorIdx];
        const angle = rand() * Math.PI * 2;
        const rad = 1.0 + rand() * 1.6;
        bx = anchor.x + Math.cos(angle) * rad;
        by = 0.6 + rand() * 2.8;
        bz = anchor.z + Math.sin(angle) * rad;
        ampX = 0.015 + rand() * 0.03;
        ampY = 0.03 + rand() * 0.05;
        ampZ = 0.015 + rand() * 0.025;
        speedX = 0.2 + rand() * 0.3;
        speedY = 0.3 + rand() * 0.4;
        speedZ = 0.2 + rand() * 0.25;
      } else {
        // Layer 3: Promenade Walkways & Exit Portal Passage (30 particles)
        if (i < 205) {
          // Promenade Balcony Walkway
          bx = (rand() - 0.5) * 16.0;
          by = 1.0 + rand() * 3.5;
          bz = -14.0 - rand() * 9.0;
        } else {
          // Exit Corridor Approach
          bx = (rand() - 0.5) * 6.0;
          by = 1.2 + rand() * 3.2;
          bz = -30.0 - rand() * 4.5;
        }
        ampX = 0.02 + rand() * 0.035;
        ampY = 0.04 + rand() * 0.055;
        ampZ = 0.02 + rand() * 0.03;
        speedX = 0.18 + rand() * 0.25;
        speedY = 0.28 + rand() * 0.35;
        speedZ = 0.18 + rand() * 0.22;
      }

      let c = warmIvory;
      const colRand = rand();
      if (colRand < 0.08) {
        c = subtleRust;
      } else if (colRand < 0.22) {
        c = goldenLinen;
      } else if (colRand < 0.48) {
        c = champagneWhite;
      }

      motes.push({
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
      });
    }

    return motes;
  }, []);

  return (
    <AmbientParticles
      progress={progress}
      activeRange={[0.54, 0.965]}
      fadeInRange={[0.54, 0.58]}
      motesData={motesData}
      baseOpacity={0.74}
      size={0.046}
    />
  );
};

// =========================================================================
// MAIN ZONE WORKSHOP: 6 DESKTOP WEBSITE INSTALLATIONS IN AMPHITHEATER
// =========================================================================

export const ZoneWorkshop: React.FC<ZoneWorkshopProps> = ({
  progress,
  onSelectProject,
  hoveredProjectId,
  setHoveredProjectId,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Generate 6 High-Resolution Procedural Desktop Website Textures
  const kbrTexture = useMemo(() => generateKbrEsportTexture(), []);
  const menawiTexture = useMemo(() => generateMenawiArtTexture(), []);
  const notaKitaTexture = useMemo(() => generateNotaKitaTexture(), []);
  const malangTexture = useMemo(() => generateMalangReproductiveTexture(), []);
  const insanTexture = useMemo(() => generateInsanMedikaTexture(), []);
  const hospitalTexture = useMemo(() => generateHospitalVirtualTexture(), []);

  useFrame(() => {
    if (!groupRef.current) return;

    // Active from 0.54 through 0.965 (seamless continuity through exit portal & connecting corridor)
    const isVisible = progress >= 0.54 && progress <= 0.965;
    groupRef.current.visible = isVisible;
    if (!isVisible) return;

    // Smooth arrival rise (0.54 to 0.58); completely stationary & rock-solid through exit!
    if (progress < 0.58) {
      const factor = Math.max(0, (progress - 0.54) / 0.04);
      groupRef.current.position.y = (1 - factor) * -3.5;
      const s = 0.94 + factor * 0.06;
      groupRef.current.scale.set(s, s, s);
    } else {
      groupRef.current.position.y = 0;
      groupRef.current.scale.set(1, 1, 1);
    }
  });

  // Determine active project focus from hover or camera waypoint journey
  const activeFocusId = hoveredProjectId || (
    progress >= 0.59 && progress < 0.64 ? 'kbr-esport' :
    progress >= 0.64 && progress < 0.69 ? 'menawi-art-studio' :
    progress >= 0.69 && progress < 0.74 ? 'nota-kita' :
    progress >= 0.74 && progress < 0.79 ? 'malang-reproductive-center' :
    progress >= 0.79 && progress < 0.84 ? 'insan-medika' :
    progress >= 0.84 && progress <= 0.875 ? 'hospital-virtual-app' :
    null
  );

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ========================================================
          GRAND AMPHITHEATER EXHIBITION WALL WITH CENTER EXIT PORTAL
         ======================================================== */}
      {/* Left Travertine Amphitheater Wall Wing */}
      <mesh position={[-9.6, 4.0, -33.8]} receiveShadow>
        <boxGeometry args={[13.2, 9.0, 1.2]} />
        <meshStandardMaterial color="#161513" roughness={0.92} metalness={0.06} />
      </mesh>

      {/* Right Travertine Amphitheater Wall Wing */}
      <mesh position={[9.6, 4.0, -33.8]} receiveShadow>
        <boxGeometry args={[13.2, 9.0, 1.2]} />
        <meshStandardMaterial color="#161513" roughness={0.92} metalness={0.06} />
      </mesh>

      {/* Portal Framing Columns in Dark Basalt */}
      <mesh position={[-3.1, 4.0, -33.8]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 9.0, 1.4]} />
        <meshStandardMaterial color="#1D1C19" roughness={0.9} metalness={0.1} />
      </mesh>
      <mesh position={[3.1, 4.0, -33.8]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 9.0, 1.4]} />
        <meshStandardMaterial color="#1D1C19" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Monumental Portal Cross Lintel Overhead */}
      <mesh position={[0, 7.8, -33.8]} castShadow receiveShadow>
        <boxGeometry args={[6.8, 1.4, 1.5]} />
        <meshStandardMaterial color="#E1D8CA" roughness={0.88} metalness={0.05} />
      </mesh>

      {/* Portal Inner Trim in Brushed Bronze */}
      <mesh position={[0, 7.15, -33.1]}>
        <boxGeometry args={[6.2, 0.08, 0.2]} />
        <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Bronze Reveal Lintel Trim along left and right wall tops */}
      <mesh position={[-9.6, 8.55, -33.1]}>
        <boxGeometry args={[13.2, 0.12, 0.2]} />
        <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[9.6, 8.55, -33.1]}>
        <boxGeometry args={[13.2, 0.12, 0.2]} />
        <meshStandardMaterial color="#C58A5B" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Continuous Gallery Walkway Floor */}
      <mesh position={[0, -1.8, -28.0]} receiveShadow>
        <boxGeometry args={[26, 0.35, 12]} />
        <meshStandardMaterial color="#1E1D19" roughness={0.9} metalness={0.08} />
      </mesh>

      {/* ========================================================
          PROJECT 01: KBR E-SPORT WEBSITE (DESKTOP ARENA WORKSTATION)
          Position: Left Wing [-7.2, 0, -26.5]
         ======================================================== */}
      <group
        position={[-7.2, 0, -26.5]}
        rotation={[0, 0.38, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject(SELECTED_PROJECTS[0]);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredProjectId(SELECTED_PROJECTS[0].id);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredProjectId(null);
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Workstation Console Base Desk */}
        <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.7, 1.4]} />
          <meshStandardMaterial color="#1D1C19" roughness={0.85} />
        </mesh>
        <mesh position={[0, -0.78, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.0, 0.08, 1.5]} />
          <meshStandardMaterial color={activeFocusId === 'kbr-esport' ? '#A65338' : '#2A2723'} roughness={0.7} />
        </mesh>

        {/* Hero: 27" Desktop Website Display */}
        <DesktopWebsiteDisplay
          texture={kbrTexture}
          accentColor="#A65338"
          isHovered={activeFocusId === 'kbr-esport'}
        />

        {/* Supporting Prop: Gold Championship Trophy Cup on Side Pedestal */}
        <group position={[0.95, 0.2, 0.2]}>
          <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.14, 0.16, 0.3, 24]} />
            <meshStandardMaterial color="#22201D" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.1, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.05, 0.25, 24]} />
            <meshStandardMaterial color="#C58A5B" metalness={0.92} roughness={0.18} />
          </mesh>
          <mesh position={[0, 0.12, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <torusGeometry args={[0.1, 0.016, 12, 24]} />
            <meshStandardMaterial color="#C58A5B" metalness={0.92} roughness={0.18} />
          </mesh>
        </group>

        {/* Supporting Prop: Pro Esports Gaming Headset on Desk Stand */}
        <group position={[-0.95, 0.15, 0.2]}>
          <mesh position={[0, 0.1, 0]} castShadow>
            <cylinderGeometry args={[0.012, 0.012, 0.24, 12]} />
            <meshStandardMaterial color="#2E333D" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.22, 0]} rotation={[0, 0, Math.PI]} castShadow>
            <torusGeometry args={[0.065, 0.015, 12, 24, Math.PI]} />
            <meshStandardMaterial color="#A65338" roughness={0.5} />
          </mesh>
        </group>

        {/* Supporting Prop: Gaming Mechanical Keyboard & Mouse */}
        <group position={[0, 0.015, 0.4]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.65, 0.02, 0.2]} />
            <meshStandardMaterial color="#16181D" roughness={0.8} />
          </mesh>
          <mesh position={[0.42, 0, 0]} castShadow>
            <boxGeometry args={[0.08, 0.025, 0.12]} />
            <meshStandardMaterial color="#22252C" roughness={0.6} />
          </mesh>
        </group>

        {/* Inscribed Brass Exhibition Plaque */}
        <mesh position={[0, -0.4, 0.72]}>
          <planeGeometry args={[1.6, 0.14]} />
          <meshStandardMaterial color="#C58A5B" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* ========================================================
          PROJECT 02: MENAWI ART STUDIO WEBSITE (CREATIVE ATELIER)
          Position: Left-Center [-4.3, 0, -28.6]
         ======================================================== */}
      <group
        position={[-4.3, 0, -28.6]}
        rotation={[0, 0.22, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject(SELECTED_PROJECTS[1]);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredProjectId(SELECTED_PROJECTS[1].id);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredProjectId(null);
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Workstation Console Base Desk */}
        <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.7, 1.4]} />
          <meshStandardMaterial color="#654637" roughness={0.85} />
        </mesh>
        <mesh position={[0, -0.78, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.0, 0.08, 1.5]} />
          <meshStandardMaterial color={activeFocusId === 'menawi-art-studio' ? '#C58A5B' : '#755644'} roughness={0.7} />
        </mesh>

        {/* Hero: 27" Desktop Website Display */}
        <DesktopWebsiteDisplay
          texture={menawiTexture}
          accentColor="#C58A5B"
          isHovered={activeFocusId === 'menawi-art-studio'}
        />

        {/* Supporting Prop: Artist Wooden A-Frame Easel with Canvas Study */}
        <group position={[1.0, 0.4, 0.1]} rotation={[0, -0.3, 0]}>
          <mesh position={[-0.2, 0, 0]} rotation={[0, 0, 0.1]} castShadow>
            <boxGeometry args={[0.03, 1.4, 0.03]} />
            <meshStandardMaterial color="#8C6747" roughness={0.7} />
          </mesh>
          <mesh position={[0.2, 0, 0]} rotation={[0, 0, -0.1]} castShadow>
            <boxGeometry args={[0.03, 1.4, 0.03]} />
            <meshStandardMaterial color="#8C6747" roughness={0.7} />
          </mesh>
          {/* Stretched Canvas Study */}
          <mesh position={[0, 0.15, 0.03]} castShadow>
            <boxGeometry args={[0.45, 0.6, 0.03]} />
            <meshStandardMaterial color="#EDE6D8" roughness={0.9} />
          </mesh>
        </group>

        {/* Supporting Prop: Traditional Oval Paint Palette with Oil Paint Dollops */}
        <group position={[-0.95, 0.02, 0.25]} rotation={[0, 0.35, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.4, 0.015, 0.28]} />
            <meshStandardMaterial color="#A47551" roughness={0.7} />
          </mesh>
          {/* 5 Paint Dollops */}
          {[
            { c: '#DC2626', x: -0.12, z: -0.06 },
            { c: '#D97706', x: -0.04, z: -0.08 },
            { c: '#EDE6D8', x: 0.04, z: -0.08 },
            { c: '#78350F', x: 0.12, z: -0.06 },
            { c: '#15803D', x: 0.14, z: 0.02 },
          ].map((dot, i) => (
            <mesh key={i} position={[dot.x, 0.012, dot.z]}>
              <cylinderGeometry args={[0.02, 0.02, 0.012, 12]} />
              <meshStandardMaterial color={dot.c} roughness={0.3} />
            </mesh>
          ))}
        </group>

        {/* Supporting Prop: Ceramic Jar with Brushes */}
        <group position={[-0.95, 0.12, -0.15]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.06, 0.05, 0.18, 16]} />
            <meshStandardMaterial color="#EDE6D8" roughness={0.8} />
          </mesh>
          <mesh position={[0.02, 0.12, 0]} rotation={[0.1, 0, 0.15]} castShadow>
            <cylinderGeometry args={[0.004, 0.004, 0.25, 8]} />
            <meshStandardMaterial color="#554439" roughness={0.6} />
          </mesh>
        </group>

        {/* Inscribed Brass Exhibition Plaque */}
        <mesh position={[0, -0.4, 0.72]}>
          <planeGeometry args={[1.6, 0.14]} />
          <meshStandardMaterial color="#C58A5B" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* ========================================================
          PROJECT 03: NOTA KITA WEBSITE (INVOICE & PAYMENT WEB)
          Position: Center-Left [-1.45, 0, -29.8]
         ======================================================== */}
      <group
        position={[-1.45, 0, -29.8]}
        rotation={[0, 0.07, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject(SELECTED_PROJECTS[2]);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredProjectId(SELECTED_PROJECTS[2].id);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredProjectId(null);
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Workstation Console Base Desk */}
        <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.7, 1.4]} />
          <meshStandardMaterial color="#1F1E1B" roughness={0.9} />
        </mesh>
        <mesh position={[0, -0.78, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.0, 0.08, 1.5]} />
          <meshStandardMaterial color={activeFocusId === 'nota-kita' ? '#38BDF8' : '#2A2925'} roughness={0.7} />
        </mesh>

        {/* Hero: 27" Desktop Website Display */}
        <DesktopWebsiteDisplay
          texture={notaKitaTexture}
          accentColor="#38BDF8"
          isHovered={activeFocusId === 'nota-kita'}
        />

        {/* Supporting Prop: Physical Thermal Receipt Printer with Paper Ribbon */}
        <group position={[0.95, 0.12, 0.2]} rotation={[0, -0.2, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.3, 0.2, 0.28]} />
            <meshStandardMaterial color="#26282E" roughness={0.6} metalness={0.4} />
          </mesh>
          {/* Curled Paper Ribbon Output */}
          <mesh position={[0, 0.16, 0.1]} rotation={[0.4, 0, 0]}>
            <planeGeometry args={[0.18, 0.25]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.8} side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Supporting Prop: Financial Accounting Calculator */}
        <group position={[-0.95, 0.02, 0.25]} rotation={[-0.15, 0.2, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.24, 0.035, 0.32]} />
            <meshStandardMaterial color="#1E1D1B" roughness={0.7} />
          </mesh>
          {/* LCD Display */}
          <mesh position={[0, 0.02, -0.09]}>
            <boxGeometry args={[0.2, 0.01, 0.07]} />
            <meshStandardMaterial color="#84A98C" roughness={0.3} />
          </mesh>
        </group>

        {/* Supporting Prop: Leather-Bound Transaction Ledger */}
        <group position={[-0.95, 0.02, -0.2]} rotation={[0, 0.1, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.32, 0.04, 0.42]} />
            <meshStandardMaterial color="#4A3B32" roughness={0.8} />
          </mesh>
        </group>

        {/* Inscribed Brass Exhibition Plaque */}
        <mesh position={[0, -0.4, 0.72]}>
          <planeGeometry args={[1.6, 0.14]} />
          <meshStandardMaterial color="#C58A5B" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* ========================================================
          PROJECT 04: MALANG REPRODUCTIVE WEBSITE (HEALTHCARE TRAINING)
          Position: Center-Right [1.45, 0, -29.8]
         ======================================================== */}
      <group
        position={[1.45, 0, -29.8]}
        rotation={[0, -0.07, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject(SELECTED_PROJECTS[3]);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredProjectId(SELECTED_PROJECTS[3].id);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredProjectId(null);
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Workstation Console Base Desk */}
        <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.7, 1.4]} />
          <meshStandardMaterial color="#1E293B" roughness={0.85} />
        </mesh>
        <mesh position={[0, -0.78, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.0, 0.08, 1.5]} />
          <meshStandardMaterial color={activeFocusId === 'malang-reproductive-center' ? '#38BDF8' : '#334155'} roughness={0.7} />
        </mesh>

        {/* Hero: 27" Desktop Website Display */}
        <DesktopWebsiteDisplay
          texture={malangTexture}
          accentColor="#38BDF8"
          isHovered={activeFocusId === 'malang-reproductive-center'}
        />

        {/* Supporting Prop: Stainless Steel Surgical Instrument Tray */}
        <group position={[-0.95, 0.02, 0.2]} rotation={[0, 0.12, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.38, 0.025, 0.26]} />
            <meshStandardMaterial color="#E2E8F0" metalness={0.92} roughness={0.15} />
          </mesh>
          {/* Stethoscope */}
          <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
            <torusGeometry args={[0.07, 0.012, 12, 24]} />
            <meshStandardMaterial color="#0284C7" roughness={0.5} />
          </mesh>
        </group>

        {/* Supporting Prop: Precision Monocular Microscope */}
        <group position={[0.95, 0.2, 0.15]} rotation={[0, -0.25, 0]}>
          <mesh position={[0, -0.15, 0]} castShadow>
            <boxGeometry args={[0.16, 0.04, 0.18]} />
            <meshStandardMaterial color="#1E293B" metalness={0.7} />
          </mesh>
          <mesh position={[0, 0.05, -0.04]} rotation={[0.2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.022, 0.022, 0.28, 16]} />
            <meshStandardMaterial color="#E2E8F0" metalness={0.92} roughness={0.18} />
          </mesh>
        </group>

        {/* Inscribed Brass Exhibition Plaque */}
        <mesh position={[0, -0.4, 0.72]}>
          <planeGeometry args={[1.6, 0.14]} />
          <meshStandardMaterial color="#C58A5B" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* ========================================================
          PROJECT 05: INSAN MEDIKA WEBSITE (CAREGIVER ACADEMY WEB)
          Position: Right-Center [4.3, 0, -28.6]
         ======================================================== */}
      <group
        position={[4.3, 0, -28.6]}
        rotation={[0, -0.22, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject(SELECTED_PROJECTS[4]);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredProjectId(SELECTED_PROJECTS[4].id);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredProjectId(null);
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Workstation Console Base Desk */}
        <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.7, 1.4]} />
          <meshStandardMaterial color="#654637" roughness={0.85} />
        </mesh>
        <mesh position={[0, -0.78, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.0, 0.08, 1.5]} />
          <meshStandardMaterial color={activeFocusId === 'insan-medika' ? '#EA580C' : '#755644'} roughness={0.7} />
        </mesh>

        {/* Hero: 27" Desktop Website Display */}
        <DesktopWebsiteDisplay
          texture={insanTexture}
          accentColor="#EA580C"
          isHovered={activeFocusId === 'insan-medika'}
        />

        {/* Supporting Prop: Tiered Stacks of Medical Curriculum Binders */}
        <group position={[-0.95, 0.06, 0.15]} rotation={[0, 0.15, 0]}>
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.26, 0.07, 0.34]} />
            <meshStandardMaterial color="#EA580C" roughness={0.7} />
          </mesh>
          <mesh position={[0.02, 0.07, 0.02]} rotation={[0, 0.08, 0]} castShadow>
            <boxGeometry args={[0.26, 0.07, 0.34]} />
            <meshStandardMaterial color="#0284C7" roughness={0.7} />
          </mesh>
        </group>

        {/* Supporting Prop: Tied Credential Graduation Scroll */}
        <group position={[0.95, 0.04, 0.2]} rotation={[0, -0.3, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 0.3, 16]} />
            <meshStandardMaterial color="#FDFBF7" roughness={0.9} />
          </mesh>
          {/* Terracotta Ribbon Tie */}
          <mesh position={[0, 0.01, 0]}>
            <torusGeometry args={[0.028, 0.006, 8, 16]} />
            <meshStandardMaterial color="#A65338" roughness={0.4} />
          </mesh>
        </group>

        {/* Inscribed Brass Exhibition Plaque */}
        <mesh position={[0, -0.4, 0.72]}>
          <planeGeometry args={[1.6, 0.14]} />
          <meshStandardMaterial color="#C58A5B" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* ========================================================
          PROJECT 06: HOSPITAL VIRTUAL WEBSITE (DESKTOP TELEHEALTH WEB)
          IMPORTANT: Desktop Website Exhibition — NO SMARTPHONE!
          Position: Right Wing [7.2, 0, -26.5]
         ======================================================== */}
      <group
        position={[7.2, 0, -26.5]}
        rotation={[0, -0.38, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject(SELECTED_PROJECTS[5]);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredProjectId(SELECTED_PROJECTS[5].id);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredProjectId(null);
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Workstation Console Base Desk */}
        <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.7, 1.4]} />
          <meshStandardMaterial color="#0B3B2D" roughness={0.85} />
        </mesh>
        <mesh position={[0, -0.78, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.0, 0.08, 1.5]} />
          <meshStandardMaterial color={activeFocusId === 'hospital-virtual-app' ? '#10B981' : '#135642'} roughness={0.7} />
        </mesh>

        {/* Hero: 27" Desktop Website Display (Telemedicine Portal) */}
        <DesktopWebsiteDisplay
          texture={hospitalTexture}
          accentColor="#10B981"
          isHovered={activeFocusId === 'hospital-virtual-app'}
        />

        {/* Supporting Prop: Desktop Digital Signature Pad Tablet with Stylus */}
        <group position={[-0.95, 0.02, 0.2]} rotation={[-0.2, 0.15, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.3, 0.02, 0.4]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.8} />
          </mesh>
          {/* Active Screen Surface */}
          <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.26, 0.36]} />
            <meshStandardMaterial color="#059669" roughness={0.4} />
          </mesh>
          {/* Stylus Pen */}
          <mesh position={[0.18, 0.015, 0]} rotation={[0.1, 0, 0]} castShadow>
            <cylinderGeometry args={[0.005, 0.005, 0.22, 8]} />
            <meshStandardMaterial color="#1E293B" metalness={0.8} />
          </mesh>
        </group>

        {/* Supporting Prop: Clinic Queue Token Dispenser `#042` */}
        <group position={[0.95, 0.08, 0.2]} rotation={[0, -0.25, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.2, 0.16, 0.2]} />
            <meshStandardMaterial color="#135642" roughness={0.5} />
          </mesh>
          {/* Ticket Token */}
          <mesh position={[0, 0.1, 0.05]} rotation={[-0.3, 0, 0]}>
            <planeGeometry args={[0.12, 0.14]} />
            <meshStandardMaterial color="#ECFDF5" roughness={0.7} side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Supporting Prop: Clinical Reference Handbook */}
        <group position={[0.95, 0.03, -0.2]} rotation={[0, -0.1, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.28, 0.05, 0.38]} />
            <meshStandardMaterial color="#064E3B" roughness={0.8} />
          </mesh>
        </group>

        {/* Inscribed Brass Exhibition Plaque */}
        <mesh position={[0, -0.4, 0.72]}>
          <planeGeometry args={[1.6, 0.14]} />
          <meshStandardMaterial color="#C58A5B" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* ========================================================
          MASTER EXHIBITION GALLERY LIGHTING RIG FOR CHAPTER 04
         ======================================================== */}
      {/* Spotlight for Project 01 (KBR E-Sport Website) */}
      <spotLight
        position={[-7.2, 6.5, -22.5]}
        target-position={[-7.2, 0.8, -26.5]}
        angle={0.65}
        penumbra={0.7}
        intensity={activeFocusId === 'kbr-esport' ? 3.8 : 2.2}
        color="#FFF2DC"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Spotlight for Project 02 (Menawi Art Studio Website) */}
      <spotLight
        position={[-4.3, 6.5, -24.5]}
        target-position={[-4.3, 0.8, -28.6]}
        angle={0.65}
        penumbra={0.7}
        intensity={activeFocusId === 'menawi-art-studio' ? 3.8 : 2.2}
        color="#FFF6E8"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Spotlight for Project 03 (Nota Kita Website) */}
      <spotLight
        position={[-1.45, 6.5, -25.5]}
        target-position={[-1.45, 0.8, -29.8]}
        angle={0.65}
        penumbra={0.7}
        intensity={activeFocusId === 'nota-kita' ? 3.8 : 2.2}
        color="#FFF4DD"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Spotlight for Project 04 (Malang Reproductive Website) */}
      <spotLight
        position={[1.45, 6.5, -25.5]}
        target-position={[1.45, 0.8, -29.8]}
        angle={0.65}
        penumbra={0.7}
        intensity={activeFocusId === 'malang-reproductive-center' ? 3.8 : 2.2}
        color="#E8F4FE"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Spotlight for Project 05 (Insan Medika Website) */}
      <spotLight
        position={[4.3, 6.5, -24.5]}
        target-position={[4.3, 0.8, -28.6]}
        angle={0.65}
        penumbra={0.7}
        intensity={activeFocusId === 'insan-medika' ? 3.8 : 2.2}
        color="#FFF6E8"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Spotlight for Project 06 (Hospital Virtual Website) */}
      <spotLight
        position={[7.2, 6.5, -22.5]}
        target-position={[7.2, 0.8, -26.5]}
        angle={0.65}
        penumbra={0.7}
        intensity={activeFocusId === 'hospital-virtual-app' ? 3.8 : 2.2}
        color="#E8FEF5"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Warm Ambient Gallery Ground Fill */}
      <pointLight position={[0, 4.0, -26.0]} intensity={1.2} color="#FFF5EA" distance={24} />

      {/* ========================================================
          FULL-SCENE AMBIENT STAR PARTICLES (CHAPTER 04)
         ======================================================== */}
      <WorkshopArchiveParticles progress={progress} />
    </group>
  );
};
