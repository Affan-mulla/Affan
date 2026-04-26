"use client";

import { motion } from "framer-motion";

type ProcessSectionProps = {
  className?: string;
};

const steps = [
  {
    name: "Discovery",
    description:
      "We align on your goals, audience, and what makes you the right choice for your ideal client. One focused call, a shared brief.",
  },
  {
    name: "Wireframe",
    description:
      "I map out the page structure and content hierarchy before any visual decisions. You approve the blueprint first.",
  },
  {
    name: "Design",
    description:
      "High-fidelity Figma designs with your actual content. Motion and interaction details specified at this stage.",
  },
  {
    name: "Build",
    description:
      "Next.js + Tailwind + Framer Motion. Pixel-perfect from Figma. You get a staging URL before launch.",
  },
  {
    name: "Launch",
    description:
      "Domain, Vercel deploy, SEO config, analytics. Plus 14 days of post-launch support included.",
  },
];

export function ProcessSection({ className }: ProcessSectionProps) {
  return (
    <motion.section
      id="process"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className={`space-y-7 ${className ?? ""}`}
    >
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--color-text-muted)">
          My Process
        </p>
        <h2 className="font-display text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
          How it works
        </h2>
      </div>

      <div className="relative">
        <div className="hidden border-t border-(--color-border) mt-6 md:block" />

        <ol className="grid gap-6 md:grid-cols-5 md:gap-4">
          {steps.map((step, index) => (
            <motion.li
              key={step.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.1 }}
              className="md:-mt-6"
            >
              <p className="font-display text-5xl font-extrabold leading-none text-(--color-border)">
                {(index + 1).toString().padStart(2, "0")}
              </p>
              <p className="mt-2 text-sm font-semibold">{step.name}</p>
              <p className="mt-1 max-w-[160px] text-xs leading-relaxed text-(--color-text-muted)">
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </motion.section>
  );
}
