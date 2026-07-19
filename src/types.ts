export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  githubUrl: string;
  demoUrl: string;
  category: 'Full-Stack' | 'Python & AI' | 'Frontend';
  features: string[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; iconName: string }[];
}

export interface TimelineItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  gpaOrDetails: string;
  highlights: string[];
  type: 'education' | 'experience';
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}
