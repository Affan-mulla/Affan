"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type MutableRefObject } from "react";

const faqs = [
  {
    question: "What kinds of businesses do you work with?",
    answer:
      "Cafes, restaurants, bakeries, salons, plumbers, contractors, clinics, law firms, real estate agents, and any local business that needs a professional website. If you serve customers in the real world, I can help you look the part online."
  },
  {
    question: "How long does a website take?",
    answer:
      "A starter 5-page site takes 7 days. A full multi-page site with SEO and booking systems typically takes 14–21 days. I'll give you an exact timeline on our first call."
  },
  {
    question: "Do I need to provide content and photos?",
    answer:
      "If you have photos and text, great — I'll use them. If not, I can source professional stock photography and write placeholder copy based on your business. For best results, your own photos always perform better."
  },
  {
    question: "Will my website show up on Google?",
    answer:
      "Every site I build includes basic SEO setup: proper page titles, meta descriptions, Google-friendly structure, and fast load times. The Growth and Premium packages include full local SEO and Google Business Profile optimisation."
  },
  {
    question: "Can customers book or order through the site?",
    answer:
      "Yes. I can integrate booking systems (like Cal.com or Calendly), reservation forms, and inquiry forms into your site. E-commerce and online ordering is available in the Premium package."
  },
  {
    question: "What do you need from me to start?",
    answer:
      "A 15-minute call to understand your business, your existing brand assets (logo, colours if you have them), and any reference sites you like. I handle the rest."
  },
  {
    question: "Do you work with businesses outside India?",
    answer:
      "Yes — most of my clients are international. I work async-first with businesses across the UK, US, Canada, and the UAE. Time zones have never been an issue."
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
      className="border-b border-border"
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
          className="shrink-0 text-muted"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
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
            <p className="pb-4 text-sm leading-7 text-muted">{answer}</p>
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
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          FAQ
        </p>
        <h2 className="font-display sm:text-[clamp(2.5rem,8vw,6rem)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
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
