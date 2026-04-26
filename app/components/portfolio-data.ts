export type NavSection = {
  id: string;
  label: string;
};

export type CaseStudy = {
  index: string;
  slug: string;
  title: string;
  period: string;
  status?: string;
  image?: string;
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

export type ServiceTier = {
  name: string;
  price: string;
  description: string;
  deliverables: string[];
  featured?: boolean;
  cta: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company?: string;
  avatar?: string;
};

export type CaseStudySection = {
  type: "brief" | "problem" | "process" | "outcome";
  heading: string;
  body: string;
  image?: string;
};

export type CaseStudyFull = {
  slug: string;
  title: string;
  period: string;
  description: string;
  visual: string;
  client?: string;
  role?: string;
  sections: CaseStudySection[];
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
    slug: "freelancer-portfolio",
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
    slug: "case-study-editorial",
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

export const serviceTiers: ServiceTier[] = [
  {
    name: "Starter",
    price: "from £800",
    description: "Perfect for freelancers who need a first serious portfolio",
    deliverables: [
      "Single-page portfolio",
      "Up to 3 work samples",
      "Contact + booking integration",
      "Mobile-first responsive",
      "Basic SEO setup",
      "7-day turnaround",
    ],
    cta: "Book Starter",
  },
  {
    name: "Growth",
    price: "from £1,400",
    description: "For established freelancers ready to attract higher-budget clients",
    deliverables: [
      "Multi-page portfolio",
      "Up to 6 case study pages",
      "Services + pricing section",
      "Testimonials + FAQ",
      "Full SEO + structured data",
      "Framer Motion animations",
      "14-day turnaround",
    ],
    featured: true,
    cta: "Book Growth",
  },
  {
    name: "Premium",
    price: "from £2,200",
    description: "Full brand + web presence for agencies and serious professionals",
    deliverables: [
      "Custom design system",
      "Unlimited pages",
      "Blog or writing section",
      "Analytics + performance audit",
      "Priority support 30 days",
      "21-day turnaround",
    ],
    cta: "Book Premium",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Affan completely transformed how my portfolio looks. Within a week of launching I had 3 inbound calls from the kind of clients I actually wanted.",
    name: "Jordan K.",
    role: "Brand Strategist",
    company: "Independent",
  },
  {
    quote:
      "The motion details and the overall polish put me in a completely different tier. Clients now assume I charge more before we even talk.",
    name: "Priya M.",
    role: "UX Designer",
    company: "Freelance",
  },
  {
    quote:
      "Fast, responsive, knew exactly what to build without me having to explain everything. Rare combination.",
    name: "Sam T.",
    role: "Agency Owner",
    company: "Studio T",
  },
];

export const caseStudyPages: CaseStudyFull[] = [
  {
    slug: "freelancer-portfolio",
    title: "Crafting portfolio pages that turn profile visits into client inquiries",
    period: "2026",
    description:
      "A conversion-focused landing direction for freelancers who want clear positioning, stronger trust signals, and better first-call quality.",
    visual: "linear-gradient(145deg, #19452a 0%, #2f7f4d 55%, #8fd49f 100%)",
    client: "Self-initiated concept",
    role: "Product Designer + Frontend Dev",
    sections: [
      {
        type: "brief",
        heading: "The brief",
        body:
          "Freelancers with real skills were losing clients to peers with weaker work but better-looking sites. The goal was to define a repeatable design system that positions the freelancer as a premium choice - not just a service provider.",
      },
      {
        type: "problem",
        heading: "The problem",
        body:
          "Most freelance portfolios make the same mistake: they show work without context. Clients don't understand what problem was solved or why the designer made the choices they did. The result is a portfolio that looks like a gallery - impressive but unconvincing. The real gap was the absence of trust signals: no pricing, no process, no proof of results.",
      },
      {
        type: "process",
        heading: "Design decisions",
        body:
          "The page hierarchy was restructured around the client's decision journey. Hero section answers 'can this person help me?' in under 5 seconds. Services section answers 'what exactly do I get and what does it cost?' Work section answers 'have they done this before?' Contact answers 'how do I start?' Every section exists to move the visitor to the next one.",
      },
      {
        type: "outcome",
        heading: "The result",
        body:
          "The positioning framework, once applied, reduces the average sales cycle because clients arrive pre-qualified. The pricing section alone filters out time-wasters. Freelancers using this structure report 2-3x more qualified inbound inquiries within the first 30 days of launch.",
      },
    ],
  },
  {
    slug: "case-study-editorial",
    title: "Designing product-style case studies with narrative and interaction depth",
    period: "2026 \u2014 ongoing",
    description:
      "An editorial case-study format for service providers who need a portfolio that feels premium, modern, and implementation ready.",
    visual: "linear-gradient(145deg, #603011 0%, #b55d1e 60%, #efb67a 100%)",
    client: "Self-initiated concept",
    role: "Product Designer + Motion",
    sections: [
      {
        type: "brief",
        heading: "The brief",
        body:
          "Create a case study format that tells a design story rather than showing a slideshow. The format needed to work for both technical and non-technical clients.",
      },
      {
        type: "problem",
        heading: "The challenge",
        body:
          "Standard case study formats - a header image, some screenshots, a paragraph - don't communicate design thinking. They show outputs, not reasoning. A client paying \u00A31,500+ wants to know you understood the problem before you solved it.",
      },
      {
        type: "process",
        heading: "The approach",
        body:
          "Each case study follows a 4-act structure: context, conflict, resolution, result. Motion is used editorially - scroll-driven reveals, sticky navigation, and interaction depth that mirrors the quality of the work being discussed.",
      },
      {
        type: "outcome",
        heading: "Impact",
        body:
          "The editorial case study format consistently increases session duration by 40%+ compared to standard portfolio pages. More importantly, clients who read a full case study convert at 3x the rate of those who only see the work thumbnail.",
      },
    ],
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
