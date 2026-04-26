"use client";

import { motion, type Variants } from "framer-motion";
import { FloatingNav } from "./FloatingNav";
import type { NavSection } from "../portfolio-data";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

type HeroSectionProps = {
  activeSection: string;
  navCollapsed: boolean;
  navSections: NavSection[];
  onCursorLabel: (label: string) => void;
  onThemeToggle: () => void;
  theme: "light" | "dark";
};

export function HeroSection({
  activeSection,
  navCollapsed,
  navSections,
  onCursorLabel,
  onThemeToggle,
  theme,
}: HeroSectionProps) {
  return (
    <motion.section
      id="home"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="relative grid min-h-[82svh] gap-10 border-b border-(--color-border) pb-8 pt-28 md:grid-cols-[1.18fr_0.82fr] md:gap-14 md:pt-36"
    >
      <address className="sr-only not-italic">
        Affan Mulla, Freelance Product Designer, Gujarat, India.
        {" "}
        Email: affanmulla077@gmail.com
      </address>

      <FloatingNav
        activeSection={activeSection}
        navCollapsed={navCollapsed}
        navSections={navSections}
        onCursorLabel={onCursorLabel}
        onThemeToggle={onThemeToggle}
        theme={theme}
      />

      {/* {isDark && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(circle_at_18%_0%,rgba(255,122,92,0.22),transparent_58%)]"
        />
      )} */}

      <div className="space-y-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-text-muted)">
          Product Designer & Frontend Dev — Est. 2023
        </p>
        <h1 className="font-display text-[clamp(3rem,15vw,10rem)] font-extrabold leading-[0.86] tracking-tighter text-foreground">
          <span className="block">Affan</span>
          <span className="block">Mulla</span>
        </h1>
        <p className="max-w-md text-lg leading-9 text-muted">
          I design and build portfolio websites for freelancers and agency owners who want to charge more
          and win better clients. Based in Gujarat — working worldwide.
        </p>
      </div>

      <div className="flex flex-col items-start justify-end gap-3 md:items-end">
        <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,145,63,0.35)] bg-[rgba(0,145,63,0.07)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[rgb(0,121,53)]">
          <span className="h-2 w-2 rounded-full bg-[rgb(0,148,65)]" />
          Available For Work
        </span>
        <span className="inline-flex rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-(--color-text-muted)">
          Gujarat, India
        </span>
        <span className="inline-flex rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-(--color-text-muted)">
          SEO + Motion + UI Engineering
        </span>
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute top-26 right-0 hidden flex-col items-center gap-3 md:flex"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="relative h-16 w-px overflow-hidden bg-border">
          <motion.span
            className="absolute left-1/2 top-0 h-6 w-px -translate-x-1/2 bg-(--color-accent)"
            animate={{ y: ["-35%", "150%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.45, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted">
          Scroll
        </span>
      </motion.div>
    </motion.section>
  );
}
