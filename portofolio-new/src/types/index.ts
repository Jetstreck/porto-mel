export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  longDescription: string;
  deliverables: string[];
  techStack: string[];
  role: string;
  accentColor: string;
  layoutVariant: 'monolith' | 'editorial-split' | 'blueprint' | 'slab' | 'magazine' | 'telecom';
  aspectRatio: string;
  stats?: { label: string; value: string }[];
  overview: {
    challenge: string;
    architecture: string;
    outcome: string;
  };
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Capability {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  technologies: string[];
  deliverables: string[];
  architecturalFocus: string;
}

export interface ApproachPrinciple {
  number: string;
  title: string;
  subtitle: string;
  manifesto: string;
  practicalApplication: string;
}

export interface PersonalFacet {
  label: string;
  title: string;
  detail: string;
  tag: string;
}

