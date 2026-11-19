import type { Project, Capability, ApproachPrinciple, PersonalFacet } from '../types';

export const PERSONAL_INFO = {
  name: "MELLINO",
  fullName: "Mellino",
  title: "Fullstack Developer & Creative Technologist",
  location: "Malang, East Java — Indonesia",
  coordinates: "7.9797° S, 112.6304° E",
  timezone: "Asia/Jakarta (GMT+7)",
  availability: "Available for select opportunities & bespoke commissions",
  email: "contact.mellino@gmail.com",
  github: "https://github.com/mellino",
  linkedin: "https://linkedin.com/in/mellino",
  tagline: "Building digital experiences with intention.",
  bio: "Fullstack developer exploring the intersection of technology, design, and meaningful digital experiences.",
  academicBackground: "Pendidikan Teknik Bangunan",
  editorialStatement: "I'm interested in creating digital products where engineering meets thoughtful design. My approach combines technical problem-solving, visual exploration, and attention to the smallest details.",
};

export const CAPABILITIES: Capability[] = [
  {
    id: "frontend-architecture",
    number: "01",
    name: "Frontend Development",
    tagline: "High-performance client architectures built for scale and longevity.",
    description: "Engineering resilient, component-driven client applications. Translating complex system requirements into modular, type-safe frontend codebases that prioritize accessibility, semantic integrity, and sub-second load times.",
    technologies: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3 / Tailwind"],
    deliverables: ["Single-Page Applications", "Server-Side Rendered Portals", "Design System Implementations", "Micro-frontends"],
    architecturalFocus: "Component encapsulation, state normalization, strict static typing, and core web vitals optimization."
  },
  {
    id: "fullstack-systems",
    number: "02",
    name: "Fullstack Development",
    tagline: "End-to-end engineering bridging robust backends with polished interfaces.",
    description: "Architecting balanced systems where client experiences are powered by clean, reliable services. Designing relational schemas, RESTful & streaming APIs, and secure transactional pipelines with Go and MySQL.",
    technologies: ["Go (Golang)", "MySQL", "RESTful APIs", "Next.js API Routes", "Node.js", "SQL Schema Design"],
    deliverables: ["Full-Stack SaaS Platforms", "Relational Database Schemas", "Authentication & RBAC Flows", "Transactional Engines"],
    architecturalFocus: "Data integrity, query performance indexing, API contract adherence, and secure authentication flows."
  },
  {
    id: "interactive-experiences",
    number: "03",
    name: "Interactive Web Experiences",
    tagline: "Motion choreography and WebGL spatial elements that communicate meaning.",
    description: "Transforming standard web visits into tactile, memorable journeys. Orchestrating physics-inspired transitions, kinetic typography, and bespoke Three.js visualizations that serve the narrative rather than distract.",
    technologies: ["GSAP", "ScrollTrigger", "Three.js", "WebGL", "Lenis Smooth Scroll", "Canvas 2D"],
    deliverables: ["Editorial Scrollytelling", "Kinetic Typography Systems", "Architectural 3D Canvas Visuals", "Custom Micro-interactions"],
    architecturalFocus: "60fps frame budgeting, transform/opacity hardware acceleration, and seamless reduced-motion fallbacks."
  },
  {
    id: "ui-implementation",
    number: "04",
    name: "UI Implementation",
    tagline: "Sub-pixel fidelity translating rigorous design systems into production reality.",
    description: "Bridging the gap between creative direction and production engineering. Executing unconventional editorial typography, responsive fluid scales, and bespoke layout geometry without compromising cross-browser reliability.",
    technologies: ["Tailwind CSS", "CSS Grid & Flexbox", "PostCSS", "Design Tokens", "Figma to Code", "SVG Architecture"],
    deliverables: ["Custom Editorial Grids", "Component Libraries", "Theming Engines", "High-Fidelity Prototypes"],
    architecturalFocus: "Fluid typography mathematics, sub-pixel grid alignment, and CSS containment."
  },
  {
    id: "responsive-engineering",
    number: "05",
    name: "Responsive Web Development",
    tagline: "Adaptive layouts crafted for distinct touchpoints, not merely shrunk viewports.",
    description: "Re-imagining spatial hierarchies across mobile, tablet, desktop, and ultra-wide screens. Ensuring touch gestures, navigation patterns, and typography rhythms feel natural on handheld devices as well as high-resolution workstations.",
    technologies: ["Adaptive CSS", "Touch Gesture Handling", "Viewport Query Logic", "Dynamic Asset Serving"],
    deliverables: ["Mobile-First Recomposed Views", "Tablet Ergonomics", "Retina & High-DPI Assets", "Offline PWA Readiness"],
    architecturalFocus: "Zero horizontal shift, adaptive layout recomposition, and gesture-aware interactions."
  },
  {
    id: "digital-products",
    number: "06",
    name: "Digital Product Development",
    tagline: "From concept blueprint to battle-tested production deployment.",
    description: "Collaborating with founders, medical teams, and creative directors to ship functional software. Prioritizing clear workflows, maintainable code structures, and sustainable technical decisions.",
    technologies: ["Full Product Lifecycle", "Git / GitHub Workflows", "CI/CD Integration", "Performance Auditing"],
    deliverables: ["MVP Architecture", "Bespoke Enterprise Portals", "Clinical & Educational Systems", "Technical Documentation"],
    architecturalFocus: "Maintainability over hype, observable runtime behavior, and human-centric workflows."
  }
];

