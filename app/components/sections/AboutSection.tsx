"use client";

import { motion } from "framer-motion";
import { ContactCtaButton } from "../ContactCtaButton";
import type { ExperienceItem } from "../portfolio-data";
import { ScrollHighlightText } from "../ScrollHighlightText";

type AboutSectionProps = {
  experienceList: ExperienceItem[];
  onCursorLabel: (label: string) => void;
  skillPills: string[];
};

const aboutParagraphs = [
  "I am Affan Mulla, a freelancer focused on helping clients look credible online and convert attention into real opportunities.",
  "I do not sell fake numbers. I focus on clear messaging, strong visual systems, performance, and interactive details that make products feel premium.",
  "If you are building your first serious portfolio or redesigning a client-facing website, I can help with both design direction and front-end execution.",
];

export function AboutSection({
  experienceList,
  onCursorLabel,
  skillPills,
}: AboutSectionProps) {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 border-y border-(--color-border) py-10"
    >
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--color-text-muted)">
          My Story
        </p>
        <h2 className="font-display text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
          About
        </h2>
      </div>

      <div className="grid gap-10 md:grid-cols-[1fr_1fr]  ">
        <div className="space-y-6 text-[clamp(1.5rem,2vw,1.2rem)] leading-[1.4]">
          <ScrollHighlightText
            paragraphs={aboutParagraphs}
            className="space-y-6"
            paragraphClassName="text-wrap  flex flex-wrap"
          />

          <ContactCtaButton
            href="https://www.cal.eu/affan/15min?overlayCalendar=true"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book a 15 minute call on Cal.com (opens in a new tab)"
            label="Book a Call"
            cursorLabel="Contact"
            onCursorLabel={onCursorLabel}
          />
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              Experience
            </p>
            <div className="divide-y divide-(--color-border)">
              {experienceList.map((item) => (
                <div key={item.role} className="grid gap-2 py-3 sm:grid-cols-[1fr_auto]">
                  <div>
                    <p className="text-sm font-semibold sm:text-base">{item.role}</p>
                    <p className="text-xs text-(--color-text-muted)">{item.place}</p>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-(--color-text-muted)">
                    {item.period}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-(--color-text-muted)">
              Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {skillPills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-(--color-border) bg-(--color-surface) px-3 py-1 text-[11px] font-medium text-(--color-text-muted)"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
