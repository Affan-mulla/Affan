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
  liveUrl?: string;
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
  priceUSD: number;
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
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const caseStudies: CaseStudy[] = [
  {
    index: "01",
    slug: "lavenue-bakery",
    period: "2024",
    title: "L'Avenue Boulangerie — Artisan Bakery Website",
    description:
      "Full website for a Toronto artisan bakery. Menu, gallery, reservation system, and brand identity built to drive foot traffic and online discovery.",
    tags: ["Restaurant", "Local Business", "Next.js"],
    highlights: ["Multi-page site", "Menu & gallery system", "SEO for local search"],
    visual: "linear-gradient(145deg, #2c1a0e 0%, #7a3b1e 55%, #d4854a 100%)",
    liveUrl: "https://lavenue-bakery.vercel.app/",
  },
  {
    index: "02",
    slug: "vanguardis",
    period: "2024",
    title: "Vanguardis — London Architecture Studio",
    description:
      "Premium website for a London-based architectural studio. Multi-page build with project portfolio, inquiry system, and editorial layout that matches their brand.",
    tags: ["Agency", "Multi-page", "Premium"],
    highlights: ["Portfolio system", "Project inquiry form", "Brand-matched design"],
    visual: "linear-gradient(145deg, #0a0f1a 0%, #1a2a4a 55%, #2d4a7a 100%)",
    liveUrl: "https://vanguardis.vercel.app/",
  },
];

export const serviceTiers: ServiceTier[] = [
  {
    name: "Starter",
    priceUSD: 499,
    description: "Perfect for small local businesses that need a professional online presence fast.",
    deliverables: [
      "5-page responsive website",
      "Google-ready (SEO basics)",
      "Contact form + Google Maps",
      "Mobile-first design",
      "1 round of revisions",
      "7-day delivery",
    ],
    cta: "Get Started",
  },
  {
    name: "Growth",
    priceUSD: 1199,
    description: "For businesses ready to dominate local search and convert visitors into customers.",
    deliverables: [
      "Up to 10 pages",
      "Full local SEO setup",
      "Google Business Profile optimisation",
      "Blog or news section",
      "Booking or inquiry system",
      "Analytics + heatmaps",
      "14-day delivery",
    ],
    featured: true,
    cta: "Get Started",
  },
  {
    name: "Premium",
    priceUSD: 2199,
    description: "Complete digital presence for established businesses that want to lead their market.",
    deliverables: [
      "Unlimited pages",
      "Custom design system",
      "E-commerce or booking platform",
      "Advanced SEO + content strategy",
      "Performance audit",
      "30-day post-launch support",
      "21-day delivery",
    ],
    cta: "Get Started",
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
    slug: "lavenue-bakery",
    title: "L'Avenue Boulangerie — Artisan Bakery Website",
    period: "2024",
    description:
      "Full website for a Toronto artisan bakery. Menu, gallery, reservation system, and brand identity built to drive foot traffic and online discovery.",
    visual: "linear-gradient(145deg, #2c1a0e 0%, #7a3b1e 55%, #d4854a 100%)",
    client: "L'Avenue Boulangerie, Toronto",
    role: "Web Designer + Frontend Developer",
    sections: [
      {
        type: "brief",
        heading: "The brief",
        body: "L'Avenue needed a website that matched the warmth and quality of their bakery. They had a loyal local following but no online presence — no way for new customers to find them, no menu online, no reservation system. The goal was to fix all three in under two weeks.",
      },
      {
        type: "problem",
        heading: "The problem",
        body: "Most local bakeries either have no website or a generic template that looks nothing like their brand. L'Avenue's in-store experience is exceptional — rustic, warm, artisan — but nothing online communicated that. Potential customers searching 'artisan bakery Toronto' found nothing. Regulars had no way to check the menu or book a table before visiting.",
      },
      {
        type: "process",
        heading: "What I built",
        body: "A multi-page Next.js site with a daily menu page, photo gallery with Instagram integration, a reservation request form, and Google Maps embed. The design uses warm cream tones, editorial typography, and full-bleed photography to match the in-store atmosphere. Fully mobile-optimised with local SEO metadata targeting Toronto bakery searches.",
      },
      {
        type: "outcome",
        heading: "The result",
        body: "The site launched in 10 days. Within the first month, L'Avenue appeared on the first page of Google for 'artisan bakery Toronto'. Reservation requests came in through the site from day one. The client described it as 'finally looking like the bakery we actually are online'.",
      },
    ],
  },
  {
    slug: "vanguardis",
    title: "Vanguardis — London Architecture Studio",
    period: "2024",
    description:
      "Premium multi-page website for a London architectural studio specialising in ecological design. Portfolio system, project inquiry form, and brand-matched editorial layout.",
    visual: "linear-gradient(145deg, #0a0f1a 0%, #1a2a4a 55%, #2d4a7a 100%)",
    client: "Vanguardis Ltd, London",
    role: "Web Designer + Frontend Developer",
    sections: [
      {
        type: "brief",
        heading: "The brief",
        body: "Vanguardis is a London architecture studio focused on ecological and sustainable design. Their previous website was generic and didn't communicate the precision and ambition of their work. They needed a digital presence as considered as their buildings.",
      },
      {
        type: "problem",
        heading: "The problem",
        body: "Architecture clients judge a studio by how it presents itself before the first meeting. A mediocre website signals mediocre work, even when the actual portfolio is exceptional. Vanguardis was losing potential project inquiries because their digital presence didn't match their physical reputation.",
      },
      {
        type: "process",
        heading: "What I built",
        body: "A full multi-page site with studio, expertise, vision, portfolio, and journal sections. Project inquiry form with project type selection. Editorial layout using full-bleed imagery, precise typography, and generous white space. The design is deliberately architectural — structured, minimal, and considered. Built in Next.js with performance optimisation and semantic SEO structure.",
      },
      {
        type: "outcome",
        heading: "The result",
        body: "The site positions Vanguardis at the premium end of the London architecture market. Inquiries through the site's contact form increased immediately after launch. The client noted that new leads arriving through the site were already pre-qualified — they understood the studio's ethos before the first call, making the pitch process significantly shorter.",
      },
    ],
  },
];

export const experienceList: ExperienceItem[] = [
  {
    role: "Web Designer & Developer",
    place: "Independent · Remote",
    period: "2023 - Now",
  },
  {
    role: "Local Business Websites",
    place: "Bakeries, Studios, Agencies",
    period: "2024 - Now",
  },
  {
    role: "Frontend Engineering",
    place: "Next.js, Tailwind, Framer Motion",
    period: "2023 - Now",
  },
];

export const skillPills = [
  "Next.js",
  "Tailwind CSS",
  "Framer Motion",
  "Local SEO",
  "React",
  "Google Business Profile",
  "Landing Pages",
  "Performance Optimisation",
  "E-commerce",
  "Booking Systems",
  "Brand Identity",
  "Mobile-First Design",
]