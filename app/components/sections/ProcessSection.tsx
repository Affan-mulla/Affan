"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getWrapperHeight, useScrollProgress } from "@/app/components/hooks/useScrollProgress";
import ProcessLine from "./ProcessLine";

const steps = [
  {
    number: "01",
    name: "Discovery",
    week: "Week 0",
    description:
      "We align on your goals, audience, and what makes you the right choice for your ideal client. One focused call, a shared brief.",
    deliverable: "Deliverable - shared brief + positioning statement",
  },
  {
    number: "02",
    name: "Wireframe",
    week: "Week 1",
    description:
      "I map out the page structure and content hierarchy before any visual decisions. You approve the blueprint first.",
    deliverable: "Deliverable - lo-fi wireframe in Figma",
  },
  {
    number: "03",
    name: "Design",
    week: "Week 1-2",
    description:
      "High-fidelity Figma designs with your actual content. Motion and interaction details specified at this stage.",
    deliverable: "Deliverable - full design file + motion spec",
  },
  {
    number: "04",
    name: "Build",
    week: "Week 2-3",
    description:
      "Next.js + Tailwind + Framer Motion. Pixel-perfect from Figma. You get a staging URL before launch.",
    deliverable: "Deliverable - live staging URL + Lighthouse score",
  },
  {
    number: "05",
    name: "Launch",
    week: "Week 3",
    description:
      "Domain, Vercel deploy, SEO config, analytics. Plus 14 days of post-launch support included.",
    deliverable: "Deliverable - live site + 14-day support window",
  },
];

type StepNumberProps = {
  number: string;
  isActive: boolean;
  isDone: boolean;
  stepReveal: number;
};

