"use client";

import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import type { MouseEvent } from "react";
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
  isTouch: boolean;
  theme: "light" | "dark";
};

export function HeroSection({
  activeSection,
  navCollapsed,
  navSections,
  onCursorLabel,
  onThemeToggle,
  isTouch,
  theme,
}: HeroSectionProps) {
  const nameLines = ["Affan", "Mulla"];
  const lineOneX = useMotionValue(0);
  const lineOneY = useMotionValue(0);
  const lineTwoX = useMotionValue(0);
  const lineTwoY = useMotionValue(0);
  const lineOneSpringX = useSpring(lineOneX, { stiffness: 200, damping: 20, mass: 0.5 });
  const lineOneSpringY = useSpring(lineOneY, { stiffness: 200, damping: 20, mass: 0.5 });
  const lineTwoSpringX = useSpring(lineTwoX, { stiffness: 200, damping: 20, mass: 0.5 });
  const lineTwoSpringY = useSpring(lineTwoY, { stiffness: 200, damping: 20, mass: 0.5 });

  const handleNameMouseMove = (event: MouseEvent<HTMLHeadingElement>) => {
    if (isTouch) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);

    lineOneX.set(offsetX * 0.06);
    lineOneY.set(offsetY * 0.06);
    lineTwoX.set(offsetX * 0.06);
    lineTwoY.set(offsetY * 0.06);
  };

  const resetMagnet = () => {
    lineOneX.set(0);
    lineOneY.set(0);
    lineTwoX.set(0);
    lineTwoY.set(0);
  };

  return (
    <motion.section
      id="home"
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="relative grid min-h-[82svh] gap-10 border-b border-border pb-8 pt-28 md:grid-cols-[1.18fr_0.82fr] md:gap-14 md:pt-36"
    >
      <address className="sr-only not-italic">
        Affan Mulla, Freelance Product Designer, Gujarat, India. Email: affanmulla077@gmail.com
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
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
          Product Designer & Frontend Dev — Est. 2023
        </p>
        <h1
          className="font-display text-[clamp(3rem,15vw,10rem)] font-extrabold leading-[0.86] tracking-tighter text-foreground"
          onMouseMove={handleNameMouseMove}
          onMouseLeave={resetMagnet}
        >
          <motion.span className="block overflow-hidden" style={{ x: lineOneSpringX, y: lineOneSpringY }}>
            {nameLines[0].split("").map((char, index) => (
              <motion.span
                key={`line-one-${char}-${index}`}
                initial={{ opacity: 0, y: "60%", rotateX: -40 }}
                animate={{ opacity: 1, y: "0%", rotateX: 0 }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.04,
                }}
                style={{ display: "inline-block", transformOrigin: "bottom" }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
          <motion.span className="block overflow-hidden" style={{ x: lineTwoSpringX, y: lineTwoSpringY }}>
            {nameLines[1].split("").map((char, index) => (
              <motion.span
                key={`line-two-${char}-${index}`}
                initial={{ opacity: 0, y: "60%", rotateX: -40 }}
                animate={{ opacity: 1, y: "0%", rotateX: 0 }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  delay: (nameLines[0].length + index) * 0.04,
                }}
                style={{ display: "inline-block", transformOrigin: "bottom" }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
          className="max-w-md text-lg leading-9 text-muted"
        >
          I design and build portfolio websites for freelancers and agency owners who want to charge more
          and win better clients. Based in Gujarat — working worldwide.
        </motion.p>
      </div>

      <div className="flex flex-col items-start justify-end gap-3 md:items-end">
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,145,63,0.35)] bg-[rgba(0,145,63,0.07)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[rgb(0,121,53)]"
        >
          <span className="h-2 w-2 rounded-full bg-[rgb(0,148,65)]" />
          Available For Work
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
          className="inline-flex rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted"
        >
          Gujarat, India
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
          className="inline-flex rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted"
        >
          SEO + Motion + UI Engineering
        </motion.span>
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute top-28 right-0 hidden flex-col items-center gap-3 md:flex"
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
