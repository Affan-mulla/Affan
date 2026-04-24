export type NavSection = {
  id: string;
  label: string;
};

export type CaseStudy = {
  index: string;
  title: string;
  period: string;
  status?: string;
  description: string;
  tags: string[];
  highlights: string[];
  visual: string;
};

export type ExperienceItem = {
  role: string;
  place: string;
  period: string;
};

export const navSections: NavSection[] = [
  { id: "home", label: "Top" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const caseStudies: CaseStudy[] = [
  {
    index: "01",
    period: "2026",
    title: "Crafting portfolio pages that turn profile visits into client inquiries",
    description:
      "A conversion-focused landing direction for freelancers who want clear positioning, stronger trust signals, and better first-call quality.",
    tags: ["Lead Gen", "Landing Page"],
    highlights: ["Clear service architecture", "Mobile-first CTA flow", "SEO-ready content structure"],
    visual: "linear-gradient(145deg, #19452a 0%, #2f7f4d 55%, #8fd49f 100%)",
  },
  {
    index: "02",
    period: "In Progress",
    status: "Work In Progress",
    title: "Designing product-style case studies with narrative and interaction depth",
    description:
      "An editorial case-study format for service providers who need a portfolio that feels premium, modern, and implementation ready.",
    tags: ["Storytelling", "Micro Interactions"],
    highlights: ["Scroll-based motion", "Sticky navigation behavior", "Strong visual hierarchy"],
    visual: "linear-gradient(145deg, #603011 0%, #b55d1e 60%, #efb67a 100%)",
  },
];

export const experienceList: ExperienceItem[] = [
  {
    role: "Freelance Product Designer",
    place: "Independent · Remote",
    period: "2025 - Now",
  },
  {
    role: "UI Engineer (Self-led Projects)",
    place: "Next.js, Tailwind, Framer Motion",
    period: "2024 - Now",
  },
  {
    role: "Brand + Content Collaborations",
    place: "Social and web-first execution",
    period: "2023 - 2025",
  },
];

export const skillPills = [
  "SEO Content Mapping",
  "Design Systems",
  "Motion Design",
  "Framer Motion",
  "Landing Page UX",
  "Case Study Writing",
  "Tailwind CSS",
  "Next.js",
  "Client Communication",
  "Conversion Copy",
];
