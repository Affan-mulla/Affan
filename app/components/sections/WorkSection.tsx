"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "../portfolio-data";
import Border from "../Border";

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
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          Selected Work
        </p>
        <h2 className="font-display text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
          Work
        </h2>
      </div>

      <div className="grid gap-4">
        {caseStudies.map((project) => {
          const isWip = project.status === "Work In Progress";

          const article = (
            <motion.article
              initial="rest"
              whileHover="hover"
              className="group relative grid overflow-hidden border border-border bg-(--color-surface-2) md:grid-cols-[1fr_1.1fr]"
            >
             <Border/>
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
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  Concept Project / {project.period}
                </p>
                <h3 className="max-w-xl text-3xl font-bold leading-tight tracking-tight">{project.title}</h3>
                <p className="max-w-xl text-sm leading-7 text-muted">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={`${project.index}-${tag}`}
                      className="rounded-full border border-border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid gap-2 pt-2 sm:grid-cols-3">
                  {project.highlights.map((item) => (
                    <p key={item} className="text-xs font-medium leading-5 text-muted">
                      {item}
                    </p>
                  ))}
                </div>

                {isWip ? (
                  <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted">
                    Coming soon
                  </p>
                ) : (
                  <p className="group mt-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-(--color-accent)">
                    Read case study
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 12H19M19 12L13 6M19 12L13 18"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </p>
                )}
              </div>

              <div
                className={`relative min-h-[260px] overflow-hidden md:min-h-full ${
                  isWip ? "opacity-70" : ""
                }`}
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 52vw, 100vw"
                  />
                ) : (
                  <div className="absolute inset-0" style={{ background: project.visual }} />
                )}
              </div>
            </motion.article>
          );

          if (isWip) {
            return <div key={`${project.index}-${project.title}`}>{article}</div>;
          }

          return (
            <Link
              key={`${project.index}-${project.title}`}
              href={`/work/${project.slug}`}
              onMouseEnter={() => onCursorLabel("Read")}
              className="block"
            >
              {article}
            </Link>
          );
        })}
      </div>
    </motion.section>
  );
}
