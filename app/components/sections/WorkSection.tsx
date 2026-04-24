"use client";

import { motion, type Variants } from "framer-motion";
import type { CaseStudy } from "../portfolio-data";

type WorkSectionProps = {
  caseStudies: CaseStudy[];
  onCursorLabel: (label: string) => void;
};

const borderClass = "pointer-events-none absolute h-2 w-2 border-foreground transition-all duration-300 ease-in-out group-hover:h-4 group-hover:w-4 z-50 ";

export function WorkSection({ caseStudies, onCursorLabel }: WorkSectionProps) {
  return (
    <motion.section
      id="work"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="space-y-7"
    >
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--color-text-muted)">
          Selected Work
        </p>
        <h2 className="font-display text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
          Work
        </h2>
      </div>

      <div className="grid gap-4">
        {caseStudies.map((project) => (
          <motion.article
            key={`${project.index}-${project.title}`}
            initial="rest"
            whileHover="hover"
            onMouseEnter={() => onCursorLabel("Case")}
            className="group relative grid overflow-hidden border border-(--color-border) bg-(--color-surface-2) md:grid-cols-[1fr_1.1fr]"
          >
            <motion.span
              className={borderClass + " top-0 left-0 border-t border-l"}
            />
            <motion.span
              className={borderClass + " right-0 top-0 border-t border-r"}
            />
            <motion.span
              className={borderClass + " left-0 bottom-0 border-b border-l"}
            />
            <motion.span
              className={borderClass + " right-0 bottom-0 border-b border-r"}
            />
            <div className="space-y-5 p-5 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  {project.index}
                </p>
                {project.status && (
                  <span className="inline-flex rounded-full border border-[rgba(229,151,24,0.36)] bg-[rgba(229,151,24,0.1)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[rgb(156,101,17)]">
                    {project.status}
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-(--color-text-muted)">
                Concept Project / {project.period}
              </p>
              <h3 className="max-w-xl text-3xl font-bold leading-tight tracking-tight">{project.title}</h3>
              <p className="max-w-xl text-sm leading-7 text-(--color-text-muted)">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={`${project.index}-${tag}`}
                    className="rounded-full border border-(--color-border) px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-(--color-text-muted)"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid gap-2 pt-2 sm:grid-cols-3">
                {project.highlights.map((item) => (
                  <p key={item} className="text-xs font-medium leading-5 text-(--color-text-muted)">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="relative min-h-[260px] overflow-hidden md:min-h-full">
              <div className="absolute inset-0" style={{ background: project.visual }} />
              <motion.div
                className="absolute left-1/2 top-1/2 h-[68%] w-[48%] rounded-[26px] border border-white/35 bg-[rgba(255,255,255,0.16)] p-3 shadow-[0_18px_40px_rgba(0,0,0,0.25)] backdrop-blur-sm"
                initial={{ rotate: -20, x: -20, y: -10 }}
                whileInView={{ rotate: -18, x: -10, y: 0 }}
                whileHover={{ rotate: -14, scale: 1.03 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.35 }}
              >
                <div className="h-full w-full rounded-[20px] bg-[linear-gradient(170deg,rgba(0,0,0,0.3),rgba(0,0,0,0.15))] p-3">
                  <div className="mb-2 h-1.5 w-12 rounded-full bg-white/70" />
                  <div className="space-y-2">
                    <div className="h-8 rounded-lg bg-white/75" />
                    <div className="h-8 rounded-lg bg-white/55" />
                    <div className="h-8 rounded-lg bg-white/35" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
