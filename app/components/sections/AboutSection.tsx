"use client";

import { motion } from "framer-motion";
import { ContactCtaButton } from "../ContactCtaButton";
import type { ExperienceItem } from "../portfolio-data";
import { ScrollHighlightText } from "../ScrollHighlightText";

type AboutSectionProps = {
  experienceList: ExperienceItem[];
  skillPills: string[];
};

const aboutParagraphs = [
  "I'm Affan Mulla, a web designer and developer who builds websites that help local businesses look credible, get found on Google, and convert visitors into paying customers.",
  "Whether you run a bakery in Toronto, a plumbing company in London, or a law firm in Mumbai — I build the online presence that matches the quality of your real-world work.",
  "Every project includes design, development, and basic SEO setup. You get a fast, mobile-first site that represents your business properly — without the agency price tag.",
];

export function AboutSection({
  experienceList,
  skillPills,
}: AboutSectionProps) {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 border-y border-border py-10"
    >
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          My Story
        </p>
        <h2 className="font-display text-[clamp(2.2rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
          About
        </h2>
      </div>

      <div className="grid gap-10 md:grid-cols-[1fr_1fr]  ">
        <div className="space-y-6 text-[clamp(1rem,2vw,1.5rem)] leading-[1.4]">
          <ScrollHighlightText
            paragraphs={aboutParagraphs}
            className="space-y-6"
            paragraphClassName="text-wrap  flex flex-wrap text-justify text-[clamp(1rem,2vw,1.3rem)] leading-[1.3]"
          />

          <ContactCtaButton
            href="https://www.cal.eu/affan/15min?overlayCalendar=true"
            target="_blank"
            rel="noopener noreferrer"
            ariaLabel="Book a free discovery call (opens in new tab)"
            label="Book a Free Discovery Call"
            cursorLabel="Contact"
          />
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              Experience
            </p>
            <div className="divide-y divide-border">
              {experienceList.map((item) => (
                <div key={item.role} className="grid gap-2 py-3 sm:grid-cols-[1fr_auto]">
                  <div>
                    <p className="text-sm font-semibold sm:text-base">{item.role}</p>
                    <p className="text-xs text-muted">{item.place}</p>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                    {item.period}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {skillPills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border bg-(--color-surface) px-3 py-1 text-[11px] font-medium text-muted"
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
