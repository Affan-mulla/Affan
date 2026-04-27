"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type MutableRefObject } from "react";

const faqs = [
  {
    question: "Do you use templates?",
    answer:
      "No. Every project is designed from scratch in Figma based on your positioning, audience, and goals. Templates are fast but they make you look like everyone else.",
  },
  {
    question: "How long does a project take?",
    answer:
      "A single-page portfolio takes 7-10 days. A full multi-page site with case studies typically takes 14-21 days. I'll give you a specific timeline in our first call.",
  },
  {
    question: "What do you need from me to get started?",
    answer:
      "A brief call (15 min), your existing content or rough notes, any brand assets you have, and examples of sites you like. I handle the rest.",
  },
  {
    question: "Do you offer revisions?",
    answer:
      "Yes - 2 full revision rounds are included in every package. Major scope changes outside the brief are quoted separately.",
  },
  {
    question: "Can you write the copy too?",
    answer:
      "I can provide copy direction and structure, and write placeholder copy based on your inputs. For full professional copywriting, I'll recommend a copywriter I work with.",
  },
  {
    question: "What happens after launch?",
    answer:
      "All packages include 14 days of post-launch support for bug fixes and small tweaks. Extended support retainers are available.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes. I work async-first with clients across UK, US, Europe, and the UAE. Time zones have never been an issue.",
  },
];

function FaqRow({
  answer,
  index,
  isOpen,
  onToggle,
  question,
  rowRefs,
}: {
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  question: string;
  rowRefs: MutableRefObject<Array<HTMLDivElement | null>>;
}) {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(rowRef, { amount: 0.4, once: true });

  useEffect(() => {
    rowRefs.current[index] = rowRef.current;
  }, [index, rowRefs]);

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, x: -12 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.06 }}
      className="border-b border-(--color-border)"
    >
      <button
        type="button"
        className="w-full py-4 text-left text-sm font-semibold flex items-center justify-between hover:bg-(--color-surface) transition-colors duration-200 hover:text-foreground/90"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.22, ease: "easeOut" },
            }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm leading-7 text-(--color-text-muted)">{answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);

  return (
    <motion.section
      id="faq"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="space-y-7"
    >
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--color-text-muted)">
          FAQ
        </p>
        <h2 className="font-display text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
          Common questions
        </h2>
      </div>

      <div>
        {faqs.map((item, index) => {
          const isOpen = activeIndex === index;

          return (
            <FaqRow
              key={item.question}
              answer={item.answer}
              index={index}
              isOpen={isOpen}
              onToggle={() => setActiveIndex((current) => (current === index ? null : index))}
              question={item.question}
              rowRefs={rowRefs}
            />
          );
        })}
      </div>
    </motion.section>
  );
}