function StepNumber({ number, isActive, isDone, stepReveal }: StepNumberProps) {
  return (
    <motion.div
      animate={{
        opacity: isActive ? 0.92 : isDone ? 0.46 : stepReveal > 0.2 ? 0.2 : 0.08,
        y: isActive ? -2 : isDone || stepReveal > 0 ? 0 : 2,
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 font-display font-extrabold leading-none tracking-tight select-none bg-background w-fit"
      style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
    >
      {number}
    </motion.div>
  );
}

type StepContentProps = {
  isActive: boolean;
  isDone: boolean;
  step: typeof steps[0];
  stepReveal: number;
};

function StepContent({ isActive, isDone, step, stepReveal }: StepContentProps) {
  const contentOpacity = Math.max(0, (stepReveal - 0.3) / 0.7);

  return (
    <div
      className="flex flex-col gap-2 overflow-hidden"
      style={{ opacity: isActive ? 1 : isDone ? 0.82 : contentOpacity }}
    >
      <motion.p
        className="text-[10px] font-semibold uppercase tracking-[0.14em] text-(--color-text-muted)"
        animate={{
          opacity: isDone ? 0.3 : isActive ? 0.5 : 0,
          y: isDone || stepReveal > 0.3 ? 0 : 8,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {step.week}
      </motion.p>

      <motion.p
        animate={{
          opacity: isDone ? 0.55 : isActive ? 1 : stepReveal > 0.2 ? 0.3 : 0,
          y: isDone || stepReveal > 0.2 ? 0 : 12,
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className="text-sm font-bold tracking-tight"
      >
        {step.name}
      </motion.p>

      <AnimatePresence>
        {(isActive || isDone) && (
          <motion.p
            initial={{ opacity: 0, height: 0, y: 8 }}
            animate={{ opacity: isActive ? 1 : 0.6, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: 4 }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
              height: { duration: 0.3 },
            }}
            className="text-xs leading-relaxed text-(--color-text-muted) overflow-hidden"
          >
            {step.description}
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(isActive || isDone) && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: isActive ? 1 : 0.6, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="inline-flex items-center gap-1.5 border border-(--color-border) px-2.5 py-1 w-fit"
          >
            <span className="w-1 h-1 rounded-full bg-(--color-accent) flex-shrink-0" />
            <span className="text-[10px] font-medium text-(--color-text-muted)">{step.deliverable}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProcessSection() {
  const TOTAL = 5;
  const SCROLL_PER_STEP = 320;
  const wrapperHeight = getWrapperHeight(TOTAL, SCROLL_PER_STEP);

  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const { wrapperRef, progress, activeIndex, lineProgress, stepProgress, isPinned } = useScrollProgress({
    totalSteps: TOTAL,
    scrollPerStep: SCROLL_PER_STEP,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) {
    return (
      <section id="process" className="relative px-4 py-12 sm:px-8">
        <div className="mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-(--color-text-muted)">
            My Process
          </p>
          <h2 className="font-display text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
            How it works
          </h2>
        </div>

        <div className="relative ml-2 border-l border-(--color-border) pl-6">
          <div className="space-y-8">
            {steps.map((step) => (
              <article key={step.number} className="relative space-y-2">
                <span className="absolute -left-[1.78rem] top-2 h-2 w-2 rounded-full bg-(--color-foreground)" />
                <p className="font-display text-4xl font-extrabold leading-none tracking-tight text-(--color-border)">
                  {step.number}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-(--color-text-muted)">
                  {step.week}
                </p>
                <p className="text-sm font-bold tracking-tight">{step.name}</p>
                <p className="text-xs leading-relaxed text-(--color-text-muted)">{step.description}</p>
                <div className="inline-flex w-fit items-center gap-1.5 border border-(--color-border) px-2.5 py-1">
                  <span className="h-1 w-1 flex-shrink-0 rounded-full bg-(--color-accent)" />
                  <span className="text-[10px] font-medium text-(--color-text-muted)">{step.deliverable}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (prefersReduced) {
    return (
      <section id="process" className="relative px-4 py-12 sm:px-8">
        <div className="mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-(--color-text-muted)">
            My Process
          </p>
          <h2 className="font-display text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
            How it works
          </h2>
        </div>

        <div className="w-full">
          <div className="mb-4 grid grid-cols-5 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="font-display font-extrabold leading-none tracking-tight select-none"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)", opacity: 1 }}
              >
                {step.number}
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-5 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col gap-2 overflow-hidden">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-(--color-text-muted)">
                  {step.week}
                </p>
                <p className="text-sm font-bold tracking-tight">{step.name}</p>
                <p className="text-xs leading-relaxed text-(--color-text-muted)">{step.description}</p>
                <div className="inline-flex w-fit items-center gap-1.5 border border-(--color-border) px-2.5 py-1">
                  <span className="h-1 w-1 flex-shrink-0 rounded-full bg-(--color-accent)" />
                  <span className="text-[10px] font-medium text-(--color-text-muted)">{step.deliverable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={wrapperRef} id="process" style={{ height: wrapperHeight }} className="relative">
      <div className="sticky top-4 h-[90vh] flex flex-col overflow-hidden px-4 sm:px-8">
        <div className="flex h-full flex-col pt-10 pb-12">
          <div className="mb-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-(--color-text-muted)">
              My Process
            </p>
            <h2 className="font-display text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
              How it works
            </h2>
          </div>

          <div className="w-full">
            <div className="relative mb-3 grid grid-cols-5 gap-6 py-2">
              <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2">
                <ProcessLine
                  lineProgress={lineProgress}
                  totalSteps={TOTAL}
                  activeIndex={activeIndex}
                  stepProgress={stepProgress}
                />
              </div>

              {steps.map((step, i) => (
                <StepNumber
                  key={step.number}
                  number={step.number}
                  isActive={activeIndex === i}
                  isDone={i < activeIndex}
                  stepReveal={stepProgress[i] ?? 0}
                />
              ))}
            </div>

            <div className="mt-4 grid grid-cols-5 gap-6">
              {steps.map((step, i) => (
                <StepContent
                  key={step.number}
                  step={step}
                  isActive={activeIndex === i}
                  isDone={i < activeIndex}
                  stepReveal={stepProgress[i] ?? 0}
                />
              ))}
            </div>
          </div>

          <div
            className="absolute bottom-4 left-4 flex items-center gap-3 sm:left-8"
            data-pinned={isPinned ? "true" : "false"}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-(--color-text-muted)">
              Step
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={activeIndex}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className="text-xs font-semibold uppercase tracking-widest"
              >
                {steps[activeIndex].number} - {steps[activeIndex].name}
              </motion.span>
            </AnimatePresence>
            <span className="sr-only">Progress {Math.round(progress * 100)} percent</span>
          </div>
        </div>
      </div>
    </div>
  );
}