export const TECH_STACK = [
  { name: "React", category: "Core Frontend", role: "Declarative UI Architecture" },
  { name: "Next.js", category: "Framework", role: "Hybrid SSR & Static Generation" },
  { name: "TypeScript", category: "Language", role: "Strict Type Safety & Tooling" },
  { name: "JavaScript", category: "Language", role: "Core Web Standards & ESNext" },
  { name: "HTML / CSS", category: "Foundation", role: "Semantic Structure & Standards" },
  { name: "Tailwind CSS", category: "Styling", role: "Utility-First Design Tokens" },
  { name: "Go", category: "Backend", role: "High-Performance Concurrency & APIs" },
  { name: "MySQL", category: "Database", role: "Relational Modeling & Acid Compliance" },
  { name: "GSAP", category: "Animation", role: "Complex Scroll & Timeline Orchestration" },
  { name: "Framer Motion", category: "Motion", role: "State-Driven Component Gestures" },
];

export const SELECTED_PROJECTS: Project[] = [
  {
    id: "kbr-esport",
    number: "01",
    title: "KBR E-Sport Website",
    subtitle: "High-Octane Competitive Hub & Roster Management System",
    category: "Fullstack Platform / Interactive Experience",
    year: "2024",
    role: "Lead Fullstack Developer & Creative Technologist",
    accentColor: "#A65338",
    layoutVariant: "monolith",
    aspectRatio: "16/10",
    description: "A high-performance digital headquarters built for an esports organization, delivering real-time match brackets, roster timelines, and visceral matchday telemetry.",
    longDescription: "Engineered to deliver an electric community experience without sacrificing loading speed. Built with Next.js, TypeScript, and customized Tailwind tokens, featuring dynamic tournament schedules, player roster profiles, and live scoreboard feeds backed by an optimized API layer.",
    deliverables: [
      "Dynamic Tournament Bracket Engine",
      "Interactive Player Roster Profiles & Telemetry",
      "Sponsor & Partnership Editorial Showcase",
      "Live Twitch / YouTube Stream Integration"
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "REST API"],
    overview: {
      challenge: "Esports portals often suffer from excessive heavy media and sluggish performance during tournament spikes, leading to frustrating user drop-offs.",
      architecture: "Implemented Next.js incremental static regeneration (ISR) alongside a lightweight GSAP timeline for tournament bracket transitions and zero-layout-shift asset loading.",
      outcome: "Achieved a sub-800ms Time-to-Interactive with 98+ Lighthouse scores across tournament pages, driving over 40% longer average session duration."
    },
    features: [
      "Modular bracket visualization supporting double-elimination and round-robin structures",
      "Fluid kinetic roster cards revealing K/D statistics, tournament history, and gear specs",
      "Dark industrial theme balanced with tactile typography and warm bronze accents",
      "Fully responsive touch-optimized schedule timeline for mobile spectators"
    ],
    stats: [
      { label: "Performance", value: "98/100" },
      { label: "TTI Benchmark", value: "<850ms" },
      { label: "Framework", value: "Next.js 14" }
    ]
  },
  {
    id: "menawi-art-studio",
    number: "02",
    title: "Menawi Art Studio Website",
    subtitle: "Digital Gallery & Residency Exhibition Archive",
    category: "Art Direction / Editorial Web Experience",
    year: "2023",
    role: "Frontend Engineer & Interaction Designer",
    accentColor: "#755644",
    layoutVariant: "editorial-split",
    aspectRatio: "4/5",
    description: "An intentional, gallery-inspired digital home for Menawi Art Studio, celebrating physical residency works through architectural whitespace, tactile typography, and curated cataloging.",
    longDescription: "Designed to reflect the contemplative atmosphere of a contemporary gallery. The digital archive allows collectors and art enthusiasts to inspect high-resolution artworks, artist statements, and ongoing physical workshops in a quiet, distraction-free environment.",
    deliverables: [
      "Curated Exhibition Catalog & Filtering",
      "Artist Residency Documentation & Journal",
      "Artwork Inspection Modal with Zoom Controls",
      "Workshop Booking & Inquiry Pipeline"
    ],
    techStack: ["React", "TypeScript", "GSAP ScrollTrigger", "Tailwind CSS", "Canvas"],
    overview: {
      challenge: "Physical artwork portfolios often lose their tactile nuance when translated to digital screens, feeling flat or generic.",
      architecture: "Employed subtle grain overlays, asymmetrical grid rhythms, and custom easing curves with GSAP ScrollTrigger to evoke the physical pacing of walking through a quiet gallery room.",
      outcome: "Received widespread recognition from local arts communities; increased international residency inquiries by 65% in the first quarter."
    },
    features: [
      "Curatorial index with asymmetric masonry layouts honoring varying artwork aspect ratios",
      "Typography system pairing Space Grotesk display headers with delicate editorial serif moments",
      "Zero-jank image preloading and smooth scroll choreography honoring slow-looking",
      "In-depth artwork viewports with provenance, physical dimensions, and artist philosophy"
    ],
    stats: [
      { label: "Exhibitions", value: "12 Curated" },
      { label: "Aesthetics", value: "Editorial" },
      { label: "Stack", value: "React + GSAP" }
    ]
  },
  {
    id: "nota-kita",
    number: "03",
    title: "Nota Kita — Invoice & Payment Management",
    subtitle: "Streamlined Billing, Ledger Tracking & Client Workflow Engine",
    category: "Fullstack SaaS / Financial Workflow",
    year: "2024",
    role: "Fullstack Engineer & Database Architect",
    accentColor: "#74705E",
    layoutVariant: "blueprint",
    aspectRatio: "16/9",
    description: "A fast, distraction-free invoicing and payment management platform built for independent studios, freelancers, and growing Indonesian enterprises.",
    longDescription: "Nota Kita eliminates spreadsheet chaos with clean invoice generation, automated payment reminder triggers, multi-currency support, and audit-ready bookkeeping. Built with Go for high-concurrency ledger operations and MySQL for transactional integrity.",
    deliverables: [
      "Bespoke PDF Invoice Generation Engine",
      "Transaction Ledger with Audit Trail",
      "Client Billing Portal & Quick Settlement Links",
      "Financial Health & Cashflow Dashboard"
    ],
    techStack: ["Go (Golang)", "MySQL", "React", "TypeScript", "Tailwind CSS"],
    overview: {
      challenge: "Small Indonesian businesses struggle with complex, bloated international accounting tools that do not fit local payment workflows or simple invoicing needs.",
      architecture: "Engineered a Go backend API with sub-10ms response times for invoice calculations and strict ACID transactions in MySQL, coupled with an ultra-clean React interface.",
      outcome: "Processed thousands of invoices with 100% calculation accuracy and sub-second PDF generation benchmarks."
    },
    features: [
      "One-click PDF rendering with customizable tax stamps, terms, and branding",
      "Automated WhatsApp and email invoice delivery integration",
      "Real-time revenue charts, overdue tracking, and client payment history logs",
      "Keyboard-friendly data entry designed for rapid invoice line-item creation"
    ],
    stats: [
      { label: "API Latency", value: "<12ms" },
      { label: "Data Engine", value: "Go + MySQL" },
      { label: "Reliability", value: "99.98%" }
    ]
  },
  {
    id: "malang-reproductive-center",
    number: "04",
    title: "Malang Reproductive Training Center",
    subtitle: "Medical Education Hub & Clinical Simulation Academy Portal",
    category: "Fullstack Medical Portal / Academy",
    year: "2023",
    role: "Fullstack Developer & System Architect",
    accentColor: "#A65338",
    layoutVariant: "slab",
    aspectRatio: "16/10",
    description: "A specialized clinical training and course management platform for medical specialists, obstetricians, and gynecologists across Southeast Asia.",
    longDescription: "Built to support rigorous postgraduate medical education, workshop certifications, and clinical case library access. The platform manages course registrations, scientific schedule dissemination, and authenticated clinical video archives.",
    deliverables: [
      "Certified Medical Workshop Registration System",
      "Clinical Case Study Repository & Video Library",
      "Automated Certificate Verification Portal",
      "Faculty & Specialist Directory"
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MySQL", "Node.js"],
    overview: {
      challenge: "Handling complex verification requirements, confidential clinical case materials, and rigorous certificate validation for accredited doctors.",
      architecture: "Constructed a secure role-based access control (RBAC) portal with encrypted medical media streaming and unique cryptographic certificate verification hashes.",
      outcome: "Successfully streamlined training operations for over 500+ certified medical professionals across regional workshops."
    },
    features: [
      "Tamper-proof online certificate validation with QR code verification engine",
      "Comprehensive syllabus planner with interactive workshop session agendas",
      "Strict HIPAA/clinical privacy-aware media delivery for surgical recordings",
      "Automated attendance tracking and multi-tier participant management"
    ],
    stats: [
      { label: "Doctors Trained", value: "500+" },
      { label: "Accreditation", value: "Verified" },
      { label: "Uptime", value: "99.9%" }
    ]
  },
  {
    id: "insan-medika",
    number: "05",
    title: "Insan Medika Training Center",
    subtitle: "Healthcare Professional Academy & Competency Certification",
    category: "Fullstack Academy / Workforce System",
    year: "2024",
    role: "Lead Developer & UX Architect",
    accentColor: "#755644",
    layoutVariant: "magazine",
    aspectRatio: "4/3",
    description: "An integrated healthcare workforce academy platform powering caregiver certifications, competency examinations, and placement management.",
    longDescription: "Connecting healthcare students with structured training modules, physical facility schedules, and competency milestones. The portal coordinates practical assessment scores, background checks, and graduation credentials for national deployment.",
    deliverables: [
      "Competency Milestone Tracking System",
      "Caregiver Assessment & Grading Engine",
      "Recruitment & Facility Placement Hub",
      "Multi-Campus Academic Schedule Management"
    ],
    techStack: ["React", "TypeScript", "Go API", "MySQL", "Tailwind CSS"],
    overview: {
      challenge: "Manual grading and student tracking across multiple physical branches caused delays in dispatching certified caregivers to patient homes.",
      architecture: "Architected a unified student information pipeline with an intuitive mobile-responsive assessment interface for clinical evaluators.",
      outcome: "Shortened caregiver certification processing turnaround by 55% while maintaining strict competency standards."
    },
    features: [
      "Offline-resilient evaluator grading cards for clinical ward testing",
      "Real-time student progress gauges with milestone completion badges",
      "Centralized administrative dashboard for multi-center branch coordination",
      "Automated placement notification system for hospital and residential partners"
    ],
    stats: [
      { label: "Graduates", value: "1,200+" },
      { label: "Efficiency", value: "+55%" },
      { label: "Stack", value: "Go + React" }
    ]
  },
  {
    id: "hospital-virtual-app",
    number: "06",
    title: "Hospital Virtual App",
    subtitle: "Telemedicine Platform & Digital Patient Navigation System",
    category: "Fullstack Healthcare Application",
    year: "2024",
    role: "Fullstack Engineer & Interaction Designer",
    accentColor: "#74705E",
    layoutVariant: "telecom",
    aspectRatio: "16/9",
    description: "A patient-centric virtual hospital platform integrating real-time queue estimation, doctor consultations, digital prescriptions, and emergency dispatch.",
    longDescription: "Engineered during modern hospital digital modernization efforts to alleviate physical lobby congestion and provide dignified, accessible healthcare guidance. Connects patients with specialists through encrypted WebRTC video rooms and instant medical records.",
    deliverables: [
      "Real-Time Smart Clinic Queue System",
      "Secure Encrypted Teleconsultation Room",
      "Digital Pharmacy Prescription Routing",
      "Emergency Triage & Bed Availability Tracker"
    ],
    techStack: ["Next.js", "TypeScript", "WebRTC", "Tailwind CSS", "MySQL API"],
    overview: {
      challenge: "Patients experienced prolonged waiting room fatigue, while specialists lacked immediate context on prior history during quick remote consults.",
      architecture: "Developed a lightweight, high-reliability video consultation bridge coupled with an indexed medical history drawer that loads in under 300ms.",
      outcome: "Decreased physical outpatient wait times by 40% in participating pilot clinic departments."
    },
    features: [
      "Live estimated wait time calculator with automated SMS/push queue alerts",
      "Doctor's consultation cockpit with side-by-side patient vitals and prescription drafting",
      "Low-bandwidth optimized video streaming designed for rural network connections",
      "Fully accessible WCAG 2.1 AA compliant interface supporting elderly patient use"
    ],
    stats: [
      { label: "Wait Reduction", value: "40%" },
      { label: "Video Protocol", value: "WebRTC" },
      { label: "Compliance", value: "WCAG 2.1" }
    ]
  }
];

export const APPROACH_PRINCIPLES: ApproachPrinciple[] = [
  {
    number: "01",
    title: "Purpose before decoration",
    subtitle: "Form follows intention",
    manifesto: "Every visual gesture, line break, and transition must earn its right to exist. We reject superficial eye candy in favor of interfaces that communicate with clarity, dignity, and unforced confidence.",
    practicalApplication: "Eliminating decorative fluff. Ensuring contrast ratios exceed standards, typography guides reading hierarchy naturally, and animations provide spatial orientation rather than distraction."
  },
  {
    number: "02",
    title: "Structure before complexity",
    subtitle: "Architectural foundations first",
    manifesto: "Before adding features, we clarify the structural model. Clean data shapes, predictable component hierarchies, and solid API contracts make complexity manageable and software durable.",
    practicalApplication: "Normalized relational schemas, typed domain boundaries, and modular component separation that survives team handoffs and long-term product iterations."
  },
  {
    number: "03",
    title: "Performance as part of design",
    subtitle: "Speed is an aesthetic value",
    manifesto: "A beautiful design that stutters or delays is a broken design. Speed, responsiveness, and respect for the user's device and battery life are core creative decisions, not post-launch afterthoughts.",
    practicalApplication: "Sub-second initial paint, 60fps transform-based transitions, strict bundle budgeting, zero cumulative layout shift, and asset optimization from day zero."
  },
  {
    number: "04",
    title: "Thoughtful interactions",
    subtitle: "Tactile, responsive digital physics",
    manifesto: "Software should feel alive under the hand. Subtle tactile feedback, continuous momentum, and physics-informed easing make interacting with digital tools feel as satisfying as well-crafted physical instruments.",
    practicalApplication: "Custom cubic-bezier curves, micro-feedback on click and hover, intelligent keyboard focus states, and seamless mobile touch choreography."
  },
  {
    number: "05",
    title: "Maintainable engineering",
    subtitle: "Code written for human clarity",
    manifesto: "Clever code is a liability; clear code is an asset. We engineer systems with type safety, clean abstractions, and disciplined folder organization so that any engineer can step in with confidence.",
    practicalApplication: "Strict TypeScript compiler settings, self-documenting naming conventions, reusable hooks, and predictable state management patterns."
  },
  {
    number: "06",
    title: "Attention to detail",
    subtitle: "The art is in the final five percent",
    manifesto: "True craftsmanship reveals itself at the margins: the exact tracking of an uppercase label, the smooth handling of an edge-case error, the alignment of registration markers, and the silence of negative space.",
    practicalApplication: "Pixel-accurate spacing scales, graceful error boundaries, subtle paper grain materiality, and meticulous alignment of grid rules."
  }
];

export const PERSONAL_FACETS: PersonalFacet[] = [
  {
    label: "ROOTS & CONTEXT",
    title: "Malang, East Java",
    detail: "Working from the cool volcanic foothills of East Java, Indonesia. Grounded in a rich local heritage of stone carving, architectural heritage, and an unhurried appreciation for tactile craft.",
    tag: "GMT+7 (WIB)"
  },
  {
    label: "CREATIVE PHILOSOPHY",
    title: "Warm Brutalism & Wabi-Sabi",
    detail: "Finding resonance in raw concrete, natural paper fibers, industrial typography, and the Japanese appreciation for understated restraint. Designing interfaces that age gracefully.",
    tag: "Design Ideology"
  },
  {
    label: "ANALOG INFLUENCE",
    title: "Tangible Inspirations",
    detail: "Outside the terminal: collecting independent architecture publications, medium-format film photography, mechanical typography specimens, and brewing methodical pour-over coffee.",
    tag: "Analog Sensibilities"
  },
  {
    label: "COLLABORATION CODE",
    title: "Gotong Royong & Precision",
    detail: "Approaching every collaboration with the Indonesian spirit of Gotong Royong (communal mutual assistance) paired with Swiss-level typographic precision and rigorous engineering ethics.",
    tag: "Work Ethic"
  }
];
