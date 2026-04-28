"use client";

import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { ContactCtaButton } from "@/app/components/ContactCtaButton";
import type { CaseStudyFull, CaseStudySection } from "@/app/components/portfolio-data";

type CaseStudyLayoutProps = {
  study: CaseStudyFull;
};

export function CaseStudyLayout({ study }: CaseStudyLayoutProps) {
  const router = useRouter();
  const contentRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: contentRef });
  const sectionParentVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 },
    },
  };
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const renderSection = (section: CaseStudySection, index: number) => {
    if (section.type === "brief") {
      return (
        <motion.section
          key={`${section.type}-${index}`}
          variants={sectionVariants}
          transition={{ duration: 0.35 }}
          className="grid gap-8 md:grid-cols-[1.4fr_1fr]"
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">{section.heading}</h2>
            <p className="text-sm leading-7 text-(--color-text-muted)">{section.body}</p>
          </div>
          <div className="space-y-1">
            <div className="grid grid-cols-2 border-b border-(--color-border) py-2 text-sm">
              <span className="text-(--color-text-muted)">Client</span>
              <span className="text-right">{study.client ?? "-"}</span>
            </div>
            <div className="grid grid-cols-2 border-b border-(--color-border) py-2 text-sm">
              <span className="text-(--color-text-muted)">Role</span>
              <span className="text-right">{study.role ?? "-"}</span>
            </div>
            <div className="grid grid-cols-2 border-b border-(--color-border) py-2 text-sm">
              <span className="text-(--color-text-muted)">Year</span>
              <span className="text-right">{study.period}</span>
            </div>
          </div>
        </motion.section>
      );
    }

    if (section.type === "problem") {
      return (
        <motion.section
          key={`${section.type}-${index}`}
          variants={sectionVariants}
          transition={{ duration: 0.35 }}
          className="space-y-8"
        >
          <blockquote className="relative space-y-5 border-l-2 border-(--color-accent) pl-6">
            <span
              aria-hidden="true"
              className="font-display absolute -left-1 top-0 text-6xl leading-none text-(--color-accent)/30"
            >
              "
            </span>
            <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
              {section.heading}
            </h2>
            <p className="text-lg leading-8 text-(--color-text-muted)">{section.body}</p>
          </blockquote>

          {section.image ? (
            <div className="overflow-hidden rounded-none">
              <Image
                src={section.image}
                alt={section.heading}
                width={1600}
                height={900}
                className="max-h-[420px] w-full rounded-none object-cover"
              />
            </div>
          ) : null}
        </motion.section>
      );
    }

    if (section.type === "process") {
      return (
        <motion.section
          key={`${section.type}-${index}`}
          variants={sectionVariants}
          transition={{ duration: 0.35 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">{section.heading}</h2>
            <p className="text-sm leading-7 text-(--color-text-muted)">{section.body}</p>
          </div>

          {section.image ? (
            <div className="border border-(--color-border) p-2">
              <Image
                src={section.image}
                alt={section.heading}
                width={1600}
                height={1000}
                className="h-auto w-full object-cover"
              />
            </div>
          ) : null}
        </motion.section>
      );
    }

    const firstSentence = section.body.split(".")[0]?.trim();
    const pullQuote = firstSentence ? `${firstSentence}.` : section.body;

    return (
      <motion.section
        key={`${section.type}-${index}`}
        variants={sectionVariants}
        transition={{ duration: 0.35 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold tracking-tight">{section.heading}</h2>
        <p className="text-sm leading-7 text-(--color-text-muted)">{section.body}</p>

        <div className="border-l-2 border-(--color-accent) bg-(--color-surface) pl-4 py-2">
          <p className="text-sm leading-7 text-(--color-text-muted)">"{pullQuote}"</p>
        </div>

        <ContactCtaButton
          href="https://www.cal.eu/affan/15min?overlayCalendar=true"
          label="Start your project"
          cursorLabel="Contact"
          size="compact"
          target="_blank"
          rel="noopener noreferrer"
          ariaLabel="Book a free discovery call (opens in new tab)"
        />
      </motion.section>
    );
  };

  return (
    <div className="min-h-screen bg-(--color-bg)">
      <motion.div
        className="fixed left-0 top-0 z-[70] h-0.5 w-full bg-(--color-accent)"
        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
      />

      <div
        className="relative flex min-h-[50vh] items-center justify-center px-4 text-center"
        style={{ background: study.visual }}
      >
        <button
          type="button"
          onClick={() => {
            if (window.history.length > 1) {
              router.back();
              return;
            }

            router.push("/");
          }}
          className="absolute left-4 top-4 z-50 border border-(--color-border) bg-(--color-surface) px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-foreground transition-colors hover:bg-(--color-surface-2)"
        >
          {"\u2190"} Back
        </button>
        <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-white">
          {study.title}
        </h1>
      </div>

      <main ref={contentRef} className="mx-auto max-w-3xl px-4 py-16">
        <motion.div
          variants={sectionParentVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-20"
        >
          {study.sections.map((section, index) => renderSection(section, index))}
        </motion.div>
      </main>
    </div>
  );
}
