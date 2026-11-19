# MELLINO — THE DIGITAL ATELIER
> **Awwwards-Caliber 3D Interactive Portfolio for Mellino**  
> *Fullstack Developer & Creative Technologist — Malang, East Java, Indonesia*

[![React](https://img.shields.io/badge/React-19.3-blue.svg)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.187-black.svg)](https://threejs.org/)
[![R3F](https://img.shields.io/badge/@react--three/fiber-9.5-purple.svg)](https://docs.pmnd.rs/react-three-fiber)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-green.svg)](https://greensock.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-teal.svg)](https://tailwindcss.com/)

---

## 🏛️ Creative Vision & Concept

**The Digital Atelier** is an architectural WebGL world representing the creative and technical identity of **Mellino**. 

Unlike conventional websites where a 3D widget sits passively behind a scrolling HTML page, this project uses an **immersive, true scroll-driven camera journey**:
- Scrolling physically navigates a virtual cinematographer camera along a continuous 3D **Catmull-Rom spline** curve.
- The visitor travels through **5 spatial destinations** in one unified architectural world.
- Content appears *in-situ* as a **Spatial HUD**, synchronizing editorial typography with the 3D destinations.

---

## 🧭 Five Spatial Destinations

1. **Destinasi 01 — The Entrance (`p = 0.00 – 0.18`)**: Monumental brutalist sculpture with cantilevered warm sandstone, charcoal pylon, terracotta counterweight, and a floating kinetic bronze orbital ring.
2. **Destinasi 02 — The Creator Colonnade (`p = 0.20 – 0.38`)**: Architectural limestone fins and cantilevered lintels framing the creator's philosophy and technical pillars.
3. **Destinasi 03 — The Expertise Pavilion (`p = 0.40 – 0.58`)**: Technical pavilion with 4 sculptural pedestals (Frontend, Fullstack, WebGL, Performance) and an interactive discipline selector.
4. **Destinasi 04 — The Projects Amphitheater (`p = 0.60 – 0.84`)**: Curved gallery framing **6 interactive 3D Project Portals**. Hovering scales the portal with an emissive terracotta glow; clicking opens the deep Case Study Monograph.
5. **Destinasi 05 — The Connection Gateway (`p = 0.86 – 1.00`)**: Grand monolithic gateway opening toward the horizon, featuring direct email copy with tactile feedback and verified links.

---

## 🎨 Design System: Warm Brutalism

- **Primary Background:** Deep Carbon `#11100E`
- **Parchment Base:** `#F1ECE3`
- **Warm Sandstone:** `#E1D8CA`
- **Terracotta Rust:** `#A65338`
- **Raw Umber:** `#755644`
- **Muted Olive:** `#74705E`
- **Typography:** Space Grotesk (display), Inter (body), Instrument Serif (editorial accents)

For full architectural parameters, camera vectors, and material specifications, see [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ or v22+)
- npm

### Installation
```bash
npm install --legacy-peer-deps
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
```

### Linting
```bash
npm run lint
```
*(100% clean with 0 warnings & 0 errors on Oxlint)*

---

## 📁 Project Structure

```
portofolio-new/
├── DESIGN_SYSTEM.md          # Complete Master Blueprint & Architectural Dossier
├── README.md                 # Project Overview & Setup Guide
├── index.html                # HTML entry & Google Fonts
├── vite.config.ts            # Vite & Rollup optimization
├── tailwind.config.js        # Design tokens & font scale
├── src/
│   ├── App.tsx               # Main coordinator (Canvas + HUD + Scroll Track)
│   ├── hooks/
│   │   └── useCameraJourney.ts   # GSAP ScrollTrigger camera trajectory controller
│   ├── components/
│   │   ├── canvas/           # Persistent 3D WebGL World & Camera Rig
│   │   │   ├── DigitalAtelierScene.tsx
│   │   │   ├── CameraRig.tsx
│   │   │   ├── Atmosphere.tsx
│   │   │   ├── ZoneEntrance.tsx
│   │   │   ├── ZoneCreator.tsx
│   │   │   ├── ZoneExpertise.tsx
│   │   │   ├── ZoneWorkshop.tsx
│   │   │   └── ZoneConnection.tsx
│   │   ├── overlay/          # In-situ Spatial HUD & Chapter Overlays
│   │   │   └── SpatialHUD.tsx
│   │   └── projects/         # Case Study Monograph Drawer
│   │       ├── ProjectDetailModal.tsx
│   │       └── ProjectArtwork.tsx
│   └── data/
│       └── portfolioData.ts  # Verified project & technical stack data
```

---

## 👤 Author

**Mellino** — Fullstack Developer & Creative Technologist  
Malang, East Java, Indonesia (`07°58′S, 112°37′E`)  
Email: [contact.mellino@gmail.com](mailto:contact.mellino@gmail.com)  
GitHub: [@mellino](https://github.com/mellino)  
LinkedIn: [Mellino](https://linkedin.com/in/mellino)
